<template>
  <el-card class="material">
    <bread-crumb slot="header">
      <template slot="title">素材管理</template>
    </bread-crumb>
    <!-- 上传组件 -->
    <el-upload :show-file-list="false" class="dj-btn" action :http-request="uploadImg">
      <el-button size="small" type="primary">上传图片</el-button>
    </el-upload>
    <el-tabs v-model="activeName" @tab-click="changeName">
      <el-tab-pane label="全部素材" name="first">
        <div class="card-list">
          <el-card v-for="item in list" :key="item.id" class="img-card">
            <img :src="item.url" alt />
            <el-row type="flex" justify="space-around" class="bjbj" align="middle">
              <i
                @click="changeZt(item)"
                class="el-icon-star-on"
                :style="{color : item.is_collected ? 'red' : ''}"
              ></i>
              <i class="el-icon-delete-solid" @click="delImg(item)"></i>
            </el-row>
          </el-card>
        </div>
        <el-row type="flex" justify="center">
          <el-pagination
            @current-change="changePage"
            :current-page="page.page"
            :page-size="page.pageSize"
            background
            layout="prev, pager, next"
            :total="page.total"
          ></el-pagination>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="收藏图片" name="second">
        <div class="card-list">
          <el-card v-for="item in list" :key="item.id" class="img-card">
            <img :src="item.url" alt />
            <el-row type="flex" justify="space-around" class="bjbj" align="middle"></el-row>
          </el-card>
        </div>
        <el-row type="flex" justify="center">
          <el-pagination
            @current-change="changePage"
            :current-page="page.page"
            :page-size="page.pageSize"
            background
            layout="prev, pager, next"
            :total="page.total"
          ></el-pagination>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'first',
      list: [],
      page: {
        page: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  methods: {
    uploadImg (params) {
      // console.log(params);
      let obj = new FormData()
      obj.append('image', params.file)

      this.$axios({
        url: '/user/images',
        method: 'post',
        data: obj
      }).then(() => {
        this.getMaterial()
      })
    },
    changeZt (item) {
      let mess = item.is_collected ? '取消收藏' : '收藏'
      this.$confirm(`您是否要${mess}此图片?`, '提示').then(() => {
        this.$axios({
          url: `/user/images/${item.id}`,
          method: 'put',
          data: { collect: !item.is_collected }
        }).then(() => {
          this.getMaterial()
        })
      })
    },
    delImg (item) {
      this.$confirm('您确定要删除此图片吗?', '提示').then(() => {
        this.$axios({
          url: `/user/images/${item.id}`,
          method: 'delete'
        }).then(() => {
          this.getMaterial()
        })
      })
    },
    changeName () {
      // this.page.page = 1;
      this.getMaterial()
      // alert(this.activeName);
    },
    changePage (newPage) {
      this.page.page = newPage
      this.getMaterial()
    },
    getMaterial () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: this.activeName === 'second',
          per_page: this.page.pageSize,
          page: this.page.page
        }
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count
      })
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang='less' scoped>
.dj-btn {
  position: absolute;
  right: 20px;
  margin-top: -10px;
}
.material {
  .card-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .img-card {
      width: 200px;
      height: 200px;
      margin: 20px;
      position: relative;
      img {
        width: 100%;
      }
      .bjbj {
        position: absolute;
        width: 100%;
        bottom: 0;
        left: 0;
        height: 30px;
        background-color: #f4f5f6;
        font-size: 18px;
      }
    }
  }
}
</style>
