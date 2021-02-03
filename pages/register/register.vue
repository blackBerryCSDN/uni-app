<template>
	<view class="container">
		<view class="wrapper">
			<view class="logo">
			  <image src="../../static/logo.png"></image>
			</view>
			<!-- 手机号注册 -->
			<view v-if="isRegister">
				<view class="input-content">
				  <view class="input-item">
				    <input
				      type="number"
				      :value="wxData.phoneMob"
				      placeholder="请输入手机号码"
				      maxlength="11"
				      data-key="phoneMob"
				      class="input-mobile"
				      @input="wxInputChange"
				    />
				    <button
				      :disabled="!rightCode"
				      class="get-identify"
				      :class="{btnCode: rightCode}"
				      @click="getCode">
				      {{computeTime > 0 ? `已发送(${computeTime}s)` : '获取验证码'}}</button>
				  </view>
				  <view class="input-item">
				    <input
				      type="number"
				      :value="wxData.identify"
				      placeholder="请输入短信验证码"
				      maxlength="4"
				      data-key="identify"
				      @input="wxInputChange"
				    />
				  </view>
				  <view class="input-item">
				    <input
				      type="number"
				      :value="wxData.password"
				      placeholder="请输入密码"
				      maxlength="20"
				      data-key="password"
				      @input="wxInputChange"
				    />
				  </view>
				  <view class="input-item">
				    <picker mode="multiSelector" :range="plateList" :value="platesIndex" @change="bindPlateChange">
				    	<view>
				    		{{plateList[0][platesIndex[0]]}}{{plateList[1][platesIndex[1]]}}
				    	</view>
				    </picker>
				    <input
				      type="text"
				      :value="wxData.plateNumber"
				      placeholder="请输入车牌号进行绑定"
				      maxlength="5"
				      data-key="plateNumber"
				      @input="wxInputChange"
				    />
				  </view>
				  <button class="confirm-btn" :class="registerIndex? 'active':''" @click="register" :disabled="!wxData.phoneMob || !wxData.identify || !wxData.password">注册</button>
				  <view class="forget-bottom">
				  	<view @click="notRegister" class="forget-section">
				  		已有账号
				  	</view>
				  </view>
				</view>
			</view>
			
			
			<!-- 车牌号绑定 -->
			<view v-if="plateIsBind">
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
			      <button class="confirm-btn" :class="submitIndex? 'active':''" @click="plateSubmit" :disabled="!master.plateNumber || master.plateNumber.length < 5">提交</button>
			      <button class="primary-btn" :class="primaryIndex? 'active':''" @click="cancle">暂不绑定</button>
			    </view>
		</view>	
	</view>
</template>

