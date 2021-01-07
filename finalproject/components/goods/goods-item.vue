<template>
	<view>
		<view :style="{width: imgWidth}" class="goods-item">
			<!-- 判断对象是否是一个空的对象 Object.keys(对象名).length-->
			<view>
				<image :src="product.pic" :style="{height:imgWidth}" class="img" @tap="goodsHandle()"></image>
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
					<view class="iconf" @tap="addCartHandle(product)">
						<image src="../../static/picture/iconfont/cart.png" class="cart-active"></image>
					</view>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	import {
		mapActions
	} from "vuex"
	export default {
		data() {
			return {
				imgWidth: ""
			}
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
		props: ['product'],
		methods: {
			...mapActions(["asyncAddToCart"]),
			goodsHandle() {
				uni.navigateTo({//保留当前页面，跳转到应用内的某个页面
				
				//url有长度限制，太长的字符串会传递失败，使用encodeURIComponent
					url: '/pages/home/children/product-detail?item='+encodeURIComponent(JSON.stringify(this.product))
				})
			},
			addCartHandle(product) {
				this.asyncAddToCart(product),
				uni.showToast({ //显示消息提示框
					icon: "success", //显示成功图标
					title: '添加成功',
					duration: 1000,
					mask: true //显示透明蒙层，防止触摸穿透
				});
			}
		},
		created() {
			let res = uni.getSystemInfoSync() //获取系统信息同步接口
			this.imgWidth = `${res.screenWidth/2 - 20}px`
		}
	}
</script>

<style scoped>
	.name {
		margin-top: 8px;
	}

	.desc-tag {
		display: flex;
		margin-top: 5px;
		margin-bottom: 5px;
	}

	.desc-tag .describe {
		font-size: 15px;
		/* 设置元素的不透明级别 默认为1 */
		opacity: 0.5
	}

	.desc-tag .tag {
		display: flex;
		align-items: center;
		margin-right: 2px;
		font-size: 10px;
		color: #DD524D;
		border: 1px solid #DD524D;
	}

	.context {
		display: flex;
		position: relative;
		align-items: center;
	}

	.context .price {
		color: red;
		margin-left: 2px;
	}

	.context .monad {
		margin-left: 2px;
	}

	.iconf {
		display: flex;
		align-items: center;
		position: absolute;
		float: right;
		right: 8px
	}


	.img {
		width: 100%;
	}

	.goods-item {
		margin-top: 5px;
		border-bottom: 1px solid #999999;
	}
	
	.cart-active {
		width: 48rpx;
		height: 48rpx;
	}
</style>
