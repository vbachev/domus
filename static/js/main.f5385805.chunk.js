(this.webpackJsonpdomus=this.webpackJsonpdomus||[]).push([[0],{25:function(e){e.exports=JSON.parse('{"name":"domus","version":"0.1.0","private":false,"author":{"name":"Vasil Bachev","email":"vasil@vasilbachev.com"},"homepage":"https://vbachev.github.io/domus","repository":{"type":"git","url":"git+https://github.com/vbachev/domus.git"},"license":"ISC","scripts":{"start":"react-scripts start","build":"react-scripts build","test":"react-scripts test","eject":"react-scripts eject","deploy":"npm run build && gh-pages -d build"},"dependencies":{"bootstrap":"^4.4.1","google-sheets-api":"git+https://github.com/vbachev/google-sheets-api.git","react":"^16.13.1","react-dom":"^16.13.1","react-router-dom":"^5.1.2","react-scripts":"3.4.1","typescript":"^3.7.5"},"devDependencies":{"@testing-library/jest-dom":"^4.2.4","@testing-library/react":"^9.5.0","@testing-library/user-event":"^7.2.1","@types/jest":"^24.9.1","@types/node":"^12.12.35","@types/react":"^16.9.32","@types/react-dom":"^16.9.6","@types/react-router-dom":"^5.1.3","gh-pages":"^1.0.0"},"browserslist":{"production":[">0.2%","not dead","not op_mini all"],"development":["last 1 chrome version","last 1 firefox version","last 1 safari version"]}}')},27:function(e,t,a){e.exports=a(40)},38:function(e,t,a){},40:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(20),i=a.n(s),c=a(5),o=a(8),l=a(6),m=a(14),u=a.n(m),p=a(21),d=a(12),v=a(15),h=a(22),g=a.n(h),f=function(){function e(t){Object(d.a)(this,e),this.date=void 0,this.account=void 0,this.amount=void 0,this.person=void 0,this.entity=void 0,this.comment=void 0;var a=t[0].split(".").map(Number),n=Object(c.a)(a,3),r=n[0],s=n[1],i=n[2];this.date=new Date(i,s-1,r),this.account=t[3],this.amount=Number(t[4]),this.person=t[2],this.entity=t[1],this.comment=t[5]}return Object(v.a)(e,[{key:"getFormattedDate",value:function(){return[this.date.getDate(),this.date.getMonth()+1,this.date.getFullYear()].map((function(e){return e.toString().padStart(2,"0")})).join(".")}}]),e}(),b=function(){function e(t){Object(d.a)(this,e),this.name=void 0,this.transactions=void 0,this.people=void 0,this.name=t[0].entity,this.transactions=t,this.people=Array.from(new Set(t.map((function(e){return e.person}))))}return Object(v.a)(e,[{key:"getLastPerson",value:function(){return this.transactions[this.transactions.length-1].person}},{key:"getMonthsOverdue",value:function(){var e=this.transactions[this.transactions.length-1],t=new Date;return 12*(t.getFullYear()-e.date.getFullYear())+(t.getMonth()-e.date.getMonth())}}]),e}(),E=function e(t){Object(d.a)(this,e),this.name=void 0,this.transactions=void 0,this.amount=void 0,this.name=t[0].account,this.transactions=t,this.amount=t.reduce((function(e,t){return e+t.amount}),0)};function y(e,t){var a=e.reduce((function(e,a){var n=a[t];return e[n]=e[n]||[],e[n].push(a),e}),{});return Object.values(a)}var N={transactions:[],accounts:[],entities:[]},x=r.a.createContext(N),k=function(){var e=Object(p.a)(u.a.mark((function e(){var t,a,n,r;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,new Promise((function(e){var t=g()({clientId:"780267795399-048pa12qtdcpdganklc6ggmpbm3epucv.apps.googleusercontent.com",spreadsheet:{name:"\u0411\u0430\u0437\u0430 \u0434\u0430\u043d\u043d\u0438 \u0415\u0421",sheets:["\u0414\u0432\u0438\u0436\u0435\u043d\u0438\u044f"]}},(function(){t.user.signIn((function(){t.getAll("\u0414\u0432\u0438\u0436\u0435\u043d\u0438\u044f",e)}))}))}));case 2:if(t=e.sent){e.next=6;break}return console.error("Could not fetch any transactions!"),e.abrupt("return",N);case 6:return t.shift(),a=t.map((function(e){return new f(e)})).sort((function(e,t){return e.date.getTime()-t.date.getTime()})),n=y(a,"account").map((function(e){return new E(e)})),r=y(a,"entity").map((function(e){return new b(e)})).sort((function(e,t){return e.name<t.name?-1:e.name>t.name?1:0})),e.abrupt("return",{transactions:a,accounts:n,entities:r});case 11:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();function w(){var e=Object(l.f)().pathname;return r.a.createElement("nav",{className:"navbar navbar-expand sticky-top navbar-dark bg-dark"},r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"navbar-nav mr-auto"},[{label:"\u0411\u0430\u043b\u0430\u043d\u0441\u0438",href:"/"},{label:"\u041e\u0431\u0435\u043a\u0442\u0438",href:"/entities"}].map((function(t){return r.a.createElement(o.b,{key:t.href,to:t.href,className:"nav-item nav-link ".concat(e===t.href?"active":"")},t.label)})))))}function j(){var e=r.a.useContext(x).accounts,t=e.reduce((function(e,t){return e+t.amount}),0);return r.a.createElement("div",null,r.a.createElement("div",{className:"mt-n3 mx-n3 mb-3 p-3 bg-secondary text-light"},r.a.createElement("h2",null,"\u0411\u0430\u043b\u0430\u043d\u0441\u0438 \u0438 \u0441\u043c\u0435\u0442\u043a\u0438")),r.a.createElement("ul",{className:"list-group"},r.a.createElement("li",{className:"list-group-item list-group-item-secondary d-flex justify-content-between"},"\u041e\u0431\u0449 \u0431\u0430\u043b\u0430\u043d\u0441",r.a.createElement("strong",null,t.toFixed(2),"\u043b\u0432")),e.map((function(e){var t=e.name,a=e.amount;return r.a.createElement("li",{key:t,className:"list-group-item d-flex justify-content-between"},t,r.a.createElement("strong",null,a.toFixed(2),"\u043b\u0432"))}))))}var O=a(26);function S(){var e=r.a.useContext(x).entities,t=["\u0410\u0437\u0431\u0443\u0447\u043d\u043e","\u0414\u043b\u044a\u0436\u043d\u0438\u0446\u0438"],a=r.a.useState(t[0]),n=Object(c.a)(a,2),s=n[0],i=n[1],l=function(e){e.preventDefault(),i(e.target.innerText)},m=s===t[0]?e:Object(O.a)(e).sort((function(e,t){return t.getMonthsOverdue()-e.getMonthsOverdue()}));return r.a.createElement("div",null,r.a.createElement("div",{className:"mt-n3 mx-n3 mb-3 px-3 pt-3 bg-secondary text-light"},r.a.createElement("h2",null,"\u041e\u0431\u0435\u043a\u0442\u0438"),r.a.createElement("ul",{className:"nav nav-tabs border-0"},t.map((function(e){return r.a.createElement("li",{key:e,className:"nav-item"},r.a.createElement("a",{className:"nav-link ".concat(s===e?"active":""),onClick:l},e))})))),r.a.createElement("div",{className:"list-group"},m.map((function(e){return r.a.createElement(o.b,{key:e.name,to:"/entity/".concat(e.name),className:"list-group-item list-group-item-action"},r.a.createElement("div",{className:"d-flex justify-content-between align-items-center"},r.a.createElement("h5",{className:"mb-0"},e.name),r.a.createElement("span",{className:"badge badge-warning badge-pill"},e.getMonthsOverdue()," \u043c\u0435\u0441\u0435\u0446\u0430")),r.a.createElement("small",{className:"text-muted"},e.people[e.people.length-1]))}))))}function C(e){var t=r.a.useContext(x).entities,a=e.match.params.name,n=t.find((function(e){return e.name===a})),s=["\u0414\u0432\u0438\u0436\u0435\u043d\u0438\u044f","\u0425\u043e\u0440\u0430"],i=r.a.useState(s[0]),o=Object(c.a)(i,2),l=o[0],m=o[1],u=function(e){e.preventDefault(),m(e.target.innerText)};return n?r.a.createElement("div",null,r.a.createElement("div",{className:"mt-n3 mx-n3 mb-3 px-3 pt-3 bg-secondary text-light"},r.a.createElement("h2",null,a),r.a.createElement("ul",{className:"nav nav-tabs border-0"},s.map((function(e){return r.a.createElement("li",{key:e,className:"nav-item"},r.a.createElement("a",{className:"nav-link ".concat(l===e?"active":""),onClick:u},e))})))),l===s[1]&&r.a.createElement("div",{className:"list-group"},n.people.map((function(e){return r.a.createElement("div",{key:e,className:"list-group-item list-group-item-action"},e)}))),l===s[0]&&r.a.createElement("div",{className:"list-group"},n.transactions.map((function(e){return r.a.createElement("div",{key:e.date+e.comment+e.amount,className:"list-group-item list-group-item-action"},r.a.createElement("small",{className:"d-flex justify-content-between align-items-center"},r.a.createElement("div",null,e.getFormattedDate()),r.a.createElement("div",{className:"text-muted"},e.person)),r.a.createElement("span",{className:"badge badge-secondary mr-2"},e.amount,"\u043b\u0432"),e.comment)})))):r.a.createElement("h2",null,"Not found")}var D=a(25);function M(){var e=r.a.useState(N),t=Object(c.a)(e,2),a=t[0],n=t[1];return r.a.useEffect((function(){k().then(n)}),[]),r.a.createElement(o.a,{basename:D.name},r.a.createElement(x.Provider,{value:a},r.a.createElement(w,null),r.a.createElement("div",{className:"container py-3"},r.a.createElement(l.c,null,r.a.createElement(l.a,{exact:!0,path:"/",component:j}),r.a.createElement(l.a,{exact:!0,path:"/entities",component:S}),r.a.createElement(l.a,{exact:!0,path:"/entity/:name",component:C})))))}Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(38),a(39);i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(M,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[27,1,2]]]);
//# sourceMappingURL=main.f5385805.chunk.js.map