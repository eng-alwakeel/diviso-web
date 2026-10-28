"""Compose Diviso meme posts / carousel slides from raw images + Arabic text.
usage: python3 compose_memes.py specs.json OUT_DIR
spec item: {"id": "...", "kind": "meme"|"slide"|"cta", "img": "raw/x.jpg", "text": "...", "sub": "...", "num": "1"}
Each spec renders twice: 4:5 (1080x1350, feed) and 9:16 (1080x1920, TikTok/stories).
"""
import base64, json, pathlib, sys
from playwright.sync_api import sync_playwright

FONTS = pathlib.Path('/home/claude/remotion-test/public/fonts')
SIZES = {'45': (1080, 1350), '916': (1080, 1920)}


def furi(name):
    return 'data:font/woff2;base64,' + base64.b64encode((FONTS / name).read_bytes()).decode()


def iuri(p):
    return 'data:image/jpeg;base64,' + base64.b64encode(pathlib.Path(p).read_bytes()).decode()


FONT_CSS = ''.join(
    f"@font-face{{font-family:R;font-weight:{w};src:url({furi(f'readex-pro-arabic-{w}-normal.woff2')});unicode-range:U+0600-06FF,U+FB50-FDFF,U+FE70-FEFF;}}"
    f"@font-face{{font-family:R;font-weight:{w};src:url({furi(f'readex-pro-latin-{w}-normal.woff2')});}}"
    for w in (400, 500, 700))

ICON = 'data:image/png;base64,' + base64.b64encode(pathlib.Path('/home/claude/brand/src/icon1024.png').read_bytes()).decode()
BRAND = f"""<div class="brand"><img class="ic" src="{ICON}"><span>diviso</span><span class="as">متوفر على App Store</span></div>"""
MARK = f"""<img class="mark" src="{ICON}">"""
AI = """<div class="ai">صورة مولّدة بالذكاء الاصطناعي</div>"""


