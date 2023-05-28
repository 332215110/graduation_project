<template>
    <div>
        <el-button round @click="clearFilter">重置数据</el-button>
        <el-button round @click="deleteRecord(personRecord)">删除记录</el-button>
        <el-button type="primary" @click="exportExcel">导出选中</el-button>
        <el-table ref="multipleTable" :data="tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)" stripe
            style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="查询作者">
                            <span>{{ props.row.author }}</span>
                        </el-form-item>
                        <el-form-item label="论文所有作者">
                            <span>{{ props.row.authors }}</span>
                        </el-form-item>
                        <el-form-item label="论文ee">
                            <span>{{ props.row.ee }}</span>
                        </el-form-item>
                        <el-form-item label="论文ID">
                            <span>{{ props.row.paperid }}</span>
                        </el-form-item>
                        <el-form-item label="期刊名称">
                            <span>{{ props.row.journal }}</span>
                        </el-form-item>
                        <el-form-item label="论文页数">
                            <span>{{ props.row.pages }}</span>
                        </el-form-item>
                        <el-form-item label="论文标题">
                            <span>{{ props.row.title }}</span>
                        </el-form-item>
                        <el-form-item label="论文dblpUrl">
                            <span>{{ props.row.url }}</span>
                        </el-form-item>
                        <el-form-item label="期刊收录年份">
                            <span>{{ props.row.year }}</span>
                        </el-form-item>
                        <el-form-item label="期刊全名">
                            <span>{{ props.row.name }}</span>
                        </el-form-item>
                        <el-form-item label="期刊ID">
                            <span>{{ props.row.journalid }}</span>
                        </el-form-item>
                        <el-form-item label="CUG分级">
                            <span>{{ props.row.cug }}</span>
                        </el-form-item>
                        <el-form-item label="CCF分级">
                            <span>{{ props.row.ccf }}</span>
                        </el-form-item>
                        <el-form-item label="SCI分级">
                            <span>{{ props.row.sci }}</span>
                        </el-form-item>
                        <el-form-item label="期刊ISSN">
                            <span>{{ props.row.ISSN }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column label="论文ID" prop="paperid">
            </el-table-column>
            <el-table-column label="查询作者" prop="author">
            </el-table-column>
            <el-table-column label="论文标题" prop="title">
            </el-table-column>
            <el-table-column label="期刊收录年份" prop="year"
                :filters="[{ text: '2023', value: '2023' }, { text: '2022', value: '2022' }, { text: '2021', value: '2021' }, { text: '2020', value: '2020' }, { text: '2019', value: '2019' }, { text: '2018', value: '2018' }, { text: '2017', value: '2017' }, { text: '2016', value: '2016' }, { text: '2015', value: '2015' }, { text: '2014', value: '2014' }, { text: '2013', value: '2013' }, { text: '2012', value: '2012' }, { text: '2011', value: '2011' }, { text: '2010', value: '2010' }, { text: '2009', value: '2009' }, { text: '2008', value: '2008' }, { text: '2007', value: '2007' }, { text: '2006', value: '2006' }, { text: '2005', value: '2005' }, { text: '2004', value: '2004' }, { text: '2003', value: '2003' }, { text: '2002', value: '2002' }, { text: '2001', value: '2001' }, { text: '2000', value: '2000' }]"
                :filter-method="filterHandler">
            </el-table-column>
            <el-table-column label="CUG分级" prop="cug"
                :filters="[{ text: 'T1', value: 'T1' }, { text: 'T2', value: 'T2' }, { text: 'T3', value: 'T3' }, { text: 'T4', value: 'T4' }, { text: 'T5', value: 'T5' }, { text: 'T6', value: 'T6' }]"
                :filter-method="filterHandler">
            </el-table-column>
            <el-table-column label="CCF分级" prop="ccf"
                :filters="[{ text: 'A', value: 'A' }, { text: 'B', value: 'B' }, { text: 'C', value: 'C' }]"
                :filter-method="filterHandler">
            </el-table-column>
            <el-table-column label="SCI分区" prop="sci"
                :filters="[{ text: '一区', value: '一区' }, { text: '二区', value: '二区' }, { text: '三区', value: '三区' }, { text: '四区', value: '四区' }]"
                :filter-method="filterHandler">
            </el-table-column>
            <el-table-column type="selection" width="55">
            </el-table-column>
        </el-table>
        <div class="block" style="margin-top:15px;">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                :page-sizes="[1, 5, 10, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
                :total="tableData.length" hide-on-single-page="true">
            </el-pagination>
        </div>
    </div>
</template>
  
<style>
.demo-table-expand {
    font-size: 0;
}

.demo-table-expand label {
    width: 100px;
    color: #99a9bf;
}

.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 100%;
}
</style>
  
