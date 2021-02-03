import Vue from 'vue'
import store from './store'
import App from './App'

// 封装的接口请求函数
import { myRequest, loginRequest } from './util/api.js'
Vue.prototype.$myRequest  = myRequest
Vue.prototype.$loginRequest  = loginRequest
// 封装的带参路由跳转
import * as navTo from './util/navTo.js'  
Vue.prototype.$navTo = navTo

import Json from './Json.js'  //测试用数据
const msg = (title, duration=1500, mask=false, icon='none')=>{
	//统一提示方便全局修改
	if(Boolean(title) === false){
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
}
const json = type=>{
	//模拟异步请求数据
	return new Promise(resolve=>{
		setTimeout(()=>{
			resolve(Json[type]);
		}, 500)
	})
}
Vue.prototype.$api = {json, msg}
Vue.prototype.$store = store;
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
