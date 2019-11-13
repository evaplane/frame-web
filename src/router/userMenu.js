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
				menuId: "0",
				path: "/homepage",
				name: "首页",
				invisible: false,
				component: () => import("@/views/HomePage/HomePage.vue")
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
							keepAlive: true
						},
						invisible: false
					},
					{
						path: "/system/role",
						icon: "ri-settings-6-fill",
						name: "角色管理",
						component: () => import("@/views/MenuOne/MenuOne.vue"),
						meta: {
							requireAuth: true,
							keepAlive: true
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
							keepAlive: true
						},
						invisible: false
					}
				]
			},
			{
				path: "/user",
				redirect: "/user/userlist",
				icon: "ri-settings-4-fill",
				name: "用户管理",
				invisible: false,
				component: RouterLayout,
				children: [
					{
						path: "/user/userlist",
						icon: "ri-user-settings-fill",
						name: "用户列表",
						component: () => import("@/views/MenuTwo/MenuTwo.vue"),
						invisible: false,
						meta: {
							requireAuth: true,
							keepAlive: true
						}
					},
					{
						path: "/user/petname",
						icon: "ri-settings-6-fill",
						name: "昵称管理",
						component: () => import("@/views/MenuTwo/MenuTwo.vue"),
						invisible: false,
						meta: {
							requireAuth: true,
							keepAlive: true
						}
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
							keepAlive: true
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
							keepAlive: true
						}
					}
				]
			}
		]
	}
];
