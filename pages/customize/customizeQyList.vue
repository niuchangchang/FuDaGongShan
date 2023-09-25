<template>
	<view class="container">
		<u-navbar title="中小企业餐饮定制" title-color="#FFFFFF" title-bold="true" back-icon-color="#FFFFFF"
			:border-bottom="false"
			:background="{ backgroundImage: 'linear-gradient(to bottom, rgb(128, 172, 148), rgb(145, 187, 170))' }"></u-navbar>
		<content :has-top="true" :has-bottom="true">
			<view class="content-container">
				<view class="search">
					<u-input v-model="value" :type="text" :border="border" placeholder="请输入企业名称" />
				</view>
				<view class="form-container">
					<view class="title">
						<text>企业列表</text>
					</view>
					<view v-for="item in 10" :key="item" class="down">
						<view class="left">
							<view class="right-info">
								<text class="dizhi">上海市XXX有限公司</text>
								<text class="didian">配送地点：上海市普陀区xxx路33号</text>
							</view>

						</view>
						<view class="right">
							<view class="tongguo" @tap="handleApply">
								加入
							</view>
						</view>
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
			handleApply() {}
		}
	};
</script>

<style lang="scss" scoped>
	.container {
		background: rgba(242, 247, 240, 1);
	}

	.search {
		border-radius: 30rpx;
		background: rgba(255, 255, 255, 1);
		width: 100%;
	}

	.tongguo {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 120rpx;
		height: 36rpx;
		border-radius: 10rpx;
		background: rgba(43, 115, 101, 1);
		color: rgba(255, 255, 255, 1);

	}

	.jujue {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 120rpx;
		height: 36rpx;
		border-radius: 10rpx;
		background: rgba(232, 76, 79, 1);
		color: rgba(255, 255, 255, 1);

	}

	.right {
		display: flex;
		flex-direction: column;
		gap: 14rpx;
		justify-content: center;
		padding-right: 28rpx;
	}

	.dizhi {
		height: 44rpx;
		font-size: 30rpx;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
	}

	.didian {

		height: 36rpx;
		font-size: 24rpx;
		font-weight: 500;
		color: rgba(196, 196, 196, 1);

	}

	.down {
		display: flex;
		justify-content: space-between;
		margin: 30rpx 0;
	}

	.left {
		display: flex;
		gap: 34rpx;
		padding-left: 32rpx;
	}

	.right-info {
		display: flex;
		flex-direction: column;
		gap: 24rpx;
	}

	.img-info {
		width: 120rpx;
		height: 120rpx;
	}

	.title {
		font-size: 32rpx;
		font-weight: 500;
		color: rgba(77, 113, 111, 1);
		padding: 22rpx 38px;
		padding-left: 38rpx;
	}

	.content-container {
		height: 100%;
		padding: 40rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.form-container {
		display: flex;
		flex-direction: column;
		border-radius: 10px;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 10px 40px rgba(26, 77, 160, 0.16);
		width: 100%;
		margin: 48rpx 0;
		height: calc(100% - 100rpx);
		overflow-y: auto;
	}
</style>