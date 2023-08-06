<template>
	<view class="container">
		<u-navbar title="支付" title-color="#FFFFFF" title-bold="true" back-icon-color="#FFFFFF" :border-bottom="false"
			:background="{ backgroundImage: 'linear-gradient(to bottom, rgb(128, 172, 148), rgb(145, 187, 170))' }"></u-navbar>
		<content :has-bottom="false">
			<view class="pay-container">
				<view class="pay-icon">
				</view>
				<text class="pay-result">支付成功</text>
				<text class="pay-tips">商家正在准备中~</text>
				<view class="pay-order-button" @tap="navTo('/pages/orders/detail')">
					查看订单
				</view>
				<view class="more-list">
					<view class="more-item">
						<view class="more-content">
							<text class="more-title">分享红包</text>
							<view class="more-money">最高可得<text>5</text>元</view>
							<text class="more-tips">分享朋友后可获得</text>
						</view>
						<view class="divide"></view>
						<view class="more-button">
							分享
						</view>
					</view>
					<view class="more-item">
						<view class="more-content">
							<text class="more-title">分享红包</text>
							<view class="more-money">最高可得<text>5</text>元</view>
							<text class="more-tips">分享朋友后可获得</text>
						</view>
						<view class="divide"></view>
						<view class="more-button">
							分享
						</view>
					</view>
					<view class="more-item">
						<view class="more-content">
							<text class="more-title">分享红包</text>
							<view class="more-money">最高可得<text>5</text>元</view>
							<text class="more-tips">分享朋友后可获得</text>
						</view>
						<view class="divide"></view>
						<view class="more-button more-button-done">
							已到账
						</view>
					</view>
				</view>
			</view>
		</content>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {

			};
		},
		onLoad() {},
		methods: {
			navTo(route) {
				this.$mRouter.redirectTo({ route });
			},
		}
	};
</script>

<style lang="scss" scoped>
	.pay-container {
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 24rpx;
		padding: 80rpx 20rpx;

		.pay-icon {
			width: 173rpx;
			height: 173rpx;
			background: rgba(255, 210, 81, 0.16);
			border-radius: 50%;
		}

		.pay-result {
			font-size: 52rpx;
		}

		.pay-tips {
			font-size: 24rpx;
		}

		.pay-order-button {
			border: 1rpx solid #999999;
			padding: 6rpx 24rpx;
		}

		.more-list {
			width: 100%;
			display: flex;
			align-items: center;
			gap: 2%;
			margin-top: 20rpx;

			.more-item {
				width: 32%;
				height: 280rpx;
				padding: 22rpx 0;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-between;
				gap: 16rpx;
				background: #FFFFFF;
				box-shadow: 0px 0px 6px #666666;

				.more-content {
					display: flex;
					flex-direction: column;
					align-items: center;
					font-size: 20rpx;

					.more-title {
						font-size: 32rpx;
						color: #ED6047;
						margin-bottom: 10rpx;
					}

					.more-money {
						text {
							font-size: 28rpx;
							color: #ED6047;
							margin: 0 5rpx;
						}
					}
				}

				.divide {
					width: 100%;
					height: 2rpx;
					background: #D1D1D1;
				}

				.more-button {
					width: 140rpx;
					height: 52rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					background: #2B7365;
					color: #FFFFFF;
					border-radius: 4rpx;
					font-size: 24rpx;

					&-done {
						border: 1rpx solid #2B7365;
						color: #4D716F;
						background: #FFFFFF;
					}
				}
			}
		}
	}
</style>