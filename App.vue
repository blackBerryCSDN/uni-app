<script>
	/**
	 * vuex管理登陆状态，具体可以参考官方登陆模板示例
	 */
	import {
		mapMutations
	} from 'vuex';
	export default {
		methods: {
			...mapMutations(['login', 'tokenSet'])
		},
		onLaunch: function() {
			let userInfo = uni.getStorageSync('userInfo') || '';
			let access_token = uni.getStorageSync('token') || '';
			if(userInfo.id){
				//更新登陆状态
				uni.getStorage({
					key: 'userInfo',
					success: (res) => {
						this.login(res.data);
					}
				});
			}
			if (access_token) {
				//更新token
				uni.getStorage({
					key: 'token',
					success: (res) => {
						this.tokenSet(res.data);
					}
				});
			}
		},
		
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
	}
</script>

<style>
	/*每个页面公共css */
	@font-face {
	  font-family: 'iconfont';  /* project id 2282493 */
	  src: url('https://at.alicdn.com/t/font_2282493_l510c585jj.eot');
	  src: url('https://at.alicdn.com/t/font_2282493_l510c585jj.eot?#iefix') format('embedded-opentype'),
	  url('https://at.alicdn.com/t/font_2282493_l510c585jj.woff2') format('woff2'),
	  url('https://at.alicdn.com/t/font_2282493_l510c585jj.woff') format('woff'),
	  url('https://at.alicdn.com/t/font_2282493_l510c585jj.ttf') format('truetype'),
	  url('https://at.alicdn.com/t/font_2282493_l510c585jj.svg#iconfont') format('svg');
	}
	
	.iconfont {
	  font-family: "iconfont" !important;
	  font-size: 16px;
	  font-style: normal;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
	}
	
	.icontingchechang:before {
	  content: "\e608";
	}
	
	.iconwaiguan:before {
	  content: "\e63b";
	}
	
	.iconpaidui:before {
	  content: "\e60d";
	}
	
	.iconshenhe:before {
	  content: "\e69a";
	}
	
	.iconroad:before {
	  content: "\e601";
	}
	
	.iconchuyuan:before {
	  content: "\e647";
	}
	
	.iconruyuan:before {
	  content: "\e64c";
	}
	
	.iconanjian:before {
	  content: "\e700";
	}
	
	.iconhuanbao:before {
	  content: "\e66f";
	}
	
	.iconshezhi:before {
	  content: "\e61a";
	}
	
	.icondizhi:before {
	  content: "\e619";
	}
	
	.iconweizhangchaxun:before {
	  content: "\e606";
	}
	
	.icontubiao-dizhi:before {
	  content: "\e607";
	}
	
	.iconqiche:before {
	  content: "\e62b";
	}
	
	.iconshijian:before {
	  content: "\e661";
	}
	
	.iconchenggong:before {
	  content: "\e62a";
	}
	
	.iconchongzhiyufukuanguanli:before {
	  content: "\e617";
	}
	
	.iconalipay:before {
	  content: "\e618";
	}
	
	.iconweixinzhifu:before {
	  content: "\e689";
	}
	
	.icondaohangtubiao:before {
	  content: "\e653";
	}
	
	.iconshipin:before {
	  content: "\e67a";
	}
	
	.iconbanbengengxin:before {
	  content: "\e64d";
	}
	
	.icondaifukuan:before {
	  content: "\e68f";
	}
	
	.iconshouhoutuikuan:before {
	  content: "\e631";
	}
	
	.icondingdan:before {
	  content: "\e604";
	}
	
	.icondaishouhuo:before {
	  content: "\e648";
	}
	
	.iconguanyu:before {
	  content: "\e69d";
	}
	
	.iconjiantou:before {
	  content: "\e616";
	}
	
	.iconxiaoxi:before {
	  content: "\e644";
	}
	
	.iconim_erweimasaomiao:before {
	  content: "\e600";
	}
	
	.iconshanchu:before {
	  content: "\e74c";
	}
	
	.iconchepaihao:before {
	  content: "\e609";
	}
	
	.iconmima:before {
	  content: "\e645";
	}
	
	
	page {
		width:100%;
		box-sizing:border-box;
		background-color: #f5f5f5;
	}
	.clamp {
		width: 400upx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		display: block;
	}
</style>
