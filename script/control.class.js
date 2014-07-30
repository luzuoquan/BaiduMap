(function(){
	var control = function(){
		this.fileBtn = document.getElementById('filebtn'); //触发input[type=file]的按钮
		this.file = document.getElementById('fileimg'); //input[type=file]
	};
	control.prototype = {
		fileClick: function(){
			var that = this;
			$(that.fileBtn).on('click', function(event) {
				that.file.click();
			});
		},
		mapFixed: function(params){
			if(!params) return;
			var fixedMap = document.getElementById('fixedmap');
			$(fixedMap).on('click', function(event) {
				console.log(123);
				params.disableScrollWheelZoom();
				params.disableDoubleClickZoom();
				params.disableKeyboard();
			});
		},
		initCon: function(obj){
			var cHandle = obj;
			console.log(obj);
			this.mapFixed(cHandle);
		}
	}
	window.Control = control;
})()