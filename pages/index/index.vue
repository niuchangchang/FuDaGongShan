<template>
	<view class="container">
		<view class="banner">
		</view>
		<view class="content">
			<view class="entrance">
				<view class="left">
					<text class="hi">Hi，您好</text>
					<text class="huanying">欢迎来到复达供膳</text>
				</view>
				<view class="right">
					<view class="yupiao">
						<image
							src="https://img.js.design/assets/img/6438e8104539479518bf8310.jpg#2fabd401de51a66ad2e5df11b0481e6a">
						</image>
						<text class="yupiao-text">预约</text>
					</view>
					<view class="yupiao">
						<image
							src="https://img.js.design/assets/img/6438e8104539479518bf8310.jpg#2fabd401de51a66ad2e5df11b0481e6a">
						</image>
						<text class="yupiao-text">票券</text>
					</view>
				</view>

			</view>
			<view class="navigators">
				<view class="left">
				</view>
				<view class="right">
					<view class="waimai">
						<view class="navigators-left">
							<view class="dazi">外卖点餐</view>
							<view class="xiaozi">快递送达</view>
						</view>
						<view class="navigators-right"></view>
					</view>
					<view class="dingzhi">
						<view class="navigators-left">
							<view class="dazi">中小企业餐饮定制</view>
							<view class="xiaozi">企业专属订餐通道</view>
						</view>
						<view class="navigators-right"></view>
					</view>
				</view>
			</view>
			<view class="member-news">
				<image src="https://img-shop.qmimg.cn/s23107/2020/04/27/0039bf41c9ebd50a2c.jpg"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapGetters
	} from 'vuex'

	export default {
		data() {
			return {}
		},
		computed: {
			...mapState(['member']),
			...mapGetters(['isLogin'])
		},
		methods: {
			takein() {
				this.$store.commit('SET_ORDER_TYPE', 'takein')
				uni.switchTab({
					url: '/pages/menu/menu'
				})
			},
			takeout() {
				if (!this.isLogin) {
					uni.navigateTo({
						url: '/pages/login/login'
					})
					return
				}
				uni.navigateTo({
					url: "/pages/address/address?is_choose=true"
				})
			},
			integrals() {
				if (!this.isLogin) {
					uni.navigateTo({
						url: '/pages/login/login'
					})
					return
				}
				uni.navigateTo({
					url: '/pages/integrals/integrals'
				})
			},
			packages() {
				uni.navigateTo({
					url: '/pages/packages/index'
				})
			},
			memberCode() {
				if (!this.isLogin) {
					uni.navigateTo({
						url: '/pages/login/login'
					})
					return
				}
				uni.navigateTo({
					url: '/pages/mine/member-code'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.banner {
		width: 100%;
		height: 480rpx;
		background: url(https://img.js.design/assets/img/6438e8104539479518bf8310.jpg#2fabd401de51a66ad2e5df11b0481e6a);
		background-size: 100% 100%;
	}

	.content {
		padding: 0 30rpx;
		margin-top: -50rpx;
	}

	.entrance {
		height: 204rpx;
		border-radius: 20rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 0px 20px rgba(132, 186, 168, 0.4);
		margin-bottom: 44rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 24rpx 54rpx 44rpx 32rpx;

		.left {
			display: flex;
			flex-direction: column;
			gap: 12rpx;

			.hi {
				font-size: 48rpx;
				color: rgba(77, 113, 111, 1);
				text-align: left;
				vertical-align: top;

			}

			.huanying {
				font-size: 36rpx;
				color: rgba(113, 130, 141, 1);
				text-align: left;
				vertical-align: top;

			}
		}

		.right {
			display: flex;
			gap: 42rpx;

			.yupiao {
				width: 80rpx;
				height: 134rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				gap: 6rpx;

				image {
					width: 80rpx;
					height: 80rpx;
				}

				.yupiao-text {
					font-size: 32rpx;
					color: rgba(77, 113, 111, 1);
				}
			}

		}
	}

	.navigators {
		height: 350rpx;
		border-radius: 20rpx;
		margin-bottom: 20rpx;
		display: flex;
		align-items: stretch;
		gap: 20rpx;

		.left {
			height: 100%;
			border-radius: 8px;
			width: 308rpx;
			display: flex;
			background: url(https://img.js.design/assets/img/6438e80f7b58e9fa27fdd984.jpg#34140443cfbe601060a2e2e593747c39);
			background-size: 100% 100%;
			box-shadow: 1px 1px 2px rgba(255, 255, 255, 0.7), inset -1px -1px 0px rgba(255, 255, 255, 1), inset 1px 1px 0px rgba(255, 255, 255, 1), -3px -3px 7px rgba(255, 255, 255, 1), 3px 3px 7px rgba(113, 173, 145, 0.5);
		}

		.right {
			flex: 1;
			display: flex;
			flex-direction: column;
			gap: 32rpx;

			.waimai,
			.dingzhi {
				width: 100%;
				display: flex;
				flex: 1;
				padding: 24rpx 18rpx 24rpx 30rpx;
				align-items: center;
				justify-content: space-between;
				position: relative;
				border-radius: 10rpx;
				box-shadow: 1px 1px 2px rgba(255, 255, 255, 0.7), inset -1px -1px 0px rgba(255, 255, 255, 1), inset 1px 1px 0px rgba(255, 255, 255, 1), -3px -3px 7px rgba(255, 255, 255, 1), 3px 3px 7px rgba(113, 173, 145, 0.5);

				.navigators-left {
					background: none;
					display: flex;
					flex-direction: column;
					gap: 12rpx;

					.xiaozi {
						font-size: 24rpx;
						color: rgba(113, 130, 141, 1);
					}

					.dazi {
						font-size: 32rpx;
						color: rgba(113, 130, 141, 1);
					}
				}

				.navigators-right {
					width: 48rpx;
					height: 48rpx;
					background: rgba(255, 255, 255, 1);
				}
			}

			.waimai {
				background: rgba(228, 238, 232, 1);
			}

			.dingzhi {
				background: rgba(242, 235, 211, 1);
			}


		}

	}

	.member-news {
		width: 100%;
		margin-bottom: 30rpx;
		height: 368rpx;

		image {
			width: 100%;
			height: 100%;
			border-radius: 32rpx;
		}



	}
</style>