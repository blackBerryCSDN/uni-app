<template>
	<view class="container">
		
		<view class="user-section">
			<image class="bg" src="/static/profile/user-bg.jpg"></image>
			<view class="user-info-box" @click="myInfo">
				<view class="portrait-box">
					<image class="portrait" :src="userInfo.portrait || '/static/profile/missing-face.png'"></image>
				</view>
				<view class="info-box">
					<text class="username">{{userInfo.nickName || '点击登录'}}</text>
				</view>
			</view>
		</view>
		
		<view class="cover-container">
			<view class="history-section icon">
				<list-cell icon="iconxiaoxi" iconColor="#5fcda2" title="消息" @eventClick="navTo('/pages/notice/notice')"></list-cell>
				<list-cell icon="iconshezhi" iconColor="#e07472" title="设置" border="" @eventClick="navTo('/pages/set/set')"></list-cell>
				<list-cell icon="iconguanyu" iconColor="#54b4ef" title="关于我们" @eventClick="navTo('/pages/about/about')"></list-cell>
				<list-cell icon="iconbanbengengxin" iconColor="#7652e7" title="版本信息" @eventClick="edition"></list-cell>
				<list-cell icon="iconqiche" iconColor="#ea2ee3" title="我的车辆" @eventClick="navTo('/pages/plate/plate')"></list-cell>
			</view>
		</view>
			
		<!-- 跳转登录页面 -->
		<uni-popup id="popup" ref="popup" type="center">
			<detail-dialog @closeDialog="closeDialog" @loginDefine="loginDefine"></detail-dialog>
		</uni-popup>
	</view>  
</template>

<script>
	import listCell from '@/components/common/mix-list-cell';
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import detailDialog from '@/components/common/detail-dialog.vue'
	import {  
	    mapState 
	} from 'vuex';  
	export default {
		components: {
			listCell,
			uniPopup,
			detailDialog
		},
		data(){
			return {
				
			}
		},
		onLoad(){
			
		},
		// #ifndef MP
		onNavigationBarButtonTap(e) {
			const index = e.index;
			if (index === 0) {
				this.navTo('/pages/set/set');
			}else if(index === 1){
				// #ifdef APP-PLUS
				const pages = getCurrentPages();
				const page = pages[pages.length - 1];
				const currentWebview = page.$getAppWebview();
				currentWebview.hideTitleNViewButtonRedDot({
					index
				});
				// #endif
				uni.navigateTo({
					url: '/pages/notice/notice'
				})
			}
		},
		// #endif
	    computed: {
			...mapState(['hasLogin','userInfo'])
		},
	    methods: {
			/**
			 * 统一跳转接口,拦截未登录路由
			 * navigator标签现在默认没有转场动画，所以用view
			 */
			navTo(url){
				if(!this.hasLogin){
					this.$refs.popup.open()
				} else {
					uni.navigateTo({
						url
					}) 	
				} 
			}, 
			
			// 关闭告警详情弹窗
			closeDialog() {
				this.$refs.popup.close()
			},
			
			// 跳转登录页面
			loginDefine() {
				this.$refs.popup.close()
				uni.navigateTo({
					url: '../login/login'
				})
			},
			
			/* 个人信息 */
			myInfo() {
				if (!this.hasLogin) {
				   return this.$refs.popup.open()
				}
				uni.navigateTo({
					url: '../my-info/my-info'
				})
			},
			
			/* 版本信息 */
			edition() {
				uni.showToast({
				    title: '当前版本2.0.0',
					icon: 'success',
				    duration: 2000
				});
			}
	    }  
	}  
</script>

<style lang="scss">
%flex-center {
	 display:flex;
	 flex-direction: column;
	 justify-content: center;
	 align-items: center;
	}
	%section {
	  display:flex;
	  justify-content: space-around;
	  align-content: center;
	  background: #fff;
	  border-radius: 10upx;
	}

	.user-section{
		height: 320upx;
		padding: 100upx 30upx 0;
		position:relative;
		.bg{
			position:absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			filter: blur(1px);
			opacity: .7;
		}
	}
	.user-info-box{
		height: 180upx;
		display:flex;
		align-items:center;
		position:relative;
		z-index: 1;
		.portrait{
			width: 130upx;
			height: 130upx;
			border:5upx solid #fff;
			border-radius: 50%;
		}
		.username{
			font-size: $font-lg + 6upx;
			color: $font-color-dark;
			margin-left: 20upx;
		}
	}

	.vip-card-box{
		display:flex;
		flex-direction: column;
		color: #f7d680;
		height: 240upx;
		background: linear-gradient(left, rgba(0,0,0,.7), rgba(0,0,0,.8));
		border-radius: 16upx 16upx 0 0;
		overflow: hidden;
		position: relative;
		padding: 20upx 24upx;
		.card-bg{
			position:absolute;
			top: 20upx;
			right: 0;
			width: 380upx;
			height: 260upx;
		}
		.b-btn{
			position: absolute;
			right: 20upx;
			top: 16upx;
			width: 132upx;
			height: 40upx;
			text-align: center;
			line-height: 40upx;
			font-size: 22upx;
			color: #36343c;
			border-radius: 20px;
			background: linear-gradient(left, #f9e6af, #ffd465);
			z-index: 1;
		}
		.tit{
			font-size: $font-base+2upx;
			color: #f7d680;
			margin-bottom: 28upx;
			.yticon{
				color: #f6e5a3;
				margin-right: 16upx;
			}
		}
		.e-b{
			font-size: $font-sm;
			color: #d8cba9;
			margin-top: 10upx;
		}
	}
	.cover-container{
		background: $page-color-base;
		margin-top: -150upx;
		padding: 0 0upx;
		position:relative;
		background: #f5f5f5;
		padding-bottom: 20upx;
		.arc{
			position:absolute;
			left: 0;
			top: -34upx;
			width: 100%;
			height: 36upx;
		}
	}
	.tj-sction{
		@extend %section;
		.tj-item{
			@extend %flex-center;
			flex-direction: column;
			height: 140upx;
			font-size: $font-sm;
			color: #75787d;
		}
		.num{
			font-size: $font-lg;
			color: $font-color-dark;
			margin-bottom: 8upx;
		}
	}
	.order-section{
		@extend %section;
		padding: 28upx 0;
		margin-top: 20upx;
		.order-item{
			@extend %flex-center;
			width: 120upx;
			height: 120upx;
			border-radius: 10upx;
			font-size: $font-sm;
			color: $font-color-dark;
		}
		.iconfont{
			font-size: 48upx;
			margin-bottom: 18upx;
			color: #fa436a;
		}
		.icon-shouhoutuikuan{
			font-size:44upx;
		}
	}
	.history-section{
		margin-top: 20upx;
		background: #fff;
		border-radius:10upx;
		.sec-header{
			display:flex;
			align-items: center;
			font-size: $font-base;
			color: $font-color-dark;
			line-height: 40upx;
			margin-left: 30upx;
			.iconfont{
				font-size: 44upx;
				color: #5eba8f;
				margin-right: 16upx;
				line-height: 40upx;
			}
		}
		.h-list{
			white-space: nowrap;
			padding: 30upx 30upx 0;
			image{
				display:inline-block;
				width: 160upx;
				height: 160upx;
				margin-right: 20upx;
				border-radius: 10upx;
			}
		}
	}
</style>
