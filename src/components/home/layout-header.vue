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
        <el-dropdown @command="handelMenuItem">
          <span class="el-dropdown-link">
            {{userInfo.name}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="个人信息">个人信息</el-dropdown-item>
            <el-dropdown-item command="GIT地址">GIT地址</el-dropdown-item>
            <el-dropdown-item command="提出">退出</el-dropdown-item>
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
      this.$axios({
        url: '/user/profile'
      }).then(result => {
        // debugger;
        this.userInfo = result.data
      })
    },
    handelMenuItem (command) {
      if (command === '个人信息') {
      } else if (command === 'GIT地址') {
        window.location.href =
          'https://github.com/wangchenchen007/toutiao-wang'
      } else {
        window.localStorage.clear() // 清空全部缓存
        this.$router.push('/login') // 跳转登录页
      }
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
