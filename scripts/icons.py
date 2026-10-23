"""Generate geometric brand icons with the Python standard library only."""
from pathlib import Path
import struct
import zlib

root = Path(__file__).resolve().parents[1] / 'web'
def chunk(kind, data):
    return struct.pack('>I', len(data)) + kind + data + struct.pack('>I', zlib.crc32(kind + data) & 0xffffffff)
for size in (192, 512):
    rows = bytearray()
    for y in range(size):
        rows.append(0)
        for x in range(size):
            a, b = x / size, y / size
            letter = (.29 <= a <= .41 and .25 <= b <= .78) or (.29 <= a <= .72 and .25 <= b <= .36) or (.29 <= a <= .66 and .49 <= b <= .60)
            dot = (a - .73) ** 2 + (b - .75) ** 2 <= .07 ** 2
            rows.extend((243,164,91) if dot else (250,247,239) if letter else (22,62,53))
    data = b'\x89PNG\r\n\x1a\n' + chunk(b'IHDR', struct.pack('>IIBBBBB', size, size, 8, 2, 0, 0, 0)) + chunk(b'IDAT', zlib.compress(bytes(rows))) + chunk(b'IEND', b'')
    (root / f'icon-{size}.png').write_bytes(data)
print('Generated 192px and 512px icons.')
