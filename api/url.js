// 用户

// 登录
const login = '/wx/users/login';
// 用户详情
const userInfo = '/wx/users/userinfo';
// 用户积分
const userPoint = '/wx/users/userpointcount';
// 用户余额
const userBalances = '/wx/users/userbalancescount';


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
// 订单详情
const orderDetail = '/wx/orders/ordersdetail';

// 取餐码列表-订单
const erCodeList = '/wx/orders/pickupswithorderid';
// 取餐码列表-用户
const erCodeListByUser = '/wx/orders/pickupswithuserid';
// 取餐
const pickup = '/wx/orders/pickup';



// 中小企业餐饮定制
const companyOrderCreate = '/wx/companyorder/add';



// 配送

// 配送列表
const deliveryOrderList = '/wx/deliverys/list';
// 接单
const deliveryOrderReceive = '/wx/deliverys/receiving';
// 存餐
const deliveryOrderStorage = '/wx/deliverys/storage';



export {
	login,
	userInfo,
	userPoint,
	userBalances,
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
	orderList,
	orderDetail,
	erCodeList,
  erCodeListByUser,
	pickup,
	companyOrderCreate,
	deliveryOrderList,
	deliveryOrderReceive,
	deliveryOrderStorage
};