<template>
	<view class="violation-content">
		<view class="header">
			<view class="header-top">
				<view class="header-top-title">AXXXXX</view>
				<view class="iconfont iconqiche"></view>
			</view>
			<view class="header-body">
				<view>
					<view>违章数</view>
					<view>3</view>
				</view>
				<view>
					<view>罚款(元)</view>
					<view>600</view>
				</view>
				<view>
					<view>扣分</view>
					<view>9</view>
				</view>
			</view>
		</view>

		<view class="list-box">
			<view class="list-item" v-for="(item, index) in villationList" :key="index">
				<view class="list-header">
					<view class="item"><text class="iconfont iconshijian"></text>{{item.time}}</view>
					<view class="item"><text class="iconfont icondizhi"></text>{{item.address}}</view>
					<view class="item"><text class="iconfont iconweizhangchaxun"></text>{{item.reason}}</view>
				</view>
				<view class="list-bottom">
					<view><text class="fa">罚</text>{{item.money}}</view>
					<view><text class="fa">扣</text>{{item.score}}</view>
					<view>已处理</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				villationList: [
					{
						time: '2017-12-25 20:39',
						address: '宁波市海曙区孵化园交叉路口',
						reason: '机动车逆向行驶',
						money: '200元',
						score: '3分'
					},
					{
						time: '2017-12-25 20:39',
						address: '宁波市海曙区孵化园交叉路口',
						reason: '机动车逆向行驶',
						money: '200元',
						score: '3分'
					},
					{
						time: '2017-12-25 20:39',
						address: '宁波市海曙区孵化园交叉路口',
						reason: '机动车逆向行驶',
						money: '200元',
						score: '3分'
					}
				]
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
.violation-content {
	padding: 0 10upx;
	font-size: $font-base;
	.header {
		background-color: $theme-color;
		border-radius: 4px;
		padding: 20px 0;
		margin: 10upx 0;
		// height: 100px;
		color: #fff;
		.header-top {
			display: flex;
			justify-content: center;
			align-items: center;
			margin-bottom: 10upx;
			view {
				flex: 1;
				text-align: center;
			}
			.header-top-title {
				font-size: $font-lg + 6upx;
			}
			.iconfont {
				font-size: $font-lg + 40upx;
			}
		}
		.header-body {
			display: flex;
			justify-content: center;
			align-items: center;
			view {
				flex: 1;
				text-align: center;
			}
		}
	}
	.list-box {
		margin: 10upx 0;
		.list-item {
			.list-header {
				background-color: #fff;
				border-radius: 4px;
				padding: 10upx;
				margin-bottom: 2px;
				.item {
					margin: 10upx;
					.iconfont {
						color: $theme-color;
						font-size: $font-lg +2upx;
						margin-right: 4px;
					}
				}
			}
			.list-bottom {
				background-color: #fff;
				border-radius: 4px;
				padding: 10upx;
				display: flex;
				justify-content: center;
				margin-bottom: 10px;
				view {
					flex: 1;
					text-align: center;
					padding: 10upx 0;
					border-right: 1px solid $border-color-base;
					.fa {
						background-color: #46c7cc;
						color: #fff;
						padding: 2px 4px;
						border-radius: 2px;
						margin-right: 4px;
					}
				}
				view:last-child {
					border-right: none;
					background-color: $theme-color;
					color: #fff;
				}
			}
		}
	}
}
</style>
