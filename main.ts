import{mkdirSync,readdirSync,readFileSync,writeFileSync}from'node:fs';
import{join}from'node:path';
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output';
const T={0:[0,0,0],1:[1,0,1],2:[4,0,1],3:[0,1,0],4:[0,1,2],5:[0,2,2],6:[0,2,3],7:[0,3,3],16:[0,2,1],17:[0,2,1],18:[0,2,1],19:[0,2,1],20:[0,2,1],21:[0,2,1],22:[0,2,1],23:[0,1,1],24:[0,2,1],25:[0,2,1],26:[0,2,1],27:[0,1,1],28:[0,2,1],29:[0,2,1],30:[0,2,1],32:[0,2,1],33:[0,2,1],34:[0,2,1],48:[2,0,0],49:[2,1,0],50:[2,1,0],51:[2,0,0],52:[0,0,0],64:[0,1,1],65:[0,2,0],80:[0,1,0],81:[0,1,0],82:[0,0,1],83:[0,1,0]};
const e=new TextEncoder();
function run(p,q){
const n=p.length,D=new Int32Array(256);let s=0;const C=new Int32Array(64);let c=0;const M=new Int32Array(256),o=new Uint8Array(65536);let l=0,i=0,x=0,t=0;
const f=v=>[o.slice(0,l),v];
for(;;){
if(t===1e6)return f(10);
if(x<0||x>=n)return f(9);
const g=p[x],d=T[g];
if(!d)return f(5);
if(x+d[0]>=n)return f(9);
t++;const y=x+1+d[0];
if(s<d[1])return f(2);
if(s-d[1]+d[2]>256)return f(3);
x=y;
switch(g){
case 0:return f(0);
case 1:D[s++]=(p[y-1]<<24)>>24;break;
case 2:D[s++]=p[y-4]|p[y-3]<<8|p[y-2]<<16|p[y-1]<<24;break;
case 3:s--;break;
case 4:D[s]=D[s-1];s++;break;
case 5:{const z=D[s-1];D[s-1]=D[s-2];D[s-2]=z;break;}
case 6:D[s]=D[s-2];s++;break;
case 7:{const a=D[s-3];D[s-3]=D[s-2];D[s-2]=D[s-1];D[s-1]=a;break;}
case 23:D[s-1]=-D[s-1]|0;break;
case 27:D[s-1]=~D[s-1];break;
case 16:case 17:case 18:case 19:case 20:case 21:case 22:case 24:case 25:case 26:case 28:case 29:case 30:case 32:case 33:case 34:{
const b=D[s-1],a=D[s-2];let r;
switch(g){
case 16:r=(a+b)|0;break;
case 17:r=(a-b)|0;break;
case 18:r=Math.imul(a,b);break;
case 19:if(!b)return f(4);r=a===-2147483648&&b===-1?a:(a/b)|0;break;
case 20:if(!b)return f(4);r=b===-1?0:(a%b)|0;break;
case 21:if(!b)return f(4);r=Math.floor((a>>>0)/(b>>>0))|0;break;
case 22:if(!b)return f(4);r=((a>>>0)%(b>>>0))|0;break;
case 24:r=a&b;break;
case 25:r=a|b;break;
case 26:r=a^b;break;
case 28:r=a<<(b&31);break;
case 29:r=a>>(b&31);break;
case 30:r=(a>>>(b&31))|0;break;
case 32:r=a===b?1:0;break;
case 33:r=a<b?1:0;break;
default:r=(a>>>0)<(b>>>0)?1:0;
}
s-=2;D[s++]=r;break;}
case 48:case 49:case 50:{
const v=((p[y-2]|p[y-1]<<8)<<16)>>16;
if(g===48||(g===49?D[--s]===0:D[--s]!==0))x=y+v;
break;}
case 51:if(c===64)return f(7);C[c++]=y;x=p[y-2]|p[y-1]<<8;break;
case 52:if(!c)return f(8);x=C[--c];break;
case 64:{const a=D[s-1];if(a<0||a>=256)return f(6);D[s-1]=M[a];break;}
case 65:{const a=D[s-1],v=D[s-2];if(a<0||a>=256)return f(6);s-=2;M[a]=v;break;}
case 80:{const b=e.encode(String(D[s-1]));if(l+b.length>65536)return f(11);s--;o.set(b,l);l+=b.length;break;}
case 81:if(l+1>65536)return f(11);o[l++]=D[--s]&255;break;
case 82:D[s++]=i<q.length?q[i++]:-1;break;
default:return f(D[--s]&255);
}
}
}
for(const id of readdirSync(I).sort()){
const[a,b]=run(new Uint8Array(readFileSync(join(I,id,'program.bin'))),new Uint8Array(readFileSync(join(I,id,'input.bin'))));
mkdirSync(join(O,id),{recursive:true});
writeFileSync(join(O,id,'stdout.bin'),a);
writeFileSync(join(O,id,'exit.txt'),b+'\n');
}
