<template>
	<!-- 头部组件 -->
	<view class="header">
		<view class="header-icon"></view>
		<view class="header-title">{{title}}</view>
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				
			}
		}
	}
</script>

<style lang="scss">
	.header {
		background-color: #fff;
		margin: 10upx 0;
		border-radius: 4px;
		display: flex;
		align-items: center;
		padding: 20upx 10upx;
		.header-icon {
			width: 3px;
			height: 20px;
			background-color: $theme-color;
			margin: 0 10upx;
		}
		.header-title {
			font-size: $font-lg;
		}
	}
</style>
