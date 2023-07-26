<template>
	<view class="container">
		<view class="intro">
			<view class="intro-logo"></view>
			<view class="wx-logo">
				<image src="/static/images/mine/wechat.png"></image>
			</view>
			<text class="text-login">微信手机号授权登录</text>
			<view class="shouquan">
				<view class="gouxuan"></view>
				<text class="tongyi">我已阅读并同意</text>
				<a class="xieyi" href="http://">《用户协议》</a>
				<!-- <text class="xieyi"></text> -->
			</view>
		</view>
	</view>
</template> 

<script>
	import Member from '@/api/member'
	import {mapMutations} from 'vuex'
	
	export default {
		data() {
			return {
				show: true
			}
		},
		methods: {
			...mapMutations(['SET_MEMBER']),
			async getUserInfo(e) {
				const {errMsg, userInfo} = e.detail
				if(errMsg !== "getUserInfo:ok") {
					uni.showModal({
						title: '提示',
						content: '您取消了授权登录，请重新授权',
						showCancel: false
					})
					
					//没有授权登录就用默认的用户信息
					this.SET_MEMBER(Member)
					uni.navigateBack()
					
					return
				} else {
					const {avatarUrl: avatar, city, country, gender, nickName: nickname, province} = userInfo
					const member = Object.assign(Member, {avatar, city, country, gender, nickname, province})
					this.SET_MEMBER(member)
					
					uni.navigateBack()
				}
			},
			login() {
				this.SET_MEMBER(Member)
				uni.navigateBack()
			},
			close() {
				
			},
			open() {
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.intro {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 22rpx;
		margin-top: 160rpx;
		font-size: $font-size-base;
		color: $text-color-assist;
		.shouquan {
			margin-top: 36rpx;
			height: 48rpx;
			display: flex;
			align-items: center;
			.xieyi {
				font-size: 28rpx;
				color: rgba(77, 113, 111, 1);
			}
			.tongyi {
				font-size: 28rpx;
				color: rgba(152, 161, 175, 1);
			}
			.gouxuan {
				width: 36rpx;
				height: 36rpx;
				display: flex;
			}
		}
		
		.text-login {
			font-size: 24rpx;
			color: rgba(128, 128, 128, 1);
		}
		.intro-logo {
			width: 440rpx;
			height: 360rpx;
			opacity: 1;
			background: url(https://img.js.design/assets/img/6479542fc53e8201f148e193.png#c3647572e7973da388e63df27b70a033);
			background-size: 100% 100%;
		}
	}
	.wx-logo {
		width: 100rpx;
		height: 100rpx;
		display: flex;
		justify-content: center;
	    align-items: center;
		border-radius: 10rpx;
		background: rgba(40, 196, 69, 1);
		image {
			width: 64rpx;
			height: 54rpx;
		}
	}
</style>
