(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[277],{5308:function(e,t,n){"use strict";n.d(t,{Z:function(){return c}});var r=n(5893),a=n(1664),s=n(1163),l=function(e){var t=e.currentPage,n=e.totalCount,l=e.per,o=e.basePath,i=function(e){var n="".concat(o,"/").concat(t+e);s.default.push(n)},c=Math.floor(n/l)+1,d=function(e,t,n){for(var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:5,a=Math.ceil(e/t),s=Math.floor(r/2),l=n+s,o=[],i=n-s;i<=l;i++)1<=i&&i<=a&&o.push(i);return o}(n,l,t);return(0,r.jsxs)("nav",{"aria-label":"Pagination",className:"max-w-md",children:[(0,r.jsxs)("div",{className:"relative z-0 inline-flex rounded-md shadow-sm -space-x-px",children:[(0,r.jsxs)("a",{onClick:function(){return i(-1)},className:"relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ".concat(t<=1?"hidden":""),children:[(0,r.jsx)("span",{className:"sr-only",children:"Previous"}),(0,r.jsx)("svg",{className:"h-5 w-5",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true",children:(0,r.jsx)("path",{fillRule:"evenodd",d:"M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z",clipRule:"evenodd"})})]}),d.map((function(e){return(0,r.jsx)(a.default,{href:"".concat(o,"/").concat(e),children:(0,r.jsx)("a",{className:"relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 ".concat(t===e?"bg-gray-100":""),children:e})},e)})),(0,r.jsxs)("a",{onClick:function(){return i(1)},className:"relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ".concat(t>=c?"hidden":""),children:[(0,r.jsx)("span",{className:"sr-only",children:"Next"}),(0,r.jsx)("svg",{className:"h-5 w-5",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true",children:(0,r.jsx)("path",{fillRule:"evenodd",d:"M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z",clipRule:"evenodd"})})]})]}),(0,r.jsxs)("p",{className:"text-sm text-gray-700 mt-1 text-center",children:["Page ",t," / ",c]})]})},o=n(8021),i=function(e){var t=e.post;return(0,r.jsxs)("div",{children:[(0,r.jsx)("span",{className:"block text-gray-500 uppercase font-semibold text-xs tracking-wide mb-1",children:(0,o.Z)(t.date).format("YYYY-MM-DD")}),(0,r.jsx)(a.default,{href:"/posts/".concat(t.id),children:(0,r.jsx)("a",{className:"text-lg text-black font-bold no-underline hover:underline",children:t.title})})]})},c=function(e){var t=e.posts,n=e.totalCount,a=e.perCount,s=e.currentPage;return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("div",{className:"mb-10 space-y-6",children:t.map((function(e){return(0,r.jsx)(i,{post:e},e.id)}))}),(0,r.jsx)(l,{totalCount:n,currentPage:s,per:a,basePath:"/posts/page"})]})}},1317:function(e,t,n){"use strict";n.r(t),n.d(t,{__N_SSG:function(){return l}});var r=n(5893),a=n(794),s=n(5308),l=!0;t.default=function(e){var t=e.totalPostsCount,n=e.posts,l=e.page;return(0,r.jsx)(a.Z,{title:"Posts - ".concat(l),children:(0,r.jsx)("div",{className:"mt-12 space-y-6",children:(0,r.jsx)(s.Z,{posts:n,totalCount:t,perCount:10,currentPage:l})})})}},7234:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/posts/page/[page]",function(){return n(1317)}])}},function(e){e.O(0,[774,679,968,711],(function(){return t=7234,e(e.s=t);var t}));var t=e.O();_N_E=t}]);