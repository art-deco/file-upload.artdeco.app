(function(){function aa(a){var b=0;return function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}}}function l(a){var b="undefined"!=typeof Symbol&&Symbol.iterator&&a[Symbol.iterator];return b?b.call(a):{next:aa(a)}}function ba(a){for(var b,c=[];!(b=a.next()).done;)c.push(b.value);return c}function n(a){return a instanceof Array?a:ba(l(a))}var ca="function"==typeof Object.create?Object.create:function(a){function b(){}b.prototype=a;return new b},da;
if("function"==typeof Object.setPrototypeOf)da=Object.setPrototypeOf;else{var ea;a:{var fa={J:!0},ha={};try{ha.__proto__=fa;ea=ha.J;break a}catch(a){}ea=!1}da=ea?function(a,b){a.__proto__=b;if(a.__proto__!==b)throw new TypeError(a+" is not extensible");return a}:null}var ia=da;
function q(a,b){a.prototype=ca(b.prototype);a.prototype.constructor=a;if(ia)ia(a,b);else for(var c in b)if("prototype"!=c)if(Object.defineProperties){var d=Object.getOwnPropertyDescriptor(b,c);d&&Object.defineProperty(a,c,d)}else a[c]=b[c]}var r="undefined"!=typeof window&&window===this?this:"undefined"!=typeof global&&null!=global?global:this,ja="function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){a!=Array.prototype&&a!=Object.prototype&&(a[b]=c.value)};
function u(a,b){if(b){var c=r;a=a.split(".");for(var d=0;d<a.length-1;d++){var e=a[d];e in c||(c[e]={});c=c[e]}a=a[a.length-1];d=c[a];b=b(d);b!=d&&null!=b&&ja(c,a,{configurable:!0,writable:!0,value:b})}}
u("Promise",function(a){function b(f){this.b=0;this.g=void 0;this.a=[];var h=this.c();try{f(h.resolve,h.reject)}catch(k){h.reject(k)}}function c(){this.a=null}function d(f){return f instanceof b?f:new b(function(h){h(f)})}if(a)return a;c.prototype.b=function(f){if(null==this.a){this.a=[];var h=this;this.c(function(){h.g()})}this.a.push(f)};var e=r.setTimeout;c.prototype.c=function(f){e(f,0)};c.prototype.g=function(){for(;this.a&&this.a.length;){var f=this.a;this.a=[];for(var h=0;h<f.length;++h){var k=
f[h];f[h]=null;try{k()}catch(m){this.f(m)}}}this.a=null};c.prototype.f=function(f){this.c(function(){throw f;})};b.prototype.c=function(){function f(m){return function(p){k||(k=!0,m.call(h,p))}}var h=this,k=!1;return{resolve:f(this.X),reject:f(this.f)}};b.prototype.X=function(f){if(f===this)this.f(new TypeError("A Promise cannot resolve to itself"));else if(f instanceof b)this.Z(f);else{a:switch(typeof f){case "object":var h=null!=f;break a;case "function":h=!0;break a;default:h=!1}h?this.u(f):this.j(f)}};
b.prototype.u=function(f){var h=void 0;try{h=f.then}catch(k){this.f(k);return}"function"==typeof h?this.$(h,f):this.j(f)};b.prototype.f=function(f){this.l(2,f)};b.prototype.j=function(f){this.l(1,f)};b.prototype.l=function(f,h){if(0!=this.b)throw Error("Cannot settle("+f+", "+h+"): Promise already settled in state"+this.b);this.b=f;this.g=h;this.s()};b.prototype.s=function(){if(null!=this.a){for(var f=0;f<this.a.length;++f)g.b(this.a[f]);this.a=null}};var g=new c;b.prototype.Z=function(f){var h=this.c();
f.w(h.resolve,h.reject)};b.prototype.$=function(f,h){var k=this.c();try{f.call(h,k.resolve,k.reject)}catch(m){k.reject(m)}};b.prototype.then=function(f,h){function k(w,z){return"function"==typeof w?function(M){try{m(w(M))}catch(oa){p(oa)}}:z}var m,p,t=new b(function(w,z){m=w;p=z});this.w(k(f,m),k(h,p));return t};b.prototype.catch=function(f){return this.then(void 0,f)};b.prototype.w=function(f,h){function k(){switch(m.b){case 1:f(m.g);break;case 2:h(m.g);break;default:throw Error("Unexpected state: "+
m.b);}}var m=this;null==this.a?g.b(k):this.a.push(k)};b.resolve=d;b.reject=function(f){return new b(function(h,k){k(f)})};b.race=function(f){return new b(function(h,k){for(var m=l(f),p=m.next();!p.done;p=m.next())d(p.value).w(h,k)})};b.all=function(f){var h=l(f),k=h.next();return k.done?d([]):new b(function(m,p){function t(M){return function(oa){w[M]=oa;z--;0==z&&m(w)}}var w=[],z=0;do w.push(void 0),z++,d(k.value).w(t(w.length-1),p),k=h.next();while(!k.done)})};return b});
function ka(){ka=function(){};r.Symbol||(r.Symbol=la)}function ma(a,b){this.a=a;ja(this,"description",{configurable:!0,writable:!0,value:b})}ma.prototype.toString=function(){return this.a};var la=function(){function a(c){if(this instanceof a)throw new TypeError("Symbol is not a constructor");return new ma("jscomp_symbol_"+(c||"")+"_"+b++,c)}var b=0;return a}();
function na(){ka();var a=r.Symbol.iterator;a||(a=r.Symbol.iterator=r.Symbol("Symbol.iterator"));"function"!=typeof Array.prototype[a]&&ja(Array.prototype,a,{configurable:!0,writable:!0,value:function(){return pa(aa(this))}});na=function(){}}function pa(a){na();a={next:a};a[r.Symbol.iterator]=function(){return this};return a}function qa(){this.l=!1;this.g=null;this.c=void 0;this.a=1;this.f=this.j=0;this.u=this.b=null}
function ra(a){if(a.l)throw new TypeError("Generator is already running");a.l=!0}qa.prototype.s=function(a){this.c=a};function sa(a,b){a.b={B:b,C:!0};a.a=a.j||a.f}qa.prototype.return=function(a){this.b={return:a};this.a=this.f};function v(a,b,c){a.a=c;return{value:b}}qa.prototype.o=function(a){this.a=a};function ta(a,b){a.j=2;void 0!=b&&(a.f=b)}function ua(a){a.j=0;var b=a.b.B;a.b=null;return b}
function va(a,b){var c=a.u.splice(0)[0];(c=a.b=a.b||c)?c.C?a.a=a.j||a.f:void 0!=c.o&&a.f<c.o?(a.a=c.o,a.b=null):a.a=a.f:a.a=b}function wa(a){this.a=new qa;this.b=a}function xa(a,b){ra(a.a);var c=a.a.g;if(c)return ya(a,"return"in c?c["return"]:function(d){return{value:d,done:!0}},b,a.a.return);a.a.return(b);return x(a)}
function ya(a,b,c,d){try{var e=b.call(a.a.g,c);if(!(e instanceof Object))throw new TypeError("Iterator result "+e+" is not an object");if(!e.done)return a.a.l=!1,e;var g=e.value}catch(f){return a.a.g=null,sa(a.a,f),x(a)}a.a.g=null;d.call(a.a,g);return x(a)}function x(a){for(;a.a.a;)try{var b=a.b(a.a);if(b)return a.a.l=!1,{value:b.value,done:!1}}catch(c){a.a.c=void 0,sa(a.a,c)}a.a.l=!1;if(a.a.b){b=a.a.b;a.a.b=null;if(b.C)throw b.B;return{value:b.return,done:!0}}return{value:void 0,done:!0}}
function za(a){this.next=function(b){ra(a.a);a.a.g?b=ya(a,a.a.g.next,b,a.a.s):(a.a.s(b),b=x(a));return b};this.throw=function(b){ra(a.a);a.a.g?b=ya(a,a.a.g["throw"],b,a.a.s):(sa(a.a,b),b=x(a));return b};this.return=function(b){return xa(a,b)};na();this[Symbol.iterator]=function(){return this}}function Aa(a){function b(d){return a.next(d)}function c(d){return a.throw(d)}return new Promise(function(d,e){function g(f){f.done?d(f.value):Promise.resolve(f.value).then(b,c).then(g,e)}g(a.next())})}
function y(a){return Aa(new za(new wa(a)))}function Ba(a,b){na();a instanceof String&&(a+="");var c=0,d={next:function(){if(c<a.length){var e=c++;return{value:b(e,a[e]),done:!1}}d.next=function(){return{done:!0,value:void 0}};return d.next()}};d[Symbol.iterator]=function(){return d};return d}u("Array.prototype.values",function(a){return a?a:function(){return Ba(this,function(b,c){return c})}});
u("Object.entries",function(a){return a?a:function(b){var c=[],d;for(d in b)Object.prototype.hasOwnProperty.call(b,d)&&c.push([d,b[d]]);return c}});function Ca(a,b,c){if(null==a)throw new TypeError("The 'this' value for String.prototype."+c+" must not be null or undefined");if(b instanceof RegExp)throw new TypeError("First argument to String.prototype."+c+" must not be a regular expression");return a+""}
u("String.prototype.startsWith",function(a){return a?a:function(b,c){var d=Ca(this,b,"startsWith"),e=d.length,g=b.length;c=Math.max(0,Math.min(c|0,d.length));for(var f=0;f<g&&c<e;)if(d[c++]!=b[f++])return!1;return f>=g}});u("String.prototype.repeat",function(a){return a?a:function(b){var c=Ca(this,null,"repeat");if(0>b||1342177279<b)throw new RangeError("Invalid count value");b|=0;for(var d="";b;)if(b&1&&(d+=c),b>>>=1)c+=c;return d}});try{window.preact=preact}catch(a){window.preact={}}
var Da=window.preact,A=Da.h,B=Da.Component,Ea=Da.render;function Fa(a){var b=a.help,c=a.m,d=a.valid,e="text-muted";a.invalid?e="invalid-feedback":d&&(e="valid-feedback");a="form-text "+e;return"string"!=typeof b?A("small",{id:c,className:a},b):A("small",{id:c,className:a,dangerouslySetInnerHTML:{__html:b}})};function Ga(a){var b=[];a=Object.entries(a).reduce(function(c,d){var e=l(d);d=e.next().value;e=e.next().value;if("col"==d||d.startsWith("col-"))return b.push(d),c;c[d]=e;return c},{});return{K:b,ca:a}};function Ha(){var a=B.call(this)||this;a.id="i"+Math.floor(1E5*Math.random());a.m="h"+a.id;a.props=a.props;return a}q(Ha,B);Ha.prototype.getChildContext=function(){return{id:this.id,m:this.m}};
Ha.prototype.render=function(a){var b=Object.assign({},a),c=a.children,d=a.label,e=a.help,g=a.details,f=a.className,h=a["form-row"],k=void 0===a.row?h:a.row;a=a.labelClassName;b=(delete b.children,delete b.label,delete b.help,delete b.details,delete b.className,delete b["form-row"],delete b.row,delete b.labelClassName,b);f=["form-group",f,k?(h?"form-":"")+"row":null].filter(Boolean).join(" ")||void 0;h=Ga(b).K;a=[k?"col-form-label":null,a].concat(n(h)).filter(Boolean).join(" ")||void 0;d=d?A("label",
{className:a,htmlFor:this.id},d):null;e=A(Fa,{help:e,m:this.m});return g?A("details",{className:f},A("summary",{},d),c,k?A("div",{className:"col-12"},e):e):A("div",{className:f},d,c,k?A("div",{className:"col-12"},e):e)};function Ia(a,b){return b=b||{},new Promise(function(c,d){function e(){return{ok:2==(g.status/100|0),statusText:g.statusText,status:g.status,url:g.responseURL,text:function(){return Promise.resolve(g.responseText)},json:function(){return Promise.resolve(JSON.parse(g.responseText))},blob:function(){return Promise.resolve(new Blob([g.response]))},clone:e,headers:{keys:function(){return f},entries:function(){return h},get:function(p){return k[p.toLowerCase()]},has:function(p){return p.toLowerCase()in
k}}}}var g=new XMLHttpRequest,f=[],h=[],k={},m;for(m in g.open(b.method||"get",a,!0),g.onload=function(){g.getAllResponseHeaders().replace(/^(.*?):[^\S\n]*([\s\S]*?)$/gm,function(p,t,w){f.push(t=t.toLowerCase());h.push([t,w]);k[t]=k[t]?k[t]+","+w:w});c(e())},g.onerror=d,g.withCredentials="include"==b.credentials,b.headers)g.setRequestHeader(m,b.headers[m]);g.send(b.body||null)})};function C(){var a=B.call(this)||this;a.props=a.props;a.state={formLoading:!1,error:null,success:null};a.c={};return a}q(C,B);
C.prototype.b=function(a){var b=this,c,d,e,g,f;return y(function(h){switch(h.a){case 1:a.preventDefault();if(!b.props.path)return b.setState({error:"Path is not set in the properties of the form."}),h.return(!1);b.setState({error:null,success:null});c=new FormData(a.target);b.setState({formLoading:!0});ta(h,3);return v(h,Ia(b.props.path,Object.assign({},{method:"POST",body:c},b.c)),5);case 5:return d=h.c,v(h,d.json(),6);case 6:e=h.c,(g=e.error)?b.setState({error:g}):b.setState({success:1});case 3:h.u=
[h.b];h.j=0;h.f=0;b.setState({formLoading:!1});va(h,4);break;case 2:f=ua(h);b.setState({error:f});h.o(3);break;case 4:if(!b.props.submitFinish){h.o(7);break}return v(h,b.props.submitFinish(d),7);case 7:return h.return(!1)}})};C.prototype.a=function(){this.setState({error:null,success:null})};function D(){var a=B.call(this)||this;a.state={values:{}};a.props=a.props;return a}q(D,B);D.prototype.getChildContext=function(){return{values:this.state.values,onChange:this.onChange.bind(this)}};D.prototype.onChange=function(a,b){var c={};this.setState({values:Object.assign({},this.state.values,(c[a]=b,c))});if(this.props.onChange)this.props.onChange(this.state.values)};
D.prototype.render=function(a){var b=Object.assign({},a),c=a.children,d=a.formRef;a=a.onSubmit;b=(delete b.children,delete b.formRef,delete b.onSubmit,delete b.onChange,b);return A("form",Object.assign({},b,{ref:d,onSubmit:a}),c)};
function Ja(a){var b=Object.assign({},a),c=a.disabled,d=a.loading,e=a.confirmText,g=void 0===a.loadingText?e:a.loadingText,f=a.className,h=void 0===a.type?"primary":a.type;a=void 0===a.outline?!1:a.outline;b=(delete b.disabled,delete b.loading,delete b.confirmText,delete b.loadingText,delete b.className,delete b.type,delete b.outline,b);f=["btn","btn-"+(a?"outline-":"")+h,f].filter(Boolean);return A("button",Object.assign({},b,{className:f.join(" "),type:"submit",disabled:c||d}),d&&A("span",{className:"spinner-border spinner-border-sm"+
(g?" mr-2":""),role:"status","aria-hidden":"true"}),d?g:e)};function Ka(a,b,c){for(var d=[],e=0,g=b;g<b+c;g++)d[e]="0x"+a.getUint8(g).toString(16),e++;a="";var f=d.length;for(b=0;b<f;)switch(c=d[b++],c>>4){case 0:case 1:case 2:case 3:case 4:case 5:case 6:case 7:a+=String.fromCharCode(c);break;case 12:case 13:e=d[b++];a+=String.fromCharCode((c&31)<<6|e&63);break;case 14:e=d[b++],g=d[b++],a+=String.fromCharCode((c&15)<<12|(e&63)<<6|(g&63)<<0)}return a}
function La(a,b,c,d,e){var g=a.getUint16(c,!e),f={},h;for(h=0;h<g;h++){var k=c+12*h+2;var m=d[a.getUint16(k,!e)];f[m]=Ma(a,k,b,e)}return f}
function Ma(a,b,c,d){var e=a.getUint16(b+2,!d),g=a.getUint32(b+4,!d);c=a.getUint32(b+8,!d)+c;switch(e){case 1:case 7:if(1==g)return a.getUint8(b+8);c=4<g?c:b+8;b=[];for(e=0;e<g;e++)b[e]=a.getUint8(c+e);return b;case 2:return Ka(a,4<g?c:b+8,g-1);case 3:if(1==g)return a.getUint16(b+8,!d);c=2<g?c:b+8;b=[];for(e=0;e<g;e++)b[e]=a.getUint16(c+2*e,!d);return b;case 4:if(1==g)return a.getUint32(b+8,!d);b=[];for(e=0;e<g;e++)b[e]=a.getUint32(c+4*e,!d);return b;case 5:if(1==g){var f=a.getUint32(c,!d);var h=
a.getUint32(c+4,!d);a=new Number(f/h);a.O=f;a.L=h;return a}b=[];for(e=0;e<g;e++)f=a.getUint32(c+8*e,!d),h=a.getUint32(c+4+8*e,!d),b[e]=new Number(f/h),b[e].O=f,b[e].L=h;return b;case 9:if(1==g)return a.getInt32(b+8,!d);b=[];for(e=0;e<g;e++)b[e]=a.getInt32(c+4*e,!d);return b;case 10:if(1==g)return a.getInt32(c,!d)/a.getInt32(c+4,!d);b=[];for(e=0;e<g;e++)b[e]=a.getInt32(c+8*e,!d)/a.getInt32(c+4+8*e,!d);return b}};var E={},Na=(E[120]="Caption-Abstract",E[110]="Credit",E[25]="Keywords",E[55]="DateCreated",E[80]="By-line",E[85]="By-lineTitle",E[122]="Writer-Editor",E[105]="Headline",E[116]="CopyrightNotice",E[15]="Category",E);var F={},Oa=(F[256]="ImageWidth",F[257]="ImageHeight",F[258]="BitsPerSample",F[259]="Compression",F[262]="PhotometricInterpretation",F[273]="StripOffsets",F[274]="Orientation",F[277]="SamplesPerPixel",F[278]="RowsPerStrip",F[279]="StripByteCounts",F[282]="XResolution",F[283]="YResolution",F[284]="PlanarConfiguration",F[296]="ResolutionUnit",F[513]="JpegIFOffset",F[514]="JpegIFByteCount",F[529]="YCbCrCoefficients",F[530]="YCbCrSubSampling",F[531]="YCbCrPositioning",F[532]="ReferenceBlackWhite",F);var G={},Pa=(G[256]="ImageWidth",G[257]="ImageHeight",G[34665]="ExifIFDPointer",G[34853]="GPSInfoIFDPointer",G[40965]="InteroperabilityIFDPointer",G[258]="BitsPerSample",G[259]="Compression",G[262]="PhotometricInterpretation",G[274]="Orientation",G[277]="SamplesPerPixel",G[284]="PlanarConfiguration",G[530]="YCbCrSubSampling",G[531]="YCbCrPositioning",G[282]="XResolution",G[283]="YResolution",G[296]="ResolutionUnit",G[273]="StripOffsets",G[278]="RowsPerStrip",G[279]="StripByteCounts",G[513]="JPEGInterchangeFormat",
G[514]="JPEGInterchangeFormatLength",G[301]="TransferFunction",G[318]="WhitePoint",G[319]="PrimaryChromaticities",G[529]="YCbCrCoefficients",G[532]="ReferenceBlackWhite",G[306]="DateTime",G[270]="ImageDescription",G[271]="Make",G[272]="Model",G[305]="Software",G[315]="Artist",G[33432]="Copyright",G);var H={},Qa=(H[36864]="ExifVersion",H[40960]="FlashpixVersion",H[40961]="ColorSpace",H[40962]="PixelXDimension",H[40963]="PixelYDimension",H[37121]="ComponentsConfiguration",H[37122]="CompressedBitsPerPixel",H[37500]="MakerNote",H[37510]="UserComment",H[40964]="RelatedSoundFile",H[36867]="DateTimeOriginal",H[36868]="DateTimeDigitized",H[37520]="SubsecTime",H[37521]="SubsecTimeOriginal",H[37522]="SubsecTimeDigitized",H[33434]="ExposureTime",H[33437]="FNumber",H[34850]="ExposureProgram",H[34852]="SpectralSensitivity",
H[34855]="ISOSpeedRatings",H[34856]="OECF",H[37377]="ShutterSpeedValue",H[37378]="ApertureValue",H[37379]="BrightnessValue",H[37380]="ExposureBias",H[37381]="MaxApertureValue",H[37382]="SubjectDistance",H[37383]="MeteringMode",H[37384]="LightSource",H[37385]="Flash",H[37396]="SubjectArea",H[37386]="FocalLength",H[41483]="FlashEnergy",H[41484]="SpatialFrequencyResponse",H[41486]="FocalPlaneXResolution",H[41487]="FocalPlaneYResolution",H[41488]="FocalPlaneResolutionUnit",H[41492]="SubjectLocation",
H[41493]="ExposureIndex",H[41495]="SensingMethod",H[41728]="FileSource",H[41729]="SceneType",H[41730]="CFAPattern",H[41985]="CustomRendered",H[41986]="ExposureMode",H[41987]="WhiteBalance",H[41988]="DigitalZoomRation",H[41989]="FocalLengthIn35mmFilm",H[41990]="SceneCaptureType",H[41991]="GainControl",H[41992]="Contrast",H[41993]="Saturation",H[41994]="Sharpness",H[41995]="DeviceSettingDescription",H[41996]="SubjectDistanceRange",H[40965]="InteroperabilityIFDPointer",H[42016]="ImageUniqueID",H);var I={},Ra=(I[0]="GPSVersionID",I[1]="GPSLatitudeRef",I[2]="GPSLatitude",I[3]="GPSLongitudeRef",I[4]="GPSLongitude",I[5]="GPSAltitudeRef",I[6]="GPSAltitude",I[7]="GPSTimeStamp",I[8]="GPSSatellites",I[9]="GPSStatus",I[10]="GPSMeasureMode",I[11]="GPSDOP",I[12]="GPSSpeedRef",I[13]="GPSSpeed",I[14]="GPSTrackRef",I[15]="GPSTrack",I[16]="GPSImgDirectionRef",I[17]="GPSImgDirection",I[18]="GPSMapDatum",I[19]="GPSDestLatitudeRef",I[20]="GPSDestLatitude",I[21]="GPSDestLongitudeRef",I[22]="GPSDestLongitude",
I[23]="GPSDestBearingRef",I[24]="GPSDestBearing",I[25]="GPSDestDistanceRef",I[26]="GPSDestDistance",I[27]="GPSProcessingMethod",I[28]="GPSAreaInformation",I[29]="GPSDateStamp",I[30]="GPSDifferential",I);function Sa(a){var b=l(a.split(/\D/));a=b.next().value;var c=b.next().value,d=b.next().value,e=b.next().value,g=b.next().value;b=b.next().value;return new Date(a,c-1,d,e,g,b)};function Ta(a,b,c){c=void 0===c?{}:c;var d=void 0===c.coordinates?"dms":c.coordinates,e=void 0===c.parseDates?!1:c.parseDates;if("Exif"!=Ka(a,b,4))return!1;c=b+6;if(18761==a.getUint16(c))var g=!1;else if(19789==a.getUint16(c))g=!0;else return!1;if(42!=a.getUint16(c+2,!g))return!1;var f=a.getUint32(c+4,!g);if(8>f)return!1;b=La(a,c,c+f,Pa,g);e&&b.DateTime&&(b.DateTime=Sa(b.DateTime));var h=b.ExifIFDPointer,k=b.GPSInfoIFDPointer;if(h)for(t in h=La(a,c,c+h,Qa,g),h){var m=h[t];switch(t){case "LightSource":case "Flash":case "MeteringMode":case "ExposureProgram":case "SensingMethod":case "SceneCaptureType":case "SceneType":case "CustomRendered":case "WhiteBalance":case "GainControl":case "Contrast":case "Saturation":case "Sharpness":case "SubjectDistanceRange":case "FileSource":m=
J[t][m];break;case "DateTimeOriginal":case "DateTimeDigitized":e&&(m=Sa(m));break;case "ExifVersion":case "FlashpixVersion":m=String.fromCharCode(m[0],m[1],m[2],m[3]);break;case "ComponentsConfiguration":m=J.Components[m[0]]+J.Components[m[1]]+J.Components[m[2]]+J.Components[m[3]]}b[t]=m}if(k){e=La(a,c,c+k,Ra,g);for(t in e){k=e[t];switch(t){case "GPSVersionID":var p=l(k);k=p.next().value;h=p.next().value;m=p.next().value;p=p.next().value;k=[k,h,m,p].join(".")}b[t]=k}if("dd"==d){if(b.GPSLongitude){e=
l(b.GPSLongitude);var t=e.next().value;d=e.next().value;e=e.next().value;k=b.GPSLongitudeRef;b.GPSLongitude=(t+d/60+e/3600)*("S"==k||"W"==k?-1:1)}b.GPSLatitude&&(e=l(b.GPSLatitude),t=e.next().value,d=e.next().value,e=e.next().value,k=b.GPSLatitudeRef,b.GPSLatitude=(t+d/60+e/3600)*("S"==k||"W"==k?-1:1))}}f=c+f;t=a.getUint16(f,!g);if(f=a.getUint32(f+2+12*t,!g))if(f>a.byteLength)a={};else{f=La(a,c,c+f,Oa,g);if(f.Compression)switch(f.Compression){case 6:f.I&&f.H&&(f.blob=new Blob([new Uint8Array(a.buffer,
c+f.I,f.H)],{type:"image/jpeg"}));break;case 1:console.log("Thumbnail image format is TIFF, which is not implemented.");break;default:console.log("Unknown thumbnail image format '%s'",f.Compression)}else 2==f.PhotometricInterpretation&&console.log("Thumbnail image format is RGB, which is not implemented.");a=f}else a={};b.thumbnail=a;return b}
var K={},L={},N={},O={},P={},Q={},Ua={},Va={},Wa={},R={},Xa={},Ya={},Za={},S={},$a={},T={},J={ExposureProgram:(K[0]="Not defined",K[1]="Manual",K[2]="Normal program",K[3]="Aperture priority",K[4]="Shutter priority",K[5]="Creative program",K[6]="Action program",K[7]="Portrait mode",K[8]="Landscape mode",K),MeteringMode:(L[0]="Unknown",L[1]="Average",L[2]="CenterWeightedAverage",L[3]="Spot",L[4]="MultiSpot",L[5]="Pattern",L[6]="Partial",L[255]="Other",L),LightSource:(N[0]="Unknown",N[1]="Daylight",
N[2]="Fluorescent",N[3]="Tungsten (incandescent light)",N[4]="Flash",N[9]="Fine weather",N[10]="Cloudy weather",N[11]="Shade",N[12]="Daylight fluorescent (D 5700 - 7100K)",N[13]="Day white fluorescent (N 4600 - 5400K)",N[14]="Cool white fluorescent (W 3900 - 4500K)",N[15]="White fluorescent (WW 3200 - 3700K)",N[17]="Standard light A",N[18]="Standard light B",N[19]="Standard light C",N[20]="D55",N[21]="D65",N[22]="D75",N[23]="D50",N[24]="ISO studio tungsten",N[255]="Other",N),Flash:(O[0]="Flash did not fire",
O[1]="Flash fired",O[5]="Strobe return light not detected",O[7]="Strobe return light detected",O[9]="Flash fired, compulsory flash mode",O[13]="Flash fired, compulsory flash mode, return light not detected",O[15]="Flash fired, compulsory flash mode, return light detected",O[16]="Flash did not fire, compulsory flash mode",O[24]="Flash did not fire, auto mode",O[25]="Flash fired, auto mode",O[29]="Flash fired, auto mode, return light not detected",O[31]="Flash fired, auto mode, return light detected",
O[32]="No flash function",O[65]="Flash fired, red-eye reduction mode",O[69]="Flash fired, red-eye reduction mode, return light not detected",O[71]="Flash fired, red-eye reduction mode, return light detected",O[73]="Flash fired, compulsory flash mode, red-eye reduction mode",O[77]="Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",O[79]="Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",O[89]="Flash fired, auto mode, red-eye reduction mode",
O[93]="Flash fired, auto mode, return light not detected, red-eye reduction mode",O[95]="Flash fired, auto mode, return light detected, red-eye reduction mode",O),SensingMethod:(P[1]="Not defined",P[2]="One-chip color area sensor",P[3]="Two-chip color area sensor",P[4]="Three-chip color area sensor",P[5]="Color sequential area sensor",P[7]="Trilinear sensor",P[8]="Color sequential linear sensor",P),SceneCaptureType:(Q[0]="Standard",Q[1]="Landscape",Q[2]="Portrait",Q[3]="Night scene",Q),SceneType:(Ua[1]=
"Directly photographed",Ua),CustomRendered:(Va[0]="Normal process",Va[1]="Custom process",Va),WhiteBalance:(Wa[0]="Auto white balance",Wa[1]="Manual white balance",Wa),GainControl:(R[0]="None",R[1]="Low gain up",R[2]="High gain up",R[3]="Low gain down",R[4]="High gain down",R),Contrast:(Xa[0]="Normal",Xa[1]="Soft",Xa[2]="Hard",Xa),Saturation:(Ya[0]="Normal",Ya[1]="Low saturation",Ya[2]="High saturation",Ya),Sharpness:(Za[0]="Normal",Za[1]="Soft",Za[2]="Hard",Za),SubjectDistanceRange:(S[0]="Unknown",
S[1]="Macro",S[2]="Close view",S[3]="Distant view",S),FileSource:($a[3]="DSC",$a),Components:(T[0]="",T[1]="Y",T[2]="Cb",T[3]="Cr",T[4]="R",T[5]="G",T[6]="B",T)};function U(){var a=B.call(this)||this;a.state={count:3};a.a=null;return a}q(U,B);U.prototype.componentDidMount=function(){var a=this;this.a=setInterval(function(){var b=a.state.count+1;3<b&&(b=0);a.setState({count:b})},250)};U.prototype.componentWillUnmount=function(){clearInterval(this.a)};U.prototype.render=function(){var a=".".repeat(this.state.count),b=".".repeat(3-this.state.count);return A("span",{},a,A("span",{style:"opacity:0"},b))};function V(){var a=B.call(this)||this;a.state={v:!1,progress:null,error:null,A:null,result:null};a.a=a.a.bind(a);return a}q(V,B);V.prototype.componentDidMount=function(){ab(this,this.props.file);bb(this,this.props.file)};
function bb(a,b){var c=new FileReader;c.readAsArrayBuffer(b);c.onload=function(){var d=c.result;a:{var e={parseDates:!0};var g=new DataView(d);if(255!=g.getUint8(0)||216!=g.getUint8(1))e=!1;else{for(var f=d.byteLength,h=2,k;h<f;){if(255!=g.getUint8(h)){e=!1;break a}k=g.getUint8(h+1);if(225==k){e=Ta(g,h+4,e);break a}h+=2+g.getUint16(h+2)}e=void 0}}a:if(g=new DataView(d),255!=g.getUint8(0)||216!=g.getUint8(1))d=!1;else{f=2;for(h=d.byteLength;f<h;){k=f;if(56===g.getUint8(k)&&66===g.getUint8(k+1)&&73===
g.getUint8(k+2)&&77===g.getUint8(k+3)&&4===g.getUint8(k+4)&&4===g.getUint8(k+5)){k=g.getUint8(f+7);0!==k%2&&(k+=1);0===k&&(k=4);h=f+8+k;f=g.getUint16(f+6+k);g=h;d=new DataView(d);h={};for(k=g;k<g+f;){if(28===d.getUint8(k)&&2===d.getUint8(k+1)){var m=d.getUint8(k+2);if(m in Na){var p=d.getInt16(k+3);m=Na[m];p=Ka(d,k+5,p);h.hasOwnProperty(m)?h[m]instanceof Array?h[m].push(p):h[m]=[h[m],p]:h[m]=p}}k++}d=h;break a}f++}d=void 0}a.setState({N:{data:e,iptcdata:d}})}}
function ab(a,b){var c=new FileReader;c.readAsDataURL(b);c.onload=function(){cb(a,c.result)}}function cb(a,b){var c=new Image;c.src=b;c.onload=function(){var d=c.width/c.height;d=c.width>c.height?250*d:250/d;var e=document.createElement("canvas");e.width=d;e.height=250;e.getContext("2d").drawImage(c,0,0,e.width,e.height);d=e.toDataURL();a.setState({A:d})}}
V.prototype.upload=function(){var a=this,b,c;return y(function(d){b=a.props;c=void 0===b.uploadUri?"/upload-asset":b.uploadUri;a.setState({error:null,progress:0,v:!1});return d.return(db(a,c))})};
function db(a,b){var c,d,e,g;return y(function(f){c=a.props;d=c.file;e=new FormData;e.append("image",d);g=new XMLHttpRequest;g.open("POST",b+"&name="+d.name,!0);g.a=0;g.upload.addEventListener("progress",function(h){a.setState({progress:100*h.loaded/h.total||100})});g.addEventListener("readystatechange",function(){4==g.readyState&&a.setState({v:!0,progress:null});if(4==g.readyState&&200==g.status){var h=g.responseText;try{var k=JSON.parse(h);var m=k.error;var p=k.result;var t=k.photoId}catch(w){m=
"Could not parse JSON: "+w.message}m?a.setState({error:m}):p&&(a.setState({result:p,A:null,R:t}),a.props.F&&a.props.F(p))}else if(4==g.readyState&&200!=g.status){h="XHR Error";try{h=JSON.parse(g.responseText).error}catch(w){}a.setState({error:h})}});g.send(e);f.a=0})}V.prototype.a=function(a){a.preventDefault();this.upload();return!1};
V.prototype.render=function(a){var b=a.name,c=a.onRemove,d=a.uploadedResults;a=void 0===a.S?"photos[]":a.S;var e=this.context.LOCALE,g=this.state,f=g.progress,h=g.error,k=g.A,m=g.v,p=g.result,t=g.N,w=g.R;g=100==f&&!m;d=w&&d.some(function(M){return M==w});d=p&&!d;k=p||k;try{var z=t.data.DateTime;z=z.toLocaleString()}catch(M){}return A(eb,{error:h,M:d,W:g,src:k,v:m},A("div",{className:"Image"},!k&&A("span",{className:"PreviewLoadingSpan"},e.previewLoading,"..."),A("img",{src:k}),A("span",{className:"ImageInfo",
style:"top:0;left:0;"},b,z&&A("br"),z),A("span",{onClick:c,className:"ImageInfo CloseSpan"},"\u2715"),!p&&!h&&null===f&&A(fb,{style:"background:transparent; padding-left:0;"},A("a",{onClick:this.a,className:"btn btn-light btn-sm"},e.upload)),null!==f&&100!=f&&A(fb,{},A("progress",{max:100,value:f})),g&&A(fb,{},e.serverProcessing,A(U),A("div",{className:"spinner-border text-primary",role:"status"},A("span",{className:"sr-only"},"Loading..."))),h&&A("p",{className:"ImageInfo PhotoError"},e.error,": ",
h),h&&A("a",{onClick:this.a,href:"#",className:"btn btn-danger btn-sm",style:"position:absolute;right:0;bottom:0;"},e.uploadAgain),p&&A("p",{className:"ImageInfo GalleryLink"},A("a",{href:p,rel:"noopener noreferrer",target:"_blank"},e.link)),d&&w&&A("input",{name:a,type:"hidden",value:w})))};
function eb(a){var b=a.children,c=a.error,d=a.M,e=a.v,g=a.src,f="Added";a.W?f="Uploading":c?f="Error":d?f="HasInput":e&&(f="Uploaded");a=["ImageCopy","PhotoUploader"+f].concat(n(g?[]:["PreviewLoading"])).join(" ");return A("div",{className:a},b)}function fb(a){return A("span",{className:void 0===a.className?"ImageInfo":a.className,style:"bottom:0;left:0;"+(void 0===a.style?"":a.style)},a.children)};var W=".PhotoUploader .ImageCopy.PhotoUploaderAdded {\n  background: linear-gradient(lightgrey, grey);\n  border-color: #838383;\n  box-shadow: rgb(98, 98, 98) 1px -5px 15px inset;\n}\n.PhotoUploader .ImageCopy.PhotoUploaderHasInput {\n  background: linear-gradient(yellow, rgb(207, 198, 92));\n  border-color: rgb(156, 158, 9);\n  box-shadow: inset 1px -5px 15px #9e7414;\n}\n.PhotoUploader .ImageCopy.PhotoUploaderError {\n  background: linear-gradient(coral, brown);\n  border-color: red;\n  box-shadow: rgb(162, 31, 31) 1px -5px 15px inset\n}\n.PhotoUploader .ImageCopy.PhotoUploaderUploaded {\n  background: linear-gradient(lightgreen, #82d285);\n  border-color: green;\n  box-shadow: inset 1px -5px 15px #6f9e14;\n}\n.PhotoUploader .ImageCopy.PhotoUploaderUploading {\n  background: linear-gradient(lightblue, blue);\n  border-color: blue;\n  box-shadow: inset 1px -5px 15px #2a33a0;\n}\n\n.PhotoUploader .ImageInfo {\n  background: rgba(255, 255, 255, 0.75);\n  word-break: break-all;\n  max-width: 100%;\n  overflow: scroll;\n  position: absolute;\n  margin: 0;\n  /* margin-left: .5rem; */\n  /* margin-right: .5rem; */\n  padding-left: .25rem;\n  padding-right: .25rem;\n}\n.ImageInfo.PhotoError {\n  background: rgba(156, 66, 60, 0.63);\n  border-color: red;\n  color: navajowhite;\n  text-shadow: 1px 1px brown;\n  bottom: 0;\n  left: 0;\n}\n.PhotoError:hover {\n  z-index: 5;\n}\n.PreviewLoading {\n  width: 290px;\n}\n.PhotoUploader .GalleryLink {\n  bottom: 0;\n  left: 0;\n  padding-left: .25rem;\n  padding-right: .25rem;\n}\n/* .PhotoUploader .Image {\n  padding: .5rem;\n} */\n.PhotoUploader .ImageCopy {\n  padding: .5rem;\n  border: 1px solid grey;\n  background: #cecece;\n  display: inline-block;\n  border-radius: 5px;\n  margin: .25rem;\n  height: 200px;\n  vertical-align: top;\n}\n.PhotoUploader .Image img {\n  max-width: 100%;\n  max-height: 100%;\n  border-radius: 3px;\n  transition: .5s;\n}\n.PhotoUploader .Image:hover img {\n  box-shadow: 0 0 19px 1px white;\n}\n.PhotoUploaderHasInput:hover img {\n  box-shadow: 0 0 19px 1px #ecff4a;\n}\n.PhotoUploaderUploading:hover img {\n  box-shadow: 0 0 19px 1px lightblue;\n}\n.PhotoUploaderError:hover img {\n  box-shadow: 0 0 19px 1px lightsalmon;\n}\n.PhotoUploaderUploaded:hover img {\n  box-shadow: 0 0 19px 1px lightgreen;\n}\n.PhotoLoadingPlaceholder {\n  background:lightgrey;\n  text-align: center;\n}\n.PhotoUploader .Image .CloseSpan {\n  top: 0;\n  right: 0;\n  padding: 5px;\n  cursor: pointer;\n  border-radius: 5px;\n  width: 1.5rem;\n  height: 2rem;\n  overflow: hidden;\n  text-align: center;\n  /* transition: .5s; */\n}\n.PhotoUploader .Image {\n  position: relative;\n  width: 100%;\n  height: 100%;\n}\n.PhotoUploader .PreviewLoadingSpan {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  background: rgba(255, 255, 255, 0.75);\n  padding: .5rem;\n  text-align: center;\n  white-space: nowrap;\n}";
W=void 0===W?"":W;if(document){var gb=document.head,X=document.createElement("style");X.type="text/css";X.styleSheet?X.styleSheet.cssText=W:X.appendChild(document.createTextNode(W));gb.appendChild(X)};var hb={RU_LOCALE:{recognition:"\u0418\u0434\u0435\u0442 \u043e\u043f\u043e\u0437\u043d\u043e\u0432\u0430\u043d\u0438\u0435 \u0444\u0430\u0439\u043b\u043e\u0432...",drop:"\u0418\u043b\u0438 \u043f\u0435\u0440\u0435\u043c\u0435\u0441\u0442\u0438\u0442\u0435 \u0444\u0430\u0439\u043b\u044b \u0441\u044e\u0434\u0430...",previewLoading:"\u0417\u0430\u0433\u0440\u0443\u0437\u043a\u0430 \u043f\u0440\u0435\u0432\u044c\u044e",upload:"\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044c",uploadAgain:"\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044c \u0441\u043d\u043e\u0432\u0430",
link:"\u0421\u0441\u044b\u043b\u043a\u0430",error:"\u041e\u0448\u0438\u0431\u043a\u0430",serverProcessing:"\u0412\u044b\u043f\u043e\u043b\u043d\u044f\u0435\u0442\u0441\u044f \u043e\u0431\u0440\u0430\u0431\u043e\u0442\u043a\u0430"},EN_LOCALE:{recognition:"Preprocessing files...",drop:"Or drag and drop files here...",previewLoading:"Loading preview",upload:"Upload",uploadAgain:"Upload again",link:"Link",error:"Error",serverProcessing:"Server processing"}};
function Y(){var a=B.call(this)||this;a.state={files:[]};a.props=a.props;return a}q(Y,B);function ib(a,b){var c=a.state.files.filter(function(d){return d.file!==b});a.setState({files:c});if(a.props.onRemove)a.props.onRemove(b)}function jb(a,b){var c,d,e;y(function(g){c=l(b);d=ba(c);e=d.map(function(f){return{file:f,U:Math.floor(1E4*Math.random())}});a.setState({files:n(a.state.files).concat(n(e))});if(a.props.onAdded)a.props.onAdded();g.a=0})}Y.prototype.getChildContext=function(){return{LOCALE:this.LOCALE}};
Y.prototype.render=function(a){var b=this,c=void 0===a.fieldName?"files[]":a.fieldName,d=a.onPhotoUploaded,e=a.uploadedResults,g=a.uploadUri;a=this.LOCALE;if(!a)return A("div",{},"Photo Uploader Error: Unknown Locale");var f=this.context,h=0;return A("div",{onDragEnter:function(k){k.preventDefault();h++;k.currentTarget.style.background="#E91E63"},className:"PhotoUploader",onDragLeave:function(k){h--;0==h&&(k.currentTarget.style.background="")},onDrop:function(k){k.preventDefault();k.stopPropagation();
k.currentTarget.style.background="";jb(b,k.dataTransfer.files)},onDragOver:function(k){k.preventDefault();k.stopPropagation()}},A("input",{id:f.id,"aria-described-by":f.m,onChange:function(k){k.preventDefault();jb(b,k.currentTarget.files);k.currentTarget.value=null},accept:"image/*",type:"file",multiple:!0}),this.state.aa?a.recognition:a.drop,A("br"),this.state.files.map(function(k){var m=k.file;return A(V,{uploadUri:g,key:k.U,name:m.name,file:m,onRemove:function(){ib(b,m)},fieldName:c,F:d,uploadedResults:e})}))};
r.Object.defineProperties(Y.prototype,{LOCALE:{configurable:!0,enumerable:!0,get:function(){var a=this.props,b=void 0===a.locale?"en":a.locale;(a=a.LOCALE)||(a=hb[b.toUpperCase()+"_LOCALE"]);return a}}});function Z(){var a=B.call(this)||this;a.state={loading:!0,error:null,i:{}};a.G=a.V.bind(a);window.addEventListener("message",a.G,!1);return a}q(Z,B);Z.prototype.componentDidMount=function(){this.i()};
Z.prototype.i=function(){var a=this,b,c,d;return y(function(e){switch(e.a){case 1:return a.setState({loading:!0}),ta(e,3),v(e,Ia(a.props.host+"/auth",{credentials:"include"}),5);case 5:return b=e.c,v(e,b.json(),6);case 6:c=e.c,a.setState({i:c});case 3:e.u=[e.b];e.j=0;e.f=0;a.setState({loading:!1});va(e,0);break;case 2:d=ua(e),a.setState({error:d.message}),e.o(3)}})};Z.prototype.V=function(a){a.origin==this.props.host&&"signedin"==a.data&&this.i()};
Z.prototype.componentWillUnmount=function(){window.removeEventListener("message",this.G)};function kb(a){var b=void 0===b?{}:b;var c=window.top,d=c.outerHeight,e=c.screenY,g=[];g.push("width=500","left="+(c.outerWidth/2+c.screenX-250));g.push("top="+(d/2+e-305-50),"height=610");c=Object.keys(b).map(function(f){return f+"="+b[f]});g.push.apply(g,n(c));window.open(a,"Sign In",g.join(","))};function lb(a){return A("svg",Object.assign({},a,{role:"img",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"}),A("title",{},"GitHub icon"),A("path",{d:"M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"}))}
;var mb=".GitHubButton {\n  background: #dfdfdf;\n  display: inline-table;\n  border-radius: 3px;\n  font-family: Helvetica Neue,Helvetica,Arial,sans-serif;\n  text-decoration: none;\n  color: black !important;\n  cursor: pointer;\n}\n.GitHubButton .GitHubLogo {\n  padding: 0px 6px 0px 5px;\n  border-right: 1px solid #bcbcbc;\n  border-radius: 3px;\n  font-weight: 600;\n  background: rgb(223, 223, 223);\n  display: table-cell;\n  vertical-align: middle;\n}\n.GitHubButton .GitHubText {\n  padding-left: .5em;\n  padding-right: .5em;\n  font-size: smaller;\n  display: table-cell;\n  vertical-align: middle;\n}";
mb=void 0===mb?"":mb;var nb=document.head,ob=document.createElement("style");ob.type="text/css";ob.styleSheet?ob.styleSheet.cssText=mb:ob.appendChild(document.createTextNode(mb));nb.appendChild(ob);function pb(a){var b=void 0===a.size?"medium":a.size,c=a.host,d=void 0===a.Y?"/auth/github":a.Y,e;"medium"==b?e=1.5:"large"==b&&(e=2);return A("a",{onClick:function(g){g.preventDefault();kb(""+c+d);return!1},onMouseOver:function(g){g.currentTarget.style.background="#bcbcbc"},onMouseOut:function(g){g.currentTarget.style.background="#DFDFDF"},className:"GitHubButton"},A("div",{style:"height:"+e+"rem;font-size:"+e+"rem",className:"GitHubLogo"},A(lb,{height:"100%",style:"margin-top:-4px"})),A("div",{className:"GitHubText"},
"Sign In With GitHub"))};function qb(a){var b=a.linkedin_user;a=a.github_user;var c;if(b)var d=b.profilePicture;else a&&(d=a.avatar_url);b?c=b.firstName+" "+b.lastName:a&&(c=a.name||a.login);return{T:d,name:c}};function rb(a,b,c){var d,e,g,f,h;y(function(k){switch(k.a){case 1:return d=new FormData,d.append("csrf",b),ta(k),v(k,fetch(a+"/signout",{method:"POST",body:d,credentials:"include"}),4);case 4:return e=k.c,v(k,e.json(),5);case 5:g=k.c;(f=g.error)?c(f):c();k.a=0;k.j=0;break;case 2:h=ua(k),c(h.message),k.a=0}})}
function sb(a){var b=a.i,c=void 0===a.D?function(){}:a.D,d=a.host;a=b.github_user;var e=b.csrf;if(!b.linkedin_user&&!a)return null;b=qb(b);a=b.name;return A("div",{},A("img",{src:b.T,width:"50"}),"Hello, ",a,"!"," ",A("a",{onClick:function(g){g.preventDefault();rb(d,e,function(f){f?alert("Could not sign out: "+f+". Please refresh the page and try again. Alternatively, clear your cookies."):c()});return!1},href:"#"},"Sign Out"))};function tb(a){var b=a.error,c=a.loading,d=a.i,e=a.P;a=a.host;return b?A("div",{},"Error: ",b):c?A("div",{},"Loading..."):A("div",{},!(d.linkedin_user||d.github_user)&&A("span",{style:"display:block"},"Please sign in / sign up."),A(sb,{i:d,D:e,host:a}),!d.github_user&&A(pb,{host:a}))};var ub=window.HOST||"http://localhost:5000";function vb(){var a=C.call(this)||this;a.a=a.a.bind(a);a.b=a.b.bind(a);a.state=Object.assign({},C.prototype.state);return a}q(vb,C);
vb.prototype.render=function(a){var b=a.confirmText,c=a.uploadedResults,d=this.state.formLoading,e=this.context.host+"/upload?csrf="+a.csrf;return A(D,{onSubmit:this.b},A("input",{value:a.ba,name:"galleryId",type:"hidden"}),A(Ha,{label:"File Upload",help:"Please select some images and upload them."},A(Y,{uploadUri:e,onPhotoUploaded:this.a,onAdded:this.a,onRemove:this.a,uploadedResults:c})),A(Ja,{loading:d,confirmText:b,loadingText:"Uploading..."}))};
function wb(){var a=Z.call(this)||this;a.state=Object.assign({},a.state,{uploadedResults:[]});return a}q(wb,Z);wb.prototype.getChildContext=function(){return{host:this.props.host}};
wb.prototype.render=function(){var a=this,b=A(tb,{error:this.state.error,loading:this.state.loading,i:this.state.i,host:this.props.host,P:function(){a.setState({i:{}})}});return this.state.i.github_user?A("div",{},b,A(vb,{uploadedResults:this.state.uploadedResults,submitFinish:function(c){var d,e;return y(function(g){if(1==g.a)return v(g,c.json(),2);d=g.c;(e=d.data)&&a.setState({uploadedResults:n(a.state.uploadedResults).concat(n(e))});g.a=0})},path:"/save",confirmText:"Save Uploads",csrf:this.state.i.csrf})):
b};Ea(A(wb,{host:ub}),window["preact-container"]);}).call(this);

//# sourceMappingURL=index.js.map