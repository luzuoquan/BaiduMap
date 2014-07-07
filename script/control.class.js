(function(  ){
	var control = function(){
		this.mapConfig = {
			defaultCity: '重庆',
			defaultZoom: 12,
			defaultMapType: BMAP_HYBRID_MAP,
			defaultMapId: 'map-container',
			defaultPoints: new BMap.Point(106.524203,29.516936 ),
			maxZoom : 17,
			minZoom : 9
		}
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
})(  )