<template>
  <div class="cover-image">
    <div @click="showDialog(index)" class="image-item" v-for="(item,index) in images" :key="index">
      <img :src="item ? item : defaultImg" alt />
    </div>
    <el-dialog @close="hideDialog" :visible="dialogVisbile">
      <!-- 素材选择/选择图片 -->
      <select-image @onSelectimg="receiveImg"></select-image>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['images'],
  data () {
    return {
      defaultImg: require('../../assets/img/pic_bg.png'), // 注册一个变量  img64 位
      dialogVisbile: false,
      selectIndex: -1
    }
  },
  methods: {
    // 接受子组件
    receiveImg (url) {
      // alert("啊啊啊啊" + url);
      // url 不能在本页修改   应在index.vue中修改   再一次子传父

      this.$emit('onClickimg', url, this.selectIndex)
      this.dialogVisbile = false
    },
    // 显示弹层
    showDialog (index) {
      this.selectIndex = index
      this.dialogVisbile = true
    },
    // 隐藏弹层
    hideDialog () {
      this.dialogVisbile = false
    }
  }
}
</script>

<style lang='less' scoped>
.cover-image {
  display: flex;
  .image-item {
    border: 1px solid #ccc;
    padding: 10px;
  }
}
</style>
