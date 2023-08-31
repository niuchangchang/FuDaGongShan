<template>
	<view class="container">
		<u-navbar title="我的配送单" title-color="#FFFFFF" title-bold="true" back-icon-color="#FFFFFF" :border-bottom="false"
			:background="{ backgroundImage: 'linear-gradient(to bottom, rgb(128, 172, 148), rgb(145, 187, 170))' }"></u-navbar>
		<content :has-bottom="false">
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
									<view class="detail-container">
										<view class="order-title">
											<text>订单号：{{ item.subOrderNo | emptyValue }}</text>
											<text>{{ item.deliveryStatusDescription }}</text>
										</view>
										<view class="sku-list">
											<view v-for="(sku, skuIndex) in item.orderProductList" :key="skuIndex"
												class="sku-item">
												<image :src="$mImgHost(sku.imageCover)"></image>
												<view class="sku-content">
													<view class="title">{{ sku.productTitle }}</view>
												</view>
												<view class="content-num">x {{ sku.quantity }}</view>
											</view>
										</view>
										<view class="cell-list">
											<view class="cell-item"><text>门店</text><text>{{ item.storeName | emptyValue }}</text>
											</view>
											<view class="cell-item">
												<text>取餐点</text><text>{{ item.sideboardName | emptyValue }}</text>
											</view>
											<view class="cell-item"><text>格子号</text><text>{{ item.cellNumber | emptyValue }}</text>
											</view>
											<view class="cell-item"><text>送达时间</text><text>{{ item.sendTime | emptyValue }}</text></view>
											<view class="cell-item"><text>取餐时间</text><text>{{ item.pickupTime | emptyValue }}</text></view>
										</view>
										<view class="button-group">
											<u-button v-if="item.deliveryStatus === 0" type="info"
												:custom-style="{'background': '#2B7365', 'width': '140rpx', 'height': '64rpx', 'font-size': '28rpx'}"
												@click="handleReceive(item)">接单</u-button>
											<u-button v-if="item.deliveryStatus === 1" type="info"
												:custom-style="{'background': '#2B7365', 'width': '140rpx', 'height': '64rpx', 'font-size': '28rpx'}"
												@click="handleStorage(item)">存餐</u-button>
										</view>
									</view>
								</view>
							</template>
							<template v-else>
								<view class="no-list">暂无订单</view>
							</template>
						</scroll-view>
					</swiper-item>
				</swiper>
			</view>
		</content>
	</view>
</template>

<script>
	import {
		deliveryOrderList,
		deliveryOrderReceive,
		deliveryOrderStorage
	} from '@/api/url';
	// import mConstDataConfig from '@/config/constData.config.js';
	export default {
		components: {},
		data() {
			return {
				keyword: '',
				current: 0,
				swiperCurrent: 0,
				orderNavList: this.$mConstDataConfig.deliveryOrderNavList,
				orderList: [],
			}
		},
		computed: {},
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
		onShow() {
			this.getOrderList()
		},
		onLoad() {},
		methods: {
			async getOrderList() {
				const orderStatus = this.orderNavList[this.swiperCurrent].state
				await this.$http
					.post(`${deliveryOrderList}`, {
						keyWord: this.keyword,
						deliveryStatus: orderStatus,
						page: 1,
						limit: 20,
					})
					.then(async r => {
						this.orderList = r.data;
					})
					.catch(err => {});
			},
			navTo(route) {
				this.$mRouter.push({
					route
				});
			},
			// tabs通知swiper切换
			tabsChange(index) {
				this.swiperCurrent = index;
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
			// 接单
			async handleReceive(item) {
				await this.$http
					.post(`${deliveryOrderReceive}/${item.id}`)
					.then(r => {
						this.$mHelper.toast(r.msg);
						this.getOrderList()
					})
					.catch(err => {
						this.$mHelper.toast(err);
					});
			},
			// 存餐
			async handleStorage(item) {
				await this.$http
					.post(`${deliveryOrderStorage}/${item.id}`)
					.then(r => {
						this.$mHelper.toast(r.msg);
						this.getOrderList()
					})
					.catch(err => {
						this.$mHelper.toast(err);
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

				.detail-container {
					display: flex;
					flex-direction: column;
					padding: 32rpx;
					background: #FFFFFF;
					border-radius: 5px;
					// box-shadow: 0px 10px 40px rgba(26, 77, 160, 0.16);

					.order-title {
						display: flex;
						align-items: center;
						justify-content: space-between;

						text:nth-child(2) {
							color: #2B7365;
						}
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
					justify-content: flex-end;
					gap: 20rpx;
				}
			}
		}
	}
</style>