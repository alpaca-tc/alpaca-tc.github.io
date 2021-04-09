(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[646],{6770:function(e,t,n){"use strict";var r=n(5893);t.Z=function(e){var t=e.src,n=e.width,a=e.height,l=e.className;return(0,r.jsx)("img",{className:l,src:t,width:n,height:a})}},794:function(e,t,n){"use strict";n.d(t,{Z:function(){return g}});var r=n(5893),a=n(9008),l=n(4994),c=n(6770),s=n(1664),o=n(6265),i=n(8347),d=n(1163),x=n(7294);function m(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function h(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?m(Object(n),!0).forEach((function(t){(0,o.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):m(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var u=function(e){var t=e.children,n=e.hrefRe,a=e.activeClassName,l=(0,i.Z)(e,["children","hrefRe","activeClassName"]),c=l.href,o=(0,d.useRouter)(),m=x.Children.only(t),u=n&&n.test(o.pathname)||o.pathname===c?a:m.props.className;return(0,r.jsx)(s.default,h(h({},l),{},{children:x.cloneElement(m,{className:u})}))},f=/^(?:\/|\/posts\/.*)$/,p=function(){var e=(0,l.ri)();return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("div",{className:"relative z-20 flex justify-between items-center",children:[(0,r.jsxs)("div",{className:"flex lg:flex md:block items-center max-w-full",children:[(0,r.jsx)("div",{className:"mb-0 md:mb-4 lg:mb-0 flex flex-shrink-0 pr-4 md:pr-6 lg:pr-12",children:(0,r.jsx)(s.default,{href:"/",children:(0,r.jsx)("div",{className:"inline-block h-10 w-10 md:h-12 md:w-12 lg:h-20 lg:w-20",children:(0,r.jsx)("a",{className:"flex items-center no-underline",children:(0,r.jsx)(c.Z,{src:"/images/profile.jpg",alt:"",className:"rounded-full",width:"100%",height:"100%"})})})})}),(0,r.jsxs)("div",{children:[(0,r.jsx)(s.default,{href:"/",children:(0,r.jsx)("a",{className:"block text-black no-underline font-bold text-xl lg:text-3xl font-extrabold leading-none lg:leading-tight",children:"alpaca-tc"})}),(0,r.jsxs)("div",{className:"hidden md:flex mt-3 lg:mt-4 uppercase tracking-wide text-xs space-x-6",children:[(0,r.jsx)(u,{href:"/",hrefRe:f,activeClassName:"text-black font-semibold no-underline hover:text-black",children:(0,r.jsx)("a",{className:"text-gray-500 font-semibold no-underline hover:text-black",children:"Posts"})}),(0,r.jsx)(u,{href:"/about_me",activeClassName:"text-black font-semibold no-underline hover:text-black",children:(0,r.jsx)("a",{className:"text-gray-500 font-semibold no-underline hover:text-black",children:"About Me"})}),(0,r.jsx)(u,{href:"/works",activeClassName:"text-black font-semibold no-underline hover:text-black",children:(0,r.jsx)("a",{className:"text-gray-500 font-semibold no-underline hover:text-black",children:"Works"})}),(0,r.jsx)("a",{href:"https://github.com/alpaca-tc",className:"text-gray-500 font-semibold no-underline hover:text-black",target:"_blank",rel:"noreferrer",children:"GitHub"}),(0,r.jsx)("a",{href:"https://twitter.com/alpaca-tc",className:"text-gray-500 font-semibold no-underline hover:text-black",target:"_blank",rel:"noreferrer",children:"Twitter"})]})]})]}),(0,r.jsx)("div",{className:"block md:hidden",onClick:e.toggleHeader,children:(0,r.jsxs)("button",{className:"block",children:[(0,r.jsx)("svg",{fill:"currentColor",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",className:"text-black h-6 w-6 ".concat(e.opened?"hidden":"block"),children:(0,r.jsx)("path",{d:"M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"})}),(0,r.jsx)("svg",{fill:"currentColor",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",className:"text-black h-6 w-6 ".concat(e.opened?"block":"hidden"),children:(0,r.jsx)("path",{d:"M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"})})]})})]}),(0,r.jsx)("div",{className:"md:hidden z-10 bg-white fixed pt-24 pin block ".concat(!e.opened&&"hidden"),children:(0,r.jsxs)("div",{className:"space-y-8 overflow-y-auto pt-6 pb-8 px-12 max-h-full overflow-y-auto",children:[(0,r.jsx)(s.default,{href:"/",children:(0,r.jsx)("a",{onClick:e.closeHeader,className:"block text-black font-bold no-underline",children:"Posts"})}),(0,r.jsx)(s.default,{href:"/about_me",children:(0,r.jsx)("a",{onClick:e.closeHeader,className:"block text-black font-bold no-underline",children:"About Me"})}),(0,r.jsx)(s.default,{href:"/works",children:(0,r.jsx)("a",{onClick:e.closeHeader,className:"block text-black font-bold no-underline",children:"Works"})}),(0,r.jsx)("a",{onClick:e.closeHeader,href:"https://github.com/alpaca-tc",className:"block text-black font-bold no-underline",target:"_blank",rel:"noreferrer",children:"GitHub"}),(0,r.jsx)("a",{onClick:e.closeHeader,href:"https://twitter.com/alpaca-tc",className:"block text-black font-bold no-underline",target:"_blank",rel:"noreferrer",children:"Twitter"})]})})]})},j="alpaca-tc",b=function(){var e=(0,d.useRouter)();return"".concat("https://alpaca.tc").concat(e.asPath)},g=function(e){var t=e.children,n=e.title,c=e.description,s=void 0===c?"":c,o=(0,l.ri)().opened?"scrolling-auto overflow-hidden fixed pin-x":"",i=n?[n,j].join(" - "):j;return(0,r.jsxs)("div",{className:"py-8 lg:py-16 px-6 md:px-16 lg:px-24 ".concat(o),children:[(0,r.jsxs)(a.default,{children:[(0,r.jsx)("title",{children:i}),(0,r.jsx)("meta",{charSet:"utf-8"}),(0,r.jsx)("meta",{name:"viewport",content:"initial-scale=1.0, width=device-width"}),(0,r.jsx)("meta",{name:"title",content:i}),(0,r.jsx)("meta",{name:"description",content:s}),(0,r.jsx)("link",{rel:"shortcut icon",href:"/images/common/favicon.ico",type:"image/x-icon"}),(0,r.jsx)("meta",{name:"google-site-verification",content:"thSL3cUT7BV1-AENglRFIF-kv6I85JJ6_iUGAU8GaQI"}),(0,r.jsx)("meta",{property:"og:title",content:i}),(0,r.jsx)("meta",{property:"og:locale",content:"ja_JP"}),(0,r.jsx)("meta",{property:"og:image",content:"https://alpaca.tc/images/common/profile.jpg"}),(0,r.jsx)("meta",{property:"og:type",content:"blog"}),(0,r.jsx)("meta",{property:"og:url",content:b()}),(0,r.jsx)("meta",{property:"og:site_name",content:j}),(0,r.jsx)("meta",{property:"og:description",content:s}),(0,r.jsx)("meta",{property:"fb:app_id",content:"224701561024840"}),(0,r.jsx)("meta",{name:"twitter:card",content:"summary"}),(0,r.jsx)("meta",{name:"twitter:title",content:i}),(0,r.jsx)("meta",{name:"twitter:description",content:s}),(0,r.jsx)("meta",{name:"twitter:image",content:"https://alpaca.tc/images/meta/twitter.jpg"}),(0,r.jsx)("meta",{name:"twitter:site",content:"@alpaca_tc"}),(0,r.jsx)("meta",{name:"twitter:creator",content:"@alpaca_tc"})]}),(0,r.jsx)(p,{}),(0,r.jsx)("div",{className:"lg:pl-32 mt-12",children:t})]})}},4994:function(e,t,n){"use strict";n.d(t,{I7:function(){return c},ri:function(){return s}});var r=n(5893),a=n(7294),l=(0,a.createContext)({opened:!1});function c(e){var t=e.children,n=(0,a.useState)(!1),c=n[0],s=n[1];return(0,r.jsx)(l.Provider,{value:{opened:c,toggleHeader:function(){s((function(e){return!e}))},closeHeader:function(){s(!1)}},children:t})}function s(){var e=(0,a.useContext)(l);if(void 0===e)throw new Error("useHeaderState must be used within HeaderProvider");return e}},8021:function(e,t,n){"use strict";var r=n(7484),a=n.n(r);n(6831);a().locale("ja"),t.Z=a()},8096:function(e,t,n){"use strict";n.r(t),n.d(t,{__N_SSG:function(){return o},default:function(){return i}});var r=n(5893),a=n(9008),l=n(794),c=n(8021),s=function(e){var t=e.post;return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("div",{className:"text-grey-dark uppercase font-semibold text-xs tracking-wide",children:(0,c.Z)(t.date).format("YYYY-MM-DD")}),(0,r.jsx)("h1",{className:"text-2xl font-extrabold text-black leading-tight mt-1 mb-6",children:t.title})]})},o=!0,i=function(e){var t=e.post;return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a.default,{children:(0,r.jsx)("title",{children:t.title})}),(0,r.jsx)(l.Z,{title:t.title,children:(0,r.jsxs)("article",{className:"max-w-3xl md:mt-6 rounded-xl mx-auto bg-white dark:bg-cool-gray-800",children:[(0,r.jsx)(s,{post:t}),(0,r.jsx)("div",{className:"prose max-w-3xl mx-auto dark:text-cool-gray-100",dangerouslySetInnerHTML:{__html:t.content}})]})})]})}},4550:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/posts/[id]",function(){return n(8096)}])}},function(e){e.O(0,[774,351,3],(function(){return t=4550,e(e.s=t);var t}));var t=e.O();_N_E=t}]);