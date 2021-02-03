/* 用户 */
const userInfo = {
	status: 1,
	data: {
		id: 1,
		mobile: 18888888888,
		nickname: 'Hujm',
		portrait: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcdn.duitang.com%2Fuploads%2Fitem%2F201412%2F17%2F20141217211542_CYRCV.jpeg&refer=http%3A%2F%2Fcdn.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1611218845&t=98ff6fa49fc17a6a5e412945ccd1b976'
	},
	msg: '提示'
}
/* 首页轮播图 */
const swiperList = [{
		src: "/static/home/banner1.jpg",
		background: "rgb(203, 87, 60)",
	},
	{
		src: "/static/home/banner6.jpg",
		background: "rgb(205, 215, 218)",
	},
	{
		src: "/static/home/banner7.jpg",
		background: "rgb(183, 73, 69)",
	}
]
/* 分类列表 */
const sortList = [
	{
		src: '/static/home/c3.png',
		title: '我的车检'
	},
	{
		src: '/static/home/c5.png',
		title: '车检预约'
	},
	{
		src: '/static/home/c6.png',
		title: '违章违法'
	},
	{
		src: '/static/home/c7.png',
		title: '周边快修'
	},
	{
		src: '/static/home/c8.png',
		title: '使用帮助'
	}
]
/* 新闻列表 */
const newsList = [
	{
		image: "https://img1.tuhu.org/Images/Marketing/Shops/x_UQf6aB0jiwdngPUZ_19w_w429_h429.jpeg@230w_230h_100Q.jpg",
		title: "万象修车店(宁波环球银泰城店)",
		data: '08:00-21:00',
		score: 4.5,
		address: '宁波环球银泰城对面',
		dis: '657m',
	},
	{
		image: "https://img1.tuhu.org/Images/Marketing/Shops/FiGqS8_UW4TWmkkblSh9Esp7cj9c_w1029_h1029.jpg@230w_230h_100Q.jpg",
		title: "万象修车店(宁波庐山中路店)",
		data: '08:00-21:00',
		score: 4,
		address: '北仑区庐山中路276号',
		dis: '1657m',
	},
	{
		image: "https://img1.tuhu.org/Images/Marketing/Shops/FvJoKz0tA1qj9dAGEL-JlWNVA7VF_w974_h974.jpg@230w_230h_100Q.jpg",
		title: "万象修车店(宁海科技大道店)",
		data: '08:00-21:00',
		score: 4.5,
		address: '浙江省宁波市宁海县科技大道188号',
		dis: '2357m',
	},
	{
		image: "https://img3.tuhu.org/Images/Marketing/Shops/Fia3IffvbG39_uDHNSjHvB-iOuWh_w1428_h1428.jpg@230w_230h_100Q.jpg",
		title: "万象修车店(宁波中山西路店)",
		data: '08:00-21:00',
		score: 5,
		address: '浙江省宁波市海曙区中山西路2222号',
		dis: '3026m',
	},
	{
		image: "https://img3.tuhu.org/Images/Marketing/Shops/FhBiCAr0xuchWDcuoSOu7AlVwmcY_w1000_h1000.jpg@230w_230h_100Q.jpg",
		title: "万象修车店(宁波天童北路店)",
		data: '08:00-21:00',
		score: 5,
		address: '浙江省宁波市鄞州区天童北路1131-1号',
		dis: '4067m',
	}
]

/* 当前导航图 */
const navList = [
		{
			icon: 'iconchuyuan',
			title: '入园接车区',
			isFinish: true
		},
		{
			icon: 'iconwaiguan',
			title: '外观检查区',
			isFinish: true
		},
		{
			icon: 'iconhuanbao',
			title: '环保检查区',
			isFinish: true
		},
		{
			icon: 'icontingchechang',
			title: '停车区域',
			isFinish: true
		},
		{
			icon: 'iconroad',
			title: '路试',
			isFinish: true
		},
		{
			icon: 'iconanjian',
			title: '安检',
			isFinish: true
		},
		{
			icon: 'iconshenhe',
			title: '资料审核',
			isFinish: false
		},
		{
			icon: 'iconpaidui',
			title: '叫号取车',
			isFinish: false
		},
		{
			icon: 'iconchuyuan',
			title: '开车出园',
			isFinish: false
		}
	]
	
/* 历史导航图 */
const navHistoryList = [
		{
			icon: 'iconchuyuan',
			title: '入园接车区',
			isFinish: true
		},
		{
			icon: 'iconwaiguan',
			title: '外观检查区',
			isFinish: true
		},
		{
			icon: 'iconhuanbao',
			title: '环保检查区',
			isFinish: true
		},
		{
			icon: 'icontingchechang',
			title: '停车区域',
			isFinish: true
		},
		{
			icon: 'iconroad',
			title: '路试',
			isFinish: true
		},
		{
			icon: 'iconanjian',
			title: '安检',
			isFinish: true
		},
		{
			icon: 'iconshenhe',
			title: '资料审核',
			isFinish: true
		},
		{
			icon: 'iconpaidui',
			title: '叫号取车',
			isFinish: true
		},
		{
			icon: 'iconchuyuan',
			title: '开车出园',
			isFinish: true
		}
	]

