<script>
	import {
		cartCount,
	} from '@/api/url';
	import { mapMutations, mapGetters } from 'vuex';
	export default {
		computed: {
			...mapGetters(['hasLogin'])
		},
		onLaunch: function() {
			console.log('App Launch');
			if(this.hasLogin) {
				this.getCartCount()
			} 
		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
		},
		methods: {
			...mapMutations(['setCartNum']),
			async getCartCount() {
				await this.$http
					.post(`${cartCount}`)
					.then(async r => {
						this.setCartNum(r.data);
					})
					.catch(err => {});
			},
		}
	};
</script>

<style lang="scss">
	 @import "./uni_modules/vk-uview-ui/index.scss";
	/*每个页面公共css */
	@import '~@/static/style/app.scss';
</style>
