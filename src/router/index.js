import Vue from "vue";
import Router from "vue-router";
import routes from "./routes";
import store from "@/store";
// import MenuView from "@/views/MenuView/MenuView";
import userMenuList from "./userMenu";

Vue.use(Router);
/**
 * 路由守卫验证token
 * 客户端 imClient 不拦截
 */

const router = new Router({
	// mode: 'history',
	routes
});

const flattening = function(routeList) {
	routeList.forEach(item => {
		if (item.list) {
			routeList = routeList.concat(...item.list);
			flattening(item.list);
		}
	});
	return routeList;
};

const filterMenu = function(menus, menuList) {
	menus.forEach(menu => {
		menuList.forEach(list => {
			if (menu.name === list.name) {
				menu.invisible = true;
			}
			if (menu.children) {
				filterMenu(menu.children, menuList);
			}
		});
	});
};

let whiteList = ["/login"]; // 白名单：不需要鉴权

router.beforeEach(async (to, from, next) => {
	if (whiteList.includes(to.path)) {
		next();
	} else {
		let token = "";
		if (localStorage.getItem("userInfo")) {
			token = JSON.parse(localStorage.getItem("userInfo")).loginToken;
		}
		if (!token) {
			next("/login");
		} else if (!store.state.menus.menuList.length) {
			if (router.options.routes.length <= 2) {
				// 2为默认路由的个数
				let path = to.path;
				await store.dispatch("menus/getMenuList");
				let menuList = flattening(store.state.menus.menuList); // 后台的路由扁平化方便比对
				// 前台设置的路由和后台设置的路由进行比对，后台存在的路由即为用户可以看见的路由，将其invisible变为true
				filterMenu(userMenuList, menuList);
				// store.commit("menus/setMenuList", userMenuList);
				router.addRoutes(userMenuList);
				router.options.routes.push(...userMenuList);
				next(path);
			}
		} else {
			next();
		}
	}
});

export default router;
