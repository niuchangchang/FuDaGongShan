<template>
	<view class="container">
		<content :has-top="false" :has-bottom="true">
			<view class="banner"></view>
			<view class="content">
				<view class="entrance">
					<view class="left">
						<text class="hi">Hi，您好</text>
						<text class="huanying">欢迎来到青与食堂</text>
					</view>
					<view class="right">
						<view class="yupiao">
							<image
								src="https://img.js.design/assets/img/6438e8104539479518bf8310.jpg#2fabd401de51a66ad2e5df11b0481e6a">
							</image>
							<text class="yupiao-text">预约</text>
						</view>
						<view class="yupiao">
							<image
								src="https://img.js.design/assets/img/6438e8104539479518bf8310.jpg#2fabd401de51a66ad2e5df11b0481e6a">
							</image>
							<text class="yupiao-text">票券</text>
						</view>
					</view>
				</view>
				<view class="peisong" v-if="isDelivery" @tap="navTo('/pages/delivery/orders')">
					<view class="navigators-left">
						订单配送
					</view>
					<view class="navigators-right">
						<u-icon name="arrow-right" size="34" color="#C4C4C4"></u-icon>
					</view>
				</view>
				<view class="navigators">
					<view class="left">
						<view class="jrtj">今日推荐</view>
						<view v-for="(taday,tindex) in pagedata.tadayProduct" :key="tindex" class="pic">
							<image :src="getImageUrl(taday.imageCover)"></image>
						</view>
					</view>
					<view class="right">
						<view class="waimai" @tap="navTo('/pages/menu/menu', 1)">
							<view class="navigators-left">
								<view class="dazi">外卖点餐</view>
								<view class="xiaozi">快递送达</view>
							</view>
							<view class="navigators-right">
								<u-icon name="arrow-right" size="34" color="#C4C4C4"></u-icon>
							</view>
						</view>
						<view class="dingzhi" @tap="navTo('/pages/customize/customize')">
							<view class="navigators-left">
								<view class="dazi">中小企业餐饮定制</view>
								<view class="xiaozi">企业专属订餐通道</view>
							</view>
							<view class="navigators-right">
								<u-icon name="arrow-right" size="34" color="#C4C4C4"></u-icon>
							</view>
						</view>
					</view>
				</view>
				<view class="member-news">
					<!-- <image src="https://img-shop.qmimg.cn/s23107/2020/04/27/0039bf41c9ebd50a2c.jpg"></image> -->
					<image v-for="(image, index) in pagedata.bottomBannerList" :src="getImageUrl(image.imageUrl)"
						:key="index"></image>
				</view>
			</view>
		</content>
		<u-popup v-model="show" mode="center" border-radius="16">
			<view class="qucanma">
				<text>取餐码</text>
				<view class="popup-content">
					<swiper :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish"
						class="swiper">
						<swiper-item class="swiper-item" v-for="(item, index) in codeList" :key="index">
							<view class="code">{{ item.pickupCode }}</view>
							<view class="address">
								<u-icon name="photo" size="40"></u-icon>
								<text>{{ item.sideboardAddress }}</text>
							</view>
							<view class="address">
								<u-icon name="photo" size="40"></u-icon>
								<text>{{ item.sideboardTitle }}</text>
							</view>
							<view class="divi"></view>
							<view class="erweima">
								<image :src="$mImgHost(item.pickupQr)" mode=""></image>
							</view>
						</swiper-item>
					</swiper>
				</view>
				<view class="button-group">
					<view class="prev" :class="{'gray': swiperCurrent === 0}" @click="prev">上一个</view>
					<view class="pickup" :class="{'gray': pickupInfo.isPickup}" @click="pickup">取餐</view>
					<view class="next" :class="{'gray': swiperCurrent === codeList.length - 1}" @click="next">下一个</view>
				</view>
				<view class="close-button" @click="close">
					关闭
				</view>
			</view>
		</u-popup>
		<u-tabbar :list="list" @change="tabChange" :mid-button="true" mid-button-size="70" active-color="#2AB07D"
			inactive-color="#C0C4CC"></u-tabbar>
	</view>
</template>

