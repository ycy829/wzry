<template>
    <div class="card mt-3 bg-white p-3">
      <div class="card-header d-flex ai-center pb-3" :class="{'border-bottom':!plain,'pb-3':!plain}">
        <i class="sprite" :class="`sprite-icon-${icon}`"></i>
        <div class="fs-xl px-2 flex-1"><strong>{{title}}</strong></div>
        <i class="sprite sprite-icon-menu" v-if="!plain"></i>
      </div>
      <div class="card-boyd pt-2">
          <!-- 自定义内容 -->
          <slot></slot>
      </div>
    </div>
</template>
<script>
export default {
    props:{
        title:{type:String,required:true},
        icon:{type:String,required:true},
        plain:{type:Boolean}
    }
}
</script>

<style lang="scss">
@import '../assets/scss/_variables.scss';
.card{
  border-bottom: 1px solid $border-color;
  // .card-header{
  //   border-bottom: 1px solid $border-color;
  // }
}
</style>