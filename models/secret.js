const mongoose=require('mongoose');

const secretSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    user:{
        ref:'User',
        type:mongoose.Schema.Types.ObjectId
    }
});

const Secret=mongoose.model('Secret',secretSchema);

module.exports=Secret