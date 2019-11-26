<template>
	<!-- 导航菜单 -->
	<div>
		<el-menu
			default-active="defaultActive"
			:collapse="isCollapse"
			:unique-opened="true"
			background-color="#2f4050"
			text-color="#fff"
			active-text-color="#ffd04b"
			class="global-layout-aside-layout"
			@select="handleSelect"
		>
			<h1
				id="projectTitle"
				v-if="!isCollapse"
			>{{ projectTitle }}</h1>
			<!-- 菜单 -->
			<el-submenu
				v-for="(item, index) in menuList"
				:key="index"
				:index="item.meta._menuIndex"
			>
				<template slot="title">
					<i
						:class="item.icon"
						style="margin-right:10px;"
					></i>
					<span>{{ item.name }}</span>
				</template>
				<el-menu-item
					v-for="(tmp, subIndex) in item.children"
					:key="subIndex"
					:index="tmp.meta._menuIndex"
				>
					<i :class="tmp.icon"></i>
					<span>{{ tmp.name }}</span>
				</el-menu-item>
			</el-submenu>
		</el-menu>
	</div>
</template>

<script>
export default {
	props: {
		isCollapse: {
			type: Boolean,
			default: false
		},
		menuList: {
			type: Array,
			required: true,
			default: function() {
				return [];
			}
		}
	},
	data() {
		return {
			projectTitle: "飞机系统",
			defaultActive: ""
		};
	},
	methods: {
		handleSelect(index, indexPath) {
			this.$emit("menuSelect", index, indexPath);
		},
		open(activeIndex) {
			if (activeIndex) {
				let index = activeIndex.split("-")[0];
				this.$refs.elMenu.open(index);
				this.$nextTick(() => {
					// 源码中的方法
					this.$refs.elMenu.updateActiveIndex(activeIndex);
				});
			}
		}
	}
};
</script>
<style lang="scss" scoped>
.global-layout-aside-layout {
	// 左侧菜单的行高
	border-right: 0;
	&:not(.el-menu--collapse) {
		width: 220px;
		font-size: 12px;
		.projectTitle {
			width: 100%;
			height: 80px;
			background-color: $color-background-title;
			color: $color-primary;
			line-height: 80px;
			text-align: center;
			font-size: $font-size-title;
		}
	}
}
</style>

<style lang="scss">
$submenu-height: 30px;
.el-menu {
	overflow: hidden;
	.el-submenu {
		& > .el-submenu__title {
			height: $submenu-height;
			line-height: $submenu-height;
		}
		& .el-menu-item {
			height: $submenu-height;
			line-height: $submenu-height;
		}
	}
}
</style>
