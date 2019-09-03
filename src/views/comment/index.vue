<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">评论列表</template>
    </bread-crumb>
    <el-table :data="list">
      <el-table-column prop="title" label="标题" width="700px"></el-table-column>
      <el-table-column :formatter="formatter" prop="comment_status" label="评论状态"></el-table-column>
      <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
      <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="obj">
          <el-button size="small" type="text">修改</el-button>
          <el-button
            @click="openOrClose(obj.row)"
            :style="{color:obj.row.comment_status ? '#E6A23C':'#409EFF'}"
            size="small"
            type="text"
          >{{obj.row.comment_status ? '关闭评论': '打开评论'}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="center" style="margin:10px 0">
      <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    openOrClose (row) {
      let mess = row.comment_status ? '关闭' : '打开'
      this.$confirm(`您是否要${mess}此状态?`, '提示').then(() => {
        this.$axios({
          method: 'put',
          url: '/comments/status',
          // row 为行数据
          params: { article_id: row.id.toString() },
          data: {
            allow_comment: !row.comment_status
          }
        }).then(result => {
          this.getComments()
        })
      })
    },
    formatter (row) {
      return row.comment_status ? '正常' : '关闭'
    },
    getComments () {
      // query 路径参数
      this.$axios({
        url: '/articles',
        params: {
          response_type: 'comment'
        }
      }).then(result => {
        // console.log(result.data);
        this.list = result.data.results
      })
    }
  },
  created () {
    this.getComments()
  }
}
</script>

<style>
</style>
