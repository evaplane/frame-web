<template>
	<div class="user-avatar-layout">
		<div class="user-avatar-img">
			<img
				src="../../assets/images/pikaqiu.jpg"
				alt
			/>
		</div>
		<div class="user-avatar-bar">
			admin2
			<i
				class="ri-arrow-down-s-fill"
				@click="showBtn = !showBtn"
			></i>
		</div>
		<div class="user-avatar-btn">
			<transition name="fade">
				<div
					class="reset-password"
					v-if="showBtn"
					@click="dialogVisible = true"
				>修改密码</div>
			</transition>
		</div>
		<el-dialog
			title="提示"
			:visible.sync="dialogVisible"
			width="20%"
			:before-close="handleClose"
			@keydown.enter.native="submit('passForm')"
			center
		>
			<el-form
				:model="passForm"
				status-icon
				:rules="rules"
				ref="passForm"
				class="demo-passForm"
				:hide-required-asterisk="false"
			>
				<el-form-item
					prop="oldPassword"
					placeholder="请输入原密码"
				>
					<el-input
						type="password"
						placeholder="请输入原密码"
						v-model.trim="passForm.oldPassword"
						autocomplete="off"
					></el-input>
				</el-form-item>
				<el-form-item prop="newPassword">
					<el-input
						type="password"
						placeholder="请输入新密码"
						v-model.trim="passForm.newPassword"
						autocomplete="off"
					></el-input>
				</el-form-item>
				<el-form-item prop="checkPass">
					<el-input
						type="password"
						placeholder="请重复输入新密码"
						v-model.trim="passForm.checkPass"
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
			showBtn: false,
			dialogVisible: false,
			passForm: {
				oldPassword: "",
				newPassword: "",
				checkPass: ""
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
		}
	}
};
</script>

<style lang="scss" scoped>
.user-avatar-layout {
	margin: $margin-base;
	margin-bottom: 0;
	> .user-avatar-img {
		img {
			border-radius: 50%;
			width: 60px;
		}
	}
	> .user-avatar-bar {
		color: $color-font-light;
		> .ri-arrow-down-s-fill {
			cursor: pointer;
			vertical-align: middle;
		}
	}
	> .user-avatar-btn {
		height: 30px;
		cursor: pointer;
		.reset-password {
			width: 80%;
			height: 100%;
			background: $color-font-light;
			text-align: center;
			line-height: 30px;
		}
	}
}
</style>