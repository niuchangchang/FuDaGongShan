<template>
	<view class="container">
		<u-navbar title="订单详情" title-color="#FFFFFF" title-bold="true" back-icon-color="#FFFFFF" :border-bottom="false"
			:background="{ backgroundImage: 'linear-gradient(to bottom, rgb(128, 172, 148), rgb(145, 187, 170))' }"></u-navbar>
		<content :has-bottom="false">
			<view class="order-container">
				<view class="status-container">
					<view>
						请在<text>9分59秒</text>内完成支付，过时订单将会取消
					</view>
					<view class="status-button-group">
						<view class="button">取消订单</view>
						<view class="button submit-button">立即支付</view>
					</view>
				</view>
				<view class="confirm-container">
					<view class="address">
						<u-icon name="map" size="60" color="#DDE7F4"></u-icon>
						<view class="address-text">
							<text>上海融创茂GO店</text>
							<text>上海市市禅城区佛山大道北143号</text>
							<text>手机：15888886666</text>
						</view>
					</view>
					<view class="er-code">
						<text>取餐码</text>
						<view class="er-code-image"></view>
					</view>
				</view>
				<view class="step-container">
					<view class="step-item"
						:class="{'step-item-selected': orderInfo.status >= 5, 'step-item-done': orderInfo.status > 5}">
						<view class="icon"></view>
						<view class="info">
							<text>骑手送到取餐点</text>
						</view>
						<view class="time">13:13</view>
					</view>
					<view class="step-item"
						:class="{'step-item-selected': orderInfo.status >= 4, 'step-item-done': orderInfo.status > 4}">
						<view class="icon"></view>
						<view class="info">
							<text>交付中</text>
							<text>准备好，我们的送货员很快就来了！</text>
						</view>
						<view class="time">13:13</view>
					</view>
					<view class="step-item"
						:class="{'step-item-selected': orderInfo.status >= 3, 'step-item-done': orderInfo.status > 3}">
						<view class="icon"></view>
						<view class="info">
							<text>菜品打包中...</text>
						</view>
						<view class="time">13:13</view>
					</view>
					<view class="step-item"
						:class="{'step-item-selected': orderInfo.status >= 2, 'step-item-done': orderInfo.status > 2}">
						<view class="icon"></view>
						<view class="info">
							<text>订单已确认</text>
							<text>已接受付款并确认订单</text>
						</view>
						<view class="time">13:13</view>
					</view>
					<view class="step-item"
						:class="{'step-item-selected': orderInfo.status >= 1, 'step-item-done': orderInfo.status > 1}">
						<view class="icon"></view>
						<view class="info">
							<text>订单通过</text>
							<text>订单验证完成</text>
						</view>
						<view class="time">13:13</view>
					</view>
				</view>
				<view class="detail-container">
					<view>订单号：{{ orderInfo.orderNo }}</view>
					<view class="sku-list">
						<view v-for="(sku, skuIndex) in orderInfo.skuList" :key="skuIndex" class="sku-item">
							<image :src="sku.img"></image>
							<view class="sku-content">
								<view class="title">{{ sku.title }}</view>
								<text>{{ sku.current }}/份</text>
							</view>
							<view class="content-num">x {{ sku.num }}</view>
							<view class="content-price">
								<text>¥{{ sku.current }}</text>
							</view>
						</view>
					</view>
					<view class="cell-list">
						<view class="cell-item"><text>商品金额</text><text>¥80.00</text></view>
						<view class="cell-item"><text>餐盒费</text><text>¥0.00</text></view>
						<view class="cell-item"><text>配送费</text><text>¥0.00</text></view>
						<view class="cell-item"><text>优惠费</text><text>¥0.00</text></view>
					</view>
					<view class="price-sum">
						<view class="">优惠 <text>¥0.00</text></view>
						<view class="">实付款 ¥80.00</view>
					</view>
					<view class="cell-list">
						<view class="cell-item"><text>订单号</text><text>887757879879809809</text></view>
						<view class="cell-item"><text>取餐点</text><text>上海市哈哈哈哈哈哈哈哈</text></view>
						<view class="cell-item"><text>支付方式</text><text>微信支付</text></view>
						<view class="cell-item"><text>下单时间</text><text>2023-05-22 10:11:10</text></view>
						<view class="cell-item"><text>送达时间</text><text>2023-05-22 10:11:10</text></view>
						<view class="cell-item"><text>取餐时间</text><text>2023-05-22 10:11:10</text></view>
					</view>
				</view>
				<view class="button-group">
					<u-button type="info"
						:custom-style="{'background': '#2B7365', 'width': '160rpx', 'height': '84rpx', 'font-size': '28rpx'}">再来一单</u-button>
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
				orderInfo: {
					orderId: 1,
					orderNo: '3897497579795677689',
					status: 4,
					skuList: [{
						skuId: 11,
						title: '韩式炒年糕',
						price: 39,
						current: 29,
						num: 1,
						img: 'https://img.js.design/assets/img/62d27af891c472310a453e44.png'
					}, {
						skuId: 12,
						title: '葱油拌面',
						price: 39,
						current: 35,
						num: 2,
						img: 'https://img.js.design/assets/img/62d27af8b10f3369c549297a.png'
					}]
				},
			};
		},
		onLoad() {},
		methods: {}
	};
