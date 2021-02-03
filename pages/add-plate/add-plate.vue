<template>
	<view class="add-plate-content">
		<view class="input-content">
			<view class="input-item">
				<picker mode="multiSelector" :range="plateList" :value="platesIndex" @change="bindPlateChange">			
					<view>
						{{plateList[0][platesIndex[0]]}}{{plateList[1][platesIndex[1]]}}
					</view>
				</picker>

				<input 
					type="text" 
					:value="master.plateNumber"
					placeholder="请输入车牌号进行绑定"
					maxlength="5"
					data-key="plateNumber"
					@input="plateInputChange"
				/>
			</view>
			<view v-if="bindedShow">
				<view class="input-item">
				  <input
				    type="number"
					disabled="true"
				    :value="master.phoneMob"
				    placeholder="请输入手机号码"
				    maxlength="11"
				    data-key="phoneMob"
				    class="input-mobile"
				    @input="plateInputChange"
				  />
				  <button
				    :disabled="!rightBindCode"
				    class="get-identify"
				    :class="{btnCode: rightBindCode}"
				    @click="getPlateCode"
				  >
				    {{computePlateTime > 0 ? `已发送(${computePlateTime}s)` : '获取验证码'}}
				  </button>
				</view>
				<view class="input-item">
				  <input
				    type="number"
				    :value="master.identify"
				    placeholder="请输入短信验证码"
				    maxlength="4"
				    data-key="identify"
				    @input="plateInputChange"
				  />
				</view>
			</view>
		</view>
		<button class="confirm-btn" :class="submitIndex? '':''" @click="plateSubmit" :disabled="!master.plateNumber || master.plateNumber.length < 5">提交</button>
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
				master: {
					phoneMob: '',
					identify: '',
					plateNumber: '',
					token: ''
				},
				plateList: [
					['京','津','沪','渝','冀','晋','豫','辽','吉','黑','蒙','苏','鲁','皖','浙','闽','鄂','湘','粤','桂','赣','川','贵','云','藏','琼','陕','甘','宁','青','新'],
					['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
					],
				platesIndex: [14,1],
				computePlateTime: 0,  // 计时
				submitIndex: false,
				bindedShow: false,  // 车牌号是否被绑定
			}
		},
		computed: {
			...mapState(['userInfo']),
			rightBindCode() {
				return /^1\d{10}$/.test(this.master.phoneMob)
			}
		},
		methods: {
			...mapMutations(['login']),
			// 车牌选择
			bindPlateChange(e){
				this.platesIndex = e.target.value
			},

			// 表单输入
			plateInputChange(e) {
				const key = e.currentTarget.dataset.key
				this.master[key] = e.detail.value
			},
			
			// 绑定车牌号
			async plateSubmit() {
				const _this = this
				_this.token = uni.getStorageSync('token')
				if (_this.token) {
					_this.submitIndex = true
					uni.showLoading({
					    title: '正在绑定'
					});
					const checkResult = await _this.$loginRequest({
							url: '/dtline/member/checkLicenseIsTied',
							header: {
								'Authorization': 'Bearer ' + _this.token
							},
							data: {
								id: _this.userInfo.id,
								plateNumber: _this.plateList[0][_this.platesIndex[0]] + _this.plateList[1][_this.platesIndex[1]] + _this.master.plateNumber
							}
						})
						uni.hideLoading();
						if (checkResult.code === 0) {
							if (checkResult.msg === '该车牌您已经绑定') {
								uni.showToast({
									icon: 'none',
									title: '该车牌您已经绑定'
								})
								setTimeout(() => {
									uni.navigateBack({
										delta: 1
									})
								}, 1000)
							} else {
								uni.showToast({
									title: '绑定成功'
								})
								uni.navigateBack({
									delta: 1
								})
							}
						} else if (checkResult.msg === '绑定失败') {
							uni.showToast({
								title: '绑定失败'
							})
						} else {
							uni.showToast({
								icon: 'none',
								duration: 2000,
								title: '车牌已有人绑定,请输入原车主手机验证码'
							})
							_this.bindedShow = true
							_this.master.phoneMob = checkResult.data
							if (!_this.master.identify) {
								uni.showToast({
									icon: 'none',
									title: '请输入验证码'
								})
							} else if (_this.identifyCode !== _this.master.identify) {
								uni.showToast({
									icon: 'none',
									title: '验证码不正确，请重新输入'
								})
							} else {
								const result = await _this.$loginRequest({
									url: '/dtline/member/bindingLicense',
									method: 'PUT',
									header: {
										'Authorization': 'Bearer ' + _this.token
									},
									data: {
										id: _this.userInfo.id,
										plateNumber: _this.plateList[0][_this.platesIndex[0]] + _this.plateList[1][_this.platesIndex[1]] + _this.master.plateNumber
									}
								})
								console.log(result)
								if (result.code === 0) {
									uni.showToast({
										title: '绑定成功'
									})
									uni.switchTab({
									 url: '../index/index'
									 })
								} else {
									uni.showToast({
										icon: 'none',
										title: '绑定失败'
									})
								}
							}
						} 
					}
				},
			
			 // 获取验证码
			getPlateCode() {
				if (!this.computePlateTime) {
					this.computePlateTime = 60
					const intervalId = setInterval(() => {
						this.computePlateTime--
						if (this.computePlateTime === 0) {
							clearInterval(intervalId)
						}
					}, 1000)
					this.userPlateBind()
				}
			},
		}
	}
</script>

<style lang="scss">
	page{
			background: #fff;
		}
	.add-plate-content {
		.input-content{
			padding: 60upx;
		}
		.input-item{
			display:flex;
			// flex-direction: column;
			// align-items:flex-start;
			justify-content: space-between;
			padding: 20upx 30upx;
			background:$page-color-light;
			// height: 120upx;
			border-radius: 4px;
			margin-bottom: 50upx;
			&:last-child{
				margin-bottom: 0;
			}
			picker {
				width: 100upx;
				height: 60upx;
				line-height: 60upx;
				font-size: $font-base + 2upx;
				color: $font-color-dark;
			}
			input{
				flex: 1;
				height: 60upx;
				font-size: $font-base + 2upx;
				color: $font-color-dark;
				// width: 100%;
			}
			.input-mobile {
				display: inline;
			}
			.get-identify {
				border: none;
				// width: 180upx;
				background:$page-color-light;
				font-size: $font-base;
				height: 60upx;
				line-height: 60upx;
				color: $font-color-light;
				&::after {
					border: none;
				}
				&.btnCode {
				color: $font-color-dark;
				}
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
