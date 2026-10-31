import json,sys
d=open(sys.argv[1],'rb').read(); n=int(d[:10]); man=json.loads(d[10:10+n]); p=10+n
for k,s in man: open(f'raw/{k}.jpg','wb').write(d[p:p+s]); p+=s
print(man, p==len(d))
