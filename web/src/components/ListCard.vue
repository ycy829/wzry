<template>
   <m-card :icon="icon" :title="title" :categories="newsCats">
      <div class="nav jc-between">
<div class="nav-item" :class="{active:active===i}" v-for="(category,i) in categories" :key="i" @click="$refs.list.swiper.slideTo(i)">
          <div class="nav-link">{{category.name}}</div>
        </div>
      </div>
      <div class="pt-3">
        <swiper ref="list" @slide-change="()=>active=$refs.list.swiper.realIndex" :options="{autoHeight:true}">
          <swiper-slide v-for="(category,i) in categories" :key="i">
            <slot name="items" :category="category"></slot>
            <!-- <div class="py-2" v-for="n in 5" :key="n">
              <span>[新闻]</span>
              <span>|</span>
              <span>【正式服】“四周岁特别版本”异常问题说明</span>
              <span>10/07</span>
            </div> -->
          </swiper-slide>
        </swiper>
      </div>
    </m-card>
</template>

<script>
import Card from '../components/Card.vue'
export default {
    props:{
        icon:{type:String,required:true},
        title:{type:String,required:true},
        categories:{type:String,required:true},
    },
    data(){
        return{
            active:0
        }
    }

    
}
</script>