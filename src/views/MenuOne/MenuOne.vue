<template>
	<div class="memberAccountSearch">
		<!-- 栅格 -->
		<el-row class="layout">
			<!-- 输入框 -->
			<el-col :span="12">
				<el-form
					:inline="true"
					ref="memberAccountSearchForm"
				>
					<el-form-item label="会员号:">
						<el-input
							placeholder="会员号"
							v-model="searchData.cusId"
						></el-input>
					</el-form-item>
				</el-form>
			</el-col>
			<el-col
				:span="6"
				class="pull-right"
			>
				<!-- 按钮 -->
				<el-button
					type="primary"
					icon="el-icon-search"
					@click="getData()"
				>查询</el-button>
				<el-button
					icon="el-icon-refresh"
					@click="refreshForm('memberAccountSearchForm')"
				>重置</el-button>
			</el-col>
		</el-row>
		<!-- 内容 -->
		<div class="content layout">
			<el-button
				type="primary"
				class="marginButton"
				@click="exportData"
			>导出</el-button>
			<!-- 表格 -->
			<el-table
				ref="memberAccountSearchTable"
				border
				:data="tableData"
				tooltip-effect="dark"
				@selection-change="handleSelectionChange"
				header-align="center"
			>
				<el-table-column
					type="index"
					label="序号"
					width="50"
					:resizable="false"
					align="center"
				>
					<template slot-scope="scope">
						<span>{{(searchData.page - 1) * searchData.pageSize + scope.$index + 1}}</span>
					</template>
				</el-table-column>
				<el-table-column
					prop="cusId"
					label="会员号"
					:resizable="false"
					align="center"
				></el-table-column>
				<el-table-column
					prop="cusId"
					label="币种"
					:resizable="false"
					align="center"
				></el-table-column>
				<el-table-column
					prop="useAbleBalance"
					label="收款可用余额(元)"
					:resizable="false"
					align="right"
				></el-table-column>
				<el-table-column
					prop="payAbleBal"
					label="账号付款余额(元)"
					:resizable="false"
					align="right"
				></el-table-column>
				<el-table-column
					prop="recOnthewayBal"
					label="收款在途金额(元)"
					:resizable="false"
					align="right"
				></el-table-column>
				<el-table-column
					prop="rechargeOnthewayBal"
					label="充值在途金额(元)"
					:resizable="false"
					align="right"
				></el-table-column>
				<el-table-column
					prop="frozenBal"
					label="冻结金额(元)"
					:resizable="false"
					align="right"
				></el-table-column>
			</el-table>
			<!-- 分页 -->
			<div class="block">
				<el-pagination
					v-show="showPage"
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="searchData.page"
					:page-sizes="pageSizes"
					:page-size="searchData.pageSize"
					layout="total, sizes, prev, pager, next, jumper"
					:total="total"
				></el-pagination>
			</div>
		</div>
		<div class="layout">
			<div style="width: 600px;">
				<si-grid :tempData="tempData">
					<si-grid-row>
						<si-grid-col
							prop="id"
							label="账号"
						></si-grid-col>
						<si-grid-col
							prop="name"
							label="姓名"
						></si-grid-col>
					</si-grid-row>
					<si-grid-row>
						<si-grid-col
							prop="date"
							label="生日"
						></si-grid-col>
						<si-grid-col
							prop="old"
							label="年龄"
						></si-grid-col>
					</si-grid-row>
					<si-grid-row>
						<si-grid-col
							prop="address"
							label="地址"
						></si-grid-col>
					</si-grid-row>
					<si-grid-row>
						<si-grid-col
							prop="email"
							label="邮箱"
						></si-grid-col>
						<si-grid-col
							prop="id"
							label="账号"
						></si-grid-col>
					</si-grid-row>
				</si-grid>
			</div>
		</div>
		<div class="layout">
			<h1 style="lineHeight: 30px;">AppGrid组件的api</h1>
			<el-table
				:data="gridapi"
				style="width: 100%"
			>
				<el-table-column
					prop="api"
					label="属性"
					width="180"
				></el-table-column>
				<el-table-column
					prop="introduce"
					label="用法"
					width="180"
				></el-table-column>
				<el-table-column
					prop="type"
					width="180"
					label="参数类型"
				></el-table-column>
				<el-table-column
					prop="optionnal"
					label="用法"
					width="180"
				>
					<template slot-scope="scope">
						<span
							style="margin-left: 10px"
						>{{ scope.row.optionnal&& scope.row.optionnal }}</span>
					</template>
				</el-table-column>
				<el-table-column
					prop="default"
					width="180"
					label="默认值"
				></el-table-column>
			</el-table>
		</div>
		<div class="layout">
			<h1 style="lineHeight: 30px;">subItem组件的api</h1>
			<el-table
				:data="subItemApi"
				style="width: 100%"
			>
				<el-table-column
					prop="api"
					label="属性"
					width="180"
				></el-table-column>
				<el-table-column
					prop="introduce"
					label="用法"
					width="180"
				></el-table-column>
				<el-table-column
					prop="type"
					width="180"
					label="参数类型"
				></el-table-column>
				<el-table-column
					prop="optionnal"
					label="用法"
					width="180"
				>
					<template slot-scope="scope">
						<span
							style="margin-left: 10px"
						>{{ scope.row.optionnal && scope.row.optionnal }}</span>
					</template>
				</el-table-column>
				<el-table-column
					prop="default"
					width="180"
					label="默认值"
				></el-table-column>
			</el-table>
		</div>
	</div>
