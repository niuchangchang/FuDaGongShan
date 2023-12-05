<template>
	<view class="container">
		<u-navbar :is-back="false" title="购物车" title-color="#FFFFFF" title-bold="true" back-icon-color="#FFFFFF"
			border-bottom="false"
			:background="{ backgroundImage: 'linear-gradient(to bottom, rgb(128, 172, 148), rgb(145, 187, 170))' }"></u-navbar>
		<content :has-top="true" :has-bottom="true">
			<view class="cart-container">
				<view v-if="cartList.length" class="cart">
					<view class="cart-list">
						<u-checkbox-group @change="checkboxGroupChange">
							<view v-for="(item, index) in cartList" :key="index" class="cart-item">
								<u-checkbox @change="checkboxChange" v-model="item.checked" :name="item.cartId"
									shape="circle" active-color="#2B7365">
								</u-checkbox>
								<view class="cart-item-image">
									<img :src="$mImgHost(item.imageCover)" alt="">
								</view>
								<view class="cart-item-content">
									<view class="cart-item-content-up">
										<view class="cart-item-content-bj">
											<view class="title">
												{{item.productTitle}}
											</view>
											<view class="sum-price">
												¥{{item.totalPricesFormat}}
											</view>
										</view>
										<view class="price">
											¥{{item.pricesFormat}}/{{item.unit}}
										</view>
									</view>
									<view class="cart-item-content-down">
										<u-number-box v-model="item.quantity" min="1" size="24" bg-color="#4D716F"
											color="#FFFFFF" @change="valChange(item)"></u-number-box>
									</view>
								</view>
							</view>
						</u-checkbox-group>
					</view>
					<view class="cart-sum">
						<view class="cart-sum-up">
							<view class="button">
								<u-checkbox @change="allCheckboxChange" v-model="allChecked" name="全选" shape="circle"
									active-color="#2B7365" label-size="26">全选</u-checkbox>
								<view v-if="checkedList.length" class="remove" @click.stop="handleRemoveCart">删除</view>
							</view>
							<view class="sum">
								合计：¥{{ totalPrice }}
							</view>
						</view>
						<view class="cart-buy" @tap="handleCreateOrder">
							立即下单
						</view>
					</view>
				</view>
				<view v-else class="no-list">
					购物车空空如也～
				</view>
			</view>
		</content>
		<u-tabbar :list="list" :mid-button="true" mid-button-size="70" active-color="#2AB07D" inactive-color="#C0C4CC"></u-tabbar>
	</view>
</template>

<script>
	import {
		cartCount,
		cartList,
		updateCart,
		removeCart,
		orderCreate
	} from '@/api/url';
	import { mapMutations } from 'vuex';
	export default {
		data() {
			return {
				list: this.$mConstDataConfig.tabbarList,
				cartList: [],
				checkedList: [],
				allChecked: false,
			}
		},
		async onShow() {
			await this.getCartCount()
			await this.getCartList()
		},
		computed: {
			totalPrice() {
				const {
					cartList
				} = this
				let price = 0
				cartList.map(item => {
					if (item.checked) {
						price += item.totalPricesFormat
					}
				})
				return price
			}
		},
		methods: {
			...mapMutations(['setCartNum']),
			async getCartCount() {
				await this.$http
					.post(`${cartCount}`)
					.then(async r => {
						this.setCartNum(r.data);
						this.list = this.$mConstDataConfig.tabbarList
					})
					.catch(err => {});
			},
			navTo(route) {
				this.$mRouter.push({
					route
				});
			},
			// 获取购物车列表
			async getCartList() {
				await this.$http
					.post(`${cartList}`)
					.then(async r => {
						this.cartList = r.data;
						// 去除cartList没有的选中项
						const newCheckedList = []
						this.cartList.map(item => {
							const hasItem = this.checkedList.filter(filterItem => filterItem === item.cartId)
							if(hasItem.length) {
								newCheckedList.push(item.cartId)
							}
						})
						setTimeout(()=> {
							this.checkedList = newCheckedList
							if (this.checkedList.length) {
								// 回显选中项
								this.cartList.map(item => {
									this.checkedList.map(checkedItem => {
										if (item.cartId === checkedItem) {
											item.checked = true
										}
									})
								})
								this.allChecked = this.checkedList.length === this.cartList.length
							} else {
								this.allChecked = false
							}
						}, 100)
					})
					.catch(err => {});
			},
			// 整组复选框改变时，由checkbox-group时触发
			checkboxGroupChange(e) {
				// console.log('==整组选中数组', e)
				// this.checkedList = e
				// this.allChecked = this.checkedList.length === this.cartList.length
			},
			// 选中某个复选框时，由checkbox时触发
			checkboxChange(e) {
				// console.log('===e', e.name, e.value)
				if(e.value) {
					this.checkedList.push(e.name)
				} else {
					this.checkedList.splice(this.checkedList.indexOf(e.value), 1)
				}
				// console.log('====checkedList', this.checkedList.length)
				this.allChecked = this.checkedList.length === this.cartList.length
			},
			// 选中全选时，由checkbox时触发
			allCheckboxChange(e) {
				this.checkedList = []
				this.cartList.map(item => {
					item.checked = e.value;
					if(e.value) this.checkedList.push(item.cartId)
				})
				// console.log('===allChecked', this.allChecked)
				// console.log('====checkedList', this.checkedList)
			},
			// 数量变化
			valChange(item) {
				this.updateCart(item)
			},
			// 修改购物车
			async updateCart(item) {
				await this.$http
					.post(`${updateCart}`, {
						id: item.cartId,
						quantity: item.quantity
					})
					.then(async r => {
						this.getCartList()
					})
					.catch(err => {});
			},
			// 删除购物车
			handleRemoveCart() {
				const _this = this
				uni.showModal({
					content: '确定要移除此商品吗？',
					success: e => {
						if (e.confirm) {
							_this.checkedList.map(item => {
								_this.removeCart(item)
							})
							_this.getCartCount()
						}
					}
				});
			},
			// 移除购物车
			async removeCart(item) {
				const _this = this
				await this.$http
					.post(`${removeCart}/${item}`)
					.then(async r => {
						this.getCartList()
						_this.getCartCount()
					})
					.catch(err => {});
			},
			// 创建订单
			handleCreateOrder() {
				if (!this.checkedList.length) {
					this.$mHelper.toast('请先选择商品');
					return;
				}
				this.navTo(`/pages/orders/create?cartIdList=${JSON.stringify(this.checkedList)}`)
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

					.button {
						display: flex;
						align-items: center;

						.remove {
							font-size: 26rpx;
							color: #fa3534;
						}
					}
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