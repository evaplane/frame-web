import axios from "./index";
// import qs from "querystring";

/**
 * 获取验证码
 * @param {string}} randomStr 时间戳
 */
export function getRandomCode(randomStr) {
	return axios({
		url: "/code",
		responseType: "blob",
		params: {
			randomStr
		}
	});
}

/**
 * 登录接口
 * @param {Object} data 用户登录表单数据，内部需要添加一个固定变量userType:10
 */
export function login(data) {
	data = { userType: 10, ...data };
	return axios.post("/userlogin", data);
}

export function getMenuList() {
	return axios.get("/getMenuList");
}

export function resetPass(data) {
	return axios.post("/resetPass", data);
}
