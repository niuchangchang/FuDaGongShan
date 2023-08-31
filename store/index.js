import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import $mConstDataConfig from '@/config/constData.config';


const ACCESSTOKEN = uni.getStorageSync('accessToken') || '';
const USERINFO = uni.getStorageSync('userInfo') || {};
const CARTNUM = uni.getStorageSync('cartNum') || 0;


const store = new Vuex.Store({
	state: {
		// 用户token
		accessToken: ACCESSTOKEN,
		// 用户信息
		userInfo: USERINFO,
		// 网络状态
		networkState: 'unknown',
		// 购物车数字角标
		cartNum: CARTNUM,
	},
	getters: {
		// 获取网络状态
		networkStatus: state => {
			return state.networkState;
		},
		// 判断用户是否登录
		hasLogin: state => {
			return !!state.accessToken;
		},
	},
	mutations: {
		login(state, token) {
			state.accessToken = token;
			uni.setStorageSync('accessToken', token);
		},
		logout(state) {
			state.accessToken = '';
			state.userInfo = {};
			uni.removeStorageSync('accessToken');
			// uni.removeTabBarBadge({ index: $mConstDataConfig.cartIndex });
			uni.removeStorageSync('user');
		},
		setUserInfo(state, userInfo) {
			uni.setStorageSync('userInfo', userInfo);
		},
		setNetworkState(state, provider) {
			state.networkState = provider;
		},
		setCartNum(state, provider) {
			state.cartNum = provider;
			// 更新 tabbar 购物车数量
			uni.setStorageSync('cartNum', provider);
			$mConstDataConfig.tabbarList[3].count = provider

		},
	},
	actions: {
		networkStateChange({ commit }, info) {
			commit('setNetworkState', info);
		},
		logout({ commit }) {
			commit('logout');
		}
	}
})

export default store