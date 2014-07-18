var config = {
	initUrl :{
		getMapData : 'service/getData.php'
	},
};
(function( con, $, V, C ){
	var view = new V(),
		control = new C(),
		mapCon = document.getElementById( 'map-container' );

	//初始化地图
	//model.initMap( c.mapConfig );
	$.ajax({
		url: con.initUrl.getMapData,
		type: 'POST',
		dataType: 'json',
		data: { },
		error:function(){

		},
		success:function( data ){
			var totalNum = '';
			view.loadData( data.d );
			view.initMap( data.d );
			totalNum = view.pageList( data.d );
		}
	})
	
})( config, jQuery, View, Control )