export default {
	// app应用名称
	appName: '青与食堂',

	// 个人中心-设置中心菜单
	settingList: [
		{ icon: '', img: '', imageWidth: 34, imageHeight: 38, url: '/pages/set/set', title: '优惠券' },
		{ icon: '', img: '', imageWidth: 34, imageHeight: 38, url: '/pages/set/set', title: '积分商城' },
		{ icon: '', img: '', imageWidth: 34, imageHeight: 38, url: '/pages/set/set', title: '我的钱包' },
		{ icon: '', img: '', imageWidth: 34, imageHeight: 38, url: '/pages/set/set', title: '意见反馈' },
	],

	// 设置-设置中心
	setList: [
		{ title: '清除缓存', url: 'clearCache', content: '' },
	],

	// 个人中心-我的订单
	orderSectionList: [
		{
			title: '待付款',
			icon: 'iconfont icon-qianbao',
			url: '/pages/orders/orders?state=0',
			state: 0,
			num: null
		},
		{
			title: '待配送',
			icon: 'iconfont icon-wuliu',
			url: '/pages/orders/orders?state=1',
			state: 1,
			num: null
		},
		{
			title: '已完成',
			icon: 'iconfont icon-wancheng',
			url: '/pages/orders/orders?state=2',
			state: 2,
			num: null
		},
		{
			title: '已取消',
			icon: 'iconfont icon-shousuo',
			url: '/pages/orders/orders?state=3',
			state: 3,
			num: null
		},
		{
			title: '全部订单',
			icon: 'iconfont icon-wenjian',
			url: '/pages/orders/orders?state=-1',
			state: -1,
			num: null
		},
	],

	// 个人中心-积分余额
	amountList: [
		{ title: '积分', value: 0, url: '/pages/user/account/integral' },
		{ title: '余额', value: 0, url: '/pages/user/account/account' },
		{ title: '优惠券', value: 0, url: '/pages/user/coupon/coupon?type=1' },
		{ title: '卡券', value: 0, url: '/pages/user/coupon/coupon?type=1' },
	],

	// 订单状态
	orderStatus: [
		{ key: 0, value: '待付款' },
		{ key: 1, value: '待配送' },
		{ key: 2, value: '已完成' },
		{ key: 3, value: '已取消' },
		{ key: 4, value: '已退货' },
	],

	// 订单退货状态
	refundStatus: [
		{ key: 1, value: '申请中' },
		{ key: 2, value: '处理中' },
		{ key: 3, value: '退款中' },
		{ key: 4, value: '已退款' },
		{ key: -1, value: '退款已拒绝' },
		{ key: -2, value: '退款已关闭' }
	],

	// 订单评价状态
	evaluateStatus: [
		{ key: 0, value: '未评价' },
		{ key: 1, value: '已评价' },
		// { key: 2, value: '已追评' }
	],

	// 订单状态导航
	orderNavList: [
		{ state: null, text: '全部' },
		{ state: 0, text: '待付款' },
		{ state: 1, text: '待配送' },
		{ state: 2, text: '已完成' },
		{ state: 3, text: '已取消' },
		{ state: 4, text: '已退货' },
	],
	
	// 配送订单状态导航
	deliveryOrderNavList: [
		{ state: 0, text: '待配送' },
		{ state: 1, text: '配送中' },
		{ state: 2, text: '已配送' },
	],
	
	// 配送订单状态
	deliveryOrderStatus: [
		{ key: 0, value: '待配送' },
		{ key: 1, value: '配送中' },
		{ key: 2, value: '已配送' },
		{ key: 3, value: '已取餐' },
		{ key: 4, value: '已取消' },
	],
	
	// 订单流程
	orderProcessStatus: [
		{ key: 0, value: '未通过' },
		{ key: 1, value: '订单通过' },
		{ key: 2, value: '订单已确认' },
		{ key: 3, value: '制作完成' },
		{ key: 4, value: '打包配送' },
		{ key: 5, value: '已送达' },
		{ key: 6, value: '已取餐' },
	],

	// 支付方式
	payTypeList: [
		{ state: 0, text: '余额'},
		{ state: 1, text: '微信'},
		{ state: 2, text: '其他'}
	],

	// 配送方式 外卖/自提点
	addressTypeList: [
		{ state: 1, text: '外卖'},
		{ state: 2, text: '自提'}
	],

	// 底部tabber
	tabbarList: [
		{
			iconPath: "home",
			selectedIconPath: "home",
			text: '首页',
			pagePath: "/pages/index/index"
		},
		{
			iconPath: "list-dot",
			selectedIconPath: "list-dot",
			text: '点餐',
			pagePath: "/pages/menu/menu"
		},
		{
			iconPath: "grid",
			selectedIconPath: "grid",
			midButton: true,
			pagePath: "/pages/orders/orders"
		},
		{
			iconPath: "shopping-cart",
			selectedIconPath: "shopping-cart",
			text: '购物车',
			count: 0,
			pagePath: "/pages/cart/cart"
		},
		{
			iconPath: "account",
			selectedIconPath: "account",
			text: '我的',
			pagePath: "/pages/mine/mine"
		}
	],
};
