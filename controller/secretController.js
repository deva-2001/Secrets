const { Error } = require('mongoose');
const Secret=require('../models/secret');

module.exports.create=async (req,res)=>{
    try{
        // console.log("Secrets",req.body);
        const {title,content}=req.body
        if(!title || !content ){
            return res.status(301).json({
                message:"Fields cannot be empty"
            })
        }
        let newSecret=await Secret.create({
        title:title,
        content:content,
        user:req.user
    });
    if(!newSecret){
        console.log("Unable to create Secret");
        const Error=new Error();
        throw Error;
    }else{
        console.log("Secret Saved Successfully");
        return res.status(200).json({
            message:"Secret Saved Successfully"
        })
    }
}
catch(error){
    console.log("Error",error);
    return res.status(501).json({
        message:"Internal Server Error"
    })
}
}

module.exports.getSecret=async (req,res)=>{
    try {
        let allSecrets=await Secret.find().populate('user')
        if(!allSecrets){
            console.log("No Secrets found");
            const Error=new Error();
            throw Error;
        }else{
            return res.status(200).json({
                message:"All Got",
                data:allSecrets
            })
        }

        
    } catch (error) {
        console.log("Error",error);
        return res.status(501).json({
            message:"Internal Server Error"
        })
    }

}

module.exports.deleteSecret=async (req,res)=>{
    try {
        const secretId=req.params.id;
        let allSecret=await Secret.findById(secretId);
        // console.log(allSecret._id);
        // console.log(req.user.id);
        if(!allSecret){
            console.log("No Secrets found");
            const Error=new Error();
            throw Error;
        }else{
            if(req.user.id!=allSecret.user){
                console.log("Unauthorized Access");
                return res.status(422).json({
                    message:"Unauthorized Access"
                })
            }
            else{
            allSecret.remove();
            // allSecret.save();
            return res.status(200).json({
                message:"Deleted Success"
            })
            }
        }
        
    } catch (error) {
        console.log("Error");
        return res.status(501).json({
            message:"Internal Server Error"
        })
    }
}