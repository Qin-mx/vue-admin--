webpackJsonp([15],{OYuA:function(t,e){},WBHA:function(t,e,a){var i;i=function(){return function(t){function e(i){if(a[i])return a[i].exports;var n=a[i]={i:i,l:!1,exports:{}};return t[i].call(n.exports,n,n.exports,e),n.l=!0,n.exports}var a={};return e.m=t,e.c=a,e.i=function(t){return t},e.d=function(t,a,i){e.o(t,a)||Object.defineProperty(t,a,{configurable:!1,enumerable:!0,get:i})},e.n=function(t){var a=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(a,"a",a),a},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="/dist/",e(e.s=2)}([function(t,e,a){var i=a(4)(a(1),a(5),null,null);t.exports=i.exports},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a(3);e.default={props:{startVal:{type:Number,required:!1,default:0},endVal:{type:Number,required:!1,default:2017},duration:{type:Number,required:!1,default:3e3},autoplay:{type:Boolean,required:!1,default:!0},decimals:{type:Number,required:!1,default:0,validator:function(t){return t>=0}},decimal:{type:String,required:!1,default:"."},separator:{type:String,required:!1,default:","},prefix:{type:String,required:!1,default:""},suffix:{type:String,required:!1,default:""},useEasing:{type:Boolean,required:!1,default:!0},easingFn:{type:Function,default:function(t,e,a,i){return a*(1-Math.pow(2,-10*t/i))*1024/1023+e}}},data:function(){return{localStartVal:this.startVal,displayValue:this.formatNumber(this.startVal),printVal:null,paused:!1,localDuration:this.duration,startTime:null,timestamp:null,remaining:null,rAF:null}},computed:{countDown:function(){return this.startVal>this.endVal}},watch:{startVal:function(){this.autoplay&&this.start()},endVal:function(){this.autoplay&&this.start()}},mounted:function(){this.autoplay&&this.start(),this.$emit("mountedCallback")},methods:{start:function(){this.localStartVal=this.startVal,this.startTime=null,this.localDuration=this.duration,this.paused=!1,this.rAF=(0,i.requestAnimationFrame)(this.count)},pauseResume:function(){this.paused?(this.resume(),this.paused=!1):(this.pause(),this.paused=!0)},pause:function(){(0,i.cancelAnimationFrame)(this.rAF)},resume:function(){this.startTime=null,this.localDuration=+this.remaining,this.localStartVal=+this.printVal,(0,i.requestAnimationFrame)(this.count)},reset:function(){this.startTime=null,(0,i.cancelAnimationFrame)(this.rAF),this.displayValue=this.formatNumber(this.startVal)},count:function(t){this.startTime||(this.startTime=t),this.timestamp=t;var e=t-this.startTime;this.remaining=this.localDuration-e,this.useEasing?this.countDown?this.printVal=this.localStartVal-this.easingFn(e,0,this.localStartVal-this.endVal,this.localDuration):this.printVal=this.easingFn(e,this.localStartVal,this.endVal-this.localStartVal,this.localDuration):this.countDown?this.printVal=this.localStartVal-(this.localStartVal-this.endVal)*(e/this.localDuration):this.printVal=this.localStartVal+(this.localStartVal-this.startVal)*(e/this.localDuration),this.countDown?this.printVal=this.printVal<this.endVal?this.endVal:this.printVal:this.printVal=this.printVal>this.endVal?this.endVal:this.printVal,this.displayValue=this.formatNumber(this.printVal),e<this.localDuration?this.rAF=(0,i.requestAnimationFrame)(this.count):this.$emit("callback")},isNumber:function(t){return!isNaN(parseFloat(t))},formatNumber:function(t){t=t.toFixed(this.decimals);var e=(t+="").split("."),a=e[0],i=e.length>1?this.decimal+e[1]:"",n=/(\d+)(\d{3})/;if(this.separator&&!this.isNumber(this.separator))for(;n.test(a);)a=a.replace(n,"$1"+this.separator+"$2");return this.prefix+a+i+this.suffix}},destroyed:function(){(0,i.cancelAnimationFrame)(this.rAF)}}},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(t){return t&&t.__esModule?t:{default:t}}(a(0));e.default=i.default,"undefined"!=typeof window&&window.Vue&&window.Vue.component("count-to",i.default)},function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=0,n="webkit moz ms o".split(" "),r=void 0,s=void 0;if("undefined"==typeof window)e.requestAnimationFrame=r=function(){},e.cancelAnimationFrame=s=function(){};else{e.requestAnimationFrame=r=window.requestAnimationFrame,e.cancelAnimationFrame=s=window.cancelAnimationFrame;for(var o=void 0,l=0;l<n.length&&(!r||!s);l++)o=n[l],e.requestAnimationFrame=r=r||window[o+"RequestAnimationFrame"],e.cancelAnimationFrame=s=s||window[o+"CancelAnimationFrame"]||window[o+"CancelRequestAnimationFrame"];r&&s||(e.requestAnimationFrame=r=function(t){var e=(new Date).getTime(),a=Math.max(0,16-(e-i)),n=window.setTimeout(function(){t(e+a)},a);return i=e+a,n},e.cancelAnimationFrame=s=function(t){window.clearTimeout(t)})}e.requestAnimationFrame=r,e.cancelAnimationFrame=s},function(t,e){t.exports=function(t,e,a,i){var n,r=t=t||{},s=typeof t.default;"object"!==s&&"function"!==s||(n=t,r=t.default);var o="function"==typeof r?r.options:r;if(e&&(o.render=e.render,o.staticRenderFns=e.staticRenderFns),a&&(o._scopeId=a),i){var l=Object.create(o.computed||null);Object.keys(i).forEach(function(t){var e=i[t];l[t]=function(){return e}}),o.computed=l}return{esModule:n,exports:r,options:o}}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("span",[t._v("\n  "+t._s(t.displayValue)+"\n")])},staticRenderFns:[]}}])},t.exports=i()},ibPf:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("WBHA"),n={name:"CountTo-demo",components:{CountTo:a.n(i).a},data:function(){return{startVal:0,endVal:2018,duration:2e3,prefix:"￥",suffix:"rmb"}},methods:{start:function(){this.$refs.example.start()},pauseResume:function(){this.$refs.example.pauseResume()}}},r={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"components-container"},[a("code",[t._v("CountTo组件的使用")]),t._v(" "),t._m(0),t._v(" "),a("count-to",{ref:"example",staticClass:"example",attrs:{startVal:t.startVal,endVal:t.endVal,duration:t.duration,prefix:t.prefix,suffix:t.suffix}}),t._v(" "),a("div",{staticClass:"container"},[a("label",{staticClass:"label",attrs:{for:"startVal"}},[t._v("startVal:\n            "),a("el-input-number",{attrs:{"controls-position":"right",min:1},model:{value:t.startVal,callback:function(e){t.startVal=e},expression:"startVal"}})],1),t._v(" "),a("label",{staticClass:"label",attrs:{for:"endValInput"}},[t._v("endVal:\n            "),a("el-input-number",{attrs:{"controls-position":"right",min:1},model:{value:t.endVal,callback:function(e){t.endVal=e},expression:"endVal"}})],1),t._v(" "),a("label",{staticClass:"label",attrs:{for:"durationInput"}},[t._v("duration:\n            "),a("el-input-number",{attrs:{"controls-position":"right",min:1},model:{value:t.duration,callback:function(e){t.duration=e},expression:"duration"}})],1),t._v(" "),a("label",{staticClass:"label",attrs:{for:"suffixInput"}},[t._v("suffix:\n            "),a("el-input",{staticStyle:{width:"33%"},attrs:{"controls-position":"right"},model:{value:t.suffix,callback:function(e){t.suffix=e},expression:"suffix"}})],1),t._v(" "),a("label",{staticClass:"label",attrs:{for:"prefixInput"}},[t._v("prefix:\n            "),a("el-input",{staticStyle:{width:"33%"},attrs:{"controls-position":"right"},model:{value:t.prefix,callback:function(e){t.prefix=e},expression:"prefix"}})],1),t._v(" "),a("el-button",{attrs:{type:"primary"},nativeOn:{click:function(e){return t.start(e)}}},[t._v("开始")]),t._v(" "),a("el-button",{attrs:{type:"warning"},nativeOn:{click:function(e){return t.pauseResume(e)}}},[t._v("暂停/恢复")]),t._v(" "),a("code",[t._v("<count-to :start-val='"+t._s(t.startVal)+"' :end-val='"+t._s(t.endVal)+"' :duration='"+t._s(t.duration)+"' :prefix='"+t._s(t.prefix)+"' :suffix='"+t._s(t.suffix)+"'\n    :autoplay=false>")]),t._v(" "),a("div",{staticClass:"blur"})],1)],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("code",[e("a",{attrs:{href:"https://www.npmjs.com/package/vue-count-to"}},[this._v("学习地址")])])}]};var s=a("VU/8")(n,r,!1,function(t){a("OYuA")},"data-v-1fe6b2bb",null);e.default=s.exports}});
//# sourceMappingURL=15.010f0da39bced764f3ac.js.map