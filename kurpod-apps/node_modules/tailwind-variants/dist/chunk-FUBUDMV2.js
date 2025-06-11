import n from 'fs';
import s from 'path';

var t=e=>{n.writeFileSync(s.join(__dirname,"generated.d.ts"),e);},c=e=>`export type TVGeneratedScreens = ${Object.keys(e).map(r=>`"${r}"`).join(" | ")};
`,p=e=>{queueMicrotask(()=>{if(e!=null&&e.screens){let r=c(e.screens);t(r);}});};

export { p as a };
