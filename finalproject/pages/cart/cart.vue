<template>
	<view>
		<view>
			<view class="cart" v-for="(item,index) in cart" :key="index">
				<!-- checked 改变时触发 change 事件 -->
				<van-checkbox :value="item.selected" @change="asyncClickSingle(item)"></van-checkbox>
				<van-card :num="item.num" :price="item.price" :desc="item.desc" :title="item.name" :thumb="item.pic"></van-card>
				<van-stepper :value="item.num" theme="round" button-size="22" mim="1" max="8" class="stepper" @plus="asyncIncrease(item)"
				 @minus="asyncDecrease(item)" />
			</view>
		</view>

		<view >
			<!-- SubmitBar 提交订单栏  @submit="onSubmit"-->
			<van-submit-bar :price="totalPrice * 100" button-text="提交订单" :disabled="!hasCheckedGoods" class="subb">
				<van-checkbox :value="isAllchecked" @change="asyncClickAll(isAllchecked)" :disabled="cartCondition">全选</van-checkbox>
			</van-submit-bar>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapGetters,
		mapActions
	} from 'vuex'
	export default {
		data() {
			return {

			}
		},
		computed: {
			...mapState(['cart']),
			...mapGetters(['productNum', 'totalPrice', 'isAllchecked', 'hasCheckedGoods', 'cartCondition'])
		},
		watch: { //侦听商品清空或加入购物车,使得商品数量的变化时徽标也改变
			productNum(newNum, oldNum) {
				this.setBarBadge()
			}
		},
		methods: {
			...mapActions(['asyncClickSingle', 'asyncClickAll', "asyncEmptyCart", "asyncIncrease", "asyncDecrease"]),
			setBarBadge() {
				if (this.productNum != 0) {
					uni.setTabBarBadge({ //为 tabBar 某一项的右上角添加文本
						index: 2,
						text: `${this.productNum}`
					})
				} else {
					uni.removeTabBarBadge({
						index: 2,
					})
				}
			}
		},
		//页面生命周期 监听原生标题栏按钮点击事件
		onNavigationBarButtonTap(e) {
			//原生标题栏按钮数组的下标  e.index
			if(e.index == 0) {
				uni.switchTab({ //跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。
					"url":"/pages/home/home"
				})
				return;
			}
			if (e.index == 1) {
				if (this.productNum > 0) {
					uni.showModal({ //显示模态弹窗
						content: '是否清空订单',
						success: (res) => {
							if (res.confirm) {
								this.asyncEmptyCart()
									uni.showToast({ //显示消息提示框
										icon: "success", //显示成功图标
										title: '清空成功',
										duration: 2000,
										mask: true //显示透明蒙层，防止触摸穿透
									});
							}
						}
					})
				}
			}
			
		}
	}
</script>

<style scoped>
	.cart {
		display: flex;
		align-items: center;
		padding-left: 15px;
	}

	.subb {
		position: relative !important;
		z-index: 99999;
	}

	.stepper {
		position: absolute;
		right: 6px;
	}
</style>
