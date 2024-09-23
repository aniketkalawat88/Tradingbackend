const LiveAccountControll = require("../model/LiveAccountSchema")

const PostLive = async (req ,res) => {
    const {name , email , idcard ,amount } = req.body;
    if(!name || !email || !idcard || !amount){
        return res.status(402).json({message:"Please fill all the field"})
    }
    const isLive = await LiveAccountControll.findOne({email:email})
    if(isLive){
        return res.status(400).json({message: "User Already Exist"});
    }
    try{
        const IsComp = await LiveAccountControll.create({
            name:name,
            email:email,
            idcard:idcard,
            amount:amount,
        })
        res.status(201).json({message:"Data send Succesfully" , data : IsComp})
    }
    catch(err){
        return res.status(401).json({message:"Error send data" , Error : err})
    }
}

const GetLive = async (req ,res) => {
    try{
        const allPerformer = await LiveAccountControll.find({});
        res.status(201).json({message:"All Perfomer data" , val : allPerformer})
    }
    catch(err){
        return res.status(500).json({ msg: "Error updating performance", error: err });        
    }
}

const DeleteLive = async (req ,res) => {
    const {id} = req.params;
    const isLive = await LiveAccountControll.findByIdAndDelete(id);
    if(!isLive){
        return res.status(404).json({message:"Competitor Not found"})
    }
    res.status(400).json({ message:"Competitor Deleted Succesfully"})
}

module.exports = {PostLive , GetLive , DeleteLive }