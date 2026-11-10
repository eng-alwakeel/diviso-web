"""Hook cover for a 9:16 video.
usage: python3 cover.py VIDEO SECONDS OUT.jpg "line1" ["line2"] [--accent-line N]
Grabs a frame, darkens it, puts a big 2-line hook in the upper third (inside safe area) + the diviso pill."""
import sys, subprocess, tempfile, os, html
from playwright.sync_api import sync_playwright
video, sec, out = sys.argv[1], sys.argv[2], sys.argv[3]
lines = [a for a in sys.argv[4:] if not a.startswith('--')]
d = tempfile.mkdtemp(); fr = f'{d}/f.jpg'
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', sec, '-i', video, '-frames:v', '1', '-vf', 'scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920', fr], check=True)
F = '/home/claude/stickman/fonts'
pill = '<div class="pill"><img src="file://'+F+'/icon.png"><span>diviso</span></div>' if '--pill' in sys.argv else ''
rows = ''.join(f'<div class="l{i}"><span>{html.escape(l)}</span></div>' for i, l in enumerate(lines))
page = f'''<html><head><meta charset="utf-8"><style>
@font-face{{font-family:R;src:url('file://{F}/readex-pro-arabic-700-normal.woff2');font-weight:700}}
@font-face{{font-family:R;src:url('file://{F}/readex-pro-latin-700-normal.woff2');font-weight:700;unicode-range:U+0000-00FF}}
body{{margin:0;width:1080px;height:1920px;position:relative;overflow:hidden;font-family:R;direction:rtl}}
.bg{{position:absolute;inset:0;background:url('file://{fr}') center/cover}}
.sh{{position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.92) 0%,rgba(0,0,0,.8) 28%,rgba(0,0,0,.35) 45%,rgba(0,0,0,0) 60%,rgba(0,0,0,.45) 100%)}}
.t{{position:absolute;top:230px;left:70px;right:70px;text-align:center;color:#fff;font-weight:700;line-height:1.15;text-shadow:0 6px 24px rgba(0,0,0,.6)}}
.t div{{white-space:nowrap}} .l0{{font-size:104px}} .l1{{font-size:104px;color:#C8F169}} .l2{{font-size:70px;margin-top:20px}}
.pill{{position:absolute;bottom:260px;left:50%;transform:translateX(-50%);display:flex;align-items:center;gap:20px;background:rgba(13,15,12,.85);border-radius:60px;padding:16px 40px 16px 18px;direction:ltr}}
.pill img{{width:84px;height:84px;border-radius:22px}} .pill span{{color:#fff;font-size:58px;font-family:R}}
</style></head><body><div class="bg"></div><div class="sh"></div><div class="t">{rows}</div>
{pill}</body></html>'''
open(f'{d}/c.html', 'w', encoding='utf-8').write(page)
with sync_playwright() as p:
    b = p.chromium.launch(); pg = b.new_page(viewport={'width': 1080, 'height': 1920}); pg.goto(f'file://{d}/c.html'); pg.evaluate("document.fonts.ready"); pg.wait_for_timeout(300)
    pg.evaluate("document.querySelectorAll('.t div').forEach(e=>{const sp=e.querySelector('span');let s=parseFloat(getComputedStyle(e).fontSize);while(sp.getBoundingClientRect().width>920&&s>40){s-=4;e.style.fontSize=s+'px'}})"); pg.wait_for_timeout(200)
    pg.screenshot(path=out, type='jpeg', quality=90); b.close()
print(out)
