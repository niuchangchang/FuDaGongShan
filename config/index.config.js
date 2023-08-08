const CONFIG = {
    // 开发环境配置
    development: {
        assetsPath: '/static', // 静态资源路径
		baseUrl: 'https://jy.e314.cn', // 后台接口请求地址
    },
    // 生产环境配置
    production: {
        assetsPath: '/static', // 静态资源路径
        baseUrl: 'https://jy.e314.cn', // 后台接口请求地址
    }

};
export default CONFIG[process.env.NODE_ENV];
