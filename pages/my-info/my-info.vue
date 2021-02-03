<template>
	<view class="plate-content">
		<view
		 class="mix-list-cell"
			hover-class="cell-hover"
			@click="updatePortrait"
			 :hover-stay-time="50">
			<text class="cell-tit clamp">头像</text>
			<image class="portrait" :src="userInfo.portrait || '/static/profile/missing-face.png'"></image>
		</view>
		<view
		 class="mix-list-cell"
			hover-class="cell-hover"
			@click="updateInfo"
			 :hover-stay-time="50">
			<text class="cell-tit clamp">昵称</text>
			<view>{{userInfo.nickName}}</view>
		</view>
	</view>
</template>


<script>
	import { pathToBase64, base64ToPath } from '../../js_sdk/gsq-image-tools/image-tools/index.js'
	import {
	    mapState,
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
				
			}
		},
		computed: {
			...mapState(['userInfo'])
		},
		methods: {
			...mapMutations(['userPortrait']),
			/* 修改名字 */
			updateInfo() {
				uni.navigateTo({
					url: '../update-info/update-info'
				})
			},

			/* 修改头像 */
			updatePortrait() {
				uni.chooseImage({
					count: 1,
					// sourceType: ['album'],
					success:(res) => {
						console.log(res.tempFilePaths[0])
						pathToBase64(res.tempFilePaths[0]).then(async base64 => {
						console.log(base64)
						let token = uni.getStorageSync('token')
						console.log(token)
						if (token) {
							const result = await this.$myRequest({
								url: '/dtline/member/updateByIdAPP',
								data: {
									id: this.userInfo.id,
									portrait: base64
								},
								method: 'PUT',
								header: {
									'Authorization': 'Bearer ' + token
								}
							 })
							 console.log(result)
							 if (result.code === 0) {
								  this.userPortrait(res.tempFilePaths[0])
								  uni.showToast({
									title: '修改头像成功'
								  })
							 }	
						} 
				    })
				  }
				})
			},
			
			
		}
	}
</script>

<style lang="scss">
	.plate-content {
		.mix-list-cell{
			background-color: #fff;
			display:flex;
			align-items: center;
			justify-content: center;
			padding: 20upx $page-row-spacing;
			// line-height:60upx;
			// position:relative;
			border-bottom: 1px solid #eee;
			
			&.cell-hover{
				background:#fafafa;
			}
			.portrait{
				width: 80upx;
				height: 80upx;
				// border:5upx solid #fff;
				border-radius: 6upx;
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
				font-size: $font-sm+2upx;
				color: $font-color-light;
			}
		}
		.mix-list-cell:nth-child(2) .cell-icon {
			font-size:58upx;
		}
	}
</style>
