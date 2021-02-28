<template>
  <div class="search-history">
    <van-cell title="历史记录">
      <div class="delet">
        <van-button plain hairline type="info" size="mini" @click="isDelet=!isDelet">
          {{isDelet? '完成' : '删除'}}
        </van-button>
        <van-button plain hairline type="danger" size="mini" @click="deletAll">
          全部删除
          <van-icon name="delete" />
        </van-button>
      </div>
    </van-cell>
    <van-cell v-for="(item,i) in historyList" :title="item" :key="i" @click="isSearch(item)">
      <van-icon v-if="isDelet" name="cross" class='cross' />
    </van-cell>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getHistory, deletHistory } from '@/api/search.js'
import { setItem, getItem } from '@/utils/storage'
export default {
  name: 'searchHistory',
  components: {},
  props: {},
  data() {
    return {
      historyList: [],
      isDelet: false
    }
  },
  created() {
    this.getHistoryList()
  },
  mounted() {},
  methods: {
    // 获取历史搜索列表
    async getHistoryList() {
      try {
        if (this.token) {
          const { data } = await getHistory()
          this.historyList = data.data.keywords
          // setItem('hostoryList', data.data.keywords)
        } else {
          this.historyList = getItem('hostoryList')
        }
      } catch (err) {
        console.log(err)
      }
    },
    // 删除全部历史搜索记录
    deletAll() {
      this.$dialog
        .confirm({ message: '是否全部删除' })
        .then(async () => {
          if (this.token) {
            try {
              await deletHistory()
              // 重新渲染列表
              this.getHistoryList()
            } catch (err) {
              this.$toast('删除失败')
            }
          } else {
            setItem('hostoryList', [])
            // 重新渲染列表
            this.getHistoryList()
          }
        })
        .catch(() => {
          this.$toast('删除取消')
        })
    },
    // 删除还是搜索
    isSearch(item) {
      // 搜索
      if (!this.isDelet) {
        this.$emit('search', item)
      } else {
        // 删除
        if (!this.token) {
          const arr = getItem('hostoryList')
          // 去除 指定项
          const i = arr.findIndex((e) => e === item)
          if (i !== -1) {
            arr.splice(i, 1)
          }
          setItem('hostoryList', arr)
        } else {
          // TODO:  后端 删除指定项接口
        }
        // 删除完成后 重新渲染
        this.getHistoryList()
      }
    }
  },
  computed: {
    ...mapState(['token'])
  },
  watch: {}
}
</script>

<style scoped lang="less">
.search-history {
  .delet {
    position: absolute;
    top: -10px;
    right: 0;
    /deep/ button {
      margin-left: 50px;
    }
  }
}
</style>
