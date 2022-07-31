"use strict";(self.webpackChunkinstagram=self.webpackChunkinstagram||[]).push([[44],{6495:function(e,t,n){var s=n(5861),r=n(885),a=n(7757),i=n.n(a),c=n(2791),l=n(6030),o=n(5304);t.Z=function(){var e=(0,c.useContext)(o._),t=e.doc,n=e.db,a=e.collection,u=e.getDocs,d=e.getDoc,m=(0,l.v9)((function(e){return e.userReducer.user})),x=(0,c.useState)(),f=(0,r.Z)(x,2),p=(f[0],f[1]),h=function(){var e=(0,s.Z)(i().mark((function e(){var s,r;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s=t(n,"users",m.uid),e.next=3,d(s);case 3:r=e.sent,p(r.data());case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),j=function(){var e=(0,s.Z)(i().mark((function e(t){var s,r,c,l;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h();case 2:return s=a(n,"users"),e.next=5,u(s);case 5:return r=e.sent,console.log(r.docs),c=r.docs.map((function(e){return e.data()})),l=c.filter((function(e){return e.uid!==m.uid&&m.following.every((function(t){return t.uid!==e.uid}))})).slice(0,t).sort((function(){return.5-Math.random()})),e.abrupt("return",l);case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return{fetchUsers:j}}},7044:function(e,t,n){n.r(t),n.d(t,{default:function(){return V}});var s=n(2982),r=n(5861),a=n(885),i=n(7757),c=n.n(i),l=n(2791),o=n(8480),u=n(5304),d=n(6871),m=n(6030),x=n(8854),f=n(528),p=n(1413),h=n(6495),j=n(3504),v=n(795),g=n(7934),w=n(4177),N=n(184),y=function(e){var t=e.displayName,n=e.name,s=e.uid,r=e.imageUrl,i=(0,l.useState)(!1),c=(0,a.Z)(i,2),o=c[0],u=c[1],d=(0,v.Z)({displayName:t,uid:s,imageUrl:r,name:n}).hendleFollow,x=(0,m.v9)((function(e){return e.userReducer.user})),p=x.following&&x.following.find((function(e){return e.displayName===t}));return(0,N.jsxs)("div",{className:"flex justify-between items-center w-full my-2",children:[(0,N.jsx)(j.rU,{to:f.Sd+t,children:(0,N.jsx)("div",{className:"rounded-full w-[32px] mr-3",children:(0,N.jsx)("img",{alt:"userImage",src:"".concat(r||"/images/standart-profile.png"),className:"h-[32px] object-cover"})})}),(0,N.jsxs)("div",{className:"flex flex-col w-full",children:[(0,N.jsx)(j.rU,{to:f.Sd+t,children:(0,N.jsx)("p",{className:"text-sm font-semibold ",children:t})}),(0,N.jsx)("p",{className:"text-[10px] text-gray-500/80 tracking-wide",children:"Suggested for you"})]}),p?(0,N.jsxs)(N.Fragment,{children:[(0,N.jsx)("button",{type:"button",onClick:function(){return u(!0)},className:"active:opacity-60 text-xs font-semibold px-3",children:"Following"}),(0,N.jsx)(w.Z,{activeModal:o,setActiveModal:u,styleForContainerBlock:"fixed w-screen h-screen top-0 left-0 right-0 flex justify-center items-center z-10 cursor-default bg-black/60 duration-300",children:(0,N.jsx)(g.Z,{activeModal:o,imageUrl:r,displayName:t,name:n,uid:s,setActiveModal:u})})]}):(0,N.jsx)("button",{type:"button",onClick:function(){return d()},className:"active:opacity-60 text-xs text-[#0195f6] font-semibold px-3",children:"Follow"})]})},b=l.memo(y),Z=n(6839),k=function(){return(0,N.jsxs)("div",{className:"flex items-center my-2 h-[35px]",children:[(0,N.jsx)("div",{children:(0,N.jsx)(Z.Z,{circle:!0,width:32,height:32})}),(0,N.jsx)("div",{className:"w-full h-full",children:(0,N.jsx)(Z.Z,{width:100,height:6,count:2,containerClassName:"flex flex-col mt-2.5 ml-3",className:"mb-2"})}),(0,N.jsx)("div",{className:"h-full",children:(0,N.jsx)(Z.Z,{height:8,width:40,className:"mr-3 mt-2"})})]})},C=l.memo(k),S=(n(5862),function(){var e=(0,h.Z)().fetchUsers,t=(0,l.useState)([]),n=(0,a.Z)(t,2),s=n[0],i=n[1],o=(0,m.v9)((function(e){return e.userReducer.user})),u=(0,l.useState)(!1),x=(0,a.Z)(u,2),f=x[0],j=x[1],v=(0,d.s0)();(0,l.useEffect)((function(){j(!0);var t=function(){var t=(0,r.Z)(c().mark((function t(){var n;return c().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e(5);case 2:n=t.sent,i(n),j(!1);case 5:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();t()}),[]);var g=Array(5).fill(0).map((function(e,t){return(0,N.jsx)(C,{},t)})),w=(0,l.useMemo)((function(){return s.map((function(e){return(0,N.jsx)(b,(0,p.Z)({},e),e.uid)}))}),[s]);return(0,N.jsx)("aside",{className:"max-w-[330px] w-full mt-5",children:(0,N.jsxs)("div",{className:"w-full",children:[(0,N.jsxs)("div",{className:"w-full flex justify-between items-center",children:[(0,N.jsx)("div",{className:"rounded-full min-w-[56px] mr-4 overflow-hidden",children:(0,N.jsx)("img",{alt:"userPhoto",src:"".concat(o.imageUrl?o.imageUrl:"/images/standart-profile.png"),className:"h-[56px] w-[56px] object-cover"})}),(0,N.jsxs)("div",{className:"flex flex-col w-full",children:[(0,N.jsx)("p",{className:"font-semibold text-sm",children:o.displayName}),(0,N.jsx)("p",{className:"text-sm text-gray-500/70",children:o.name})]}),(0,N.jsx)("button",{type:"button",className:"text-xs font-semibold text-[#0195f6]",children:"Switch"})]}),(0,N.jsxs)("div",{className:"flex justify-between mt-4",children:[(0,N.jsx)("p",{className:"text-gray-500 font-semibold text-sm ",children:"Suggestions For You"}),(0,N.jsx)("button",{className:"text-xs",type:"button",onClick:function(){return v("/people")},children:"See All"})]}),(0,N.jsx)("div",{className:"flex flex-col mt-3",children:f?g:w}),(0,N.jsx)("p",{className:"text-gray-500/70 text-xs mt-5",children:"\xa9 2022 INSTAGRAN FROM META"})]})})}),U=l.memo(S),P=n(2987),F=n(5317),M=n(6832),E=n(3582),A=n(9536),R=n(1485),O=n(5298),I=function(e){var t=e.post,n=e.updatedCurrentPost,s=e.setUpdatedCurrentPost,r=(0,l.useState)(!1),i=(0,a.Z)(r,2),c=i[0],o=i[1];return(0,l.useEffect)((function(){n&&o(!0)}),[n]),(0,N.jsxs)("div",{className:"flex flex-row px-3 mt-2 w-full",children:[(0,N.jsx)("p",{style:{wordWrap:"break-word"},className:"text-sm font-semibold mr-2 hover:underline",children:(0,N.jsx)(j.rU,{to:"".concat(f.Sd).concat(t.user.displayName),children:t.user.displayName})}),(0,N.jsx)("p",{className:"text-sm w-full",children:t.comments[t.comments.length-1].text}),c&&(0,N.jsx)(O.Z,{postComment:t.comments[t.comments.length-1],updatedCurrentPost:n&&n,setUpdatedCurrentPost:s})]})},T=l.memo(I),D=function(e){var t,n=e.post,s=(0,l.useState)(n),r=(0,a.Z)(s,2),i=r[0],c=r[1],o=(0,l.useState)(!1),u=(0,a.Z)(o,2),m=u[0],x=u[1],p=(0,l.useState)(!1),h=(0,a.Z)(p,2),v=h[0],g=h[1],w=(0,l.useState)(""),y=(0,a.Z)(w,2),b=y[0],Z=y[1],k=(0,l.useState)([]),C=(0,a.Z)(k,2),S=C[0],U=C[1],O=(0,l.useRef)(null),I=(0,d.TH)().pathname.split("/").includes("saved"),D=(0,d.s0)(),z=(0,R.Z)(n.uid).split(" ");1==Number(z[0])?(z[1]=z[1].split("").slice(0,-1).join(""),z=z.join(" ")):z=z.join(" ");(0,l.useEffect)((function(){U(i.comments)}),[i]);return(0,N.jsxs)("div",{className:"flex flex-col max-w-[470px] w-full rounded-md bg-white my-2 border",children:[(0,N.jsxs)("div",{className:"w-full flex justify-between p-3 items-center",children:[(0,N.jsx)(j.rU,{to:f.Sd+n.user.displayName,children:(0,N.jsx)("div",{className:"rounded-full h-[32px] w-[32px] mr-3 overflow-hidden",children:(0,N.jsx)("img",{alt:"userPhoto",src:n.user.imageUrl?n.user.imageUrl:"/images/standart-profile.png",className:"h-[32px] object-cover"})})}),(0,N.jsx)("div",{className:"w-full",children:(0,N.jsx)(j.rU,{to:f.Sd+n.user.displayName,children:(0,N.jsx)("p",{className:"text-sm font-semibold",children:null===(t=n.user)||void 0===t?void 0:t.displayName})})}),(0,N.jsx)("button",{type:"button",children:(0,N.jsx)("img",{alt:"settings",src:"/images/option-icon.png",className:"h-[18px] "})})]}),(0,N.jsx)("div",{className:"w-full min-h-[470px] max-h-[600px] bg-black flex items-center",children:(0,N.jsx)("img",{className:"w-full min-h-[470px] max-h-[600px] object-contain",alt:"postPhoto",src:n.image})}),(0,N.jsxs)("div",{className:"flex justify-between p-3",children:[(0,N.jsxs)("div",{className:"flex items-center",children:[(0,N.jsx)(P.Z,{updatedCurrentPost:i,setUpdatedCurrentPost:c}),(0,N.jsx)("img",{alt:"comment",src:"/images/comment-icon.png",className:"h-[22px] w-[22px] mr-5 cursor-pointer hover:opacity-50",onClick:function(){return O.current.focus()}}),(0,N.jsx)(F.Z,{updatedCurrentPost:i})]}),(0,N.jsx)("div",{children:(0,N.jsx)(M.Z,{updatedCurrentPost:i,currentPost:n})})]}),i.likes&&i.likes.length>0?(0,N.jsxs)(N.Fragment,{children:[(0,N.jsxs)("p",{type:"button",className:"font-semibold text-sm border-none m-0 px-3 cursor-pointer",onClick:function(){return x(!0)},children:[i.likes&&i.likes.length," like"]}),(0,N.jsx)(E.Z,{activeModal:m,setActiveModal:x,likes:i.likes&&i.likes})]}):(0,N.jsxs)("p",{className:"text-sm px-3",children:["Be the first to ",(0,N.jsx)("span",{className:"font-semibold text-sm",children:"like this"})]}),n.text.length>0&&(0,N.jsxs)("div",{className:"flex flex-row px-3 mt-2",children:[(0,N.jsx)("p",{className:"text-sm font-semibold mr-2 hover:underline",children:(0,N.jsx)(j.rU,{to:"".concat(n.user.displayName),children:n.user.displayName})}),(0,N.jsx)("p",{className:"text-sm",children:n.text})]}),1===S.length&&0!==S.length?(0,N.jsx)(T,{post:i&&i,updatedCurrentPost:i&&i,setUpdatedCurrentPost:c}):S.length>1&&(0,N.jsxs)("div",{className:"mt-2",children:[(0,N.jsx)("button",{type:"button",onClick:function(){D("dashboard/".concat(i.user.displayName,"/").concat(i.uid))},children:(0,N.jsxs)("p",{className:"text-sm text-gray-500/70 mx-3",children:["View all ",i.comments.length," comments"]})}),(0,N.jsx)(T,{post:i&&i,updatedCurrentPost:i&&i,setUpdatedCurrentPost:c})]}),(0,N.jsxs)("p",{className:"text-[10px] mt-2 text-black/60 px-3 mb-3",children:[z.toUpperCase()," "," now"===z.toLowerCase()?"":" AGO"]}),(0,N.jsx)("div",{className:"w-full px-3 border-t",children:(0,N.jsx)(A.Z,{textComment:b,setTextComment:Z,setShowPicker:g,showPicker:v,commentRef:O,updatedCurrentPost:i,isCurrentPostSaved:!!I,setUpdatedCurrentPost:c,pickerStyle:{width:"310px",position:"absolute",top:"-320px",left:"-12px",zIndex:"21"}})})]})},z=l.memo(D),B=n(9617),H=function(){var e=(0,m.v9)((function(e){return e.userReducer.user})),t=(0,l.useContext)(u._),n=t.doc,i=t.db,o=t.getDoc,x=(0,l.useState)([]),f=(0,a.Z)(x,2),p=f[0],h=f[1],j=(0,l.useState)(!1),v=(0,a.Z)(j,2),g=v[0],w=v[1];(0,d.TH)();(0,l.useEffect)((function(){var t=function(){var t=(0,r.Z)(c().mark((function t(){var a;return c().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return w(!0),a=function(){var t=(0,r.Z)(c().mark((function t(){var a,l;return c().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=n(i,"users",e.uid),t.next=3,o(a);case 3:l=t.sent,l.data().following.forEach(function(){var e=(0,r.Z)(c().mark((function e(t){var r,a,l;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=n(i,"users",t.uid),e.next=3,o(r);case 3:a=e.sent,l=a.data(),h((function(e){return[].concat((0,s.Z)(e),(0,s.Z)(l.posts))}));case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}());case 6:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),t.next=4,a();case 4:w(!1);case 5:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();t()}),[]);var y=(0,l.useMemo)((function(){return p.sort((function(e,t){return t.uid-e.uid})).map((function(e){return(0,N.jsx)(z,{post:e},e.uid)}))}),[p]);return(0,N.jsx)(N.Fragment,{children:g?(0,N.jsx)("div",{className:"w-[470px] mr-10 h-full flex items-center justify-center h-[calc(100vh-65px)]",children:(0,N.jsx)(B.Z,{height:70,width:70})}):(0,N.jsx)("section",{className:"max-w-[470px] w-full md:mr-10",children:(0,N.jsx)("div",{className:"w-full",children:(0,N.jsxs)("ul",{className:"flex flex-col",children:[y,(0,N.jsx)(d.j3,{context:{posts:p}})]})})})})},_=l.memo(H),G=n(749),W=function(){var e=(0,G.Z)();return(0,N.jsxs)("div",{className:"flex justify-center mt-7 px-3",children:[(0,N.jsx)(_,{}),e.innerWidth>768?(0,N.jsx)(U,{}):null]})},Y=l.memo(W),L=function(){var e=(0,l.useState)([]),t=(0,a.Z)(e,2),n=(t[0],t[1]),i=(0,l.useContext)(u._),p=i.auth,h=i.db,j=i.doc,v=i.getDoc,g=(0,m.v9)((function(e){return e.userReducer.user})),w=(0,l.useState)(!1),y=(0,a.Z)(w,2),b=y[0],Z=y[1];return(0,l.useEffect)((function(){n([]);g.following.forEach(function(){var e=(0,r.Z)(c().mark((function e(t){var r,a,i;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=j(h,"users",t.uid),e.next=3,v(r);case 3:a=e.sent,i=a.data(),n((function(e){return[].concat((0,s.Z)(e),(0,s.Z)(i.posts))}));case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),g.following.length||Z(!0)}),[]),(0,N.jsxs)("div",{className:"bg-[#fafafa]",children:[!p.currentUser&&(0,N.jsx)(d.Fg,{to:f.H4}),(0,N.jsx)(o.Z,{}),b?(0,N.jsx)(x.Z,{}):(0,N.jsx)("main",{role:"main",children:(0,N.jsx)(Y,{})})]})},V=l.memo(L)},8854:function(e,t,n){n.d(t,{Z:function(){return y}});var s=n(2791),r=n(1413),a=n(5861),i=n(885),c=n(7757),l=n.n(c),o=(n(5304),n(6030)),u=n(3504),d=n(528),m=n(795),x=n(7934),f=n(4177),p=n(184),h=function(e){var t=e.displayName,n=e.uid,r=e.imageUrl,a=e.name;console.log(t,n,r,a);var c=(0,s.useState)(!1),l=(0,i.Z)(c,2),h=l[0],j=l[1],v=(0,m.Z)({displayName:t,uid:n,imageUrl:r,name:a}).hendleFollow,g=(0,o.v9)((function(e){return e.userReducer.user})),w=g.following&&g.following.find((function(e){return e.displayName===t}));return(0,p.jsxs)("div",{className:"flex justify-between items-center w-full px-5 py-1.5",children:[(0,p.jsx)(u.rU,{to:d.Sd+t,children:(0,p.jsx)("div",{className:"rounded-full w-[44px] mr-4 overflow-hidden",children:(0,p.jsx)("img",{alt:"userImage",src:"".concat(r||"/images/standart-profile.png"),className:"h-[44px] object-cover"})})}),(0,p.jsxs)("div",{className:"flex flex-col w-full",children:[(0,p.jsx)(u.rU,{to:d.Sd+t,children:(0,p.jsx)("p",{className:"text-sm font-semibold ",children:t})}),(0,p.jsx)("p",{className:"text-sm text-gray-500/80",children:a}),(0,p.jsx)("p",{className:"text-[10px] text-gray-500/80",children:"Suggested for you"})]}),w?(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)("button",{type:"button",onClick:function(){return j(!0)},className:"active:opacity-60 text-sm font-semibold border px-3.5 py-1",children:"Following"}),(0,p.jsx)(f.Z,{activeModal:h,setActiveModal:j,styleForContainerBlock:"fixed w-screen h-screen top-0 left-0 right-0 flex justify-center items-center z-10 cursor-default bg-black/60 duration-300",children:(0,p.jsx)(x.Z,{activeModal:h,imageUrl:r,displayName:t,name:a,uid:n,setActiveModal:j})})]}):(0,p.jsx)("button",{type:"button",onClick:function(){return v()},className:"active:opacity-60 text-white text-sm px-6 py-1.5 bg-[#0195f6] rounded font-semibold",children:"Follow"})]})},j=s.memo(h),v=n(6495),g=function(){var e=(0,s.useState)([]),t=(0,i.Z)(e,2),n=t[0],c=t[1],o=(0,v.Z)().fetchUsers;(0,s.useEffect)((function(){var e=function(){var e=(0,a.Z)(l().mark((function e(){var t;return l().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o(35);case 2:t=e.sent,c(t);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e()}),[]);var u=(0,s.useMemo)((function(){return n.map((function(e){return(0,p.jsx)(j,(0,r.Z)({},e),e.uid)}))}),[n]);return(0,p.jsx)("div",{className:"max-w-[600px] w-full bg-whiteflex flex-col items-center border mt-3 py-3 rounded",children:u})},w=s.memo(g),N=function(){return(0,p.jsxs)("section",{className:"flex flex-col items-center px-2",children:[(0,p.jsx)("div",{className:"max-w-[600px] w-full mt-5",children:(0,p.jsx)("p",{className:"font-semibold",children:"Suggestions For You"})}),(0,p.jsx)(w,{})]})},y=s.memo(N)},5862:function(){},6839:function(e,t,n){n.d(t,{Z:function(){return o}});var s=n(885),r=n(1413);function a(e,t){if(null==e)return{};var n,s,r=function(e,t){if(null==e)return{};var n,s,r={},a=Object.keys(e);for(s=0;s<a.length;s++)n=a[s],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(s=0;s<a.length;s++)n=a[s],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var i=n(2791),c=["count","wrapper","className","containerClassName","containerTestId","circle","style"],l=i.createContext({});function o(e){for(var t,n,o,u=e.count,d=void 0===u?1:u,m=e.wrapper,x=e.className,f=e.containerClassName,p=e.containerTestId,h=e.circle,j=void 0!==h&&h,v=e.style,g=a(e,c),w=i.useContext(l),N=(0,r.Z)({},g),y=0,b=Object.entries(g);y<b.length;y++){var Z=(0,s.Z)(b[y],2),k=Z[0];"undefined"===typeof Z[1]&&delete N[k]}var C=(0,r.Z)((0,r.Z)((0,r.Z)({},w),N),{},{circle:j}),S=(0,r.Z)((0,r.Z)({},v),function(e){var t=e.baseColor,n=e.highlightColor,s=e.width,r=e.height,a=e.borderRadius,i=e.circle,c=e.direction,l=e.duration,o=e.enableAnimation,u=void 0===o||o,d={};return"rtl"===c&&(d["--animation-direction"]="reverse"),"number"===typeof l&&(d["--animation-duration"]="".concat(l,"s")),u||(d["--pseudo-element-display"]="none"),"string"!==typeof s&&"number"!==typeof s||(d.width=s),"string"!==typeof r&&"number"!==typeof r||(d.height=r),"string"!==typeof a&&"number"!==typeof a||(d.borderRadius=a),i&&(d.borderRadius="50%"),"undefined"!==typeof t&&(d["--base-color"]=t),"undefined"!==typeof n&&(d["--highlight-color"]=n),d}(C)),U="react-loading-skeleton";x&&(U+=" ".concat(x));for(var P=null!==(t=C.inline)&&void 0!==t&&t,F=[],M=Math.ceil(d),E=0;E<M;E++){var A=S;if(M>d&&E===M-1){var R=null!==(n=A.width)&&void 0!==n?n:"100%",O=d%1,I="number"===typeof R?R*O:"calc(".concat(R," * ").concat(O,")");A=(0,r.Z)((0,r.Z)({},A),{},{width:I})}var T=i.createElement("span",{className:U,style:A,key:E},"\u200c");P?F.push(T):F.push(i.createElement(i.Fragment,{key:E},T,i.createElement("br",null)))}return i.createElement("span",{className:f,"data-testid":p,"aria-live":"polite","aria-busy":null===(o=C.enableAnimation)||void 0===o||o},m?F.map((function(e,t){return i.createElement(m,{key:t},e)})):F)}}}]);
//# sourceMappingURL=44.8961b83f.chunk.js.map