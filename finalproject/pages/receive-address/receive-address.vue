<template>
	<view class="content">
		
		<view class="input-row input-text">
			<text class="title">收货人:</text>
			<m-input type="text" clearable focus v-model="linkMan" placeholder="请输入收货人姓名"></m-input>
		</view>

		<view class="input-row input-text">
			<text class="title">电话:</text>
			<m-input type="text" clearable focus v-model="mobile" placeholder="请输入电话"></m-input>
		</view>

		<van-cell is-link @tap="showPopup" title="所在地区:" icon="location-o" :value="addressArea" class="vant-cell"></van-cell>

		<view class="input-row input-text">
			<text class="title">地址:</text>
			<m-input type="text" clearable focus v-model="address" placeholder="请输入详细地址"></m-input>
		</view>

		<button type="primary" style="width: 80%; margin-top: 20px;" @tap="subHandle">提交</button>
		<w-picker :visible.sync="show" mode="region" :value="defaultRegion" default-type="value" :hide-area="false" @confirm="onConfirm($event,'region')"
		 @cancel="onCancel" ref="region"></w-picker>

	</view>
</template>

<script>
	import wPicker from '@/components/w-picker/w-picker'
	import mInput from '@/components/m-input/m-input.vue'
	import cityData from '@/components/w-picker/areadata/areadata.js'
	import { mapState, mapActions} from 'vuex'
	export default {
		data() {
			return {
				id:null,//更新时候用的
				linkMan: '',
				mobile: '',
				address: '',
				show: false,
				defaultRegion: cityData,
				addressArea: '请选择地区'
			}
		},
		computed:{
			...mapState(['addressLists']),
		},
		methods: {
			...mapActions(['asyncAddAddress','asyncUpadte']),
			showPopup() {
				this.show = true;
			},
			onConfirm(e) {
				this.addressArea = e.result
				console.log("确定地区")
			},
			onCancel() {
				console.log("取消")
			},
			subHandle() {
				let _self = this
				if(_self.id != null) {
					let temp = {
						id: _self.id,
						linkMan: _self.linkMan,
						mobile: _self.mobile,
						address: _self.addressArea+" "+_self.address
					}
					_self.asyncUpadte(temp)
					_self.id = null
				} else {
					let temp = {
						linkMan: _self.linkMan,
						mobile: _self.mobile,
						address: _self.addressArea+" "+_self.address
					}
					if(temp.address !== ('请选择地区'+" "+_self.address)){//所在地区要选
						this.asyncAddAddress(temp)
					}
				}
				this.linkMan = '',
				this.mobile = '',
				this.address = '',
				this.addressArea = '请选择地区',
				uni.navigateBack({
				    delta: 1
				});
			}
		},
		components: {
			mInput,
			wPicker
		},
		onLoad(option) {
			if(option.id != undefined) {
				this.id = option.id
				this.linkMan = this.addressLists[option.id - 1].linkMan,
				this.mobile = this.addressLists[option.id - 1].mobile,
				this.address = this.addressLists[option.id - 1].address
				let str = this.addressLists[option.id - 1].address.split(" ")//空格拆分字符串
				if(str.length!=0&&str!=null&&str!=undefined) {
					this.addressArea = str[0]
					this.address = str[1]
				}
			}
		}
	}
</script>

<style scoped>
	.input-text {
		border-bottom: 0.5px solid #c1c1b1;
	}

	.vant-cell {
		background-color: #C8C9CC;
		color: #007AFF;
	}

	.address-text {
		display: flex;
		align-items: center;
		height: 60px;
	}
	page {
		min-height: 100%;
		display: flex;
		font-size: 16px;
	}
	
	/* #ifdef MP-BAIDU */
	page {
		width: 100%;
		height: 100%;
		display: block;
	}
	
	swan-template {
		width: 100%;
		min-height: 100%;
		display: flex;
	}
	
	/* 原生组件模式下需要注意组件外部样式 */
	custom-component {
		width: 100%;
		min-height: 100%;
		display: flex;
	}
	
	/* #endif */
	
	/* #ifdef MP-ALIPAY */
	page {
		min-height: 100vh;
	}
	
	/* #endif */
	
	/* 原生组件模式下需要注意组件外部样式 */
	m-input {
		width: 100%;
		/* min-height: 100%; */
		display: flex;
		flex: 1;
	}
	
	.content {
		display: flex;
		flex: 1;
		flex-direction: column;
		background-color: #efeff4;
		padding: 10px;
	}
	
	.input-group {
		background-color: #ffffff;
		margin-top: 20px;
		position: relative;
	}
	
	.input-group::before {
		position: absolute;
		right: 0;
		top: 0;
		left: 0;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}
	
	.input-group::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}
	
	.input-row {
		display: flex;
		flex-direction: row;
		position: relative;
		font-size: 18px;
		line-height: 40px;
	}
	
	.input-row .title {
		width: 72px;
		padding-left: 15px;
	}
	
	.input-row.border::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 8px;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}
	
	.btn-row {
		margin-top: 25px;
		padding: 10px;
	}
	
	button.primary {
		background-color: #0faeff;
	}
</style>
