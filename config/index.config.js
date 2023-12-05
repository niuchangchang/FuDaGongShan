const CONFIG = {
    // 开发环境配置
    development: {
        assetsPath: '/static', // 静态资源路径
		baseUrl: 'https://jy.e314.cn', // 后台接口请求地址
		fileUrl:'https://jy.e314.cn' ,//文件服务器路径
		// baseUrl: 'http://localhost:5251', // 后台接口请求地址
		// fileUrl:'http://localhost:5251' ,//文件服务器路径		
    },
    // 生产环境配置
    production: {
        assetsPath: '/static', // 静态资源路径
        baseUrl: 'https://jy.e314.cn', // 后台接口请求地址
		fileUrl:'https://jy.e314.cn' //文件服务器路径
    }

};
export default CONFIG[process.env.NODE_ENV];
