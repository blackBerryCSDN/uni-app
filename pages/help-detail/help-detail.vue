<template>
	<view class="help-detail-content">
		<view class="process">
			<view class="title">{{helpList.title}}</view>
			<view class="desc">
				<rich-text :nodes="helpList.content"></rich-text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '',
				id: '',
				helpList: {}  // 车检流程数据
			}
		},
		onLoad(option) {
			this.id = Number(option.id)
			this.title = decodeURIComponent(option.title)
			this.loadData()
		},
		onShow() {	
			uni.setNavigationBarTitle({
				title: this.title
			});
		},
		methods: {
			/*
			获取后台数据
			*/
			async loadData() {
				/* 
				请求消息详情
				*/
			   uni.showLoading({
			       title: '加载中'
			   });
				const detailRes = await this.$myRequest({
					url: '/dtline/article/' + this.id,
				})
				if (detailRes.code === 0) {
					const helpList = detailRes.data
					this.helpList = helpList || [];
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
	.help-detail-content {
		padding: 0 10upx;
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
				width: 710upx;
				height: 120px;
				margin: 0 auto;
				margin-bottom: 20upx;
				image {
					width: 100%;
					height: 100%;
				}
			}
		}
		
		.why {
			view {
				margin: 10upx;
			}
			view:first-child {
				font-weight: bold;
			}
		}
	}
</style>
