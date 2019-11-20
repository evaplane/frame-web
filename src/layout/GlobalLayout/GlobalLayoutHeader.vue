<template>
	<div class="header-row-conf">
		<!-- <div class="user-avatar-img">
      <img
        src="@/assets/images/pikaqiu.jpg"
        alt
      />
		</div>-->
		<!-- <div
      class="user-avatar-bar"
      @click="showBtn = !showBtn"
    >
      admin
      <i class="ri-arrow-down-s-fill"></i>
		</div>-->
		<!-- <el-dropdown
			trigger="click"
			@command="dialogVisible = true"
		>
			<span class="el-dropdown-link">
				Admin
				<i class="el-icon-arrow-down el-icon--right"></i>
			</span>
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item></el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>-->
		<div
			class="header-col header-col-text header-col-inline"
			@click="userInfoVisible = true;"
		>
			<i class="ri-user-line"></i>
			<span class="headerText">{{userInfoData.userName}}</span>
		</div>
		<div
			class="header-col header-col-text header-col-inline"
			@click="handleEditPassword"
		>
			<i class="ri-lock-line"></i>
			<span class="headerText">修改密码</span>
		</div>
		<div
			class="header-col header-col-text header-col-inline"
			@click="logOutClick"
		>
			<i class="el-icon-switch-button"></i>
			<span class="headerText">退出</span>
		</div>
		<!-- <div class="user-avatar-btn">
      <transition name="fade">
        <div
          v-if="showBtn"
          class="reset-password"
          @click="dialogVisible = true"
        >修改密码</div>
      </transition>
		</div>-->
		<el-dialog
			title="修改密码"
			:visible.sync="dialogVisible"
			width="50%"
			:before-close="handleClose"
			@keydown.enter.native="submit('passForm')"
		>
			<el-form
				ref="passForm"
				:model="passForm"
				status-icon
				:rules="rules"
				class="demo-passForm"
				:hide-required-asterisk="false"
				label-width="100px"
			>
				<el-form-item
					prop="oldPassword"
					label="原密码"
				>
					<el-input
						v-model.trim="passForm.oldPassword"
						type="password"
						placeholder="请输入原密码"
						autocomplete="off"
					></el-input>
				</el-form-item>
				<el-form-item
					prop="newPassword"
					label="新密码"
				>
					<el-input
						v-model.trim="passForm.newPassword"
						type="password"
						placeholder="请输入新密码"
						autocomplete="off"
					></el-input>
				</el-form-item>
				<el-form-item
					label="确认密码"
					prop="checkPass"
				>
					<el-input
						v-model.trim="passForm.checkPass"
						type="password"
						placeholder="请重复输入新密码"
						autocomplete="off"
					></el-input>
				</el-form-item>
			</el-form>
			<span
				slot="footer"
				class="dialog-footer"
			>
				<el-button @click="cancle('passForm')">取 消</el-button>
				<el-button
					type="primary"
					@click="submit('passForm')"
				>确 定</el-button>
			</span>
		</el-dialog>
		<!-- 用户信息 -->
		<el-dialog
			title="用户信息"
			:visible.sync="userInfoVisible"
			width="50%"
		>
			<el-row class="borderRow">
				<el-col :span="4">
					<div class="grid-content dialogRight">用户名:</div>
				</el-col>
				<el-col :span="8">
					<div class="grid-content dialogLeft">{{userInfoData.userName}}</div>
				</el-col>
				<el-col :span="4">
					<div class="grid-content dialogRight">登录账号:</div>
				</el-col>
				<el-col :span="8">
					<div class="grid-content dialogLeft">{{userInfoData.userCode}}</div>
				</el-col>
			</el-row>
			<el-row class="borderRow">
				<el-col :span="4">
					<div class="grid-content dialogRight">用户角色:</div>
				</el-col>
				<el-col :span="8">
					<div class="grid-content dialogLeft">{{userInfoData.userRole}}</div>
				</el-col>
				<el-col :span="4">
					<div class="grid-content dialogRight">用户状态:</div>
				</el-col>
				<el-col :span="8">
					<div class="grid-content dialogLeft">{{userInfoData.status}}</div>
				</el-col>
			</el-row>
			<el-row class="borderRow borderRowBottom">
				<el-col :span="4">
					<div class="grid-content dialogRight">更新时间:</div>
				</el-col>
				<el-col :span="8">
					<div class="grid-content dialogLeft">{{userInfoData.updateTime}}</div>
				</el-col>
				<el-col :span="4">
					<div class="grid-content dialogRight">创建时间:</div>
				</el-col>
				<el-col :span="8">
					<div class="grid-content dialogLeft">{{userInfoData.createTime}}</div>
				</el-col>
			</el-row>
			<span
				slot="footer"
				class="dialog-footer"
			>
				<el-button @click="userInfoVisible=false">关 闭</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import { resetPass } from "@/axios/api";

