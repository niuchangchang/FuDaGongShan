<template>
	<view class="container">
		<u-navbar title="点餐" title-color="#FFFFFF" title-bold="true" :is-back="false" :border-bottom="false"
			:background="{ backgroundImage: 'linear-gradient(to bottom, rgb(128, 172, 148), rgb(145, 187, 170))' }"></u-navbar>
		<content :has-top="true" :has-bottom="true">
			<view class="order-container">
				<view class="swiper">
					<u-tabs-swiper ref="tabs1" :list="swiperlist" gutter="80" :show-bar="false" font-size="28"
						height="60" bg-color="#F2F7F0" active-color="#FFFFFF" inactive-color="#6E7C87"
						:active-item-style="{background: '#71AD91', 'border-radius': '5px'}" name="name"
						:current="current" @change="tabsChange"></u-tabs-swiper>
				</view>
				<swiper :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish"
					class="swiper-box" duration="300">
					<swiper-item class="tab-content" v-for="(tabItem, tabIndex) in swiperlist" :key="tabIndex">
						<scroll-view class="diancan-list" scroll-y @scrolltolower="onreachBottom">
							<view v-for="(item, index) in productList" :key="index" class="diancan-item"
								@click="showInfo(item,index)">
								<view class="diancan-item-up">
									<view class="diancan-item-up-left">
										<image :src="$mImgHost(item.imageCover)"></image>
									</view>
									<view class="diancan-item-up-right">
										<view class="diancan-item-up-right-jb">
											<view class="diancan-item-up-right-bt">
												{{item.title}}
											</view>
											<view class="diancan-item-up-right-jg">
												￥{{item.pricesFormat}}
											</view>
										</view>
										<view class="diancan-item-up-right-js">
											{{item.remark}}
										</view>
										<view class="diancan-item-up-right-mj">
											<view v-for="(manjianitem, manjianindex) in item.couponsList"
												:key="manjianindex" class="manjian-item">
												{{manjianitem}}
											</view>
										</view>
										<view class="diancan-item-up-right-jk">
											<view class="diancan-item-up-right-jk-up">
												健康指数
											</view>
											<view class="diancan-item-up-right-jk-down">
												<view v-for="(jkitem, jkindex) in item.health" :key="jkindex"
													class="jk-down-item">
													<view class="jk-down-item-up">
														{{jkitem.key }}
													</view>
													<view class="jk-down-item-down">
														{{jkitem.value}}
													</view>
												</view>
											</view>
										</view>
									</view>
								</view>
								<view class="diancan-item-down">
									<text class="diancan-item-down-label">推荐度 {{ item.remNumber }}%</text>
									<u-line-progress class="diancan-item-down-jdt" active-color="#71AD91"
										:percent="item.remNumber" height="14" inactive-color="#F2F7F0"
										:show-percent="false"></u-line-progress>
								</view>
								<!-- <view class="add" @click.stop="toAdd('cart', item)"> -->
								<view class="add">
									<u-icon name="plus-circle-fill" color="#4D716F" size="60"></u-icon>
								</view>
							</view>
						</scroll-view>
					</swiper-item>
				</swiper>
			</view>
		</content>
		<u-popup v-model="showPopup" mode="center" border-radius="20" width="90%" height="80%">
			<view class="info">
				<view class="info-icon">
					<view class="icon">
						<u-icon name="share" size="20"></u-icon>
					</view>
					<view class="icon" @click="close">
						<u-icon name="close" size="20"></u-icon>
					</view>
				</view>
				<scroll-view scroll-y="true" style="height: calc(100% - 140rpx);">
					<view class="info-content">
						<view class="info-up">
							<u-swiper :list="info.imageUrlList" height="700" border-radius="0"></u-swiper>
						</view>
						<view class="info-center">
							<view class="info-center-jb">
								<view class="info-center-bt">
									{{info.title}}
								</view>
							</view>
							<view class="info-center-mj">
								<view v-for="(manjianitem, manjianindex) in info.couponsList" :key="manjianindex"
									class="info-center-manjian">
									{{manjianitem}}
								</view>
							</view>
							<view class="info-center-jg">
								￥{{info.pricesFormat}}/份
							</view>
							<view class="info-center-jk">
								<view class="info-center-jk-up">
									健康指数
								</view>
								<view class="info-center-item-up-jk-down">
									<view v-for="(jkitem,jkindex) in info.health" :key="jkindex"
										class="info-center-jk-down-item">
										<view class="info-center-jk-down-item-up">
											{{jkitem.key }}
										</view>
										<view class="info-center-jk-down-item-down">
											{{jkitem.value}}
										</view>
									</view>
								</view>
							</view>
							<view class="info-center-tjd">
								<text class="info-center-label">推荐度 {{ info.remNumber }}%</text>
								<u-line-progress class="info-center-jdt" active-color="#71AD91"
									:percent="info.remNumber" height="14" inactive-color="#F2F7F0"
									:show-percent="false"></u-line-progress>
							</view>
							<view class="info-center-js">
								<text>详细介绍</text>
								<view v-html="info.contents" class="info-center-js-content"></view>
							</view>
						</view>
					</view>
				</scroll-view>
				<view class="info-down">
					<view class="info-down-left" @tap="navTo('/pages/cart/cart', 1)">
						<u-icon name="shopping-cart" size="48"></u-icon>
						购物车
						<u-badge type="error" :count="cartNum" :offset="[-15, -15]"></u-badge>
					</view>
					<view class="info-down-right">
						<view class="info-down-right-cart" @click="toAdd('cart', info)">
							加入购物车
						</view>
						<view class="info-down-right-buy" @click="toAdd('buy', info)">
							立即购买
						</view>
					</view>
				</view>
			</view>
		</u-popup>
		<u-tabbar :list="list" :mid-button="true" mid-button-size="70" active-color="#2AB07D"
			inactive-color="#C0C4CC"></u-tabbar>
	</view>
