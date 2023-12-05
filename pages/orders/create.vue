<template>
	<view class="container">
		<u-navbar title="确认订单" title-color="#FFFFFF" title-bold="true" back-icon-color="#FFFFFF" :border-bottom="false"
			:background="{ backgroundImage: 'linear-gradient(to bottom, rgb(128, 172, 148), rgb(145, 187, 170))' }"></u-navbar>
		<content :has-bottom="false">
			<view class="order-container">
				<view class="coupon-tip">
					<text class="title">{{orderInfo.couponTip||'团购更加优惠哦~'}}</text>
					<view class="iconfont iconarrow-right"></view>
				</view>
				<view class="info-container">
					<u-alert-tips title="团购更加优惠哦"></u-alert-tips>

					<!-- <view class="confirm-container" v-if="sideboardList.length"> -->
					<view class="confirm-container">
						<view class="address">
							<view class="address-text">
								<view class="title">
									<view class="text" @click="chooseSideboard">
										<text>{{ sideboardInfo.title }}</text>
										<u-icon name="arrow-right" size="40"></u-icon>
									</view>

									<view class="right">
										<view class="buytakeout" :class="{active: orderInfo.orderType == 0}"
											@tap="buytakeout">
											<text>外卖</text>
										</view>
										<view class="buyteam" :class="{active: orderInfo.orderType == 1}"
											@tap="buyteam">
											<text>团购</text>
										</view>
									</view>
								</view>
								<view class="distance">
									<u-icon name="map" size="30"></u-icon>
									<text>距离您{{ sideboardInfo.distance||'' }}km</text>
								</view>
								<text class="tel">联系电话：{{ sideboardInfo.tel||'' }}</text>
							</view>
						</view>
					</view>

					<view class="detail-container" v-if="orderInfo.teamId>0">
						<view class="sku-title">团购信息</view>
						<view class="teamitem">
							<view class="teamiteminfo">
								<view class="pic">
									<image :src="getImageUrl('/images/headimg56.svg')">
									</image>
								</view>
								<view class="info">
									<view class="title">配送地址：{{orderInfo.teamInfo.address||''}}</view>
									<view class="attr">团长：{{orderInfo.teamInfo.userName||''}}</view>
									<!-- <view class="attr">结束时间：10:30</view>
									<view class="attr">送餐时间：11:30</view>	 -->
									<view class="pricebox">
										<view class="price">
											<!-- <view class="teamprice">团购价：
											<text class="red">￥35.00</text> 
											<text class="oldprice">￥40.00</text>
											</view> -->
											<view>结束时间：{{orderInfo.teamInfo.endTime||''}}</view>
											<view>送餐时间：{{orderInfo.teamInfo.deliveryTime||''}}</view>
										</view>

									</view>
								</view>
							</view>
							<view class="teamnumber">
								已参与团购{{orderInfo.teamInfo.buyNumber||0}}人，还差{{orderInfo.teamInfo.surplusNumber||0}}人团购成功
							</view>
							<view class="progress">
								<u-line-progress class="info-center-jdt" active-color="#71AD91"
									:percent="orderInfo.teamInfo.bfb" height="14" inactive-color="#F2F7F0"
									:show-percent="false"></u-line-progress>
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
							<view class="">合计: ¥{{ orderInfo.productPricesFormat | emptyValue}}</view>
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
								<text>包装金额</text><text>¥{{ orderInfo.mealBoxFeeFormat | emptyValue }}</text>
							</view>
							<view class="cell-item">
								<text>配送金额</text><text>¥{{ orderInfo.deliveryFeeFormat | emptyValue }}</text>
							</view>
							<view class="cell-item">
								<text>优惠金额</text><text>¥{{ orderInfo.couponsFeeFormat| emptyValue }}</text>
							</view>
							<view class="cell-item">
								<text>折扣金额</text><text>¥{{ orderInfo.discountFeeFormat | emptyValue }}</text>
							</view>
							<view class="cell-item">
								<text>实付金额</text><text>¥{{ orderInfo.payAmountFormat | emptyValue }}</text>
							</view>

						</view>
					</view>
					<view class="pay-container">
						<u-radio-group v-model="orderInfo.payType" @change="radioGroupChange">
							<view class="cell-list">
								<view class="cell-item">
									<view class="cell-item-title">
										<u-icon name="integral" color="#ef931a" size="32"></u-icon>
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
										<u-icon name="weixin-circle-fill" color="#2a7926" size="32"></u-icon>
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
				<!-- <u-tabs :list="list" :is-scroll="false"
					:active-item-style="{'color': '#FFFFFF', 'background': '#4D716F'}" active-color="#4D716F"
					inactive-color='#4D716F' bar-width='50%' height="60" font-size="24" v-model="current"
					@change="change"></u-tabs> -->
				<view class="address-btnbox">
					<u-button type="primary" size="mini">添加地址</u-button>
				</view>
				<scroll-view scroll-y="true" class="popup-content">
					<template v-if="current === 0">
						<template v-if="sideboardList.length">
							<view v-for="(item, index) in sideboardList" :key="index" class="confirm-container"
								@click="handleChooseSideboard(index)">
								<view class="address">
									<view class="address-text">
										<view class="title">
											<view>
												<u-tag :text="item.tag" :type="item.css"></u-tag>
												<text>{{ item.title }}</text>
											</view>
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
					</template>
					<template v-else>
						<template v-if="sideboardList.length">
							<view v-for="(item, index) in addressList" :key="index" class="confirm-container"
								@click="handleChooseAddress(index)">
								<view class="address">
									<view class="address-text">
										<view class="title">
											<text>{{ item.title }}</text>
											<!-- <view v-if="item.id === sideboardInfo.id" class="choose">当前选择</view> -->
										</view>
										<view class="distance">
											<text>{{ item.name }}</text>
										</view>
										<text class="tel">联系电话：{{ item.tel }}</text>
									</view>
								</view>
							</view>
						</template>
						<template v-else>
							<view>暂无收货地址哦～</view>
						</template>
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

		<u-popup v-model="showTeam" mode="bottom" :closeable="true" border-radius="20">
			<view class="popup-container">
				<view class="popup-title">发起团购</view>
				<template class="popup-content">
					<view class="cell-list form-container">
						<u-form :model="teamInfo" ref="form1" label-position="left" :border-bottom="false"
							:label-style="{'color': '#6E7C87', 'line-height': '38rpx'}">
							<u-form-item label="团购份数:" prop="numbers">
								<u-input v-model="teamInfo.numbers" border="none" type="number" />
							</u-form-item>
							<u-form-item label="结束时间:" prop="endTime">
								<u-input v-model="teamInfo.endTime" border />
							</u-form-item>

							<u-form-item label="送餐时间:">
								<u-picker v-model="show" mode="time"></u-picker>
							</u-form-item>


							<view class="submit" @tap="handleApply">
								发起团购
							</view>
							<text class="tel">团购规则</text>

						</u-form>
					</view>
				</template>
			</view>
		</u-popup>
	</view>
