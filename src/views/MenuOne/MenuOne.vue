<template>
	<div class="memberAccountSearch">
		<!-- 栅格 -->
		<el-row class="main-layout">
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
					class="pull-right"
					icon="el-icon-refresh"
					@click="refreshForm('memberAccountSearchForm')"
				>重置</el-button>
				<el-button
					type="primary"
					class="pull-right"
					icon="el-icon-search"
					@click="getData()"
				>查询</el-button>
			</el-col>
		</el-row>
		<!-- 内容 -->
		<div class="content main-layout">
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
	</div>
</template>
<script>
import {
	getMemberAccountSearchData,
	isLogin,
	memberAccountSearchExportData
} from "@/axios/api";
export default {
	name: "MemberAccountSearch",
	data() {
		return {
			tableData: [],
			// 搜索框
			searchData: {
				cusId: "",
				page: 1,
				pageSize: 10
			},
			pageSizes: [],
			showPage: true,
			total: 0
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