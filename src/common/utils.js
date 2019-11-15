const Utils = {
	getIndividuation(tableName) {
		let individuation = localStorage.getItem("individuation");
		if (individuation) {
			individuation = JSON.parse(individuation);
			if (individuation[tableName]) {
				return individuation[tableName];
			}
		}
	},
	columnDrop(Vue, tableName) {
		const wrapperTr = document.querySelector(
			".el-table__header-wrapper tr"
		);
		Vue.sortable = Vue.$sortable.create(wrapperTr, {
			animation: 180,
			delay: 0,
			onEnd: evt => {
				const oldItem = Vue.dropCol[evt.oldIndex];
				Vue.dropCol.splice(evt.oldIndex, 1);
				Vue.dropCol.splice(evt.newIndex, 0, oldItem);
				let individuation = localStorage.getItem("individuation");
				if (individuation) {
					individuation = JSON.parse(individuation);
				} else {
					individuation = {};
				}
				individuation[tableName] = Vue.dropCol;
				localStorage.setItem(
					"individuation",
					JSON.stringify(individuation)
				);
			}
		});
	},
	sys_formatDate(date, format) {
		if (!date) {return;}
		if (!format) {format = "yyyy-MM-dd";}
		switch (typeof date) {
		case "string":
			date = new Date(date);
			break;
		case "number":
			date = new Date(date);
			break;
		}
		if (!(date instanceof Date)) {return;}
		let dict = {
			yyyy: date.getFullYear(),
			M: date.getMonth() + 1,
			d: date.getDate(),
			H: date.getHours(),
			m: date.getMinutes(),
			s: date.getSeconds(),
			MM: ("" + (date.getMonth() + 101)).substr(1),
			dd: ("" + (date.getDate() + 100)).substr(1),
			HH: ("" + (date.getHours() + 100)).substr(1),
			mm: ("" + (date.getMinutes() + 100)).substr(1),
			ss: ("" + (date.getSeconds() + 100)).substr(1)
		};
		return format.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function() {
			return dict[arguments[0]];
		});
	},
	sys_getStatus(id, json) {
		if (id == "" || id == 0) {
			return "-";
		}
		if (json != null && json.length > 0) {
			for (let i = 0, l = json.length; i < l; i++) {
				for (let key in json[i]) {
					if (key == "id" && json[i][key] == id) {
						return json[i]['text'];
					}
				}
			}
		}
	},
	//获取时间字符串
	getDateStr(d_value) {
		if (d_value == "" || d_value == null || d_value == undefined) {
			return '';
		}
		let oDate = new Date(d_value),
			oYear = oDate.getFullYear(),
			oMonth = oDate.getMonth() + 1,
			oDay = oDate.getDate(),
			oHour = oDate.getHours(),
			oMin = oDate.getMinutes(),
			oSen = oDate.getSeconds(),
			oTime = oYear + '-' + Utils.getzf(oMonth) + '-' + Utils.getzf(oDay) + ' ' + Utils.getzf(oHour) + ':' + Utils.getzf(oMin) + ':' + Utils.getzf(oSen); //最后拼接时间
		return oTime;
	},
	// 补0
	getzf(num){
		if(parseInt(num) < 10){
			num = "0" + num;
		}
		return num;
	}
};

export default Utils;
