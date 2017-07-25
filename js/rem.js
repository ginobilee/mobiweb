function setRem(){
	let dpr, rem, scale;
	let docEl = document.documentElement;
	let fontEl = document.createElement('style');
	let metaEl = document.querySelector('meta[name="viewport"]');

	dpr = window.devicePixelRatio || 1;
	rem = docEl.clientWidth * dpr / 10;
	//rem = 750 * dpr / 10;
	scale = 1 / dpr;


	// 设置viewport，进行缩放，达到高清效果
	metaEl.setAttribute('content', 'width=device-width,initial-scale=' + 0.5 + ',maximum-scale=' + 0.5 + ', minimum-scale=' + 0.5 + ',user-scalable=no');

	console.log(docEl.clientWidth)
	// 设置data-dpr属性，留作的css hack之用
	docEl.setAttribute('data-dpr', dpr);

	// 动态写入样式
	docEl.firstElementChild.appendChild(fontEl);
	fontEl.innerHTML = 'html{font-size:' + rem + 'px!important;}';

	// 给js调用的，某一dpr下rem和px之间的转换函数
	window.rem2px = function(v) {
	    v = parseFloat(v);
	    return v * rem;
	};
	window.px2rem = function(v) {
	    v = parseFloat(v);
	    return v / rem;
	};

	window.dpr = dpr;
	window.rem = rem;
	console.log(metaEl)
}
setRem()