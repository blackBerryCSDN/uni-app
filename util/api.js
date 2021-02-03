const BASE_URL = 'https://www.pyqcjc.cn'
// const BASE_URL = 'http://192.168.201.190:9999'
let access_token = uni.getStorageSync('token') || '';
let header = {
	'Authorization': 'Bearer ' + access_token
}
export const myRequest = (options)=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			url: BASE_URL + options.url,
			method: options.method || 'GET',
			data: options.data || {},
			header: header || {},
			success: (res)=>{
				if(res.statusCode !== 200) {
					return uni.showToast({
						icon: 'none',
						title: '服务器繁忙，请稍候重试'
					})
				}
				resolve(res.data)
			},
			fail: (err)=>{
				uni.showToast({
					title: '请求接口失败'
				})
				reject(err)
			}
		})
	})
}

export const loginRequest = (options)=> {
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + options.url,
			method: options.method || 'GET',
			data: options.data || {},
			header: options.header || {},
			success: (res)=> {
				// console.log(res)
				if (res.statusCode === 200) {
					resolve(res.data)
				} else if(res.statusCode === 401){
					resolve(res.statusCode)
				}
			}
		})
	})
}
