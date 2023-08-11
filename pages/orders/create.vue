<template>
	<view class="container">
		<u-navbar title="确认订单" title-color="#FFFFFF" title-bold="true" back-icon-color="#FFFFFF" :border-bottom="false"
			:background="{ backgroundImage: 'linear-gradient(to bottom, rgb(128, 172, 148), rgb(145, 187, 170))' }"></u-navbar>
		<content :has-bottom="false">
			<view class="order-container">
				<view class="info-container">
					<view class="confirm-container">
						<view class="address">
							<view class="address-text">
								<view>
									<text>上海融创茂GO店</text>
									<u-icon name="arrow-right" size="40"></u-icon>
								</view>
								<view>
									<u-icon name="map" size="30"></u-icon>
									<text>距离您 0.2km</text>
								</view>
								<text>联系电话：15888886666</text>
							</view>
						</view>
					</view>
					<view class="detail-container">
						<view class="sku-title">商品信息</view>
						<view class="sku-list">
							<view v-for="(sku, skuIndex) in orderInfo.productList" :key="skuIndex" class="sku-item">
								<image :src="$mImgHost(sku.imageCover)"></image>
								<view class="sku-content">
									<view class="title">{{ sku.productTitle }}</view>
									<text>¥{{ sku.pricesFormat }}/{{ sku.unit }}</text>
								</view>
								<view class="content-num">x {{ sku.quantity }}</view>
								<view class="content-price">
									<text>¥{{ sku.totalPricesFormat }}</text>
								</view>
							</view>
						</view>

						<view class="price-sum">
							<view class="">合计: ¥80.00</view>
						</view>
						<u-cell-group :border="false">
							<u-cell-item title="卡券" value="请选择"></u-cell-item>
							<u-cell-item title="红包" value="请选择"></u-cell-item>
							<!-- <u-cell-item title="备注" :border-bottom="false"></u-cell-item> -->
						</u-cell-group>
					</view>
					<view class="price-container">
						<view class="cell-list">
							<view class="cell-item">
								<text>商品金额</text><text>¥{{ orderInfo.productPrices | emptyValue }}</text></view>
							<view class="cell-item">
								<text>餐盒费</text><text>¥{{ orderInfo.mealBoxFee | emptyValue }}</text></view>
							<view class="cell-item">
								<text>配送费</text><text>¥{{ orderInfo.deliveryFee | emptyValue }}</text></view>
							<view class="cell-item">
								<text>优惠费</text><text>¥{{ orderInfo.discountAmount | emptyValue }}</text></view>
							<view class="cell-item"><text>实付款</text><text>¥{{ orderInfo.payAmount | emptyValue }}</text>
							</view>
						</view>
					</view>
					<view class="pay-container">
						<u-radio-group v-model="value" @change="radioGroupChange">
							<view class="cell-list">
								<view class="cell-item">
									<view class="cell-item-title">
										<u-icon name="integral" color="#C8C8C8" size="32"></u-icon>
										<text>余额支付</text>
									</view>
									<text class="cell-item-value">{{ orderInfo.userBalances && orderInfo.userBalances > orderInfo.payAmount ? orderInfo.userBalances : '余额不足' }}</text>
								</view>
								<view class="cell-item">
									<view class="cell-item-title">
										<u-icon name="weixin-circle-fill" color="#C8C8C8" size="32"></u-icon>
										<text>微信支付</text>
									</view>
									<u-radio @change="radioChange" name="weixin" active-color="#4D716F"></u-radio>
								</view>
							</view>
						</u-radio-group>
					</view>
				</view>
				<view class="button-group">
					<text>实付款：¥{{ orderInfo.payAmount | emptyValue }}</text>
					<view class="buy-button" @tap="navTo('/pages/orders/pay')">去结算</view>
				</view>
			</view>
		</content>
	</view>
</template>

