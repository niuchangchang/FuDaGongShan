export default {
	/*
	 *@des 授权定位
	 *
	 *@param permissionName 授权名称
	 */
	async getUserPermission(permissionName) {
		return new Promise((resolve, reject) => {
			wx.getSetting({
				success(res) {
					if (res.authSetting[permissionName]) {
						resolve(true);
					} else if (res.authSetting[permissionName] === false) {
						reject(false);
					} else {
						wx.authorize({
							scope: permissionName,
							success() {
								resolve(true);
							},
							fail() {
								reject(false);
							}
						});
					}
				},
				fail() {
					reject(false);
				}
			});
		});
	},

	// 获取位置信息
	async getLocation() {
		return new Promise((resolve, reject) => {
			uni.getLocation({
				type: "gcj02",
				success: (res) => {
					resolve(res);
				},
				fail: (error) => {
					reject(error);
				},
			});
		});
	},
};