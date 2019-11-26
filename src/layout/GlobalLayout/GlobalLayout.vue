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
					>
						<slot name="header"></slot>
					</GlobalLayoutMainHeader>
				</el-header>
				<el-main
					class="global-layout-main-inner"
					ref="main"
				>
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

export default {
	name: "globalLayout",
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
			// screenWidth: document.body.clientWidth
		};
	},
	beforeCreate() {
		let routes = this.$router.options.routes.find(item => item.path === "/")
			.children;
		console.log(this.$router);
		/**
		 * 筛选路由，使invisible为false的路由被筛掉，不渲染
		 */
		menuList = fildRoutes(routes);
		menuList.forEach((menu, id) => {
			if (menu.meta) {
				menu.meta._menuIndex = String(id);
			} else {
				menu.meta = {};
				menu.meta._menuIndex = String(id);
			}
			if (menu.children.length) {
				menu.children.forEach((child, i) => {
					child.meta._menuIndex = `${id}-${i}`;
				});
			}
		});
	},
	created() {
		if (
			JSON.parse(sessionStorage.getItem("tabViews"))
			&& JSON.parse(sessionStorage.getItem("tabViews")).length > 0
		) {
			this.editableTabs = JSON.parse(sessionStorage.getItem("tabViews"));
		} else {
			if (this.$route.path !== "/" && this.$route.path !== "/homepage") {
				this.$router.replace("/");
			}
			this.editableTabs.push({
				path: "/homepage",
				name: "首页"
			});
		}
		this.activeTabName = this.$route.name;
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
				// 选择上面的菜单的时候,左边的菜单被选中
				this.activeTabName = tabName;
				let activeMenuIndex = newRoute.meta._menuIndex;
				this.$refs.globalLayoutAside.open(activeMenuIndex);
				// meta里面存高度
				setTimeout(() => {
					let main = this.$refs.main.$el;
					main.scrollTop = this.$route.meta.scrollTop || 0;
				}, 20);
			}
		},
		editableTabs: function(val) {
			let len = val.length;
			if (!len) {
				this.editableTabs.push({
					path: "/homepage",
					name: "首页"
				});
				if (this.$route.path !== "/homepage") {
					this.$router.push("/");
				}
			}
			sessionStorage.setItem("tabViews", JSON.stringify(val));
		}
	},
	methods: {
		handleScroll(e) {
			this.$route.meta.scrollTop = e.target.scrollTop || 0;
			let div = document.getElementsByClassName("block-scroll-top")[0];
			if (div) {
				let height = div.offsetHeight + 5;
				let classList = div.classList;
				if (e.target.scrollTop >= height) {
					if (classList.contains("scroll-top")) {
						return;
					} else {
						div.classList.add("scroll-top");
					}
				} else if (classList.contains("scroll-top")) {
					div.classList.remove("scroll-top");
				} else {
					return;
				}
			}
		},
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
			&.el-main {
				padding: 0;
			}
			.global-layout-main-inner {
				height: calc(100% - 100px);
				padding: $padding-base;
			}
		}
	}
}
</style>
