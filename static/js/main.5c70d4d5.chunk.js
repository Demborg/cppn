(window.webpackJsonpcppn=window.webpackJsonpcppn||[]).push([[0],[,,,,,,,,,,,,,,,,function(e,t,a){e.exports=a(36)},,,,,function(e,t,a){},function(e,t,a){},,,,,,function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t,a){e.exports=a.p+"static/media/Roboto-Regular.11eabca2.ttf"},function(e,t,a){e.exports=a.p+"static/media/AlfaSlabOne-Regular.7676beb2.ttf"},function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),i=a(14),o=a.n(i),c=(a(21),a(15)),l=a(7),s=a(8),d=a(10),u=a(9),m=a(11),h=(a(22),a(2)),p="https://www.tensorflow.org/js",v="https://en.wikipedia.org/wiki/Compositional_pattern-producing_network",f=function(e){function t(){return Object(l.a)(this,t),Object(d.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){var e=this.props,t=e.artist,a=e.year,n=e.name,i=e.material;return r.a.createElement("div",{className:"card",width:!0},r.a.createElement("span",{className:"artist"},t)," ",r.a.createElement("br",null),r.a.createElement("span",{className:"name"},n)," ",r.a.createElement("span",{className:"year"},a)," ",r.a.createElement("br",null),r.a.createElement("span",{className:"material"},i))}}]),t}(r.a.Component),b=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(d.a)(this,Object(u.a)(t).call(this,e))).state={model:null},a}return Object(m.a)(t,e),Object(s.a)(t,[{key:"createModel",value:function(e){var t=Object(h.c)();return t.add(h.b.dense({inputShape:[e],units:8,activation:"tanh",kernelInitializer:h.a.randomNormal({stddev:1})})),t.add(h.b.dense({units:8,activation:"tanh",kernelInitializer:h.a.randomNormal({stddev:1})})),t.add(h.b.dense({units:8,activation:"tanh",kernelInitializer:h.a.randomNormal({stddev:1})})),t.add(h.b.dense({units:8,activation:"tanh",kernelInitializer:h.a.randomNormal({stddev:1})})),t.add(h.b.dense({units:8,activation:"tanh",kernelInitializer:h.a.randomNormal({stddev:1})})),t.add(h.b.dense({units:4,activation:"sigmoid",kernelInitializer:h.a.randomNormal({stddev:1})})),t}},{key:"createInput",value:function(e,t,a,n){for(var r=[],i=0;i<t;i++)for(var o=n*(2*i/t-1),l=0;l<e;l++){var s=n*(2*l/e-1);r.push([s,o,Math.sqrt(s*s+o*o)].concat(Object(c.a)(a.map(function(e){return n*e}))))}return Object(h.d)(r)}},{key:"componentDidMount",value:function(){var e=this.props,t=e.num_layers,a=e.hidden,n=e.width,r=e.height,i=e.scale;console.log("creating model");var o=this.createModel(5,t,a);this.setState({model:o});for(var c=this.refs.canvas.getContext("2d"),l=c.createImageData(n,r),s=this.createInput(n,r,[1,-1],i),d=o.predict(s).arraySync(),u=0;u<d.length;u++){for(var m=0;m<4;m++)l.data[4*u+m]=Math.round(255*d[u][m]);l.data[4*u+3]=255}c.putImageData(l,0,0)}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("canvas",{ref:"canvas",width:this.props.width,height:this.props.height}),r.a.createElement("br",null),r.a.createElement(f,{artist:"Axel Demborg",year:"2019",material:"Digital render, programming, mixed languages",name:"Art of a Machine"}))}}]),t}(r.a.Component);var g=function(){return r.a.createElement("div",null,r.a.createElement("h1",null,"CPPN.js"),r.a.createElement("p",null,"Playing with ",r.a.createElement("a",{href:v}," CPPNs ")," and ",r.a.createElement("a",{href:p},"tf.js")," during hackathon"),r.a.createElement(b,{width:256,height:256,scale:8}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(34),a(35);o.a.render(r.a.createElement(g,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}],[[16,1,2]]]);
//# sourceMappingURL=main.5c70d4d5.chunk.js.map