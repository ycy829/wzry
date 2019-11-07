module.exports=options=>{
    const jwt = require('jsonwebtoken')
    const assert =require('http-assert')
    const AdminUser =require("../models/AdminUser")
    return async (req,res,next)=>{
        const token=String(req.headers.authorization || '').split(' ').pop()
        assert(token,401,'请提供token')
        const {id} = jwt.verify(token,req.app.get('secret'))
        req.user=await AdminUser.findById(id)
        assert(req.user,401,'请先登录')
        console.log(req.user)
        await next()
    }
}