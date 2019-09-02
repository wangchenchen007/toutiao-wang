<template>
  <div>
    <el-row class="layout-header" type="flex" justify="space-between">
      <el-col class="left" :span="6">
        <i class="el-icon-s-unfold icon"></i>
        <span>江苏传智播客教育科技股份有限公司</span>
      </el-col>
      <el-col class="right" :span="3">
        <!-- 如果属性不加 ':'为字符串 -->
        <img class="header-img" :src="userInfo.photo ? userInfo.photo : defaultImg" alt />
        <el-dropdown>
          <span class="el-dropdown-link">
            {{userInfo.name}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人信息</el-dropdown-item>
            <el-dropdown-item>GIT地址</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {},
      defaultImg: require('../../assets/img/avatar.jpg')
    }
  },
  methods: {
    getUserInfo () {
      let token = window.localStorage.getItem('user-token')
      this.$axios({
        url: '/user/profile',
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(result => {
        this.userInfo = result.data.data
      })
    }
  },
  //   钩子函数 获取数据为created    获取DOM对象 为mounted
  created () {
    this.getUserInfo()
  }
}
</script>

<style lang='less' scoped>
.layout-header {
  padding: 10px 0;
  .left {
    .icon {
      font-size: 20px;
      margin-right: 5px;
    }
    display: flex;
    align-items: center;
  }
  .right {
    display: flex;
    align-items: center;
    .header-img {
      border-radius: 50%;
      margin-right: 5px;
      width: 40px;
    }
  }
}
</style>
