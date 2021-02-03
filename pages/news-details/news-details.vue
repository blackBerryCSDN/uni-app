<template>
	<view class="content">
		<view class="banner">
			<view class="banner-img">
				<image mode="aspectFill" :src="newsDetail.storePic[0].picUrl"></image>	
			</view>

			<view class="banner-des">
				<view class="banner-title">{{newsDetail.storeName}} <br/></view>
				<view class="banner-add">电话：{{newsDetail.storePhone}}<br/></view>
				<view class="banner-add">地址：{{newsDetail.storeAddress}}<br/></view>
				<view class="banner-dis">距离：{{(newsDetail.distance)/1000}}km</view>
			</view>
		</view>
		<view class="banner2">
			<view class="banner2-xq">商家介绍</view>
			<view class="banner2-xq1">{{newsDetail.storeIntroduce}}</view>
		</view>
		
		<!-- 到这去 -->
		<view class="go">
			<button class="go-btn" @click="goLocal">到这去</button>
		</view>
	</view>
    
</template>

<script>
    export default {
        data() {
            return {
				id: null,
				newsDetail: {}
			}
        },
        onLoad(option) {
            this.id = Number(option.id)
			this.loadData()
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
				/* 请求列表详情 */
				const detailRes = await this.$myRequest({
					url: '/dtline/store/' + this.id,
					data: {
						storeNowLongitude: locationRes[1].longitude,
						storeNowLatitude: locationRes[1].latitude
					}
				})
				if (detailRes.code === 0) {
					const newsDetail = detailRes.data
					this.newsDetail = newsDetail || []
				}
				uni.hideLoading()
			},
			
			// 到这去
			goLocal() {
				uni.openLocation({
					latitude: this.newsDetail.storeLatitude,
					longitude: this.newsDetail.storeLongitude
				})
			}
        }
    }
</script>

<style lang="scss" scoped>
	.content {
		.banner {
		    background-color: #fff;
			.banner-img {
			   height: 400upx;
			   image {
			   	width: 100%;
			   	height: 100%;
			   }
			}
			.banner-des {
				font-size: $font-base;
				padding: 10upx 20upx;
				.banner-title{
					width: 100%;
					font-size: $font-lg;
					margin-bottom: 10upx;
					font-weight: bold;
				}
			}
		}
		.banner2 {
			margin-top: 20rpx;
			padding: 20upx;
			background-color: #fff;
			font-size: $font-sm;
			.banner2-xq{
				font-size: $font-lg;
				margin: 0 0 10upx 0;
			}
			.banner2-xq1 {
				text-indent: 40upx;
				line-height: 40upx;
			}
		}
		/* 订单支付 */
		.go {
			margin: 40upx 0;
			.go-btn {
				width: 90%;
				background-color: $font-color-spec;
				color: #fff;
				line-height: 80upx;
				font-size: $font-lg;
			}
		}
		
	}
</style>