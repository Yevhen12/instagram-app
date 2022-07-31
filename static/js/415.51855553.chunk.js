"use strict";(self.webpackChunkinstagram=self.webpackChunkinstagram||[]).push([[415,697],{3697:function(e,t,s){s.r(t);var a=s(2791),r=s(184),n=function(){return(0,r.jsx)("h1",{children:"Not Found"})};t.default=a.memo(n)},6415:function(e,t,s){s.r(t),s.d(t,{default:function(){return A}});var a=s(5861),r=s(7757),n=s.n(r),c=s(2791),i=s(8480),l=s(6030),o=s(6871),d=s(5304),m=s(2539),u=s(885),p=s(1413),x=(s(1492),s(3437)),f=s(184),h=function(e){var t=e.activeModal,s=e.setActiveModal,r=e.setIsLoading,i=(0,c.useContext)(d._),o=i.ref,m=i.storage,u=i.uploadBytes,h=i.auth,g=i.getDownloadURL,j=i.doc,b=i.db,v=i.updateDoc,N=(i.getDoc,i.deleteObject),y=i.setFirestoreCurrentUser,w=(0,l.v9)((function(e){return e.userReducer.user})),k=(0,l.I0)(),U=function(){var e=(0,a.Z)(n().mark((function e(t){var a,c,i,l,d,f,U;return n().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r(!0),s(!1),a=h.currentUser,c=a.uid,i=t.target.files[0],l="/images/".concat(c,"/avatar/").concat(i.name),d=o(m,l),!w.imageUrl){e.next=10;break}return e.next=10,N(o(m,w.imageUrl));case 10:return e.next=12,u(d,i);case 12:return e.next=14,g(o(m,l));case 14:return f=e.sent,U=j(b,"users","".concat(a.uid)),e.next=18,v(U,{imageUrl:"".concat(f)});case 18:y((0,p.Z)((0,p.Z)({},w),{},{imageUrl:f})),k((0,x.a)((0,p.Z)((0,p.Z)({},w),{},{imageUrl:f}))),r(!1);case 21:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),Z=function(){var e=(0,a.Z)(n().mark((function e(){var t;return n().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s(!1),e.next=3,N(o(m,w.imageUrl));case 3:return t=j(b,"users","".concat(w.uid)),e.next=6,v(t,{imageUrl:""});case 6:y((0,p.Z)((0,p.Z)({},w),{},{imageUrl:""})),k((0,x.a)((0,p.Z)((0,p.Z)({},w),{},{imageUrl:""})));case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),C=function(){s(!1)};return(0,f.jsx)("div",{onClick:C,className:"w-full h-full bg-black/60 fixed top-0 left-0 flex justify-center items-center z-20 duration-300 px-3 ".concat(t?"opacity-1 pointer-events-auto":"opacity-0 pointer-events-none"),children:(0,f.jsxs)("div",{onClick:function(e){return e.stopPropagation()},className:"bg-white w-[400px]  rounded-xl duration-300  ".concat(t?"scale-100":"scale-50"),children:[(0,f.jsx)("div",{className:"pt-7 pb-7 border-b",children:(0,f.jsx)("p",{className:"text-lg font-semibold text-center",children:"Change profile photo"})}),(0,f.jsxs)("label",{className:"cursor-pointer w-full pt-3 pb-3 text-sm font-bold text-sky-600 block text-center",children:["Upload Photo",(0,f.jsx)("input",{type:"file",onChange:U,className:"hidden"})]}),(0,f.jsx)("button",{disabled:!w.imageUrl,className:"w-full pt-3 pb-3 text-sm font-bold text-red-500 border-t ".concat(!w.imageUrl&&"cursor-not-allowed text-red-200"),onClick:Z,children:"Remove current photo"}),(0,f.jsx)("button",{className:"w-full pt-3 pb-3 text-sm border-t",onClick:C,children:"Cancel"})]})})},g=c.memo(h),j=s(3504),b=s(519),v=s(9617),N=function(){var e=(0,c.useState)(!1),t=(0,u.Z)(e,2),s=t[0],a=t[1],r=(0,l.v9)((function(e){return e.userReducer.user})),n=(0,o.TH)(),i=(0,c.useState)(!1),d=(0,u.Z)(i,2),m=d[0],p=d[1];console.log(n);return(0,f.jsx)(f.Fragment,{children:r.displayName&&(0,f.jsx)("section",{className:"flex justify-center",children:(0,f.jsxs)("div",{className:"container max-w-5xl mt-7 relative pl-5 pr-5 flex flex-col",children:[(0,f.jsxs)("div",{className:"w-full flex mb-10 md:flex-row flex-col justify-center",children:[(0,f.jsxs)("div",{className:"md:max-w-[18rem] w-full md:min-w-[12rem] flex justify-center mr-5 mb-5",children:[(0,f.jsx)("button",{className:"rounded-full border overflow-hidden",onClick:function(){a(!0)},children:(0,f.jsxs)("div",{className:"w-36 h-36 relative",children:[(0,f.jsx)("img",{className:"w-full h-full object-cover ".concat(m&&"opacity-45"),src:"".concat(r.imageUrl?r.imageUrl:"/instagram-app/images/standart-profile.png")}),m&&(0,f.jsx)("div",{className:"absolute top-16 left-16",children:(0,f.jsx)(v.Z,{height:23,width:23})})]})}),(0,f.jsx)(g,{activeModal:s,setActiveModal:a,setIsLoading:p})]}),(0,f.jsxs)("div",{className:"w-full flex flex-col md:items-start items-center",children:[(0,f.jsxs)("div",{className:"flex items-start mb-8",children:[(0,f.jsx)("p",{className:"font-thin text-3xl mr-5 ",children:r.displayName}),(0,f.jsx)("button",{className:"rounded border px-2.5 py-1 text-sm font-semibold mr-5",type:"button",children:"Edit profile"}),(0,f.jsx)("div",{className:"h-6 w-6",children:(0,f.jsx)("img",{src:"/instagram-app/images/settings-icon.png"})})]}),(0,f.jsxs)("div",{className:"flex items-center",children:[(0,f.jsxs)("p",{className:"mr-10",children:[(0,f.jsx)("span",{className:"font-semibold",children:r.posts.length})," posts"]}),(0,f.jsx)(j.rU,{to:"".concat(b.HP),children:(0,f.jsxs)("p",{className:"font-semibold mr-10",children:[r.followers.length,(0,f.jsx)("span",{className:"font-normal",children:" followers"})]})}),(0,f.jsx)(j.rU,{to:"".concat(b.cd),children:(0,f.jsxs)("p",{className:"font-semibold",children:[r.following.length,(0,f.jsx)("span",{className:"font-normal",children:" following"})]})})]})]})]}),(0,f.jsxs)("div",{className:"border-t w-full flex justify-center",children:[(0,f.jsx)("div",{className:"mr-14 opacity-50 border-t active:opacity-25 ".concat(n.pathname==="/"+r.displayName?"border-black opacity-100":"border-transparent"),"data-name":"posts",children:(0,f.jsx)(j.rU,{to:"".concat(b.vA),children:(0,f.jsxs)("div",{className:"h-12 flex justify-between items-center",children:[(0,f.jsx)("img",{className:"h-3 mr-2",src:"/instagram-app/images/grid-icon.png"}),(0,f.jsx)("p",{className:"text-xs tracking-widest font-medium",children:"POSTS"})]})})}),(0,f.jsx)("div",{className:"mr-14 opacity-50 border-t active:opacity-25 ".concat(n.pathname==="/"+r.displayName+"/saved"?"border-black opacity-100":"border-transparent"),"data-name":"saved",children:(0,f.jsx)(j.rU,{to:"".concat(b.si),children:(0,f.jsxs)("div",{className:"h-12 flex justify-between items-center",children:[(0,f.jsx)("img",{className:"h-3 mr-2",src:"/instagram-app/images/save-icon.png"}),(0,f.jsx)("p",{className:"text-xs tracking-widest font-medium",children:"SAVED"})]})})}),(0,f.jsx)("div",{className:"mr-14 opacity-50 border-t active:opacity-25 ".concat(n.pathname==="/"+r.displayName+"/tagged"?"border-black opacity-100":"border-transparent"),"data-name":"tagged",children:(0,f.jsx)(j.rU,{to:"".concat(b.LD),children:(0,f.jsxs)("div",{className:"h-12 flex justify-between items-center",children:[(0,f.jsx)("img",{className:"h-3 mr-2",src:"/instagram-app/images/mark-profile-icon.png"}),(0,f.jsx)("p",{className:"text-xs tracking-widest font-medium",children:"TAGGED"})]})})})]}),(0,f.jsx)(o.j3,{context:{posts:r.posts.sort((function(e,t){return t.uid-e.uid})),savedPosts:r.savedPosts.sort((function(e,t){return t.uid-e.uid}))}})]})})})},y=c.memo(N),w=s(3697),k=s(4177),U=s(7934),Z=s(795),C=s(6974),P=function(){var e=(0,l.v9)((function(e){return e.currentProfileUserReducer.user})),t=(0,l.v9)((function(e){return e.userReducer.user})),s=(0,l.v9)((function(e){return e.chatsReducer.chats})),r=(0,c.useState)(!1),i=(0,u.Z)(r,2),d=i[0],m=i[1],p=(0,C.Z)(s).createChat,x=(0,o.s0)(),h=(0,o.TH)(),g=e.imageUrl,v=e.name,N=e.uid,y=e.displayName,P=(0,Z.Z)({imageUrl:g,name:v,uid:N,displayName:y}).hendleFollow;console.log(e);var F=e.followers&&e.followers.find((function(e){return e.uid===t.uid})),M=function(){var t=(0,a.Z)(n().mark((function t(){var s;return n().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,p([e]);case 2:s=t.sent,x("/direct/".concat(s));case 4:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return(0,f.jsx)(f.Fragment,{children:e.displayName?(0,f.jsx)("section",{className:"flex justify-center",children:(0,f.jsxs)("div",{className:"container max-w-5xl mt-7 relative pl-5 pr-5 flex flex-col",children:[(0,f.jsxs)("div",{className:"flex mb-10 md:flex-row flex-col",children:[(0,f.jsx)("div",{className:"md:max-w-[18rem] w-full md:min-w-[12rem] flex justify-center mr-5 mb-5",children:(0,f.jsx)("div",{className:"w-36 h-36 rounded-full border overflow-hidden",children:(0,f.jsx)("img",{className:"w-full h-full object-cover ",src:"".concat(e.imageUrl?e.imageUrl:"/instagram-app/images/standart-profile.png"),alt:"profilePhoto"})})}),(0,f.jsxs)("div",{className:"w-full",children:[(0,f.jsxs)("div",{className:"flex items-center mb-8 w-full md:justify-start justify-center",children:[(0,f.jsx)("p",{className:"font-thin text-3xl mr-7 mt-0 pt-0 mb-1",children:e.displayName}),F?(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)("button",{className:"active:opacity-60 border rounded rounded-[0.15] px-2.5 py-1.5 text-sm font-semibold mr-2 bg-transparent text-black ",type:"button",onClick:M,children:"Message"}),(0,f.jsx)("button",{className:"active:opacity-60 border rounded rounded-[0.15] px-[0.7rem] py-1.5 text-sm font-semibold mr-2 bg-transparent text-black ",type:"button",onClick:function(){return m(!0)},children:(0,f.jsx)("img",{className:"w-5 h-5",src:"/instagram-app/images/checked-user.png",alt:"checked-user"})}),(0,f.jsx)(k.Z,{activeModal:d,setActiveModal:m,styleForContainerBlock:"fixed w-screen h-screen top-0 left-0 right-0 flex justify-center items-center z-20 cursor-default bg-black/60 duration-300",children:(0,f.jsx)(U.Z,{activeModal:d,imageUrl:e.imageUrl,displayName:e.displayName,name:e.name,uid:e.uid,setActiveModal:m})}),(0,f.jsx)("button",{className:"border rounded rounded-[0.15] px-3 py-2.5 text-sm font-semibold mr-5 bg-transparent text-black active:opacity-60",type:"button",children:(0,f.jsx)("img",{className:"h-3",src:"/instagram-app/images/arrow-down-gray.png",alt:"arrow"})}),(0,f.jsx)("div",{className:"h-6 w-6",children:(0,f.jsx)("img",{src:"/instagram-app/images/option-icon.png",alt:"options"})})]}):(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)("button",{className:"active:opacity-60 border rounded rounded-[0.15] px-2.5 py-1.5 text-sm font-semibold mr-2 bg-transparent text-black ",type:"button",onClick:M,children:"Message"}),(0,f.jsx)("button",{className:"active:opacity-60 rounded rounded-[0.15] px-4 py-1.5 text-sm font-semibold mr-2 bg-[#0195f6] text-white ",type:"button",onClick:function(){m(!1),P()},children:"Follow"}),(0,f.jsx)("button",{className:"active:opacity-60 rounded rounded-[0.15] px-3 py-2.5 text-sm font-semibold mr-5 bg-[#0195f6] text-white",type:"button",children:(0,f.jsx)("img",{className:"h-3",src:"/instagram-app/images/down-arrow-white.png",alt:"arrow"})}),(0,f.jsx)("div",{className:"h-6 w-6",children:(0,f.jsx)("img",{src:"/instagram-app/images/option-icon.png",alt:"options"})})]})]}),(0,f.jsxs)("div",{className:"flex items-center md:justify-start justify-center",children:[(0,f.jsx)("div",{className:"mr-10",children:(0,f.jsxs)("p",{children:[(0,f.jsxs)("span",{className:"font-semibold",children:[e.posts.length," "]}),"posts"]})}),(0,f.jsx)("div",{className:"mr-10",children:(0,f.jsx)(j.rU,{to:"".concat(b.HP),children:(0,f.jsxs)("p",{className:"cursor-pointer",children:[(0,f.jsx)("span",{className:"font-semibold",children:e.followers.length})," followers"]})})}),(0,f.jsx)("div",{className:"mr-10",children:(0,f.jsx)(j.rU,{to:"".concat(b.cd),children:(0,f.jsxs)("p",{className:"cursor-pointer",children:[(0,f.jsx)("span",{className:"font-semibold",children:e.following.length})," following"]})})})]})]})]}),(0,f.jsxs)("div",{className:"border-t w-full flex justify-center",children:[(0,f.jsx)("div",{className:"mr-14 opacity-50 border-t active:opacity-25 ".concat(h.pathname==="/"+e.displayName?"border-black opacity-100":"border-transparent"),"data-name":"posts",children:(0,f.jsx)(j.rU,{to:"".concat(b.vA),children:(0,f.jsxs)("div",{className:"h-12 flex justify-between items-center",children:[(0,f.jsx)("img",{className:"h-3 mr-2",src:"/instagram-app/images/grid-icon.png",alt:"grid"}),(0,f.jsx)("p",{className:"text-xs tracking-widest font-medium",children:"POSTS"})]})})}),(0,f.jsx)("div",{className:"mr-14 opacity-50 border-t active:opacity-25 ".concat(h.pathname==="/"+e.displayName+"/tagged"?"border-black opacity-100":"border-transparent"),"data-name":"tagged",children:(0,f.jsx)(j.rU,{to:"".concat(b.LD),children:(0,f.jsxs)("div",{className:"h-12 flex justify-between items-center",children:[(0,f.jsx)("img",{className:"h-3 mr-2",src:"/instagram-app/images/mark-profile-icon.png",alt:"profile"}),(0,f.jsx)("p",{className:"text-xs tracking-widest font-medium",children:"TAGGED"})]})})})]}),(0,f.jsx)(o.j3,{context:{posts:e.posts.sort((function(e,t){return t.uid-e.uid}))}})]})}):(0,f.jsx)(w.default,{})})},F=c.memo(P),M=function(){var e=(0,c.useContext)(d._),t=e.where,s=e.query,r=e.collection,u=e.db,p=e.getDocs,x=(0,o.UO)().user,h=(0,l.v9)((function(e){return e.userReducer.user})),g=(0,l.v9)((function(e){return e.currentProfileUserReducer.user})),j=(0,l.I0)();(0,c.useEffect)((function(){var e=function(){var e=(0,a.Z)(n().mark((function e(){var a,c;return n().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=r(u,"users"),c=s(a,t("displayName","==","".concat(x))),console.log(x),e.next=5,p(c);case 5:e.sent.forEach((function(e){j((0,m.l)(e.data()))}));case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e()}),[x]);var b=h.uid!==g.uid;return(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(i.Z,{}),b?(0,f.jsx)(F,{}):(0,f.jsx)(y,{})]})},A=c.memo(M)}}]);
//# sourceMappingURL=415.51855553.chunk.js.map