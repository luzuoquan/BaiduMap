(function(){
	var view = function( obj ){
		this.pageCount = 2; //每页展示数量
		this.map = null //BMap对象
		this.DataSet = obj || null; //
		this.mapConfig = {
			defaultCity: '重庆',
			defaultZoom: 12,
			defaultMapType: BMAP_HYBRID_MAP,
			defaultMapId: 'map-container',
			defaultPoints: new BMap.Point(106.524203,29.516936 ),
			maxZoom : 17,
			minZoom : 9
		};
		this.polygonOp ={ 
			strokeColor: 'red',    //边线颜色
			fillColor: 'yellow',  //填充颜色
			strokeWeight: 2,    //边线的宽度
			strokeOpacity: 0.7,  //边线透明度
			fillOpacity: 0.3,    //填充的透明度
			strokeStyle: 'solid'   //边线的样式
		};
		this.polygonHOp = {
			strokeColor: 'red',    //边线颜色
			fillColor: 'yellow',  //填充颜色
			strokeWeight: 3,    //边线的宽度
			strokeOpacity: 0.7,  //边线透明度
			fillOpacity: 0.5,    //填充的透明度
			strokeStyle: 'solid'   //边线的样式
		}
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
		overlayPoly : function( obj,bool,map ){
			if( bool ){ //初始化地图时的描点
				var pen = new BMap.Polygon( obj, this.polygonOp );
				map.addOverlay( pen );
			}else{ //修改的时的描点	

			}
		},
		initMap : function( obj ){
			var that = this,
				oMap = new BMap.Map( obj.defaultMapId );
				oMap.setMapType( obj.defaultMapType );
				oMap.centerAndZoom( obj.defaultPoints, obj.defaultZoom );
				oMap.enableScrollWheelZoom();
				oMap.addControl( new BMap.NavigationControl() );
				oMap.enableKeyboard();
			that.overlayPoly( that.polygonOp,true,oMap);
		}
	};
	window.View = view;
})()