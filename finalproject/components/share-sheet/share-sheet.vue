<template>
	<transition>
		<view class="share-wrap">
			<view class="title">分享</view>
			<view class="share-icon-wrap">
				<view  @tap="wxShare">
					<image src="/static/picture/share/Wx.png" ></image>
					<view class="word">微信</view>
				</view>
				<view @tap="wxFriendShare">
					<image src="/static/picture/share/WxFriend.png" ></image>
					<view class="word">朋友圈</view>
				</view>
				<view @tap="QQShare">
					<image src="/static/picture/share/QQ.png" ></image>
					<view class="word">QQ</view>
				</view>
				<view>
					<image src="/static/picture/share/Zhifubao.png" ></image>
					<view class="word">支付宝</view>
				</view>		
			</view>
			
			<view class="share-icon-wrap">
				<view v-for = "(item,index) in shareImgs" :key = "index">
					<image :src="item.img" ></image>
					<view class="word">{{item.desc}}</view>
				</view>	
			</view>
			<button class="cancel-btn" @tap="cancleShare">取消</button>
		</view>
	</transition>
</template>

<script>
	export default {
		data() {
			return {
				shareImgs: [
					{
						img: "/static/picture/share/Link.png",
						desc: "复制链接"
					},
					{
						img: "/static/picture/share/Pictorial.png",
						desc: "画报分享"
					},
					{
						img: "/static/picture/share/Planar.png",
						desc: "当面扫描"
					},
					{
						img: "/static/picture/share/Weibo.png",
						desc: "微博"
					},
				],
			}
		},
		methods: {
			cancleShare() {
				this.$emit('cancle-share');
			},
			wxShare() {
				this.$emit('wx-share');
			},
			wxFriendShare() {
				this.$emit('wxfriend-share')
			},
			QQShare() {
				this.$emit('qq-share')
			}
		},
	}
</script>

<style scoped>
	.title {
		margin-top: 6px;
		text-align: center;
		font-size: 20px;
	}
	.share-wrap {
		position: fixed;
		bottom: 0;
		border-radius: 15px;
		background: #bdbdbd;
		width: 100%;
		height: 290px;
	}
	.share-icon-wrap {
		margin-top: 25px;
		display: flex;
		justify-content: space-around;
		align-items: center;
		flex-direction: row;
	}
	.share-icon-wrap .word {
		text-align: center;
		font-size: 14px;
		opacity: 0.5
	}

	image {
		width: 2.5rem;
		height: 2.5rem;
	}



	.v-enter {
		height: 0;
		opacity: 0;
	}

	.v-enter-to {
		opacity: 1;
		height: 290px;
		transition: all 1.5s;
	}

	.v-leave-to {
		height: 0;
		opacity: 0;
		transition: all 1.5s;
	}
	.cancel-btn {
		position: fixed;
		width: 100%;
		bottom: 0;
		background: #d1d1d1;
		opacity: 1;
	}
</style>
