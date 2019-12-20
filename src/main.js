import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "./axios";
import store from "./store";
import ElementUI from "element-ui";
import "./assets/styles/element-variables.scss";
// import "element-ui/lib/theme-chalk/index.css";
import validator from "./common/validator";
import utils from "./common/utils";
import PARAMS from "./common/params";
import "remixicon/fonts/remixicon.css";
import "./assets/styles/index.scss";
import sortable from "sortablejs";
import AppElePicker from "./components/AppElePicker";
import "./common/direactives";

// 引入栅格布局
import SiriusGrid from "sirius-grid";
Vue.use(SiriusGrid);

import "./axios/mock"; // moke数据

Vue.use(ElementUI, { size: "small" });
Vue.use(AppElePicker); // 将饿了么UI时间组件独立出来，根据项目需求更改过后的时间组件

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype.$validator = validator; // elementUI表单要自己写验证方法，如果是共用的验证方法请写在validator.js文件中
Vue.prototype.$utils = utils; // 一些公共方法，以供全局调用
Vue.prototype.$sortable = sortable; // 第三方拖拽组件，体积小但是功能强大，可自行学习
Vue.prototype.$PARAMS = PARAMS; // 静态数据

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount("#app");
