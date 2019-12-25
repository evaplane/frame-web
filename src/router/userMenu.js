import MenuView from "@/views/MenuView/MenuView";
import RouterLayout from "@/layout/RouterLayout/RouterLayout";

export default [
	{
		path: "/",
		name: "主页",
		component: MenuView,
		redirect: "/homepage",
		icon: "none",
		invisible: true,
		meta: {
			requireAuth: true
		},
		children: [
			{
				menuId: 0,
				path: "/homepage",
				redirect: "/home",
				invisible: false,
				component: RouterLayout,
				meta: {
					requireAuth: true,
					keepAlive: true,
					name: "homePage"
				},
				children: [
					{
						path: "/home",
						name: "首页",
						invisible: false,
						component: () =>
							import("@/views/HomePage/HomePage.vue"),
						meta: {
							requireAuth: true,
							keepAlive: true,
							name: "homePage"
						}
					}
				]
			},
			{
				path: "/system",
				redirect: "/system/operator",
				icon: "ri-settings-4-fill",
				name: "系统管理",
				invisible: false,
				component: RouterLayout,
				children: [
					{
						path: "/system/operator",
						icon: "ri-user-settings-fill",
						name: "操作员管理",
						component: () => import("@/views/MenuOne/MenuOne.vue"),
						meta: {
							requireAuth: true,
							keepAlive: true,
							name: "operator"
						},
						invisible: false,
						children: [
							{
								path: "/system/operator/order",
								icon: "ri-user-settings-fill",
								name: "操作员下属管理",
								component: () =>
									import("@/views/MenuOne/MenuOne.vue"),
								meta: {
									requireAuth: true,
									keepAlive: true,
									name: "operatororder"
								},
								invisible: false
							}
						]
					},
					{
						path: "/system/role",
						icon: "ri-settings-6-fill",
						name: "角色管理",
						component: () => import("@/views/MenuOne/MenuOne.vue"),
						meta: {
							requireAuth: true,
							keepAlive: true,
							name: "operatorrole"
						},
						invisible: false
					},
					{
						path: "/system/menu",
						icon: "ri-list-settings-fill",
						name: "菜单管理",
						component: () => import("@/views/MenuOne/MenuOne.vue"),
						meta: {
							requireAuth: true,
							keepAlive: true,
							name: "operatormenu"
						},
						invisible: false
					}
				]
			},
			{
				path: "/content",
				redirect: "/content/tagclassic",
				icon: "ri-settings-4-fill",
				name: "内容管理",
				invisible: false,
				component: RouterLayout,
				children: [
					{
						path: "/content/tagclassic",
						icon: "ri-user-settings-fill",
						name: "标签分类管理",
						component: () => import("@/views/MenuOne/MenuOne.vue"),
						invisible: false,
						meta: {
							requireAuth: true,
							keepAlive: true,
							name: "tagclassic"
						}
					},
					{
						path: "/content/tag",
						icon: "ri-settings-6-fill",
						name: "标签管理",
						component: () => import("@/views/MenuOne/MenuOne.vue"),
						invisible: false,
						meta: {
							requireAuth: true,
							keepAlive: true,
							name: "tag"
						},
						children: [
							{
								path: "/content/tag/order",
								icon: "ri-settings-6-fill",
								name: "标签下属列表",
								component: () =>
									import("@/views/MenuOne/MenuOne.vue"),
								invisible: false,
								meta: {
									requireAuth: true,
									keepAlive: true,
									name: "tagorder"
								}
							}
						]
					},
					{
						path: "/content/in",
						icon: "ri-settings-6-fill",
						name: "视频导入",
						component: () => import("@/views/MenuOne/MenuOne.vue"),
						invisible: false,
						meta: {
							requireAuth: true,
							keepAlive: true,
							name: "contentin"
						},
						children: [
							{
								path: "/content/tag/order2",
								icon: "ri-settings-6-fill",
								name: "视频下属列表",
								component: () =>
									import("@/views/MenuOne/MenuOne.vue"),
								invisible: false,
								meta: {
									requireAuth: true,
									keepAlive: true,
									name: "contentin2"
								}
							},
							{
								path: "/content/tag/oder3",
								icon: "ri-settings-6-fill",
								name: "视频下属列表2",
								component: () =>
									import("@/views/MenuOne/MenuOne.vue"),
								invisible: false,
								meta: {
									requireAuth: true,
									keepAlive: true,
									name: "contentin3"
								},
								children: [
									{
										path: "/content/tag/oder4",
										icon: "ri-settings-6-fill",
										name: "视频下属列表21",
										component: () =>
											import(
												"@/views/MenuOne/MenuOne.vue"
											),
										invisible: false,
										meta: {
											requireAuth: true,
											keepAlive: true,
											name: "contentin4"
										}
									}
								]
							}
						]
					},
					{
						path: "/content/list",
						icon: "ri-settings-6-fill",
						name: "内容列表",
						component: () => import("@/views/MenuOne/MenuOne.vue"),
						invisible: false,
						meta: {
							requireAuth: true,
							keepAlive: true,
							name: "contentin4"
						}
					},
					{
						path: "/content/check",
						icon: "ri-settings-6-fill",
						name: "内容审核",
						component: () => import("@/views/MenuOne/MenuOne.vue"),
						invisible: false,
						meta: {
							requireAuth: true,
							keepAlive: true,
							name: "contentcheck"
						}
					},
					{
						path: "/content/check1",
						icon: "ri-settings-6-fill",
						name: "审核不通过列表",
						component: () => import("@/views/MenuOne/MenuOne.vue"),
						invisible: false,
						meta: {
							requireAuth: true,
							keepAlive: true,
							name: "contentcheck1"
						}
					},
					{
						path: "/content/check11",
						icon: "ri-settings-6-fill",
						name: "自动审核白名单",
						component: () => import("@/views/MenuOne/MenuOne.vue"),
						invisible: false,
						meta: {
							requireAuth: true,
							keepAlive: true,
							name: "contentwhitelist"
						}
					}
				]
			},
			{
				path: "/cus",
				redirect: "/cus/one",
				icon: "ri-settings-4-fill",
				name: "广告管理",
				invisible: false,
				component: RouterLayout,
				children: [
					{
						path: "/cus/one",
						icon: "ri-user-settings-fill",
						name: "广告分类管理",
						component: () => import("@/views/MenuTwo/MenuTwo.vue"),
						invisible: false,
						meta: {
							requireAuth: true,
							keepAlive: true,
							name: "cusone"
						}
					},
					{
						path: "/cus/two",
						icon: "ri-user-settings-fill",
						name: "广告类别管理",
						component: () => import("@/views/MenuTwo/MenuTwo.vue"),
						invisible: false,
						meta: {
							requireAuth: true,
							keepAlive: true,
							name: "custwo"
						}
					},
					{
						path: "/cus/three",
						icon: "ri-user-settings-fill",
						name: "广告列表",
						component: () => import("@/views/MenuTwo/MenuTwo.vue"),
						invisible: false,
						meta: {
							requireAuth: true,
							keepAlive: true,
							name: "custhree"
						}
					}
				]
			}
		]
	}
];
