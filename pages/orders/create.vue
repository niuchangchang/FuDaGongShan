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
								<view class="title" @click="chooseSideboard">
									<text>{{ sideboardInfo.title }}</text>
									<u-icon name="arrow-right" size="40"></u-icon>
								</view>
								<view class="distance">
									<u-icon name="map" size="30"></u-icon>
									<text>距离您{{ sideboardInfo.distance }}km</text>
								</view>
								<text class="tel">联系电话：{{ sideboardInfo.tel }}</text>
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
							<u-cell-item title="优惠券" :value="couponList.length ? (couponInfo.text || '请选择') : '暂无优惠券'"
								@click="chooseCoupon"></u-cell-item>
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
		<!-- <u-action-sheet :list="sideboardList" v-model="showSideboard" @click="handleChooseSideboard"></u-action-sheet> -->
		<u-popup v-model="showSideboard" mode="bottom" :closeable="true" border-radius="20">
			<view class="popup-container">
				<view class="popup-title">选择取餐点</view>
				
								
				<scroll-view scroll-y="true" class="popup-content">
					<template v-if="sideboardList.length">
						<view v-for="(item, index) in sideboardList" :key="index" class="confirm-container"
							@click="handleChooseSideboard(index)">
							<view class="address">
								<view class="address-text">
									<view class="title">
										<text>{{ item.title }}</text>
										<view v-if="item.id === sideboardInfo.id" class="choose">当前选择</view>
									</view>
									<view class="distance">
										<u-icon name="map" size="30"></u-icon>
										<text>距离您{{ item.distance }}km</text>
										<text> | </text>
										<text>{{ item.address }}km</text>
									</view>
									<text class="tel">联系电话：{{ item.tel }}</text>
								</view>
							</view>
						</view>
					</template>
					<template v-else>
						<view>暂无取餐点哦～</view>
					</template>
					
				</scroll-view>
								
								
						
				
			</view>
		</u-popup>
		<!-- 选择优惠券 -->
		<!-- <u-action-sheet :list="couponList" v-model="showCoupon" @click="handleChooseCoupon"></u-action-sheet> -->
		<u-popup v-model="showCoupon" mode="bottom" :closeable="true" border-radius="20">
			<view class="popup-container">
				<view class="popup-title">选择优惠券</view>
				<scroll-view scroll-y="true" class="popup-content">
					<template v-if="couponList.length">
						<view v-for="(item, index) in couponList" :key="index" class="choose-container"
							@click="handleChooseCoupon(index)">
							<view>
							</view>
						</view>
					</template>
					<template v-else>
						<view class="no-data">暂无可用优惠卷哦～</view>
					</template>
				</scroll-view>
			</view>
		</u-popup>
		
		
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
				items: ['餐柜寄存', '我的地址'],
				activeColor: '#007aff',
				styleType: 'text',
				current: 0,
				
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
			onClickItem(e) {
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex
				}
			},
			// 创建订单
			async createOrder() {
				const params = {
					productId: this.productId,
					cartIdList: this.cartIdList,
					latitude: 0,
					longitude: 0
				}
				// console.log('===创建订单参数', params)
				await this.$http
					.post(`${orderCreate}`, params)
					.then(r => {
						this.orderInfo = r.data
						this.sideboardList = this.orderInfo.sideboardList.map(item => {
							return {
								...item,
								text: item.title
							}
						})
						this.sideboardInfo = this.sideboardList.filter(item => item.id === this.orderInfo
							.sideboardId)[0]
						this.couponList = this.orderInfo.couponList.map(item => {
							return {
								...item,
								text: item.name
							}
						})
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
				console.log(this)
			},
			// 选择取餐点
			chooseSideboard() {
				// if (!this.sideboardList.length) return false;
				this.showSideboard = true
			},
			handleChooseSideboard(index) {
				this.sideboardInfo = this.sideboardList[index]
				this.orderInfo.sideboardId = this.sideboardInfo.id
			},
			// 选择优惠券
			chooseCoupon() {
				// if (!this.couponList.length) return false;
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
				// return false;
				await this.$http
					.post(`${orderPay}`, params)
					.then(r => {
						console.log(r);
						const that = this;
						if(r.data.payType==1){
							//微信支付
							if(!r.data.wxPayment){
								this.$mHelper.toast('订单支付失败');
								return false;
							}							
							// 调用支付方法										
							uni.requestPayment({							    
								"timeStamp": r.data.wxPayment.timeStamp,        // 时间戳（单位：秒）
								"nonceStr": r.data.wxPayment.nonceStr, // 随机字符串
								"package": r.data.wxPayment.package,        // 固定值
								"signType": r.data.wxPayment.signType, // V3版本仅支持RSA
								"paySign": r.data.wxPayment.paySign, // 签名，这里用的 MD5/RSA 签名
								"appId": r.data.wxPayment.appId,  // 微信开放平台 - 应用 - AppId，注意和微信小程序、公众号 AppId 可能不一致								
							    success(res) {
									console.log('支付成功', res, this,that);
									that.$mHelper.toast('订单支付成功');									
									that.$mRouter.redirectTo({
										route: '/pages/orders/pay'
									});
								},
							    fail(e) {
									console.log('支付失败', e);
									that.$mHelper.toast('订单支付失败');
									that.$mRouter.redirectTo({
										route: `/pages/orders/detail?orderId=${r.data.orderId}`
									});
									
								}
							});
							
							
							
						}
						else{
							this.$mHelper.toast('订单支付成功');
							// this.$mRouter.redirectTo('/pages/orders/pay');
							this.$mRouter.redirectTo({
								route: '/pages/orders/pay'
							});
						}

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

				.title {
					display: flex;
					align-items: center;
					font-size: 40rpx;

					.choose {
						padding: 6rpx 40rpx;
						border-radius: 20rpx 0px 20rpx 0px;
						background: #2B7365;
						color: #FFFFFF;
						font-size: 24rpx;
					}
				}

				.distance {
					font-size: 28rpx;
					color: rgba(0, 0, 0, 0.5);
				}

				.tel {
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

	.popup-container {
		display: flex;
		flex-direction: column;
		gap: 30rpx;
		padding: 26rpx 0;

		.popup-title {
			flex: 1;
			text-align: center;
			font-size: 28rpx;
			color: #4D716F;
			font-weight: 700;
		}

		.popup-content {
			max-height: 1000rpx;
			// display: flex;
			// flex-direction: column;
		}

		.confirm-container {
			margin: 40rpx 26rpx;

			&:first-child {
				margin: 50rpx 26rpx 40rpx;
			}

			&:last-child {
				margin: 40rpx 26rpx 80rpx;
			}
		}
		
		.no-data {
			margin: 100rpx 0 160rpx;
			text-align: center;
			color: #808080;
			font-size: 32rpx;
		}
	}
</style>
<style>
	.u-cell {
		padding: 18rpx 0 !important;
	}
</style>