</template>


<script>
	import indexConfig from '@/config/index.config';
	import {
		orderCreate,
		orderPay
	} from '@/api/url';
	import permission from '@/utils/permission.js';
	import mHelper from '@/utils/helper';
	import {
		mapState,
		mapGetters
	} from 'vuex'
	export default {
		components: {},
		data() {
			return {
				items: ['餐柜寄存', '我的地址'],
				activeColor: '#007aff',
				styleType: 'text',
				list: [{
					name: '餐柜'
				}, {
					name: '收货地址'
				}],
				current: 0,
				productId: 0, //产品编号
				cartIdList: null, //购物车编号列表
				teamId: 0, //团购编号
				orderInfo: {},
				sideboardList: [],
				sideboardInfo: {},
				couponList: [],
				couponInfo: {},
				showSideboard: false,
				showCoupon: false,
				addressList: [{
					title: '上海市浦东新区',
					tel: '18909876789',
					name: '王女士'
				}, {
					title: '上海市浦东新区',
					tel: '17909876786',
					name: '刘女士'
				}],
				showTeam: false,
				teamInfo: {
					numbers: 5,
					endTime: '',
					companyName: ''
				},
				latitude: 0,
				longitude: 0
				// options: ['Option 1', 'Option 2', 'Option 3'], // 下拉选项数组
				//       selectedValue: 0, // 当前选中项的索引
				//       selectedText: '选择送餐时间', // 当前选中项的文本
			};
		},
		computed: {
			...mapState(['userInfo']),
			...mapGetters(['hasLogin'])
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
			this.productId = options.productId || 0;
			this.cartIdList = options.cartIdList ? JSON.parse(options.cartIdList) : null
			// this.teamId = 7835242633822277;// options.teamId || 0;
			this.teamId = options.teamId || 0;
			this.orderInfo.orderType = this.teamId > 0 ? 1 : 0;

			let _this = this;
			// 获取当前位置
			permission.getUserPermission('scope.userLocation').then(() => {
				// 用户已授权获取地理位置
				console.log('===用户已授权获取地理位置')
				permission.getLocation().then((res) => {
					console.log('===res', res)
					this.latitude = res.latitude;
					this.longitude = res.longituderes;
					_this.createOrder()

				})
			}).catch(() => {
				// 用户未授权/拒绝获取地理位置
				console.log('===用户拒绝授权位置信息')
				// 需要提示用户手动打开设置去授权				
				uni.showToast({
					title: '需要开启地理位置授权，请手动开启',
					duration: 2000,
					icon: 'none',
					complete: function() {
						console.log('navigateBack')
						setTimeout(function() {
							uni.navigateBack({
								delta: 1
							});
						}, 2000);

					}
				});

			})
		},

		methods: {
			//拼接图片地址，临时使用需要统一整理为公用函数
			getImageUrl(image) {
				return indexConfig.fileUrl + image;
			},
			// 创建订单
			async createOrder() {
				const params = {
					productId: this.productId,
					cartIdList: this.cartIdList,
					teamId: this.teamId,
					latitude: this.latitude,
					longitude: this.longitude,
					orderType: this.orderInfo.orderType,
				}

				// console.log('===创建订单参数', params)
				await this.$http
					.post(`${orderCreate}`, params)
					.then(r => {
						this.orderInfo = r.data
						// 默认支付方式为微信支付
						this.orderInfo.payType = 1;
						this.orderInfo.teamInfo = this.orderInfo.teamInfo || {};

						this.sideboardList = this.orderInfo.sideboardList.map(item => {
							return {
								...item,
								text: item.title,
								css: item.addressType == 0 ? 'error' : 'success',
								tag: item.addressType == 0 ? '餐柜' : '地址'
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

			navTo(route) {
				this.$mRouter.push({
					route
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
				this.showSideboard = false
			},
			change(index) {
				console.log("index", index);
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
			//外卖选项
			buytakeout() {
				this.showTeam = false;
				this.teamId = 0;
				this.orderInfo.orderType = 0;
				this.createOrder();
			},
			//团购选项
			buyteam() {
				this.showTeam = false;
				this.navTo(
					`/pages/orders/teamselect?cartIdList=${JSON.stringify(this.cartIdList)}&productId=${this.productId}&addressType=${this.sideboardInfo.addressType}&addressId=${this.sideboardInfo.id}`
				)
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
						if (r.data.payType == 1) {
							//微信支付
							if (!r.data.wxPayment) {
								this.$mHelper.toast('订单支付失败');
								return false;
							}
							// 调用支付方法										
							uni.requestPayment({
								"timeStamp": r.data.wxPayment.timeStamp, // 时间戳（单位：秒）
								"nonceStr": r.data.wxPayment.nonceStr, // 随机字符串
								"package": r.data.wxPayment.package, // 固定值
								"signType": r.data.wxPayment.signType, // V3版本仅支持RSA
								"paySign": r.data.wxPayment.paySign, // 签名，这里用的 MD5/RSA 签名
								"appId": r.data.wxPayment
									.appId, // 微信开放平台 - 应用 - AppId，注意和微信小程序、公众号 AppId 可能不一致								
								success(res) {
									console.log('支付成功', res, this, that);
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



						} else {
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
			onPickerChange(e) {
				// 选择器值改变时触发的事件
				console.log(e)
				this.selectedValue = e.detail.value;
				this.selectedText = this.options[this.selectedValue];
				console.log('选择的值为：', e);
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
			margin-bottom: 26rpx;

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
			margin-bottom: 26rpx;
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

	.address-btnbox {
		text-align: right;
		padding-right: 40rpx;
	}

	.confirm-container {
		margin-top: 20rpx;
		display: flex;
		justify-content: space-between;
		gap: 20rpx;
		margin-bottom: 26rpx;
		padding: 32rpx;
		background: #FFFFFF;
		border-radius: 10px;
		box-shadow: 0px 10px 40px rgba(26, 77, 160, 0.16);

		.address {
			display: flex;
			gap: 20rpx;
			font-size: 24rpx;
			width: 100%;

			.address-text {
				display: flex;
				flex-direction: column;
				gap: 20rpx;
				width: 100%;

				view {
					display: flex;
					align-items: baseline;
					gap: 10rpx;
				}

				.title {
					display: flex;
					align-items: center;
					font-size: 40rpx;
					width: 100%;
					justify-content: space-between;

					.text {
						display: flex;
						align-items: center;
					}

					.choose {
						padding: 6rpx 40rpx;
						border-radius: 20rpx 0px 20rpx 0px;
						background: #2B7365;
						color: #FFFFFF;
						font-size: 24rpx;
					}

					.right {
						background-color: #F5F5F5;
						border-radius: 38rpx;
						display: flex;
						align-items: center;
						font-size: 24rpx;
						padding: 0 38rpx;
						color: #919293;

						.buytakeout,
						.buyteam {
							position: relative;
							display: flex;
							align-items: center;

							&.active {
								padding: 14rpx 38rpx;
								color: #ffffff;
								background-color: #2B7365;
								border-radius: 38rpx;
							}
						}

						.buyteam {
							margin-left: 20rpx;
							height: 100%;
							flex: 1;
							padding: 14rpx 0;
						}

						.buytakeout.active {
							margin-left: -38rpx;
						}

						.buyteam.active {
							margin-right: -38rpx;
						}
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
		// min-height: 55vh;
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

	.form-container {
		width: 100%;
		padding: 20rpx 40rpx;
	}

	.submit {
		width: 640rpx;
		height: 80rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 20rpx 0 50rpx;
		border-radius: 15px 0px 15px 0px;
		background: #2B7365;
		font-size: 40rpx;
		color: #FFFFFF;
	}

	.coupon-tip {
		flex: 1;
		width: 100%;
		background-color: #E8EACF;
		font-size: 24rpx;
		color: #ADB838;
		padding: 0 20rpx;
		display: flex;
		align-items: center;
		overflow: hidden;
		display: none;

		.title {
			flex: 1;
			margin-left: 10rpx;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}

		.iconfont {
			line-height: 100%;
		}

	}


	.teamitem {
		width: 100%;
		height: 380rpx;
		opacity: 1;
		border-radius: 5px;
		background: rgba(255, 255, 255, 1);
		display: flex;
		flex-direction: column;
		// margin-bottom: 30rpx;
		padding: 30rpx;

		.teamiteminfo {
			display: flex;
			justify-content: space-between;
			// align-items: center;
			margin-bottom: 30rpx;
			gap: 18rpx;

			.pic {
				width: 105px;
				height: 105px;
				opacity: 1;
				border-radius: 10rpx;

				image {
					width: 100%;
					height: 100%;
					border-radius: 10rpx;
				}
			}

			.info {
				flex: 1;

				.title {
					font-size: 26rpx;
					font-weight: 700;
					line-height: 36rpx;
					color: rgba(51, 51, 51, 1);
					text-align: left;
					vertical-align: top;
					min-height: 76rpx;
					max-height: 76rpx;
					overflow: hidden;
				}

				.attr {
					font-size: 24rpx;
					font-weight: 500;
					line-height: 40rpx;
					color: rgba(153, 153, 153, 1);
					text-align: left;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}

				.pricebox {
					display: flex;
					justify-content: space-between;
					align-items: center;
					color: rgba(153, 153, 153, 1);

					.price {
						flex: 1;
						font-size: 24rpx;
						font-weight: 500;
						line-height: 40rpx;

						.teamprice {
							font-size: 24rpx;
							font-weight: 500;
							line-height: 40rpx;
							color: #2B7365;
							text-align: left;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;

							.red {
								color: rgba(255, 13, 13, 1);
								font-weight: bold;
							}
						}

						.oldprice {
							font-size: 24rpx;
							font-weight: 500;
							line-height: 40rpx;
							color: rgba(153, 153, 153, 1);
							text-decoration-line: line-through;
							text-align: left;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
							padding-left: 20rpx;
						}

					}

					.btnbox {
						width: 120rpx;

						.btn {
							width: 120rpx;
							height: 52rpx;
							line-height: 52rpx;
							opacity: 1;
							border-radius: 5px;
							background: rgba(232, 22, 19, 1);
							text-align: center;
							color: #fff;
							font-size: 24rpx;
						}
					}
				}
			}
		}

		.teamnumber {
			font-size: 24rpx;
			font-weight: 500;
			line-height: 40rpx;
			color: rgba(153, 153, 153, 1);
			text-align: left;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		.teamuser {
			border-radius: 9px;
			background: rgba(248, 248, 248, 1);
			font-size: 24rpx;
			font-weight: 500;
			line-height: 40rpx;
			padding: 12rpx;
			margin-bottom: 10rpx;
		}
	}
</style>
<style>
	.u-cell {
		padding: 18rpx 0 !important;
	}
</style>