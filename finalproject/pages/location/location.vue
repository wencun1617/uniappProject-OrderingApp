<template>
	<view>
		<adderss-list v-show="!isShow"></adderss-list>
		<map id="map1" style="width: 100%; height: 460px;margin-top: 15px;" :latitude="latitude" :longitude="longitude" 
		 :markers="covers"  v-show="isShow"/>
	</view>
</template>

<script>
	import adderssList from '@/components/address-list/address-list.vue'
	export default {
		data() {
			return {
				isShow: false,
				latitude: '',
				longitude: '',
				covers: [{
					id: 1 ,//marker点击事件回调会返回此id。建议为每个marker设置上Number类型id，保证更新marker时有更好的性能
					latitude:null,
					longitude:null,
					iconPath: '/static/picture/profile/Mark.png',
					width: 36,
					height: 36,
					callout: {content: '我的位置',display: 'BYCLICK',fontSize:8,bgColor: "#afd2ff",borderRadius:4,textAlign:'center'}
				}]
			}
		},
		components: {
			adderssList
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
					
					let mapContext = uni.createMapContext("map1", this) //创建并返回 map 上下文 mapContext 对象
					let map = mapContext.$getAppMap() //获取 原生地图对象
					map.onclick =  point => {
						
						map.clearOverlays();
						let pt = new plus.maps.Point(this.longitude,this.latitude); // 当前位置坐标，检索的中心点坐标
						let marker1 = new plus.maps.Marker(pt);
						
						marker1.setIcon("/static/picture/profile/Mark.png");
						map.addOverlay(marker1);
						
						plus.maps.Map.reverseGeocode(point,{},function(event){ //反向地理编码
								let address = event.address;  // 转换后的地理位置
								console.log(address);
		
								let marker = new plus.maps.Marker(point);
								marker.setIcon("/static/picture/profile/MiniMarks.png");
								let bubble = new plus.maps.Bubble(address,true); //设置气泡内容.默认弹出
								marker.setBubble(bubble);
								map.addOverlay(marker); //向地图中添加覆盖物
								
							},function(e){
								console.log("Failed:"+JSON.stringify(e))
							});
					}
				}
			})
		},
		//页面生命周期 监听原生标题栏按钮点击事件
		onNavigationBarButtonTap(e) {
			if (e.index = 1) {
				this.isShow = !this.isShow
			}
		}
	}
</script>

<style>

</style>
