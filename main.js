import Vue from 'vue'
import App from './App'
import util from './common/util'
import store from './store';

// 引入vk-uview-ui
import uView from './uni_modules/vk-uview-ui';
Vue.use(uView);

// 引入全局配置
import $mAssetsPath from '@/config/assets.config.js';
import $mConfig from '@/config/index.config.js';
import $mRoutesConfig from '@/config/routes.config.js';
import $mConstDataConfig from '@/config/constData.config.js';

// 引入全局方法
import {
	http
} from '@/utils/request';
import $mGraceChecker from '@/utils/graceChecker';
import $mHelper from '@/utils/helper';
import $mRouter from '@/utils/router';
import $mPayment from '@/utils/payment';
import $mImgHost from '@/utils/image';

// 全局组件
import content from '@/components/content.vue';
Vue.component('content', content);

// 网络状态监听
uni.getNetworkType({
	success: res => {
		store.dispatch('networkStateChange', res.networkType);
	}
});
uni.onNetworkStatusChange(function(res) {
	store.dispatch('networkStateChange', res.networkType);
});

if (process.env.NODE_ENV === 'production') {
	Vue.config.productionTip = false;
}

// 路由导航
$mRouter.beforeEach((navType, to) => {
	if (to.route === undefined) {
		throw '路由钩子函数中没有找到to对象，路由信息:' + JSON.stringify(to);
	}
	if (to.route === $mRoutesConfig.login.path && store.getters.hasLogin) {
		uni.reLaunch({
			url: $mHelper.objParseUrlAndParam($mRoutesConfig.main.path)
		});
		return;
	}
	// 过滤需要权限的页面
	if (to.route.requiresAuth) {
		if (store.getters.hasLogin) {
			// 已经登录
			uni[navType]({
				url: $mHelper.objParseUrlAndParam(to.route.path, to.query)
			});
		} else {
			// 登录成功后的重定向地址和参数
			const query = {
				redirectUrl: to.route.path,
				...to.query
			};
			// 没有登录 强制登录
			uni.navigateTo({
				url: $mHelper.objParseUrlAndParam($mRoutesConfig.login.path, query)
			});
		}
	} else {
		uni[navType]({
			url: $mHelper.objParseUrlAndParam(to.route, to.query)
		});
	}
});

App.mpType = 'app'

Vue.prototype.$store = store
Vue.prototype.$util = util

// 挂载全局自定义方法
Vue.prototype.$mStore = store;
Vue.prototype.$http = http;
Vue.prototype.$mConfig = $mConfig;
Vue.prototype.$mAssetsPath = $mAssetsPath;
Vue.prototype.$mRoutesConfig = $mRoutesConfig;
Vue.prototype.$mConstDataConfig = $mConstDataConfig;
Vue.prototype.$mGraceChecker = $mGraceChecker;
Vue.prototype.$mHelper = $mHelper;
Vue.prototype.$mImgHost = $mImgHost;
Vue.prototype.$mRouter = $mRouter;
Vue.prototype.$mPayment = $mPayment;

const app = new Vue({
	store,
	...App
})
app.$mount()