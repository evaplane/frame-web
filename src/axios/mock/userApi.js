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
					menuName: "系统管理",
					list: [
						{
							menuName: "操作员管理",
							list: [
								{
									menuId: 44,
									menuName: "操作员下属管理"
								}
							]
						}
					]
				},
				{
					menuName: "用户管理",
					list: [
						{
							menuName: "用户列表"
						},
						{
							menuName: "昵称管理"
						}
					]
				},
				{
					menuName: "内容管理",
					list: [
						{
							menuName: "标签分类管理"
						},
						{
							menuName: "标签管理",
							list: [
								{
									menuId: 99,
									menuName: "标签下属列表"
								},
								{
									menuId: 100,
									menuName: "视频下属列表2",
									nodes: [
										{
											menuId: 101,
											menuName: "视频下属列表21"
										}
									]
								}
							]
						},
						{
							menuName: "视频导入",
							list: [
								{
									menuId: 999,
									menuName: "视频下属列表"
								}
							]
						},
						{
							menuName: "内容列表"
						},
						{
							menuName: "内容审核"
						},
						{
							menuName: "审核不通过列表"
						},
						{
							menuName: "自动审核白名单"
						}
					]
				},
				{
					menuName: "广告管理",
					list: [
						{
							menuName: "广告分类管理"
						},
						{
							menuName: "广告类别管理"
						},
						{
							menuName: "广告列表"
						}
					]
				},
				{
					menuName: "推荐管理",
					list: [
						{
							menuName: "初始热度值配置"
						}
					]
				},
				{
					menuName: "采集管理",
					list: [
						{
							menuName: "采集用户设置"
						},
						{
							menuName: "采集代理池设置"
						},
						{
							menuName: "采集内容设置"
						},
						{
							menuName: "采集内容列表"
						}
					]
				},
				{
					menuName: "基础配置管理",
					list: [
						{
							menuName: "提示语分类管理"
						},
						{
							menuName: "提示语配置"
						},
						{
							menuName: "前端基础配置"
						},
						{
							menuName: "非法关键字管理"
						},
						{
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
