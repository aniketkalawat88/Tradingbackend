const TopPerformance = require("../model/PerformanceSchema")


const PostPerformance = async (req ,res) => {
    const { name , description} = req.body;
    if(!name || !description){
        return res.status(401).json({msg:"please fill all the field"})
    }
    const exisitngUser = await TopPerformance.findOne({name:name})
    if(exisitngUser){
        return res.status(400).send("user already exist")
    }

    try{
        const isPerformance = await TopPerformance.create({
            name:name,
            description : description
        })
    
        res.status(201).json({msg:"Top User Created Succesfully" , data : isPerformance});
    }
    catch(e){
        return res.status(500).json({ msg: "Error creating performance", error: e.message });
    }
    
}

const GetPerformance = async (req ,res) => {
    try{
        const allPerformer = await TopPerformance.find({});
        res.status(201).json({message:"All Perfomer data" , val : allPerformer})

    }catch(e){
        return res.status(400).json({msg:"error getperformer " , val : e})
        console.log(e)
    }
}

const UpdatePerformance = async (req ,res) => {
    const { id } = req.params;
    const {name , description} = req.body;
    if (!name || !description) {
        return res.status(400).json({ msg: "Please fill all the fields" });
    }
    try{
        const UpdatePerfo = await TopPerformance.findByIdAndUpdate(id , {
            name:name,
            description:description
        })

        if (!UpdatePerfo) {
            return res.status(404).json({ msg: "Performance record not found" });
        }

        res.status(200).json({message:"update Succesfully" ,data: UpdatePerfo});
    }
    catch(err){
        console.log("Error During Updation" ,err)
        return res.status(500).json({ msg: "Error updating performance", error: err });
    }

}

const DeletePerformance = async (req , res) => {
    const {id} = req.params;
    const {name , description} = req.body;
    const deletePer = await TopPerformance.findByIdAndDelete(id);
    if(!deletePer) {
        return res.status(404).json({ msg: "Performance record not found" });
    }
    res.status(200).json({ msg: "Top User Deleted Successfully" });

}

module.exports = { PostPerformance ,GetPerformance , UpdatePerformance , DeletePerformance}