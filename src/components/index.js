import layoutAside from '../components/home/layout-aside.vue'
import layoutHeader from '../components/home/layout-header.vue'
import breadCrumb from '../components/commond/bread-crumb.vue'
import coverImage from '../components/publish/cover-image.vue'
import selectImage from '../components/publish/select-image.vue'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import {
  quillEditor
} from 'vue-quill-editor'

export default {
  install: function (Vue) {
    Vue.component('layout-aside', layoutAside)
    Vue.component('layout-header', layoutHeader)
    Vue.component('bread-crumb', breadCrumb)
    Vue.component('quill-editor', quillEditor) // 注册quilleditor编辑器
    Vue.component('cover-image', coverImage)
    Vue.component('select-image', selectImage)
  }
}
