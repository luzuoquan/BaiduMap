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
			var totalData = '';
			totalData = view.pageList( data.d );
			view.loadData(totalData);
			view.initMap( data.d );
			console.log(totalNum.length)
		}
	})
	
})( config, jQuery, View, Control )