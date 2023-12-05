<template>
	<view class="container">
		<content :has-top="false" :has-bottom="true">
			<view class="content-box">
				<view class="banner">
						 <view class="swiper-container">
						<swiper :autoplay="true" :indicator-dots="true" :circular="true">
						      <swiper-item v-for="(item,index) in pagedata.topBannerList" :key="index">
						        <image :src="getImageUrl(item.imageUrl)" class="swiper-image"></image>
						      </swiper-item>
						    </swiper>
						</view>						
					</view>
					<view class="content">
						<view class="entrance">
							<view class="headimg">
								<image :src="getImageUrl('/images/jyicon/user-face.svg')"></image>
							</view>
							<view class="left">
								<text class="hi">Hi，您好</text>
								<text class="huanying">欢迎来到青与食堂</text>
							</view>
							<!-- <view class="line">
								<image :src="getImageUrl('/images/jyicon/user-line.svg')"></image>
							</view> -->
							<view class="right">
								<view class="yupiao">
									<image :src="getImageUrl('/images/jyicon/qcm.svg')">
									</image>
									<text class="yupiao-text">取餐码</text>
								</view>
							</view>
						</view>
						<!-- <view class="peisong" v-if="isDelivery" @tap="navTo('/pages/delivery/orders')">
							<view class="navigators-left">
								订单配送
							</view>
							<view class="navigators-right">
								<u-icon name="arrow-right" size="34" color="#C4C4C4"></u-icon>
							</view>
						</view> -->
						<view class="peisong-new" v-if="isDelivery" @tap="navTo('/pages/delivery/orders')" :style="{background: 'url('+getImageUrl('/images/jyicon/peisong.svg')+');background-size: 100%'}">
							<view class="peisong-text">
								订单配送
							</view>							
						</view>
						
						<view class="navigators">
							<view class="left">
								<view class="jrtj">
									<!-- <view class="text">今日推荐</view> -->
									<image :src="getImageUrl('/images/jyicon/jrtj.svg')"></image>
								</view>
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
										<image :src="getImageUrl('/images/jyicon/waimai.svg')"></image>
									</view>
								</view>
								<view class="dingzhi"
									@tap="navTo(!isJoin ? '/pages/customize/customizeMy' : '/pages/customize/customizeNo')">
									<view class="navigators-left">
										<view class="dazi">中小企业餐饮定制</view>
										<view class="xiaozi">企业专属订餐通道</view>
									</view>
									<view class="navigators-right">
										<image :src="getImageUrl('/images/jyicon/qiye.svg')"></image>
									</view>
								</view>
							</view>
						</view>
						<view class="member-news">
							<image v-for="(image, index) in pagedata.bottomBannerList" :src="getImageUrl(image.imageUrl)"
								:key="index"></image>
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
		indexUrl
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
				isJoin:true,
				pagedata: {
					tadayProduct: [],
					topBannerList: [],
					bottomBannerList: []
				}
			}
		},
		computed: {
			...mapState(['userInfo']),
			...mapGetters(['hasLogin'])
		},
		async onLoad() {
			let uInfo={
				balancesFormat: 848,
				id: 7122116227614282,
				identity: 0,
				isDelivery: false,
				loginCount: 0,
				nickName: "一点半",
				openId: "1",
				phone: "15996398125",
				pointsFormat: 0
			}
			// await this.$mStore.commit('login', "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyZThkN2UxOC0zM2YzLTQ1ODMtYWI2Mi0yMTgxZmU0NTkyMjQiLCJpYXQiOiIxNzAxNTAwNTkzIiwibmJmIjoiMTcwMTUwMDU5MyIsImV4cCI6MTcwMTcxNjU5MywiaXNzIjoiUXlJc3N1ZXIiLCJhdWQiOlsiUXlBdWRpZW5jZSIsIlF5QXVkaWVuY2UiXSwiVXNlciI6IjU4MjE0QUQxMDU1QTM2MTI2QkJGRTAwNzg4QTY4QkIxQjcwMTkzOTBDQTM3QjYzNDQxMzQzODQxRTEwQzE2NEQ0REQzODM4QTJBRTlGNUVBRjJGM0RCRjQ2QzEyOTgwNjlBMTJCM0FGMTgzODY2NzU4QkZGMjcwNjZEMkQ3MjUwMUEyOTg1MTQ0NzQ1RTM5Rjk2OUQ5MjA5NzlCMTg5NzMyMjY5ODQ0RENCQTlCMjAyRjAyQUMyOEZBMEFDNzI5NEE4Njc3RTgyRDRENzVEMTBFNDY1OUY0MkYwQzY3QUE5NTM2NkMxQTczNDQwNEUzRDVDMjlERjkyOTJFNzcyNUZCQjYyNjNFN0VBMjc1QkU0NTA0NTU0NjFCMjkxOEQ2QjQ4ODIyMDVDMzM4RTMwODYifQ.lPmrtULt-HMu1Hu9jpJBDvV5ZpsV-nq9sKs6PHkNDJ8");
			// await this.$mStore.commit('setUserInfo', uInfo)
						  
			this.isDelivery = this.userInfo&&this.userInfo.isDelivery;
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
		}
	}
