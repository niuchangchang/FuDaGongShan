<template>
	<view class="container">
		<u-navbar title="选择收货地址" title-color="#FFFFFF" title-bold="true" back-icon-color="#FFFFFF"
			:border-bottom="false"
			:background="{ backgroundImage: 'linear-gradient(to bottom, rgb(128, 172, 148), rgb(145, 187, 170))' }"></u-navbar>
		<view class="newbtnbox">
			<view class="newbtn" @click="newClick">发起新的团购</view>
		</view>
		<scroll-view scroll-y="true" class="teamlist">

			<template v-if="temalist.length">
				<view v-for="(item, index) in temalist" :key="index" class="teamitem" @click="handleChooseTeam(index)">
					<view class="teamiteminfo">
						<view class="pic">
							<image :src="getImageUrl('/images/headimg56.svg')">
							</image>
						</view>
						<view class="info">
							<view class="title">配送地址：上海市青浦区XX路3号504室</view>
							<view class="attr">团长：159****8125</view>
							<!-- <view class="attr">结束时间：10:30</view>
							<view class="attr">送餐时间：11:30</view>	 -->
							<view class="pricebox">
								<view class="price">
									<!-- <view class="teamprice">团购价：
									<text class="red">￥35.00</text> 
									<text class="oldprice">￥40.00</text>
									</view> -->
									<view>结束时间：10:30</view>
									<view>送餐时间：11:30</view>
								</view>
								<view class="btnbox">
									<view class="btn">去拼团</view>
								</view>

							</view>
						</view>
					</view>
					<view class="teamnumber">已参与团购2人，还差3人团购成功</view>
					<view class="progress">
						<u-line-progress class="info-center-jdt" active-color="#71AD91" :percent="item.number"
							height="14" inactive-color="#F2F7F0" :show-percent="false"></u-line-progress>
					</view>
				</view>
			</template>
			<template v-else>
				<view class="no-data">暂无团购信息，立即开团> </view>
			</template>
		</scroll-view>
		<u-popup v-model="showTeam" mode="bottom" :closeable="true" border-radius="20">
			<view class="popup-container">
				<view class="popup-title">发起团购</view>
				<template class="popup-content">
					<view class="cell-list form-container">
						<u-form :model="teamInfo" ref="form1" label-position="left" :border-bottom="false"
							:label-style="{'color': '#6E7C87', 'line-height': '38rpx'}">
							<u-form-item label="团购份数:" prop="orderNumber">
								<u-input v-model="teamInfo.orderNumber" border="none" type="number" />
							</u-form-item>
							<u-form-item label="结束时间:" prop="endTime">
								<u-input v-model="teamInfo.endTime" border />
							</u-form-item>

							<u-form-item label="送餐时间:" prop="deliveryTime">
								<u-input v-model="teamInfo.deliveryTime" border />
							</u-form-item>


							<view class="submit" @click="handleNewTeam">
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
	import permission from '@/utils/permission.js';
	import mHelper from '@/utils/helper';
	import {
		mapState,
		mapGetters
	} from 'vuex'
	import {
		teamNew
	} from '@/api/url'


	export default {
		components: {},
		data() {
			return {
				productId: 0,
				cartIdList: [],
				teamId: 0,
				addressType: 0,
				addressId: 0,
				showTeam: false,
				temalist: [],
				teamInfo: {
					orderNumber: 5,
					endTime: '',
					deliveryTime: '',

				},
				selectedDate: '请选择时间'
			}
		},
		onLoad(options) {
			this.productId = options.productId || 0;
			this.cartIdList = options.cartIdList ? JSON.parse(options.cartIdList) : null
			this.teamId = options.teamId || 0;
			this.addressType = options.addressType || 0;
			this.addressId = options.addressId || 0;

		},
		methods: {
			//拼接图片地址，临时使用需要统一整理为公用函数
			getImageUrl(image) {
				return indexConfig.fileUrl + image;
			},
			navTo(route) {
				this.$mRouter.push({
					route
				});
			},
			handleChooseTeam(index) {
				console.log(index)
			},
			newClick() {
				this.showTeam = true;
			},
			onDateChange(e) {
				// 处理日期时间改变的回调
				console.log('选中的日期时间：', e.mp.detail.value);
				this.selectedDate = e.mp.detail.value;
			},
			async handleNewTeam() {
				let _this = this;
				console.log(this.teamInfo)


				if (this.addressType == 0) {
					this.teamInfo.sideboardId = this.addressId;
				} else {
					this.teamInfo.addressId = this.addressId;
				}

				await this.$http
					.post(`${teamNew}`, _this.teamInfo)
					.then(r => {
						console.log(r);

						_this.navTo(
							`/pages/orders/create?cartIdList=${JSON.stringify(this.cartIdList)}&productId=${this.productId}&teamId=${r.data.id}`
						)
					})
					.catch(err => {
						this.$mHelper.toast('团购发起失败');
					});
			}
		},
	}
</script>

<style lang="scss" scoped>
	.no-data {
		text-align: center;
	}

	.container {
		background: rgba(235, 236, 237, 1);
		padding: 42rpx 26rpx;
	}

	.newbtnbox {
		text-align: right;
		height: 52rpx;
		margin-bottom: 20rpx;

		.newbtn {
			width: 220rpx;
			height: 52rpx;
			line-height: 52rpx;
			opacity: 1;
			border-radius: 5px;
			background: #2B7365;
			text-align: center;
			color: #fff;
			font-size: 24rpx;
			float: right;

		}
	}

	.teamlist {
		width: 100%;

		.teamitem {
			width: 100%;
			height: 380rpx;
			opacity: 1;
			border-radius: 5px;
			background: rgba(255, 255, 255, 1);
			display: flex;
			flex-direction: column;
			margin-bottom: 30rpx;
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
</style>