def html(spec, W, H):
    kind = spec['kind']
    text = spec.get('text', '').replace('\n', '<br>')
    sub = spec.get('sub', '').replace('\n', '<br>')
    tall = H > 1500
    base = f"""<!doctype html><html dir="rtl"><head><meta charset="utf-8"><style>{FONT_CSS}
html,body{{margin:0;width:{W}px;height:{H}px;overflow:hidden;font-family:R,sans-serif}}
.brand{{position:absolute;display:flex;align-items:center;gap:14px;font:700 40px R;color:#fff;direction:ltr;background:rgba(15,19,17,.88);padding:10px 12px 10px 10px;border-radius:24px;z-index:5}}
.brand .ic{{width:62px;height:62px;border-radius:15px;display:block}}
.mark{{position:absolute;width:84px;height:84px;border-radius:20px;opacity:.95;z-index:5;box-shadow:0 4px 18px rgba(0,0,0,.35)}}
.ai{{position:absolute;font:400 22px R;color:rgba(255,255,255,.75)}}
.brand .as{{font:500 26px R;color:#0F1311;background:#fff;padding:6px 16px;border-radius:30px;margin-left:6px;direction:rtl}}
</style>"""
    if kind == 'meme':
        band = 400 if tall else 300
        fs = spec.get('fs', 64 if tall else 58)
        return base + f"""<style>
body{{background:#fff}}
.band{{position:absolute;top:0;left:0;right:0;height:{band}px;display:flex;align-items:center;justify-content:center;padding:0 64px;box-sizing:border-box;text-align:center;color:#111;font-weight:700;font-size:{fs}px;line-height:1.35}}
.pic{{position:absolute;top:{band}px;left:0;right:0;bottom:0;background:url({iuri(spec['img'])}) center {spec.get('pos','40%')}/cover}}
.brand{{left:28px;bottom:26px}} .ai{{right:32px;bottom:44px}} .mark{{left:28px;top:{band+24}px}}
.shade{{position:absolute;left:0;right:0;bottom:0;height:160px;background:linear-gradient(transparent,rgba(0,0,0,.55))}}
</style></head><body><div class="band">{text}</div><div class="pic"></div><div class="shade"></div>{MARK}{BRAND}{AI}</body></html>"""
    if kind == 'slide':
        num = spec.get('num', '')
        numhtml = f'<div class="num">{num}</div>' if num else ''
        fs = spec.get('fs', 84 if tall else 76)
        return base + f"""<style>
body{{background:#0F1311}}
.pic{{position:absolute;inset:0;background:url({iuri(spec['img'])}) center {spec.get('pos','35%')}/cover}}
.shade{{position:absolute;left:0;right:0;bottom:0;height:62%;background:linear-gradient(transparent,rgba(15,19,17,.92) 55%,#0F1311)}}
.box{{position:absolute;left:64px;right:64px;bottom:{spec.get('by', 200 if tall else 150)}px;color:#fff;text-align:right}}
.num{{display:inline-block;background:#C8F169;color:#0F1311;font:700 40px R;padding:6px 26px;border-radius:40px;margin-bottom:22px}}
.t{{font-weight:700;font-size:{fs}px;line-height:1.25}}
.s{{font-weight:500;font-size:{int(fs*0.5)}px;line-height:1.45;color:#C8F169;margin-top:18px}}
.brand{{left:40px;top:40px}} .ai{{left:40px;bottom:{70 if tall else 44}px}}
</style></head><body><div class="pic"></div><div class="shade"></div>{BRAND}<div class="box">{numhtml}<div class="t">{text}</div><div class="s">{sub}</div></div>{AI}</body></html>"""
    if kind == 'cta':
        return base + f"""<style>
body{{background:radial-gradient(120% 70% at 50% 0%,#22301f 0%,#0F1311 62%)}}
.box{{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:0 80px;color:#fff}}
.t{{font-weight:700;font-size:{88 if tall else 80}px;line-height:1.25}}
.s{{font-weight:500;font-size:44px;line-height:1.5;color:#C8F169;margin-top:34px}}
.pill{{margin-top:56px;font:700 34px R;color:#0F1311;background:#C8F169;padding:18px 44px;border-radius:60px}}
.brand{{left:50%;transform:translateX(-50%);bottom:70px}}
</style></head><body><div class="box"><div class="t">{text}</div><div class="s">{sub}</div><div class="pill">{spec.get('pill','سوّ مجموعة وارمِ الرابط بالقروب')}</div></div>{BRAND}</body></html>"""
    if kind == 'list':
        items = ''.join(f'<li>{i}</li>' for i in spec.get('items', []))
        num = spec.get('num', '')
        numhtml = f'<div class="num">{num}</div>' if num else ''
        top = f'<div class="hero" style="background-image:url({iuri(spec["img"])})"></div>' if spec.get('img') else ''
        hh = int(H*0.36) if spec.get('img') else 0
        return base + f"""<style>
body{{background:radial-gradient(120% 60% at 50% 0%,#22301f 0%,#0F1311 62%)}}
.hero{{position:absolute;top:0;left:0;right:0;height:{hh}px;background-size:cover;background-position:center {spec.get('pos','45%')}}}
.hero:after{{content:'';position:absolute;inset:0;background:linear-gradient(transparent 40%,#0F1311)}}
.box{{position:absolute;left:72px;right:72px;{('top:'+str(hh+40)+'px') if hh else 'top:0;bottom:120px;display:flex;flex-direction:column;justify-content:center'};color:#fff}}
.box>*{{flex:none}}
.num{{display:inline-block;align-self:flex-start;background:#C8F169;color:#0F1311;font:700 34px R;padding:6px 24px;border-radius:40px;margin-bottom:22px}}
.t{{font-weight:700;font-size:{spec.get('fs',70 if hh else 92)}px;line-height:1.25}}
.s{{font-weight:500;font-size:{36 if hh else 44}px;color:#C8F169;margin-top:14px;line-height:1.45}}
ul{{list-style:none;padding:0;margin:40px 0 0}}
li{{font:500 {spec.get('lfs',42 if hh else 50)}px R;line-height:1.5;margin:0 0 18px;padding-right:44px;position:relative}}
li:before{{content:'';position:absolute;right:0;top:22px;width:20px;height:20px;border-radius:6px;background:#C8F169}}
.brand{{left:40px;bottom:44px}} .ai{{right:40px;bottom:52px}}
</style></head><body>{top}<div class="box">{numhtml}<div class="t">{text}</div><div class="s">{sub}</div><ul>{items}</ul></div>{BRAND}{AI if spec.get('img') else ''}</body></html>"""
    if kind == 'debate':
        return base + f"""<style>
body{{background:#0F1311}}
.pic{{position:absolute;inset:0;background:url({iuri(spec['img'])}) center {spec.get('pos','45%')}/cover;filter:brightness(.55)}}
.box{{position:absolute;left:64px;right:64px;top:{220 if tall else 140}px;color:#fff;text-align:center}}
.q{{font-weight:700;font-size:{spec.get('fs',78)}px;line-height:1.3}}
.opts{{margin-top:{120 if tall else 70}px;display:flex;flex-direction:column;gap:28px;align-items:stretch}}
.o{{background:rgba(255,255,255,.95);color:#111;border-radius:28px;padding:26px 36px;font:700 48px R;display:flex;align-items:center;gap:22px}}
.o b{{background:#C8F169;color:#0F1311;border-radius:50%;width:70px;height:70px;display:flex;align-items:center;justify-content:center;flex:none}}
.c{{margin-top:40px;font:500 38px R;color:#C8F169}}
.brand{{left:40px;bottom:40px}} .ai{{right:40px;bottom:48px}}
</style></head><body><div class="pic"></div><div class="box"><div class="q">{text}</div><div class="opts">{''.join(f'<div class="o"><b>{k}</b>{v}</div>' for k,v in spec['opts'])}</div><div class="c">{sub}</div></div>{BRAND}{AI}</body></html>"""
    if kind == 'chat':
        rows = []
        for m in spec['msgs']:
            if m[0] == 'sys':
                rows.append(f'<div class="sys">{m[1]}</div>')
            else:
                who, txt = m[0], m[1]
                me = who == 'أنا'
                rows.append(f'<div class="b {"me" if me else "ot"}">' + ('' if me else f'<div class="n">{who}</div>') + f'<div>{txt}</div></div>')
        fs = spec.get('fs', 56 if tall else 50)
        return base + f"""<style>
body{{background:#0F1311}}
.top{{position:absolute;top:0;left:0;right:0;height:{150 if tall else 120}px;background:#1A201D;display:flex;align-items:center;gap:22px;padding:0 44px;box-sizing:border-box;color:#fff}}
.av{{width:76px;height:76px;border-radius:50%;background:#2C3631;display:flex;align-items:center;justify-content:center;font:700 34px R;color:#C8F169;flex:none}}
.gn{{font:700 40px R}} .gs{{font:400 26px R;color:#8C968F;margin-top:4px}}
.feed{{position:absolute;top:{190 if tall else 150}px;left:40px;right:40px;bottom:{330 if tall else 250}px;display:flex;flex-direction:column;justify-content:center;gap:{30 if tall else 20}px}}
.b{{max-width:78%;padding:18px 26px;border-radius:30px;font:500 {fs}px R;line-height:1.4;flex:none}}
.ot{{align-self:flex-start;background:#232B27;color:#fff;border-top-right-radius:8px}}
.me{{align-self:flex-end;background:#C8F169;color:#0F1311;border-top-left-radius:8px}}
.n{{font:700 {int(fs*0.62)}px R;color:#C8F169;margin-bottom:4px}}
.sys{{align-self:center;background:#1A201D;color:#9AA49D;font:500 {int(fs*0.68)}px R;padding:10px 24px;border-radius:20px;flex:none}}
.cap{{position:absolute;left:40px;right:40px;bottom:{150 if tall else 116}px;text-align:center;color:#C8F169;font:700 {46 if tall else 40}px R;line-height:1.4}}
.brand{{left:50%;transform:translateX(-50%);bottom:{50 if tall else 30}px}}
</style></head><body><div class="top"><div class="av">{spec.get('av','ش')}</div><div><div class="gn">{spec['group']}</div><div class="gs">{spec.get('members','أنت وثلاثة آخرين')}</div></div></div>
<div class="feed">{''.join(rows)}</div><div class="cap">{sub}</div>{BRAND}</body></html>"""
    raise ValueError(kind)


def main(specs_path, out):
    specs = json.loads(pathlib.Path(specs_path).read_text())
    out = pathlib.Path(out)
    out.mkdir(parents=True, exist_ok=True)
    with sync_playwright() as p:
        b = p.chromium.launch()
        for spec in specs:
            for tag, (W, H) in SIZES.items():
                pg = b.new_page(viewport={'width': W, 'height': H})
                pg.set_content(html(spec, W, H), wait_until='load')
                pg.evaluate('document.fonts.ready')
                pg.wait_for_timeout(250)
                dst = out / f"{spec['id']}_{tag}.jpg"
                pg.screenshot(path=str(dst), type='jpeg', quality=90)
                pg.close()
                print('ok', dst.name)
        b.close()


if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2])
