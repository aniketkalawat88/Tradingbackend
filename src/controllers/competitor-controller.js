const CompetitorControll = require("../model/CompetitorSchema")

const PostCompetitor = async (req ,res) => {
    const { name , email , data , range } = req.body;
    if(!name || !email || !data || !range){
        return res.status(402).json({message:"Please fill all the field"})
    }
    const exisitngUser = await CompetitorControll.findOne({email : email});
    
    if(exisitngUser){
        return res.status(400).json({message: "User Already Exist"});
    }
    
    try{
        const IsComp = await CompetitorControll.create({
            name:name,
            email:email,
            data:data,
            range:range,
        })
        res.status(201).json({message:"Data send Succesfully" , data : IsComp})
    }
    catch(err){
        return res.status(401).json({message:"Error send data" , Error : err})
    }
}

const GetCompetitor = async (req ,res) => {
    try{
        const getComp = await CompetitorControll.find({});
        res.status(201).json({message:"Data Send Succesfully" ,getComp })
    }
    catch(err){
        return res.status(404).json({message:"Error fetching data" , Error : err})
    }
}

const deleteCompetitor = async (req , res) => {
    const {id} = req.params;
    const isComp = await CompetitorControll.findByIdAndDelete(id);
    if(!isComp){
        return res.status(404).json({message:"Competitor Not found"})
    }
    res.status(400).json({ message:"Competitor Deleted Succesfully"})
}

module.exports = { PostCompetitor ,GetCompetitor , deleteCompetitor }