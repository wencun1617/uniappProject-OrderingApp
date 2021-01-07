<template>
	<view>
		<view class="top-avatar">
			<view>
				<view class="number">
					<view  v-if="!hasLogin" @tap="loginHandle">
						未登录点击此处登录
					</view>
					<view v-else>
						{{userName}}
					</view>
				</view>
				<view class="describe">
					<view  v-if="!hasLogin" >
						再忙, 也要记得吃饭呦~
					</view>
					<view v-else>
						点餐，用餐愉快哦!
					</view>
				</view>
			</view>
			<image :src="imgaddress" class="avatar"></image>
		</view>
		<!-- 红包/余额 -->
		<view class="part">
			<view class="two-part" :style="{width: partWidth}">
				<view class="money">
					红包
					<image src="../../static/picture/profile/hongbao.png" class="bao"></image>
				</view>
				<view class="red-text">
					<text class="red">0</text>
					<text class="text">个未使用</text>
				</view>
			</view>
			<view class="two-part" :style="{width: partWidth}">
				<view class="money">
					余额
					<image src="../../static/picture/profile/qianbao.png" class="bao"></image>
				</view>
				<view class="red-text">
					<text class="red">¥0</text>
				</view>
			</view>
		</view>
		<view class="remind">
			<view class="left">
				<image  src="../../static/picture/profile/clock.png"></image>
				<view>
					<text class="title">点餐提醒</text>
					<text class="desc">已有<text style="color: #1989FA;">25946</text>提醒自己按时吃饭</text>
				</view>
			</view>
			<view class="">
				<van-button type="info">立即开启</van-button>
			</view>
		</view>
		<van-cell-group >
		  <van-cell color="#1989fa" title="我的地址" icon="location-o"  is-link @tap="locationHandle"/>
		  <van-cell color="#1989fa" title="我的收藏" icon="like-o"  is-link/>
		  <van-cell color="#1989fa" title="推荐有礼" icon="point-gift-o"  is-link/>
		  <van-cell color="#1989fa" title="我的客服" icon="service-o"  is-link/>
		  <van-cell color="#1989fa"title="规则中心" icon="description"  is-link/>
		</van-cell-group>
	</view>
</template>

<script>
	import {mapState,mapMutations} from "vuex"
	export default {
		data() {
			return {
				partWidth: ''
			}
		},
		methods: {
			//跳转到收货地址页面
			locationHandle() {
				uni.navigateTo({// 只能打开非 tabBar 页面
					url:"/pages/location/location"
				})
			},
			loginHandle() { //未登录进行登录
				uni.navigateTo({// 只能打开非 tabBar 页面
					url:"/pages/login/login"
				})
			},
			...mapMutations(['logout']),
		},
		created(){
			let res = uni.getSystemInfoSync() //获取系统信息同步接口
			this.partWidth = `${(res.screenWidth- 50)/2}px`
		},
		computed:{
			...mapState(["userName","hasLogin","imgaddress"])
		},
		onNavigationBarButtonTap(e) {//监听原生标题栏按钮点击事件
			if(e.index == 0 && this.hasLogin) {
				uni.showModal({
				    title: '是否退出当前账户',
				    success: res => {
				        if (res.confirm) {
				            this.logout()
							this.$store.state.imgaddress = '/static/picture/profile/avatar.png'
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			}
		}
	}
</script>

<style scoped>
	.top-avatar {
		padding: 20px 20px 20px 20px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.top-avatar .number {
		font-size: 22px;
		color: #000000;
	}
	.top-avatar .describe {
		opacity: 0.5;
		font-size: 14px;
	}
	.top-avatar .avatar {
		width: 80px;
		height: 80px;
		border-radius: 40px;	
	}
	
	.part {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20px 20px 10px 20px;
	}
	.two-part {
		background-color: #F1F1F1;
		border: 1px solid #DCDEE0;
	}
	.two-part .money {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0px 10px 15px 10px;
	}
	.money .bao {
		width: 48px;
		height: 48px;
	}
	.two-part .red {
		color: red
	}
	.two-part .text{
		color: #C0C0C0;
		font-size: 14px;
	}
	
	.red-text {
		padding: 0 0 0 10px
	}
	
	.remind {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 5px 5px 10px 5px;
		margin:5px 20px 10px 20px;
		border: 1px solid #DCDEE0;
		background: linear-gradient(left,#AAAAFF,#ECECFF,white);
		
	}
	.remind .left {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.remind  image {
		width:50px;
		height:50px;
		margin-right: 10px;
	}
	.remind .title {
		top:0px;
		color: blue;
		font-size: 18px;
	}
	.remind .desc {
		display: block;
		color:;
		font-size:12px;
	}
	.cell {
		border-bottom: 1px solid #C8C9CC;
	}
</style>
