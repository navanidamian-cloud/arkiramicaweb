"""Genera el marcado inline del logo (src/components/logo-inner.html) y el favicon
a partir de Arkirámicalogo.svg. Uso: python3 scripts/build-logo.py"""
import re, glob, os
root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
src = open(glob.glob(os.path.join(root, 'Ark*logo.svg'))[0], encoding='utf-8').read()
body = src[src.index('>', src.index('<svg')) + 1: src.rindex('</svg>')]
n = -1
first_d = None
def repl(m):
    global n, first_d
    n += 1
    d = m.group(1)
    if n == 0: first_d = d
    if n <= 3:   cls, extra = 'ltr arki', f' style="--i:{n}" pathLength="1"'
    elif n <= 9: cls, extra = 'ltr ramica', f' style="--i:{n}" pathLength="1"'
    elif n == 30: cls, extra = 'acento', ''
    else:        cls, extra = 'tag', ''
    return f'<path class="{cls}"{extra} d="{d}"/>'
out = re.sub(r'<path d="([^"]+)" style="[^"]*"/>', repl, body)
assert n == 30, n
out = re.sub(r'\s+', ' ', out).replace('> <', '><').strip()
open(os.path.join(root, 'src/components/logo-inner.html'), 'w', encoding='utf-8').write(out)
fav = ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="47.6 231 72 72">'
       '<rect x="47.6" y="231" width="72" height="72" rx="14" fill="#161718"/>'
       f'<path transform="translate(104.2703,257.323)" fill="#C5D037" d="{first_d}"/></svg>')
open(os.path.join(root, 'public/favicon.svg'), 'w').write(fav)
print('ok', len(out))
