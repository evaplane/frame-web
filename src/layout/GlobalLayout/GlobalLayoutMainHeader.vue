<template>
	<div class="global-layout-main-header-layout">
		<div class="header-row">
			<div>
				<i
					@click="$emit('update:isCollapse', !isCollapse)"
					class="menu-collapse"
					:class="[isCollapse ? 'el-icon-s-unfold':'el-icon-s-fold']"
				></i>
			</div>
			<!-- 页头右部需要加功能都加到这个div里 -->
			<global-layout-aside-avatar></global-layout-aside-avatar>
		</div>
		<el-row class="tab-bar">
			<!-- tab栏 -->
			<el-col
				:xs="23"
				:sm="23"
				:md="23"
			>
				<el-tabs
					v-model="tabIndex"
					type="card"
					@tab-click="handleClick"
					@tab-remove="handleRemove"
				>
					<el-tab-pane
						v-for="item in editableTabs"
						:key="item.name"
						:label="item.name"
						:name="item.name"
						:closable="editableTabs.length > 1 || item.name !== '首页'"
					></el-tab-pane>
				</el-tabs>
			</el-col>
			<el-col
				:xs="1"
				:sm="1"
				:md="1"
				class="header-col-text"
			>
				<el-dropdown
					@command="handleCommand"
					trigger="click"
				>
					<span class="el-dropdown-link">
						<i class="ri-close-line"></i>
					</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item :command="0">关闭全部</el-dropdown-item>
						<el-dropdown-item :command="1">关闭其他</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-col>
		</el-row>
	</div>
</template>
<script>
import GlobalLayoutAsideAvatar from "@/layout/GlobalLayout/GlobalLayoutAsideAvatar";
let breadcrumb = [];
export default {
	components: {
		GlobalLayoutAsideAvatar
	},
	props: {
		isCollapse: {
			type: Boolean,
			default: false
		},
		editableTabs: {
			type: Array
		},
		activeTabName: {
			type: String,
			default: ""
		}
	},
	data() {
		return {
			tabIndex: "1",
			breadcrumb: breadcrumb
		};
	},
	watch: {
		$route(newRoute) {
			this.breadcrumb = newRoute.matched;
		},
		activeTabName(val) {
			this.tabIndex = val;
		},
		editableTabs(val) {
			localStorage.setItem("tabViews", JSON.stringify(val));
		}
		// tabIndex(val) {
		// 	this.$emit("changeVal", val);
		// }
	},
	created() {
		this.tabIndex = this.$route.name;
	},
	beforeCreate() {
		breadcrumb = this.$route.matched;
	},
	methods: {
		handleClick(tab, event) {
			let tabData;
			this.editableTabs.forEach(editableTab => {
				if (editableTab.name === tab.name) {
					if (editableTab.path !== this.$route.path) {
						this.$router.replace(editableTab.path);
					}
					tabData = editableTab;
					this.$emit("tabClick", tab, tabData, event, this.tabIndex);
				}
			});
		},
		handleRemove(name) {
			this.$emit("tabRemove", name);
		},
		handleCommand(commond) {
			this.$emit("closeTabs", commond);
		}
	}
};
</script>
<style lang="scss" scoped>
.global-layout-main-header-layout {
	$fontSize: 30px;
	.header-col-text {
		text-align: $text-align-right;
	}
	.header-col-inline {
		display: inline;
		margin-right: 1px;
	}
	.header-row {
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		padding: 0 20px;
		background: $color-background-title;
		line-height: 50px;
		.menu-collapse {
			color: $color-primary;
			font-size: 20px;
			cursor: pointer;
			line-height: 53px;
		}
	}
	.ri-close-line {
		font-size: 20px;
		font-weight: 700;
		color: #333;
		line-height: 50px;
		margin-right: $margin-small;
	}
	.header-col-text {
		border-bottom: 1px solid #e4e7ed;
		height: 41px;
	}
}
.el-dropdown-menu.el-popper {
	padding: 0;
	margin: 0;
	position: absolute;
	top: 100px !important;
	.el-dropdown-menu__item {
		min-width: 70px;
	}
}
</style>

<style lang="scss">
.tab-bar {
	.el-tabs {
		.el-tabs__nav {
			background: #ffffff;
		}
		.el-tabs__header {
			margin: 0;
		}
	}
}
</style>