<script>
	import {
		orderCreate
	} from '@/api/url';
	export default {
		components: {},
		data() {
			return {
				orderInfo: {},
				value: 'weixin',
			};
		},
		filters: {
			// 数据格式化
			emptyValue(val) {
				if (val === undefined || val === null) {
					return '-'
				} else {
					return val
				}
			}
		},
		onLoad(options) {
			console.log('===options.cartIdList', options.cartIdList)
			this.cartIdList = JSON.parse(options.cartIdList)
			this.createOrder()
		},
		methods: {
			// 创建订单
			async createOrder() {
				const params = {
					productId: null,
					cartIdList: this.cartIdList,
					latitude: 0,
					longitude: 0
				}
				console.log('===创建订单参数', params)
				await this.$http
					.post(`${orderCreate}`, params)
					.then(async r => {
						console.log('====orderInfo', r.data)
						this.orderInfo = r.data
					})
					.catch(err => {
						this.$mHelper.toast('订单创建失败，请稍后重试');
						this.$mRouter.back();
					});
			},
			radioGroupChange(e) {
				console.log(e);
			},
			// 选中某个单选框时，由radio时触发
			radioChange(e) {
				console.log(e);
			},
			navTo(route) {
				this.$mRouter.push({
					route
				});
			},
		}
	};
</script>

<style lang="scss" scoped>
	.order-container {
		height: 100%;
		font-size: 28rpx;
		color: #3C454B;

		.info-container {
			width: 100%;
			height: calc(100% - 120rpx);
			overflow: auto;
			padding: 40rpx 20rpx;
		}

		.confirm-container {
			display: flex;
			justify-content: space-between;
			gap: 20rpx;
			margin-bottom: 46rpx;
			padding: 32rpx;
			background: #FFFFFF;
			border-radius: 10px;
			box-shadow: 0px 10px 40px rgba(26, 77, 160, 0.16);

			.address {
				display: flex;
				gap: 20rpx;
				font-size: 24rpx;

				.address-text {
					display: flex;
					flex-direction: column;
					gap: 20rpx;

					view {
						display: flex;
						align-items: baseline;
						gap: 10rpx;
					}

					text:nth-child(1) {
						font-size: 40rpx;
					}

					text:nth-child(2) {
						font-size: 28rpx;
						color: rgba(0, 0, 0, 0.5);
					}

					text:nth-child(3) {
						font-size: 32rpx;
						color: rgba(0, 0, 0, 0.8);
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

		.detail-container {
			display: flex;
			flex-direction: column;
			padding: 32rpx;
			background: #FFFFFF;
			border-radius: 10px;
			box-shadow: 0px 10px 40px rgba(26, 77, 160, 0.16);
			margin-bottom: 46rpx;

			.sku-title {
				font-size: 40rpx;
				font-weight: 500;
				color: rgba(60, 69, 75, 1);
			}

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

			.price-sum {
				display: flex;
				align-items: center;
				justify-content: flex-end;
				gap: 40rpx;
				padding: 30rpx 0 40rpx;
				border-top: 1px solid #F5F5F5;

				text {
					color: #FF0000;
				}
			}
		}

		.price-container {
			display: flex;
			flex-direction: column;
			padding: 32rpx;
			margin-bottom: 46rpx;
			background: #FFFFFF;
			border-radius: 10px;
			box-shadow: 0px 10px 40px rgba(26, 77, 160, 0.16);
		}

		.pay-container {
			display: flex;
			flex-direction: column;
			padding: 32rpx;
			margin-bottom: 140rpx;
			background: #FFFFFF;
			border-radius: 10px;
			box-shadow: 0px 10px 40px rgba(26, 77, 160, 0.16);
		}

		.button-group {
			height: 120rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 40rpx;
			background: #FFFFFF;

			text {
				padding-left: 40rpx;
				color: #4D716F;
			}

			.buy-button {
				width: 230rpx;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				background: #2B7365;
				color: #FFFFFF;
			}
		}

		.cell-list {
			display: flex;
			flex-direction: column;

			.cell-item {
				display: flex;
				justify-content: space-between;
				border-bottom: 1px solid #F5F5F5;
				padding: 20rpx 0rpx;

				&:last-child {
					border-bottom: none;
				}

				.cell-item-title {
					display: flex;
					align-items: center;
					gap: 10rpx;
				}

				.cell-item-value {
					color: #999999;
				}
			}
		}
	}
</style>
<style>
	.u-cell {
		padding: 18rpx 0 !important;
	}
</style>