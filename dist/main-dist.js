(function(){
	var control = function(){
		this.fileBtn = document.getElementById('filebtn'); //触发input[type=file]的按钮
		this.file = document.getElementById('fileimg'); //input[type=file]
	};
	control.prototype = {
		fileClick: function(){
			var that = this;
			$(that.fileBtn).on('click', function(event) {
				that.file.click();
			});
		},
		mapFixed: function(params){
			if(!params) return;
			var fixedMap = document.getElementById('fixedmap');
			$(fixedMap).on('click', function(event) {
				console.log(123);
				params.disableScrollWheelZoom();
				params.disableDoubleClickZoom();
				params.disableKeyboard();
			});
		},
		initCon: function(obj){
			var cHandle = obj;
			console.log(obj);
			this.mapFixed(cHandle);
		}
	}
	window.Control = control;
})();var config = {
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
	
})( config, jQuery, View, Control, Model);( function(){
	var model = function(){
		this.a = 123;
	};
	model.prototype = {
		getModelData:function(){
			
		},
		setModelData:function( ){
			
		}
	}
	window.Model = model;   
} )();(function(){
	var view = function( obj ){
		this.pageCount = 3; //每页展示数量
		this.oMap = null //BMap对象
		this.DataSet = obj || null; //
		this.currentPage = 1; // 当前显示页码
		this.totalPage = $('#totalpage'); //一共多少页码
		this.mapConfig = {
			defaultCity: '重庆',
			defaultZoom: 9,
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

			$('.data-container').empty();

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

			this.totalPage.html(pageArray.length);

			return pageArray;
		},
		pageNext: function(params){

			var nextBtn = $('#mapnext'),
				that = this;

			nextBtn.on('click', function(event) {

				if(that.currentPage == that.totalPage.html()){

					nextBtn.addClass('disabled');

					return;
				}else{

					nextBtn.removeClass('disabled');

					$('#mapprev').removeClass('disabled');

					that.currentPage++;

					$('#current').html(that.currentPage);

					that.loadData(params,that.currentPage - 1);
				}
			});
		},
		pagePrev: function(params){

			var prevBtn =$('#mapprev'),
				that = this;
			prevBtn.on('click', function(event) {

				if(that.currentPage == 1){

					prevBtn.addClass('disabled');

					return;
				}else{
					prevBtn.removeClass('disabled');

					$('#mapnext').removeClass('disabled');

					that.currentPage--;

					$('#current').html(that.currentPage);

					that.loadData(params,that.currentPage - 1);
				}
			});
		},
		overlayPoly : function( obj, bool ){

			var that = this;

			if( obj ){

				var oLength = obj.length;

				for( var i = 0; i < oLength; i++ ){

					if( obj[i].points ){

						var oPoints = this._pointsToOverlay( obj[i].points ),

							pen     = new BMap.Polygon( oPoints, that.polygonOp );

						that.oMap.addOverlay( pen );			
					}
					if( obj[i].point ){

						var oPoint = this._pointToOverlay( obj[i].point ),

							mPen = new BMap.Marker( oPoint );

						that.oMap.addOverlay( mPen );
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
			var that = this,
				mapPrev = $('#mapprev'), //上一页
				mapNext = $('#mapnext'); //下一页
			that.oMap = new BMap.Map( that.mapConfig.defaultMapId );
			that.oMap.setMapType( that.mapConfig.defaultMapType );
			that.oMap.centerAndZoom( that.mapConfig.defaultPoints, that.mapConfig.defaultZoom );
			that.oMap.enableScrollWheelZoom();
			that.oMap.addControl( new BMap.NavigationControl() );
			that.oMap.enableKeyboard();
			that.overlayPoly( obj, true );
			that.overlayMarker( obj,true );
		}
	};
	window.View = view;
})()