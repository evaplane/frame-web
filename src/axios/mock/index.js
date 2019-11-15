import Mock from "mockjs";
import userApi from "./userApi";

Mock.mock("/userlogin", "post", userApi.userLogin);
Mock.mock("/userlogout", "post", userApi.userLogOut);
Mock.mock("/getMenuList", "get", userApi.getMenuList);
Mock.mock("/resetPass", "post", userApi.resetPass);
Mock.mock("/getUserInfo", "post", userApi.userInfo);

export default Mock;
