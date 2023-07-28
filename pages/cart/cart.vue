<template>
	<view class="container">
		<u-navbar 
			title="购物车" 
			title-color="#FFFFFF" 
			title-bold="true"
			back-icon-color="#FFFFFF" 
			border-bottom="false"
			:background="{ backgroundImage: 'linear-gradient(to bottom, rgb(128, 172, 148), rgb(145, 187, 170))' }"
		></u-navbar>
		<content>
			<view class="cart-container">
			</view>
		</content>
		<u-tabbar :list="list" :mid-button="true" active-color="#2AB07D" inactive-color="#C0C4CC"></u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: this.$mConstDataConfig.tabbarList,
			}
		},
		methods: {
		}
	}
</script>

<style lang="scss" scoped>
</style>