</script>

<style lang="scss" scoped>
	.order-container {
		height: 100%;
		overflow: auto;
		padding: 40rpx 20rpx;
		font-size: 28rpx;
		color: #3C454B;

		.status-container {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 38rpx;
			padding: 36rpx 0 56rpx;
			margin-bottom: 28rpx;
			background: #FFFFFF;
			border-radius: 5px;
			color: #4D716F;

			.status-button-group {
				display: flex;
				align-items: center;
				gap: 30rpx;

				.button {
					display: flex;
					justify-content: center;
					align-items: center;
					width: 160rpx;
					height: 52rpx;
					border-radius: 0px 15px 0px 15px;
					background: #FFFFFF;
					border: 1px solid #2B7365;
				}

				.submit-button {
					background: #2B7365;
					color: #FFFFFF;
					border-radius: 15px 0px 15px 0px;
				}
			}
		}

		.confirm-container {
			display: flex;
			justify-content: space-between;
			gap: 20rpx;
			margin-bottom: 28rpx;
			padding: 32rpx;
			background: #FFFFFF;
			border-radius: 5px;
			box-shadow: 0px 10px 40px rgba(26, 77, 160, 0.16);

			.address {
				display: flex;
				gap: 20rpx;
				font-size: 24rpx;

				.address-text {
					display: flex;
					flex-direction: column;
					gap: 20rpx;
					color: #6E7C87;

					text:nth-child(1) {
						color: #4D716F;
					}
				}
			}

			.er-code {
				display: flex;
				flex-direction: column;
				gap: 10rpx;
				align-items: center;

				text {
					color: #4D716F;
				}

				.er-code-image {
					width: 100rpx;
					height: 100rpx;
					background: #000000;
				}
			}

		}

		.step-container {
			display: flex;
			flex-direction: column;
			gap: 40rpx;
			padding: 38rpx;
			margin-bottom: 28rpx;
			background: #FFFFFF;
			border-radius: 5px;

			.step-item {
				position: relative;
				display: flex;
				gap: 30rpx;
				height: 70rpx;
				padding-left: 60rpx;
				color: #6E7C87;
				font-size: 24rpx;

				&::before {
					position: absolute;
					top: 6rpx;
					left: 0;
					content: '';
					width: 24rpx;
					height: 24rpx;
					background: #DDE7F4;
					border-radius: 50%;
				}

				&::after {
					position: absolute;
					top: 50rpx;
					left: 4rpx;
					content: '. . . .';
					writing-mode: vertical-lr;
					white-space: nowrap;
				}

				.icon {
					width: 44rpx;
					height: 44rpx;
					background: #DDE7F4;
				}

				.info {
					flex: 1;
					display: flex;
					flex-direction: column;
					gap: 4rpx;

					text:nth-child(2) {
						font-size: 20rpx;
						color: #3C454B;
					}
				}

				.time {
					font-size: 22rpx;
				}

				&-selected {
					color: #3C454B;

					&::before {
						background: #646C77;
					}
				}

				&-done {
					&::before {
						left: -6rpx;
						top: 0;
						width: 40rpx;
						height: 40rpx;
					}
				}

				&:last-child {
					&::after {
						position: absolute;
						top: 0;
						left: 0;
						content: '';
					}
				}
			}
		}


		.detail-container {
			display: flex;
			flex-direction: column;
			padding: 32rpx;
			background: #FFFFFF;
			border-radius: 5px;
			box-shadow: 0px 10px 40px rgba(26, 77, 160, 0.16);

			.sku-list {
				display: flex;
				flex-direction: column;
				gap: 20rpx;
				padding: 30rpx 0;

				.sku-item {
					display: flex;
					gap: 12rpx;
					align-items: center;

					image {
						width: 72rpx;
						height: 72rpx;
					}

					.sku-content {
						flex: 1;
						display: flex;
						flex-direction: column;
						justify-content: space-evenly;

						.title {
							color: #4D716F;
						}

						text {
							color: #98A1AF;
							font-size: 24rpx;
						}
					}

					.content-num {
						font-size: 24rpx;
						color: #999999;
						margin-right: 20rpx;
					}

					.content-price {
						text:nth-child(1) {
							font-weight: 700;
						}
					}
				}
			}

			.cell-list {
				display: flex;
				flex-direction: column;
				gap: 16rpx;
				padding: 40rpx 0;

				.cell-item {
					display: flex;
					justify-content: space-between;
				}
			}

			.price-sum {
				display: flex;
				align-items: center;
				justify-content: flex-end;
				gap: 40rpx;
				padding: 10rpx 0 40rpx;
				border-bottom: 1px solid #F5F5F5;

				text {
					color: #FF0000;
				}
			}
		}

		.button-group {
			display: flex;
			justify-content: center;
			align-items: center;
			gap: 20rpx;
			padding: 40rpx 0;
		}
	}
</style>