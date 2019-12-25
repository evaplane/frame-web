<template>
	<transition>
		<keep-alive :exclude="removedComponents">
			<router-view v-if="$route.meta.keepAlive"></router-view>
		</keep-alive>
		<router-view v-if="!$route.meta.keepAlive"></router-view>
	</transition>
</template>
<script>
export default {
	name: "RouterLayout",
	computed: {
		removedComponents() {
			return this.$store.state.removedComponents;
		}
	}
};
</script>