<template>
	<view class="goods">
		<view v-for="(item,index) in goodsData" :key="index">
			<goods-item :product="item"></goods-item>
		</view>
	</view>
</template>

<script>
	import goodsItem from "@/components/goods/goods-item.vue"
	export default {
		data() {
			return {

			}
		},
		props: ['goodsData'],
		methods: {

		},
		components: {
			goodsItem
		}
	}
</script>

<style scoped>
	.goods {
		display: flex;
		flex: 2;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-around;
	}
</style>
