/* eslint-disable */
import Request from './request';
import indexConfig from '@/config/index.config';
import mHelper from '@/utils/helper';
import store from '@/store';

const http = new Request();

// request全局参数设置
http.setConfig(config => {
	/* 设置全局配置 */
	config.baseUrl = indexConfig.baseUrl; /* 根域名不同 */
	const systemInfo = uni.getSystemInfoSync();
	const systemInfoHeaders = {
		'device-name': systemInfo.brand, // 设备名称
		width: systemInfo.screenWidth, // 屏幕宽度
		height: systemInfo.screenHeight, // 屏幕高度
		os: systemInfo.platform, // 客户端平台
		'os-version': systemInfo.system // 操作系统版本
	};
	config.header = {
		...config.header,
		...systemInfoHeaders
	};
	return config;
});

let isRefreshing = false;
let requests = [];
http.interceptor.request(
	config => {
		/* 请求之前拦截器 */
		config.header['token'] = uni.getStorageSync('accessToken');
		return config;
	},
	error => {
		return Promise.reject(error);
	}
);

http.interceptor.response(
	async response => {
		/* 请求之后拦截器 */
		switch (response.data.code) {
			case 0:
				return response.data;
			case 200:
				return response.data;
			case 400:
				mHelper.toast('错误的请求');
				return Promise.reject(response.data.message);
				break;
			case 401:
				isRefreshing = false;
				uni.removeStorageSync('accessToken');
				await store.commit('logout');
				uni.showModal({
					content: '会话已过期，是否跳转登录页面？',
					success: confirmRes => {
						if (confirmRes.confirm) {
							mHelper.backToLogin();
							throw response.data.message;
						}
					}
				});
				break;
			case 405:
				mHelper.toast('当前操作不被允许');
				return Promise.reject(response.data.message);
			case 404:
				mHelper.toast(response.data.message);
				return Promise.reject(response.data.message);
			case 429:
				mHelper.toast('请求过多，先休息一下吧');
				return Promise.reject(response.data.message);
			case 500:
				mHelper.toast('服务器打瞌睡了');
				return Promise.reject(response.data.message);
			default:
				mHelper.toast(response.data.message);
				return Promise.reject(response.data.message);
		}
	},
	error => {
		return Promise.reject(error);
	}
);

export { http };
