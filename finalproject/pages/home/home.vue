<template>
	<view>
		<!-- 轮播 -->
		<swiper autoplay="true">
			<swiper-item v-for="(item,index) in imgs" :key="index">
				<!-- 媒体组件 -->
				<image :src="item" style="width: 100%; height: 160px;"></image>
			</swiper-item>
		</swiper>
		<!-- 宫格 -->
		<view>
			<uni-grid :column="5" :show-border="false" class="grid">
				<uni-grid-item v-for="(item,index) in iconfonts" :key="index">
					<view class="svg-icon">
						<image :src="item.icon"></image>
					</view>
					<text class="discribe">{{item.name}}</text>
				</uni-grid-item>
			</uni-grid>
		</view>
		<!-- Tab标签 -->
		<view class="menu-tab" :style="{top:topHeight}">
			<!-- 手指触碰后马上离开 -->
			<text v-for="(item,index) in menuList" :key="index" @tap="menuClick(index)" :class="{active: currentTab === index}">
				{{item}}
			</text>
		</view>
		<!-- 展示出售商品  -->
		<goods :goodsData="currentGoodList"></goods>
	</view>
</template>

<script>
	//宫格
	import uniGrid from "@/components/uni-grid/uni-grid.vue"
	import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue"

	import goods from "@/components/goods/goods.vue"
	import {
		mapGetters
	} from 'vuex'
	import {apiVariable} from '@/common/apiVariable'
	
	export default {
		data() {
			return {
				imgs: [
					"../../static/picture/swipe/1.jpg",
					"../../static/picture/swipe/2.jpg",
					"../../static/picture/swipe/3.jpg",
					"../../static/picture/swipe/4.jpg",
				],
				iconfonts: [{
						icon: '../../static/picture/iconfont/food.png',
						name: '美食'
					},
					{
						icon: '../../static/picture/iconfont/convenience.png',
						name: '商店便利'
					},
					{
						icon: '../../static/picture/iconfont/vegetables.png',
						name: '蔬菜水果'
					},
					{
						icon: '../../static/picture/iconfont/noodles.png',
						name: '面条'
					},
					{
						icon: '../../static/picture/iconfont/hamburger.png',
						name: '汉堡披萨'
					},
					{
						icon: '../../static/picture/iconfont/malatang.png',
						name: '麻辣烫'
					},
					{
						icon: '../../static/picture/iconfont/barbecue.png',
						name: '烧烤'
					},
					{
						icon: '../../static/picture/iconfont/yabo.png',
						name: '鸭脖卤味'
					},
					{
						icon: '../../static/picture/iconfont/zhaji.png',
						name: '炸鸡'
					},
					{
						icon: '../../static/picture/iconfont/baozi.png',
						name: '包子粥店'
					},
				],
				menuList: [
					"全部商家", "满减优惠", "下单返红包", "距离最近"
				],
				currentTab: 0,
				topHeight: "0px", //吸顶高度
				goodslist: { //商品数据
					'all': {
						page: 1, //JSON Server里 当前要去请求第几页
						list: []
					},
					'preferential': {
						page: 1,
						list: []
					},
					'return': {
						page: 1,
						list: []
					},
					'distance': {
						page: 1,
						list: []
					}
				},
				pagesize: 6, //  JSON Server里 请求的每页大小
				currentType: "all" ,//Tab标签当前展示的商品类型
				apiVariable
			}
		},
		computed: {
			...mapGetters(['productNum']),
			currentGoodList() { //要展示的是哪种类型的商品数据
				return this.goodslist[this.currentType].list
			}
		},
		watch: { //侦听商品加入购物车,使得商品数量的变化时徽标也改变
			productNum(newNum, oldNum) {
				this.setBarBadge()
			}
		},
		methods: {
			menuClick(e) {
				this.currentTab = e
				this.getProduct(e)
			},
			setBarBadge() {
				if (this.productNum != 0) {
					uni.setTabBarBadge({ //为 tabBar 某一项的右上角添加文本
						index: 2,
						text: `${this.productNum}`
					})
				}
			},
			getProduct(e) {
				let param = {
					_limit: this.pagesize,
				}
				switch (e) {
					case 0:
						this.currentType = "all"
						param = {...param, _page:this.goodslist[this.currentType].page }
						break;
					case 1:
						this.currentType = "preferential"
						param = {...param, _page:this.goodslist[this.currentType].page, category:this.currentType }
						break;
					case 2:
						this.currentType = "return"
						param = {...param, _page:this.goodslist[this.currentType].page, category:this.currentType }
						break;
					case 3:
						this.currentType = "distance"
						param = {...param, _page:this.goodslist[this.currentType].page, category:this.currentType }
						break;
				}
				let _that = this
				uni.request({ //发起请求
					// url: 'http://localhost:8080/products',
					url: _that.apiVariable + '/products' ,
					data: param,//请求参数
					success: (res) => {
						if (res.data.data.length == 0) { //取得数据长度为0，说明数据不够了
							return
						}
						this.goodslist[this.currentType].page++
						this.goodslist[this.currentType].list.push(...res.data.data)
					},
					fail:(res) => {
						console.log("错误了",res)
					}
				})
			}
		},
		components: {
			uniGrid,
			uniGridItem,
			goods
		},
		onLoad() { //页面生命周期 监听页面加载
			const res = uni.getSystemInfoSync(); //API 获取系统信息
			this.topHeight = `${res.windowTop}px` // windowTop 可使用窗口的顶部位置
			this.getProduct(0)
		},
		onShow(){ //当 uni-app 启动，或从后台进入前台显示
			this.setBarBadge();
		},
		onReachBottom() { //页面滚动到底部的事件（不是scroll-view滚到底），常用于下拉下一页数据
			this.getProduct(this.currentTab)
		},
		//页面生命周期 监听原生标题栏按钮点击事件
		onNavigationBarButtonTap(e) {
			if(e.index == 0) {
				uni.navigateTo({// 只能打开非 tabBar 页面
					url:"/pages/location/location"
				})
			}
			if(e.index == 1) {
				uni.scanCode({//调起客户端扫码界面，扫码成功后返回对应的结果
				    success: function (res) {
				        console.log('条码类型：' + res.scanType);
				        console.log('条码内容：' + res.result);
						plus.runtime.openURL(res.result)
						//调用第三方程序打开指定的URL
				    }
				});
			}
		}
	}
</script>

<style scoped>
	.grid {
		margin-top: 8px;
	}

	.svg-icon {
		display: flex;
		text-align: center;
		justify-content: center;
	}

    .svg-icon image {
		width: 64rpx;
		height: 64rpx;
	}

	.discribe {
		font-size: 14px;
		margin-top: 6px;
		text-align: center;
	}

	.menu-tab {
		/* 粘性布局 */
		position: sticky;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		background: "#F5F5F5";
		z-index: 999;
		line-height: 32px;
		font-size: 14px;
		background-color: #C0C0C0;
	}

	.active {
		color: #007AFF;
		border-bottom: 2px solid #DD524D;
		font-size: 17px;
		line-height: 32px;
	}
</style>
