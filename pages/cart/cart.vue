<template>
	<view class="container">
		<u-navbar  :is-back="false" title="购物车" title-color="#FFFFFF" title-bold="true" back-icon-color="#FFFFFF" border-bottom="false"
			:background="{ backgroundImage: 'linear-gradient(to bottom, rgb(128, 172, 148), rgb(145, 187, 170))' }"></u-navbar>
		<content :has-top="true" :has-bottom="true">
			<view class="cart-container">
				<view class="cart">
					<view class="cart-list">
						<view v-for="(item,index) in cartList" :key="index" class="cart-item">
							<u-checkbox @change="checkboxChange" v-model="item.checked" :name="item.title"
								shape="circle" active-color="#2B7365">
							</u-checkbox>
							<view class="cart-item-image">
								<img :src="item.image" alt="">
							</view>
							<view class="cart-item-content">
								<view class="cart-item-content-up">
									<view class="cart-item-content-bj">
										<view class="title">
											{{item.title}}
										</view>
										<view class="sum-price">
											¥{{item.price * item.num}}
										</view>
									</view>
									<view class="price">
										¥{{item.price}}/份
									</view>
								</view>
								<view class="cart-item-content-down">
									<u-number-box v-model="item.num" min="1" size="24" bg-color="#4D716F"
										color="#FFFFFF" @change="valChange"></u-number-box>
								</view>
							</view>
						</view>
					</view>
					<view class="cart-sum">
						<view class="cart-sum-up">
							<u-checkbox @change="allCheckboxChange" v-model="allChecked" name="全选" shape="circle"
								active-color="#2B7365" label-size="26">全选</u-checkbox>
							<view class="sum">
								合计：¥60.00
							</view>
						</view>
						<view class="cart-buy" @tap="navTo('/pages/orders/create')">
							立即下单
						</view>
					</view>
				</view>
			</view>
		</content>
		<u-tabbar :list="list" :mid-button="true" active-color="#2AB07D" inactive-color="#C0C4CC"></u-tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: this.$mConstDataConfig.tabbarList,
				cartList: [{
					title: '排骨',
					price: 20.00,
					image: 'https://img.js.design/assets/img/62e7b277b3784b2dc60dbcd2.png',
					num: 1,
					checked: false,
				}, {
					title: '排骨1',
					price: 20,
					image: 'https://img.js.design/assets/img/62e7b277b3784b2dc60dbcd2.png',
					num: 1,
					checked: false,
				}, {
					title: '排骨3',
					price: 20,
					image: 'https://img.js.design/assets/img/62e7b277b3784b2dc60dbcd2.png',
					num: 1,
					checked: false,
				}],
				allChecked: false
			}
		},
		methods: {
			// 选中某个复选框时，由checkbox时触发
			checkboxChange(e) {
				console.log(e);
			},
			// 选中全选时，由checkbox时触发
			allCheckboxChange(e) {
				console.log(e);
				this.cartList.map(val => {
					val.checked = e.value;
				})
			},
			valChange(e) {
				console.log('当前值为: ' + e.value)
			},
			navTo(route) {
				this.$mRouter.push({ route });
			},
		}
	}
</script>

<style lang="scss" scoped>
	.cart-container {
		height: 100%;
		padding: 42rpx 26rpx;

		.cart {
			max-height: 100%;
			display: flex;
			flex-direction: column;
			border-radius: 10px;
			background: #FFFFFF;
			box-shadow: 0px 10px 40px rgba(26, 77, 160, 0.16);

			.cart-list {
				flex: 1;
				width: 100%;
				display: flex;
				flex-direction: column;
				padding: 36rpx 18rpx;
				max-height: calc(100% - 220rpx);
				overflow: auto;
				border-bottom: 1px solid #DDE7F4;

				.cart-item {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 30rpx;

					.cart-item-image {
						width: 126rpx;
						height: 126rpx;
						margin-right: 28rpx;

						image {
							width: 100%;
							height: 100%;
							border-radius: 12rpx;
						}
					}

					.cart-item-content {
						flex: 1;

						.cart-item-content-up {
							.cart-item-content-bj {
								display: flex;
								justify-content: space-between;
								margin-bottom: 6rpx;
								color: #4D716F;

								.title {
									font-size: 30rpx;
								}

								.sum-price {
									font-size: 24rpx;
									font-weight: 700;
								}
							}

							.price {
								font-size: 24rpx;
								color: #98A1AF;
							}
						}

						.cart-item-content-down {
							display: flex;
							justify-content: flex-end;
						}
					}
				}
			}

			.cart-sum {
				width: 100%;
				height: 220rpx;
				padding: 16rpx 18rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				gap: 40rpx;

				.cart-sum-up {
					width: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					color: #2B7365;
					font-size: 26rpx;
					font-weight: 500;
				}

				.cart-buy {
					width: 100%;
					height: 80rpx;
					display: flex;
					align-items: center;
					justify-content: center;
					border-radius: 15px 0px 15px 0px;
					background: #2B7365;
					font-size: 40rpx;
					color: #FFFFFF;
				}
			}
		}
	}
</style>
<style>
	.u-number-input {
		background: #F8F5F2 !important;
		color: #4D716F !important;
	}

	.u-checkbox__label {
		color: #4D716F !important;
	}
</style>