</template>
<script>
import {
	getMemberAccountSearchData,
	isLogin,
	memberAccountSearchExportData
} from "@/axios/api";
export default {
	name: "operatororder",
	data() {
		return {
			tableData: [
				{
					cusId: "036292369306849927671895909073",
					cusName: "",
					currType: "CNY",
					useAbleBalance: "0",
					payAbleBal: "0",
					recOnthewayBal: "0",
					rechargeOnthewayBal: "0",
					frozenBal: "0"
				}
			],
			// 搜索框
			searchData: {
				cusId: "",
				page: 1,
				pageSize: 10
			},
			pageSizes: [],
			showPage: true,
			total: 0,
			tempData: {
				id: "1",
				date: "2016-05-02",
				name: "王小虎1",
				address: "上海市普陀区金沙江路 100 弄",
				old: "26",
				phone: "111111111222",
				email: "789546463@qq.com"
			},
			gridapi: [
				{
					api: "tempData",
					introduce: "绑定的数据",
					type: ["Object"],
					default: "{}"
				},
				{
					api: "labelWidth",
					introduce: "label的宽度",
					type: ["String"],
					default: "auto"
				},
				{
					api: "labelBackground",
					introduce: "label的背景颜色",
					type: ["String"],
					default: "#eee"
				},
				{
					api: "labelPosition",
					introduce: "label文字的位置",
					type: ["String"],
					optionnal: ["left", "center", "right"],
					default: "right"
				},
				{
					api: "labelColor",
					introduce: "label文字的颜色",
					type: ["String"],
					default: ""
				},
				{
					api: "contentBackground",
					introduce: "内容背景色",
					type: ["String"],
					default: "#fff"
				},
				{
					api: "contentPosition",
					introduce: "内容文字的位置",
					type: ["String"],
					optionnal: ["left", "center", "right"],
					default: "left"
				},
				{
					api: "contentColor",
					introduce: "内容文字的颜色",
					type: ["String"],
					default: ""
				}
			],
			subItemApi: [
				{
					api: "label",
					introduce: "对应的字段id",
					type: ["String"],
					default: ""
				},
				{
					api: "title",
					introduce: "label的标题",
					type: ["String"],
					default: ""
				}
			]
		};
	},
	created() {
		const query = this.$route.query;
		this.searchData.page = Number(query.page) || 1;
		this.searchData.pageSize = Number(query.pageSize) || 10;
		this.searchData.cusId = query.cusId || "";
		// this.getData();
	},
	methods: {
		// 获取选中行的数据
		handleSelectionChange(val) {
			console.log(val);
		},
		// 改变页容量
		handleSizeChange(val) {
			this.searchData.pageSize = val;
			let query = JSON.parse(JSON.stringify(this.$route.query));
			query.pageSize = val;
			this.$router.replace({ query: query });
			this.getData();
		},
		// 改变当前页
		handleCurrentChange(val) {
			this.searchData.page = val;
			let query = JSON.parse(JSON.stringify(this.$route.query));
			query.page = val;
			this.$router.replace({ query: query });
			this.getData();
		},
		// 获取数据
		async getData(flag) {
			let query = JSON.parse(JSON.stringify(this.$route.query));
			if (flag || this.searchData.cusId != "") {
				this.searchData.page = 1;
				query.page = 1;
			}
			query.cusId = this.searchData.cusId.trim();
			this.$router.replace({ query: query });
			this.searchData.cusId = this.searchData.cusId.trim();
			const res = await getMemberAccountSearchData(this.searchData);
			if (res.retCode == "000000") {
				res.rows.forEach(item => {
					item.frozenBal = (item.frozenBal / 100).toFixed(2);
					item.payAbleBal = (item.payAbleBal / 100).toFixed(2);
					item.rechargeOnthewayBal = (
						item.rechargeOnthewayBal / 100
					).toFixed(2);
					item.recOnthewayBal = (item.recOnthewayBal / 100).toFixed(
						2
					);
					item.useAbleBalance = (item.useAbleBalance / 100).toFixed(
						2
					);
				});
				this.tableData = res.rows;
				this.total = parseInt(res.total);
				if (this.total <= 10) {
					this.showPage = false;
				} else {
					this.showPage = true;
					if (this.total > 20) {
						this.pageSizes = [10, 20, 50];
					} else {
						this.pageSizes = [10, 20];
					}
				}
			}
		},
		// 重置表单
		refreshForm(formName) {
			this.$refs[formName].resetFields();
			this.searchData.cusId = "";
		},
		// 导出
		async exportData() {
			const loginRes = await isLogin();
			if (loginRes.retCode === "000000") {
				memberAccountSearchExportData(this.searchData).then(res => {
					let blob = new Blob([res], {
						type: "application/vnd.ms-excel;charset=utf-8"
					});
					let link = document.createElement("a");
					link.download = "会员账户";
					link.href = window.URL.createObjectURL(blob);
					link.click();
				});
			}
		}
	}
};
</script>
<style lang="stylus" scoped></style>