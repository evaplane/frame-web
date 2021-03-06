<template>
	<div class="global-layout">
		<el-container>
			<!-- 左侧导航菜单 -->
			<GlobalLayoutAside
				ref="globalLayoutAside"
				:isCollapse="isCollapse"
				:projectTitle="projectTitle"
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
	return routeList;
};
const setMenuIndix = function(menus, pmid) {
	menus.forEach((menu, id) => {
		if (null == pmid || undefined == pmid) {
			if (menu.meta) {
				menu.meta._menuIndex = String(id);
			} else {
				menu.meta = {};
				menu.meta._menuIndex = String(id);
			}
		} else {
			menu.meta._menuIndex = `${pmid}-${id}`;
		}
		if (menu.children) {
			setMenuIndix(menu.children, menu.meta._menuIndex);
		}
	});
	return menus;
};
export default {
	name: "globalLayout",
	components: {
		GlobalLayoutAside,
		GlobalLayoutMainHeader
	},
	props: {
		projectTitle: {
			type: String,
			default: ""
		},
		homePage: {
			type: Object,
			default() {
				return {
					path: "/",
					redirect: "/home",
					name: "首页",
					meta: {
						requireAuth: true,
						keepAlive: true,
						name: "homePage"
					}
				};
			}
		}
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
		let menus = fildRoutes(routes);
		menuList = setMenuIndix(menus);
	},
	created() {
		if (
			JSON.parse(sessionStorage.getItem("tabViews"))
			&& JSON.parse(sessionStorage.getItem("tabViews")).length > 0
		) {
			this.editableTabs = JSON.parse(sessionStorage.getItem("tabViews"));
		} else {
			if (
				this.$route.path !== this.homePage.path
				&& this.$route.path !== this.homePage.redirect
			) {
				this.$router.replace(
					this.homePage.path || this.homePage.redirect
				);
			}
			this.editableTabs.push(this.homePage);
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
				this.editableTabs.push(this.homePage);
				if (
					this.$route.path !== this.homePage.path
					&& this.$route.path !== this.homePage.redirect
				) {
					this.$router.push(
						this.homePage.path || this.homePage.redirect
					);
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
						let fragment = document.createElement("div");
						fragment.style.height = `${height}px`;
						fragment.style.width = "100%";
						fragment.setAttribute("class", "fragment-dom__temp");
						div.parentElement.insertBefore(fragment, div);
						div.classList.add("scroll-top");
					}
				} else if (classList.contains("scroll-top")) {
					let delDom = document.getElementsByClassName(
						"fragment-dom__temp"
					)[0];
					delDom && delDom.remove();
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
			let indexList = index.split("-");
			let menu;
			indexList.forEach(temp => {
				if (menu) {
					menu = menu.children[parseInt(temp)];
				} else {
					menu = this.menuList[parseInt(temp)];
				}
			});
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
			let path, curtab;
			tabs.forEach((tab, index) => {
				if (tab.name === name) {
					curtab = tab;
				}
				if (activeName === name && tab.name === activeName) {
					let nexTab = tabs[index + 1] || tabs[index - 1];
					if (nexTab) {
						activeName = nexTab.name;
						path = nexTab.path;
					}
				}
			});

			this.activeTabName = activeName;
			this.editableTabs = tabs.filter(tab => tab.name !== name);
			if (this.editableTabs.length && path) {
				this.$router.replace(path);
			}
			this.$emit("tabRemove", name);
			this.$nextTick(() => {
				console.log(curtab);
				this.$emit("getRemovedComponent", curtab.meta.name);
			});
		},
		closeTabs(type) {
			let tabs = this.editableTabs;
			let excludes;
			if (type) {
				this.editableTabs = tabs.filter(
					tab => tab.name === this.activeTabName
				);
				excludes = tabs
					.filter(tab => tab.name !== this.activeTabName)
					.map(item => item.meta && item.meta.name);
			} else if (this.editableTabs.length > 0) {
				excludes = [...this.editableTabs].map(
					item => item.meta && item.meta.name
				);
				this.editableTabs = [];
			}
			if (excludes && excludes.length) {
				this.$emit("getRemovedComponent", excludes.join(","));
			}
			this.$emit("closeTabs", type, this.activeTabName);
		}
	},
	mounted() {
		this.$refs.main.$el.addEventListener("scroll", this.handleScroll);
	},
	beforeDestroy() {
		this.$refs.main.$el.addEventListener("scroll", this.handleScroll);
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
			position: relative;
			padding: 0;
			background: $color-background-main;
			.el-main {
				padding: 0px;
			}
			.global-layout-main-inner {
				height: calc(100% - 70px);
			}
		}
	}
}
</style>
