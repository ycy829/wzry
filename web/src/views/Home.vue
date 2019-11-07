<template>
  <div>
    <swiper :options="swiperOption">
      <swiper-slide>
        <img class="w-100" src="../assets/images/6feb033761671560d177874917acbebe.jpeg" alt="">
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/c7782db0b15a0454e063fb9d303ceb12.jpeg" alt="">
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/f262bf290b999e3d5658ed0ca87ef360.jpeg" alt="">
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right px-3" slot="pagination"></div> 
    </swiper>
    <!-- nav-icon -->
    <div class="nav-icon bg-white mt-3  text-center pt-3 text-grey">
      <div class="d-flex flex-wrap">
        <div class="nav-item mb-3" v-for="(item,i) in navitems" :key="i">
          <i class="sprite" :class="item.c"></i>
          <div class="py-2">{{item.title}}</div>
        </div>
      </div>
      <div class="bg-light py-2">
        <i class="sprite sprite-arrow mr-1"></i>
        收起
      </div>
    </div>
    <!-- nav-icon end-->
    <m-list-card icon="new" title="新闻资讯" :categories="newsCats">
      <!-- listCard里的slot绑定并接受slot里的category -->
      <template #items="{category}">
        <router-link 
        tag="div" :to="`/articles/${news._id}`"
        class="py-2 fs-lg d-flex" v-for="(news,i) in category.newsList" :key="i">
          <span class="text-grey">[{{news.categoryName}}]</span>
          <span class="px-2">|</span>
          <span class="flex-1 text-dark text-ellipsis pr-2">{{news.title}}</span>
          <span class="text-grey fs-sm">{{news.createdAt |date}}</span>
        </router-link>
      </template>
    </m-list-card>
    <!-- 英雄列表 -->
    <m-list-card icon="hero" title="英雄分类" :categories="heroCats">
      <!-- listCard里的slot绑定并接受slot里的category -->
      <template #items="{category}">
        <div class="d-flex flex-wrap" style="margin:0 -0.5rem">
          <router-link 
          tag="div" :to="`/heroes/${hero._id}`"
           class="p-2 text-center" style="width:20%" v-for="(hero,i) in category.heroList" :key="i">
            <img :src="hero.avatar" alt="" class="w-100">
            <div>{{hero.name}}</div>
          </router-link>
        </div>
        
      </template>
    </m-list-card>
    <m-card icon="hreolist" title="英雄列表"></m-card>
  </div>
</template>

<script> 
import dayjs from 'dayjs';
export default{
 
  filters:{
    date(val){
      return dayjs(val).format('MM/DD')
    }
  },
  data(){
    return{
      //nav-icon
      navitems:[
        {c:"sprite-news",title:'爆料站'},
        {c:"sprite-Story",title:'故事站'},
        {c:"sprite-shop",title:'周边商城'},
        {c:"sprite-experience",title:'体验服'},
        {c:"sprite-newcome",title:'新人专区'},
        {c:"sprite-inheritance",title:'荣耀传承'},
        {c:"sprite-fellow",title:'同人社区'},
        {c:"sprite-king",title:'王者营地'},
        {c:"sprite-official",title:'公众号'},
        {c:"sprite-version",title:'版本介绍'},
        {c:"sprite-match",title:'对局环境'},
        {c:"sprite-infinite",title:'无限王者团'},
      ],
      newsCats:[
        // {
        //   name:"热门",
        //   newslist:new Array(5).fill({}).map(v=>({
        //     categoryName:'公告',
        //     title:'【正式服】“四周岁特别版本”异常问题说明',
        //     date:'10/07'
        //   }))
        // },
        // {
        //   name:"新闻",
        //   newslist:new Array(5).fill({}).map(v=>({
        //     categoryName:'新闻',
        //     title:'【正式服】“四周岁特别版本”异常问题说明',
        //     date:'10/07'
        //   }))
        // },
        // {
        //   name:"公告",
        //   newslist:new Array(5).fill({}).map(v=>({
        //     categoryName:'公告',
        //     title:'【正式服】“四周岁特别版本”异常问题说明',
        //     date:'10/07'
        //   }))
        // },
        // {
        //   name:"活动",
        //   newslist:new Array(5).fill({}).map(v=>({
        //     categoryName:'活动',
        //     title:'【正式服】“四周岁特别版本”异常问题说明',
        //     date:'10/07'
        //   }))
        // },
        // {
        //   name:"赛事",
        //   newslist:new Array(5).fill({}).map(v=>({
        //     categoryName:'赛事',
        //     title:'【正式服】“四周岁特别版本”异常问题说明',
        //     date:'10/07'
        //   }))
        // },
        

      ],
      heroCats:[],
      swiperOption: {
        pagination: {
          el:".pagination-home",
        },
        loop : true,
        autoplay:true,//等同于以下设置
        /*autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: true,
          },*/
      }
    }
  },
  methods: {
    async fetchNewsCats(){
      const res = await this.$http.get('news/list')
      this.newsCats=res.data
    },
    async fetchHeroCats(){
      const res = await this.$http.get('heroes/list')
      this.heroCats=res.data
    },
  },
    created() {
      this.fetchNewsCats()
      this.fetchHeroCats()
}
}
</script>
<style lang="scss">
@import '../assets/scss/variables.scss';

.pagination-home{
  .swiper-pagination-bullet{
    opacity: 1;
    border-radius: 0.1538rem;
    background: #fff;
    &.swiper-pagination-bullet-active{
      background: #007aff;
    }
  }
}
.nav-icon{
  border-top:1px solid $border-color;
  border-bottom:1px solid $border-color;
  .nav-item{
    width: 25%;
    border-left: 1px solid $border-color;
    &:nth-child(4n+1){
      border-left:none; 
    }
  }
}
</style>
