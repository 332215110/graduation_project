<template>
    <div>
        <el-button round @click="clearFilter">重置数据</el-button>
        <el-button round @click="submitRecord(personRecord)">入库</el-button>
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
                            <span>{{ props.row.id }}</span>
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
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column label="论文ID" prop="id">
            </el-table-column>
            <el-table-column label="查询作者" prop="author">
            </el-table-column>
            <el-table-column label="论文标题" prop="title">
            </el-table-column>
            <el-table-column label="期刊收录年份" prop="year"
                :filters="[{ text: '2023', value: '2023' }, { text: '2022', value: '2022' }, { text: '2021', value: '2021' }, { text: '2020', value: '2020' }, { text: '2019', value: '2019' }, { text: '2018', value: '2018' }, { text: '2017', value: '2017' }, { text: '2016', value: '2016' }, { text: '2015', value: '2015' }, { text: '2014', value: '2014' }, { text: '2013', value: '2013' }, { text: '2012', value: '2012' }, { text: '2011', value: '2011' }, { text: '2010', value: '2010' }, { text: '2009', value: '2009' }, { text: '2008', value: '2008' }, { text: '2007', value: '2007' }, { text: '2006', value: '2006' }, { text: '2005', value: '2005' }, { text: '2004', value: '2004' }, { text: '2003', value: '2003' }, { text: '2002', value: '2002' }, { text: '2001', value: '2001' }, { text: '2000', value: '2000' }]"
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
import { dblpPaper, paperClassify } from '@/api'
import router from '@/router'
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
        let paperArr = []
        await dblpPaper(JSON.parse(localStorage.getItem("user-info"))).then(function (response) {
            if (response.data.code == 200) {
                paperArr = response.data.data
            } else if (response.data.code == 202) {
                alert(response.data.msg)
            } else if (response.data.code==502) {
                router.push('/')
            }else{
                alert(response.data.msg)
            }
        })
        this.tableData = paperArr
        let tableParse = {
            tableData: this.tableData
        }
        localStorage.setItem("dblp-paper", JSON.stringify(tableParse))
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
                    paperid: this.multipleSelection[i].id,
                    journal: this.multipleSelection[i].journal
                }
                this.personRecord.push(signleRecord)
            }
        },
        submitRecord(recordArr) {
            paperClassify(recordArr).then(function (response) {
                if (response.data.code == 200) {
                    console.log(response.data.msg)
                } else if (response.data.code == 202) {
                    alert(response.data.msg)
                } else {
                    alert(response.data.msg)
                }
            })
            recordArr = []
        },
        clearFilter() {
            this.tableData = JSON.parse(localStorage.getItem("dblp-paper")).tableData
            this.$refs.multipleTable.clearFilter();
        },
        filterHandler(value, row, column) {
            for (let i = 0; i < this.tableData.length; i++) {
                if (this.tableData[i].year != value) {
                    this.tableData.splice(i, 1)
                }
            }
            const property = column['property'];
            return row[property] === value;
        },
    }
}
</script>