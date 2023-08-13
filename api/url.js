// 用户

// 登录
const login = '/wx/users/login';


//首页
const indexUrl = '/wx/pages/index';
//焦点图
const bannerUrl = '/wx/banners/list';


//商品

//商品分类列表
const productCategoryUrl = '/wx/products/categorylist';
//商品列表
const productUrl = '/wx/products/list';
// 加入购物车
const addCart = '/wx/orders/cartadd';
// 修改购物车
const updateCart = '/wx/orders/cartupdate';
// 移除购物车
const removeCart = '/wx/orders/cartremove';
// 购物车列表
const cartList = '/wx/orders/cartlist';
// 购物车数量
const cartCount = '/wx/orders/cartcount';

// 创建订单
const orderCreate = '/wx/orders/orderscreate';
// 订单结算
const orderPay = '/wx/orders/orderssettlement';
// 订单重新结算
const orderRePay = '/wx/orders/orderspayment';
// 订单列表
const orderList = '/wx/orders/orderslist';


export {
	login,
	indexUrl,
	bannerUrl,
	productCategoryUrl,
	productUrl,
	addCart,
	updateCart,
	removeCart,
	cartList,
	cartCount,
	orderCreate,
	orderPay,
	orderRePay,
	orderList
};