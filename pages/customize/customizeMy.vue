<template>
	<view class="container">
		<u-navbar title="中小企业餐饮定制" title-color="#FFFFFF" title-bold="true" back-icon-color="#FFFFFF"
			:border-bottom="false"
			:background="{ backgroundImage: 'linear-gradient(to bottom, rgb(128, 172, 148), rgb(145, 187, 170))' }"></u-navbar>
		<content :has-top="true" :has-bottom="true">
			<view class="content-container">
				<view class="logo-container">
					<view class="left">
						<text class="qiye">我的企业</text>
						<text class="qiye-info">上海市XX企业有限公司</text>
						<text class="qiye-info">加入时间：2023-09-01</text>
					</view>
					<view class="right">
						<view class="tuichu" @tap="handleApply">
							退出企业
						</view>
						<img class="img-info" :src="$mImgHost('/images/v.png')" alt="">
					</view>
				</view>
				<view class="down">
					<text class="down-info">配送地址：上海市XXX路130号</text>
				</view>
				<view class="form-container">
					<view class="top">
						<text class="cy-info">企业成员 （10人）</text>
						<view class="tuichu sh" @tap="navTo('/pages/customize/customizeList')">
							成员审核
						</view>
					</view>
					<view class="touxiang">
						<img v-for="(item,index) in 8" class="img-info" :src="$mImgHost('/images/headimage.png')"
							alt="">
					</view>

				</view>
				<view class="submit-dis">
					<view class="submit" @tap="navTo('/pages/menu/menu', 1)">
						开始点餐
					</view>
				</view>

			</view>
		</content>
		<u-tabbar :list="list" :mid-button="true" mid-button-size="70" active-color="#2AB07D"
			inactive-color="#C0C4CC"></u-tabbar>
	</view>
</template>

<script>
	import {} from '@/api/url';
	export default {
		components: {},
		data() {
			return {
				list: this.$mConstDataConfig.tabbarList,
			}
		},
		async onLoad() {},
		onShow() {},
		computed: {},
		methods: {
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
			handleApply() {}
		}
	};
</script>

<style lang="scss" scoped>
	.container {
		background: rgba(242, 247, 240, 1);
	}


	.img-info {
		width: 120rpx;
		height: 120rpx;
	}

	.cy-info {
		height: 48rpx;
		font-size: 32rpx;
		font-weight: 500;
		color: rgba(77, 113, 111, 1);
	}

	.touxiang {
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
		gap: 48rpx;
		width: 100%;
		padding: 22rpx 30rpx 80rpx;
	}

	.top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		padding: 22rpx 30rpx;
	}

	.down {
		height: 60rpx;
		width: 100%;
		opacity: 1;
		border-radius: 0px 0px 10rpx 10rpx;
		background: rgba(43, 115, 101, 1);
		display: flex;
		align-items: center;
	}

	.down-info {
		height: 36rpx;
		font-size: 24rpx;
		font-weight: 400;
		color: rgba(255, 255, 255, 1);
		padding-left: 44rpx;
	}

	.right {
		padding: 16rpx 16rpx 0 0;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.tuichu {
		width: 120rpx;
		height: 36rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		// margin: 20rpx 0 50rpx;
		border-radius: 15px 0px 15px 0px;
		background: #2B7365;
		font-size: 20rpx;
		color: #FFFFFF;
	}

	.left {
		display: flex;
		flex-direction: column;
		gap: 22rpx;
		padding: 16rpx 0 48rpx 44rpx;
	}

	.qiye {
		height: 50rpx;
		opacity: 1;
		font-size: 34rpx;
		font-weight: 400;
		letter-spacing: 0rpx;
		line-height: 49rpx;
		color: rgba(51, 51, 51, 1);
	}

	.qiye-info {
		height: 36rpx;
		opacity: 1;
		font-size: 24rpx;
		font-weight: 400;
		line-height: 35rpx;
		color: rgba(51, 51, 51, 1);
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
		height: 230rpx;
		border-radius: 20rpx 20rpx 0 0;
		background-color: rgba(113, 173, 145, 1);
		display: flex;
		justify-content: space-between;
	}

	.form-container {
		display: flex;
		flex-direction: column;
		border-radius: 10px;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 10px 40px rgba(26, 77, 160, 0.16);
		width: 100%;
		margin: 48rpx 0;
	}

	.tip {
		color: #FF5733;
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