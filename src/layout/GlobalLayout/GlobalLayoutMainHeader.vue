<template>
	<div class="global-layout-main-header-layout">
		<el-row
			:gutter="10"
			type="flex"
			justify="space-around"
			class="header-row"
		>
			<el-col
				:xs="2"
				:sm="2"
				:md="2"
				:lg="2"
				:xl="2"
				class="header-col"
			>
				<div @click="$emit('update:isCollapse', !isCollapse)">
					<i
						class="menu-collapse"
						:class="[isCollapse ? 'el-icon-s-unfold':'el-icon-s-fold']"
					></i>
				</div>
			</el-col>
			<el-col
				:xs="1"
				:sm="1"
				:md="12"
				:lg="18"
				:xl="20"
			>
				<!-- <el-breadcrumb
          separator-class="el-icon-arrow-right"
          class="header-col"
        >
          <el-breadcrumb-item
            v-for="(crumb, i) in breadcrumb"
            :key="i"
          >{{crumb.name}}</el-breadcrumb-item>
				</el-breadcrumb>-->
			</el-col>
			<el-col
				:xs="10"
				:sm="4"
				:md="3"
				:lg="2"
				:xl="1"
				class="header-col"
			>
				<div class="header-col header-col-text">
					<global-layout-aside-avatar></global-layout-aside-avatar>
				</div>
			</el-col>
			<!-- <el-col
        :xs="24"
        :sm="24"
        :md="3"
        :lg="2"
        :xl="1"
        class="header-col"
			>-->
			<div
				class="header-col header-col-text header-col-inline"
				@click="logOutClick"
			>
				<i class="el-icon-switch-button">退出</i>
			</div>
			<!-- </el-col> -->
		</el-row>
		<el-row class="tab-bar">
			<!-- tab栏 -->
			<el-col
				:xs="24"
				:sm="24"
				:md="20"
				:lg="21"
				:xl="22"
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
				:xs="24"
				:sm="24"
				:md="4"
				:lg="3"
				:xl="2"
				class="header-col-text"
			>
				<el-dropdown
					split-button
					@command="handleCommand"
				>
					关闭操作
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item :command="0">关闭全部选项卡</el-dropdown-item>
						<el-dropdown-item :command="1">关闭其他选项卡</el-dropdown-item>
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
		logOutClick() {
			this.$confirm("真的要退出吗?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning"
			}).then(async () => {
				await this.$axios.post("/userlogout");
				localStorage.removeItem("userInfo");
				this.$router.push("/login");
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
		padding: 0;
		margin-bottom: $margin-small;
		.header-col {
			line-height: $fontSize;
			&:hover {
				cursor: pointer;
				color: $color-primary;
			}
		}
		.menu-collapse {
			color: $color-primary;
			font-size: $fontSize;
			cursor: pointer;
		}
	}
}
</style>

<style lang="scss">
.tab-bar {
	.el-tabs {
		.el-tabs__nav {
			background: #ffffff;
		}
	}
}
</style>