<template>
	<view class="home-content">
		<!-- 头部轮播 -->
		<view class="carousel-section">
			<!-- 背景色区域 -->
			<swiper class="carousel" autoplay interval="3000" circular @change="swiperChange">
				<swiper-item v-for="(item, index) in swiperList" :key="index" class="carousel-item" @click="helpDaitl(item.url)">
					<image :src="item.src" />
				</swiper-item>
			</swiper>
			<!-- 自定义swiper指示器 -->
			<view class="swiper-dots">
				<text class="num">{{swiperCurrent+1}}</text>
				<text class="sign">/</text>
				<text class="num">{{swiperLength}}</text>
			</view>
		</view>
		
		<!-- 分类 -->
		<view class="cate-section">
			<view class="cate-item" v-for="(item, index) in sortList" :key="index" @click="detailShow(item.name, item.url)">
				<image :src="item.icon"></image>
				<text>{{item.name}}</text>
			</view>
		</view>
		

		<!-- 流程图 -->
		<view class="flow-section">
			<!-- <view class="flow-title">车检流程</view> -->
			<view>
				<video autoplay loop id="myVideo" :src="videoSrc"></video>
			</view>
		</view>
		
		<!-- 跳转登录页面 -->
		<uni-popup id="popup" ref="popup" type="center">
			<detail-dialog @closeDialog="closeDialog" @loginDefine="loginDefine"></detail-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import detailDialog from '@/components/common/detail-dialog.vue'
	export default {
		components: {
			uniPopup,
			detailDialog
		},
		data() {
			return {
				swiperCurrent: 0,
				swiperLength: 0,
				swiperList: [], // 轮播数据
				sortList: [],  // 分类数据
				videoSrc: ''  // 视频播放地址
			}
		},
		computed: {
			...mapState(['hasLogin'])
		},
		onLoad() {
			this.loadData()
		},
		methods: {
			/**
			 * 请求后台数据
			 */
			async loadData() {
				uni.showLoading({
				    title: '加载中'
				});
				/* 请求轮播数据 */
				const swiperRes = await this.$myRequest({
					url: '/dtline/config/home_config',
					data: {
						configKey: 'swiper'
					}
				})
				if (swiperRes.code === 0) {
					const swiperList = JSON.parse(swiperRes.data[0].configContent)
					this.swiperLength = swiperList.length || 0;
					this.swiperList = swiperList || [];
					
				}
				
				/* 请求分类数据 */
				const sortRes = await this.$myRequest({
					url: '/dtline/config/home_config',
					data: {
						configKey: 'navigation'
					}
				})
				if (sortRes.code === 0) {
					const sortList = JSON.parse(sortRes.data[0].configContent)
					this.sortList = sortList || [];
				}
				
				// /* 请求播放视频地址 */
				const videoRes = await this.$myRequest({
					url: '/dtline/config/home_config',
					data: {
						configKey: 'video'
					}
				})
				if (videoRes.code === 0) {
					const videoSrc = videoRes.data[0].configContent
					this.videoSrc = videoSrc || ''
					// this.videoSrc = 'http://123.207.205.139:9090/video.mp4'
				}
				uni.hideLoading();
			},
			
			//轮播图切换修改背景色
			swiperChange(e) {
				const index = e.detail.current;
				this.swiperCurrent = index;
			},
			
			// 轮播图点击跳转
			helpDaitl(val) {
				uni.navigateTo({
					url: val
				})
				
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
			
			// 分类点击
			detailShow(name, url) {
				switch(name) {
					case '我的车检':
					if (this.hasLogin) {
						uni.switchTab({
							url: url
						})	
					} else {
						this.$refs.popup.open()
					}
					
					break
					case '周边快修':
					uni.switchTab({
						url: url
					})
					break
					case '车检预约':
					uni.showToast({
					    title: '正在跳转浙里办',
						icon: 'loading',
					    duration: 2000
					});
					break
					case '违规违法':
					case '使用帮助':
					case '保险查询':
					uni.navigateTo({
						url: url
					})
					break
				}
			}
			
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #fff!important;	
	}
	.home-content {
		/* 头部 轮播图 */
		.carousel-section {
			position: relative;
			
			.carousel {
				width: 100%;
				height: 380upx;
			
				.carousel-item {
					width: 100%;
					height: 100%;
					overflow: hidden;
				}
			
				image {
					width: 100%;
					height: 100%;
				}
			}
			
			.swiper-dots {
				display: flex;
				position: absolute;
				left: 50%;
				margin-left: -36upx;
				bottom: 30upx;
				width: 72upx;
				height: 36upx;
				background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABkCAYAAADDhn8LAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTk4MzlBNjE0NjU1MTFFOUExNjRFQ0I3RTQ0NEExQjMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTk4MzlBNjA0NjU1MTFFOUExNjRFQ0I3RTQ0NEExQjMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Q0E3RUNERkE0NjExMTFFOTg5NzI4MTM2Rjg0OUQwOEUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Q0E3RUNERkI0NjExMTFFOTg5NzI4MTM2Rjg0OUQwOEUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4Gh5BPAAACTUlEQVR42uzcQW7jQAwFUdN306l1uWwNww5kqdsmm6/2MwtVCp8CosQtP9vg/2+/gY+DRAMBgqnjIp2PaCxCLLldpPARRIiFj1yBbMV+cHZh9PURRLQNhY8kgWyL/WDtwujjI8hoE8rKLqb5CDJaRMJHokC6yKgSCR9JAukmokIknCQJpLOIrJFwMsBJELFcKHwM9BFkLBMKFxNcBCHlQ+FhoocgpVwwnv0Xn30QBJGMC0QcaBVJiAMiec/dcwKuL4j1QMsVCXFAJE4s4NQA3K/8Y6DzO4g40P7UcmIBJxbEesCKWBDg8wWxHrAiFgT4fEGsB/CwIhYE+AeBAAdPLOcV8HRmWRDAiQVcO7GcV8CLM8uCAE4sQCDAlHcQ7x+ABQEEAggEEAggEEAggEAAgQACASAQQCCAQACBAAIBBAIIBBAIIBBAIABe4e9iAe/xd7EAJxYgEGDeO4j3EODp/cOCAE4sYMyJ5cwCHs4rCwI4sYBxJ5YzC84rCwKcXxArAuthQYDzC2JF0H49LAhwYUGsCFqvx5EF2T07dMaJBetx4cRyaqFtHJ8EIhK0i8OJBQxcECuCVutxJhCRoE0cZwMRyRcFefa/ffZBVPogePihhyCnbBhcfMFFEFM+DD4m+ghSlgmDkwlOgpAl4+BkkJMgZdk4+EgaSCcpVX7bmY9kgXQQU+1TgE0c+QJZUUz1b2T4SBbIKmJW+3iMj2SBVBWz+leVfCQLpIqYbp8b85EskIxyfIOfK5Sf+wiCRJEsllQ+oqEkQfBxmD8BBgA5hVjXyrBNUQAAAABJRU5ErkJggg==);
				background-size: 100% 100%;
			
				.num {
					width: 36upx;
					height: 36upx;
					border-radius: 50px;
					font-size: 24upx;
					color: #fff;
					text-align: center;
					line-height: 36upx;
				}
			
				.sign {
					position: absolute;
					top: 0;
					left: 50%;
					line-height: 36upx;
					font-size: 12upx;
					color: #fff;
					transform: translateX(-50%);
				}
			}
		}
		
		/* 分类 */
		.cate-section {
			display: flex;
			justify-content: space-around;
			align-items: center;
			flex-wrap:wrap;
			padding: 30upx 22upx; 
			background: #fff;
			border-bottom: 6px solid #f5f5f5;
			.cate-item {
				display: flex;
				flex-direction: column;
				align-items: center;
				font-size: $font-sm + 2upx;
				color: $font-color-dark;
			}
			image {
				width: 88upx;
				height: 88upx;
				margin-bottom: 14upx;
				border-radius: 50%;
				opacity: .7;
				box-shadow: 4upx 4upx 20upx rgba(250, 67, 106, 0.3);
			}
		}
		
		.flow-section {
			width: 100%;
			height: 640upx;
			background-color: #fff;
			video {
				width: 100%;
				height: 600upx;
				// border-radius: 4px;
			}
			
		}
	}
</style>
