<template>
	<div
		class="menu-view"
		v-loading="loading"
	>
		<global-layout
			:projectTitle="projectTitle"
			ref="globalLayout"
			@tabClick="tabClick"
			@menuSelect="menuSelect"
			@tabRemove="tabRemove"
			@closeTabs="closeTabs"
			@getRemovedComponent="getRemovedComponent"
		>
			<template slot="header">
				<!--支持组件-->
				<TheNavBar></TheNavBar>
				<!-- <div
					class="header-logout"
					@click="logOutClick"
				>
					<i class="el-icon-switch-button">退出</i>
				</div>-->
			</template>
			<keep-alive>
				<router-view v-if="$route.meta.keepAlive"></router-view>
			</keep-alive>
			<router-view v-if="!$route.meta.keepAlive"></router-view>
		</global-layout>
	</div>
</template>

<script>
/**
 * 该组件暴露的api有
 * event:tabClick/menuSelect/tabRemove/closeTabs
 * methods: logOut,调用登出方法
 */
import GlobalLayout from "@/layout/GlobalLayout/GlobalLayout.vue";
import TheNavBar from "./TheNavBar";

export default {
	components: {
		GlobalLayout,
		TheNavBar
	},
	data() {
		return {
			loading: true,
			projectTitle: "我的系统"
		};
	},
	methods: {
		/**
		 * tab: tab组件
		 * tabData: tabPane的数据(其实就是tabPane对应的router信息)
		 * event: 事件
		 */
		tabClick(tab, tabData, event) {
			console.log("tab点击事件回调", tab, tabData, event);
		},
		/**
		 * index: 菜单的唯一值（也是菜单在路由中对应的位置）
		 * indexPath: 旧菜单和新菜单的唯一值的数组
		 * menu: 菜单对应的router信息
		 */
		menuSelect(index, indexPath, menu) {
			console.log("菜单点击事件回调", index, indexPath, menu);
		},
		/**
		 * tabName: tab名称
		 */
		tabRemove(tabName) {
			console.log("tab关闭事件回调", tabName);
		},
		/**
		 * type: 0--全部关闭，1--关闭其他
		 * activeTabName: 当前激活的tab
		 */
		closeTabs(type, actvieTabName) {
			console.log("多个tab关闭事件回调", type, actvieTabName);
		},
		/**
		 * 当通过关闭按钮关闭tab时清除keep-alive缓存
		 * name 当前通过x按钮关闭的tabName,对应组件的name
		 */
		getRemovedComponent(data) {
			console.log("menuview", data);
			this.$store.commit("setRemovedComponents", data);
			this.$nextTick(() => {
				// this.$store.commit("setRemovedComponents", "");
			});
		}
	},
	created() {
		this.loading = !this.$store.state.menuList.length;
	}
};
</script>

<style lang="scss" scoped>
.menu-view {
	width: 100%;
	height: 100%;
	.header-logout {
		&:hover {
			cursor: pointer;
			color: $color-primary;
		}
	}
}
</style>