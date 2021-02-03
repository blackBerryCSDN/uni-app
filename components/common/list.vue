<template>
	<!-- 列表组件 -->
	<view class="list">
		<view class="list-item" v-for="(item, index) in list" :key="index">
			<view>{{item.label}}</view>
			<view :style="{color: (item.label === '订单总额' || item.label === '项目金额') ? 'red':''}">{{item.value}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default: []
			}
		},
		data() {
			return {
				
			}
		}
	}
</script>

<style lang="scss">
	.list {
		background-color: #fff;
		margin-bottom: 10upx;
		border-radius: 4px;
		padding: 10upx;
		font-size: $font-sm;
		color: $font-color-light;
		.list-item {
			display: flex;
			justify-content: space-between;
			view {
				margin: 10upx;
			}
		}
	}
</style>