</script>

<style lang="scss" scoped>
	.content-box{
		position: relative;
	}
	.banner {
		width: 100%;
		height: 480rpx;		
		position: relative;
		z-index: 1;
		.swiper-container {
		  height: 480rpx;
		  
		  swiper,.swiper-image {
			  width: 100%;
			  height: 100%;
			}
		}
		
		
		image {
			width: 100%;
			height: 100%;
		}
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
			margin: 80rpx auto;
			background: url(https://img.js.design/assets/img/60ebaa75695146d4363e03a8.png);
			background-size: 100% 100%;
		}
	}

	.content {
		padding: 0 30rpx 40rpx;
		margin-top: -60rpx;
		position: relative;
		z-index: 2;
	}

	.peisong {
		color: #4D716F;
		font-size: 40rpx;
		margin-bottom: 40rpx;
		// background: #DAF2DD;
		border-radius:  8px;
		background: linear-gradient(90deg, rgba(207, 245, 240, 1) 0%, rgba(239, 255, 253, 1) 100%);
	}
	.peisong-new{
		width: 100%;
		height: 96rpx;
		opacity: 1;
		border-radius: 8px;
		background: linear-gradient(90deg, rgba(207, 245, 240, 1) 0%, rgba(239, 255, 253, 1) 100%);
		margin-bottom: 20rpx;
		
		.peisong-text{
			font-size: 40rpx;
			    line-height: 96rpx;
			    padding-left: 120rpx;
		}
	}

	.entrance {
		height: 204rpx;
		// border-radius: 20rpx;
		// background: rgba(255, 255, 255, 1);
		box-shadow: 0px 0px 20px rgba(132, 186, 168, 0.4);
		margin-bottom: 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 24rpx 54rpx 44rpx 32rpx;
		border-radius: 16rpx;
		background: linear-gradient(180deg, rgba(242, 252, 252, 1) 0%, rgba(255, 255, 255, 1) 100%);
		gap: 20rpx;
		.headimg{
			width: 112rpx;
			height: 112rpx;
			
			image{
				width: 100%;
				height: 100%;
			}
		}


		.left {
			display: flex;
			flex-direction: column;
			gap: 12rpx;
			flex: 1;

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
		
		.line{
			width: 38rpx;
			height: 136rpx;
			image{
				width: 100%;
				height: 100%;
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
					font-size: 24rpx;
					color: rgba(77, 113, 111, 1);
				}
			}

		}
	}

	.navigators {
		 height: 460rpx;
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
			box-shadow: 1px 1px 2px rgba(255, 255, 255, 0.7), inset -1px -1px 0px rgba(255, 255, 255, 1), inset 1px 1px 0px rgba(255, 255, 255, 1), -3px -3px 7px rgba(255, 255, 255, 1), 3px 3px 7px rgba(176, 191, 184 , 0.5);
			//box-shadow: 0px 0px 0px rgba(255, 255, 255, 0.7), inset -1px -1px 0px white, inset 1px 1px 0px white, -3px -3px 7px white, 3px 3px 7px rgb(208 214 211 / 50%);
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
				width: 100%;
				height: 48rpx;
				font-size: 28rpx;
				font-weight: 500;
				line-height: 48rpx;
				color: rgba(255, 255, 255, 1);
				text-align: center;				
				z-index: 10;

				.text{					
					width: 160rpx;
					height: 48rpx;
					font-size: 28rpx;
					font-weight: 500;
					line-height: 48rpx;
					color: rgba(255, 255, 255, 1);
					text-align: center;
					border-radius: 10px 0px 10px 0px;
					background: rgba(255, 195, 0, 1);
				}
				image{
					display: block;
					margin: 0 auto;
					width: 176rpx;
					height: 48rpx;
				}
			}
		}

		.right {
			flex: 1;
			display: flex;
			flex-direction: column;
			gap: 32rpx;


			.waimai {
				border-radius: 8px;
				background: linear-gradient(180deg, rgba(242, 252, 252, 1) 0%, rgba(255, 255, 255, 1) 100%);
			}

			.dingzhi {
				border-radius: 8px;
				background: linear-gradient(180deg, rgba(242, 252, 252, 1) 0%, rgba(255, 255, 255, 1) 100%);
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
		padding: 40rpx;
		
		// box-shadow: 1px 1px 2px rgba(255, 255, 255, 0.7), inset -1px -1px 0px rgba(255, 255, 255, 1), inset 1px 1px 0px rgba(255, 255, 255, 1), -3px -3px 7px rgba(255, 255, 255, 1), 3px 3px 7px rgba(113, 173, 145, 0.5);

		.navigators-left {
			background: none;
			display: flex;
			flex-direction: column;
			gap: 12rpx;

			.xiaozi {
				font-size: 24rpx;
				color: rgba(28, 165, 147, 1);
			}

			.dazi {
				font-size: 32rpx;
				color: #4D716F;
			}
		}

		.navigators-right {
			width: 88rpx;
			// height: 48rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			background: rgba(255, 255, 255, 1);
			border-radius: 50%;
			padding-top: 40rpx;
			padding-left: 20rpx;
			image{
				width: 88rpx;
				height: 88rpx;
			}
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