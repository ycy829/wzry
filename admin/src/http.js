import axios from "axios"
import Vue from "vue"
import router from "./router"

const http =axios.create({
    //编译会生成process.env这个环境变量
    baseURL: process.env.VUE_APP_API_URL || '/admin/api',
    // baseURL: "http://localhost:3000/admin/api"
})
http.interceptors.request.use(function (config) {
    // Do something before request is sent
    if(localStorage.token){
       //加请求头
    config.headers.Authorization='Bearer '+ (localStorage.token ||"") 
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  })

http.interceptors.response.use(res=>{
    return res
},err=>{
    if(err.response.data.message){
        Vue.prototype.$message({
        type:"error",
        message:err.response.data.message
    })
    console.log(err.response)
    if(err.response.status===401){
        router.push('/login')
    }
    }
    
    return Promise.reject(err)
})

export default http