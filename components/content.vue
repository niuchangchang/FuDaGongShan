<template>
	<view class="content-container" :style="style">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		name: 'Content',
		props: {
			hasTop: {
				type: Boolean,
				default: true
			},
			hasBottom: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
			}
		},
		computed: {
			style() {
				let styleObj = ''
				const { hasTop, hasBottom } = this
				const system = uni.getSystemInfoSync()
				// console.log('====system', system)
				const custom = wx.getMenuButtonBoundingClientRect()
				// console.log('====custom', custom)
				const tabbar = system.screenHeight - system.safeArea.bottom + 50;
				// console.log('====tabbar', tabbar)
				if(hasTop) {
					if(hasBottom) {
						styleObj = `top: ${44 + custom.top - 1}px; height: calc(100% - ${44 + custom.top + tabbar}px);`
					} else {
						styleObj = `top: ${44 + custom.top - 1}px; height: calc(100% - ${44 + custom.top}px);`
					}
				} else {
					if(hasBottom) {
						styleObj = `top: 0; height: calc(100% - ${tabbar}px);`
					} else {
						styleObj = `top: 0; height: 100%;`
					}
				}
				return styleObj
			}
		}
	}
</script>

<style lang="scss">
	.content-container {
	}
</style>
