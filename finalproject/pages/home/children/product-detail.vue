<template>
	<view>
		<view class="img">
			<image :src="product.pic" :style="{width: imgWidth}"></image>
		</view>
		<view class="exact">
			<view class="name">{{product.name}}</view>
			<view class="desc-tag">
				<view class="describe">{{product.desc}}</view>
				<view class="tag">
					<text>{{showTag}}</text>
				</view>
			</view>
			<view class=" context">
				<text class="price">¥{{product.price}}</text>
				<text class="monad">/{{product.unit}}</text>
			</view>
		</view>
		<view class="tab-buttom">
			<view class="svg-icon">
				<view>
					<image src="../../../static/picture/iconfont/shop.png"></image>
				</view>
				<view class="discribe">店铺</view>
			</view>
			<view class="svg-icon">
				<view>
					<image src="../../../static/picture/iconfont/server.png"></image>
				</view>
				<view class="discribe">联系商家</view>
			</view>
			<view class="svg-icon">
				<view>
					<image src="../../../static/picture/iconfont/collection.png"></image>
				</view>
				<view class="discribe">收藏</view>
			</view>
			<view class="order" @tap="addToCart(product)">
				加入订单
			</view>
		</view>
		<!-- ShareSheet 分享面板 -->
		<share-sheet v-show="showShare" @cancle-share="cancleHandler" @wx-share="wxHandler"
		 @wxfriend-share="wxfriendHandler" @qq-share="QQHandle">
		</share-sheet>
	</view>
</template>

<script>
	import {
		mapActions
	} from "vuex"
	import {apiVariable} from '@/common/apiVariable'

	import ShareSheet from '@/components/share-sheet/share-sheet.vue'
	export default {
		data() {
			return {
				product: {},
				imgWidth: "",
				showShare: false, //分享面板
				url: '',
				apiVariable
			}
		},
		components: {
			ShareSheet
		},
		methods: {
			...mapActions(["asyncAddToCart"]),
			addToCart(e) {
				this.asyncAddToCart(e)
				uni.showToast({ //显示消息提示框
					icon: "success", //显示成功图标
					title: '添加成功',
					duration: 1000,
					mask: true //显示透明蒙层，防止触摸穿透
				});
			},
			cancleHandler() {
				this.showShare = false
			},
			wxHandler() {
				uni.share({
					provider: "weixin",
					scene: "WXSceneSession", //分享到聊天界面
					href: this.url, //跳转链接
					type: 0, //图文
					title: `uni-app分享: ${this.product.name}`,
					summary: `¥${this.product.price}/${this.product.unit} \n ${this.product.desc}`,
					imageUrl: this.product.pic,
					success: function(res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function(err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});
			},
			wxfriendHandler() {
				uni.share({
					provider: "weixin",
					scene: "WXSenceTimeline", //分享到朋友圈
					href: this.url, //跳转链接
					type: 0, //图文
					title: `uni-app分享: ${this.product.name}`,
					summary: `¥${this.product.price}/${this.product.unit} \n ${this.product.desc}`,
					imageUrl: this.product.pic,
					success: function(res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function(err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});
			},
			QQHandle(){
				uni.share({
					provider: "qq",
					scene: "WXSceneSession", //分享到聊天界面
					href: this.url, //跳转链接
					type: 1, //图文
					title: `uni-app分享: ${this.product.name}`,
					summary: `¥${this.product.price}/${this.product.unit} \n ${this.product.desc}`,
					success: function(res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function(err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});
			}
		},
		onLoad(e) {
			//页面接受参数
			this.product = JSON.parse(decodeURIComponent(e.item))
			// this.url = "http://localhost:8080/products/products/#/pages/home/children/product-detail?item="
			this.url = this.apiVariable + "/products/#/pages/home/children/product-detail?item="
			this.url += encodeURIComponent(JSON.stringify(this.product))
		},
		computed: {
			showTag() {
				if (this.product.category == "preferential") {
					return '满减优惠'
				} else if (this.product.category == "return") {
					return '下单返红包'
				} else {
					return '距离最近'
				}
			}
		},
		created() {
			let res = uni.getSystemInfoSync() //获取系统信息同步接口
			this.imgWidth = `${res.screenWidth - 46 }px`
			uni.getProvider({ //获取服务供应商
				service: 'share', //服务类型
				success: (res) => {
					console.log(res.provider, res.service)
					console.log("11")
				}
			})
		},
		onNavigationBarButtonTap(e) {
			this.showShare = true
		}

	}
</script>

<style scoped>
	.img {
		margin: 0 auto;
		text-align: center;
		margin-top: 20px;
		margin-bottom: 10px;
	}

	.exact {
		padding-left: 23px;
	}

	.name {
		margin-top: 8px;
	}

	.desc-tag {
		display: flex;
		margin-top: 5px;
		margin-bottom: 5px;
	}

	.desc-tag .describe {
		/* 设置元素的不透明级别 默认为1 */
		opacity: 0.5;
		margin-right: 8px;
		font-size: 16px
	}

	.desc-tag .tag {
		display: flex;
		align-items: center;
		margin-right: 2px;
		font-size: 12px;
		color: #DD524D;
		border: 1px solid #DD524D;
	}

	.context .price {
		color: red;
		margin-left: 2px;
	}

	.context .monad {
		margin-left: 2px;
	}

	.tab-buttom {
		display: flex;
		justify-content: space-around;
		align-items: center;
		margin-top: 6px;
		background-color: antiquewhite;
		padding-top: 6px;
		padding-bottom: 6px;
	}

	.svg-icon {
		text-align: center;
	}

	.svg-icon image {
		width: 64rpx;
		height: 64rpx;
	}

	.discribe {
		font-size: 14px;
		margin-top: 4px;
		text-align: center;
	}

	.order {
		width: 160px;
		height: 45px;
		border-radius: 20px;
		background: #007AFF;
		text-align: center;
		line-height: 45px;

	}
</style>
