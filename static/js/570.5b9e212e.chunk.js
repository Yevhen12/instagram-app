"use strict";(self.webpackChunkinstagram=self.webpackChunkinstagram||[]).push([[570],{5570:function(e,s,n){n.r(s);var a=n(5861),t=n(4942),r=n(1413),l=n(885),i=n(7757),c=n.n(i),o=n(2791),u=n(528),m=n(6871),d=n(5304),p=n(3437),f=n(6030),x=n(184),h=function(){var e=(0,o.useState)({email:"",password:""}),s=(0,l.Z)(e,2),n=s[0],i=s[1],h=(0,f.I0)(),g=(0,o.useState)(),w=(0,l.Z)(g,2),b=w[0],j=(w[1],(0,m.s0)()),v=(0,o.useContext)(d._),N=v.signInWithEmailAndPassword,y=v.auth,k=v.doc,C=v.db,Z=v.getDoc,I=function(e){var s=e.target,n=s.name,a=s.value;i((function(e){return(0,r.Z)((0,r.Z)({},e),{},(0,t.Z)({},n,a))}))},P=function(){var e=(0,a.Z)(c().mark((function e(s){var a,t,r,l;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s.preventDefault(),a=n.email,t=n.password,e.next=4,N(y,a,t);case 4:return r=e.sent,e.next=7,Z(k(C,"users",r.user.uid));case 7:l=e.sent,h((0,p.a)(l.data())),j("/");case 10:case"end":return e.stop()}}),e)})));return function(s){return e.apply(this,arguments)}}();return(0,x.jsxs)("div",{className:"flex max-w-screen-lg items-center mx-auto h-screen",children:[(0,x.jsx)("div",{className:"flex w-2/3",children:(0,x.jsx)("img",{src:"/instagram-appimages\backgroundPhonesInstagram.png",alt:"iPhone with Instagram app",className:"h-full"})}),(0,x.jsxs)("div",{className:"flex flex-col w-1/3",children:[(0,x.jsxs)("div",{className:"flex flex-col p-7 items-center border bg-white mb-5",children:[(0,x.jsx)("div",{className:"flex justify-center w-full",children:(0,x.jsx)("img",{src:"/instagram-appimagesinstagram.png",className:"mt-2 mb-4 w-2/4"})}),b&&(0,x.jsxs)("p",{className:"text-sm text-red-500 mb-5",children:[" ",b.message]}),(0,x.jsxs)("form",{method:"POST",children:[(0,x.jsx)("input",{value:n.email,name:"email",type:"email",className:"rounded px-4 py-3 w-full border mb-2 text-sm outline-none ",placeholder:"Email address",onChange:function(e){return I(e)}}),(0,x.jsx)("input",{value:n.password,name:"password",type:"password",className:"rounded px-4 py-3 w-full border mb-5 text-sm outline-none ",placeholder:"Password",onChange:function(e){return I(e)}}),(0,x.jsx)("button",{type:"submit",className:"bg-blue-500 text-white w-full rounded h-8 font-bold",onClick:function(e){return P(e)},children:"Log In"})]})]}),(0,x.jsxs)("div",{className:"w-full border flex items-center justify-center p-5",children:[(0,x.jsx)("p",{className:"mr-1",children:"Don't have an account?"}),(0,x.jsx)("button",{className:"font-bold",type:"button",onClick:function(){console.log(1),j(u._5)},children:"Sign up"})]})]})]})};s.default=o.memo(h)}}]);
//# sourceMappingURL=570.5b9e212e.chunk.js.map