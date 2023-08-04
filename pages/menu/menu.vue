<template>
	<view class="container">
		<u-navbar title="点餐" title-color="#FFFFFF" title-bold="true" :is-back="false" :border-bottom="false"
			:background="{ backgroundImage: 'linear-gradient(to bottom, rgb(128, 172, 148), rgb(145, 187, 170))' }"></u-navbar>
		<content :has-top="true" :has-bottom="true">
			<view class="order-container">
				<view class="swiper">
					<u-tabs-swiper ref="tabs1" :list="swiperlist" gutter="80" :show-bar="false" font-size="28"
						height="60" bg-color="#F2F7F0" active-color="#FFFFFF" inactive-color="#6E7C87"
						:active-item-style="{background: '#71AD91', 'border-radius': '5px'}"></u-tabs-swiper>
				</view>
				<view class="diancan-list">
					<view v-for="(item, index) in productList" :key="index" class="diancan-item"
						@click="showInfo(item)">
						<view class="diancan-item-up">
							<view class="diancan-item-up-left"></view>
							<view class="diancan-item-up-right">
								<view class="diancan-item-up-right-jb">
									<view class="diancan-item-up-right-bt">
										{{item.title}}
									</view>
									<view class="diancan-item-up-right-jg">
										￥{{item.price}}
									</view>
								</view>
								<view class="diancan-item-up-right-js">
									{{item.jieshao}}
								</view>
								<view class="diancan-item-up-right-mj">
									<view v-for="(manjianitem, manjianindex) in item.manjianlist" :key="manjianindex"
										class="manjian-item">
										{{manjianitem.name}}
									</view>
								</view>
								<view class="diancan-item-up-right-jk">
									<view class="diancan-item-up-right-jk-up">
										健康指数
									</view>
									<view class="diancan-item-up-right-jk-down">
										<view v-for="(jkitem,jkindex) in item.jklist" :key="jkindex"
											class="jk-down-item">
											<view class="jk-down-item-up">
												{{jkitem.value }}
											</view>
											<view class="jk-down-item-down">
												{{jkitem.name}}
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
						<view class="diancan-item-down">
							<text class="diancan-item-down-label">推荐度 {{item.tuijiansu}}%</text>
							<u-line-progress class="diancan-item-down-jdt" active-color="#71AD91" :percent="70"
								height="14" inactive-color="#F2F7F0" :show-percent="false"></u-line-progress>
						</view>
						<view class="add">
							<u-icon name="plus-circle-fill" color="#4D716F" size="60"></u-icon>
						</view>
					</view>
				</view>
			</view>
		</content>
		<u-popup v-model="showPopup" mode="center" border-radius="16">
			<view class="info">
				<view class="info-icon">
					<view class="icon">
						<u-icon name="share" size="20"></u-icon>
					</view>
					<view class="icon" @click="close">
						<u-icon name="close" size="20"></u-icon>
					</view>
				</view>
				<view class="info-content">
					<view class="info-up"></view>
					<view class="info-center">
						<view class="info-center-jb">
							<view class="info-center-bt">
								{{info.title}}
							</view>
						</view>
						<view class="info-center-mj">
							<view v-for="(manjianitem, manjianindex) in info.manjianlist" :key="manjianindex"
								class="info-center-manjian">
								{{manjianitem.name}}
							</view>
						</view>
						<view class="info-center-jg">
							￥{{info.price}}/份
						</view>
						<view class="info-center-jk">
							<view class="info-center-jk-up">
								健康指数
							</view>
							<view class="info-center-item-up-jk-down">
								<view v-for="(jkitem,jkindex) in info.jklist" :key="jkindex"
									class="info-center-jk-down-item">
									<view class="info-center-jk-down-item-up">
										{{jkitem.value }}
									</view>
									<view class="info-center-jk-down-item-down">
										{{jkitem.name}}
									</view>
								</view>
							</view>
						</view>
						<view class="info-center-tjd">
							<text class="info-center-label">推荐度 {{info.tuijiansu}}%</text>
							<u-line-progress class="info-center-jdt" active-color="#71AD91" :percent="70" height="14"
								inactive-color="#F2F7F0" :show-percent="false"></u-line-progress>
						</view>
						<view class="info-center-js">
							<text>详细介绍</text>
							<view class="info-center-js-content"></view>
						</view>
					</view>
				</view>
				<view class="info-down">
					<view class="info-down-left" @tap="navTo('/pages/cart/cart', 1)">
						<u-icon name="shopping-cart" size="48"></u-icon>
						购物车
					</view>
					<view class="info-down-right">
						<view class="info-down-right-cart">
							加入购物车
						</view>
						<view class="info-down-right-buy">
							立即购买
						</view>
					</view>
				</view>
			</view>
		</u-popup>
		<u-tabbar :list="list" :mid-button="true" active-color="#2AB07D" inactive-color="#C0C4CC"></u-tabbar>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				list: this.$mConstDataConfig.tabbarList,
				swiperlist: [{
					name: '上榜餐厅'
				}, {
					name: '多年老店'
				}, {
					name: '人气餐厅',
					// count: 5
				}, {
					name: '人气',
				}],
				showPopup: false,
				info: {
					title: '藕片',
					price: 12.0,
					jieshao: '菜品介绍菜品介绍菜品介绍菜品介绍菜品介绍菜品介绍...',
					manjianlist: [{
						name: '20减3 40减7'
					}, {
						name: '新客减4'
					}],
					jklist: [{
						name: '千卡',
						value: '114'
					}, {
						name: '千克',
						value: '1'
					}],
					tuijiansu: 80
				},
				productList: [{
						title: '藕片',
						price: 12.0,
						jieshao: '菜品介绍菜品介绍菜品介绍菜品介绍菜品介绍菜品介绍...',
						manjianlist: [{
							name: '20减3 40减7'
						}, {
							name: '新客减4'
						}],
						jklist: [{
							name: '千卡',
							value: '114'
						}, {
							name: '千克',
							value: '1'
						}],
						tuijiansu: 80
					},
					{
						title: '藕片1',
						price: 12.0,
						jieshao: '菜品介绍菜品介绍菜品介绍菜品介绍菜品介绍菜品介绍...',
						manjianlist: [{
							name: '20减3 40减7'
						}, {
							name: '新客减4'
						}],
						jklist: [{
							name: '千卡',
							value: '114'
						}, {
							name: '千克',
							value: '1'
						}],
						tuijiansu: 80
					},
					{
						title: '藕片2',
						price: 12.0,
						jieshao: '菜品介绍菜品介绍菜品介绍菜品介绍菜品介绍菜品介绍...',
						manjianlist: [{
							name: '20减3 40减7'
						}, {
							name: '新客减4'
						}],
						jklist: [{
							name: '千卡',
							value: '114'
						}, {
							name: '千克',
							value: '1'
						}],
						tuijiansu: 80
					},
					{
						title: '藕片3',
						price: 12.0,
						jieshao: '菜品介绍菜品介绍菜品介绍菜品介绍菜品介绍菜品介绍...',
						manjianlist: [{
							name: '20减3 40减7'
						}, {
							name: '新客减4'
						}],
						jklist: [{
							name: '千卡',
							value: '114'
						}, {
							name: '千克',
							value: '1'
						}],
						tuijiansu: 80
					}
				]
			}
		},
		async onLoad() {},
		onShow() {
			this.showPopup = false
		},
		computed: {

		},
		methods: {
			showInfo(item) {
				this.showPopup = true
			},
			close() {
				this.showPopup = false
			},
			navTo(route, type) {
				if (type) {
					this.$mRouter.switchTab({ route });
				} else {
					this.$mRouter.push({ route });
				}
			},
		}
	};
