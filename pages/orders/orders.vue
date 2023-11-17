<template>
	<view class="container">
		<u-navbar title="我的订单" title-color="#FFFFFF" title-bold="true" back-icon-color="#FFFFFF" :is-back="false"
			:border-bottom="false"
			:background="{ backgroundImage: 'linear-gradient(to bottom, rgb(128, 172, 148), rgb(145, 187, 170))' }"></u-navbar>
		<content :has-bottom="true">
			<view class="order-container">
				<view class="search-container">
					<u-search placeholder="请输入订单号" v-model="keyword" bg-color="#FFFFFF" height="80"
						:show-action="false"></u-search>
				</view>
				<u-tabs-swiper ref="tabs1" name="text" :list="orderNavList" :is-scroll="false" :current="current"
					@change="tabsChange" height="100" font-size="32" bg-color="#F2F7F0"
					active-color="#2B7365"></u-tabs-swiper>
				<!--订单列表-->
				<swiper :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish"
					class="swiper-box" duration="300">
					<swiper-item class="tab-content" v-for="(tabItem, tabIndex) in orderNavList" :key="tabIndex">
						<scroll-view class="order-list" scroll-y @scrolltolower="onreachBottom">
							<template v-if="orderList.length">
								<view v-for="(item, index) in orderList" :key="index" class="order-item">
									<view class="order-title">
										<view>订单号：{{ item.orderNo }}</view>
										<view class="status">{{ item.orderStatusDescription }}</view>
									</view>
									<view class="sku-list">
										<view v-for="(sku, skuIndex) in item.orderProductList" :key="skuIndex"
											class="sku-item">
											<image :src="$mImgHost(sku.imageCover)"></image>
											<view class="sku-content">
												<view class="title">{{ sku.productTitle }}</view>
												<view class="content">
													<view class="content-price">
														<text>¥{{ sku.payAmountFormat }}</text>
														<!-- <text>¥{{ sku.price }}</text> -->
													</view>
													<view class="content-num">x {{ sku.quantity }}</view>
												</view>
											</view>
										</view>
									</view>
									<!-- 待付款 -->
									<view v-if="item.orderStatus === 0" class="button-group">
										<u-button type="info"
											:custom-style="{'width': '140rpx', 'height': '64rpx', 'font-size': '28rpx'}"
											@click="orderCancel(item)">取消订单</u-button>
										<u-button type="info"
											:custom-style="{'background': '#2B7365', 'width': '140rpx', 'height': '64rpx', 'font-size': '28rpx'}"
											@click="navTo(`/pages/orders/detail?orderId=${item.id}`)">查看订单</u-button>
										<u-button @click="handlePay(item)" type="info"
											:custom-style="{'background': '#2B7365', 'width': '140rpx', 'height': '64rpx', 'font-size': '28rpx'}">付款</u-button>
									</view>
									<!-- 待配送 -->
									<view v-if="item.orderStatus === 1" class="button-group">
										<u-button type="info"
											:custom-style="{'width': '140rpx', 'height': '64rpx', 'font-size': '28rpx'}">再来一单</u-button>
										<u-button type="info"
											:custom-style="{'background': '#2B7365', 'width': '140rpx', 'height': '64rpx', 'font-size': '28rpx'}"
											@click="navTo(`/pages/orders/detail?orderId=${item.id}`)">查看订单</u-button>
									</view>
									<!-- 已完成 -->
									<view v-if="item.orderStatus === 2" class="button-group">
										<u-button type="info"
											:custom-style="{'width': '140rpx', 'height': '64rpx', 'font-size': '28rpx'}">再来一单</u-button>
										<u-button type="info"
											:custom-style="{'width': '140rpx', 'height': '64rpx', 'font-size': '28rpx'}">删除订单</u-button>
										<u-button type="info"
											:custom-style="{'background': '#2B7365', 'width': '140rpx', 'height': '64rpx', 'font-size': '28rpx'}"
											@click="navTo(`/pages/orders/detail?orderId=${item.id}`)">查看订单</u-button>
										<u-button type="info"
											:custom-style="{'background': '#2B7365', 'width': '140rpx', 'height': '64rpx', 'font-size': '28rpx'}">待评价</u-button>
									</view>
								</view>
							</template>
							<template v-if="!orderList.length && !loading">
								<view class="no-list">暂无订单</view>
							</template>
						</scroll-view>
					</swiper-item>
				</swiper>
				
			</view>
		</content>
		<u-loading :show="loading" mode="flower" class="u-loading"></u-loading>
		<u-tabbar :list="list" :mid-button="true" mid-button-size="70" active-color="#2AB07D"
			inactive-color="#C0C4CC"></u-tabbar>
	</view>
</template>

