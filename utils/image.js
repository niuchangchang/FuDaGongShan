import indexConfig from '@/config/index.config';

const imgHost = (path)=> {
	let baseUrl = ''
	baseUrl = indexConfig.fileUrl
	return baseUrl + path
}

// export const install = ()=> {
//   Vue.prototype.$imgHost = imgHost
// }

export default imgHost
