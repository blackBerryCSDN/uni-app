<template>
	<view class="plate-content">
		<view
		 class="mix-list-cell"
		  v-for="(item, index) in plateList"
		   :class="border"
		   :key="index"
			hover-class="cell-hover"
			 :hover-stay-time="50">
			<text class="cell-icon iconfont iconchepaihao"></text>
			<text class="cell-tit clamp">{{item.plateNumber}}</text>
			<!-- <text v-if="item.status" class="cell-tip">{{plateStatus(item.status)}}</text> -->
			<text class="cell-more iconfont iconshanchu" @click="deletePlate(item.plateNumber)"></text>
		</view>
		<view v-if="plateList.length === 0" class="buttomStyle">暂无车辆</view>
		<text class="mix-btn" @click="addPlate">新增车辆</text>
	</view>
</template>

<script>
	import {
	    mapState
	} from 'vuex';
	export default {
		data() {
			return {
				plateList: [],  //  车牌列表
				current: 1,
			}
		},
		computed: {
			...mapState(['userInfo']),
		},
		onLoad() {
			this.getPlateList()
		},
		onShow() {
			this.getPlateList()
		},
		methods: {
			/* 车辆状态 */
			plateStatus(val) {
				let str = ''
				if (val === 0) {
					str = '已激活'
				} else {
					str = '未激活'
				}
				return str
			},
			
			/* 获取车牌列表 */
			async getPlateList() {
				uni.showLoading({
				    title: '加载中'
				});
				const result = await this.$myRequest({
					url: '/dtline/member/myLicensePage/' + this.userInfo.id,
					data: {
						id: this.userInfo.id,
						current: this.current
					}
				})
				if (result.code === 0) {
					const plateList = result.data.records
					this.plateList = plateList || []
				}
				uni.hideLoading();
			},
			
			/* 删除车牌 */
			deletePlate(val) {
				uni.showModal({
				    content: '确定删除该车牌么',
				    success: async e => {
				    	if(e.confirm){
							console.log(typeof val)
							const result = await this.$myRequest({
								url: '/dtline/member/unbindingLicense',
								data: {
									id: this.userInfo.id,
									plateNumber: val
								},
								method: 'DELETE'
							})
							// console.log(result)
							if (result.code === 0) {
								this.getPlateList()
								return uni.showToast({
									title: '解绑成功'
								})
								
							}
							uni.showToast({
								icon: 'none',
								title: '该车牌不是您的,无权解绑'
							})
				    	}
				    }
				})
			},
			
			/* 新增车辆 */
			addPlate() {
				uni.navigateTo({
					url: '../add-plate/add-plate'
				})
			}
		}
	}
</script>

<style lang="scss">
	.plate-content {
		.mix-list-cell{
			background-color: #fff;
			display:flex;
			align-items:baseline;
			padding: 20upx $page-row-spacing;
			line-height:60upx;
			position:relative;
			border-bottom: 1px solid #eee;
			
			&.cell-hover{
				background:#fafafa;
			}
		
			.cell-icon{
				color: $theme-color;
				align-self:center;
				width:56upx;
				max-height:60upx;
				font-size:38upx;
			}
			.cell-more{
				align-self: center;
				font-size: 36upx;
				color: $uni-color-primary;
				margin-left:$uni-spacing-row-sm;
			}
			.cell-tit{
				flex: 1;
				font-size: $font-lg;
				color: $font-color-dark;
				margin-right:10upx;
			}
			.cell-tip{
				width: 200upx;
				margin-right: 60upx;
				font-size: $font-sm+2upx;
				color: $font-color-light;
			}
		}
		.mix-btn {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 630upx;
			height: 80upx;
			margin: 80upx auto 30upx;
			font-size: $font-lg;
			color: #fff;
			background-color: $base-color;
			border-radius: 10upx;
			box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
		}
		.buttomStyle {
			text-align: center;
			color: $font-color-light;
			line-height: 60upx;
		}
	}
</style>
