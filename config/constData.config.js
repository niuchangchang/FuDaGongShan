export default {
	// app应用名称
	appName: '复达供膳',

	// 个人中心-设置中心菜单
	settingList: [
		{ icon: '', img: '/static/sz_icon.png', imageWidth: 34, imageHeight: 38, url: '/pages/set/set', title: '设置' },
	],

	// 设置-设置中心
	setList: [
		{ title: '清除缓存', url: 'clearCache', content: '' },
	],

	// 个人中心-我的订单
	orderSectionList: [
		{
			title: '待支付',
			icon: 'iconfont icondaifukuan',
			url: '/pages/order/order?state=0',
			num: null
		},
		{
			title: '待配送',
			icon: 'iconfont iconshouye',
			url: '/pages/order/order?state=1',
			num: null
		},
		{
			title: '已完成',
			icon: 'iconfont iconyishouhuo',
			url: '/pages/order/order?state=2',
			num: null
		},
		{
			title: '待评价',
			icon: 'iconfont iconpingjia',
			url: '/pages/order/order?state=3',
			num: null
		},
	],

	// 个人中心-积分余额
	amountList: [
		{ title: '余额', value: 0, url: '/pages/user/account/account' },
		{ title: '优惠券', value: 0, url: '/pages/user/coupon/coupon?type=1' },
		{ title: '积分', value: 0, url: '/pages/user/account/integral' }
	],

	// 订单状态
	orderStatus: [
		{ key: 1, value: '待付款' },
		{ key: 2, value: '待配送' },
		{ key: 3, value: '已完成' },
		{ key: 4, value: '待评价' },
		{ key: 5, value: '已取消' },
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
		{ state: -1, text: '全部' },
		{ state: 0, text: '待付款' },
		{ state: 1, text: '待配送' },
		{ state: 2, text: '已完成' },
		{ state: 3, text: '已取消' }
	],

	// 支付方式
	payTypeList: [
		{ state: 1, text: '微信支付'},
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
			iconPath: "grid",
			selectedIconPath: "grid",
			text: '点餐',
			pagePath: "/pages/menu/menu"
		},
		{
			iconPath: "https://cdn.uviewui.com/uview/common/min_button.png",
			selectedIconPath: "https://cdn.uviewui.com/uview/common/min_button_select.png",
			midButton: true,
			customIcon: false,
		},
		{
			iconPath: "shopping-cart",
			selectedIconPath: "shopping-cart",
			text: '购物车',
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
