<template>
	<view class="notice-content">
		<view
		 class="notice-item"
		  @click="noticeDetail(item.id)"
		   v-for="(item, index) in noticeData"
		   :key="index"
		   >
			<text class="time">{{item.createTime}}</text>
			<view class="content">
				<text class="title">{{item.title}}</text>
				<view class="img-wrapper" v-if="item.thumb">
					<image class="pic" :src="item.thumb"></image>
				</view>
				<text class="introduce clam">
					{{item.content}}
				</text>
				<view class="bot b-t">
					<text>查看详情</text>
					<text class="more-icon yticon icon-you"></text>
				</view>
			</view>
		</view>
		<view v-if="noticeData.length === 0" class="buttomStyle">暂无消息</view>
		<view v-if="bottomShow" class="buttomStyle">已经到底了!</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				current: 1,  // 当前页数
				noticeData: [],  // 消息列表数据
				isLast: true  ,// 是否是最后一页
				bottomShow: false  // 底部是否显示
			}
		},
		computed: {
			...mapState(['userInfo'])
		},
		onLoad() {
			this.loadData()
		},
		onReachBottom(){
			if (this.isLast) {
				this.current++
				this.loadData()
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
				/* 请求列表详情 */
				const noticeRes = await this.$myRequest({
					url: '/dtline/messagelog/page',
					data: {
						toMemberId: this.userInfo.id,
						current: this.current,
					},
				})
				if (noticeRes.code === 0) {
					const noticeData = noticeRes.data.records
					this.noticeData = [...this.noticeData, ...noticeData] || [];
					if (noticeData.length < 10) {
						this.isLast = false
						if (this.noticeData.length > 10)
						this.bottomShow = true
					}
				}
				uni.hideLoading();
			},
			
			/* 消息详情 */
			noticeDetail(val) {
				let textObj = val
				uni.navigateTo({
					url: '../notice-detail/notice-detail?id=' + textObj
				})
			}
		}
	}
</script>

<style lang='scss'>
	page {
		background-color: #f7f7f7;
		padding-bottom: 30upx;
	}
	.notice-content {
		.notice-item {
			display: flex;
			flex-direction: column;
			align-items: center;
			.time {
				display: flex;
				align-items: center;
				justify-content: center;
				height: 80upx;
				padding-top: 10upx;
				font-size: 26upx;
				color: #7d7d7d;
			}
			
			.content {
				width: 710upx;
				padding: 0 24upx;
				background-color: #fff;
				border-radius: 4upx;
			}
			
			.title {
				display: flex;
				align-items: center;
				height: 90upx;
				font-size: 32upx;
				color: #303133;
			}
			
			.img-wrapper {
				width: 100%;
				height: 260upx;
				position: relative;
			}
			
			.pic {
				display: block;
				width: 100%;
				height: 100%;
				border-radius: 6upx;
			}
			
			.cover {
				display: flex;
				justify-content: center;
				align-items: center;
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				background-color: rgba(0, 0, 0, .5);
				font-size: 36upx;
				color: #fff;
			}
			
			.introduce {
				display: inline-block;
				padding: 16upx 0;
				font-size: 28upx;
				color: #606266;
				line-height: 30upx;
			}
			.clam {
				width: 600upx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				display: block;
			}
			
			.bot {
				display: flex;
				align-items: center;
				justify-content: space-between;
				height: 60upx;
				font-size: 24upx;
				color: #707070;
				position: relative;
			}
			
			.more-icon {
				font-size: 32upx;
			}
		}
		.buttomStyle {
			text-align: center;
			color: $font-color-light;
			line-height: 60upx;
		}
	}
</style>
