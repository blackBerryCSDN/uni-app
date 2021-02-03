<template>
	<view class="detail-dialog-wrap">
		<view class="popup-content">
			<view class="popup-header">您还未登录</view>
			<view class="popup-body">
				<view>
					请先登录再进行操作
				</view>
				<view class="img-box">
					<image mode="aspectFill" src="../../static/dialog-bg.png"></image>
				</view>
			</view>
			<view class="popup-footer">
				<button class="btn-not" @click="notDefine">暂不登录</button>
				<button class="btn-login" @click="loginDefine">立即登陆</button>
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
			// 暂不登录
			notDefine() {
				this.$emit('closeDialog')
			},
			
			// 立即登陆
			loginDefine() {
				this.$emit('loginDefine')
			}
		}
	}
</script>

<style lang="scss">
	.detail-dialog-wrap {
		.popup-content {
			width: 540rpx;
			display: flex;
			height: 100%;
			border-radius: 20rpx;
			flex-direction: column;
			align-content: space-between;
			background-color: #fff;
			.popup-header {
				padding: 20rpx;
				height: 60rpx;
				line-height: 100rpx;
				text-align: center;
				font-weight: bold;
			}
			.popup-body {
				text-align: center;
				padding: 10rpx 20rpx;
				color: #909090;
				font-size: $font-base;
				.img-box {
					height: 200px;
					image {
						width: 100%;
						height: 100%;
					}
				}
			}
			.popup-footer {
				padding: 20rpx;
				display: flex;
				justify-content: space-around;
				.btn-not {
					font-size: $font-base;
					width: 200rpx;
					background-color: #fff;
					line-height: 60rpx;
					border: 2rpx solid $font-color-spec;
					color: $font-color-spec;
					border-radius: 50rpx;
				}
				.btn-login {
					font-size: $font-base;
					border-radius: 50rpx;
					width: 200rpx;
					background-color: $font-color-spec;
					line-height: 60rpx;
					color: #fff;
				}
			}
		}
	}	
</style>
