import Vue from "vue";
import Vuex from "vuex";
import axios from "@/axios";

Vue.use(Vuex);

export default {
	namespaced: true,
	state: {
		menuList: []
	},
	mutations: {
		setMenuList(state, data) {
			state.menuList = data;
		}
	},
	actions: {
		async getMenuList({ commit }) {
			const res = await axios.get("/getMenuList");
			if (res.retCode === "000000") {
				commit("setMenuList", res.rows);
			}
		}
	}
};
