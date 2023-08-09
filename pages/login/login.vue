<template>
	<view class="container">
		<u-navbar title="登录" title-color="#FFFFFF" title-bold="true" back-icon-color="#FFFFFF" border-bottom="false"
			:background="{ backgroundImage: 'linear-gradient(to bottom, rgb(128, 172, 148), rgb(145, 187, 170))' }"></u-navbar>
		<content>
			<view class="intro">
				<view class="intro-logo"></view>
				<button :loading="btnLoading" class="wx-logo" open-type="getPhoneNumber" @getphonenumber="toAuthLogin">
					<image src="/static/images/wechat.png"></image>
				</button>
				<text class="text-login">微信手机号授权登录</text>
				<view class="shouquan">
					<u-checkbox v-model="appAgreementDefaultSelect" size="30" active-color="#2B7365"></u-checkbox>
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
	import {
		login
	} from '@/api/url';

	export default {
		data() {
			return {
				appAgreementDefaultSelect: true,
				show: false,
				code: null,
				btnLoading: false
			}
		},
		onLoad() {
			// 校验 session_key 是否过期
			wx.checkSession({
				success: () => {
					console.log('session_key 未过期，并且在本生命周期一直有效')
				},
				fail: () => {
					console.log('session_key 已经失效，需要重新执行登录流程')
				}
			})
			// 微信登录
			wx.login({
				success: (loginRes) => {
					this.code = loginRes.code;
				},
				fail: () => {
					_this.$mHelper.log('暂不支持小程序登录');
				}
			});
		},
		methods: {
			...mapMutations(['SET_MEMBER']),
			// 授权登录
			toAuthLogin(e) {
				console.log('====loginCode', this.code)
				const detail = e.detail
				console.log('===detail', detail)
				this.btnLoading = true;
				if (!this.appAgreementDefaultSelect) {
					this.$mHelper.toast('请阅读并同意协议', 1.5 * 1000);
					this.btnLoading = false;
					return;
				}
				const _this = this;
				let params = {
					loginCode: _this.code,
					phoneCode: detail.phoneCode || '123',
					encryptedData: detail.encryptedData || '123',
					iv: detail.iv || '123'
				};
				_this.thirdPartyAuthLogin(params);
				if (detail.errMsg === "getPhoneNumber:ok") {
					console.log('====登录请求参数params', params)
					// 登录
					// _this.thirdPartyAuthLogin(params);
				} else {
					_this.btnLoading = false;
				}
			},
			thirdPartyAuthLogin(params = {}) {
				const _this = this;
				_this.$http
					.post(login, params)
					.then(async r => {
						console.log('=====登录返回结果', r)
						_this.btnLoading = false;
						if (r.data) {
							await _this.$mStore.commit('login', r.data);
							_this.$mHelper.toast('登录成功');
							_this.toPage()
						}
					}).catch((err) => {
						_this.btnLoading = false;
					});
			},
			// 登录后跳转
			toPage() {
				const _this = this;
				const backToPage = uni.getStorageSync('backToPage');
				if (backToPage) {
					if (
						backToPage.indexOf('/pages/mine/mine') !== -1 ||
						backToPage.indexOf('/pages/index/index') !== -1 ||
						backToPage.indexOf('/pages/index/index_copy') !== -1 ||
						backToPage.indexOf('/pages/menu/menu') !== -1 ||
						backToPage.indexOf('/pages/cart/cart') !== -1
					) {
						_this.$mRouter.reLaunch(JSON.parse(backToPage));
					} else {
						_this.$mRouter.redirectTo(JSON.parse(backToPage));
					}
					uni.removeStorageSync('backToPage');
				} else {
					_this.$mRouter.reLaunch({
						route: '/pages/index/index'
					});
				}
			}
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
		padding: 0;
		border: none;
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
<style>
	.u-checkbox {
		width: 45rpx !important;
	}
</style>