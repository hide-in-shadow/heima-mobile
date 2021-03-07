<template>
  <div class="user-profile">
    <!-- 用于文件上传 将其隐藏 通过点击头像 触发 -->
    <input type="file" hidden ref="inputFile" @input="inputChange">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="个人信息" left-arrow @click-left="$router.back()" />
    <!-- /导航栏 -->
    <van-cell title="头像" is-link @click="$refs.inputFile.click()">
      <van-image class="avatar" fit="cover" round :src="userMessage.photo" />
    </van-cell>
    <van-cell title="昵称" :value="userMessage.name" is-link @click="showName = true" />
    <van-cell title="性别" :value="userMessage.gender === 0 ? '男' : '女'" is-link @click="showSex = true" />
    <van-cell title="生日" :value="userMessage.birthday || '1977-01-01'" is-link @click="showBirthdy = true" />

    <!-- 修改昵称弹窗 -->
    <van-popup v-model="showName" style="height: 100%" position="bottom">
      <userName @close="showName = false" v-model="userMessage.name" v-if="showName"></userName>
    </van-popup>

    <!-- 修改性别弹窗 -->
    <van-popup v-model="showSex" position="bottom">
      <userSex @close="showSex = false" v-model="userMessage.gender" v-if="showSex"></userSex>
    </van-popup>

    <!-- 编辑生日弹层 -->
    <van-popup v-model="showBirthdy" position="bottom">
      <updateBirthdy @close="showBirthdy = false" v-model="userMessage.birthday" v-if="showBirthdy"></updateBirthdy>
    </van-popup>

    <!-- 编辑头像弹层 -->
    <van-popup v-model="showImg" style="height: 100%" position="bottom">
      <updateImg @close="showImg = false" v-if="showImg" :img="img" @updateImg="userMessage.photo = $event"></updateImg>
    </van-popup>
    <!-- 编辑头像弹层 -->
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user.js'
import userName from './components/user-name'
import userSex from './components/update-sex'
import updateBirthdy from './components/update-birthday.vue'
import updateImg from './components/update-img.vue'
export default {
  name: 'userPage',
  components: {
    userName,
    userSex,
    updateBirthdy,
    updateImg
  },
  props: {},
  data() {
    return {
      userMessage: {},
      showName: false, // 更改昵称弹出层
      showSex: false, // 更改性别弹出层
      showBirthdy: false, // 更改生日弹出层
      showImg: false, // 更改头像弹出层
      img: '' // 用于存储 预览的 图片 blob格式
    }
  },
  created() {
    this.getUserMessage()
  },
  mounted() {},
  methods: {
    // 获取 用户信息
    async getUserMessage() {
      try {
        const { data } = await getUserProfile()
        this.userMessage = data.data
        // console.log(this.userMessage)
      } catch (err) {
        console.log(err)
      }
    },
    // 上传文件事件
    inputChange() {
      // 获取 选择的图片文件对象
      const file = this.$refs.inputFile.files[0]
      // 将图片转换为 blob 格式使用
      // 获取 blob 数据 是一种 图片的格式信息  还有一种是 base64格式的
      this.img = window.URL.createObjectURL(file)
      this.showImg = true
      // file-input 如果选择同一个文件，不会触发 @change事件
      // 解决方法就是使用完毕后，清空 value值
      // 用于将上传的数据清除,便于下次上传
      this.$refs.inputFile.value = ''
    }
  },
  computed: {},
  watch: {}
}
</script>

<style scoped lang="less">
.user-profile {
  .avatar {
    width: 60px;
    height: 60px;
  }
}
</style>
