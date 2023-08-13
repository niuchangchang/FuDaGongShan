<template>
	<view class="container">
		<u-navbar title="确认订单" title-color="#FFFFFF" title-bold="true" back-icon-color="#FFFFFF" :border-bottom="false"
			:background="{ backgroundImage: 'linear-gradient(to bottom, rgb(128, 172, 148), rgb(145, 187, 170))' }"></u-navbar>
		<content :has-bottom="false">
			<view class="order-container">
				<view class="info-container">
					<view class="confirm-container" v-if="sideboardList.length">
						<view class="address">
							<view class="address-text">
								<view @click="chooseSideboard">
									<text>{{ sideboardInfo.title }}</text>
									<u-icon name="arrow-right" size="40"></u-icon>
								</view>
								<view>
									<u-icon name="map" size="30"></u-icon>
									<text>距离您{{ sideboardInfo.distance }}km</text>
								</view>
								<text>联系电话：{{ sideboardInfo.tel }}</text>
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
							<view class="">合计: ¥{{ orderInfo.payAmountFormat }}</view>
						</view>
						<u-cell-group :border="false">
							<u-cell-item title="优惠券" :value="couponList.length ? (couponInfo.text || '请选择') : '暂无优惠券'" @click="chooseCoupon"></u-cell-item>
							<!-- <u-cell-item title="红包" value="请选择"></u-cell-item> -->
							<!-- <u-cell-item title="备注" :border-bottom="false"></u-cell-item> -->
						</u-cell-group>
					</view>
					<view class="price-container">
						<view class="cell-list">
							<view class="cell-item">
								<text>商品金额</text><text>¥{{ orderInfo.productPricesFormat | emptyValue }}</text>
							</view>
							<view class="cell-item">
								<text>餐盒费</text><text>¥{{ orderInfo.mealBoxFeeFormat | emptyValue }}</text>
							</view>
							<view class="cell-item">
								<text>配送费</text><text>¥{{ orderInfo.deliveryFeeFormat | emptyValue }}</text>
							</view>
							<view class="cell-item">
								<text>优惠费</text><text>¥{{ orderInfo.discountAmountFormat | emptyValue }}</text>
							</view>
							<view class="cell-item">
								<text>实付款</text><text>¥{{ orderInfo.payAmountFormat | emptyValue }}</text>
							</view>
						</view>
					</view>
					<view class="pay-container">
						<u-radio-group v-model="orderInfo.payType" @change="radioGroupChange">
							<view class="cell-list">
								<view class="cell-item">
									<view class="cell-item-title">
										<u-icon name="integral" color="#C8C8C8" size="32"></u-icon>
										<text>余额支付</text>
									</view>
									<view class="cell-item-content">
										<text class="cell-item-value">
											{{ orderInfo.userBalancesFormat && orderInfo.userBalancesFormat > orderInfo.payAmountFormat ? orderInfo.userBalancesFormat : '余额不足' }}
										</text>
										<u-radio :name="0" active-color="#4D716F"></u-radio>
									</view>
								</view>
								<view class="cell-item">
									<view class="cell-item-title">
										<u-icon name="weixin-circle-fill" color="#C8C8C8" size="32"></u-icon>
										<text>微信支付</text>
									</view>
									<u-radio :name="1" active-color="#4D716F"></u-radio>
								</view>
							</view>
						</u-radio-group>
					</view>
				</view>
				<view class="button-group">
					<text>实付款：¥{{ orderInfo.payAmountFormat | emptyValue }}</text>
					<view class="buy-button" @click="handlePay">去结算</view>
				</view>
			</view>
		</content>
		<!-- 选择取餐柜 -->
		<u-action-sheet :list="sideboardList" v-model="showSideboard" @click="handleChooseSideboard"></u-action-sheet>
		<!-- 选择优惠券 -->
		<u-action-sheet :list="couponList" v-model="showCoupon" @click="handleChooseCoupon"></u-action-sheet>
	</view>
</template>

<script>
	import {
		orderCreate,
		orderPay
	} from '@/api/url';
	export default {
		components: {},
		data() {
			return {
				productId: null,
				cartIdList: null,
				orderInfo: {},
				sideboardList: [],
				sideboardInfo: {},
				couponList: [],
				couponInfo: {},
				showSideboard: false,
				showCoupon: false,
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
			this.productId = options.productId
			this.cartIdList = options.cartIdList ? JSON.parse(options.cartIdList) : null
			this.createOrder()
		},
		methods: {
			// 创建订单
			async createOrder() {
				const params = {
					productId: this.productId,
					cartIdList: this.cartIdList,
					latitude: 0,
					longitude: 0
				}
				console.log('===创建订单参数', params)
				await this.$http
					.post(`${orderCreate}`, params)
					.then(r => {
						console.log('====orderInfo', r.data)
						this.orderInfo = r.data
						this.sideboardList = this.orderInfo.sideboardList.map(item => {
							return { ...item, text: item.title }
						})
						this.sideboardInfo = this.sideboardList.filter(item => item.id === this.orderInfo.sideboardId)[0]
						// this.couponList = this.orderInfo.couponList.map(item => {
						// 	return { ...item, text: item.name }
						// })
						this.couponList = [{
							id: 0,
							title: '优惠券一',
							text: '优惠券一'
						}, {
							id: 1,
							title: '优惠券二',
							text: '优惠券二'
						}]
						// 找到默认显示的优惠券
						this.couponInfo = this.couponList.filter(item => item.id === this.orderInfo.couponId)[0]
					})
					.catch(err => {
						this.$mHelper.toast('订单创建失败，请稍后重试');
						this.$mRouter.back();
					});
			},
			// 选中任一radio时，由radio-group触发
			radioGroupChange(e) {
				console.log(e);
			},
			// 选择取餐点
			chooseSideboard() {
				if(!this.sideboardList.length) return false;
				this.showSideboard = true
			},
			handleChooseSideboard(index) {
				this.sideboardInfo = this.sideboardList[index]
				this.orderInfo.sideboardId = this.sideboardInfo.id
			},
			// 选择优惠券
			chooseCoupon() {
				if(!this.couponList.length) return false;
				this.showCoupon = true
			},
			handleChooseCoupon(index) {
				this.couponInfo = this.couponList[index]
				this.orderInfo.couponId = this.couponInfo.id
			},
			// 结算
			async handlePay() {
				const params = {
					...this.orderInfo
				}
				console.log('===结算参数', params)
				await this.$http
					.post(`${orderPay}`, params)
					.then(r => {
						console.log('====pay result', r.data)
						this.$mHelper.toast('订单支付成功');
						// this.$mRouter.redirectTo('/pages/orders/pay');
						this.$mRouter.redirectTo({ route: '/pages/orders/pay' });
					})
					.catch(err => {
						this.$mHelper.toast('订单支付失败，请重试');
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
				
				.cell-item-content {
					display: flex;
					align-content: center;
					gap: 20rpx;
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