<script>
	import {
		orderList,
		orderRePay,
		orderCancle
	} from '@/api/url';
	// import mConstDataConfig from '@/config/constData.config.js';
	export default {
		components: {},
		data() {
			return {
				list: this.$mConstDataConfig.tabbarList,
				loading: false,
				keyword: '',
				current: 0,
				swiperCurrent: 0,
				orderNavList: this.$mConstDataConfig.orderNavList,
				orderList: [],
				cancelItem:null
			}
		},
		computed: {},
		filters: {
			// orderStatus(val) {
			// 	console.log('====val', mConstDataConfig.orderStatus)
			// 	const statusText = mConstDataConfig.orderStatus.filter(item => item.key === val)[0].value
			// 	return statusText
			// }
		},
		onShow() {
			const state = uni.getStorageSync('orderState') || 0;
			this.current = Number(state) + 1
			this.getOrderList()
		},
		onLoad(options) {
			// switchTab 不支持传参数
			// console.log('===options', options.state)
			// this.current = Number(options.state) + 1
			// this.getOrderList()
		},
		methods: {
			async getOrderList() {
				const orderStatus = this.orderNavList[this.current].state
				this.loading = true
				await this.$http
					.post(`${orderList}`, {
						keyWord: this.keyword,
						orderStatus: orderStatus,
						page: 1,
						limit: 20,
					})
					.then(async r => {
						this.orderList = r.data;
						this.loading = false
					})
					.catch(err => {
						this.loading = false
					});
			},
			navTo(route) {
				this.$mRouter.push({
					route
				});
			},
			// tabs通知swiper切换
			tabsChange(index) {
				this.swiperCurrent = index;
				this.current = index
				uni.setStorageSync('orderState', index - 1);
				this.getOrderList()
			},
			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition(e) {
				let dx = e.detail.dx;
				this.$refs.tabs1.setDx(dx);
			},
			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			animationfinish(e) {
				let current = e.detail.current;
				this.$refs.tabs1.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			},
			// scroll-view到底部加载更多
			onreachBottom() {

			},
			// 结算
			async handlePay(item) {
				const that=this;
				const params = {
					orderId: item.id,
					payType: item.payType
				}
				console.log('===结算参数', params)
				await this.$http
					.post(`${orderRePay}`, params)
					.then(r => {
						console.log('====pay result', r.data)
						// this.$mHelper.toast('订单支付成功');
						// this.getOrderList()
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
			//取消订单
			orderCancel(item){
				const _this = this
				// 显示确认框
				uni.showModal({
					content: '确定要取消当前订单吗？',
					success: e => {
						if (e.confirm) {
							_this.cancleOrderRequest(item);
						}
					}
				});
				
			},
			// 取消订单
			async cancleOrderRequest(item) {
				await this.$http
					.post(`${orderCancle}/${item.id}`)
					.then(async r => {
						this.$mHelper.toast('订单取消成功');
						this.getOrderList()
					})
					.catch(err => {
						this.$mHelper.toast('操作失败');
					});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.order-container {
		height: 100%;
		padding: 34rpx 0;

		.search-container {
			padding: 0 30rpx;
		}

		.swiper-box {
			height: calc(100% - 210rpx);
		}

		.uni-swiper-item {
			height: auto;
		}

		.order-list {
			display: flex;
			flex-direction: column;
			gap: 34rpx;
			height: 100%;
			width: 100%;
			padding-top: 30rpx;
			overflow: auto;

			.order-item {
				display: flex;
				flex-direction: column;
				gap: 16rpx;
				padding: 22rpx 20rpx 22rpx 10rpx;
				margin: 0 40rpx 40rpx;
				border-radius: 10px;
				background: #FFFFFF;
				box-shadow: 1px 1px 2px #FFFFFF, inset -1px -1px 0px #FFFFFF, inset 1px 1px 0px #FFFFFF, -3px -3px 7px #FFFFFF, 3px 3px 7px #71AD91;
				font-size: 28rpx;

				.order-title {
					display: flex;
					justify-content: space-between;

					.status {
						color: #2B7365;
					}
				}

				.sku-list {
					display: flex;
					flex-direction: column;

					.sku-item {
						display: flex;
						gap: 26rpx;
						padding: 28rpx 0;
						border-bottom: 1px solid #F5F5F5;

						image {
							width: 176rpx;
							height: 176rpx;
						}

						.sku-content {
							flex: 1;
							display: flex;
							flex-direction: column;
							justify-content: space-evenly;

							.title {
								font-size: 32rpx;
								font-weight: 500;
							}

							.content {
								display: flex;
								justify-content: space-between;

								.content-price {
									font-size: 30rpx;

									text:nth-child(1) {
										color: #2B7365;
										font-weight: 500;
										margin-right: 22rpx;
									}

									text:nth-child(2) {
										color: #999999;
										text-decoration: line-through;
									}
								}

								.content-num {
									font-size: 28rpx;
									color: #999999;
								}
							}
						}
					}
				}

				.button-group {
					display: flex;
					justify-content: flex-end;
					gap: 20rpx;
				}
			}
		}
	}
</style>