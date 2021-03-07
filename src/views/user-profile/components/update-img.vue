<template>
  <div class="update-avatar">
    <img :src="img" ref="imgRef" />
    <div class="toolbar">
      <span @click="$emit('close')">取消</span>
      <span @click="confirm">完成</span>
    </div>
  </div>
</template>

<script>
import { updateUserImg } from '@/api/user.js'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
export default {
  name: 'updataImg',
  components: {},
  props: {
    img: { type: [String, Object], retuired: true }
  },
  data() {
    return {
      cropper: null // 剪裁图片的配置信息
    }
  },
  created() {},
  mounted() {
    const image = this.$refs.imgRef
    this.cropper = new Cropper(image, {
      viewMode: 1, // 只能在裁剪的图片范围内移动
      dragMode: 'move', // 画布和图片都可以移动
      aspectRatio: 1, // 裁剪区默认正方形
      autoCropArea: 1, // 自动调整裁剪图片
      cropBoxMovable: false, // 禁止裁剪区移动
      cropBoxResizable: false, // 禁止裁剪区缩放
      background: false // 关闭默认背景
    })
  },
  methods: {
    confirm() {
      this.cropper.getCroppedCanvas().toBlob(async (blob) => {
        this.$toast.loading({
          message: '保存中...',
          forbidClick: true,
          loadingType: 'spinner',
          duration: 0
        })
        try {
          const formData = new FormData()
          formData.append('photo', blob)
          const { data } = await updateUserImg(formData)
          // 关闭弹层，更新视图
          this.$emit('close')
          this.$emit('updateImg', data.data.photo)
          this.$toast('更新成功')
        } catch (err) {
          this.$toast('更新失败')
        }
      })
    }
  },
  computed: {},
  watch: {}
}
</script>

<style scoped lang="less">
img {
  display: block;
  max-width: 100%;
}
.update-avatar {
  background: #000;
  width: 100%;
  height: 100%;
  .toolbar {
    position: fixed;
    bottom: 10px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 28px;
    color: #fff;
    padding: 0 15px;
    box-sizing: border-box;
  }
}
</style>