<script>
	import {
		indexUrl,
		erCodeListByUser,
		pickup
	} from '@/api/url';
	import indexConfig from '@/config/index.config';
	import {
		mapState,
		mapGetters
	} from 'vuex'

	export default {
		data() {
			return {
				list: this.$mConstDataConfig.tabbarList,
				isDelivery: false,
				pagedata: {
					tadayProduct: [],
					topBannerList: [],
					bottomBannerList: []
				},
				show: true,
				codeList: [],
				swiperCurrent: 0,
				pickupInfo: {}
			}
		},
		computed: {
			...mapState(['userInfo']),
			...mapGetters(['hasLogin'])
		},
		async onLoad() {
			this.isDelivery = this.userInfo.isDelivery
			await this.$http
				.post(`${indexUrl}`, {
					// pageNumber: 1,
					// pageSize: 10,
				})
				.then(async r => {
					// console.log(r);
					this.$data.pagedata = r.data;
				})
				.catch(err => {});
		},
		onShow() {
			this.show = true
			this.getCodeList()
		},
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
			//拼接图片地址，临时使用需要统一整理为公用函数
			getImageUrl(image) {
				return indexConfig.fileUrl + image;
			},
			tabChange(index) {
				if (index === 2) {
					this.show = true
					this.swiperCurrent = 0
					this.getCodeList()
				}
			},
			close() {
				this.show = false
			},
			// 获取取餐码列表
			async getCodeList() {
				const userId = this.userInfo.id
				await this.$http
					.post(`${erCodeListByUser}/${userId}`)
					.then(r => {
						this.codeList = r.data
						this.pickupInfo = this.codeList[this.swiperCurrent]
					})
					.catch(err => {
						this.$mHelper.toast('获取取餐码出错，请重试～');
					});
			},
			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition(e) {
				let dx = e.detail.dx;
			},
			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			animationfinish(e) {
				let current = e.detail.current;
				this.swiperCurrent = current;
				this.pickupInfo = this.codeList[this.swiperCurrent]
			},
			prev() {
				if (this.swiperCurrent > 0) this.swiperCurrent = this.swiperCurrent - 1;
				this.pickupInfo = this.codeList[this.swiperCurrent]
			},
			next() {
				if (this.swiperCurrent < this.codeList.length - 1) this.swiperCurrent = this.swiperCurrent + 1;
				this.pickupInfo = this.codeList[this.swiperCurrent]
			},
			async pickup() {
				await this.$http
					.post(`${pickup}/${this.pickupInfo.orderDetailId}`)
					.then(r => {
						this.$mHelper.toast('取餐成功');
						this.codeList[this.swiperCurrent].isPickup = true
						// this.getCodeList()
					})
					.catch(err => {
						this.$mHelper.toast('取餐出错，请重试～');
					});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.banner {
		width: 100%;
		height: 480rpx;
		background: url(https://img.js.design/assets/img/6438e8104539479518bf8310.jpg#2fabd401de51a66ad2e5df11b0481e6a);
		background-size: 100% 100%;
	}

	.qucanma {
		width: 640rpx;
		display: flex;
		flex-direction: column;
		gap: 15rpx;
		padding: 66rpx 34rpx;
		color: rgba(77, 113, 111, 1);

		text:nth-child(1) {
			text-align: center;
			font-size: 40rpx;
		}

		.swiper {
			height: 100%;
		}

		.close-button {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 430rpx;
			height: 80rpx;
			border-radius: 20px 0px 20px 0px;
			background: #2B7365;
			margin: auto;
			font-size: 40rpx;
			color: rgba(255, 255, 255, 1);
		}

		.button-group {
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 430rpx;
			margin: 0 auto 60rpx;
			font-size: 20rpx;
			color: #FFFFFF;

			view {
				padding: 6rpx 36rpx;
			}

			.prev {
				border-radius: 0px 10px 0px 10px;
				background: #2B7365;
			}

			.pickup {
				background: #E84C4F;
			}

			.next {
				border-radius: 10px 0px 10px 0px;
				background: #2B7365;
			}

			.gray {
				background: #C4C4C4;
				color: #A6A6A6;
			}
		}

		.popup-content {
			display: flex;
			flex-direction: column;
			height: 600rpx;
		}

		.code {
			text-align: center;
			font-weight: 700;
			font-size: 32rpx;
			margin-bottom: 20rpx;
		}

		.address {
			display: flex;
			gap: 8rpx;
			font-size: 32rpx;
		}

		.divi {
			width: 100%;
			height: 1px;
			background: #4D716F;
			margin-top: 30rpx;
		}

		.erweima {
			width: 430rpx;
			height: 430rpx;
			margin: auto;

			image {
				width: 100%;
				height: 100%;
			}
		}
	}

	.content {
		padding: 0 30rpx 40rpx;
		margin-top: -60rpx;
	}

	.peisong {
		color: #4D716F;
		font-size: 40rpx;
		margin-bottom: 40rpx;
		background: #DAF2DD;
	}

	.entrance {
		height: 204rpx;
		border-radius: 20rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 0px 20px rgba(132, 186, 168, 0.4);
		margin-bottom: 40rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 24rpx 54rpx 44rpx 32rpx;

		.left {
			display: flex;
			flex-direction: column;
			gap: 12rpx;

			.hi {
				font-size: 48rpx;
				color: rgba(77, 113, 111, 1);
				text-align: left;
				vertical-align: top;

			}

			.huanying {
				font-size: 36rpx;
				color: rgba(113, 130, 141, 1);
				text-align: left;
				vertical-align: top;

			}
		}

		.right {
			display: flex;
			gap: 42rpx;

			.yupiao {
				width: 80rpx;
				height: 134rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				gap: 6rpx;

				image {
					width: 80rpx;
					height: 80rpx;
				}

				.yupiao-text {
					font-size: 32rpx;
					color: rgba(77, 113, 111, 1);
				}
			}

		}
	}

	.navigators {
		height: 350rpx;
		border-radius: 20rpx;
		margin-bottom: 40rpx;
		display: flex;
		align-items: stretch;
		gap: 20rpx;


		.left {
			height: 100%;
			border-radius: 8px;
			width: 308rpx;
			display: flex;
			position: relative;
			//background: url(https://img.js.design/assets/img/6438e80f7b58e9fa27fdd984.jpg#34140443cfbe601060a2e2e593747c39);
			background-size: 100% 100%;
			box-shadow: 1px 1px 2px rgba(255, 255, 255, 0.7), inset -1px -1px 0px rgba(255, 255, 255, 1), inset 1px 1px 0px rgba(255, 255, 255, 1), -3px -3px 7px rgba(255, 255, 255, 1), 3px 3px 7px rgba(113, 173, 145, 0.5);

			.pic {
				width: 100%;
				height: 100%;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.jrtj {
				position: absolute;
				top: 0;
				left: 0;
				width: 160rpx;
				height: 48rpx;
				font-size: 28rpx;
				font-weight: 500;
				line-height: 48rpx;
				color: rgba(255, 255, 255, 1);
				text-align: center;
				border-radius: 10px 0px 10px 0px;
				background: rgba(255, 195, 0, 1);
				z-index: 10;

			}
		}

		.right {
			flex: 1;
			display: flex;
			flex-direction: column;
			gap: 32rpx;


			.waimai {
				background: rgba(228, 238, 232, 1);
			}

			.dingzhi {
				background: rgba(242, 235, 211, 1);
			}


		}

	}

	.peisong,
	.waimai,
	.dingzhi {
		width: 100%;
		display: flex;
		flex: 1;
		padding: 24rpx 18rpx 24rpx 30rpx;
		align-items: center;
		justify-content: space-between;
		position: relative;
		border-radius: 10rpx;
		box-shadow: 1px 1px 2px rgba(255, 255, 255, 0.7), inset -1px -1px 0px rgba(255, 255, 255, 1), inset 1px 1px 0px rgba(255, 255, 255, 1), -3px -3px 7px rgba(255, 255, 255, 1), 3px 3px 7px rgba(113, 173, 145, 0.5);

		.navigators-left {
			background: none;
			display: flex;
			flex-direction: column;
			gap: 12rpx;

			.xiaozi {
				font-size: 24rpx;
				color: rgba(113, 130, 141, 1);
			}

			.dazi {
				font-size: 32rpx;
				color: rgba(113, 130, 141, 1);
			}
		}

		.navigators-right {
			width: 48rpx;
			height: 48rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			background: rgba(255, 255, 255, 1);
			border-radius: 50%;
		}
	}


	.member-news {
		width: 100%;
		height: 368rpx;

		image {
			width: 100%;
			height: 100%;
			border-radius: 32rpx;
		}
	}
</style>