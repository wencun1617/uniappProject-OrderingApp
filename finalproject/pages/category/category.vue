<template>
	<view>
		<view class="search">
			搜索周边店铺，美食 ...
		</view>
		<map id="map0" style="width: 100%; height: 460px;" :latitude="latitude" :longitude="longitude" :markers="covers" />
		 <uni-fab
		            :pattern="pattern"
		            :content="content"
		            horizontal="left"
		            vertical="bottom"
		            direction="horizontal"
		            @trigger="trigger"
		        ></uni-fab>
	</view>
</template>
<script>
	import uniFab from '@/components/uni-fab/uni-fab.vue';
	export default {
		data() {
			return {
				latitude: '',
				longitude: '',
				covers: [{
					id: 1, //marker点击事件回调会返回此id。建议为每个marker设置上Number类型id，保证更新marker时有更好的性能
					latitude: null,
					longitude: null,
					iconPath: '../../static/picture/profile/Mark.png',
					width: 36,
					height: 36,
					callout: {
						content: '我的位置',
						display: 'BYCLICK',
						fontSize: 8,
						bgColor: "#afd2ff",
						borderRadius: 4,
						textAlign: 'center'
					}
				}],
				resName: [],
				searchText: "",
				typeIndex: 3,//判断是路线还是标记
				pattern: {
					backgroundColor:"#ffffff",
					color: "#3c3e49",
					selectedColor: "#75aaff",
					buttonColor: "#2e93d1"
				},
				content: [
					{
						iconPath: '../../static/picture/category/walk.png',
						selectedIconPath:'../../static/picture/category/walk_active.png',
						text: '步行',
						active:false
						
					},
					{
						iconPath: '../../static/picture/category/cart.png',
						selectedIconPath:'../../static/picture/category/cart_active.png',
						text: '驾车',
						active: false
						
					},
					{
						iconPath: '../../static/picture/category/bus.png',
						selectedIconPath:'../../static/picture/category/bus_active.png',
						text: '公交',	
						active: false
					},
					{
						iconPath: '../../static/picture/category/nearby.png',
						selectedIconPath:'../../static/picture/category/nearby_active.png',
						text: '搜索周边',
						active:true	
					}
				]
			}
		},
		components: {
		    uniFab
		},
		methods: {
			//没有检索结果弹窗
			showToastNo () {
				uni.showToast({
					icon: 'none',
					title: "没有检索到结果",
					duration: 2000,
					mask: true //显示透明蒙层，防止触摸穿透
				})
			},
			showTaostFault () {
				uni.showToast({
					icon: 'none',
					title: "检索失败",
					duration: 2000,
					mask: true //显示透明蒙层，防止触摸穿透
				})
			},	
			// 3将检索到结果作为标点添加到地图中 0 1 2 
			mapSearch(map) {
				map.setTraffic( false );//关闭交通信息图层
				
				//清空之前的覆盖物,并标记当前位置
				map.clearOverlays();
				let pt = new plus.maps.Point(this.longitude,this.latitude); // 当前位置坐标，检索的中心点坐标
				let marker1 = new plus.maps.Marker(pt);
				marker1.setIcon("/static/picture/profile/Mark.png");
				map.addOverlay(marker1);
				
				let searchObj = new plus.maps.Search(map) //通过原生地图对象创建地图检索对象
				
				searchObj.onPoiSearchComplete = (state, result) => { //兴趣点检索完成事件
					console.log("结果:",result,"数量:"+result.currentNumber)
					if (state == 0) {
						if (result.currentNumber <= 0) {
							this.showToastNo()
						}
						for (let i = 0; i < result.currentNumber; i++) {
							let pos = result.getPosition(i); //获取指定索引的检索结果
							//检索到的第一个兴趣点的坐标当做路线终点坐标
							switch(this.typeIndex) {
								case 0:
									this.walkingSearch(map,pt,pos.point)
									break;
								case 1:
									this.drivingSearch(map,pt,pos.point)
									break;
								case 2:
									this.transitSearch(map,pt,pos.point)
									break;
							}
							
							if(this.typeIndex == 3) { //3 搜索周边才要标记点
								let marker = new plus.maps.Marker(pos.point);
								
								marker.setIcon("/static/picture/profile/MiniMacks.png");//设置标点上显示的图标
								let bubble = new plus.maps.Bubble(pos.name); //设置气泡内容后，用户点击标点时弹出则弹出气泡
								marker.setBubble(bubble);
								map.addOverlay(marker); //向地图中添加覆盖物
							} else {
								return //只要标记检索到的第一个兴趣点的线路便可
							}

						}
					} else {
						this.showTaostFault()
					}
				}
				searchObj.poiSearchNearBy(this.searchText, pt, 1000) //周边检索 一公里
			},
			trigger(e) {
				this.content.forEach((value,index) => {
					if(index == e.index) {
						value.active = true
						this.typeIndex = index
					} else {
						value.active = false
					}
				})
			},
			//0步行路线检索
			walkingSearch(map,pt,point){
				//检索从当前位置 到最终地址的 步行路线
				let searchObj = new plus.maps.Search( map );
				
				searchObj.onRouteSearchComplete = ( state, result ) => { //线路检索完成事件
				console.log("步行线路",result)
					console.log("onRouteSearchComplete: "+state+" , "+result.routeNumber);
					if ( state == 0 ) {
						if ( result.routeNumber <= 0 ) {
							this.showToastNo()
						}
						for(let i=0; i<result.routeNumber; i++){
							map.addOverlay( result.getRoute( i ) );
						}
					} else {
						this.showTaostFault()
					}
				}
				searchObj.walkingSearch( pt, "", point, "" );
			},
			
			//1驾车路线检索
			drivingSearch (map,pt,point){
				map.setTraffic(true);
				// 检索从当前位置 到最终地址的 驾车线路
				let searchObj = new plus.maps.Search( map );
				
				searchObj.setDrivingPolicy(map.DRIVING_DIS_FIRST); //设置驾车路线检索策略 距离最短
				searchObj.onRouteSearchComplete = ( state, result ) => {
					console.log("onRouteSearchComplete: "+state+" , "+result.routeNumber);
					if ( state == 0 ) {
						if ( result.routeNumber <= 0 ) {
							this.showToastNo()
						}
						for(let i=0; i<result.routeNumber; i++){
							map.addOverlay( result.getRoute( i ) );
						}
					} else {
						this.showTaostFault()
					}
				}
				searchObj.drivingSearch( pt, "", point, "" );
			},
			
			//2公交路线检索
			transitSearch (map,pt,point){
				// 检索从当前位置 到最终地址的 公交线路
				let searchObj = new plus.maps.Search( map );
				
				searchObj.poiSearchInbounds(map.TRANSIT_TIME_FIRST); //设置公交路线检索策略 时间最短
				searchObj.onRouteSearchComplete = ( state, result ) => {
					console.log("onRouteSearchComplete: "+state+" , "+result.routeNumber);
					if ( state == 0 ) {
						if ( result.routeNumber <= 0 ) {
							this.showToastNo()
						}
						for(let i=0; i<result.routeNumber; i++){
							map.addOverlay( result.getRoute( i ) );
						}
					} else {
						this.showTaostFault()
					}
				}
				searchObj.transitSearch( pt, point, "" );
			}
		},
		mounted() {
			uni.getLocation({
				type: 'gcj02', //国测局坐标
				geocode: 'true', //解析地址信息
				success: (res) => {
					this.latitude = res.latitude
					this.longitude = res.longitude
					this.covers[0].latitude = res.latitude,
					this.covers[0].longitude = res.longitude
				}
			})
		},
		onNavigationBarSearchInputChanged(e) {
			this.searchText = e.text
		},
		onNavigationBarSearchInputConfirmed() {
			if (this.searchText != "") {
				let mapContext = uni.createMapContext("map0", this) //创建并返回 map 上下文 mapContext 对象
				let map = mapContext.$getAppMap() //获取 原生地图对象
				this.mapSearch(map) // 将检索到结果作为标点添加到地图中 0 1 2 选择线路标记	
			}
		}
	}
</script>

<style>
	.search {
		width: 100%;
		height: 30px;
		color: #f5d348;
		padding-left: 10px;
	}
</style>
