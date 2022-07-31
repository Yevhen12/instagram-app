"use strict";(self.webpackChunkinstagram=self.webpackChunkinstagram||[]).push([[847],{7847:function(e,t,n){n.r(t),n.d(t,{default:function(){return y}});var a=n(1413),s=n(885),r=n(2791),l=n(6871),o=n(5304),i=n(4942),c=n(528),u=n(184),m=function(e){var t=e.setUserData,n=e.setPage,m=(0,r.useContext)(o._),d=m.getDocs,x=m.collection,h=m.db,p=(0,r.useState)({displayName:"",name:"",email:"",password:""}),f=(0,s.Z)(p,2),b=f[0],y=f[1],g=(0,r.useState)(!1),j=(0,s.Z)(g,2),w=j[0],v=j[1],N=(0,l.s0)(),k=function(e){var t=e.target,n=t.name,s=t.value;y((function(e){return(0,a.Z)((0,a.Z)({},e),{},(0,i.Z)({},n,s))}))},C=function(){d(x(h,"users")).then((function(e){e.forEach((function(e){var t=e.data().email;console.log(t),b.email===t&&(console.log("This email isnt available"),v(!0),console.log(w))}))}))},Z=!w&&b.displayName&&b.name&&b.email&&b.password.length>6;return(0,u.jsx)("div",{className:"flex items-center mx-auto h-screen max-w-xs",children:(0,u.jsxs)("div",{className:"flex flex-col",children:[(0,u.jsxs)("div",{className:"flex flex-col p-7 items-center border bg-white mb-5",children:[(0,u.jsx)("div",{className:"flex justify-center w-full",children:(0,u.jsx)("img",{src:"/instagram-app/images/instagram.png",className:"mt-2 mb-4 w-2/4"})}),w&&(0,u.jsxs)("p",{className:"text-sm text-red-500 mb-5",children:[" ",w]}),(0,u.jsxs)("form",{method:"POST",children:[(0,u.jsx)("input",{name:"displayName",value:b.displayName,type:"text",className:"rounded px-4 py-3 w-full border mb-2 text-sm outline-none ",placeholder:"Username",onChange:function(e){return k(e)}}),(0,u.jsx)("input",{name:"name",value:b.name,type:"text",className:"rounded px-4 py-3 w-full border mb-2 text-sm outline-none ",placeholder:"Name",onChange:function(e){return k(e)}}),(0,u.jsx)("input",{name:"email",value:b.email,type:"email",className:"rounded px-4 py-3 w-full border mb-2 text-sm outline-none ",placeholder:"Email address",onChange:function(e){return k(e)}}),(0,u.jsx)("input",{name:"password",value:b.password,type:"password",className:"rounded px-4 py-3 w-full border mb-5 text-sm outline-none ",placeholder:"Password",onChange:function(e){return k(e)}}),(0,u.jsx)("button",{disabled:!Z,onClick:function(e){return function(e){if(C(),w)y((function(e){return(0,a.Z)((0,a.Z)({},e),{},{email:""})}));else{e.preventDefault();var s=b.displayName,r=b.name,l=b.email,o=b.password;t((function(e){return(0,a.Z)((0,a.Z)({},e),{},{displayName:s,name:r,email:l,password:o})})),n(1)}}(e)},type:"submit",className:"text-white w-full rounded h-8 font-semibold ".concat(Z?"bg-blue-500 cursor-pointer":"bg-blue-200 cursor-not-allowed"),children:"Sign up"})]})]}),(0,u.jsxs)("div",{className:"w-full border flex items-center justify-center p-5",children:[(0,u.jsx)("p",{className:"mr-1",children:"Already have an account?"}),(0,u.jsx)("button",{className:"font-bold",type:"button",onClick:function(){return N(c.H4)},children:" Log In"})]})]})})},d=r.memo(m),x=n(5984),h=n(3934),p=function(e){var t=e.setUserData,n=e.setPage,o=(e.userData,(0,r.useState)({month:"",day:"",year:""})),m=(0,s.Z)(o,2),d=m[0],p=m[1],f=(0,r.useState)(!1),b=(0,s.Z)(f,2),y=b[0],g=b[1],j=d.year&&d.year<2016,w=function(e){var t=e.target,n=t.title,s=t.value;p((function(e){return(0,a.Z)((0,a.Z)({},e),{},(0,i.Z)({},n,s))}))},v=(0,l.s0)(),N=(0,r.useCallback)((function(){g(!0)}),[]),k="rounded px-2 py-1 w-full border mb-5 outline-none bg-transparent cursor-pointer border-slate-400 h-10 text-slate-600 focus:border-transparent focus:text-black",C={appearance:"none",backgroundImage:"url(../images/down-arrow.png)",backgroundSize:"12px 12px",backgroundRepeat:"no-repeat",backgroundPosition:"top 14px right 8px",opacity:"0.5",fontSize:"12px"},Z=["january","febuary","march","april","may","june","july","august","september","october","november","december"],D="january"===d.month||"march"===d.month||"may"===d.month||"july"===d.month||"august"===d.month||"october"===d.month||"december"===d.month?31:"april"===d.month||"june"===d.month||"september"===d.month||"november"===d.month?30:d.year%4?28:29,P=Array.from({length:D},(function(e,t){return t+1})),S=Array.from({length:105},(function(e,t){return 2022-t})),U=(0,r.useMemo)((function(){return Z.map((function(e){return(0,u.jsx)("option",{className:"bg-white m-0 p-0",value:e,required:!0,title:e,children:e},(0,x.x0)())}))}),[Z]),A=(0,r.useMemo)((function(){return P.map((function(e){return(0,u.jsx)("option",{className:"bg-white m-0 p-0",required:!0,value:e,title:e,children:e},(0,x.x0)())}))}),[P]),B=(0,r.useMemo)((function(){return S.map((function(e){return(0,u.jsx)("option",{className:"bg-white m-0 p-0",required:!0,value:e,title:e,children:e},(0,x.x0)())}))}),[S]);return(0,u.jsx)("div",{className:"flex items-center mx-auto h-screen max-w-xs",children:(0,u.jsxs)("div",{className:"flex flex-col",children:[(0,u.jsxs)("div",{className:"flex flex-col p-7 items-center border bg-white mb-5",children:[(0,u.jsx)("div",{className:"flex justify-center w-full",children:(0,u.jsx)("img",{src:"/instagram-app/images/birthday-auth.png",className:"mt-2 mb-4 w-2/4"})}),(0,u.jsx)("p",{className:"text-base font-semibold mb-5",children:"Chosse your birthday"}),(0,u.jsx)("p",{className:"text-sm text-center",children:"This information will not be displayed in your public profile."}),(0,u.jsx)("p",{className:"text-sm text-center cursor-pointer text-sky-500 mb-3",onClick:N,children:"Why you should indicate your birthday?"}),(0,u.jsxs)(h.Z,{activeModal:y,setActiveModal:g,textTitle:"Birthdays",styleBlock:"bg-white w-1/5 rounded-xl duration-300 ",children:[(0,u.jsx)("img",{src:"/instagram-app/images/birthday-auth.png",className:"mt-4 mb-4 w-1/3 mr-auto ml-auto"}),(0,u.jsx)("p",{className:"text-center text-xl font-semibold",children:"Birthdays in instagram"}),(0,u.jsx)("p",{className:"px-10 text-center mt-3 text-sm mb-5",children:"Birthday information helps you improve the features and advertising you see, and helps keep the Instagram community safe. You can view the birthday in the section with personal information in the account settings."}),(0,u.jsx)("div",{className:"w-full border-t relative",children:(0,u.jsx)("button",{className:"w-full",type:"button",onClick:function(){return v(c.Hi)},children:(0,u.jsx)("p",{className:"text-center font-semibold p-2 text-blue-500 cursor-pointer text-sm w-full",children:"Details"})})})]}),(0,u.jsxs)("form",{method:"POST",className:"w-full",children:[(0,u.jsxs)("div",{className:"w-full flex px-5 text-base",children:[(0,u.jsx)("select",{style:C,className:"".concat(k," mr-2 w-24"),value:d.month,title:"month",onChange:function(e){return w(e)},children:U}),(0,u.jsx)("select",{style:C,className:"".concat(k," mr-2 w-14"),value:d.day,title:"day",onChange:function(e){return w(e)},children:A}),(0,u.jsx)("select",{style:C,className:"".concat(k," w-[4.5rem]"),value:d.year,title:"year",onChange:function(e){return w(e)},children:B})]}),!j&&(0,u.jsx)("p",{className:"text-xs text-center text-slate-500 mb-4",children:"Choose your birth"}),(0,u.jsx)("p",{className:"text-xs text-center mb-5 text-slate-500",children:"Specify your birthday, even if this account is for a company, pet, etc."}),(0,u.jsx)("button",{disabled:!j,onClick:function(e){return function(e){e.preventDefault();var s=d.month,r=d.day,l=d.year;t((function(e){return(0,a.Z)((0,a.Z)({},e),{},{birthday:{month:s||"january",day:r||1,year:l||2022},imageUrl:""})})),n(3)}(e)},type:"submit",className:"text-white w-full rounded h-8 font-semibold ".concat(j?"bg-blue-500 cursor-pointer":"bg-blue-200 cursor-not-allowed"),children:"Next"}),(0,u.jsx)("div",{className:"flex justify-center",children:(0,u.jsx)("button",{onClick:function(e){return function(e){e.preventDefault(),console.log(1),n((function(e){return e-1}))}(e)},type:"button",className:"text-blue-500 font-semibold cursor-pointer mt-2",children:"Back"})})]})]}),(0,u.jsxs)("div",{className:"w-full border flex items-center justify-center p-5",children:[(0,u.jsx)("p",{className:"mr-1",children:"Already have an account?"}),(0,u.jsx)("button",{className:"font-bold",type:"button",onClick:function(){return v(c.H4)},children:"Log In"})]})]})})},f=r.memo(p),b=function(){var e=(0,r.useState)({}),t=(0,s.Z)(e,2),n=t[0],i=t[1],c=(0,r.useState)(0),m=(0,s.Z)(c,2),x=m[0],h=m[1],p=(0,r.useContext)(o._),b=p.auth,y=p.createUserWithEmailAndPassword,g=p.doc,j=p.setDoc,w=p.db,v=(0,l.s0)();return(0,u.jsxs)(u.Fragment,{children:[0===x&&(0,u.jsx)(d,{setUserData:i,setPage:h}),1===x&&(0,u.jsx)(f,{setUserData:i,setPage:h}),2===x&&(0,u.jsx)(d,{setUserData:i,setPage:h,userData:n}),3===x&&function(){var e=n.email,t=n.password;y(b,e,t).then((function(){var e=b.currentUser,t=g(w,"users",e.uid),s=(0,a.Z)((0,a.Z)({},n),{},{uid:e.uid,followers:[],following:[],posts:[],recentVisitedUsers:[],savedPosts:[],taggedPosts:[]});j(t,s),v("/sign-in")})).catch((function(e){console.log(e.message),v("/sign-up"),h(0)}))}()]})},y=r.memo(b)}}]);
//# sourceMappingURL=847.c2cad3c6.chunk.js.map