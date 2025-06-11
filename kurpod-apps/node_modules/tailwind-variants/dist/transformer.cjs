'use strict';

var V = require('tailwindcss/resolveConfig');
var w = require('fs');
var O = require('path');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var V__default = /*#__PURE__*/_interopDefault(V);
var w__default = /*#__PURE__*/_interopDefault(w);
var O__default = /*#__PURE__*/_interopDefault(O);

var S=t=>{w__default.default.writeFileSync(O__default.default.join(__dirname,"generated.d.ts"),t);},C=t=>`export type TVGeneratedScreens = ${Object.keys(t).map(e=>`"${e}"`).join(" | ")};
`,v=t=>{queueMicrotask(()=>{if(t!=null&&t.screens){let e=C(t.screens);S(e);}});};var u={tv:/tv\s*\((.*?)\)/gs,tvExtend:/extend:\s*\w+(,| )\s*/,comment:/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm,blankLine:/^\s*$(?:\r\n?|\n)/gm,extension:/\.\w+/g},l=t=>Array.isArray(t),E=t=>typeof t=="string",p=t=>typeof t=="object",$=t=>typeof t=="boolean",y=t=>typeof t=="function",c=t=>!!(!t||l(t)&&t.length===0||E(t)&&t.length===0||p(t)&&Object.keys(t).length===0),k=(t,e)=>{let n={},r=e.length,s=Object.prototype.hasOwnProperty;for(let i=0;i<r;i++){let o=e[i];s.call(t,o)&&(n[o]=t[o]);}return n},A=(t,e)=>{let n="https://github.com/nextui-org/tailwind-variants/issues/new/choose";console.log("\x1B[31m%s\x1B[0m",`${t}: ${e.message}`),console.log(`If you think this is an issue, please submit it at ${n}`);},x=(...t)=>e=>t.reduce((n,r)=>r(n),e),F=t=>{let n=t.replace(u.comment,"$1").toString().replace(u.blankLine,"").toString(),r=s=>s[1].replace(u.tvExtend,"").toString();return Array.from(n.matchAll(u.tv),r)},B=t=>{let e=F(t);if(!c(e))return e.map(n=>n.includes("responsiveVariants")?new Function(`
      const [options, config] = [${n.toString()}];
      return {options, config};
    `)():{})},h=t=>t.flatMap(e=>e).toString().replaceAll(","," ").split(" "),D=(t,e)=>{let n={};for(let[r,s]of Object.entries(t))n[r]={},n[r].original=s,!c(s)&&(n.temp=l(s)?h(s):s.split(" "),e.forEach(i=>{let o="";n.temp.forEach(a=>{o+=`${i}:${a} `;}),n[r][i]=o.trimEnd();}),delete n.temp);return n},L=(t,e)=>E(t)?t.split(" "):l(t)?h(t):p(t)?D(t,e):t,b=(t,e)=>{let n={};for(let[r,s]of Object.entries(t))if(n[r]={},!c(s))for(let[i,o]of Object.entries(s)){if(n[r][i]={},n[r][i].original=o,c(o))continue;let a=L(o,e);if(!c(a)){if(!l(a)){n[r][i]=a;continue}e.forEach(m=>{let f="";a.forEach(d=>{f+=`${m}:${d} `;}),n[r][i][m]=f.trimEnd();});}}return n},T=({options:t,config:e},n)=>{var i,o;let r=(i=t==null?void 0:t.variants)!=null?i:{},s=(o=e==null?void 0:e.responsiveVariants)!=null?o:!1;if(!(!s||c(r))){if($(s))return b(r,n);if(l(s))return b(r,s);if(p(s)){let a=[];for(let[m,f]of Object.entries(s)){if(!f||c(f))continue;let j={options:{variants:k(r,[m])},config:{responsiveVariants:f}};a.push(T(j,n));}return a}}},N=(t,e)=>{try{if(!t.includes("tailwind-variants"))return t;let n=B(t);if(c(n))return t;let r=JSON.stringify(n.map(o=>T(o,e)),void 0,2),s=`
/* Tailwind Variants Transformed Content Start

`,i=`

Tailwind Variants Transformed Content End */
`;return t.concat(s+r+i)}catch(n){return A("Tailwind Variants Transform Failed",n),t}},g=t=>{let e=t.map(n=>{if(p(n)&&n.extension)return n.extension;let r=n.match(u.extension);return r||(r=n.split("{"),r=r.pop().replace("}","").split(",")),r.map(s=>s.replace(".","").split(".")).flat()}).flatMap(n=>n);return Array.from(new Set(e)).filter(n=>n!=="html")},G=t=>{var s;let e=V__default.default(t);if(v(e.theme),c((s=e.content)==null?void 0:s.files)||!l(e.content.files))return e;let n=i=>{var o,a;return N(i,Object.keys((a=(o=e.theme)==null?void 0:o.screens)!=null?a:{}))},r=e.content.transform;if(c(r)){let o=g(e.content.files).map(a=>[a,n]);return e.content.transform=Object.fromEntries(o),e}if(y(r)){let o=g(e.content.files).map(a=>[a,x(n,r)]);return e.content.transform=Object.fromEntries(o),e}if(p(r)){let o=g(e.content.files).map(a=>y(r[a])?[a,x(n,r[a])]:[a,n]);return e.content.transform=Object.fromEntries(o),e}return e};

exports.tvTransformer = N;
exports.withTV = G;
