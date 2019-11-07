const mongoose =require('mongoose')

const schema = new mongoose.Schema({
    username:{type:String},
    password:{type:String,
        select:false,
        set(val){
            //bcryptjs处理密码散列
            return require('bcryptjs').hashSync(val,12)
        },
    }
})

module.exports = mongoose.model('AdminUser',schema)