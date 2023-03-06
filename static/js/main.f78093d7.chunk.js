(window.webpackJsonpcppn=window.webpackJsonpcppn||[]).push([[0],[,,,,,,,,,,,,,,,,function(e,t,a){e.exports=a(36)},,,,,function(e,t,a){},function(e,t,a){},,,,,,function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t){},function(e,t,a){e.exports=a.p+"static/media/Roboto-Regular.f36638c2.ttf"},function(e,t,a){e.exports=a.p+"static/media/AlfaSlabOne-Regular.7676beb2.ttf"},function(e,t,a){"use strict";a.r(t);var n=a(1),i=a.n(n),r=a(14),o=a.n(r),c=(a(21),a(15)),s=a(7),l=a(8),d=a(10),u=a(9),h=a(11),m=(a(22),a(2)),p="https://www.tensorflow.org/js",v="https://en.wikipedia.org/wiki/Compositional_pattern-producing_network",f=function(e){function t(){return Object(s.a)(this,t),Object(d.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this.props,t=e.artist,a=e.year,n=e.name,r=e.material;return i.a.createElement("div",{className:"card"},i.a.createElement("span",{className:"artist"},t)," ",i.a.createElement("br",null),i.a.createElement("span",{className:"name"},n)," ",i.a.createElement("span",{className:"year"},a)," ",i.a.createElement("br",null),i.a.createElement("span",{className:"material"},r))}}]),t}(i.a.Component),w=function(e){function t(e){var a;Object(s.a)(this,t),(a=Object(d.a)(this,Object(u.a)(t).call(this,e))).handleOrientaion=function(e){var t=e.beta/90,n=e.gamma/90;a.setState({latent:[t,n]},a.updateCanvas),console.log("latent = [".concat(t,";").concat(n,"]"))},a.handleClick=function(e){var t=e.currentTarget.getBoundingClientRect(),n=e.nativeEvent.offsetX/t.width*2-1,i=e.nativeEvent.offsetY/t.height*2-1;a.setState({latent:[n,i]},a.updateCanvas),console.log("latent = [".concat(n,";").concat(i,"]"))};var n=window.location.hash,i=-1,r=-1;if(n){console.log(n);var o=JSON.parse(window.location.hash.slice(1));i=o[0],r=o[1]}return a.state={model:null,latent:[i,r]},a}return Object(h.a)(t,e),Object(l.a)(t,[{key:"createModel",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:2,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:8;console.time("createModel");var n=window.location.pathname.slice(1);if(""===n){var i=crypto.randomUUID();window.location.pathname=i}Math.seedrandom(n);var r=Object(m.c)();r.add(m.b.dense({inputShape:[e],units:a,activation:"tanh",kernelInitializer:m.a.randomNormal({stddev:1})}));for(var o=0;o<t-2;o++)r.add(m.b.dense({units:a,activation:"tanh",kernelInitializer:m.a.randomNormal({stddev:1})}));return r.add(m.b.dense({units:4,activation:"sigmoid",kernelInitializer:m.a.randomNormal({stddev:1})})),console.timeEnd("createModel"),r}},{key:"createInput",value:function(e,t,a,n){console.time("createInput");for(var i=[],r=0;r<t;r++)for(var o=n*(2*r/t-1),s=0;s<e;s++){var l=n*(2*s/e-1);i.push([l,o,Math.sqrt(l*l+o*o)].concat(Object(c.a)(a.map(function(e){return n*e}))))}return console.timeEnd("createInput"),Object(m.d)(i)}},{key:"updateCanvas",value:function(){var e=this.props,t=e.width,a=e.height,n=e.scale,i=this.state,r=i.model,o=i.latent,c=this.refs.canvas.getContext("2d"),s=c.createImageData(t,a),l=this.createInput(t,a,o,n);window.location.hash=JSON.stringify(o),console.time("predict");var d=r.predict(l,{batchSize:2048}).arraySync();console.timeEnd("predict"),console.time("paint");for(var u=0;u<d.length;u++){for(var h=0;h<4;h++)s.data[4*u+h]=Math.round(255*d[u][h]);s.data[4*u+3]=255}c.putImageData(s,0,0),console.timeEnd("paint")}},{key:"componentDidMount",value:function(){var e=this.props,t=e.num_layers,a=e.hidden,n=this.createModel(5,t,a);this.setState({model:n},this.updateCanvas),window.addEventListener("deviceorientation",this.handleOrientaion,!0)}},{key:"render",value:function(){return i.a.createElement("canvas",{ref:"canvas",width:this.props.width,height:this.props.height,onMouseMove:this.handleClick,className:this.props.className})}}]),t}(i.a.Component);var g=function(){return new URLSearchParams(window.location.search).get("fullscreen")?i.a.createElement(w,{width:256,height:256,scale:8,num_layers:6,units_per_layer:8,className:"fullscreen"}):i.a.createElement("div",null,i.a.createElement("h1",null,"CPPN.js"),i.a.createElement("p",null,"Playing with ",i.a.createElement("a",{href:v}," CPPNs ")," and ",i.a.createElement("a",{href:p},"tf.js")," during hackathon"),i.a.createElement(w,{width:256,height:256,scale:8,num_layers:6,units_per_layer:8,className:"display"}),i.a.createElement(f,{artist:"Axel Demborg",year:"2019",material:"Digital render, programming, mixed languages",name:"Art of a Machine"}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(34),a(35);o.a.render(i.a.createElement(g,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}],[[16,1,2]]]);
//# sourceMappingURL=main.f78093d7.chunk.js.map