</template>

<script>
	import {
		productCategoryUrl,
		productUrl,
		addCart,
		cartCount
	} from '@/api/url';
	import indexConfig from '@/config/index.config';
	import {
		mapMutations
	} from 'vuex';
	export default {
		components: {},
		data() {
			return {
				current: 0,
				swiperCurrent: 0,
				list: this.$mConstDataConfig.tabbarList,
				swiperlist: [],
				showPopup: false,
				info: {},
				productList: [],
				// cartNum: uni.getStorageSync('cartNum'),
				cartNum: 0,
			}
		},
		async onLoad() {
			await this.getProductCategory()
			await this.getProductList()
		},
		onShow() {
			this.showPopup = false
		},
		computed: {},
		methods: {
			...mapMutations(['setCartNum']),
			// tabs通知swiper切换
			tabsChange(index) {
				this.swiperCurrent = index;
				this.getProductList()
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
			async getProductCategory() {
				await this.$http
					.post(`${productCategoryUrl}`)
					.then(async r => {
						const cArr = [];
						r.data.forEach((item, index) => {
							cArr.push({
								name: item.title,
								id: item.id
							})
						});
						this.swiperlist = cArr;
					})
					.catch(err => {});
			},
			async getProductList() {
				const categoryId = this.swiperlist[this.swiperCurrent].id
				await this.$http
					.post(`${productUrl}`, {
						categoryId: categoryId,
						page: 1,
						limit: 20,
					})
					.then(async r => {
						console.log('productlist:', r.data)
						this.productList = r.data;
					})
					.catch(err => {});
			},
			showInfo(item, index) {

				this.info = {
					...item,
					imageUrlList: item.imageUrlList.map(image => {
						return this.$mImgHost(image)
					})
				}
				this.getCartCount()
				this.showPopup = true
			},
			close() {
				this.showPopup = false
			},
			navTo(route, type) {
				if (type) {
					this.$mRouter.switchTab({
						route
					});
				} else {
					this.$mRouter.push({
						route
					});
				}
			},
			toAdd(type, item) {
				switch (type) {
					case 'buy':
						// console.log('===item', item)
						this.navTo(`/pages/orders/create?productId=${item.id}`)
						break;
					case 'cart':
						this.addCart(item)
						break;
				}
			},
			async addCart(item) {
				await this.$http
					.post(`${addCart}`, {
						productId: item.id,
						quantity: 1
					})
					.then(async r => {
						this.$mHelper.toast('购物车加入成功');
						this.getCartCount()
					})
					.catch(err => {});
			},
			async getCartCount() {
				await this.$http
					.post(`${cartCount}`)
					.then(async r => {
						this.cartNum = r.data
						this.setCartNum(r.data);
						this.list = this.$mConstDataConfig.tabbarList
					})
					.catch(err => {});
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

	.swiper-box {
		height: calc(100% - 150rpx);
	}

	.tab-content {}

	.info {
		position: relative;
		width: 100%;
		height: 100%;
		background: #FFFFFF;

		.info-icon {
			position: absolute;
			top: 10rpx;
			right: 14rpx;
			display: flex;
			gap: 10rpx;
			z-index: 10;

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
			// height: calc(100% - 140rpx);
			// overflow: auto;
		}

		.info-up {
			// height: 400rpx;
			// border-radius: 10px 10px, 0px, 0px;
			// background: url(https://img.js.design/assets/img/6438e80e82fcf570063255d3.jpg#9c2b20dc156cd83fdd1ca51a15ffe57f);
			// background-size: 100% 100%;
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
					margin-top: 20rpx;
					background-size: 100% 100%;
					line-height: 150%;

					image {
						max-width: 300px;
					}

					img {
						max-width: 300px;
					}
				}

				.info-center-js-content>* {
					max-width: 300px;
				}

				.info-center-js-content>img {
					max-width: 300px;
				}

				.info-center-js-content::v-deep img {
					width: 300px;
				}
			}
		}

		.info-down {
			// position: absolute;
			// bottom: 0;
			width: 100%;
			height: 140rpx;
			padding: 20rpx;
			background: #FFFFFF;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.info-down-left {
				position: relative;
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
		height: 100%;
		overflow-y: auto;
		padding-bottom: 60rpx;
		// display: flex;
		// flex-direction: column;
		// align-items: center;

		.diancan-item {
			position: relative;
			background: rgba(255, 255, 255, 1);
			border-radius: 16rpx;
			box-shadow: 1px 1px 2px rgba(255, 255, 255, 0.7), inset -1px -1px 0px rgba(255, 255, 255, 1), inset 1px 1px 0px rgba(255, 255, 255, 1), -3px -3px 7px rgba(255, 255, 255, 1), 3px 3px 7px rgba(113, 173, 145, 0.5);
			padding: 26rpx 26rpx 20rpx 22rpx;
			margin-bottom: 40rpx;
			margin: 0 40rpx 40rpx;

			.diancan-item-up {
				display: flex;
				justify-content: space-between;
				gap: 28rpx;

				.diancan-item-up-left {
					width: 264rpx;
					height: 264rpx;
					// background: url(https://img.js.design/assets/img/62e7b277b3784b2dc60dbcd2.png);
					border-radius: 20rpx;
					overflow: hidden;
					border: 1px solid #eee;

					image {
						width: 100%;
						height: 100%;
					}
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

<style>
	.info-center-js-content {
		width: 100%;
		margin-top: 20rpx;
		background-size: 100% 100%;
	}

	.info-center-js-content>* {
		max-width: 300px;
	}

	.info-center-js-content>img {
		max-width: 300px;
	}

	.info-center-js-content>image {
		max-width: 300px;
	}
</style>