<template>
	<view class="container">
		<view class="logo"></view>
		<view class="button">点餐</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		computed: {},
		methods: {}
	}
</script>

<style lang="scss" scoped>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 25%;
		background: rgba(113, 173, 145, 1);
		.logo{
			width: 440rpx;
			height: 366rpx;
			margin: 70% auto 0;
			background: url(https://img.js.design/assets/img/6479542fc53e8201f148e193.png#c3647572e7973da388e63df27b70a033);
			background-size: 100% 100%;
		}
		.button{
			width: 188rpx;
			height: 72rpx;
			border-radius: 10px 0px 10px 0px;
			background: rgba(43, 115, 101, 1);
			font-size: 32rpx;
			font-weight: 500;
			text-align: center;
			line-height: 72rpx;
			color: rgba(255, 255, 255, 1);


		}
	}
</style>