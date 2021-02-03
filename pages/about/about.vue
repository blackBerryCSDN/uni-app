<template>
	<view class="about-content">
		<view class="logo">
			<image src="../../static/logo.png"></image>
		</view>
		<view class="desc">
			<view>
				汽车是一种机械产品，在长期使用后，避免不了会出现各种故障，
				出了故障花钱、闹心不说还可能耽误事，如果能够在故障的萌芽阶段解决就会避免很多的麻烦
			</view>
			
			<br>
			<view>
				车检智能化是一款具备车辆检测设备及配套软件、监控部门监控等信息化设备
				，与之相配套的面向来检车辆业主的智慧化服务APP或小程序
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	// page {
	// 	background-color: #fff;
	// }
	.about-content {
		.logo {
			width: 160upx;
			height: 160upx;
			margin: 40upx auto;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.desc {
			width: 90%;
			margin: 0 auto;
			background-color: #fff;
			padding: 20upx;
			text-indent: 25px;
		}
	}
</style>
