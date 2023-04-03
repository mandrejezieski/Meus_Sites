String.prototype.textDimensions = function(opts={}) {
	var dfts = {
		fontFamily: 'Arial',
		fontSize: 'medium',
		fontStyle: 'normal',
		fontWeight: 'normal',
		lineHeight: 'normal',
		textTransform: 'none',
		letterSpacing: 'normal',
		singleLine: true
	};

	var div = document.createElement('div');
	div.innerHTML = this;
	div.style.position = 'absolute';
	div.style.left = '-10000px';

	for(var k in dfts){
		if(opts.hasOwnProperty(k)) {
			div.style[k] = opts[k];
		} else {
			div.style[k] = dfts[k];
		}
	}

	if(opts.hasOwnProperty('singleLine')) {
		var sl = opts.singleLine;
		div.style.whiteSpace = (sl === true? 'nowrap': 'normal');
	} else {
		div.style.whiteSpace = (dfts.singleLine === true? 'nowrap': 'normal');
	}


	document.body.appendChild(div);

	var h = div.offsetHeight;
	var w = div.offsetWidth;

	var size = {
		height: h,
		width: w
	};

	document.body.removeChild(div);

	return size;
};