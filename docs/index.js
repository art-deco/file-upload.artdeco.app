(function(){var b="function"==typeof Object.create?Object.create:function(a){function d(){}d.prototype=a;return new d},c;if("function"==typeof Object.setPrototypeOf)c=Object.setPrototypeOf;else{var e;a:{var f={a:!0},g={};try{g.__proto__=f;e=g.a;break a}catch(a){}e=!1}c=e?function(a,d){a.__proto__=d;if(a.__proto__!==d)throw new TypeError(a+" is not extensible");return a}:null}var h=c;try{window.preact=preact}catch(a){window.preact={}}var k=window.preact,l=k.h,m=k.Component,n=k.render;function p(){return m.apply(this,arguments)||this}p.prototype=b(m.prototype);p.prototype.constructor=p;if(h)h(p,m);else for(var q in m)if("prototype"!=q)if(Object.defineProperties){var r=Object.getOwnPropertyDescriptor(m,q);r&&Object.defineProperty(p,q,r)}else p[q]=m[q];p.prototype.render=function(){return l("div",{},"Hello Preact")};n(l(p),window["preact-container"]);}).call(this);

//# sourceMappingURL=index.js.map