<template>
	<view class="container">
		<u-navbar title="我的订单" title-color="#FFFFFF" title-bold="true" back-icon-color="#FFFFFF" :border-bottom="false"
			:background="{ backgroundImage: 'linear-gradient(to bottom, rgb(128, 172, 148), rgb(145, 187, 170))' }"></u-navbar>
		<content :has-bottom="false">
			<view class="order-container">
				<view class="search-container">
					<u-search placeholder="请输入订单号" v-model="keyword" bg-color="#FFFFFF" height="80"
						:show-action="false"></u-search>
				</view>
				<u-tabs-swiper name="text" :list="orderNavList" :is-scroll="false" height="100" font-size="32"
					bg-color="#F2F7F0" active-color="#2B7365"></u-tabs-swiper>
				<view class="order-list">
					<view v-for="(item, index) in orderList" :key="index" class="order-item">
						<view class="order-title">
							<view>订单号：{{ item.orderNo }}</view>
							<view class="status">{{ item.status | orderStatus }}</view>
						</view>
						<view class="sku-list">
							<view v-for="(sku, skuIndex) in item.skuList" :key="skuIndex" class="sku-item">
								<image :src="sku.img"></image>
								<view class="sku-content">
									<view class="title">{{ sku.title }}</view>
									<view class="content">
										<view class="content-price">
											<text>¥{{ sku.current }}</text>
											<text>¥{{ sku.price }}</text>
										</view>
										<view class="content-num">x {{ sku.num }}</view>
									</view>
								</view>
							</view>
						</view>
						<!-- 待付款 -->
						<view v-if="item.status === 1" class="button-group">
							<u-button type="info"
								:custom-style="{'width': '140rpx', 'height': '64rpx', 'font-size': '28rpx'}">再来一单</u-button>
							<u-button type="info"
								:custom-style="{'width': '140rpx', 'height': '64rpx', 'font-size': '28rpx'}">取消订单</u-button>
							<u-button type="info"
								:custom-style="{'background': '#2B7365', 'width': '140rpx', 'height': '64rpx', 'font-size': '28rpx'}">付款</u-button>
						</view>
						<!-- 待配送 -->
						<view v-if="item.status === 2" class="button-group">
							<u-button type="info"
								:custom-style="{'width': '140rpx', 'height': '64rpx', 'font-size': '28rpx'}">再来一单</u-button>
							<u-button type="info"
								:custom-style="{'width': '140rpx', 'height': '64rpx', 'font-size': '28rpx'}">查看订单</u-button>
							<u-button type="info"
								:custom-style="{'background': '#2B7365', 'width': '140rpx', 'height': '64rpx', 'font-size': '28rpx'}">付款</u-button>
						</view>
						<!-- 已完成 -->
						<view v-if="item.status === 3" class="button-group">
							<u-button type="info"
								:custom-style="{'width': '140rpx', 'height': '64rpx', 'font-size': '28rpx'}">再来一单</u-button>
							<u-button type="info"
								:custom-style="{'width': '140rpx', 'height': '64rpx', 'font-size': '28rpx'}">删除订单</u-button>
							<u-button type="info"
								:custom-style="{'width': '140rpx', 'height': '64rpx', 'font-size': '28rpx'}">查看订单</u-button>
							<u-button type="info"
								:custom-style="{'background': '#2B7365', 'width': '140rpx', 'height': '64rpx', 'font-size': '28rpx'}">待评价</u-button>
						</view>
					</view>
				</view>
			</view>
		</content>
	</view>
</template>

<script>
	import mConstDataConfig from '@/config/constData.config.js';
	export default {
		components: {},
		data() {
			return {
				orderNavList: this.$mConstDataConfig.orderNavList,
				orderList: [{
					orderId: 1,
					orderNo: '3897497579795677689',
					status: 1,
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
				}, {
					orderId: 2,
					orderNo: '3897497579795677689',
					status: 2,
					skuList: [{
						skuId: 11,
						title: '韩式炒年糕',
						price: 39,
						current: 29,
						num: 1,
						img: 'https://img.js.design/assets/img/62d27af891c472310a453e44.png'
					}]
				}, {
					orderId: 3,
					orderNo: '3897497579795677689',
					status: 3,
					skuList: [{
						skuId: 11,
						title: '韩式炒年糕',
						price: 39,
						current: 29,
						num: 1,
						img: 'https://img.js.design/assets/img/62d27af891c472310a453e44.png'
					}]
				}],
			}
		},
		computed: {},
		filters: {
			orderStatus(val) {
				console.log('====val', mConstDataConfig.orderStatus)
				const statusText = mConstDataConfig.orderStatus.filter(item => item.key === val)[0].value
				return statusText
			}
		},
		methods: {

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

		.order-list {
			display: flex;
			flex-direction: column;
			gap: 34rpx;
			height: calc(100% - 210rpx);
			padding: 30rpx;
			overflow: auto;

			.order-item {
				display: flex;
				flex-direction: column;
				gap: 16rpx;
				padding: 22rpx 20rpx 22rpx 10rpx;
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