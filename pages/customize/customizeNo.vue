<template>
	<view class="container">
		<u-navbar title="中小企业餐饮定制" title-color="#FFFFFF" title-bold="true" back-icon-color="#FFFFFF"
			:border-bottom="false"
			:background="{ backgroundImage: 'linear-gradient(to bottom, rgb(128, 172, 148), rgb(145, 187, 170))' }"></u-navbar>
		<content :has-top="true" :has-bottom="true">
			<view class="content-container">
				<view class="logo-container">
					<u-swiper :list="bannerList" height="280" border-radius="0"></u-swiper>
				</view>
				<view class="form-container">
					<view class="one-title">
						<text class="one">企业订餐特权</text>
					</view>
					<view class="tongyi-title">
						<view class="tongyi-icon">
							<u-icon name="checkmark-circle-fill" size="34" color="rgb(43, 115, 101)"></u-icon>
							<text class="tongyi">可优惠/折扣共享</text>
						</view>
						<view class="tongyi-icon">
							<u-icon name="checkmark-circle-fill" size="34" color="rgb(43, 115, 101)"></u-icon>
							<text class="tongyi">统一订餐</text>
						</view>
						<view class="tongyi-icon">
							<u-icon name="checkmark-circle-fill" size="34" color="rgb(43, 115, 101)"></u-icon>
							<text class="tongyi">统一配送</text>
						</view>
					</view>
				</view>
				<view class="submit-dis">
					<view class="submit" @tap="navTo('/pages/customize/customize')">
						企业入驻
					</view>
					<view class="submit" @tap="navTo('/pages/customize/customizeQyList')">
						加入企业
					</view>
				</view>
				<view class="xuzhi">
					<view class="xuzhi-title">
						<text class="one">企业订餐须知</text>
					</view>
					<view class="xuzhi-text">
						<text
							class="tongyi">1、企业订餐须知企业订餐须知企业订餐须知企业订餐须知企业订餐须知企业订餐须知企业订餐须知企业订餐须知2、企业订餐须知企业订餐须知企业订餐须知企业订餐须知企业订餐须知企业订餐须知3、企业订餐须知企业订餐须知企业订餐须知企业订餐须知企业订餐须知企业订餐须知</text>
					</view>
				</view>
			</view>
		</content>
		<u-tabbar :list="list" :mid-button="true" mid-button-size="70" active-color="#2AB07D"
			inactive-color="#C0C4CC"></u-tabbar>
	</view>
</template>

<script>
	import {
		bannerUrl
	} from '@/api/url';
	export default {
		components: {},
		data() {
			return {
				list: this.$mConstDataConfig.tabbarList,
				bannerList: [],
			}
		},
		async onLoad() {},
		onShow() {
			this.getBanner()
		},
		computed: {},
		methods: {
			navTo(route) {
				this.$mRouter.push({
					route
				});
			},
			// 获取banner
			async getBanner() {
				const bannerType = 3
				await this.$http
					.post(`${bannerUrl}/${bannerType}`)
					.then(async r => {
						this.bannerList = r.data.map(item => {
							return this.$mImgHost(item.imageUrl)
						})
					})
					.catch(err => {});
			},
			handleApply() {}
		}
	};
</script>

<style lang="scss" scoped>
	.container {
		background: rgba(242, 247, 240, 1);
	}

	.xuzhi-title {
		margin-top: 10rpx;
		margin-left: 40rpx;
	}

	.xuzhi-text {
		height: 230rpx;
		opacity: 1;
		/** 文本1 */
		font-size: 24rpx;
		font-weight: 400;
		letter-spacing: 0rpx;
		line-height: 35rpx;
		color: rgba(100, 108, 119, 1);
		padding: 6rpx 34rpx 24rpx 46rpx;

	}

	.xuzhi {
		width: 100%;
		height: 300rpx;
		opacity: 1;
		border-radius: 10rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0rpx 10rpx 40rpx rgba(26, 77, 160, 0.16);
	}

	.submit-dis {
		display: flex;
		gap: 64rpx
	}

	.tongyi-icon {
		display: flex;
		gap: 12rpx;
	}

	.tongyi {
		opacity: 1;
		font-size: 14px;
		font-weight: 400;
		letter-spacing: 0px;
		line-height: 20.27px;
		color: rgba(110, 124, 135, 1);
		text-align: left;
		vertical-align: top;
	}

	.one {
		opacity: 1;
		font-size: 16px;
		font-weight: 500;
		letter-spacing: 0px;
		line-height: 23.68px;
		color: rgba(77, 113, 111, 1);
		text-align: left;
		vertical-align: top;
	}

	.one-title {
		margin-top: 20rpx;
		margin-left: 40rpx;
	}

	.tongyi-title {
		display: flex;
		gap: 10rpx;
		margin-top: 36rpx;
		margin-left: 40rpx;
		margin-bottom: 50rpx;
		flex-direction: column;
	}

	.content-container {
		height: 100%;
		padding: 40rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		// background: #FFFFFF;
	}

	.logo-container {
		width: 100%;
		height: 280rpx;
		background-color: #2B7365;
	}

	.form-container {
		display: flex;
		flex-direction: column;
		opacity: 1;
		border-radius: 10px;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 10px 40px rgba(26, 77, 160, 0.16);
		width: 100%;
		margin: 20rpx 0;
	}

	.tip {
		color: #FF5733;
	}

	.submit {
		width: 300rpx;
		height: 77rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 20rpx 0 50rpx;
		border-radius: 10px;
		background: #2B7365;
		font-size: 40rpx;
		color: #FFFFFF;

		&:nth-child(2) {
			background-color: #71AD91;
			color: #FFFFFF;
		}
	}

	.tel {
		color: #FF5733;
		font-size: 32rpx;
		font-weight: 700;
	}

	::v-deep {
		.u-border-bottom:after {
			border-bottom-width: 0;
		}

		input {
			display: flex;
		}
	}
</style>