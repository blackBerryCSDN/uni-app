<template>
	<view class="container">
		<!-- <view class="right-top-sign"></view> -->
		<!-- 设置白色背景防止软键盘把下部绝对定位元素顶上来盖住输入框等 -->
		<view class="wrapper">
			<!-- #ifdef MP -->
			<view>
				<!-- 微信授权 -->
				  <view v-if="!isAuth">
				    <view class="welcome">
				      欢迎使用普源车检智能化应用小程序!
				    </view>
				    <view class="logo">
				      <image src="../../static/logo.png"></image>
				    </view>
				    <view>
				      <button class="primary-btn" open-type="getUserInfo" type="primary" @getuserinfo="auth">微信一键授权</button>
				    </view>
				  </view>
				  
				<!-- 手机号登录 -->
				  <view v-if="isBind">
				    <view class="input-content">
				      <view class="input-item">
				        <!-- <text class="tit">手机号码</text> -->
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
				        <!-- <text class="tit">验证码</text> -->
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
					  <button class="confirm-btn" :class="loginIndex? 'active':''" @click="submit" :disabled="!wxData.phoneMob || !wxData.identify">登录</button>
					  <button class="primary-btn" :class="primaryIndex? 'active':''" @click="notLogin">暂不登录</button>
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
				      <button class="confirm-btn" :class="submitIndex? 'active':''" @click="plateSubmit" :disabled="!master.plateNumber || master.plateNumber.length < 5">提交</button>
				      <button class="primary-btn" :class="primaryIndex? 'active':''" @click="cancle">暂不绑定</button>
				    </view>
			</view>
			<!-- #endif -->
			
			<!-- #ifndef MP -->
			<view class="logo">
			  <image src="../../static/logo.png"></image>
			</view>
			<view v-if="passwordShow" class="input-content">
				<view class="input-item">
					<!-- <text class="tit">手机号码</text> -->
					<input 
						type="number" 
						:value="mobile" 
						placeholder="请输入账号或手机"
						maxlength="11"
						data-key="mobile"
						@input="inputChange"
					/>
				</view>
				<view class="input-item">
					<!-- <text class="tit">验证码</text> -->
					<input 
						type="mobile" 
						:value="password" 
						placeholder="请输入密码"
						placeholder-class="input-empty"
						maxlength="20"
						password 
						data-key="password"
						@input="inputChange"
					/>
				</view>
				<button class="confirm-btn" @click="pasLogin" :disabled="!mobile || !password">登录</button>
			</view>
			<view v-else class="input-content">
				<view class="input-item">
				  <!-- <text class="tit">手机号码</text> -->
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
				  <!-- <text class="tit">验证码</text> -->
				  <input
				    type="number"
				    :value="wxData.identify"
				    placeholder="请输入短信验证码"
				    maxlength="4"
				    data-key="identify"
				    @input="wxInputChange"
				  />
				</view>
				<button class="confirm-btn" @click="identifyLogin" :disabled="!wxData.phoneMob || !wxData.identify">登录</button>
			</view>
			<view class="forget-bottom">
				<view @click="register" class="forget-section">
					注册账号
				</view>
				<view @click="loginType" class="forget-section">
					{{passwordShow? '手机验证码登录':'密码登录'}}
				</view>
			</view>
			<!-- #endif -->
		</view>	
	</view>
</template>

