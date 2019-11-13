<template>
	<!-- 导航菜单 -->
	<el-menu
		default-active="2"
		:collapse="isCollapse"
		:unique-opened="true"
		background-color="#2f4050"
		text-color="#fff"
		active-text-color="#ffd04b"
		class="global-layout-aside-layout"
		@select="handleSelect"
	>
		<!-- 用户 -->
		<Avatar v-if="!isCollapse"></Avatar>
		<!-- 菜单 -->
		<el-submenu
			v-for="(item, index) in menuList"
			:key="index"
			:index="index+''"
		>
			<template slot="title">
				<i
					:class="item.icon"
					style="margin-right:10px;"
				></i>
				<span>{{item.name}}</span>
			</template>
			<el-menu-item
				v-for="(tmp, subIndex) in item.children"
				:key="subIndex"
				:index="index+'-'+subIndex"
			>
				<i :class="tmp.icon"></i>
				{{tmp.name}}
			</el-menu-item>
		</el-submenu>
	</el-menu>
</template>

<script>
import Avatar from "./GlobalLayoutAsideAvatar";

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
	components: {
		Avatar
	},
	data() {
		return {};
	},
	methods: {
		handleSelect(index, indexPath) {
			this.$emit("menuSelect", index, indexPath);
		}
	}
};
</script>
<style lang="scss" scoped>
.global-layout-aside-layout:not(.el-menu--collapse) {
	width: 220px;
	font-size: $font-size-primary;
}
</style>