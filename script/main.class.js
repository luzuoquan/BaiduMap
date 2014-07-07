var config = {
	initUrl :{
		getMapData : 'service/getData.php'
	},
	/*mapConfig :{
		defaultCity: '重庆',
		defaultZoom: 12,
		defaultMapType: BMAP_HYBRID_MAP,
		defaultMapId: 'map-container',
		defaultPoints: new BMap.Point(106.524203,29.516936 ),
		maxZoom : 17,
		minZoom : 9
	}*/
};
(function( c, $, m ){
	var model = new Model(),
		mapCon = document.getElementById( 'map-container' );

	//初始化地图
	//model.initMap( c.mapConfig );
	
	$.ajax({
		url: c.initUrl.getMapData,
		type: 'POST',
		dataType: 'json',
		data: { },
		error:function(){

		},
		success:function( data ){
			model.loadData( data.d );
			model.pageList( data.d );
		}
	})
	
})( config, jQuery, Model )