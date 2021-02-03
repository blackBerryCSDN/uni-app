<template>
	<view class="update-info-content">
		<view class="input-content">
			<view class="input-item">
				<!-- <text class="tit">车牌号</text> -->
				<input 
					type="text" 
					:value="wxData.userName"
					placeholder="请输入名字"
					data-key="userName"
					@input="wxInputChange"
				/>
			</view>
		</view>
		<button
		 class="confirm-btn"
		  :class="submitIndex? '':''"
		   @click="nameSubmit"
			:disabled="wxData.userName === userInfo.nickName || !wxData.userName">
			保存
			</button>
	</view>
</template>

<script>
	import {
	    mapState,
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
				wxData: {
					userName: ''
				},
				submitIndex: false,
			}
		},
		onLoad() {
			this.wxData.userName = this.userInfo.nickName
		},
		computed: {
			...mapState(['userInfo'])
		},
		methods: {
			...mapMutations(['userName']),
			// 表单输入
			wxInputChange(e) {
				const key = e.currentTarget.dataset.key
				console.log(key)
				this.wxData[key] = e.detail.value
			},
			
			// 保存
			async nameSubmit() {
				this.submitIndex = true
				let token = uni.getStorageSync('token')
				console.log(token)
				if (token) {
					const result = await this.$myRequest({
						url: '/dtline/member/updateByIdAPP',
						data: {
							id: this.userInfo.id,
							nickName: this.wxData.userName
						},
						method: 'PUT',
						header: {
							'Authorization': 'Bearer ' + token
						},
					})
					if (result.code === 0) {
						this.userName(this.wxData.userName)
						uni.showToast({
							title: '修改成功'
						})
						uni.navigateBack({
							delta: 1
						})
					}
				}
			},
		}
	}
</script>

<style lang="scss">
	.update-info-content {
		padding: 0 10upx;
		.input-content{
			// padding: 60upx;
		}
		.input-item{
			display:flex;
			justify-content: space-between;
			padding: 20upx 30upx;
			// background:$page-color-light;
			border-bottom: 1px solid $border-color-base;
			margin-bottom: 50upx;
			input{
				height: 60upx;
				font-size: $font-base + 2upx;
				color: $font-color-dark;
				width: 100%;
			}
		}
		
		.confirm-btn{
			width: 630upx;
			height: 80upx;
			line-height: 80upx;
			border-radius: 50px;
			margin-top: 70upx;
			background: $uni-color-primary;
			color: #fff;
			font-size: $font-lg;
			&:after{
				border-radius: 100px;
			}
			&:active{
				background-color: #e02850;
			}
		}
	}

</style>
