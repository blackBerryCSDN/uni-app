<template>
	<view class="test-content">
		<!-- 车检视频 -->
		<view class="video-wrap">
			<!-- #ifndef MP -->
			<!-- 头部标题 -->
			<header-title :title="videoTitle" />
			<!-- #endif -->
			
			
			<!-- 小程序兼容 -->
			<!-- #ifdef MP -->
			<header-title :title="videoMpTitle" />
			<view class="img-box">
				<image v-if="imgSrc" mode="aspectFill" :src="imgSrc"></image>
				<image v-else mode="aspectFill" src="../../static/default.png"></image>
			</view>
			<!-- #endif -->
			
			<!-- #ifndef MP -->
			<!-- 车检实时视频 -->
			<video v-if="videoSrc" autoplay loop id="myVideo" :src="videoSrc"controls></video>
			<view v-else class="img-box">
				<image mode="aspectFill" src="../../static/default.png"></image>
			</view>
			<!-- #endif -->
		</view>
		
		<!-- 车检信息 -->
		<view class="info-wrap">
			<!-- 头部标题 -->
			<header-title :title="infoTitle" />
			
			<!-- 导航图 -->
			<view class="nav-picture">
				<view
				 class="item-nav"
				  v-for="(item, index) in navList"
				   :key="index"
					:class="item.code === 0 ? 'active' : ''"
					@click="clickNav(item)"
					>
					<view class="item-icon"><text class="iconfont" :class="item.icon"></text></view>
					<view class="item-title">{{item.name}}</view>
					<view class="item-line">
						<!-- <text class="iconfont iconjiantou"></text> -->
					</view>
					
				</view>
			</view>
			
			<!-- 车辆信息 -->
			<list :list="infoList" />
			
			<!-- 支付按钮 -->
			<view class="pay">
				<button type="warn" disabled="true" class="pay-btn"  @click="payClick">支付订单</button>
				<!-- <button type="warn" :disabled="navList[navList.length-1].code === 1? true : false" class="pay-btn"  @click="payClick">支付订单</button> -->
			</view>
		</view>
		
		<!-- 历史记录 -->
		<view class="history">
			<!-- 头部标题 -->
			<header-title :title="historyTitle" />
			
			<view class="history-box">
				<view class="history-item" v-for="(item, index) in historyList" :key="index" @click="detailInfo(item)">
					<view class="left">
						<view class="item-title">车牌号：{{item.plateNumber}}</view>
						<view class="item-time">时间：{{item.endTime}}</view>
					</view>
					<view class="right">
						<text class="iconfont iconjiantou"></text>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 跳转登录页面 -->
		<uni-popup id="popup" ref="popup" type="center">
			<detail-dialog @closeDialog="closeDialog" @loginDefine="loginDefine"></detail-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import list from '../../components/common/list.vue'
	import headerTitle from '../../components/common/header-title.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import detailDialog from '@/components/common/detail-dialog.vue'
	import {mapState} from 'vuex'
	export default {
		components: {
			list,
			headerTitle,
			uniPopup,
			detailDialog
		},
		data() {
			return {
				videoMpTitle: '当前车检实时图片—入园接车区',
				videoTitle: '当前车检实时视频—入园接车区',
				infoTitle: '当前车检信息',
				historyTitle: '车检历史记录',
				imgSrc: '',
				videoSrc: '',
				navList: [], // 导航图
				infoList: [],  // 车辆信息
				historyList: [], // 历史列表
				serIntervalId: '',  // 自动刷新
				token: ''
			}
		},
		computed: {
			...mapState(['userInfo', 'hasLogin'])
		},
		onLoad() {
			this.init()	
		},
		onShow() {
			this.init()	
		},
		onUnload() {
			clearInterval(this.serIntervalId)
		},
		onHide() {
			clearInterval(this.serIntervalId)
		},
		methods: {
			/* 页面初始化 */
			init() {
				if (this.hasLogin) {
					this.loadData()
					this.serIntervalId = setInterval(() => {
						this.loadData()
					},30*60*1000)
				} else {
					this.$refs.popup.open()
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
			/**
			 * 请求后台数据
			 */
			async loadData() {
				uni.showLoading({
				    title: '加载中'
				});
				/* 请求当前车检信息数据 */
				const currentRes = await this.$myRequest({
					url: '/dtline/process/getNowProcess',
					data: {
						userId: this.userInfo.id,
						processStatus: '8'
					}
				})
				if (currentRes.code === 0 && currentRes.data) {
					if (currentRes.data.content) {
						const navList = JSON.parse(currentRes.data.content)
						this.navList = navList || []
						let newList = this.navList.filter((value, index) => value.code === 0)
						if (newList.length !== 0) {
							this.videoMpTitle = '当前车检实时图片—' + newList[newList.length - 1].name
							this.videoTitle = '当前车检实时视频—' + newList[newList.length - 1].name
							this.videoSrc = newList[newList.length - 1].video || ''
							if (newList[newList.length - 1].imgList.length !== 0) {
								this.imgSrc = newList[newList.length - 1].imgList[0] || ''
							}
						} else {
							this.videoMpTitle = '当前车检实时图片—入园接车区'
							this.videoTitle = '当前车检实时视频—入园接车区'
						}
						const infoData = currentRes.data
						this.infoList = [
							{
								label: '车牌号码',
								value: infoData.plateNumber
							},
							{
								label: '车主昵称',
								value: infoData.nickName
							},
							{
								label: '手机号码',
								value: infoData.phoneMob
							}
						]
					}
				}
				
				/* 请求历史车检列表 */
				const historyRes = await this.$myRequest({
					url: '/dtline/process/getHistoryProcess',
					data: {
						userId: this.userInfo.id,
						processStatus: '8'
					}
				})
				if (historyRes.code === 0) {
					const historyList = historyRes.data
					// this.swiperLength = swiperList.length || 0;
					this.historyList = historyList || [];
				}
				uni.hideLoading();
			},
			
			/* 历史记录详细 */
			detailInfo(val) {
				console.log(val)
				const id = val.id
				uni.navigateTo({
					url: '../history-detail/history-detail?id=' + id
				})
			},
			
			/* 支付订单 */
			payClick() {
				uni.navigateTo({
					url: '../money/pay'
				})
			},
			
			/* 点击导航图 */
			clickNav(val) {
				if (val.code === 0) {
					let list = this.navList.find(item => item.name === val.name)
					if (list.imgList.length !== 0) {
						this.imgSrc = list.imgList[0]
					}
					this.videoSrc = list.video
					switch(val.name){
						case '入园接车区':
						this.videoMpTitle = '当前车检实时图片—' + val.name
						this.videoTitle = '当前车检实时视频—' + val.name
						break
						case '外观检查区':
						this.videoMpTitle = '当前车检实时图片—' + val.name
						this.videoTitle = '当前车检实时视频—' + val.name
						// this.imgSrc = 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3596172441,404955435&fm=15&gp=0.jpg'
						break
						case '环保检查区':
						this.videoMpTitle = '当前车检实时图片—' + val.name
						this.videoTitle = '当前车检实时视频—' + val.title
						// this.imgSrc = 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Falipic.files.mozhan.com%2Fueditor%2Fimage%2F20180622%2F1529654519801555.jpg&refer=http%3A%2F%2Falipic.files.mozhan.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1611911269&t=0045bd699c4d0c442aa9bca92e88fb48'
						break
						case '安检':
						this.videoMpTitle = '当前车检实时图片—' + val.name
						this.videoTitle = '当前车检实时视频—' + val.name
						// this.imgSrc = 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fmmbiz.qpic.cn%2Fmmbiz_png%2F2RSxl12y0qMZUxIhicNBxEblbicluyzfytuJJiamzcwTluz3FGmhKiaEpebjib23TdW5ekAPiazXh9bfF5CwqOLfhmSg%2F640%3Fwx_fmt%3Dpng&refer=http%3A%2F%2Fmmbiz.qpic.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1611911313&t=8c7a91e4e72f6ae283a67d9604683aa2'
						break
						case '路试':
						this.videoMpTitle = '当前车检实时图片—' + val.name
						this.videoTitle = '当前车检实时视频—' + val.name
						// this.imgSrc = 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimage.bitautoimg.com%2Fappimage%2Fmedia%2F20171023%2Fw1920_h1080_00ba688d34ea4840a557b2d1f40e3051.jpeg&refer=http%3A%2F%2Fimage.bitautoimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1611911334&t=42678ce4b3b1f984523eab4f3d8d3287'
						break
						case '停车区域':
						this.videoMpTitle = '当前车检实时图片—' + val.name
						this.videoTitle = '当前车检实时视频—' + val.name
						// this.imgSrc = 'https://ss0.baidu.com/94o3dSag_xI4khGko9WTAnF6hhy/baike/pic/item/3801213fb80e7bec0c722b05252eb9389a506bad.jpg'
						break
						case '资料审核':
						this.videoMpTitle = '当前车检实时图片—' + val.name
						this.videoTitle = '当前车检实时视频—' + val.name
						// this.imgSrc = 'https://ss2.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy/baike/pic/item/8b13632762d0f703f47163540dfa513d2797c573.jpg'
						break
						case '叫号取车':
						this.videoMpTitle = '当前车检实时图片—' + val.name
						this.videoTitle = '当前车检实时视频—' + val.name
						// this.imgSrc = 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=451794391,2141471504&fm=26&gp=0.jpg'
						break
						case '开车出园':
						this.videoMpTitle = '当前车检实时图片—' + val.name
						this.videoTitle = '当前车检实时视频—' + val.name
						// this.imgSrc = 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2F04imgmini.eastday.com%2Fmobile%2F20190131%2F20190131124042_4203dc9253ffc4632e0807579d1fec4e_2.jpeg&refer=http%3A%2F%2F04imgmini.eastday.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1611911448&t=425368fece050fa193b10e688ac60380'
						break
					}
				} else {
					this.videoMpTitle = '当前车检实时图片—暂未完成上个检测项目'
					this.videoTitle = '当前车检实时视频—暂未完成上个检测项目'
				}
			}
		}
	}
</script>

<style lang="scss">
	.test-content {
		padding: 0 10upx;
		/* 车检视频 */
		.video-wrap {
			width: 100%;
			video {
				width: 100%;
				height: 160px;
				border-radius: 4px;
			}
			.img-box {
				height: 160px;
				image {
					width: 100%;
					height: 100%;
				}
			}
		}
		
		/* 车检信息 */
		.info-wrap {
			width: 100%;
			
			/* 导航图 */
			.nav-picture {
				background-color: $theme-color;
				border-radius: 4px;
				flex-wrap: wrap;
				display: flex;
				align-items: center;
				justify-content: center;
				padding: 10px 0;
				margin-bottom: 10upx;
				.item-nav {
					width: 33.333333%;
					color: #fff;
					text-align: center;
					font-size: 12px;
					position: relative;
					opacity: .5;
					margin: 10px 0;
					.item-icon {
						width: 24px;
						height: 24px;
						border-radius: 50%;
						background-color: #fff;
						display: flex;
						justify-content: center;
						align-items: center;
						margin: 0 auto 10upx;
						.iconfont {
							color: $theme-color;
						}
					}
					.item-line {
						width: calc(100% - 24px);
						height: 1px;
						background-color: #fff;
						position: absolute;
						top: 12px;
						left: calc(50% + 12px);
						// .iconfont {
						// 	position: absolute;
						// 	right: -5%;
						// 	top: -7px;
						// }
					}
				}
				.item-nav.active {
					opacity: 1;
				}
				.item-nav:last-child .item-line {
						display: none;
					}
				.item-nav:nth-child(3) .item-line {
						width: 41px;
						position: absolute;
						transform: rotate(90deg);
						top: 43.5px;
						left: calc(50% - 20.5px);
						// .iconfont {
						// 	right: -13%;
						// }
					}
					.item-nav:nth-child(6) .item-line {
							width: 41px;
							position: absolute;
							transform: rotate(90deg);
							top: 43.5px;
							left: calc(-150% - 20.5px);
							// .iconfont {
							// 	right: -13%;
							// }
						}
			}
			
			/* 订单支付 */
			.pay {
				margin: 20upx 0;
				.pay-btn {
					width: 70%;
					// background-color: $uni-color-primary;
					color: #fff;
					line-height: 64upx;
					font-size: $font-lg;
				}
			}
		}
		
		/* 历史记录 */
		.history {
			.history-box{
				.history-item {
					display: flex;
					justify-content: space-between;
					align-items: center;
					background-color: #fff;
					margin-bottom: 10upx;
					border-radius: 4px;
					font-size: $font-sm;
					color: $font-color-light;
					padding: 20upx;
					.left {
						.item-title {
							font-size: $font-base;
							color: $font-color-dark;
							margin-bottom: 6upx;
						}
					}
					.right {
						.iconfont {
							font-size: $font-lg + 8upx;
						}
					}
				}
			}
		}
	}
</style>
