(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[966],{6086:function(n){"use strict";var e=Object.assign.bind(Object);n.exports=e,n.exports.default=n.exports},1209:function(n,e,t){"use strict";t.r(e);var s,i=t(5893),c=t(7625),a=t(1436),r=t(7294);e.default=function(){var n=(0,r.useState)(!1),e=n[0],t=n[1];console.log(e);var o=(0,r.useCallback)((function(){var n,e;t(!0),n="/music/alert.mp3",(s=s||new Audio(n)).currentTime=0,s.play(),(e=5500,new Promise((function(n){setTimeout((function(){s.pause(),n()}),e)}))).then((function(){t(!1)}))}),[e,t]),u=(0,i.jsx)("div",{className:"w-screen h-screen bg-red-400 fixed t-0 l-0",style:{animation:"flash 1s linear infinite"},children:(0,i.jsx)("style",{children:"\n          @keyframes flash {\n            0%,100% {\n              opacity: 1;\n            }\n\n            50% {\n              opacity: 0;\n            }\n          }\n        "})});return(0,i.jsxs)("div",{className:"w-screen h-screen flex flex-column content-center items-center",children:[(0,i.jsx)("div",{className:"w-auto m-auto",children:(0,i.jsx)(c.G,{icon:a.eHv,className:"text-gray-400 hover:text-black transition duration-300",size:"9x",onClick:o})}),e?u:null]})}},6599:function(n,e,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/alert",function(){return t(1209)}])}},function(n){n.O(0,[774,523,625],(function(){return e=6599,n(n.s=e);var e}));var e=n.O();_N_E=e}]);