import Vue from "vue";
import Vuex from "vuex";
import axios from "@/axios";
import permissons from "./modules/permissons";
import roles from "./modules/roles";
import menus from "./modules/menus";

Vue.use(Vuex);
// 存储业务状态
export default new Vuex.Store({
	state: { userInfo: null },
	mutations: {
		// 设置用户信息
		setUserInfo(state, userInfo) {
			state.userInfo = userInfo;
		}
	},
	actions: {
		// 登出
		async logOut({ commit }) {
			const res = await axios.post("/userlogout");
			if (res.retCode === "000000") {
				commit("setUserInfo", null);
				localStorage.removeItem("userInfo");
			}
		}
	},
	modules: {
		permissons, // 权限模块
		roles, // 角色模块
		menus // 菜单模块
	}
});
