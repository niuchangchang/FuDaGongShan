<template>
	<view class="container">
		<u-navbar 
			title="登录" 
			title-color="#FFFFFF" 
			title-bold="true"
			back-icon-color="#FFFFFF" 
			border-bottom="false"
			:background="{ backgroundImage: 'linear-gradient(to bottom, rgb(128, 172, 148), rgb(145, 187, 170))' }"
		></u-navbar>
		<content>
			<view class="intro">
				<view class="intro-logo"></view>
				<view class="wx-logo">
					<image src="/static/images/wechat.png"></image>
				</view>
				<text class="text-login">微信手机号授权登录</text>
				<view class="shouquan">
					<u-checkbox-group v-model="checkboxValue" placement="column" @change="checkboxChange">
						<u-checkbox v-for="(item, index) in checkboxList" :key="index" :name="item.name" activeColor="#4d716f" />
					</u-checkbox-group>
					<text class="tongyi">我已阅读并同意</text>
					<text class="xieyi" @click="show = true">《用户协议》</text>
				</view>
			</view>
		</content>
		<u-popup v-model="show" mode="center" border-radius="16">
			<view class="xieyi-text">
				<view class="title">用户协议</view>
				<text>
					一、【协议的范围】1.1【协议适用主体范围】本协议是用户（以下可称为“您”）与腾讯之间关于下载、安装、使用、登录本软件，以及使用本服务所订立的协议。1.2【协议关系及冲突条款】本协议被视为《腾讯服务协议》及《腾讯QQ软件许可及服务协议》、《QQ号码规则》的补充协议，是其不可分割的组成部分，与其构成统一整体。本协议与上述内容存在冲突的，以本协议为准。本协议内容同时包括腾讯可能不断发布的关于本服务的相
					关协议、服务声明、业务规则及公告指引等内容（以下统称为“专项规则”）。专项规则一经正式发布，即为本协议不可分割的组成部分，您同样应当遵守。
					二、【关于本服务】2.1【相关定义】（1）腾讯企点软件：指由腾讯开发、运营并享
				</text>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		mapMutations
	} from 'vuex'

	export default {
		data() {
			return {
				checkboxValue: [],
				checkboxList: [{
					name: 'agree',
				}],
				show: false,
			}
		},
		methods: {
			...mapMutations(['SET_MEMBER']),
		}
	}
</script>

<style lang="scss" scoped>
	.intro {
		width: 100%;
		padding-top: 200rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 22rpx;
		font-size: $font-size-base;
		color: $text-color-assist;

		.shouquan {
			margin-top: 36rpx;
			height: 48rpx;
			display: flex;
			align-items: center;

			.tongyi {
				font-size: 28rpx;
				color: rgba(152, 161, 175, 1);
			}
			.xieyi {
				font-size: 28rpx;
				color: rgba(77, 113, 111, 1);
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

	.xieyi-text {
		width: 622rpx;
		max-height: 1000rpx;
		overflow-y: auto;
		padding: 60rpx;

		text {
			font-size: 14px;
			letter-spacing: 0px;
			line-height: 24px;
			color: rgba(100, 108, 119, 1);
		}

		.title {
			font-size: 17px;
			letter-spacing: 0px;
			line-height: 24px;
			color: rgba(0, 0, 0, 1);
			text-align: center;
			margin-bottom: 40rpx;
		}
	}
</style>