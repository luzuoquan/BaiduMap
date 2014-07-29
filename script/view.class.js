(function(){
	var view = function( obj ){
		this.pageCount = 3; //每页展示数量
		this.oMap = null //BMap对象
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
		loadData:function(originData,index){
			var that = this,
				index = index || 0,
				dataCon = document.getElementById( 'datalist' ),
				tmpData = originData[index];
			$( dataCon ).tmpl( tmpData ).appendTo('.data-container');
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
		pageNext: function(){

		},
		pagePrev: function(){

		},
		overlayPoly : function( obj, bool ){
			var that = this;
			if( obj ){
				var oLength = obj.length;
				for( var i = 0; i < oLength; i++ ){
					if( obj[i].points ){
						var oPoints = this._pointsToOverlay( obj[i].points ),
							pen     = new BMap.Polygon( oPoints, that.polygonOp );
						oMap.addOverlay( pen );			
					}
					if( obj[i].point ){

						var oPoint = this._pointToOverlay( obj[i].point ),
							mPen = new BMap.Marker( oPoint );
							oMap.addOverlay( mPen );
					}
				}
			}else{
				
			}
		},
		overlayMarker: function( obj ){
			var that = this;
			if( obj ){
				var mPen = new BMap.Marker( new BMap.Point( obj ) );

			}
		},
		_pointsToOverlay: function( obj ){
			var pointArray     =   [],
				points         =   obj.split( '|' ),
				pointsLength   =   points.length;
			for( var t = 0; t < pointsLength; t++ ){
				var str = points[t].split(',');
				pointArray.push( new BMap.Point( str[ 0 ], str[ 1 ] ) );		
			}
			return pointArray;
		},
		_pointToOverlay: function( obj ){
			var	str = obj.split( ',' ),
			 	tmpPoint = new BMap.Point( str[ 0 ], str[ 1 ] );
			return tmpPoint;
		},
		initMap : function( obj ){
			var that = this;
			oMap = new BMap.Map( that.mapConfig.defaultMapId );
			oMap.setMapType( that.mapConfig.defaultMapType );
			oMap.centerAndZoom( that.mapConfig.defaultPoints, that.mapConfig.defaultZoom );
			oMap.enableScrollWheelZoom();
			oMap.addControl( new BMap.NavigationControl() );
			oMap.enableKeyboard();
			that.overlayPoly( obj, true );
			that.overlayMarker( obj,true );

		}
	};
	window.View = view;
})()