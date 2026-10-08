# -*- coding: utf-8 -*-
"""Собирает деплой-папку из alt.html + alt-angles.js.
   Восемь страниц: ru/1..4 и uk/1..4. Картинки → абсолютные пути + webp."""
import io, os, re, sys, shutil
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from uk import MAP, title_for

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
SRC = os.path.join(ROOT, 'src')   # alt.html + alt-angles.js
OUT = ROOT                        # собранные страницы ложатся в корень репозитория
PAIRS = sorted(MAP, key=lambda kv: -len(kv[0]))

def to_uk(text):
    for ru, ua in PAIRS:
        text = text.replace(ru, ua)
    return text

def img_paths(text):
    text = text.replace('img/hero-market@2x.jpg', 'img/hero-market-2x.jpg')
    text = re.sub(r'(["\'(])img/([A-Za-z0-9._@-]+)\.(jpg|jpeg|png)', r'\1/img/\2.webp', text)
    text = re.sub(r'(["\'(])img/', r'\1/img/', text)
    return text

def visible(text):
    body = text[text.find('</style>'):]
    body = re.sub(r'<script.*?</script>', '', body, flags=re.S)
    body = re.sub(r'/\*.*?\*/', '', body, flags=re.S)
    body = re.sub(r'//[^\n]*', '', body)
    return re.sub(r'<[^>]+>', ' ', body)

def check_uk(text, where):
    bad = sorted(set(re.findall(r'\b\w*[ыэъЫЭЪ]\w*\b', visible(text))))
    if bad:
        print(f"  ⚠ {where}: осталось русское — {', '.join(bad[:12])}")
    return not bad

html = io.open(os.path.join(SRC, 'alt.html'), encoding='utf-8').read()
js   = io.open(os.path.join(SRC, 'alt-angles.js'), encoding='utf-8').read()
js   = js.replace("new URLSearchParams(location.search).get('a') || '1'",
                  "window.ANGLE || new URLSearchParams(location.search).get('a') || '1'")

ok = True
for lang in ('ru', 'uk'):
    page = html if lang == 'ru' else to_uk(html)
    script = js if lang == 'ru' else to_uk(js)
    if lang == 'uk':
        page = page.replace('<html lang="ru"', '<html lang="uk"')
        ok &= check_uk(page, 'страница')
        ok &= check_uk('</style>' + script, 'скрипт')
    page = img_paths(page)
    script = img_paths(script)
    jsname = 'alt-angles.js' if lang == 'ru' else 'alt-angles-uk.js'
    io.open(os.path.join(OUT, jsname), 'w', encoding='utf-8').write(script)
    for v in '1234':
        t, d = title_for(lang, v)
        p = page
        p = re.sub(r'<title>.*?</title>', '<title>' + t + '</title>', p, count=1, flags=re.S)
        p = re.sub(r'(<meta name="description" content=")[^"]*(")', lambda m: m.group(1) + d + m.group(2), p, count=1)
        p = p.replace('<script src="alt-angles.js"></script>',
                      '<script>window.ANGLE="%s"</script>\n<script src="/%s"></script>' % (v, jsname))
        folder = os.path.join(OUT, v if lang == 'ru' else 'ua/' + v)
        os.makedirs(folder, exist_ok=True)
        io.open(os.path.join(folder, 'index.html'), 'w', encoding='utf-8').write(p)
        print(f"  {lang}/{v} → {os.path.relpath(folder, OUT)}/index.html  ({len(p)//1024} КБ)")
print("ПРОВЕРКА ЯЗЫКА:", "чисто" if ok else "есть непереведённое")
