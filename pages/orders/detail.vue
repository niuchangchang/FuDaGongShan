<template>
	<view class="container">
		<u-navbar title="订单详情" title-color="#FFFFFF" title-bold="true" back-icon-color="#FFFFFF" :border-bottom="false"
			:background="{ backgroundImage: 'linear-gradient(to bottom, rgb(128, 172, 148), rgb(145, 187, 170))' }"></u-navbar>
		<content :has-bottom="false">
			<view class="order-container">
				<view v-if="orderInfo.orderStatus === 0" class="status-container">
					<view>
						请在<text>9分59秒</text>内完成支付，过时订单将会取消
					</view>
					<view class="status-button-group">
						<view class="button">取消订单</view>
						<view class="button submit-button">立即支付</view>
					</view>
				</view>
				<view v-if="orderInfo.orderProcess === 5" class="confirm-container">
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
						<view @click="showERCode" class="er-code-image">
							<image :src="$mImgHost('/images/qr.png')"></image>
						</view>
					</view>
				</view>
				<view class="step-container">
					<view v-for="(item, index) in orderInfo.orderProcessList" :key="index" class="step-item"
						:class="{'step-item-selected': item.processStatus == orderInfo.orderProcess, 'step-item-done': item.processStatus < orderInfo.orderProcess}">
						<img :src="$mImgHost(item.lineImage)" alt="" class="lineImage">
						<img :src="$mImgHost(item.icon)" alt="" class="icon">
						<view class="info">
							<text>{{ item.title }}</text>
							<text>{{ item.reamrk }}</text>
						</view>
						<!-- <view class="time">13:13</view> -->
					</view>
				</view>
				<view class="detail-container">
					<view>订单号：{{ orderInfo.orderNo }}</view>
					<view class="sku-list">
						<view v-for="(sku, skuIndex) in orderInfo.orderProductList" :key="skuIndex" class="sku-item">
							<image :src="$mImgHost(sku.imageCover)"></image>
							<view class="sku-content">
								<view class="title">{{ sku.productTitle }}</view>
								<text>{{ sku.unitPricesFormat }}/份</text>
							</view>
							<view class="content-num">x {{ sku.quantity }}</view>
							<view class="content-price">
								<text>¥{{ sku.productPricesFormat }}</text>
							</view>
						</view>
					</view>
					<view class="cell-list">
						<view class="cell-item"><text>商品金额</text><text>¥{{ orderInfo.productPricesFormat }}</text>
						</view>
						<view class="cell-item"><text>餐盒费</text><text>¥{{ orderInfo.mealBoxFeeFormat }}</text></view>
						<view class="cell-item"><text>配送费</text><text>¥{{ orderInfo.deliveryFeeFormat }}</text></view>
						<view class="cell-item"><text>优惠费</text><text>¥{{ orderInfo.discountAmountFormat }}</text>
						</view>
					</view>
					<view class="price-sum">
						<view class="">优惠 <text>¥{{ orderInfo.discountAmountFormat }}</text></view>
						<view class="">实付款 ¥{{ orderInfo.payAmountFormat }}</view>
					</view>
					<view class="cell-list">
						<view class="cell-item"><text>订单号</text><text>{{ orderInfo.orderNo }}</text></view>
						<view class="cell-item"><text>取餐点</text><text>{{ orderInfo.sideboardTitle | emptyValue }}</text>
						</view>
						<view class="cell-item"><text>支付方式</text><text>{{ orderInfo.payTypeDescription }}</text></view>
						<view class="cell-item"><text>下单时间</text><text>{{ orderInfo.createDate | emptyValue }}</text>
						</view>
						<view class="cell-item"><text>送达时间</text><text>{{ orderInfo.sendTime | emptyValue }}</text>
						</view>
						<view class="cell-item"><text>取餐时间</text><text>{{ orderInfo.pickupTime | emptyValue }}</text>
						</view>
					</view>
				</view>
				<view class="button-group">
					<u-button type="info"
						:custom-style="{'background': '#2B7365', 'width': '160rpx', 'height': '84rpx', 'font-size': '28rpx'}">再来一单</u-button>
				</view>
			</view>
		</content>
		<!-- 取餐码列表 -->
		<u-popup v-model="show" mode="center" border-radius="16">
			<view class="qucanma">
				<text>取餐码</text>
				<view class="popup-content">
					<swiper :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish"
						class="swiper">
						<swiper-item class="swiper-item" v-for="(item, index) in codeList" :key="index">
							<view class="code">{{ item.pickupCode }}</view>
							<view class="address">
								<u-icon name="photo" size="40"></u-icon>
								<text>{{ item.sideboardAddress }}</text>
							</view>
							<view class="address">
								<u-icon name="photo" size="40"></u-icon>
								<text>{{ item.sideboardTitle }}</text>
							</view>
							<view class="divi"></view>
							<view class="erweima">
								<image :src="$mImgHost(item.pickupQr)" mode=""></image>
							</view>
						</swiper-item>
					</swiper>
				</view>
				<view class="button-group">
					<view class="prev" :class="{'gray': swiperCurrent === 0}" @click="prev">上一个</view>
					<view class="pickup" :class="{'gray': pickupInfo.isPickup}" @click="pickup">取餐</view>
					<view class="next" :class="{'gray': swiperCurrent === codeList.length - 1}" @click="next">下一个</view>
				</view>
				<view class="close-button" @click="close">
					关闭
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		orderDetail,
		erCodeList,
		pickup
	} from '@/api/url';
	export default {
		components: {},
		data() {
			return {
				orderId: '',
				orderInfo: {},
				show: false,
				codeList: [],
				swiperCurrent: 0,
				pickupInfo: {}
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
			this.orderId = options.orderId
			this.getOrderDetail()
		},
		methods: {
			// 订单详情
			async getOrderDetail() {
				await this.$http
					.post(`${orderDetail}/${this.orderId}`)
					.then(r => {
						this.orderInfo = r.data
						this.orderInfo.orderProcessList.reverse()
					})
					.catch(err => {
						this.$mHelper.toast('获取订单详情出错，请稍后重试～');
						this.$mRouter.back();
					});
			},
			showERCode() {
				this.show = true
				this.getCodeList()
			},
			close() {
				this.show = false
			},
			// 获取取餐码列表
			async getCodeList() {
				await this.$http
					.post(`${erCodeList}/${this.orderId}`)
					.then(r => {
						this.codeList = r.data
						this.pickupInfo = this.codeList[this.swiperCurrent]
					})
					.catch(err => {
						this.$mHelper.toast('获取取餐码出错，请重试～');
					});
			},
			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition(e) {
				let dx = e.detail.dx;
			},
			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			animationfinish(e) {
				let current = e.detail.current;
				this.swiperCurrent = current;
				this.pickupInfo = this.codeList[this.swiperCurrent]
			},
			prev() {
				if (this.swiperCurrent > 0) this.swiperCurrent = this.swiperCurrent - 1;
				this.pickupInfo = this.codeList[this.swiperCurrent]
			},
			next() {
				if (this.swiperCurrent < this.codeList.length - 1) this.swiperCurrent = this.swiperCurrent + 1;
				this.pickupInfo = this.codeList[this.swiperCurrent]
			},
			async pickup() {
				await this.$http
					.post(`${pickup}/${this.pickupInfo.orderDetailId}`)
					.then(r => {
						this.$mHelper.toast('成功取餐');
						this.getCodeList()
					})
					.catch(err => {
						this.$mHelper.toast('取餐出错，请重试～');
					});
			},
		}
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

					image {
						width: 100%;
						height: 100%;
					}
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
					// position: absolute;
					// top: 6rpx;
					// left: 0;
					// content: '';
					// width: 24rpx;
					// height: 24rpx;
					// background: #DDE7F4;
					// border-radius: 50%;
				}

				&::after {
					position: absolute;
					top: 42rpx;
					left: 4rpx;
					content: '. . . .';
					writing-mode: vertical-lr;
					white-space: nowrap;
				}
				
				.lineImage {
					position: absolute;
					top: 0;
					left: 2rpx;
					width: 24rpx;
					height: 24rpx;
				}

				.icon {
					width: 44rpx;
					height: 44rpx;
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
					&::after {
						top: 50rpx;
					}
					.lineImage {
						left: -8rpx;
						width: 44rpx;
						height: 44rpx;
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

		.swiper {
			height: 100%;
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

		.button-group {
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 430rpx;
			margin: 0 auto 60rpx;
			font-size: 20rpx;
			color: #FFFFFF;

			view {
				padding: 6rpx 36rpx;
			}

			.prev {
				border-radius: 0px 10px 0px 10px;
				background: #2B7365;
			}

			.pickup {
				background: #E84C4F;
			}

			.next {
				border-radius: 10px 0px 10px 0px;
				background: #2B7365;
			}

			.gray {
				background: #C4C4C4;
				color: #A6A6A6;
			}
		}

		.popup-content {
			display: flex;
			flex-direction: column;
			height: 600rpx;
		}

		.code {
			text-align: center;
			font-weight: 700;
			font-size: 32rpx;
			margin-bottom: 20rpx;
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
			margin: auto;

			image {
				width: 100%;
				height: 100%;
			}
		}
	}
</style>