import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		hasLogin: false,  // 用户是否登录
		userInfo: {},  // 用户信息
		access_token: ''  // token
	},
	mutations: {
		// 修改用户名称
		userName(state, data) {
			state.userInfo.nickName = data
		},
		// 修改用户头像
		userPortrait(state, data) {
			state.userInfo.portrait = data
		},
		// 存储token
		tokenSet(state, data) {
			state.access_token = data;
			uni.setStorage({//缓存token
			    key: 'token',  
			    data: data  
			}) 
		},
		// 用户登录
		login(state, provider) {
			state.hasLogin = true;
			state.userInfo = provider;
			uni.setStorage({//缓存用户登陆状态
			    key: 'userInfo',  
			    data: provider  
			}) 
		},
		// 用户登出
		logout(state) {
			state.hasLogin = false;
			state.userInfo = {};
			uni.removeStorage({  
                key: 'userInfo'  
            })
		}
	},
	actions: {
	
	}
})

export default store
