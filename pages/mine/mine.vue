<template>
	<view class="container">
		<u-navbar title="个人中心" title-color="#FFFFFF" title-bold="true" :is-back="false" :border-bottom="false"
			:background="{ backgroundImage: 'linear-gradient(to bottom, rgb(128, 172, 148), rgb(145, 187, 170))' }"></u-navbar>
		<content :has-top="true" :has-bottom="true">
			<view class="mine-container">
				<view class="public-container">
					<view class="user-info">
						<view class="user-info-image">
						</view>
						<view class="user-info-pv">
							<view class="user-info-iphone">{{ userInfo.phone }}</view>
							<view class="user-info-vip">
								<u-icon name="photo" size="60"></u-icon>
							</view>
						</view>
					</view>
					<view class="order-section">
						<view v-for="(item, index) in orderSectionList" :key="index" class="order-section-item"
							@tap="navTo('/pages/orders/orders', item.state)">
							<i class="iconfont" :class="[item.icon]" />
							<text>{{item.title}}</text>
						</view>
					</view>
				</view>
				<view class="public-container">
					<view class="qb-title">我的钱包</view>
					<view class="wdqianbao">
						<view v-for="(item, index) in amountList" :key="index" class="wdqianbao-item">
							<text>{{ index | formatData }}</text>
							<text>{{item.title}}</text>
						</view>
					</view>
				</view>
				<view class="public-container">
					<u-cell-group :border="false">
						<u-cell-item v-for="(item, index) in settingList" :key="index" icon="gift-fill"
							:title="item.title" :border-bottom="index !== settingList.length - 1"></u-cell-item>
							
							
							<u-cell-item icon="gift-fill" @click="logout"
								title="退出登录" :border-bottom="index !== settingList.length - 1"></u-cell-item>
					</u-cell-group>
				</view>
			</view>
		</content>
		<u-tabbar :list="list" :mid-button="true" mid-button-size="70" active-color="#2AB07D"
			inactive-color="#C0C4CC"></u-tabbar>
	</view>
</template>

<script>
	import {
		userInfo,
	} from '@/api/url';
	let _this = this
	export default {
		data() {
			return {
				list: this.$mConstDataConfig.tabbarList,
				amountList: this.$mConstDataConfig.amountList,
				orderSectionList: this.$mConstDataConfig.orderSectionList,
				settingList: this.$mConstDataConfig.settingList,
				userInfo: null,
			}
		},
		computed: {},
		filters: {
			// 数据格式化
			formatData(index) {
				const { userInfo } = _this
				switch (index) {
					case 0:
						return userInfo ? userInfo.pointsFormat : 0;
					case 1:
						return userInfo ? userInfo.balancesFormat : 0;
					case 2:
						return 0;
					case 3:
						return 0;
					default:
						return 0;
				}
			}
		},
		beforeCreate() {
			_this = this
		},
		onLoad() {},
		async onShow() {
			await this.getUserInfo()
		},
		methods: {
			navTo(route, state) {
				this.$mRouter.switchTab({
					route
				});
				uni.setStorageSync('orderState', state);
			},
			// 订单详情
			async getUserInfo() {
				await this.$http
					.post(`${userInfo}`)
					.then(r => {
						this.userInfo = r.data
					})
					.catch(err => {
						this.$mHelper.toast('获取用户详情出错，请稍后重试～');
						this.$mRouter.back();
					});
			},
			async logout(){
				await this.$mStore.commit('login', null);
				await this.$mStore.commit('setUserInfo', null);
				this.navTo('pages/index/index')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.mine-container {
		height: 100%;
		display: flex;
		flex-direction: column;
		gap: 22rpx;
		padding: 32rpx 20rpx;
		position: relative;

		&::before {
			position: absolute;
			top: 0;
			left: 0;
			z-index: -1;
			content: '';
			width: 100%;
			height: 160rpx;
			background: rgb(145, 187, 170);
		}

		.user-info {
			display: flex;
			margin-top: 40rpx;
			gap: 20rpx;

			.user-info-pv {
				padding: 8rpx;
				font-size: 30rpx;
				color: rgba(51, 51, 51, 1);
			}

			.user-info-image {
				width: 120rpx;
				height: 120rpx;
				background: rgba(239, 239, 239, 1);
				border-radius: 50%;
			}
		}

		.order-section {
			display: flex;
			justify-content: space-around;

			.order-section-item {
				display: flex;
				flex-direction: column;
				align-items: center;
				gap: 10rpx;
				padding: 44rpx 0;
				font-size: 24rpx;
			}
		}

		.wdqianbao {
			display: flex;
			justify-content: space-around;
			border-bottom: 1px solid #F5F5F5;

			.wdqianbao-item {
				display: flex;
				flex-direction: column;
				align-items: center;
				gap: 4rpx;
				padding: 44rpx 0;

				text:nth-child(1) {
					font-size: 32rpx;
					color: rgba(51, 51, 51, 1);
				}

				text:nth-child(2) {
					color: rgba(153, 153, 153, 1);
					font-size: 26rpx;
				}
			}
		}

		.qb-title {
			padding: 22rpx 0;
			font-size: 15px;
			font-weight: 500;
			color: rgba(51, 51, 51, 1);
			border-bottom: 1px solid #F5F5F5;
		}

		.public-container {
			padding: 0 40rpx;
			border-radius: 5px;
			background: #FFFFFF;
		}
	}

	.iconfont {
		&::before {
			font-size: 40rpx;
		}
	}
</style>
<style>
	.u-cell {
		padding: 30rpx 0 !important;
		color: rgba(54, 59, 71, 1) !important;
		align-items: baseline !important;
	}
</style>