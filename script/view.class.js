(function(){
	var view = function(){
		this.pageCount = 2; //每页展示数量
	};
	view.prototype = {
		loadData:function( data ){
			var dataCon = document.getElementById( 'datalist' );
			$( dataCon ).tmpl( data ).appendTo('.data-container');
		},
		pageList : function( obj ){
			var pageCount = this.pageCount,
				pageArray = [],
				x = 0;
			for( var i = 0, j; j = obj[ i ]; i++ ){
				if( i % pageCount == 0 ){
					pageArray[ x ] = [];
					x++;
				}
				pageArray[ x - 1 ].push( j );
			}
			return pageArray;
		},
		initMap : function( obj ){
			var map = new BMap.Map( obj.defaultMapId );
				map.setMapType( obj.defaultMapType );
				map.centerAndZoom( obj.defaultPoints, obj.defaultZoom );
				map.enableScrollWheelZoom();
				map.addControl( new BMap.NavigationControl() );
				map.enableKeyboard();
		}
	};
	window.View = view;
})()