webpackJsonp([1],{AUV6:function(t,e){},KYhc:function(t,e){},NHnr:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("7+uW"),s={name:"Loader",props:["active"],data:function(){return{baseIncrement:0,value:0,maxValue:0,runId:-1,running:!1,timing:125}},created:function(){this.active&&this.$nextTick(this.run)},watch:{active:function(t,e){t?(e&&this.stop(),this.run()):this.stop()}},methods:{run:function(){var t=this;this.value=1,this.running=!0,this.maxValue=this.$refs.loader.clientWidth,this.baseIncrement=.07*this.maxValue,console.log(this.maxValue),this.runId=setInterval(function(){t.value+=t.baseIncrement-t.baseIncrement*(t.value/t.maxValue)},this.timing)},stop:function(){var t=this;this.value=this.maxValue,setTimeout(function(){return t.running=!1},250),clearInterval(this.runId)}},computed:{loader:function(){return{width:this.value+"px"}}}},n={render:function(){var t=this.$createElement,e=this._self._c||t;return e("section",{ref:"loader",staticClass:"hiq-loader"},[e("transition",{attrs:{name:"bar-fade"}},[this.running?e("span",{staticClass:"bar",style:this.loader}):this._e()])],1)},staticRenderFns:[]};var o=i("VU/8")(s,n,!1,function(t){i("AUV6")},null,null).exports,l={name:"App",components:{Loader:o},computed:{}},r={render:function(){var t=this.$createElement,e=this._self._c||t;return e("transition",{attrs:{name:"main",mode:"out-in"}},[e("router-view")],1)},staticRenderFns:[]};var u=i("VU/8")(l,r,!1,function(t){i("XWVx")},null,null).exports,c=i("/ocq"),d=i("Gu7T"),v=i.n(d),m=i("//Fk"),p=i.n(m),h=i("Dd8w"),f=i.n(h),q=i("G4W2"),b=i.n(q),y=(i("Z7gM"),{name:"JobQuestion",props:["question"],created:function(){switch(this.question.attributes["question-type"]){case"Choice":this.question.valueName="choices",this.question.value=[];break;case"Range":this.question.valueName="range";break;case"Boolean":this.question.valueName="boolean";break;case"Text":this.question.valueName="text"}},watch:{question:{handler:function(t){this.question.isDirty=this.question.isDirty||t.value.length>0||"boolean"==typeof t.value,this.question.isValid="number"==typeof t.value?t.value>-1:"boolean"==typeof t.value?t.valueName||!0:t.value.length>0},deep:!0}},components:{RangeSlider:b.a}}),g={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"input-wrapper m-b:1"},["Text"===t.question.attributes["question-type"]&&t.question.attributes["single-line"]?i("div",{staticClass:"input-field"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.question.value,expression:"question.value"}],staticClass:"hiq-style",class:{invalid:t.question.isDirty&&!t.question.isValid},attrs:{type:"text",placeholder:t.question.attributes.title},domProps:{value:t.question.value},on:{input:function(e){e.target.composing||t.$set(t.question,"value",e.target.value)}}})]):"Text"!==t.question.attributes["question-type"]||t.question.attributes["single-line"]?"Boolean"===t.question.attributes["question-type"]?i("fieldset",{staticClass:"input-field grid-x"},[i("legend",{staticClass:"c:white small-12 cell"},[t._v(t._s(t.question.attributes.title))]),t._v(" "),i("label",{staticClass:"shrink cell grid-x",attrs:{for:t.question.id+"true"}},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.question.value,expression:"question.value"}],staticClass:"hiq-style show-for-sr",class:{invalid:t.question.isDirty&&!t.question.isValid},attrs:{id:t.question.id+"true",value:"true",type:"radio"},domProps:{checked:t._q(t.question.value,"true")},on:{change:function(e){t.$set(t.question,"value","true")}}}),t._v(" "),i("span",{staticClass:"checkmark"}),t._v(" "),i("span",{staticClass:"name m-l:1"},[t._v("Ja")])]),t._v(" "),i("label",{staticClass:"shrink cell grid-x m-l:2",attrs:{for:t.question.id+"false"}},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.question.value,expression:"question.value"}],staticClass:"hiq-style show-for-sr",class:{invalid:t.question.isDirty&&!t.question.isValid},attrs:{id:t.question.id+"false",value:"false",type:"radio"},domProps:{checked:t._q(t.question.value,"false")},on:{change:function(e){t.$set(t.question,"value","false")}}}),t._v(" "),i("span",{staticClass:"checkmark"}),t._v(" "),i("span",{staticClass:"name m-l:1"},[t._v("Nej")])])]):"Range"===t.question.attributes["question-type"]?i("div",{staticClass:"input-field"},[i("label",{staticClass:"c:white"},[t._v(t._s(t.question.attributes.title))]),t._v(" "),i("range-slider",{staticClass:"hiq-style",class:{invalid:t.question.isDirty&&!t.question.isValid},attrs:{min:t.question.attributes["start-with"],max:t.question.attributes["end-with"]},model:{value:t.question.value,callback:function(e){t.$set(t.question,"value",e)},expression:"question.value"}})],1):"Choice"===t.question.attributes["question-type"]?i("div",{staticClass:"input-field"},[i("label",{staticClass:"c:white",attrs:{for:t.question.id}},[t._v(t._s(t.question.attributes.title))]),t._v(" "),t.question.attributes.multiple?i("select",{directives:[{name:"model",rawName:"v-model",value:t.question.value,expression:"question.value"}],staticClass:"hiq-style",class:{invalid:t.question.isDirty&&!t.question.isValid},attrs:{id:t.question.id,multiple:""},on:{change:function(e){var i=Array.prototype.filter.call(e.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.$set(t.question,"value",e.target.multiple?i:i[0])}}},t._l(t.question.attributes.alternatives,function(e){return i("option",{key:e.id,domProps:{value:e.id}},[t._v(t._s(e.title))])})):i("fieldset",{staticClass:"grid-x"},t._l(t.question.attributes.alternatives,function(e){return i("label",{key:e.id,staticClass:"small-12 cell grid-x m-t:1",attrs:{for:e.id}},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.question.value,expression:"question.value"}],staticClass:"hiq-style show-for-sr",class:{invalid:t.question.isDirty&&!t.question.isValid},attrs:{id:e.id,type:"radio"},domProps:{value:e.id,checked:t._q(t.question.value,e.id)},on:{change:function(i){t.$set(t.question,"value",e.id)}}}),t._v(" "),i("span",{staticClass:"checkmark"}),t._v(" "),i("span",{staticClass:"name m-l:1"},[t._v(t._s(e.title))])])}))]):i("div",{staticClass:"input-field"},[i("span",[t._v(t._s(t.question.attributes["question-type"]))])]):i("div",{staticClass:"input-field"},[i("textarea",{directives:[{name:"model",rawName:"v-model",value:t.question.value,expression:"question.value"}],staticClass:"hiq-style",class:{invalid:t.question.isDirty&&!t.question.isValid},attrs:{cols:"30",rows:"10",placeholder:t.question.attributes.title},domProps:{value:t.question.value},on:{input:function(e){e.target.composing||t.$set(t.question,"value",e.target.value)}}})])])},staticRenderFns:[]};var C=i("VU/8")(y,g,!1,function(t){i("KYhc")},null,null).exports,N=i("mvHQ"),w=i.n(N),x=i("M4fF"),k=i.n(x),V=i("nVVC"),$=i.n(V),D="https://api.teamtailor.com/v1",j=function(t){return function(e,i){var a={method:t,headers:{Authorization:"Token token=nCJ8xT3OvT5YHBOHk-OF6_9QTxry1mWgy_StA0PZ","X-Api-Version":20161108,"Content-Type":"application/vnd.api+json"}};return i&&(a=k.a.assign(a,{body:i})),fetch(e,a).then(function(t){return t.json()}).then(function(t){return new p.a(function(e,i){!t||t.errors?i(t):e(t.data||{})})})}};k.a.forOwnMap=function(t,e){var i=[];return this.forOwn(t,function(t,a){return i.push(e(a,t))}),i};var T=function(t,e){return t+"="+e},A=function(t,e){return T("filter["+t+"]",e)},L=function(t){return $.a.compose(function(e){return encodeURI(t+e)},$.a.join("&"),$.a.flatten)},P=j("GET"),F=j("POST"),I={list:function(t){t=t||{};var e=k.a.omit(t,["filters"]),i=t.filters,a=[];a.push(k.a.forOwnMap(e,T)),a.push(k.a.forOwnMap(i,A));var s=L(D+"/jobs?")(a);return P(s).then(function(t){return console.log(t),p.a.resolve(t)})},show:function(t){return P(D+"/jobs/"+t)}},J={list:function(t){t=t||{};var e=k.a.omit(t,["filters"]),i=t.filters,a=[];a.push(k.a.forOwnMap(e,T)),a.push(k.a.forOwnMap(i,A));var s=L(D+"/candidates?")(a);return P(s)},create:function(t,e,i){var a={data:{type:"candidates",attributes:{"first-name":t,"last-name":e,pitch:"",email:i}}};return F("https://api.teamtailor.com/v1/candidates",w()(a))},show:function(t){return P(D+"/candidates/"+t)}},E={create:function(t,e,i){var a={data:{type:"answers",attributes:t,relationships:{candidate:{data:{id:e,type:"candidates"}},question:{data:{id:i,type:"questions"}}}}};return F("https://api.teamtailor.com/v1/answers",w()(a))}},O={create:function(t,e){var i={data:{type:"job-applications",attributes:{},relationships:{candidate:{data:{id:t,type:"candidates"}},job:{data:{id:e,type:"jobs"}}}}};return F("https://api.teamtailor.com/v1/job-applications",w()(i))}},U=/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,M={name:"Job",props:["id"],data:function(){return{attributes:{},questions:[],firstName:{value:"",isDirty:!1,isValid:!1},lastName:{value:"",isDirty:!1,isValid:!1},email:{value:"",isDirty:!1,isValid:!1},isInitialized:!1,candidate:null,sending:!1,sent:!1}},created:function(){var t=this;this.$emit("loading",!0),I.show(this.id).then(function(e){return t.attributes=e.attributes,P(e.relationships.questions.links.related)}).then(function(e){t.questions=_.map(e,function(t){return f()({value:"",valueName:"",isValid:!1,isDirty:!1},t)}),t.$emit("loading",!1),t.isInitialized=!0}).catch(function(t){return console.error(t)})},methods:{send:function(){var t=this;this.isAllFieldsValid()?(this.sending=!0,J.list({include:["job-applications"],filters:{email:this.email.value}}).then(function(e){if(e.length>0){var i=e.find(function(e){return e.attributes["first-name"].toLocaleLowerCase()===t.firstName.value.toLocaleLowerCase()&&e.attributes["last-name"].toLocaleLowerCase()===t.lastName.value.toLocaleLowerCase()});if(i)return p.a.resolve(i)}return J.create(t.firstName.value,t.lastName.value,t.email.value)}).then(function(e){return t.candidate=e,P(e.relationships.answers.links.related)}).then(function(t){return p.a.all(t.map(function(t){return P(t.relationships.question.links.related)}))}).then(function(e){return p.a.all(t.questions.reduce(function(i,a){if(!e.find(function(t){return t.id===a.id})){var s={};s[a.valueName]=a.value,i.push(E.create(s,t.candidate.id,a.id))}return i},[]))}).then(function(e){O.create(t.candidate.id,t.id)}).then(function(e){console.log(e),t.sent=!0,t.sending=!1}).catch(function(e){console.error(e),t.sending=!1})):this.getAllFields().forEach(function(t){t.isDirty||(t.isDirty=!0)})},getAllFields:function(){return[].concat(v()(this.questions),[this.firstName,this.lastName,this.email])},isAllFieldsValid:function(){return!this.getAllFields().find(function(t){return!t.isValid})}},watch:{firstName:{handler:function(t){this.firstName.isDirty=this.firstName.isDirty||t.value.length>0,this.firstName.isValid=t.value.length>0},deep:!0},lastName:{handler:function(t){this.lastName.isDirty=this.lastName.isDirty||t.value.length>0,this.lastName.isValid=t.value.length>0},deep:!0},email:{handler:function(t){this.email.isDirty=this.email.isDirty||t.value.length>0,this.email.isValid=U.test(t.value.toLowerCase())},deep:!0}},components:{JobQuestion:C}},R={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("transition",{attrs:{name:"placehold",mode:"out-in"}},[t.isInitialized?i("main",{key:"form",staticClass:"grid-container"},[i("h1",[t._v(t._s(t.attributes.title))]),t._v(" "),i("div",{domProps:{innerHTML:t._s(t.attributes.body)}}),t._v(" "),i("transition",{attrs:{name:"questions",mode:"out-in"}},[t.sent?i("div",{key:"sent"},[i("h2",[t._v("Tack "+t._s(t.firstName.value)+", för din ansökan!")])]):i("div",{key:"questions",staticClass:"questions",class:{sending:t.sending}},[t._l(t.questions,function(t){return i("JobQuestion",{key:t.key,attrs:{question:t}})}),t._v(" "),i("div",{staticClass:"candidate-inputs"},[i("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.firstName.value,expression:"firstName.value",modifiers:{trim:!0}}],staticClass:"hiq-style m-b:1",class:{invalid:t.firstName.isDirty&&!t.firstName.isValid},attrs:{type:"text",placeholder:"Förnamn"},domProps:{value:t.firstName.value},on:{input:function(e){e.target.composing||t.$set(t.firstName,"value",e.target.value.trim())},blur:function(e){t.$forceUpdate()}}}),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.lastName.value,expression:"lastName.value",modifiers:{trim:!0}}],staticClass:"hiq-style m-b:1",class:{invalid:t.lastName.isDirty&&!t.lastName.isValid},attrs:{type:"text",placeholder:"Efternamn"},domProps:{value:t.lastName.value},on:{input:function(e){e.target.composing||t.$set(t.lastName,"value",e.target.value.trim())},blur:function(e){t.$forceUpdate()}}}),t._v(" "),i("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.email.value,expression:"email.value",modifiers:{trim:!0}}],staticClass:"hiq-style m-b:1",class:{invalid:t.email.isDirty&&!t.email.isValid},attrs:{type:"email",placeholder:"Email"},domProps:{value:t.email.value},on:{input:function(e){e.target.composing||t.$set(t.email,"value",e.target.value.trim())},blur:function(e){t.$forceUpdate()}}}),t._v(" "),i("button",{staticClass:"button-hiq",on:{click:t.send}},[t._v(t._s(t.attributes["apply-button-text"]||"Skicka"))])])],2)])],1):i("main",{key:"placeholder",staticClass:"loading-placeholder grid-container"},[i("span",{staticClass:"placeholder-text m-b:2"}),t._v(" "),i("span",{staticClass:"placeholder-input m-b:1"}),t._v(" "),i("span",{staticClass:"placeholder-textarea m-b:1"}),t._v(" "),i("span",{staticClass:"placeholder-input m-b:1"}),t._v(" "),i("span",{staticClass:"placeholder-input m-b:1"}),t._v(" "),i("span",{staticClass:"placeholder-input m-b:1"}),t._v(" "),i("span",{staticClass:"placeholder-button"})])])},staticRenderFns:[]};var H={name:"JobList",data:function(){return{jobs:[]}},created:function(){var t=this;this.$emit("loading",!0),I.list({include:["location","role"],pagesize:15}).then(function(e){t.jobs=_.map(e,function(t){var e={id:t.id,title:t.attributes.title,location:!1,role:!1};return P(t.relationships.location.links.related).then(function(t){return e.location=t}).catch(function(t){return console.error(t)}),e}),t.$emit("loading",!1)}).catch(function(t){return console.error(t)})},methods:{selectJob:function(t){this.$emit("selectJob",t)}},computed:{listJobs:function(){var t=function(t,e){return-1===t.title.localeCompare(e.title)?-1:1===t.title.localeCompare(e.title)?1:0};return this.jobs.reduce(function(e,i){var a=-1,s="",n="";i.location&&i.location.attributes&&(a=i.location.id,s=i.location.attributes.city,n=i.location.attributes.country);var o=e.find(function(t){return t.id===a});return o?(o.jobs.push(i),o.jobs.sort(t)):e.push({id:a,city:s,country:n,jobs:[i]}),e},[])}}},S={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("main",{staticClass:"grid-container"},t._l(t.listJobs,function(e){return i("div",{key:e.id,staticClass:"c:white"},[i("h1",[t._v(t._s(e.city))]),t._v(" "),i("div",{staticClass:"grid-y"},t._l(e.jobs,function(e){return i("router-link",{key:e.id,staticClass:"button-hiq m-b:1",attrs:{to:{name:"job",params:{id:e.id}}}},[t._v(t._s(e.title))])}))])}))},staticRenderFns:[]},W=[{path:"/job/:id",component:i("VU/8")(M,R,!1,function(t){i("PSNo")},null,null).exports,name:"job",props:!0},{path:"/",component:i("VU/8")(H,S,!1,null,null,null).exports}],z=new c.a({mode:"hash",routes:W});a.a.config.productionTip=!1,a.a.use(c.a);var Q=new a.a({el:"#app",data:{loading:!1},components:{App:u,Loader:o},template:'<div><App/><Loader :active="loading"/></div>',router:z});z.beforeEach(function(t,e,i){Q.loading=!0,console.log("Before"),i()}),z.afterEach(function(t,e){setTimeout(function(){return Q.loading=!1},250),console.log("After")})},PSNo:function(t,e){},XWVx:function(t,e){},Z7gM:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.dbcf8deb9e042493602d.js.map