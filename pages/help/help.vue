<template>
	<view class="help-content">
		<uni-search-bar :radius="100" @confirm="confirm" @cancel="cancel"></uni-search-bar>
		<view class="help-body">
			<view class="help-item" v-for="(item, index) in displayHelpList" :key="index" @click="helpDtail(item)">
				<view class="title">{{item.title}}</view>
				<view class="clam">{{item.summary}}</view>
			</view>
			
			<view v-if="bottomShow" class="buttomStyle">已经到底了!</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	export default {
		data() {
			return {
				current: 1, // 当前页数
				displayHelpList: [], // 当前显示列表数据
				helpList: [],  // 帮助列表数据
				isLast: true  ,// 是否是最后一页
				bottomShow: false  // 底部是否显示
			}
		},
		computed: {
			...mapState(['access_token'])
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
				const helpRes = await this.$myRequest({
					url: '/dtline/article/page',
					data: {
						current: this.current,
						isShow: '1'
					},
					header: {
						'Authorization': 'Bearer ' + this.access_token
					}
				})
				console.log(helpRes)
				if (helpRes.code === 0) {
					const helpList = helpRes.data.records
					this.helpList = [...this.helpList, ...helpList] || [];
					this.displayHelpList = this.helpList
					if (helpList.length < 10) {
						this.isLast = false
						if (this.helpList.length > 10) {
							this.bottomShow = true
						}
					}
				}
				uni.hideLoading();
			},
			
			/* 帮助详情 */
			helpDtail(val) {
				const url = '../help-detail/help-detail'
				const data = {
					id: val.id,
					title: val.title
				}
				this.$navTo.togo(url, data)
			},
			 
			 /* 搜索 */
			confirm(e) {
				this.displayHelpList = []
				this.displayHelpList.push(this.helpList.find((item) => item.title === e.value))
			},
			
			 /* 取消 */
			cancel(e) {
				this.displayHelpList = this.helpList
			},
		}
	}
</script>

<style lang="scss">
	.help-content {
		.uni-searchbar {
			background-color: #6db2f9!important;
			.uni-searchbar__cancel {
				color: #fff;
			}
		}
		.help-body {
			// padding: 0 10upx;
			font-size: $font-base;
			.help-item {
				background-color: #fff;
				border-radius: 4px;
				padding: 20upx;
				margin: 10upx 0;
				.title {
					font-size: $font-lg +4upx;
					padding: 10upx 0;
					font-weight: bold;
				}
				.clam {
					width: 600upx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					display: block;
				}
			}
			.buttomStyle {
				text-align: center;
				color: $font-color-light;
				line-height: 60upx;
			}
		}
	}

</style>
