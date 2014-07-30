var config = {
	initUrl :{
		getMapData : 'service/getData.php'
	},
};
(function( con, $, V, C, M){
	var view = new V(),
		control = new C(),
		model = new M(),
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
			view.pageNext(totalData);
			view.pagePrev(totalData);
			view.initMap( data.d );
			control.fileClick();
			console.log(view);
			//control.initCon(view.oMap);
		}
	})
	
})( config, jQuery, View, Control, Model)