</script>

<style lang="scss" scoped>
	.order-container {
		height: 100%;
	}

	.swiper {
		height: 150rpx;
		padding: 40rpx 32rpx;
	}

	.info {
		position: relative;
		width: 670rpx;
		height: 1300rpx;
		border-radius: 20rpx;
		background: #FFFFFF;

		.info-icon {
			position: absolute;
			top: 10rpx;
			right: 14rpx;
			display: flex;
			gap: 10rpx;

			.icon {
				width: 40rpx;
				height: 40rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				background: #FFFFFF;
				border-radius: 50%;
			}
		}

		.info-content {
			height: calc(100% - 140rpx);
			overflow: auto;
		}

		.info-up {
			height: 400rpx;
			border-radius: 10px 10px, 0px, 0px;
			background: url(https://img.js.design/assets/img/6438e80e82fcf570063255d3.jpg#9c2b20dc156cd83fdd1ca51a15ffe57f);
			background-size: 100% 100%;
		}

		.info-center {
			padding: 40rpx 24rpx;

			.info-center-jb {
				display: flex;
				justify-content: space-between;
				font-size: 30rpx;
				color: rgba(77, 113, 111, 1);
				margin-bottom: 14rpx;
			}

			.info-center-mj {
				display: flex;
				align-items: center;
				gap: 8rpx;
				margin-bottom: 14rpx;

				.info-center-manjian {
					padding: 2rpx 8rpx;
					border-radius: 2px;
					border: 0.5px solid rgba(77, 113, 111, 1);
					font-size: 20rpx;
					color: rgba(77, 113, 111, 1);

				}
			}

			.info-center-jg {
				font-size: 28rpx;
				color: rgba(43, 115, 101, 1);
				margin-bottom: 14rpx;
			}

			.info-center-jk {
				margin-bottom: 14rpx;

				.info-center-jk-up {
					font-size: 24rpx;
					color: rgba(77, 113, 111, 1);
					margin-bottom: 14rpx;
				}

				.info-center-item-up-jk-down {
					display: flex;
					align-items: center;
					gap: 12rpx;

					.info-center-jk-down-item {
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: space-evenly;
						width: 60rpx;
						height: 90rpx;
						background: rgba(242, 247, 240, 1);
						border-radius: 50rpx;

						.info-center-jk-down-item-up {
							display: flex;
							justify-content: center;
							align-items: center;
							width: 45rpx;
							height: 45rpx;
							background: rgba(255, 255, 255, 1);
							font-size: 22rpx;
							font-weight: 700;
							color: rgba(77, 113, 111, 1);
							border-radius: 50%;
						}

						.info-center-jk-down-item-down {
							font-size: 14rpx;
							color: rgba(77, 113, 111, 1);
						}
					}
				}
			}

			.info-center-tjd {
				display: flex;
				align-items: center;
				gap: 20rpx;
				width: 544rpx;
				height: 34rpx;
				margin-bottom: 32rpx;

				.info-center-label {
					font-size: 22rpx;
					font-weight: 500;
					color: rgba(77, 113, 111, 1);
				}

				.info-center-jdt {
					width: 400rpx;

				}
			}

			.info-center-js {
				font-size: 28rpx;
				color: rgba(77, 113, 111, 1);

				.info-center-js-content {
					width: 100%;
					height: 900rpx;
					margin-top: 20rpx;
					background: url(https://img.js.design/assets/img/646ad8d90c416ea114c76135.png#75b80287004e87b795f79cfeb9fc631b);
					background-size: 100% 100%;
				}
			}
		}

		.info-down {
			position: absolute;
			bottom: 0;
			width: 100%;
			height: 140rpx;
			padding: 20rpx;
			background: #FFFFFF;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.info-down-left {
				display: flex;
				flex-direction: column;
				align-items: center;
				width: 72rpx;
				font-size: 24rpx;
				color: rgba(110, 124, 135, 1);

			}

			.info-down-right {
				display: flex;

				.info-down-right-cart {
					width: 190rpx;
					height: 56rpx;
					border-radius: 20px 0px 0px 0px;
					background: #F2F7F0;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 24rpx;
					color: rgba(43, 115, 101, 1);


				}

				.info-down-right-buy {
					width: 200rpx;
					height: 56rpx;
					border-radius: 0px 0px 20px 0px;
					background: #2B7365;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 24rpx;
					color: #FFFFFF;
				}
			}
		}

	}

	.diancan-list {
		height: calc(100% - 150rpx);
		overflow-y: auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 40rpx;
		padding: 0 40rpx 80rpx;

		.diancan-item {
			position: relative;
			background: rgba(255, 255, 255, 1);
			border-radius: 16rpx;
			box-shadow: 1px 1px 2px rgba(255, 255, 255, 0.7), inset -1px -1px 0px rgba(255, 255, 255, 1), inset 1px 1px 0px rgba(255, 255, 255, 1), -3px -3px 7px rgba(255, 255, 255, 1), 3px 3px 7px rgba(113, 173, 145, 0.5);
			padding: 26rpx 26rpx 20rpx 22rpx;

			.diancan-item-up {
				display: flex;
				justify-content: space-between;
				gap: 28rpx;

				.diancan-item-up-left {
					width: 264rpx;
					height: 290rpx;
					background: url(https://img.js.design/assets/img/62e7b277b3784b2dc60dbcd2.png);
					border-radius: 20rpx;
				}

				.diancan-item-up-right {
					flex: 1;

					.diancan-item-up-right-jb {
						display: flex;
						justify-content: space-between;
						font-size: 32rpx;
						font-weight: 700;
						color: rgba(77, 113, 111, 1);
						margin-bottom: 8rpx;
					}

					.diancan-item-up-right-js {
						font-size: 24rpx;
						color: rgba(110, 124, 135, 1);
						margin-bottom: 14rpx;
					}

					.diancan-item-up-right-mj {
						display: flex;
						align-items: center;
						gap: 8rpx;
						margin-bottom: 16rpx;

						.manjian-item {
							padding: 2rpx 8rpx;
							border-radius: 2px;
							border: 0.5px solid rgba(77, 113, 111, 1);
							font-size: 20rpx;
							color: rgba(77, 113, 111, 1);

						}
					}

					.diancan-item-up-right-jk {
						.diancan-item-up-right-jk-up {
							font-size: 24rpx;
							color: rgba(77, 113, 111, 1);
							margin-bottom: 8rpx;
						}

						.diancan-item-up-right-jk-down {
							display: flex;
							align-items: center;
							gap: 12rpx;

							.jk-down-item {
								display: flex;
								flex-direction: column;
								align-items: center;
								justify-content: space-evenly;
								width: 60rpx;
								height: 90rpx;
								background: rgba(242, 247, 240, 1);
								border-radius: 50rpx;

								.jk-down-item-up {
									display: flex;
									justify-content: center;
									align-items: center;
									width: 45rpx;
									height: 45rpx;
									background: rgba(255, 255, 255, 1);
									font-size: 22rpx;
									font-weight: 700;
									color: rgba(77, 113, 111, 1);
									border-radius: 50%;
								}

								.jk-down-item-down {
									font-size: 14rpx;
									color: rgba(77, 113, 111, 1);
								}
							}
						}
					}
				}
			}

			.diancan-item-down {
				display: flex;
				align-items: center;
				gap: 20rpx;
				width: 544rpx;
				height: 34rpx;
				margin-top: 12rpx;

				.diancan-item-down-label {
					font-size: 22rpx;
					font-weight: 500;
					color: rgba(77, 113, 111, 1);
				}

				.diancan-item-down-jdt {
					width: 400rpx;

				}
			}

			.add {
				position: absolute;
				bottom: 20rpx;
				right: 20rpx;
			}
		}
	}
</style>