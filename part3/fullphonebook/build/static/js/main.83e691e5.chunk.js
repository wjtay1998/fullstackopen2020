(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{14:function(e,n,t){e.exports=t(37)},19:function(e,n,t){},37:function(e,n,t){"use strict";t.r(n);var a=t(0),o=t.n(a),r=t(13),c=t.n(r),u=(t(19),t(2)),i=t(3),l=t.n(i),d="/api/persons",m=function(){return l.a.get(d).then((function(e){return e.data}))},s=function(e){return l.a.post(d,e).then((function(e){return e.data}))},f=function(e){return l.a.delete(d+"/".concat(e.id)).then((function(e){return e.data}))},h=function(e,n){return l.a.put("".concat(d,"/").concat(e),n).then((function(e){return e.data}))},b=function(e){var n=e.newSearch,t=e.handleFilter;return o.a.createElement("form",null,o.a.createElement("div",null,"filter shown with: ",o.a.createElement("input",{value:n,onChange:t})))},g=function(e){var n=e.newName,t=e.newNumber,a=e.handleNameChange,r=e.handleNumberChange,c=e.addPerson;return o.a.createElement("form",{onSubmit:c},o.a.createElement("div",null,"name: ",o.a.createElement("input",{value:n,onChange:a})),o.a.createElement("div",null,"number: ",o.a.createElement("input",{value:t,onChange:r})),o.a.createElement("div",null,o.a.createElement("button",{type:"submit"},"add")))},p=function(e){var n=e.namesToShow,t=e.handleDelete;return o.a.createElement("div",null,n.map((function(e){return o.a.createElement("form",{key:e.name,onSubmit:function(n){return t(n,e)}},e.name," ",e.number,o.a.createElement("button",{type:"submit"}," delete "))})))},E=function(e){var n=e.notificationMsg,t=e.setNotificationMsg;return""===n?o.a.createElement("div",null):(setTimeout((function(){t("")}),3e3),o.a.createElement("div",{style:{color:"green",background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:5,marginBottom:10}},n))},v=function(e){var n=e.errorMsg,t=e.setErrorMsg;return""===n?o.a.createElement("div",null):(setTimeout((function(){t("")}),3e3),o.a.createElement("div",{style:{color:"red",background:"lightgrey",fontSize:20,borderStyle:"solid",borderRadius:5,padding:5,marginBottom:10}},n))},w=function(){var e=Object(a.useState)([]),n=Object(u.a)(e,2),t=n[0],r=n[1],c=Object(a.useState)(""),i=Object(u.a)(c,2),l=i[0],d=i[1],w=Object(a.useState)(""),S=Object(u.a)(w,2),j=S[0],O=S[1],k=Object(a.useState)(""),y=Object(u.a)(k,2),N=y[0],C=y[1],M=Object(a.useState)(""),D=Object(u.a)(M,2),T=D[0],B=D[1],P=Object(a.useState)(""),z=Object(u.a)(P,2),A=z[0],F=z[1];Object(a.useEffect)((function(){m().then((function(e){r(e)}))}),[]);var J=t.filter((function(e){return e.name.toLowerCase().includes(N.toLowerCase())}));return o.a.createElement("div",null,o.a.createElement("h2",null,"Phonebook"),o.a.createElement(v,{errorMsg:A,setErrorMsg:F}),o.a.createElement(E,{notificationMsg:T,setNotificationMsg:B}),o.a.createElement(b,{newSearch:N,handleFilter:function(e){C(e.target.value),console.log(e.target.value.length)}}),o.a.createElement("h3",null,"Add a new"),o.a.createElement(g,{newName:l,newNumber:j,handleNameChange:function(e){d(e.target.value)},handleNumberChange:function(e){O(e.target.value)},addPerson:function(e){e.preventDefault();var n={name:l,number:j};if(t.map((function(e){return e.name===l})).includes(!0)){if(window.confirm("".concat(l," is already added to phonebook, replace the old number with a new one?"))){var a=t.find((function(e){return e.name===l}));n.id=a.id,console.log("original",n,a.id),h(a.id,n).then((function(e){console.log(e),B("Updated ".concat(a.name," in the phonebook")),r(t.map((function(e){return e.id!==a.id?e:n})))})).catch((function(e){F(e.response.data.message)}))}}else console.log("create2"),s(n).then((function(e){console.log("response2"),B("Added ".concat(l," to the phonebook")),r(t.concat(e))})).catch((function(e){console.log("catch2",e.response.data),F(e.response.data.message)}));d(""),O("")}}),o.a.createElement("h3",null,"Numbers"),o.a.createElement(p,{namesToShow:J,handleDelete:function(e,n){e.preventDefault(),window.confirm("Delete ".concat(n.name,"?"))&&f(n).then((function(e){B("Deleted ".concat(n.name," from the phonebook")),r(t.filter((function(e){return e.id!==n.id})))})).catch((function(e){F(e.response.data.message)}))}}))};c.a.render(o.a.createElement(w,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.83e691e5.chunk.js.map