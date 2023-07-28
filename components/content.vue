<template>
	<view class="content" :style="style">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		name: 'Content',
		data() {
			return {
				
			}
		},
		computed: {
			style() {
				// const statusBarHeight = uni.getSystemInfoSync().statusBarHeight
				const custom = wx.getMenuButtonBoundingClientRect()
				// console.log('====custom', custom)
				return `top: ${44 + custom.top - 4}px; height: calc(100% - ${44 + custom.top - 4}px);`
			}
		}
	}
</script>

<style lang="scss">
	.content {
		width: 100%;
		position: absolute;
		overflow-y: auto;
	}
</style>
