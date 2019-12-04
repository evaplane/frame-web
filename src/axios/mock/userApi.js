const userLoginData = function() {
	let data = {
		retCode: "000000",
		retMsg: "成功",
		rows: {
			userType: 10,
			userName: "admin",
			userMobile: "+86100000",
			userEmail: "admin@tlkj.com",
			userCode: "98513235669417984",
			tokenName: "admin(+86100000)",
			secretKey:
				"akOQmI7NWxF4bZYFiMijcy2DFRwm1huaSTFvbZt1Uf1Z9UrLN/1ZY8r/XOIoYVCCBYjiRTAx+7Xl40x2kb55Ws98W9qHZE3THMcZ07jx+asUhD9HDNA21Fpc5SedUDcc4NhHs6kA5N91EmlqXRZwVdEWGSMbGknD5HSgBdCLFRrD9827K4E+mZVt9fWDfEjs6VZT0oapIyzBA5ccm02stUwOeQBEPmw6hU3nuGJkw+k3v99gtXL/F12ShCSkI5/c4J/Cjm7NfT8d5oLg6gYaew==",
			loginName: "admin",
			loginKey: "0cb9d8bc83404395b6abda4bb98b82d6",
			createTime: 1569759385000,
			cacheLimit: "1800"
		}
	};
	return data;
};

const userLogOut = function() {
	let data = {
		retCode: "000000",
		retMsg: "成功",
		rows: ""
	};
	return data;
};

const resetPass = function() {
	let data = {
		retCode: "000000",
		retMsg: "成功",
		rows: ""
	};
	return data;
};
const userInfo = function() {
	let data = {
		retCode: "000000",
		retMsg: "成功",
		rows: {
			createTime: 1558520267000,
			id: "2",
			isResetStatus: -100,
			loginName: "admin",
			password: "",
			status: 100,
			updateTime: 1566991551000,
			userCode: "admin",
			userEmail: "",
			userMobile: "",
			userName: "admin",
			userRole: "管理员",
			userType: 10
		}
	};
	return data;
};

const getMenuList = function() {
	let data = {
		retCode: "000000",
		retMsg: "成功",
		rows: {
			permList: ["npay:user:delete"],
			menuList: [
				{
					menuId: 1,
					menuName: "系统管理",
					list: [
						{
							menuId: 10,
							menuName: "操作员管理",
							list: [
								{
									menuId: 11,
									menuName: "操作员下属管理"
								}
							]
						}
					]
				},
				{
					menuId: 2,
					menuName: "用户管理",
					list: [
						{
							menuId: 20,
							menuName: "用户列表"
						},
						{
							menuId: 21,
							menuName: "昵称管理"
						}
					]
				},
				{
					menuId: 3,
					menuName: "内容管理",
					list: [
						{
							menuId: 30,
							menuName: "标签分类管理"
						},
						{
							menuId: 31,
							menuName: "标签管理",
							list: [
								{
									menuId: 99,
									menuName: "标签下属列表"
								},
								{
									menuId: 100,
									menuName: "视频下属列表2",
									list: [
										{
											menuId: 101,
											menuName: "视频下属列表21"
										}
									]
								}
							]
						},
						{
							menuId: 32,
							menuName: "视频导入",
							list: [
								{
									menuId: 999,
									menuName: "视频下属列表"
								}
							]
						},
						{
							menuId: 33,
							menuName: "内容列表"
						},
						{
							menuId: 34,
							menuName: "内容审核"
						},
						{
							menuId: 35,
							menuName: "审核不通过列表"
						},
						{
							menuId: 36,
							menuName: "自动审核白名单"
						}
					]
				},
				{
					menuId: 4,
					menuName: "广告管理",
					list: [
						{
							menuId: 41,
							menuName: "广告分类管理"
						},
						{
							menuId: 42,
							menuName: "广告类别管理"
						},
						{
							menuId: 43,
							menuName: "广告列表"
						}
					]
				},
				{
					menuId: 5,
					menuName: "推荐管理",
					list: [
						{
							menuId: 51,
							menuName: "初始热度值配置"
						}
					]
				},
				{
					menuId: 6,
					menuName: "采集管理",
					list: [
						{
							menuId: 61,
							menuName: "采集用户设置"
						},
						{
							menuId: 62,
							menuName: "采集代理池设置"
						},
						{
							menuId: 63,
							menuName: "采集内容设置"
						},
						{
							menuId: 64,
							menuName: "采集内容列表"
						}
					]
				},
				{
					menuId: 7,
					menuName: "基础配置管理",
					list: [
						{
							menuId: 71,
							menuName: "提示语分类管理"
						},
						{
							menuId: 72,
							menuName: "提示语配置"
						},
						{
							menuId: 73,
							menuName: "前端基础配置"
						},
						{
							menuId: 74,
							menuName: "非法关键字管理"
						},
						{
							menuId: 75,
							menuName: "APP版本升级"
						}
					]
				}
			]
		}
	};
	return data;
};

export default {
	userLogin: () => userLoginData(),
	userLogOut: () => userLogOut(),
	getMenuList: () => getMenuList(),
	resetPass: () => resetPass(),
	userInfo: () => userInfo()
};
