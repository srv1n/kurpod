'use strict';

var n = require('fs');
var s = require('path');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var n__default = /*#__PURE__*/_interopDefault(n);
var s__default = /*#__PURE__*/_interopDefault(s);

var t=e=>{n__default.default.writeFileSync(s__default.default.join(__dirname,"generated.d.ts"),e);},c=e=>`export type TVGeneratedScreens = ${Object.keys(e).map(r=>`"${r}"`).join(" | ")};
`,p=e=>{queueMicrotask(()=>{if(e!=null&&e.screens){let r=c(e.screens);t(r);}});};

exports.generateTypes = p;
