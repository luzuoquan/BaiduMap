var config = {
	initUrl :{
		getMapData : 'service/getData.php'
	},
};
(function( c, $, v, C ){
	var view = new v(),
		control = new C(),
		mapCon = document.getElementById( 'map-container' );

	//初始化地图
	//model.initMap( c.mapConfig );
	console.log( control.mapConfig );
	$.ajax({
		url: c.initUrl.getMapData,
		type: 'POST',
		dataType: 'json',
		data: { },
		error:function(){

		},
		success:function( data ){
			var totalNum = '';
			view.loadData( data.d );
			view.initMap( control.mapConfig );
			totalNum = view.pageList( data.d );
		}
	})
	
})( config, jQuery, View, Control )