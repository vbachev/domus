(this.webpackJsonpdomus=this.webpackJsonpdomus||[]).push([[0],{21:function(e){e.exports=JSON.parse('{"a":"domus"}')},27:function(e,t,n){e.exports=n(40)},38:function(e,t,n){},40:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(20),i=n.n(o),c=n(5),s=n(8),l=n(6),u=n(21),m=n(14),d=n.n(m),p=n(22),v=n(12),f=n(15),h=n(23),g=n.n(h),b=function(){function e(t){Object(v.a)(this,e),this.date=void 0,this.account=void 0,this.amount=void 0,this.person=void 0,this.entity=void 0,this.comment=void 0;var n=t[0].split(".").map(Number),a=Object(c.a)(n,3),r=a[0],o=a[1],i=a[2];this.date=new Date(i,o-1,r),this.account=t[3],this.amount=Number(t[4]),this.person=t[2],this.entity=t[1],this.comment=t[5]}return Object(f.a)(e,[{key:"getFormattedDate",value:function(){return[this.date.getDate(),this.date.getMonth()+1,this.date.getFullYear()].map((function(e){return e.toString().padStart(2,"0")})).join(".")}}]),e}(),E=function(){function e(t){Object(v.a)(this,e),this.name=void 0,this.transactions=void 0,this.people=void 0,this.name=t[0].entity,this.transactions=t,this.people=Array.from(new Set(t.map((function(e){return e.person}))))}return Object(f.a)(e,[{key:"getLastPerson",value:function(){return this.transactions[this.transactions.length-1].person}},{key:"getMonthsOverdue",value:function(){var e=this.transactions[this.transactions.length-1],t=new Date;return 12*(t.getFullYear()-e.date.getFullYear())+(t.getMonth()-e.date.getMonth())}}]),e}(),w=function e(t){Object(v.a)(this,e),this.name=void 0,this.transactions=void 0,this.amount=void 0,this.name=t[0].account,this.transactions=t,this.amount=t.reduce((function(e,t){return e+t.amount}),0)};function N(e,t){var n=e.reduce((function(e,n){var a=n[t];return e[a]=e[a]||[],e[a].push(n),e}),{});return Object.values(n)}function y(e){e.shift();var t=e.map((function(e){return new b(e)})).sort((function(e,t){return e.date.getTime()-t.date.getTime()}));return{transactions:t,accounts:N(t,"account").map((function(e){return new w(e)})),entities:N(t,"entity").map((function(e){return new E(e)})).sort((function(e,t){return e.name<t.name?-1:e.name>t.name?1:0}))}}var k=window.localStorage.getItem("transactions"),x=k?y(JSON.parse(k)):{transactions:[],accounts:[],entities:[]},O=r.a.createContext(x),j=function(){var e=Object(p.a)(d.a.mark((function e(){var t;return d.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,new Promise((function(e){var t=g()({clientId:"780267795399-048pa12qtdcpdganklc6ggmpbm3epucv.apps.googleusercontent.com",spreadsheet:{name:"\u0411\u0430\u0437\u0430 \u0434\u0430\u043d\u043d\u0438 \u0415\u0421",sheets:["\u0414\u0432\u0438\u0436\u0435\u043d\u0438\u044f"]}},(function(){t.user.signIn((function(){t.getAll("\u0414\u0432\u0438\u0436\u0435\u043d\u0438\u044f",e)}))}))}));case 2:if(t=e.sent){e.next=6;break}return console.error("Could not fetch any transactions!"),e.abrupt("return",x);case 6:return window.localStorage.setItem("transactions",JSON.stringify(t)),e.abrupt("return",y(t));case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();function S(){var e=Object(l.f)().pathname;return r.a.createElement("nav",{className:"navbar navbar-expand sticky-top navbar-dark bg-dark"},r.a.createElement("div",{className:"container"},r.a.createElement("span",{className:"navbar-brand"},r.a.createElement("img",{src:"/domus/apple-touch-icon.png",width:"30",height:"30",alt:"Domus logo"})),r.a.createElement("div",{className:"navbar-nav mr-auto"},[{label:"\u0411\u0430\u043b\u0430\u043d\u0441\u0438",href:"/"},{label:"\u041e\u0431\u0435\u043a\u0442\u0438",href:"/entities"}].map((function(t){return r.a.createElement(s.b,{key:t.href,to:t.href,className:"nav-item nav-link ".concat(e===t.href?"active":"")},t.label)})))))}function C(){var e=r.a.useContext(O).accounts,t=e.reduce((function(e,t){return e+t.amount}),0);return r.a.createElement("div",null,r.a.createElement("div",{className:"mt-n3 mx-n3 mb-3 p-3 bg-secondary text-light"},r.a.createElement("h2",null,"\u0411\u0430\u043b\u0430\u043d\u0441\u0438 \u0438 \u0441\u043c\u0435\u0442\u043a\u0438")),r.a.createElement("ul",{className:"list-group"},r.a.createElement("li",{className:"list-group-item list-group-item-secondary d-flex justify-content-between"},"\u041e\u0431\u0449 \u0431\u0430\u043b\u0430\u043d\u0441",r.a.createElement("strong",null,t.toFixed(2),"\u043b\u0432")),e.map((function(e){var t=e.name,n=e.amount;return r.a.createElement("li",{key:t,className:"list-group-item d-flex justify-content-between"},t,r.a.createElement("strong",null,n.toFixed(2),"\u043b\u0432"))}))))}var D=n(26);function M(){var e=r.a.useContext(O).entities,t=["\u0410\u0437\u0431\u0443\u0447\u043d\u043e","\u0414\u043b\u044a\u0436\u043d\u0438\u0446\u0438"],n=r.a.useState(t[0]),a=Object(c.a)(n,2),o=a[0],i=a[1],l=function(e){e.preventDefault(),i(e.target.innerText)},u=o===t[0]?e:Object(D.a)(e).sort((function(e,t){return t.getMonthsOverdue()-e.getMonthsOverdue()}));return r.a.createElement("div",null,r.a.createElement("div",{className:"mt-n3 mx-n3 mb-3 px-3 pt-3 bg-secondary text-light"},r.a.createElement("h2",null,"\u041e\u0431\u0435\u043a\u0442\u0438"),r.a.createElement("ul",{className:"nav nav-tabs border-0"},t.map((function(e){return r.a.createElement("li",{key:e,className:"nav-item"},r.a.createElement("a",{className:"nav-link ".concat(o===e?"active":""),onClick:l},e))})))),r.a.createElement("div",{className:"list-group"},u.map((function(e){return r.a.createElement(s.b,{key:e.name,to:"/entity/".concat(e.name),className:"list-group-item list-group-item-action"},r.a.createElement("div",{className:"d-flex justify-content-between align-items-center"},r.a.createElement("h5",{className:"mb-0"},e.name),r.a.createElement("span",{className:"badge badge-warning badge-pill"},e.getMonthsOverdue()," \u043c\u0435\u0441\u0435\u0446\u0430")),r.a.createElement("small",{className:"text-muted"},e.people[e.people.length-1]))}))))}function W(e){var t=r.a.useContext(O).entities,n=e.match.params.name,a=t.find((function(e){return e.name===n})),o=["\u0414\u0432\u0438\u0436\u0435\u043d\u0438\u044f","\u0425\u043e\u0440\u0430"],i=r.a.useState(o[0]),s=Object(c.a)(i,2),l=s[0],u=s[1],m=function(e){e.preventDefault(),u(e.target.innerText)};return a?r.a.createElement("div",null,r.a.createElement("div",{className:"mt-n3 mx-n3 mb-3 px-3 pt-3 bg-secondary text-light"},r.a.createElement("h2",null,n),r.a.createElement("ul",{className:"nav nav-tabs border-0"},o.map((function(e){return r.a.createElement("li",{key:e,className:"nav-item"},r.a.createElement("a",{className:"nav-link ".concat(l===e?"active":""),onClick:m},e))})))),l===o[1]&&r.a.createElement("div",{className:"list-group"},a.people.map((function(e){return r.a.createElement("div",{key:e,className:"list-group-item list-group-item-action"},e)}))),l===o[0]&&r.a.createElement("div",{className:"list-group"},a.transactions.map((function(e){return r.a.createElement("div",{key:e.date+e.comment+e.amount,className:"list-group-item list-group-item-action"},r.a.createElement("small",{className:"d-flex justify-content-between align-items-center"},r.a.createElement("div",null,e.getFormattedDate()),r.a.createElement("div",{className:"text-muted"},e.person)),r.a.createElement("span",{className:"badge badge-secondary mr-2"},e.amount,"\u043b\u0432"),e.comment)})))):r.a.createElement("h2",null,"Not found")}function A(){var e=r.a.useState(x),t=Object(c.a)(e,2),n=t[0],a=t[1];return r.a.useEffect((function(){j().then(a)}),[]),r.a.createElement(s.a,{basename:u.a},r.a.createElement(O.Provider,{value:n},r.a.createElement(S,null),r.a.createElement("div",{className:"container py-3"},r.a.createElement(l.c,null,r.a.createElement(l.a,{exact:!0,path:"/",component:C}),r.a.createElement(l.a,{exact:!0,path:"/entities",component:M}),r.a.createElement(l.a,{exact:!0,path:"/entity/:name",component:W})))))}var F=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function T(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}n(38),n(39);i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(A,null)),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/domus",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("/domus","/service-worker.js");F?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(n){var a=n.headers.get("content-type");404===n.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):T(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):T(t,e)}))}}()}},[[27,1,2]]]);
//# sourceMappingURL=main.f22e2403.chunk.js.map