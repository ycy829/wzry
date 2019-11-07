//导出一个函数
module.exports = app => {
    const express = require('express')
    // 返回token安装使用jsonwebtoken
    const jwt = require('jsonwebtoken')
    const assert =require('http-assert')
    const AdminUser =require("../../models/AdminUser")
    const router = express.Router({
      //合并参数
      mergeParams:true
    })
    // const req.Model =require('../../models/Category')
    router.post('/', async (req,res) => {

      const model= await req.Model.create(req.body)
      res.send(model)
    })
    router.put('/:id', async (req,res) => {
      const model= await req.Model.findByIdAndUpdate(req.params.id,req.body)
      res.send(model)
    })
    router.delete('/:id', async (req,res) => {
      await req.Model.findByIdAndDelete(req.params.id,req.body)
      res.send({
        success:true
      })
    })
    // 请求资源
    router.get('/', async (req,res) => {
      const queryOptions = {}
      if(req.Model.modelName==='Category'){
        queryOptions.populate='parent'
      }
      const items= await req.Model.find().setOptions(queryOptions).limit(100)
      res.send(items)
    })
    router.get('/:id', async (req,res) => {
      const model= await req.Model.findById(req.params.id)
      res.send(model)
    })

    const authMiddleware =require('../../middleware/auth')
    const resourceMiddleware =require('../../middleware/resource')
    app.use('/admin/api/rest/:resource',authMiddleware() , resourceMiddleware(),router)


    const multer = require("multer")
    const upload = multer({dest:__dirname + '/../../uploads'})

    app.post('/admin/api/upload',authMiddleware(), upload.single('file'), async (req,res)=>{
      const file = req.file
      file.url=`http://localhost:3000/uploads/${file.filename}`
      res.send(file)
    })

    app.post('/admin/api/login', async (req,res)=>{
      //根据用户名找用户
      
      const { username, password }=req.body
      //.select('+password')取出password
      const user = await AdminUser.findOne({ username:username}).select('+password')
      //第一个参数条件，第二个参数状态，第三个message
      assert(user,422,'用户不存在')
      // if(!user){
      //   return res.status(402).send({
      //     message:"用户不存在"
      //   })
      // }
      // 校验密码
      const isValid = require('bcryptjs').compareSync(password,user.password)
      assert(isValid,422,'密码错误')
      // if(!isValid){
      //   return res.status(402).send({
      //     message:"密码错误"
      //   })
      // }

      const token = jwt.sign({id:user._id},app.get('secret'))
      res.send({token})
    })

    //处理错误函数
    app.use(async (err,req,res,next)=>{
      res.status(err.statusCode || 500).send({
        message:err.message
      })
    })
}