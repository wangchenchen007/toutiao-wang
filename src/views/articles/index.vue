<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">内容管理</template>
    </bread-crumb>
    <el-form style="margin-left:50px">
      <el-form-item label="文章状态:">
        <el-radio-group v-model="searchForm.status" @change="changeCondion">
          <el-radio :label="5">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道列表:">
        <el-select @change="changeCondion" v-model="searchForm.channel_id
">
          <el-option :value="item.id" v-for="item in channels" :key="item.id" :label="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间选择:">
        <el-date-picker
          @change="changeCondion"
          v-model="searchForm.searchTime"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
    </el-form>
    <div class="total-info">共找到{{page.tatal}}条符合条件的内容</div>
    <div class="artical-list">
      <div class="artical-item" v-for="(item,index) in list" :key="index">
        <div class="left">
          <img :src="item.cover.images.length ? item.cover.images[0] :defaultImg " alt />
          <div>
            <p>{{item.title}}</p>
            <el-tag>{{item.status | statusText}}</el-tag>
            <p>{{item.pubdate}}</p>
          </div>
        </div>
        <div class="right">
          <span>
            <i class="el-icon-edit"></i>修改
          </span>
          <span>
            <i class="el-icon-delete"></i>删除
          </span>
        </div>
      </div>
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
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [],
      page: {
        page: 1,
        pageSize: 10,
        total: 0
      },
      defaultImg: require('../../assets/img/123.png'),
      searchForm: {
        status: 5,
        channel_id: null,
        searchTime: []
      },
      channels: []
    }
  },
  methods: {
    changePage (newPage) {
      this.page.page = newPage
      this.getConditionArticle()
    },
    changeCondion () {
      this.page.page = 1
      this.getConditionArticle()
    },
    getConditionArticle () {
      let params = {
        status: this.searchForm.status === 5 ? null : this.searchForm.status,
        channel_id: this.searchForm.channel_id,
        begin_pubdate:
          this.searchForm.searchTime.length > 0
            ? this.searchForm.searchTime[0]
            : null,
        end_pubdate:
          this.searchForm.searchTime.length > 1
            ? this.searchForm.searchTime[1]
            : null,
        per_page: this.page.pageSize,
        page: this.page.page
      }

      this.getArtical(params)
    },
    getArtical (params) {
      this.$axios({
        url: '/articles',
        params
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count
      })
    },
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels
      })
    }
  },
  created () {
    this.getArtical()
    this.getChannels()
  },
  // 过滤器
  filters: {
    statusText: function (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '审核通过'
        case 3:
          return '审核失败'
        default:
          break
      }
    }
  }
}
</script>

<style lang='less' scoped>
.total-info {
  border-bottom: 1px dashed #ccc;
  padding: 15px 0;
  font-size: 14px;
}
.artical-list {
  .artical-item {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid #f2f3f5;
    .left {
      display: flex;
      // margin-left: 160px;
      p {
        margin: 4px 0;
        font-size: 14px;
      }
      img {
        width: 150px;
        height: 100px;
        margin-right: 20px;
      }
    }
    .right {
      font-size: 12px;
      span {
        margin-left: 20px;
        cursor: pointer;
      }
    }
  }
}
</style>
