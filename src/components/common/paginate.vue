<template>
    <el-row type="flex" justify="end" class="paginate" v-if="page.pageCount > 0">
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-size="page.pageSize || 10"
        :page-sizes="page.only ? [page.only] : [10, 20, 50]"
        :current-page="page.currentPage || 1"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.recordCount">
        </el-pagination>
    </el-row>
</template>
<script>
export default {
    data () {
        return {
            pageSize: 10
        }
    },
    props: {
        callback: {
            type: Function,
            required: true
        },
        page: {
            type: Object,
            default: function () {
                return {}
        },
        required: true
        }
    },
    methods: {
        handleCurrentChange (val) {
            this.callback(val, this.pageSize)
        },
        handleSizeChange (val) {
            this.pageSize = val
            this.page.pageSize = val
            this.callback(1, val)
        }
    }
}
</script>
<style scoped>
    .paginate {
        padding: 10px 10px 10px 0;
        background-color: #fff;
    }
</style>
