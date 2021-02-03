<template>
	<view class="notice-detail-content">
		<view class="process">
			<view class="title">{{detailData.title}}</view>
			<view class="desc">{{detailData.content}}</view>
			<view class="img-box" v-if="detailData.thumb">
				<image mode="aspectFill" :src="detailData.thumb"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				detailData: {}
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
				/* 
				请求消息详情
				 */
				const detailRes = await this.$myRequest({
					url: '/dtline/messagelog/' + this.id,
				})
				if (detailRes.code === 0) {
					const detailData = detailRes.data
					this.detailData = detailData || [];
					console.log(this.detailData)
				}
				uni.hideLoading();
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #fff;
	}
	.notice-detail-content {
		.process {
			.title {
				font-size: $font-lg +4upx;
				margin: 10upx;
				font-weight: bold;
			}
			.desc {
				font-size: $font-base;
				margin: 20upx 10upx;
				color: $font-color-base;
			}
			.img-box {
				width: 730upx;
				height: 200px;
				margin: 0 auto;
				margin-bottom: 20upx;
				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>
