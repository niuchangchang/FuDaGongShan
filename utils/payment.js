// import { http } from '@/utils/request';
// import mRouter from '@/utils/router';
// import { orderPay } from '@/api/product';
export default {
	/*
	 *@des 微信支付
	 *
	 *@param order_group 订单:order;充值:recharge;
	 *@param config 微信支付参数;
	 */
	async weixinPay(config, route = '') {
		const params = {
			appId: config.appId,
			timeStamp: config.timestamp,
			nonceStr: config.nonceStr,
			package: `prepay_id=${config.preWxOrderId}`,
			signType: config.signType,
			paySign: config.paySign,
		}
		console.log('====请求支付参数', params)
		return new Promise((resolve, reject) => {
			uni.requestPayment({
				...params,
				success: () => {
					console.log('====支付成功')
					resolve(true)
					// mHelper.toast('支付成功');
					// mRouter.redirectTo({ route });
				},
				fail: fail => {
					console.log('====支付失败原因', fail)
					resolve(false)
					// mHelper.toast('支付已取消');
				},
				complete: () => {}
			});
		})
	},

	/*
	 *@des 余额支付
	 *
	 *@param data 支付参数
	 */
	// async balancePay(data, route = '') {
	// 	await http
	// 		.post(`${orderPay}`, {
	// 			order_group: 'order',
	// 			trade_type: 'js',
	// 			pay_type: 5,
	// 			data
	// 		})
	// 		.then(() => {
	// 			mRouter.redirectTo({ route });
	// 		});
	// }
};
