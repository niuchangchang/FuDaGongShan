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
					<u-form :model="form" ref="form1" label-position="top" :border-bottom="false"
						:label-style="{'color': '#6E7C87', 'line-height': '38rpx'}">
						<u-form-item label="姓名:" prop="userName">
							<u-input v-model="form.userName" border />
						</u-form-item>
						<u-form-item label="联系电话:" prop="tel">
							<u-input v-model="form.tel" border />
						</u-form-item>
						<u-form-item label="企业名称:" prop="companyName">
							<u-input v-model="form.companyName" border />
						</u-form-item>
						<u-form-item label="用餐人数:" prop="numbers">
							<u-input v-model="form.numbers" type="number" border />
						</u-form-item>
					</u-form>
				</view>
				<text class="tip">注：申请企业用餐人数必须大于10人</text>
				<view class="submit" @tap="handleApply">
					立即申请
				</view>
				<text class="tel">服务热线：021-88888888</text>
			</view>
		</content>
		<u-tabbar :list="list" :mid-button="true" mid-button-size="70" active-color="#2AB07D"
			inactive-color="#C0C4CC"></u-tabbar>
	</view>
</template>

<script>
	import {
		companyOrderCreate,
		bannerUrl
	} from '@/api/url';
	import {
		mapMutations
	} from 'vuex';
	export default {
		components: {},
		data() {
			return {
				list: this.$mConstDataConfig.tabbarList,
				bannerList: [],
				form: {
					userName: '',
					tel: '',
					companyName: '',
					numbers: '',
				},
				rules: {
					userName: [{
						required: true,
						message: '请输入姓名',
						trigger: ['change', 'blur']
					}],
					tel: [{
						required: true,
						message: '请输入手机号',
						trigger: ['change', 'blur'],
					}, {
						// 自定义验证函数，见上说明
						validator: (rule, value, callback) => {
							// 上面有说，返回true表示校验通过，返回false表示不通过
							// this.$u.test.mobile()就是返回true或者false的
							return this.$u.test.mobile(value);
						},
						message: '手机号码不正确',
						// 触发器可以同时用blur和change
						trigger: ['change', 'blur'],
					}],
					companyName: [{
						required: true,
						message: '请输入企业名称',
						trigger: ['change', 'blur']
					}],
					// numbers: [{
					// 	required: true,
					// 	message: '请输入用餐人数',
					// 	trigger: ['change', 'blur']
					// }],
				}
			}
		},
		async onLoad() {},
		onReady() {
			this.$refs.form1.setRules(this.rules);
		},
		onShow() {
			this.getBanner()
		},
		computed: {},
		methods: {
			navTo() {
				const route = '/pages/index/index'
				this.$mRouter.switchTab({
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
			handleApply() {
				this.$refs.form1.validate(async (valid) => {
					if (valid) {
						await this.$http
							.post(`${companyOrderCreate}`, this.form)
							.then(async r => {
								this.$mHelper.toast(r.msg);
								setTimeout(() => {
									// this.$mRouter.back();
									this.navTo()
								}, 1000)
							})
							.catch(err => {
								this.$mHelper.toast(err);
							});
					}
				})
			}
		}
	};
</script>

<style lang="scss" scoped>
	.content-container {
		height: 100%;
		padding: 40rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		background: #FFFFFF;
	}

	.logo-container {
		width: 100%;
		height: 280rpx;
		background-color: #2B7365;
	}

	.form-container {
		width: 100%;
		margin: 20rpx 0;
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