<template>
	<view class="history-content">
		<!-- 基本信息 -->
		<view class="basic">
			<!-- 头部标题 -->
			<header-title :title="basicTitle" />
			
			<list :list="basicList" />
		</view>
		
		<!-- 车检视频 -->
		<view class="video-wrap">
			<!-- 小程序兼容 -->
			<!-- #ifdef MP -->
			<header-title :title="videoMpTitle" />
			<view class="img-box">
				<image v-if="imgSrc" mode="aspectFill" :src="imgSrc"></image>
				<image v-else mode="aspectFill" src="../../static/default.png"></image>
			</view>
			<!-- #endif -->
			
			<!-- 非小程序兼容 -->
			<!-- #ifndef MP -->
			<!-- 头部标题 -->
			<header-title :title="videoTitle" />
			<video id="myVideo" :src="videoSrc"
			controls></video>
			<!-- #endif -->
		</view>
		
		
		<!-- 车检明细 -->
		<view class="detail">
			<!-- 头部标题 -->
			<header-title :title="detailTitle" />
			
			<!-- 导航图 -->
			<view class="nav-picture">
				<view
				 class="item-nav"
				  v-for="(item, index) in navHistoryList"
				   :key="index"
					:class="item.isFinish ? 'active' : ''"
					@click="clickNav(item)"
					>
					<view class="item-icon"><text class="iconfont" :class="item.icon"></text></view>
					<view class="item-title">{{item.name}}</view>
					<view class="item-line"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import list from '../../components/common/list.vue'
	import headerTitle from '../../components/common/header-title.vue'
	export default {
		components: {
			list,
			headerTitle
		},
		data() {
			return {
				id: '',
				videoMpTitle: '车检历史图片—入园接车区',
				videoTitle: '车检历史视频—入园接车区',
				basicTitle: '基本信息',
				detailTitle: '车检明细',
				imgSrc: '',
				videoSrc: '',
				navHistoryList: [], // 导航图
				basicList: [], // 历史列表基本信息
			}
		},
		onLoad(option) {
			this.id = option.id
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
				/* 请求当前车检信息数据 */
				const currentRes = await this.$myRequest({
					url: '/dtline/process/' + this.id,
				})
				if (currentRes.code === 0) {
					const navHistoryList = JSON.parse(currentRes.data.content)
					this.navHistoryList = navHistoryList || []
					this.imgSrc = this.navHistoryList[0].imgList[0] || ''
					this.videoSrc = this.navHistoryList[0].video || ''
					const infoData = currentRes.data
					this.basicList = [
						{
							label: '车牌状态',
							value: infoData.resultNote
						},
						{
							label: '开始时间',
							value: infoData.startTime
						},
						{
							label: '结束时间',
							value: infoData.endTime
						}
					]
				}
				uni.hideLoading();
			},
			
			/* 点击导航图 */
			clickNav(val) {
				if (val.code === 0) {
					const list = this.navHistoryList.find(item => item.name === val.name)
					this.imgSrc = list.imgList[0]
					this.videoSrc = list.video
					switch(val.name){
						case '入园接车区':
						this.videoMpTitle = '车检历史图片—' + val.name
						this.videoTitle = '车检实时视频—' + val.name
						break
						case '外观检查区':
						this.videoMpTitle = '车检实时图片—' + val.name
						this.videoTitle = '车检实时视频—' + val.name
						// this.imgSrc = 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3596172441,404955435&fm=15&gp=0.jpg'
						break
						case '环保检查区':
						this.videoMpTitle = '车检实时图片—' + val.name
						this.videoTitle = '车检实时视频—' + val.title
						// this.imgSrc = 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Falipic.files.mozhan.com%2Fueditor%2Fimage%2F20180622%2F1529654519801555.jpg&refer=http%3A%2F%2Falipic.files.mozhan.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1611911269&t=0045bd699c4d0c442aa9bca92e88fb48'
						break
						case '安检':
						this.videoMpTitle = '车检实时图片—' + val.name
						this.videoTitle = '车检实时视频—' + val.name
						// this.imgSrc = 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fmmbiz.qpic.cn%2Fmmbiz_png%2F2RSxl12y0qMZUxIhicNBxEblbicluyzfytuJJiamzcwTluz3FGmhKiaEpebjib23TdW5ekAPiazXh9bfF5CwqOLfhmSg%2F640%3Fwx_fmt%3Dpng&refer=http%3A%2F%2Fmmbiz.qpic.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1611911313&t=8c7a91e4e72f6ae283a67d9604683aa2'
						break
						case '路试':
						this.videoMpTitle = '车检实时图片—' + val.name
						this.videoTitle = '车检实时视频—' + val.name
						// this.imgSrc = 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimage.bitautoimg.com%2Fappimage%2Fmedia%2F20171023%2Fw1920_h1080_00ba688d34ea4840a557b2d1f40e3051.jpeg&refer=http%3A%2F%2Fimage.bitautoimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1611911334&t=42678ce4b3b1f984523eab4f3d8d3287'
						break
						case '停车区域':
						this.videoMpTitle = '车检实时图片—' + val.name
						this.videoTitle = '车检实时视频—' + val.name
						// this.imgSrc = 'https://ss0.baidu.com/94o3dSag_xI4khGko9WTAnF6hhy/baike/pic/item/3801213fb80e7bec0c722b05252eb9389a506bad.jpg'
						break
						case '资料审核':
						this.videoMpTitle = '车检实时图片—' + val.name
						this.videoTitle = '车检实时视频—' + val.name
						// this.imgSrc = 'https://ss2.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy/baike/pic/item/8b13632762d0f703f47163540dfa513d2797c573.jpg'
						break
						case '叫号取车':
						this.videoMpTitle = '车检实时图片—' + val.name
						this.videoTitle = '车检实时视频—' + val.name
						// this.imgSrc = 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=451794391,2141471504&fm=26&gp=0.jpg'
						break
						case '开车出园':
						this.videoMpTitle = '车检实时图片—' + val.name
						this.videoTitle = '车检实时视频—' + val.name
						// this.imgSrc = 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2F04imgmini.eastday.com%2Fmobile%2F20190131%2F20190131124042_4203dc9253ffc4632e0807579d1fec4e_2.jpeg&refer=http%3A%2F%2F04imgmini.eastday.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1611911448&t=425368fece050fa193b10e688ac60380'
						break
					}
				} else {
					this.videoMpTitle = '车检实时图片—暂未完成上个检测项目'
					this.videoTitle = '车检实时视频—暂未完成上个检测项目'
				}
			}
		}
	}
</script>

<style lang="scss">
	.history-content {
		padding: 0 10upx;
		/* 车检视频 */
		.video-wrap {
			width: 100%;
			/* #ifdef MP */
			.img-box {
				height: 160px;
				image {
					width: 100%;
					height: 100%;
				}
			}
			/* #endif */
			video {
				width: 100%;
				height: 160px;
				border-radius: 4px;
			}
		}
		.detail {
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
					opacity: 1;
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
		}
	}
</style>