/* 使用帮助 */
const helpList = [
	{
		title: '入园接车',
		desc: '车辆驶入园区，进入车辆入园区等待下一个项目进行',
		imgSrc: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.zuel.edu.cn%2F_upload%2Farticle%2Fimages%2Fe2%2F23%2Fe58a6ccd49fbb130a276260c00d4%2Ffc6950cc-7606-48bc-ba04-9fd58fc299b7.jpg&refer=http%3A%2F%2Fwww.zuel.edu.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1611910708&t=702cd531b3de07522e261d0915c619df',
	},
	{
		title: '外观检查',
		desc: '车辆外观应整洁、各零部件应完好，连接紧固、没有缺损;车体周正，车体外缘左右对称部位高度差不得大于40cm;车身和驾驶室应坚固耐用，覆盖件无开裂和锈蚀，车身和驾驶室在车架上安装牢固，不能因车辆振动而引起松动',
		imgSrc: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3596172441,404955435&fm=15&gp=0.jpg',
	},
	{
		title: '环保检查',
		desc: '将相关资料交给环检录入窗口的工作人员，让其将信息录入进去。同时，进行环保联网核查，查验车辆有无环保违规记录',
		imgSrc: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Falipic.files.mozhan.com%2Fueditor%2Fimage%2F20180622%2F1529654519801555.jpg&refer=http%3A%2F%2Falipic.files.mozhan.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1611911269&t=0045bd699c4d0c442aa9bca92e88fb48',
	},
	{
		title: '安检',
		desc: '对车门应急开关、安全顶窗、安全锤、灭火器、摄像头行车记录仪等进行检查',
		imgSrc: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fmmbiz.qpic.cn%2Fmmbiz_png%2F2RSxl12y0qMZUxIhicNBxEblbicluyzfytuJJiamzcwTluz3FGmhKiaEpebjib23TdW5ekAPiazXh9bfF5CwqOLfhmSg%2F640%3Fwx_fmt%3Dpng&refer=http%3A%2F%2Fmmbiz.qpic.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1611911313&t=8c7a91e4e72f6ae283a67d9604683aa2',
	},
	{
		title: '路试',
		desc: '对样车各项性能、技术参数进行全面了解的不同环境及道路的驾驶测试',
		imgSrc: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimage.bitautoimg.com%2Fappimage%2Fmedia%2F20171023%2Fw1920_h1080_00ba688d34ea4840a557b2d1f40e3051.jpeg&refer=http%3A%2F%2Fimage.bitautoimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1611911334&t=42678ce4b3b1f984523eab4f3d8d3287',
	},
	{
		title: '停车区域',
		desc: '车辆所有项目检查完毕，进入停车区域等待资料审核',
		imgSrc: 'https://ss0.baidu.com/94o3dSag_xI4khGko9WTAnF6hhy/baike/pic/item/3801213fb80e7bec0c722b05252eb9389a506bad.jpg',
	},
	{
		title: '资料审核',
		desc: '车辆进行资料审核',
		imgSrc: 'https://ss2.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy/baike/pic/item/8b13632762d0f703f47163540dfa513d2797c573.jpg',
	},
	{
		title: '叫号取车',
		desc: '客户在听到叫号后，可取车出园',
		imgSrc: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=451794391,2141471504&fm=26&gp=0.jpg',
	},
	{
		title: '开车出园',
		desc: '所有项目完毕后，客户开车出园',
		imgSrc: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2F04imgmini.eastday.com%2Fmobile%2F20190131%2F20190131124042_4203dc9253ffc4632e0807579d1fec4e_2.jpeg&refer=http%3A%2F%2F04imgmini.eastday.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1611911448&t=425368fece050fa193b10e688ac60380',
	}
]

/* 车辆信息 */
const infoList = [
		{
			label: '车牌号码',
			value: 'AXXXXX'
		},
		{
			label: '车辆类型',
			value: '小轿车'
		},
		{
			label: '车主昵称',
			value: '张三丰'
		},
		{
			label: '手机号码',
			value: '151XXXXXXXX'
		}
	]
/* 历史列表 */
const historyList = [
		{
			title: 'AXXXXX',
			time: '2017-12-22'
		},
		{
			title: 'AXXXXX',
			time: '2018-12-22'
		},
		{
			title: 'AXXXXX',
			time: '2019-12-22'
		}
	]
/* 历史列表基本信息 */
const basicList = [
		{
			label: '联系人',
			value: '李四'
		},
		{
			label: '联系电话',
			value: '158****2146'
		},
		{
			label: '检测时间',
			value: '2017-12-22'
		},
		{
			label: '收费类别',
			value: '年检'
		},
		{
			label: '检测站',
			value: '高新区检测站'
		},
		{
			label: '订单总额',
			value: '￥2250'
		}
	]
export default {
	userInfo,
	swiperList,
	sortList,
	navList,
	navHistoryList,
	newsList,
	infoList,
	historyList,
	basicList,
	helpList
}
