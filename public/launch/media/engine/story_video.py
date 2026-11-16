"""Build a voiced story video from 9:16 slides + narration.
usage: python3 story_video.py OUT.mp4 AUDIO.mp3 MAP LINES.txt slide1.jpg slide2.jpg ...
LINES.txt: the narration, one line per segment (boundaries estimated by character share, snapped to nearest silence)
MAP: comma list of how many narration segments each slide takes, e.g. 1,1,1,2,1,1,1
Segments come from the largest silences in the audio (count = sum(MAP)-1).
"""
import subprocess, sys, re, tempfile, os
out, audio, mp = sys.argv[1], sys.argv[2], [int(x) for x in sys.argv[3].split(',')]
lines = [l.strip() for l in open(sys.argv[4]) if l.strip()]
slides = sys.argv[5:]
END = '/home/claude/memes/endcard_916.jpg'
assert len(slides) == len(mp)
dur = float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', audio]).decode())
log = subprocess.run(['ffmpeg', '-i', audio, '-af', 'silencedetect=n=-35dB:d=0.12', '-f', 'null', '-'], capture_output=True, text=True).stderr
st = [float(x) for x in re.findall(r'silence_start: ([\d.]+)', log)]
en = [float(x) for x in re.findall(r'silence_end: ([\d.]+)', log)]
sil = [(s, e) for s, e in zip(st, en)]
t0 = sil[0][1] if sil and sil[0][0] < 0.05 else 0.0
t1 = sil[-1][0] if sil and sil[-1][1] > dur - 0.05 else dur
mids = [(s + e) / 2 for s, e in sil if s > t0 + 0.2 and e < t1 - 0.2]
assert len(lines) == sum(mp), (len(lines), sum(mp))
w = [len(re.sub(r'[^\w]', '', l)) + 4 for l in lines]
cuts, acc = [], 0
for x in w[:-1]:
    acc += x
    est = t0 + (t1 - t0) * acc / sum(w)
    near = min(mids, key=lambda m: abs(m - est)) if mids else est
    cuts.append(near if abs(near - est) < 1.3 else est)
bounds = [0.0] + cuts + [dur]
# group segments per slide
times, k = [], 0
for n in mp:
    times.append((bounds[k], bounds[k + n])); k += n
d = tempfile.mkdtemp()
lst = open(f'{d}/l.txt', 'w')
for (a, b), s in zip(times, slides):
    lst.write(f"file '{os.path.abspath(s)}'\nduration {b - a:.3f}\n")
lst.write(f"file '{END}'\nduration 1.6\nfile '{END}'\n"); lst.close()
total = dur + 1.6
subprocess.run(['ffmpeg', '-y', '-v', 'error', '-f', 'concat', '-safe', '0', '-i', f'{d}/l.txt', '-i', audio,
                '-filter_complex', '[0:v]scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2:color=0x0f1311,fps=30,format=yuv420p[v];[1:a]apad=whole_dur=%.3f[a]' % total,
                '-map', '[v]', '-map', '[a]', '-t', f'{total:.3f}', '-c:v', 'libx264', '-preset', 'medium', '-crf', '20', '-c:a', 'aac', '-b:a', '160k', '-movflags', '+faststart', out], check=True)
print(out, f'{total:.1f}s', [f'{a:.1f}-{b:.1f}' for a, b in times])
