(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0608424f"],{"13a8":function(t,e,a){},"30d9":function(t,e,a){},4974:function(t,e,a){"use strict";var n=a("13a8"),i=a.n(n);i.a},aaf6:function(t,e,a){},ac7d:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("Card",[a("Row",{attrs:{type:"flex"}},[a("Col",{attrs:{lg:{span:8,offset:16}}},[a("Input",{attrs:{search:"","enter-button":"",placeholder:"输入钱包地址..."}})],1)],1),a("Tabs",{attrs:{value:"name1",type:"card",animated:!1}},[a("TabPane",{attrs:{label:"( UU端口 ) 矿池收益",name:"name1"}},[a("Tag",{attrs:{type:"dot",color:"primary"}},[t._v("总暴块数 : "+t._s(t.EtableDataBlockSum))]),a("Tag",{attrs:{type:"dot",color:"success"}},[t._v("总区块收益 : "+t._s(t.EtableDataQuKuaiSum))]),a("Tag",{attrs:{type:"dot",color:"error"}},[t._v("总支付的矿工费 : "+t._s(t.EtableDataMillerSum))]),a("Tag",{attrs:{type:"dot",color:"warning"}},[t._v("总矿池盈利 : "+t._s(t.EtableDataEarningsSum))]),a("Row",{staticStyle:{"margin-top":"1rem"},attrs:{type:"flex",justify:"center"}},[a("Col",{attrs:{span:"24"}},[a("Card",[a("tables",{ref:"tables",attrs:{loading:t.loading,size:"small",border:"",searchable:"","search-place":"top",columns:t.Ecolumns},model:{value:t.EtableDataSmall,callback:function(e){t.EtableDataSmall=e},expression:"EtableDataSmall"}}),a("div",{staticStyle:{margin:"10px",overflow:"hidden"}},[a("div",{staticStyle:{float:"right"}},[a("Page",{attrs:{total:t.EtableData.length,current:t.current1,"page-size-opts":[10,50,100],placement:"top","show-sizer":"","page-size":t.pageSize1},on:{"on-change":t.changePage1,"on-page-size-change":t.changeSize1}})],1)])],1)],1)],1)],1),a("TabPane",{attrs:{label:"钱包收益",name:"name3"}},[a("Row",{attrs:{type:"flex",justify:"center"}},[a("Col",{attrs:{span:"24"}},[a("Card",[a("tables",{ref:"tables",attrs:{loading:t.loading,size:"small",border:"",searchable:"","search-place":"top",columns:t.columns},model:{value:t.tableDataSmall,callback:function(e){t.tableDataSmall=e},expression:"tableDataSmall"}}),a("div",{staticStyle:{margin:"10px",overflow:"hidden"}},[a("div",{staticStyle:{float:"right"}},[a("Page",{attrs:{total:t.tableData.length,current:t.current,"page-size-opts":[10,50,100],placement:"top","show-sizer":"","page-size":t.pageSize},on:{"on-change":t.changePage,"on-page-size-change":t.changeSize}})],1)])],1)],1)],1)],1)],1)],1),a("Modal",{attrs:{title:t.title,width:"1000px"},on:{"on-ok":t.ok,"on-cancel":t.cancel},model:{value:t.modal,callback:function(e){t.modal=e},expression:"modal"}},[a("Row",{attrs:{type:"flex",justify:"center"}},[a("Col",{attrs:{span:"24"}},[a("Card",[a("tables",{ref:"tables",attrs:{loading:t.loading,size:"small",border:"",searchable:"","search-place":"top",columns:t.Pcolumns},model:{value:t.PtableDataSmall,callback:function(e){t.PtableDataSmall=e},expression:"PtableDataSmall"}}),a("div",{staticStyle:{margin:"10px",overflow:"hidden"}},[a("div",{staticStyle:{float:"right"}},[a("Page",{attrs:{total:t.PtableData.length,current:t.current2,"page-size-opts":[10,50,100],placement:"top","show-sizer":"","page-size":t.pageSize2},on:{"on-change":t.changePage2,"on-page-size-change":t.changeSize2}})],1)])],1)],1)],1)],1)],1)},i=[],l=(a("25d7"),a("3a0f"),a("a3a3"),a("4d0b"),a("fa69")),o=a("7e1e"),s={name:"uu_page",components:{Tables:l["a"]},data:function(){var t=this;return{loading:!0,columns:[{title:"序号",type:"index",key:"wallet",width:70,fixed:"left"},{title:"最后提交时间",key:"lastshare",width:200},{title:"钱包地址",key:"wallet",width:330},{title:"实时算力",key:"hr1",width:100},{title:"24小时平均算力",key:"hr2",width:150},{title:"在线矿工",key:"online",width:100},{title:"离线矿工",key:"offline",width:100},{title:"总收益",key:"paid",width:150},{title:"操作",key:"lastshare",width:100,render:function(e,a){return e("div",[e("Button",{props:{type:"success",size:"small"},on:{click:function(){t.show(a.row.payments,a.row.wallet)}}},"查看收益")])}}],Ecolumns:[{title:"序号",type:"index",key:"num",width:70,fixed:"left"},{title:"时间",key:"time",width:170},{title:"区块数",key:"num",width:80},{title:"区块收益",key:"reward",width:150},{title:"昨日支出",key:"amount_s",width:150},{title:"盈利值",key:"earnings",width:200,render:function(t,e){var a=e.row,n=a.earnings>0?"success":"error",i=a.earnings>0?"盈利":"亏损";return t("Tag",{props:{type:"dot",color:n}},a.earnings+" "+i)}}],Pcolumns:[{title:"序号",type:"index",key:"num",width:70,fixed:"left"},{title:"交易hash值",key:"txid",width:550},{title:"转账金额",key:"amount",width:150},{title:"转账时间",key:"time",width:200}],tableData:[],tableDataSmall:[],current:1,pageSize:10,EtableData:[],EtableDataSmall:[],current1:1,pageSize1:10,EtableDataBlockSum:0,EtableDataQuKuaiSum:0,EtableDataMillerSum:0,EtableDataEarningsSum:0,title:"",PtableData:[],PtableDataSmall:[],current2:1,pageSize2:10,modal:!1}},methods:{handleDelete:function(t){console.log(t)},changePage:function(t){this.current=t},changeSize:function(t){this.pageSize=t},changePage1:function(t){this.current1=t},changeSize1:function(t){this.pageSize1=t},changePage2:function(t){this.current2=t},changeSize2:function(t){this.pageSize2=t},checkDataMax:function(t,e,a,n){t.splice(0,t.length);for(var i=n*(a-1)+1;i<=(e.length>n*a?n*a:e.length);i++)t.push(e[i-1])},show:function(t,e){if(this.modal=!0,this.PtableData=t,this.title="钱包: "+e+" 收益明细",this.PtableData.length>0)for(var a=0;a<(this.PtableData.length>=this.pageSize?this.pageSize:this.PtableData.length);a++)this.PtableDataSmall.push(this.PtableData[a]);console.log(t)},ok:function(){this.$Message.info("确定"),this.PtableDataSmall=[],this.PtableData=[],this.current2=1,this.pageSize2=10},cancel:function(){this.$Message.info("取消"),this.PtableDataSmall=[],this.PtableData=[],this.current2=1,this.pageSize2=10}},watch:{current:function(){this.checkDataMax(this.tableDataSmall,this.tableData,this.current,this.pageSize)},pageSize:function(){this.checkDataMax(this.tableDataSmall,this.tableData,this.current,this.pageSize)},current1:function(){this.checkDataMax(this.EtableDataSmall,this.EtableData,this.current1,this.pageSize1)},pageSize1:function(){this.checkDataMax(this.EtableDataSmall,this.EtableData,this.current1,this.pageSize1)},current2:function(){this.checkDataMax(this.PtableDataSmall,this.PtableData,this.current2,this.pageSize2)},pageSize2:function(){this.checkDataMax(this.PtableDataSmall,this.PtableData,this.current2,this.pageSize2)}},mounted:function(){var t=this;Object(o["a"])().then(function(e){if(console.log(e),e.data.data.forEach(function(e){t.EtableData.push({id:e.id,num:e.num,reward:e.reward,amount_s:e.amount_s,amount:e.amount,time:e.time,earnings:(e.reward-e.amount_s).toFixed(6)}),t.loading=!1}),t.EtableData.length>0)for(var a=0;a<(t.EtableData.length>=t.pageSize1?t.pageSize1:t.EtableData.length);a++)t.EtableDataSmall.push(t.EtableData[a])}),Object(o["b"])().then(function(e){console.log(e,"总收益信息"),t.EtableDataBlockSum=e.data.msg.num,t.EtableDataQuKuaiSum=e.data.msg.reward,t.EtableDataMillerSum=e.data.msg.amount,t.EtableDataEarningsSum=e.data.msg.profit}),Object(o["e"])().then(function(e){if(console.log(e),e.data.forEach(function(e){t.tableData.push({hr1:e.hr1,hr2:e.hr2,offline:e.offline,online:e.online,paid:e.paid,wallet:e.wallet,lastshare:e.lastshare,payments:e.payments})}),t.tableData.length>0)for(var a=0;a<(t.tableData.length>=t.pageSize?t.pageSize:t.tableData.length);a++)t.tableDataSmall.push(t.tableData[a]);t.loading=!1})}},r=s,c=(a("d5b1"),a("048f")),u=Object(c["a"])(r,n,i,!1,null,null,null);u.options.__file="uu-page.vue";e["default"]=u.exports},d5b1:function(t,e,a){"use strict";var n=a("aaf6"),i=a.n(n);i.a},fa69:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("Table",{ref:"tablesMain",attrs:{data:t.insideTableData,columns:t.insideColumns,stripe:t.stripe,border:t.border,"show-header":t.showHeader,width:t.width,height:t.height,loading:t.loading,"disabled-hover":t.disabledHover,"highlight-row":t.highlightRow,"row-class-name":t.rowClassName,size:t.size,"no-data-text":t.noDataText,"no-filtered-data-text":t.noFilteredDataText},on:{"on-current-change":t.onCurrentChange,"on-select":t.onSelect,"on-select-cancel":t.onSelectCancel,"on-select-all":t.onSelectAll,"on-selection-change":t.onSelectionChange,"on-sort-change":t.onSortChange,"on-filter-change":t.onFilterChange,"on-row-click":t.onRowClick,"on-row-dblclick":t.onRowDblclick,"on-expand":t.onExpand}},[t._t("header",null,{slot:"header"}),t._t("footer",null,{slot:"footer"}),t._t("loading",null,{slot:"loading"})],2),t.searchable&&"bottom"===t.searchPlace?a("div",{staticClass:"search-con search-con-top"},[a("Select",{staticClass:"search-col",model:{value:t.searchKey,callback:function(e){t.searchKey=e},expression:"searchKey"}},t._l(t.columns,function(e){return"handle"!==e.key?a("Option",{key:"search-col-"+e.key,attrs:{value:e.key}},[t._v(t._s(e.title))]):t._e()})),a("Input",{staticClass:"search-input",attrs:{placeholder:"输入关键字搜索"},model:{value:t.searchValue,callback:function(e){t.searchValue=e},expression:"searchValue"}}),a("Button",{staticClass:"search-btn",attrs:{type:"primary"}},[a("Icon",{attrs:{type:"search"}}),t._v("  搜索")],1)],1):t._e(),a("a",{staticStyle:{display:"none",width:"0px",height:"0px"},attrs:{id:"hrefToExportTable"}})],1)},i=[],l=(a("25d7"),a("20a2"),a("84fb"),function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"tables-edit-outer"},[t.isEditting?a("div",{staticClass:"tables-editting-con"},[a("Input",{staticClass:"tables-edit-input",attrs:{value:t.value},on:{input:t.handleInput}}),a("Button",{staticStyle:{padding:"6px 4px"},attrs:{type:"text"},on:{click:t.saveEdit}},[a("Icon",{attrs:{type:"md-checkmark"}})],1),a("Button",{staticStyle:{padding:"6px 4px"},attrs:{type:"text"},on:{click:t.canceltEdit}},[a("Icon",{attrs:{type:"md-close"}})],1)],1):a("div",{staticClass:"tables-edit-con"},[a("span",{staticClass:"value-con"},[t._v(t._s(t.value))]),t.editable?a("Button",{staticClass:"tables-edit-btn",staticStyle:{padding:"2px 4px"},attrs:{type:"text"},on:{click:t.startEdit}},[a("Icon",{attrs:{type:"md-create"}})],1):t._e()],1)])}),o=[],s={name:"TablesEdit",props:{value:[String,Number],edittingCellId:String,params:Object,editable:Boolean},computed:{isEditting:function(){return this.edittingCellId==="editting-".concat(this.params.index,"-").concat(this.params.column.key)}},methods:{handleInput:function(t){this.$emit("input",t)},startEdit:function(){this.$emit("on-start-edit",this.params)},saveEdit:function(){this.$emit("on-save-edit",this.params)},canceltEdit:function(){this.$emit("on-cancel-edit",this.params)}}},r=s,c=(a("4974"),a("048f")),u=Object(c["a"])(r,l,o,!1,null,null,null);u.options.__file="edit.vue";var h=u.exports,d={delete:function(t,e,a){return t("Poptip",{props:{confirm:!0,title:"你确定要删除吗?"},on:{"on-ok":function(){a.$emit("on-delete",e),a.$emit("input",e.tableData.filter(function(t,a){return a!==e.row.initRowIndex}))}}},[t("Button",{props:{type:"text",ghost:!0}},[t("Icon",{props:{type:"md-trash",size:18,color:"#000000"}})])])}},p=d,g=(a("30d9"),{name:"Tables",props:{value:{type:Array,default:function(){return[]}},columns:{type:Array,default:function(){return[]}},size:String,width:{type:[Number,String]},height:{type:[Number,String]},stripe:{type:Boolean,default:!1},border:{type:Boolean,default:!1},showHeader:{type:Boolean,default:!0},highlightRow:{type:Boolean,default:!1},rowClassName:{type:Function,default:function(){return""}},context:{type:Object},noDataText:{type:String},noFilteredDataText:{type:String},disabledHover:{type:Boolean},loading:{type:Boolean,default:!1},editable:{type:Boolean,default:!1},searchable:{type:Boolean,default:!1},searchPlace:{type:String,default:"top"}},data:function(){return{insideColumns:[],insideTableData:[],edittingCellId:"",edittingText:"",searchValue:"",searchKey:""}},methods:{suportEdit:function(t,e){var a=this;return t.render=function(t,e){return t(h,{props:{params:e,value:a.insideTableData[e.index][e.column.key],edittingCellId:a.edittingCellId,editable:a.editable},on:{input:function(t){a.edittingText=t},"on-start-edit":function(t){a.edittingCellId="editting-".concat(t.index,"-").concat(t.column.key),a.$emit("on-start-edit",t)},"on-cancel-edit":function(t){a.edittingCellId="",a.$emit("on-cancel-edit",t)},"on-save-edit":function(t){a.value[t.row.initRowIndex][t.column.key]=a.edittingText,a.$emit("input",a.value),a.$emit("on-save-edit",Object.assign(t,{value:a.edittingText})),a.edittingCellId=""}}})},t},surportHandle:function(t){var e=this,a=t.options||[],n=[];a.forEach(function(t){p[t]&&n.push(p[t])});var i=t.button?[].concat(n,t.button):n;return t.render=function(t,a){return a.tableData=e.value,t("div",i.map(function(n){return n(t,a,e)}))},t},handleColumns:function(t){var e=this;this.insideColumns=t.map(function(t,a){var n=t;return n.editable&&(n=e.suportEdit(n,a)),"handle"===n.key&&(n=e.surportHandle(n)),n})},setDefaultSearchKey:function(){this.searchKey="handle"!==this.columns[0].key?this.columns[0].key:this.columns.length>1?this.columns[1].key:""},handleClear:function(t){""===t.target.value&&(this.insideTableData=this.value)},handleTableData:function(){this.insideTableData=this.value.map(function(t,e){var a=t;return a.initRowIndex=e,a})},exportCsv:function(t){this.$refs.tablesMain.exportCsv(t)},clearCurrentRow:function(){this.$refs.talbesMain.clearCurrentRow()},onCurrentChange:function(t,e){this.$emit("on-current-change",t,e)},onSelect:function(t,e){this.$emit("on-select",t,e)},onSelectCancel:function(t,e){this.$emit("on-select-cancel",t,e)},onSelectAll:function(t){this.$emit("on-select-all",t)},onSelectionChange:function(t){this.$emit("on-selection-change",t)},onSortChange:function(t,e,a){this.$emit("on-sort-change",t,e,a)},onFilterChange:function(t){this.$emit("on-filter-change",t)},onRowClick:function(t,e){this.$emit("on-row-click",t,e)},onRowDblclick:function(t,e){this.$emit("on-row-dblclick",t,e)},onExpand:function(t,e){this.$emit("on-expand",t,e)}},watch:{value:function(t){this.handleTableData()}},mounted:function(){this.handleColumns(this.columns),this.setDefaultSearchKey(),this.handleTableData()}}),m=g,f=Object(c["a"])(m,n,i,!1,null,null,null);f.options.__file="tables.vue";var b=f.exports;e["a"]=b}}]);
//# sourceMappingURL=chunk-0608424f.f7b50e14.js.map