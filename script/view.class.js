(function(){
	var view = function( obj ){
		this.pageCount = 3; //每页展示数量
		this.oMap = null //BMap对象
		this.DataSet = obj || null; //
		this.currentPage = 1; // 当前显示页码
		this.totalPage = $('#totalpage'); //一共多少页码
		this.isPaint = false; //是否开启描点模式
		this.prevPoly = ''; //上一次被查看的polygon
		this.singleDetail = document.getElementById('single-detail'); //form
		this.selfList = document.getElementById('self-list'); //列表
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
		fileClick: function(){

			var that = this,
				fileBtn = document.getElementById('filebtn'), //触发input[type=file]的按钮
				file = document.getElementById('fileimg'); //input[type=file]

			$(fileBtn).on('click', function(event) {

				file.click();

			});
		},
		backToList: function(){

			var that = this,
				returnList = document.getElementById('returnlist'); //返回

			$(returnList).on('click', function(event) {

				if(that.prevPoly) that.oMap.removeOverlay(that.prevPoly);

				that.oMap.reset();

				that.selfList.style.display = 'block';

				that.singleDetail.style.display = 'none';
			});
		},
		checkMap: function(){

			var that = this;

			$('body').on('click', '.maplook', function(event) {

				var dataCon = $(this).parent('div'),

                    tmpPoint = dataCon.attr('data-point'),

					tmpPoints = dataCon.attr('data-points');

				that.selfList.style.display = 'none';
			
				that.singleDetail.style.display = 'block';

				if(!tmpPoints){

					if(!tmpPoint) return;

					that.oMap.setCenter( new BMap.Point(tmpPoint.split(',')[0], tmpPoint.split(',')[1]) );

				}else{

					var tmpPos = that._pointsToOverlay( tmpPoints ),

						pen = new BMap.Polygon( tmpPos, that.polygonHOp );

						if( that.prevPoly ) that.oMap.removeOverlay( that.prevPoly );

						that.oMap.setCenter( that.oMap.getViewport(pen.getPath()).center );

						that.oMap.addOverlay( pen );

						that.prevPoly = pen;

				}	
			});
		},
		editMap: function(){

			var that = this;

			$('body').on('click', '.mapedit', function(event) {

				event.preventDefault();
			});

		},
		paintMarker: function(){

		},
		mapFixed: function(params){

			var  that = this;

			if(!params) return;

			var fixedMap = document.getElementById('fixedmap');

			$(fixedMap).on('click', function(event) {

				that.isPaint = true; //描点模式开启

				params.disableScrollWheelZoom();

				params.disableDoubleClickZoom();

				params.disableKeyboard();

				params.disableDragging();

				event.preventDefault();
			});
		},
		mapLift: function(params){

			if(!params) return;

			var liftMap = document.getElementById('liftmap'),

				that = this;

			$(liftMap).on('click', function(event) {

				that.isPaint = false; //关闭描点模式

				params.enableDoubleClickZoom()

				params.enableDragging();

				params.enableKeyboard();

				params.enableScrollWheelZoom();

				event.preventDefault();
			});

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

			that.mapFixed( that.oMap );

			that.mapLift( that.oMap );

			that.checkMap();

			that.backToList();
		}
	};
	window.View = view;
})()