
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/login/login","pages/test/test","pages/news/news","pages/profile/profile","pages/history-detail/history-detail","pages/money/pay","pages/money/paySuccess","pages/set/set","pages/news-details/news-details","pages/notice/notice","pages/help/help","pages/violation/violation","pages/help-detail/help-detail","pages/notice-detail/notice-detail","pages/about/about","pages/plate/plate","pages/add-plate/add-plate","pages/my-info/my-info","pages/update-info/update-info","pages/register/register","pages/set-password/set-password"],"window":{"navigationBarTextStyle":"white","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#409eff","backgroundColor":"#F8F8F8"},"tabBar":{"color":"#C0C4CC","selectedColor":"#409eff","backgroundColor":"#fff","list":[{"iconPath":"static/icon/tab-home.png","selectedIconPath":"./static/icon/tab-home-current.png","pagePath":"pages/index/index","text":"首页"},{"iconPath":"static/icon/tab-test.png","selectedIconPath":"./static/icon/tab-test-current.png","pagePath":"pages/test/test","text":"车检"},{"iconPath":"static/icon/tab-news.png","selectedIconPath":"./static/icon/tab-news-current.png","pagePath":"pages/news/news","text":"快修"},{"iconPath":"static/icon/tab-my.png","selectedIconPath":"./static/icon/tab-my-current.png","pagePath":"pages/profile/profile","text":"我的"}]},"nvueCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"inspecVehicle","compilerVersion":"2.9.3","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"普源车检","titleNView":{}}},{"path":"/pages/login/login","meta":{},"window":{"navigationBarTitleText":"","navigationStyle":"custom","titleNView":false,"animationType":"slide-in-bottom"}},{"path":"/pages/test/test","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"车检","enablePullDownRefresh":false}},{"path":"/pages/news/news","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"快修","enablePullDownRefresh":false}},{"path":"/pages/profile/profile","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"我的","navigationStyle":"custom","bounce":"none","titleNView":{}}},{"path":"/pages/history-detail/history-detail","meta":{},"window":{"navigationBarTitleText":"车检详细","enablePullDownRefresh":false}},{"path":"/pages/money/pay","meta":{},"window":{"navigationBarTitleText":"支付订单","enablePullDownRefresh":false}},{"path":"/pages/money/paySuccess","meta":{},"window":{"navigationBarTitleText":"支付成功","enablePullDownRefresh":false}},{"path":"/pages/set/set","meta":{},"window":{"navigationBarTitleText":"设置","enablePullDownRefresh":false}},{"path":"/pages/news-details/news-details","meta":{},"window":{"navigationBarTitleText":"周边详情","enablePullDownRefresh":false}},{"path":"/pages/notice/notice","meta":{},"window":{"navigationBarTitleText":"消息","enablePullDownRefresh":false}},{"path":"/pages/help/help","meta":{},"window":{"navigationBarTitleText":"使用帮助","enablePullDownRefresh":false}},{"path":"/pages/violation/violation","meta":{},"window":{"navigationBarTitleText":"违章违法"}},{"path":"/pages/help-detail/help-detail","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/notice-detail/notice-detail","meta":{},"window":{"navigationBarTitleText":"消息详情","enablePullDownRefresh":false}},{"path":"/pages/about/about","meta":{},"window":{"navigationBarTitleText":"关于我们","enablePullDownRefresh":false}},{"path":"/pages/plate/plate","meta":{},"window":{"navigationBarTitleText":"我的车辆","enablePullDownRefresh":false}},{"path":"/pages/add-plate/add-plate","meta":{},"window":{"navigationBarTitleText":"绑定车牌","enablePullDownRefresh":false}},{"path":"/pages/my-info/my-info","meta":{},"window":{"navigationBarTitleText":"个人信息","enablePullDownRefresh":false}},{"path":"/pages/update-info/update-info","meta":{},"window":{"navigationBarTitleText":"修改名字","enablePullDownRefresh":false}},{"path":"/pages/register/register","meta":{},"window":{"navigationBarTitleText":"","navigationStyle":"custom","titleNView":false,"animationType":"slide-in-bottom"}},{"path":"/pages/set-password/set-password","meta":{},"window":{"navigationBarTitleText":"密码设置","enablePullDownRefresh":false}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