export default {
	data() {
		let _this = this;
		const passwordCheck = (rule, value, callback) => {
			if (value === _this.passForm.oldPassword) {
				callback(new Error("新密码与旧密码重复"));
			} else {
				callback();
			}
		};
		const passwordVal = (rule, value, callback) => {
			if (value !== _this.passForm.newPassword) {
				callback(new Error("两次输入不一致"));
			} else {
				callback();
			}
		};
		return {
			// showBtn: false,
			dialogVisible: false,
			userInfoVisible: false,
			passForm: {
				oldPassword: "",
				newPassword: "",
				checkPass: ""
			},
			userInfoData: {
				userCode: "",
				userName: ""
			},
			rules: {
				oldPassword: [
					{
						required: true,
						message: "原密码不能为空",
						trigger: "blur"
					}
				],
				newPassword: [
					{
						required: true,
						message: "新密码不能为空",
						trigger: "blur"
					},
					{
						trigger: ["change", "blur"],
						validator: this.$validator.validatorPassword
					},
					{
						trigger: ["change", "blur"],
						validator: passwordCheck
					}
				],
				checkPass: [
					{
						required: true,
						message: "请重复输入新密码",
						trigger: "blur"
					},
					{
						trigger: ["change", "blur"],
						validator: passwordVal
					}
				]
			}
		};
	},
	methods: {
		cancle(formName) {
			this.$refs[formName].resetFields();
			this.dialogVisible = false;
		},
		submit(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					resetPass(this.passForm).then(res => {
						if (res.retCode === "000000") {
							this.dialogVisible = false;
							localStorage.removeItem("userInfo");
							this.$router.push("/login");
						}
					});
				} else {
					return false;
				}
			});
		},
		handleClose(done) {
			this.$refs.passForm.resetFields();
			done();
		},
		handleEditPassword() {
			this.dialogVisible = true;
		},
		logOutClick() {
			this.$confirm("真的要退出吗?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning"
			}).then(async () => {
				await this.$axios.post("/userlogout");
				localStorage.removeItem("userInfo");
				localStorage.removeItem("tabViews");
				this.$router.push("/login");
			});
		},
		async handleUserInfo() {
			const res = await this.$axios.post("/getUserInfo");
			if (res.retCode === "000000") {
				res.rows.status = this.$utils.sys_getStatus(
					res.rows.status,
					this.$PARAMS.CORE_STATUS
				);
				res.rows.updateTime = this.$utils.getDateStr(
					res.rows.updateTime
				);
				res.rows.createTime = this.$utils.getDateStr(
					res.rows.createTime
				);
				this.userInfoData = Object.assign(this.userInfoData, res.rows);
			}
		}
	},
	created() {
		this.handleUserInfo();
	}
};
</script>

<style lang="scss" scoped>
// .el-dropdown-link:hover {
// 	cursor: pointer;
// 	color: #409eff;
// }
// .el-icon-arrow-down {
// 	font-size: 12px;
// }
// .user-avatar-layout {
//     margin: $margin-base;
//     margin-bottom: 0;
//     > .user-avatar-img {
//         img {
//             border-radius: 50%;
//             width: 60px;
//         }
//     }
//     > .user-avatar-bar {
//         // color: $color-font-light;
//         > .ri-arrow-down-s-fill {
//             cursor: pointer;
//             vertical-align: middle;
//         }
//     }
//     > .user-avatar-btn {
//         height: 0px;
//         cursor: pointer;
//         .reset-password {
//             width: 80%;
//             height: 100%;
//             background: $color-font-light;
//             text-align: center;
//             line-height: 30px;
//         }
//     }
// }
.header-row-conf {
	display: flex;
	flex-flow: row nowrap;
	justify-content: flex-end;
	align-items: center;
	color: #fff;
	.header-col {
		margin-left: $margin-base;
		line-height: 50px;
		&:hover {
			cursor: pointer;
			color: $color-primary;
		}
		.headerText {
			font-size: 14px;
			margin: 5px;
		}
	}
}
.borderRow {
	border: 1px solid #dcdfe6;
	border-bottom: 0;
	line-height: 30px;
	.dialogRight {
		text-align: right;
		border-right: 1px solid #dcdfe6;
		padding-right: 5px;
		background-color: #eee;
	}
	.dialogLeft {
		text-align: left;
		padding-left: 5px;
	}
	&.borderRowBottom {
		border-bottom: 1px solid #dcdfe6;
	}
}
</style>