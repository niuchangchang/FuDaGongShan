import Vue from 'vue'
import App from './App'
import api from './api'
import util from './common/util'
import store from './store'

import uView from './uni_modules/uview-ui';
Vue.use(uView);

// 全局组件
import content from '@/components/content.vue';
Vue.component('content', content);

Vue.config.productionTip = false

App.mpType = 'app'

Vue.prototype.$store = store
Vue.prototype.$api = api
Vue.prototype.$util = util

const app = new Vue({
	store,
    ...App
})
app.$mount()
