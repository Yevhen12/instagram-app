"use strict";(self.webpackChunkinstagram=self.webpackChunkinstagram||[]).push([[526],{6495:function(e,t,n){var r=n(5861),s=n(885),a=n(7757),c=n.n(a),i=n(2791),u=n(6030),o=n(9062),l=n(4592);t.Z=function(){var e=(0,u.v9)((function(e){return e.userReducer.user})),t=(0,i.useState)(),n=(0,s.Z)(t,2),a=(n[0],n[1]),f=function(){var t=(0,r.Z)(c().mark((function t(){var n,r;return c().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=(0,o.JU)(l.db,"users",e.uid),t.next=3,(0,o.QT)(n);case 3:r=t.sent,a(r.data());case 5:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),m=function(){var t=(0,r.Z)(c().mark((function t(n){var r,s,a,i;return c().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,f();case 2:return r=(0,o.hJ)(l.db,"users"),t.next=5,(0,o.PL)(r);case 5:return s=t.sent,console.log(s.docs),a=s.docs.map((function(e){return e.data()})),i=a.filter((function(t){return t.uid!==e.uid&&e.following.every((function(e){return e.uid!==t.uid}))})).slice(0,n).sort((function(){return.5-Math.random()})),t.abrupt("return",i);case 10:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();return{fetchUsers:m}}},9526:function(e,t,n){n.r(t),n.d(t,{default:function(){return w}});var r=n(2982),s=n(5861),a=n(885),c=n(7757),i=n.n(c),u=n(2791),o=n(4229),l=n(3504),f=n(184),m=function(e){var t=e.post,n=e.idx,r=(0,u.useState)(!1),s=(0,a.Z)(r,2),c=s[0],i=s[1];console.log(t.image);var o=function(e){return(6+e)%8===0}(n+1);return(0,f.jsx)(f.Fragment,{children:(0,f.jsx)("div",{className:" border relative cursor-pointer aspect-square bg-black ".concat(o?"row-span-2 col-span-2":"row-span-1 col-span-1"),onMouseEnter:function(){return i(!0)},onMouseLeave:function(){return i(!1)},children:(0,f.jsxs)(l.rU,{to:"".concat(t.user.displayName,"/").concat(t.uid),children:[c&&(0,f.jsxs)("div",{className:"w-full h-full absolute flex justify-center items-center bg-black/25",children:[(0,f.jsxs)("div",{className:"flex items-center mr-5",children:[(0,f.jsx)("img",{alt:"likes",src:"/instagram-app/images/heart-white-icon.png",className:"w-5 h-5 mr-2"}),(0,f.jsx)("p",{className:"text-white text-sm font-semibold",children:t.likes.length})]}),(0,f.jsxs)("div",{className:"flex items-center",children:[(0,f.jsx)("img",{alt:"comments",src:"/instagram-app/images/speech-bubble-white-icon.png",className:"w-5 h-5 mr-2"}),(0,f.jsx)("p",{className:"text-white text-sm font-semibold",children:t.comments.length})]})]}),(0,f.jsx)("img",{alt:"userPhoto",src:t.image,className:"w-full h-full object-cover"})]})})})},d=u.memo(m),h=n(6871),p=function(e){var t=e.allPosts,n=(0,u.useMemo)((function(){return t.map((function(e,t){return(0,f.jsx)(d,{idx:t,post:e},e.uid)}))}),[t]);return(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)("section",{className:"flex justify-center w-full",children:(0,f.jsx)("div",{className:"container max-w-5xl mt-3 relative pl-5",children:(0,f.jsx)("div",{className:"grid sm:gap-3 lg:gap-7 gap-1 grid-cols-3 grid-cols-3 auto-cols-[300px] auto-rows-auto mt-3",children:n})})}),t.length>0&&(0,f.jsx)(h.j3,{context:{posts:t}})]})},x=u.memo(p),g=n(6495),v=n(9617),j=function(){var e=(0,u.useState)([]),t=(0,a.Z)(e,2),n=t[0],c=t[1],l=(0,g.Z)().fetchUsers;return(0,u.useEffect)((function(){var e=function(){var e=(0,s.Z)(i().mark((function e(){var t,n;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,l(100);case 2:t=e.sent,n=[],t.forEach((function(e){n.push.apply(n,(0,r.Z)(e.posts))})),n.sort((function(){return.5-Math.random()})),c(n);case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e()}),[]),(0,f.jsxs)("div",{className:"w-full h-full",children:[(0,f.jsx)(o.Z,{}),n.length>0?(0,f.jsx)(x,{allPosts:n}):(0,f.jsx)("div",{className:"h-[calc(100vh-65px)]",children:(0,f.jsx)(v.Z,{width:50,height:50})})]})},w=u.memo(j)}}]);
//# sourceMappingURL=526.7ca55d67.chunk.js.map