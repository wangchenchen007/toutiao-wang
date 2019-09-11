<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="素材库" name="first">
      <div class="img-list">
        <el-card class="img-item" v-for="item in list" :key="item.id">
          <img @click="selectImg(item)" :src="item.url" alt />
        </el-card>
      </div>
      <el-row justify="center" type="flex">
        <el-pagination
          background
          @current-change="changePage"
          :current-page="page.page"
          :page-size="page.pageSize"
          layout="prev, pager, next"
          :total="page.total"
        ></el-pagination>
      </el-row>
    </el-tab-pane>
    <el-tab-pane label="上传图片" name="second">配置管理</el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'first',
      list: [],
      page: {
        page: 1,
        pageSize: 8,
        total: 0
      }
    }
  },
  methods: {
    selectImg (item) {
      //   alert(item.url);获取点击图片的地址
      this.$emit('onSelectimg', item.url) // this.$emit触发一个自定义事件//在父组件中监听
    },
    changePage (newPage) {
      this.page.page = newPage
      this.getMaterrial()
    },
    getMaterrial () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: false,
          page: this.page.page,
          per_page: this.page.pageSize
        }
      }).then(result => {
        this.list = result.data.results
      })
    }
  },
  created () {
    this.getMaterrial()
  }
}
</script>

<style lang='less' scoped>
.img-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .img-item {
    margin: 20px 10px;
    width: 160px;
    height: 130px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
