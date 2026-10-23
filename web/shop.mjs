export const money = cents => new Intl.NumberFormat('en-NZ',{style:'currency',currency:'NZD'}).format(cents/100);
export function validEmail(s){return typeof s==='string' && /^[^\s@?&#]+@[^\s@?&#]+\.[^\s@?&#]+$/.test(s)}
export function facebook(s){try{const u=new URL(s);return u.protocol==='https:'&&['facebook.com','www.facebook.com','m.facebook.com'].includes(u.hostname)&&u.pathname.length>1}catch{return false}}
const filled = s => typeof s==='string' && s.trim().length>0;
export function available(p,now=Date.now()){
 const checked=Date.parse(p.verifiedAt),date=Date.parse(p.date+'T00:00:00Z'),nzToday=new Intl.DateTimeFormat('en-CA',{timeZone:'Pacific/Auckland',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date(now));
 return filled(p.id)&&filled(p.name)&&filled(p.manufacturer)&&filled(p.netWeight)&&filled(p.ingredients)&&filled(p.allergens)&&filled(p.storage)&&filled(p.labelText)&&filled(p.batch)&&filled(p.source)&&p.sealed===true&&p.shelfStable===true&&p.recalled===false&&['bestBefore','useBy'].includes(p.dateType)&&/^\d{4}-\d{2}-\d{2}$/.test(p.date)&&Number.isFinite(date)&&new Date(date).toISOString().slice(0,10)===p.date&&p.date>=nzToday&&Number.isFinite(checked)&&checked<=now&&now-checked<=86400000&&Number.isSafeInteger(p.priceCents)&&p.priceCents>0&&Number.isSafeInteger(p.stock)&&p.stock>0;
}
export function ready(c){return c?.acceptingRequests===true&&filled(c.business?.legalName)&&filled(c.business?.retentionPolicy)&&validEmail(c.business?.email)&&validEmail(c.business?.privacyContact)&&facebook(c.business?.facebookUrl)&&['foodRulesConfirmed','storageAndRecallReady','consumerPoliciesReviewed','contactVerified'].every(k=>c.checks?.[k]===true)}
export function delivery(c,method){const d=c?.[method];return ['pickup','shipping'].includes(method)&&d?.enabled===true&&filled(d.area)&&filled(method==='pickup'?d.instructions:d.details)&&Number.isSafeInteger(d.feeCents)&&d.feeCents>=0?d:null}
export function calculate(c,cart,method,now=Date.now()){
 if(!ready(c))throw Error('The shop is not accepting requests.');
 const d=delivery(c,method);if(!d)throw Error('Choose a verified delivery or pickup option.');
 if(!Array.isArray(cart)||!cart.length)throw Error('Your bag is empty.');
 const seen=new Set();let subtotal=0;
 const lines=cart.map(item=>{if(seen.has(item.id))throw Error('Duplicate item.');seen.add(item.id);const p=c.products.find(p=>p.id===item.id);if(!p||!available(p,now)||!Number.isSafeInteger(item.qty)||item.qty<1||item.qty>p.stock)throw Error('Stock or label details changed. Refresh your bag.');const total=p.priceCents*item.qty;if(!Number.isSafeInteger(total))throw Error('Quantity is too large.');subtotal+=total;return {p,qty:item.qty,total}});
 const total=subtotal+d.feeCents;if(!Number.isSafeInteger(total))throw Error('Total is too large.');return {lines,subtotal,fee:d.feeCents,total,method,area:d.area};
}
export function requestText(quote,name,reply){return ['FIND THE CASH NZ — FUDGE REQUEST','Request only: no payment, reservation or confirmed order.',`Name: ${name.trim()}`,`Reply: ${reply.trim()}`,...quote.lines.map(({p,qty,total})=>`${qty} × ${p.name} (${p.netWeight}), batch ${p.batch}: ${money(total)}`),`Items: ${money(quote.subtotal)}`,`${quote.method} — ${quote.area}: ${money(quote.fee)}`,`Total incl. applicable taxes: ${money(quote.total)}`,'Please recheck stock, date marks, delivery timing and final total before accepting.','Please do not request payment before confirming safe supply.'].join('\n')}
