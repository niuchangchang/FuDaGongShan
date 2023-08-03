<template>
	<view class="container">
		<content :has-top="false" :has-bottom="true">
			<view class="banner"></view>
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
						<view class="jrtj">今日推荐</view>
					</view>
					<view class="right">
						<view class="waimai" @tap="navTo('/pages/menu/menu', 1)">
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
		</content>
		<u-popup v-model="show" mode="center" border-radius="16">
			<view class="qucanma">
				<text>取餐码</text>
				<view class="address">
					<u-icon name="photo" size="40"></u-icon>
					<text>上海市黄浦区XX路30号写字楼...</text>
				</view>
				<view class="address">
					<u-icon name="photo" size="40"></u-icon>
					<text>5号柜31号格子</text>
				</view>
				<view class="divi"></view>
				<view class="erweima">
				</view>
				<view class="close-button">
					关闭
				</view>
			</view>
		</u-popup>
		<u-tabbar :list="list" :mid-button="true" active-color="#2AB07D" inactive-color="#C0C4CC"></u-tabbar>
	</view>
</template>

<script>
	// import { testApi } from '@/api/test';
	import {
		mapState,
		mapGetters
	} from 'vuex'

	export default {
		data() {
			return {
				list: this.$mConstDataConfig.tabbarList,
				show: false,
			}

		},
		computed: {
			...mapState(['member']),
			...mapGetters(['isLogin'])
		},
		// async onLoad() {
		// 	await this.$http
		// 		.post(`${testApi}`, {
		// 			pageNumber: 1,
		// 			pageSize: 10,
		// 		})
		// 		.then(async r => {
		// 		})
		// 		.catch(err => {
		// 		});
		// },
		methods: {
			navTo(route, type) {
				if (type) {
					this.$mRouter.switchTab({ route });
				} else {
					this.$mRouter.push({ route });
				}
			},
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

	.qucanma {
		width: 640rpx;
		display: flex;
		flex-direction: column;
		gap: 15rpx;
		padding: 66rpx 34rpx;
		color: rgba(77, 113, 111, 1);

		text:nth-child(1) {
			text-align: center;
			font-size: 40rpx;
		}

		.close-button {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 430rpx;
			height: 80rpx;
			border-radius: 20px 0px 20px 0px;
			background: #2B7365;
			margin: auto;
			font-size: 40rpx;
			color: rgba(255, 255, 255, 1);

		}

		.address {
			display: flex;
			gap: 8rpx;
			font-size: 32rpx;
		}

		.divi {
			width: 100%;
			height: 1px;
			background: #4D716F;
			margin-top: 30rpx;
		}

		.erweima {
			width: 430rpx;
			height: 430rpx;
			margin: 80rpx auto;
			background: url(https://img.js.design/assets/img/60ebaa75695146d4363e03a8.png);
			background-size: 100% 100%;
		}
	}

	.content {
		padding: 0 30rpx 40rpx;
		margin-top: -60rpx;
	}

	.entrance {
		height: 204rpx;
		border-radius: 20rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 0px 20px rgba(132, 186, 168, 0.4);
		margin-bottom: 40rpx;
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
		margin-bottom: 40rpx;
		display: flex;
		align-items: stretch;
		gap: 20rpx;


		.left {
			height: 100%;
			border-radius: 8px;
			width: 308rpx;
			display: flex;
			position: relative;
			background: url(https://img.js.design/assets/img/6438e80f7b58e9fa27fdd984.jpg#34140443cfbe601060a2e2e593747c39);
			background-size: 100% 100%;
			box-shadow: 1px 1px 2px rgba(255, 255, 255, 0.7), inset -1px -1px 0px rgba(255, 255, 255, 1), inset 1px 1px 0px rgba(255, 255, 255, 1), -3px -3px 7px rgba(255, 255, 255, 1), 3px 3px 7px rgba(113, 173, 145, 0.5);

			.jrtj {
				position: absolute;
				top: 0;
				left: 0;
				width: 160rpx;
				height: 48rpx;
				font-size: 28rpx;
				font-weight: 500;
				line-height: 48rpx;
				color: rgba(255, 255, 255, 1);
				text-align: center;
				border-radius: 10px 0px 10px 0px;
				background: rgba(255, 195, 0, 1);

			}
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
		height: 368rpx;

		image {
			width: 100%;
			height: 100%;
			border-radius: 32rpx;
		}
	}
</style>