<script>
	// aes加密解密
	import Crypto from '../../util/aes/public.js';
	export default {
		data() {
			return {
				isRegister: true,  // 用户是否绑定
				plateIsBind: false,  // 车牌号是否被绑定
				wxData: {
					phoneMob: '',	
					identify: '',
					password:'',
					plateNumber: ''
				},
				master: {
					phoneMob: '',
					identify: '',
					plateNumber: ''
				},
				registerIndex: false,
				plateList: [
					['京','津','沪','渝','冀','晋','豫','辽','吉','黑','蒙','苏','鲁','皖','浙','闽','鄂','湘','粤','桂','赣','川','贵','云','藏','琼','陕','甘','宁','青','新'],
					['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
					],
				platesIndex: [14,1],
				computeTime: 0,  // 计时
				computePlateTime: 0,  // 计时
				identifyCode: '', // 暂存验证码
				user_info: {},  // 暂存用户信息
				token: ''       // 暂存token信息
			}
		},
		computed: {
			rightCode() {
				return /^1\d{10}$/.test(this.wxData.phoneMob)
			},
			rightBindCode() {
				return /^1\d{10}$/.test(this.master.phoneMob)
			}
		},
		methods: {
			// 车牌选择
			bindPlateChange(e){
				this.platesIndex = e.target.value
			},
			
			// 表单输入
			wxInputChange(e) {
				const key = e.currentTarget.dataset.key
				console.log(key)
				this.wxData[key] = e.detail.value
			},
			
			// 获取验证码
			getCode() {
				if (!this.computeTime) {
					this.computeTime = 60
					const intervalId = setInterval(() => {
						this.computeTime--
						if (this.computeTime === 0) {
							clearInterval(intervalId)
						}
					}, 1000)
					this.userBind()
				}
			},
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
			// 发送验证码
			async userBind() {
				const _this = this
				const codeResult = await _this.$loginRequest({
					url: '/admin/mobile/'+_this.wxData.phoneMob,
					header: {
						 'Authorization': 'Bearer'
					},
				})
				console.log('验证码', codeResult)
				if (codeResult.msg === '验证码发送过频繁') {
					uni.showToast({
						icon: 'none',
						title: '验证码发送频繁'
					})
				} else {
					_this.identifyCode = codeResult.msg
				}
			},
			async userPlateBind() {
				const _this = this
				const codeResult = await _this.$loginRequest({
					url: '/admin/mobile/'+_this.master.phoneMob,
					header: {
						 'Authorization': 'Bearer'
					},
				})
				console.log('验证码', codeResult)
				if (codeResult.msg === '验证码发送过频繁') {
					uni.showToast({
						icon: 'none',
						title: '验证码发送频繁'
					})
				} else {
					_this.identifyCode = codeResult.msg
				}
			},
			
			// 注册
			async register() {
				const _this = this
				_this.registerIndex = true
				_this.user_info.phoneMob = _this.wxData.phoneMob
				_this.user_info.password = _this.wxData.password
				if (_this.wxData.plateNumber && _this.wxData.plateNumber.length === 5) {
					_this.user_info.plateNumber = _this.plateList[0][_this.platesIndex[0]] + _this.plateList[1][_this.platesIndex[1]] + _this.wxData.plateNumber
				}
				if (_this.identifyCode === _this.wxData.identify) {
					console.log(_this.user_info)
					const result = await _this.$loginRequest({
						url: '/dtline/member/regist',
						method: 'POST',
						data: {
							plateNumber: _this.user_info.plateNumber,
							phoneMob: _this.user_info.phoneMob,
							password: Crypto.encrypt(_this.user_info.password)
						}
					})
					console.log(result)
					if (result.code === 0) {
						if (result.msg === '注册成功') {
							uni.showToast({
								icon: 'none',
								title: '注册成功'
							})
						} else {
							uni.showToast({
								icon: 'none',
								title: '该车牌您已经绑定'
							})
						}
						// 获取token
						const tokenResult = await _this.$loginRequest({
							url: '/auth/mobile/token/sms?mobile=SMS@'+_this.wxData.phoneMob+'&code='+_this.wxData.identify+'&grant_type=mobile',
							method: 'POST',
							header: {
								'Authorization': 'Basic cGlnOnBpZw=='
							},
						})
						if (tokenResult.access_token) {
							_this.token = tokenResult.access_token
							// _this.tokenSet(tokenResult.access_token)
							uni.navigateTo({
								url: '../login/login'
							})
						}
					} else {
						if (result.msg === '手机号重复') {
							return uni.showToast({
								icon: 'none',
								title: '您已注册该账号,请重新输入'
							})
						} else {
							// 获取token
							const tokenResult = await _this.$loginRequest({
								url: '/auth/mobile/token/sms?mobile=SMS@'+_this.wxData.phoneMob+'&code='+_this.wxData.identify+'&grant_type=mobile',
								method: 'POST',
								header: {
									'Authorization': 'Basic cGlnOnBpZw=='
								},
							})
							if (tokenResult.access_token) {
								_this.token = tokenResult.access_token
								// _this.tokenSet(tokenResult.access_token)
								_this.isRegister = false
								_this.plateIsBind = true
								_this.master.phoneMob = result.data.plateMasterPhone
								_this.master.plateNumber = _this.wxData.plateNumber
								_this.user_Info.id = result.data.id
								uni.showToast({
									icon: 'none',
									title: '车牌已有人绑定,请输入原车主手机验证码'
								})
							}
						}
					}
				}
				else {
					uni.showToast({
						icon: 'none',
						title: '验证码错误'
					})
				}
			},
			
			// 绑定车牌号
			async plateSubmit() {
				const _this = this
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
							id: _this.user_Info.id,
							plateNumber: _this.plateList[0][_this.platesIndex[0]] + _this.plateList[1][_this.platesIndex[1]] +  _this.master.plateNumber
						}
					})
					uni.hideLoading();
					if (checkResult.code === 0) {
						if (checkResult.msg === '该车牌您已经绑定') {
							uni.showToast({
								title: '该车牌您已经绑定'
							}) 
							uni.switchTab({
							 url: '../login/login'
							 })
						} else {
							uni.showToast({
								title: '绑定成功'
							}) 
							uni.switchTab({
							 url: '../login/login'
							 })
						}
					} else if (checkResult.msg === '绑定失败') {
						uni.showToast({
							icon: 'none',
							title: '绑定失败'
						})
					} else {
						uni.showToast({
							icon: 'none',
							title: '车牌已有人绑定,请输入原车主手机验证码'
						})
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
									id: _this.user_Info.id,
									plateNumber: _this.plateList[0][_this.platesIndex[0]] + _this.plateList[1][_this.platesIndex[1]] + _this.master.plateNumber
								}
							})
							console.log(result)
							if (result.code === 0) {
								uni.showToast({
									title: '绑定成功'
								})
								uni.switchTab({
								 url: '../login/login'
								 })
							} else {
								uni.showToast({
									icon: 'none',
									title: '绑定失败'
								})
							}
						}
					} 
			},
			
			// 取消，暂不绑定
			cancle() {
				this.primaryIndex = true
				uni.switchTab({
				 url: '../login/login'
				 })
			},
			
			// 取消注册
			notRegister() {
				uni.navigateTo({
					url: '../login/login'
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
			background: #fff;
		}
	.container{
		padding-top: 40px;
		position:relative;
		width: 100vw;
		// height: 100vh;
		overflow: hidden;
		background: #fff;
	}
	.wrapper{
		position:relative;
		z-index: 90;
		background: #fff;
		padding-bottom: 40upx;
	}
	.input-content{
		padding: 0 60upx;
	}
	.logo {
		width: 200upx;
		height: 200upx;
		margin: 40upx auto;
		image {
			width: 100%;
			height: 100%;
		}
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
	.primary-btn{
		width: 630upx;
		height: 80upx;
		line-height: 80upx;
		border-radius: 50px;
		margin-top: 70upx;
		background: $uni-color-success;
		color: #fff;
		font-size: $font-lg;
		&:after{
			border-radius: 100px;
		}
		&:active{
			background-color: #17c535;
		}
	}
	.forget-bottom {
		display: flex;
		justify-content: space-around;
		.forget-section{
			font-size: $font-sm+2upx;
			color: $font-color-spec;
			text-align: center;
			margin-top: 40upx;
		}
	}
</style>