<script>
	import {
		mapState,
	    mapMutations  
	} from 'vuex';
	// aes加密解密
	import Crypto from '../../util/aes/public.js';
	export default{
		data(){
			return {
				isAuth: false, // 用户是否授权
				isBind: false,  // 用户是否绑定
				plateIsBind: false,  // 车牌号是否绑定
				loginIndex: false,
				submitIndex: false,
				primaryIndex: false,
				bindedShow: false,  // 车牌号是否被绑定
				wxData: {
					phoneMob: '',	
					identify: '',
					plateNumber: ''
				},
				master: {
					phoneMob: '',
					identify: '',
					plateNumber: ''
				},
				plateList: [
					['京','津','沪','渝','冀','晋','豫','辽','吉','黑','蒙','苏','鲁','皖','浙','闽','鄂','湘','粤','桂','赣','川','贵','云','藏','琼','陕','甘','宁','青','新'],
					['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
					],
				platesIndex: [14,1],
				computeTime: 0,  // 计时
				computePlateTime: 0,  // 计时
				wxLoading: false,
				mobile: '',
				password: '',
				identifyCode: '',
				user_info: {} ,// 用户信息
				passwordShow: true // 手机密码登录
			}
		},
		computed: {
			...mapState(['userInfo', 'access_token']),
			rightCode() {
				return /^1\d{10}$/.test(this.wxData.phoneMob)
			},
			rightBindCode() {
				return /^1\d{10}$/.test(this.master.phoneMob)
			}
		},
		onLoad(){
			 // 初始化页面,执行查看已授权信息
			 // #ifdef MP
			this.getSettingMes();
			// #endif
		},
		methods: {
			...mapMutations(['login', 'tokenSet']),
			/**
			 * 小程序模块功能
			 */
			// #ifdef MP
			// 查看已授权选项
			getSettingMes() {
				 const _this = this;
				 uni.getSetting({
					 success(res) {
						 if (res.authSetting['scope.userInfo']) {
							 // 用户信息已授权，获取用户信息
							 _this.isAuth = true
							 _this.getUser()
						 } else if (!res.authSetting['scope.userInfo']) {
							 console.log("需要点击按钮手动授权")
						 }
					 },
					 fail() {
						 console.log("获取已授权选项失败")
					 }
				 })
			},
			
			// 手动授权方法
			auth(e) {
				 // 获取用户信息
				 this.isAuth = true
				 this.getUser()
			},
			
			// 获取用户信息
			getUser() {
				const _this = this
				uni.getUserInfo({
					 // 获取信息成功
					 success(res) {
						 _this.user_info.nickName = res.userInfo.nickName
						 _this.user_info.portrait = res.userInfo.avatarUrl
						 // 成功后进行登录,获取code
						 uni.login({
						   provider: 'weixin',
						   success (res) {
							 const code2 = res.code;
							 if (code2) {
								 _this.userAdmin()
							 } else {
							   console.log('登录失败！' + res.errMsg)
							 }
						   }
						 })
					 },
					 fail() {
						 _this.isAuth = false
						 console.log("获取用户信息失败");
					 }
				})
			},
				
			// 判断用户账号是否存在
			async userAdmin() {
				const _this = this
				uni.login({
				  provider: 'weixin',
				  async success (res) {
					 if (res.code) {
						 const loginResult = await _this.$loginRequest({
						 	 url: '/auth/mobile/token/social?grant_type=mobil&mobile=MINI@'+res.code,
						 	 method: 'POST',
						 	 header: {
						 			'Authorization': 'Basic cGlnOnBpZw=='
						 		}
						 })
						 if(loginResult === 401) {
								return _this.isBind = true
							 }
							 _this.tokenSet(loginResult.access_token)
							 _this.user_info.id = loginResult.user_info.id
							 _this.userLogin()
						 }
					}
				})
			},
			
			// 登录
			async userLogin() {
				uni.showLoading({
				    title: '正在登陆'
				});
				const _this = this
				let data = {
					userId: _this.user_info.id,
				}
				const result = await _this.$loginRequest({
					url: '/dtline/member/login',
					method: 'POST',
					header: {
						'Authorization': 'Bearer ' + _this.access_token
					},
					data: data
				})
				uni.hideLoading();
				_this.login(result.data);
				if (result.code === 0) {
					uni.showToast({
						title: '登录成功'
					}) 
					uni.switchTab({
					 url: '../index/index'
					 })
				 } else {
					 if (result.msg === '用户登录失败') {
						uni.showToast({
							icon: 'none',
							title: '登录失败，请稍候重试'
						}) 
					 } else if (result.msg === '该用户未注册或已被删除') {
						 uni.showToast({
						 	icon: 'none',
						 	title: '该用户未注册或已被删除'
						 }) 
					 } else {
						 _this.isBind = false
						 _this.plateIsBind = true
						 uni.showToast({
						 	icon: 'none',
						 	title: '请绑定车牌号'
						 })
					 }
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
							'Authorization': 'Bearer ' + _this.access_token
						},
						data: {
							id: _this.userInfo.id,
							plateNumber: _this.plateList[0][_this.platesIndex[0]] + _this.plateList[1][_this.platesIndex[1]] +  _this.master.plateNumber
						}
					})
					uni.hideLoading();
					console.log(checkResult)
					if (checkResult.code === 0) {
						if (checkResult.msg === '该车牌您已经绑定') {
							uni.showToast({
								duration: 2000,
								title: '该车牌您已经绑定'
							}) 
							uni.switchTab({
							 url: '../index/index'
							 })
						} else {
							uni.showToast({
								title: '登录成功'
							}) 
							uni.switchTab({
							 url: '../index/index'
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
									'Authorization': 'Bearer ' + _this.access_token
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
			},
			
			// 取消，暂不绑定
			cancle() {
				this.primaryIndex = true
				uni.showToast({
					title: '登录成功'
				}) 
				uni.switchTab({
				 url: '../index/index'
				 })
			},
			 
			// 暂不登录
			notLogin() {
				this.primaryIndex = true
				uni.showToast({
					title: '登录成功'
				}) 
				uni.switchTab({
				 url: '../index/index'
				 })
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
			
			// 表单输入
			wxInputChange(e) {
				const key = e.currentTarget.dataset.key
				console.log(key)
				this.wxData[key] = e.detail.value
			},
			plateInputChange(e) {
				const key = e.currentTarget.dataset.key
				console.log(key)
				this.master[key] = e.detail.value
			},
			
			// 车牌选择
			bindPlateChange(e){
				this.platesIndex = e.target.value
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
			
			// 提交
			async submit() {
				const _this = this
				_this.loginIndex = true
				_this.user_info.phoneMob = _this.wxData.phoneMob
				if (_this.wxData.plateNumber && master.plateNumber.length === 5) {
					_this.user_info.plateNumber = _this.plateList[0][_this.platesIndex[0]] + _this.plateList[1][_this.platesIndex[1]] + _this.wxData.plateNumber
				}
				if (_this.identifyCode === _this.wxData.identify) {
					// 验证码正确，用户注册
					const registerResult = await _this.$loginRequest({
						url: '/dtline/member/regist',
						method: 'POST',
						data: {
							plateNumber: _this.user_info.plateNumber,
							nickName: _this.user_info.nickName,
							phoneMob: _this.user_info.phoneMob,
							portrait: _this.user_info.portrait
						}
					})
					console.log(registerResult)
					if (registerResult.code === 0) {
						if (registerResult.msg === '注册成功') {
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
						const token1 = tokenResult.access_token
						if (token1) {
							uni.login({
							  provider: 'weixin',
							  async success (res) {
								 if (res.code) {
									 // 进行账户绑定
									 const bindResult = await _this.$loginRequest({
									 	url: '/admin/social/bind?state=MINI&code=' + res.code,
									 	method: 'POST',
									 	header: {
									 		'Authorization': 'Bearer '+ token1
									 	},
									 })
									 console.log('绑定用户', bindResult)
										 if (bindResult.code === 0) {
											 _this.userAdmin()
										 }
									}
								}
							})
						}
					}
					else {
						_this.isBind = false
						_this.plateIsBind = true
						_this.bindedShow = true
						uni.showToast({
							icon: 'none',
							duration: 2000,
							title: '车牌已有人绑定,请输入原车主手机验证码'
						})
					}
				}
				else {
					uni.showToast({
						icon: 'none',
						title: '验证码错误'
					})
				}
			},
			// #endif
			
			
			/**
			 * APP模块功能
			 */
			// 表单输入
			inputChange(e){
				const key = e.currentTarget.dataset.key;
				this[key] = e.detail.value;
			},
			// 表单输入
			wxInputChange(e) {
				const key = e.currentTarget.dataset.key
				this.wxData[key] = e.detail.value
			},
			// 注册
			register() {
				uni.navigateTo({
					url: '../register/register'
				})
			},
			// 登录方式切换
			loginType() {
				this.passwordShow = !this.passwordShow
			},
			
			// 发送验证码
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
			
			// 获取验证码
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
			
			// 密码登录
			async pasLogin(){
				const _this = this
				uni.showToast({
					icon: 'none',
					title: '正在登陆'
				})
				// uni.showLoading({
				//     title: '正在登陆'
				// });
				const {mobile, password} = _this;
				console.log(mobile, password)
				console.log(Crypto.encrypt(password))
				
				const tokenResult = await _this.$loginRequest({
					url: '/auth/oauth/token?randomStr=blockPuzzle&grant_type=password',
					method: 'POST',
					header: {
						isToken: false,
						'TENANT-ID': '1',
						'Authorization': 'Basic dGVzdDp0ZXN0'
					},
					data: `username=${mobile}&passwrod=${Crypto.encrypt(password)}`
				})
				console.log(tokenResult)
				if (tokenResult.code === 0) {
					_this.user_info.id = tokenResult.user_info.id
					_this.tokenSet(tokenResult.access_token)
					const result = await _this.$loginRequest({
						url: '/dtline/member/login',
						method: 'POST',
						header: {
							'Authorization': 'Bearer ' + _this.access_token
						},
						data: {
							userId: _this.user_info.id
						}
					})
					// uni.hideLoading();
					if (result.code === 0) {
						_this.login(result.data)
						uni.showToast({
							icon: 'none',
							title: '登录成功'
						})
						uni.switchTab({
						 url: '../index/index'
						 })
					} else {
						if (result.msg === '用户登录失败' || result.msg === '该用户未注册或已被删除') {
							uni.showToast({
								icon: 'none',
								title: '用户登录失败，请稍微重试'
							})
						} else if (result.msg === '未绑定车牌号') {
							_this.login(result.data)
							uni.showToast({
								icon: 'none',
								title: '未绑定车牌号，请进入APP进行绑定'
							})
							uni.switchTab({
							 url: '../index/index'
							 })
						}
					}
				} else {
					uni.showToast({
						icon: 'none',
						title: '用户名或密码错误，请重新输入'
					})
				}	
			},
			
			// 手机验证码登录
			async identifyLogin(){
				const _this = this
				// uni.showLoading({
				//     title: '正在登陆'
				// });
				if (!_this.wxData.identify) {
					uni.showToast({
						icon: 'none',
						title: '请输入验证码'
					})
				} else if (!_this.identifyCode) {
					uni.showToast({
						icon: 'none',
						title: '请点击发送验证码'
					})
				}
				 else if (_this.identifyCode !== _this.wxData.identify) {
					uni.showToast({
						icon: 'none',
						title: '验证码不正确，请重新输入'
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
					console.log(tokenResult)
					if (tokenResult.access_token && tokenResult.user_info) {
						_this.user_info.id = tokenResult.user_info.id
						_this.tokenSet(tokenResult.access_token)
						const result = await _this.$loginRequest({
							url: '/dtline/member/login',
							method: 'POST',
							header: {
								'Authorization': 'Bearer ' + _this.access_token
							},
							data: {
								userId: _this.user_info.id
							}
						})
						console.log(result)
						// uni.hideLoading();
						if (result.code === 0) {
							_this.login(result.data)
							uni.showToast({
								icon: 'none',
								title: '登录成功'
							})
							uni.switchTab({
							 url: '../index/index'
							 })
						} else {
							if (result.msg === '用户登录失败' || result.msg === '该用户未注册或已被删除') {
								uni.showToast({
									icon: 'none',
									title: '用户登录失败，请稍微重试'
								})
							} else if (result.msg === '未绑定车牌号') {
								_this.login(result.data)
								uni.showToast({
									icon: 'none',
									title: '未绑定车牌号，请进入APP进行绑定'
								})
								uni.switchTab({
								 url: '../index/index'
								 })
							}
						}
					}
				}
			}
		},
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
	.right-top-sign{
		position:absolute;
		top: 80upx;
		right: -30upx;
		z-index: 95;
		&:before, &:after{
			display:block;
			content:"";
			width: 400upx;
			height: 80upx;
			background: #b4f3e2;
		}
		&:before{
			transform: rotate(50deg);
			border-radius: 0 50px 0 0;
		}
		&:after{
			position: absolute;
			right: -198upx;
			top: 0;
			transform: rotate(-50deg);
			border-radius: 50px 0 0 0;
			/* background: pink; */
		}
	}

	/* #ifdef MP */
	.container{
		padding-top: 180px;
		position:relative;
		width: 100vw;
		// height: 100vh;
		overflow: hidden;
		background: #fff;
	}
	.welcome{
		padding: 0 60upx;
		position:relative;
		left: 50upx;
		top: 40upx;
		font-size: 36upx;
		color: #555;
		text-shadow: 1px 0px 1px rgba(0,0,0,.3);
	}
	.logo {
		width: 200upx;
		height: 200upx;
		margin: 80upx auto 20upx;
		image {
			width: 100%;
			height: 100%;
		}
	}
	/* #endif */
	
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
