<template>
	<view class="news-content">
		  <view class="news-item" v-for="(item,index) in newsList" :key="index" @click="ToDel(item)">
		  	<view class="item-left">
		  		<view class="ImgBOX">
		  			<image mode="aspectFill" :src="item.storePic[0].picUrl"></image>
		  		</view>
		  	</view>
		  	<view class="item-right">
		  		<view class="title clamp">{{item.storeName}}</view>
		  		<view><uni-rate size="12" :value="item.storeScore"></uni-rate></view>
		  		<view><span class="col">联系电话：</span>{{item.storePhone}}</view>
		  		<view class="clamp"><span class="col">地址：</span>{{item.storeAddress}}</view>
		  		<view><span class="col">距离：</span>{{(item.distance)/1000}}km</view>
		  	</view>
		  </view>
		  
		  <view v-if="bottomShow" class="buttomStyle">已经到底了!</view>
	</view>
</template>

<script>
	import uniRate from "@/components/uni-rate/uni-rate.vue"//星级评分
	export default {
		components: {uniRate},
		data() {
			return {
				locationRes: [], // 当前经纬度
				newsList: [],  // 快修列表数据
				current: 1,  // 当前页数
				isLast: true  ,// 是否是最后一页
				bottomShow: false  // 底部是否显示
			};
		},

		onLoad() {
			this.loadData()
		},
		onReachBottom(){
			if (this.isLast) {
				this.current++
				this.getNews()
			}
		},
		methods: {
			/*
			获取后台数据
			*/
			async loadData() {
				uni.showLoading({
				    title: '加载中'
				});
				const locationRes = await uni.getLocation({
					type: 'gcj02',
					altitude: true,
				})
				this.locationRes = locationRes || []
				this.getNews()
			},
			
			/* 请求快修列表 */
			async getNews() {
				const newsRes = await this.$myRequest({
					url: '/dtline/store/pageAPP',
					data: {
						current: this.current,
						storeNowLongitude: this.locationRes[1].longitude,
						storeNowLatitude: this.locationRes[1].latitude
					},
				})
				if (newsRes.code === 0) {
					const newsList = newsRes.data.records
					this.newsList = [...this.newsList, ...newsList] || [];
					if (newsList.length < 10) {
						this.isLast = false
						if (this.newsList.length > 10)
						this.bottomShow = true
					}
				}
				uni.hideLoading();
			},
			
			
			ToDel(val) {
				let textObj = val.id
				uni.navigateTo({
					url: '../news-details/news-details?id=' + textObj
				})
			},
		},
	};
	
</script>

<style lang="scss" scoped>
	.news-content {
		// padding: 0 10upx;
		.news-item {
			display: flex;
			margin-bottom: 10upx;
			align-items: center;
			background-color: #fff;
			padding: 20upx;
			.item-left {
				width: 200upx;
				height: 200upx;
				margin-right: 30upx;
				.ImgBOX {
					width: 100%;
					height: 100%;
					image {
						width: 100%;
						height: 100%;
					}
				}
			}
			.item-right {
				font-size: $font-sm;
				color: $font-color-dark;
				.col {
					color: $font-color-light;
				}
				.title {
					font-size: $font-lg;
				}
				view {
					margin: 10upx;
				}
			}
		}	
		.buttomStyle {
			text-align: center;
			color: $font-color-light;
			line-height: 60upx;
		}
	}
</style>