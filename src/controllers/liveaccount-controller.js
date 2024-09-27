const cloudinary = require('cloudinary');
const multer = require('multer');
const LiveAccountControll = require("../model/LiveAccountSchema")

const PostLive = async (req ,res) => {
    const { name , email ,number  , trasitionid , amount } = req.body;
    try{
        if(!name || !email || !number){
            return res.status(402).json({message:"Please fill all the field"})
        }
        const isLive = await LiveAccountControll.findOne({email:email})
        if(isLive){
            return res.status(400).json({message: "User Already Exist"});
        }
        
        let result = await cloudinary.v2.uploader.upload(req.file.path)
        console.log('Cloudinary Upload Result:', result);
        const  imageUrl = result.secure_url;
        const cloudinaryId = result.public_id;

        const IsComp = await LiveAccountControll.create({
            name,
            email,
            number,
            trasitionid,
            amount,
            imageFront: {
                imageUrl: imageUrl, 
                cloudinaryId: cloudinaryId
            },
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
    try{
        const isLive = await LiveAccountControll.findByIdAndDelete(id);
        if(!isLive){
            return res.status(404).json({message:"Competitor Not found"})
        }
        const result = await cloudinary.uploader.destroy(id);
        console.log(result)
        res.status(400).json({ message:"Live User Deleted Succesfully"})
    }
    catch(err){
        console.log(err, "Error deleting");
        res.status(400).json({ message:"Error Deleteting"})
    }
}

module.exports = {PostLive , GetLive , DeleteLive }