(function( c ){
	var control = function(){
		
	};
	control.prototype = {
		cOverlay : function( obj,bool ){
			if( bool ){ //初始化地图时的描点
				var pen = new BMap.Polygon(  );
			}else{ //修改的时的描点

			}
			
		}
	}
	window.Control = control;
})( config )