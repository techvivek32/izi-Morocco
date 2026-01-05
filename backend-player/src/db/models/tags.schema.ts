import mongoose from "mongoose";

const Tags = new mongoose.Schema({
    name:{
        type:String ,
        required:true ,
        trim:true ,
        lowercase:true ,
        index:true   
    } ,

    manualEntry:{
        type:Boolean ,
        default:false ,

    } ,

    isDeleted:{
        type:Boolean ,
        default:false
    }

} , {
    collection:"Tags" ,
    timestamps:true ,
    versionKey:false

})


export default mongoose.model("Tags" , Tags)