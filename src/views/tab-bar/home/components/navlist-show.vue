<template>
  <div class="navlist-show">
    <van-cell title="我的频道" :border="false">
      <van-button size="mini" round type="danger" plain class="btn" @click="isEditShow=!isEditShow">{{ isEditShow ? '完成': '编辑' }}</van-button>
    </van-cell>
    <van-grid :gutter="10" clickable>
      <van-grid-item class="channel-item" v-for="(value,i) in userNavList" :key="i" :text="value.name" @click="itemChange(value,i)">
        <van-icon v-show="isEditShow && i !== 0" slot="icon" name="close" />
        <span class="text" :class="{active: active === i}" slot="text">{{value.name}}</span>
      </van-grid-item>
    </van-grid>
    <van-cell title="频道推荐" :border="false"></van-cell>
    <van-grid :gutter="10" clickable>
      <van-grid-item class="channel-item" v-for="(value,i) in recomendList" :key="i" :text="value.name" icon="plus" @click="addNavList(value)">
        <span class="text" slot="text">{{value.name}}</span>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
import { getNewsNav, addNavItem, removeNavItem } from '@/api/navList'
export default {
  name: 'navListShow',
  components: {},
  props: {
    userNavList: { type: Array, required: true },
    active: { type: Number, required: true }
  },
  data() {
    return {
      navListAll: [],
      // 控制编辑是否开始
      isEditShow: false
    }
  },
  created() {
    this.getNewsNav()
  },
  mounted() {},
  methods: {
    // 获取 全部的 nav 列表
    async getNewsNav() {
      try {
        const { data } = await getNewsNav()
        this.navListAll = data.data.channels
      } catch (err) {
        this.$toast('推荐频道列表获取失败')
      }
    },
    // 列表点击 切换高亮 或 删除 列表项
    async itemChange(item, i) {
      if (this.isEditShow) {
        // 点击删除
        if (i === 0) return this.$toast('推荐频道禁止移除')
        if (i <= this.active) {
          this.$emit('changeActive', this.active - 1, true)
        }
        // 前端删除
        this.userNavList.splice(i, 1)
        // 移除 选中列表项
        try {
          if (this.token) {
            await removeNavItem(item.id)
            this.$toast.success('删除成功')
          } else {
            setItem('navList', this.userNavList)
          }
        } catch (err) {
          this.$toast.success('删除失败')
        }
      } else {
        // 更改高亮选项
        this.$emit('changeActive', i, false)
      }
    },
    // 添加导航列表项
    async addNavList(value) {
      // 前端添加
      this.userNavList.push(value)
      try {
        // 是否有 token 值
        if (this.token) {
          await addNavItem(value.id, this.userNavList.length)
          this.$toast.success('添加频道成功')
        } else {
          setItem('navList', this.userNavList)
        }
      } catch (err) {
        this.$toast('添加频道失败')
      }
    }
  },
  computed: {
    // 推荐列表 = 所有频道 - 用户频道
    recomendList() {
      return this.navListAll.filter((item) => {
        return !this.userNavList.find(({ id }) => {
          return id === item.id
        })
      })
    },
    ...mapState(['token'])
  },
  watch: {}
}
</script>
<style scoped lang="less">
.navlist-show {
  .channel-item {
    height: 86px;
    /deep/ .van-icon-plus {
      position: absolute;
      right: 0px;
      font-size: 36px;
      color: green;
    }
    /deep/ .van-grid-item__content {
      flex-direction: row;
      // background-color: #f4f5f6;
      .van-grid-item__text,
      .text {
        color: #222;
        font-size: 20px;
        white-space: nowrap;
        margin-top: 0;
        width: 100%;
      }
      .active {
        color: red;
      }
      .van-icon {
        font-size: 24px;
      }
      .van-icon-close {
        position: absolute;
        top: -50px;
        left: 120px;
        font-size: 36px;
        color: red;
      }
    }
  }
  .btn {
    padding: 0 20px;
  }
}
</style>