<script>
import { delRecord, showRecord } from '@/api'
import router from '@/router'
// 引入导出Excel表格依赖
import { export_json_to_excel } from '@/vendor/Export2Excel'
export default {
    data() {
        return {
            tableData: [],
            currentPage: 1, // 当前页码
            total: 20, // 总条数
            pageSize: 5,// 每页的数据条数u
            multipleSelection: [],
            personRecord: []
        }
    },
    created: async function () {
        let recordArr = []
        let record = {
            author: '',
            authors: '',
            ee: '',
            paperid: '',
            journal: '',
            pages: '',
            title: '',
            url: '',
            year: '',
            name: '',
            journalid: '',
            ccf: '',
            cug: '',
            sci: '',
            ISSN: '',
        }
        await showRecord(JSON.parse(localStorage.getItem("user-info"))).then(function (response) {
            if (response.data.code == 200) {
                for (let i = 0; i < response.data.data.length; i++) {
                    record.author = response.data.data[i].paperData.author,
                        record.authors = response.data.data[i].paperData.authors,
                        record.ee = response.data.data[i].paperData.ee,
                        record.paperid = response.data.data[i].paperData.id,
                        record.journal = response.data.data[i].paperData.journal,
                        record.pages = response.data.data[i].paperData.pages,
                        record.title = response.data.data[i].paperData.title,
                        record.url = response.data.data[i].paperData.url,
                        record.year = response.data.data[i].paperData.year
                    if (response.data.data[i].journalData != undefined) {
                        record.name = response.data.data[i].journalData.name,
                            record.journalid = response.data.data[i].journalData.id,
                            record.ccf = response.data.data[i].journalData.ccf,
                            record.cug = response.data.data[i].journalData.cug,
                            record.sci = response.data.data[i].journalData.sci,
                            record.ISSN = response.data.data[i].journalData.ISSN
                    }
                    // recordArr.push(record)
                    // console.log(response.data.data[i].paperData)
                    // console.log(response.data.data[i].journalData)
                    recordArr.push(record)
                    record = {
                        author: '',
                        authors: '',
                        ee: '',
                        paperid: '',
                        journal: '',
                        pages: '',
                        title: '',
                        url: '',
                        year: '',
                        name: '',
                        journalid: '',
                        ccf: '',
                        cug: '',
                        sci: '',
                        ISSN: '',
                    }
                }
            } else if (response.data.code == 202) {
                alert(response.data.msg)
            } else if (response.data.code = 502) {
                router.push('/')
            } else {
                alert(response.data.msg)
            }
        })
        this.tableData = recordArr
        let tableParse = {
            tableData: this.tableData
        }
        localStorage.setItem("person-record", JSON.stringify(tableParse))
    },
    methods: {
        handleSizeChange(val) {
            this.currentPage = 1;
            this.pageSize = val;
        },
        //当前页改变时触发 跳转其他页
        handleCurrentChange(val) {
            this.currentPage = val;
        },
        handleSelectionChange(val) {
            this.personRecord = []
            this.multipleSelection = val;
            for (let i = 0; i < this.multipleSelection.length; i++) {
                let signleRecord = {
                    userid: JSON.parse(localStorage.getItem("user-info")).id,
                    paperid: this.multipleSelection[i].paperid,
                    journal: this.multipleSelection[i].journalid
                }
                this.personRecord.push(signleRecord)
            }
        },
        async deleteRecord(recordArr) {
            let oldRecord = JSON.parse(localStorage.getItem("person-record")).tableData
            await delRecord(recordArr).then(function (response) {
                if (response.data.code == 200) {
                    console.log(response.data.msg)
                    for (let i = 0; i < oldRecord.length; i++) {
                        for (let j = 0; j < recordArr.length; j++) {
                            if (oldRecord[i].paperid == recordArr[j].paperid) {
                                oldRecord.splice(i, 1)
                            }
                        }
                    }
                    let tableParse = {
                        tableData: oldRecord
                    }
                    localStorage.setItem("person-record", JSON.stringify(tableParse))
                } else if (response.data.code == 202) {
                    alert(response.data.msg)
                } else if (response.data.code == 502) {
                    router.push('/')
                } else {
                    alert(response.data.msg)
                }
            })
            recordArr = []
            this.clearFilter()
        },
        clearFilter() {
            this.tableData = JSON.parse(localStorage.getItem("person-record")).tableData
            console.log(this.tableData)
            this.$refs.multipleTable.clearFilter();
        },
        filterHandler(value, row, column) {
            // console.log(value)
            const property = column['property'];
            for (let i = 0; i < this.tableData.length; i++) {
                console.log(this.tableData[i][property])
                if (this.tableData[i][property] != value) {
                    this.tableData.splice(i, 1)
                }
            }
            return row[property] === value;
        },
        exportExcel() {
            if (this.multipleSelection.length === 0) {
                this.$message({
                    message: '请至少选择一条需要导出的数据',
                    type: 'warning'
                });
                return;
            }
            this.$msgbox.confirm('该操作将导出选中的数据，是否继续', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                //导出
                require.ensure([], () => {
                    //注意这个Export2Excel路径
                    const tableHeader = ['作者', '所有作者', '论文ee', '期刊缩写', '论文页数', '论文标题', '论文url', '期刊收录年份', '期刊名', 'CCF分级', 'CUG分级', 'SCI分区', 'ISSN'];   // 设置Excel表格的表头
                    const filterVal = ['author', 'authors', 'ee', 'journal', 'pages', 'title', 'url', 'year', 'name', 'ccf', 'cug', 'sci', 'ISSN'];  // 跟表格表头对应的绑定的prop
                    // let list = this.filterTableData(JSON.parse(JSON.stringify(this.multipleSelection)));   // this.selectList为选中的要导出的数据，用filterTableData方法先处理一下数据格式(要进行深度拷贝，以免过滤的时候，影响页面上展示的数据)，再存到list
                    let data = this.formatJson(filterVal, this.multipleSelection);
                    console.log(data)
                    export_json_to_excel(tableHeader, data, '论文报表');    //最后一个是导出表格的名字
                })
            }).catch(() => { });
        },
        formatJson(filterVal, Data) {
            return Data.map(v => filterVal.map(j => v[j]))
        },
    },
}

</script>