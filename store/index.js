import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		// 网络状态
		networkState: 'unknown',
	},
	getters: {
		// isLogin: state => Object.keys(state.member).length > 0	//是否登录
	},
	mutations: {
		setNetworkState(state, provider) {
			state.networkState = provider;
		},
	},
	actions: {
		networkStateChange({ commit }, info) {
			commit('setNetworkState', info);
		},
	}
})

export default store