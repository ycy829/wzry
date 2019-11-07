<template>
  <div class="page-article" v-if="model">
    <div class="d-flex py-3 px-2 border-bottom">
      <div class="px-2 fs-xl text-blue" >&lt;</div>
      <strong class="felx-1 text-blue pl-2 fs-sm">
        {{model.title}}
      </strong>
      <div class="text-grey fs-xs">
        2019-10-22
      </div>
    </div>
    <div v-html="model.body" class="px-3 article-body"></div>
    <div class="px-3 border-top py-3">
      <div>
        <strong class="text-blue fs-lg ml-2">相关资讯</strong>
      </div>
      <router-link class="py-1"
      tag="div"
      :to="`/articles/${item._id}`"
      v-for="item in model.related" :key="item.id">
        {{item.title}}
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    id:{require:true}
  },
  data(){
    return{
      model:null
    }
  },
  watch:{
    id:'fetch',
    // id(){
    //   this.fetch()
    // }
  },
  methods:{
    async fetch(){
      const res=await this.$http.get(`articles/${this.id}`)
      this.model=res.data
    }
  },
  created(){
    this.fetch()
  }
}
</script>
<style lang="scss">
.page-article{
  .article-body{
    img{
      max-width: 100%;
      height: auto;
    }
    iframe{
      width: 100%;
      height: auto;
    }
  }
}
</style>
