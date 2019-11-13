<template>
	<div class="global-layout">
		<el-container>
			<!-- 左侧导航菜单 -->
			<GlobalLayoutAside
				:isCollapse="isCollapse"
				:menuList="menuList"
				@menuSelect="menuSelect"
			></GlobalLayoutAside>
			<!-- 右侧主页 -->
			<el-main class="global-layout-main">
				<!-- 头部包含操作栏和tab栏 -->
				<el-header style="height: auto;">
					<GlobalLayoutMainHeader
						ref="globalLayoutMainHeader"
						:isCollapse.sync="isCollapse"
						:editableTabs="editableTabs"
						:activeTabName="activeTabName"
						@tabRemove="tabRemove"
						@tabClick="tabClick"
						@changeVal="changeVal"
						@closeTabs="closeTabs"
					></GlobalLayoutMainHeader>
				</el-header>
				<el-main>
					<slot></slot>
				</el-main>
			</el-main>
		</el-container>
	</div>
</template>

<script>
import GlobalLayoutAside from "./GlobalLayoutAside";
import GlobalLayoutMainHeader from "./GlobalLayoutMainHeader";

let menuList = [];

export default {
	components: {
		GlobalLayoutAside,
		GlobalLayoutMainHeader
	},
	data() {
		return {
			menuList: menuList,
			editableTabs: [],
			activeTabName: "",
			isCollapse: false // 侧边菜单栏开关
		};
	},
	beforeCreate() {
		let routes = this.$router.options.routes.find(item => item.path === "/")
			.children;
		/**
		 * 筛选路由，使invisible为false的路由被筛掉，不渲染
		 */
		const fildRoutes = function(routeList) {
			let len = routeList.length;
			for (let i = len - 1; i >= 0; i--) {
				let route = routeList[i];
				if (!route.invisible) {
					routeList.splice(i, 1);
				} else if (route.children) {
					fildRoutes(route.children);
				}
			}
		};
		fildRoutes(routes);
		menuList = routes;
	},
	created() {
		this.activeTabName = this.$route.name;
		this.editableTabs.push(this.$route);
	},
	watch: {
		$route(newRoute, oldRoute) {
			let _this = this;
			if (newRoute.path === oldRoute.path) {
				return;
			}
			let tabs = this.editableTabs,
				tabName;
			let flag = tabs.some(tab => {
				tabName = tab.name;
				return tab.path === newRoute.path;
			});
			if (!flag) {
				let filterRoutes = function(list) {
					list.forEach(tmp => {
						if (tmp.path === newRoute.path) {
							_this.editableTabs.push(tmp);
							return;
						} else if (tmp.children) {
							filterRoutes(tmp.children);
						}
					});
				};
				filterRoutes(menuList);
			} else {
				this.activeTabName = tabName;
			}
		},
		"editableTabs.length": function(val) {
			if (!val) {
				this.editableTabs.push({
					path: "/homepage",
					name: "首页"
				});
				if (this.$route.path !== "/homepage") {
					this.$router.push("/");
				}
			}
			// if (!val && this.$route.path !== "/homepage") {
			// 	this.$router.push("/");
			// 	this.editableTabs.push({
			// 		path: "/homepage",
			// 		name: "首页"
			// 	});
			// }
		}
	},
	methods: {
		tabClick(...list) {
			this.activeTabName = list[list.length - 1];
			this.$emit("tabClick", ...list);
		},
		menuSelect(index, indexPath) {
			let [rootIndex, subIndex] = index.split("-");
			let menu = this.menuList[parseInt(rootIndex)].children[
				parseInt(subIndex)
			];
			let path = this.$route.path;
			if (menu.path !== path) {
				this.$router.replace(menu.path);
			}
			this.activeTabName = menu.name;
			this.$emit("menuSelect", index, indexPath, menu);
		},
		changeVal(val) {
			this.activeTabName = val;
		},
		tabRemove(name) {
			let tabs = this.editableTabs;
			let activeName = this.activeTabName;
			let path;
			if (activeName === name) {
				tabs.forEach((tab, index) => {
					if (tab.name === name) {
						let nexTab = tabs[index + 1] || tabs[index - 1];
						if (nexTab) {
							activeName = nexTab.name;
							path = nexTab.path;
						}
					}
				});
			}
			this.activeTabName = activeName;
			this.editableTabs = tabs.filter(tab => tab.name !== name);
			if (this.editableTabs.length && path) {
				this.$router.replace(path);
			}
			this.$emit("tabRemove", name);
		},
		closeTabs(type) {
			let tabs = this.editableTabs;
			if (type) {
				this.editableTabs = tabs.filter(
					tab => tab.name === this.activeTabName
				);
			} else if (this.editableTabs.length > 0) {
				this.editableTabs = [];
			}
			this.$emit("closeTabs", type, this.activeTabName);
		},
		logOut() {
			this.$refs.globalLayoutMainHeader.logOutClick();
		}
	}
};
</script>

<style lang="scss" scoped>
.global-layout {
	height: 100%;
	.el-container {
		height: 100%;
		.el-header {
			padding: 0;
		}
		.global-layout-main {
			background: $color-background-main;
			.el-main {
				padding: 0;
			}
		}
	}
}
</style>