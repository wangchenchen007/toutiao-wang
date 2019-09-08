<template>
  <el-card>
    <bread-crumb slot="header">
      <template slot="title">发布文章</template>
    </bread-crumb>

    <el-form
      ref="publishForm"
      :model="formDate"
      :rules="publishRules"
      style="margin-left:100px"
      label-width="100px"
    >
      <el-form-item prop="title" label="标题">
        <el-input v-model="formDate.title" style="width:400px"></el-input>
      </el-form-item>
      <el-form-item prop="content" label="内容">
        <el-input v-model="formDate.content" type="textarea" :rows="10" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="封面" prop="cover">
        <el-radio-group v-model="formDate.cover.type">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="channel_id" label="频道">
        <el-select v-model="formDate.channel_id" value>
          <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="publish(false)">发表文章</el-button>
        <el-button @click="publish(true)">存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      channels: [],
      formDate: {
        title: '',
        content: '',
        cover: {
          type: 0,
          images: []
        },
        channel_id: null
      },
      publishRules: {
        title: [
          {
            required: true,
            message: '标题不能为空'
          }
        ],
        content: [
          {
            required: true,
            message: '内容不能为空'
          }
        ],
        channel_id: [
          {
            required: true,
            message: '不能为空'
          }
        ]
      }
    }
  },
  methods: {
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels
      })
    },
    publish (draft) {
      this.$refs.publishForm.validate(isOk => {
        // let url, method;
        if (isOk) {
          let { articlesId } = this.$route.params
          this.$axios({
            url: articlesId ? `/articles/${articlesId}` : '/articles',
            method: articlesId ? 'put' : 'post',
            params: { draft },
            data: this.formDate
          }).then(() => {
            this.$router.push('/home/articles')
          })
        }
      })
    },
    getArticalById (articlesId) {
      this.$axios({
        url: `/articles/${articlesId}`
      }).then(result => {
        this.formDate = result.data
      })
    }
  },

  created () {
    this.getChannels()
    let { articlesId } = this.$route.params
    if (articlesId) {
      this.getArticalById(articlesId)
    }
  }
}
</script>

<style>
</style>
