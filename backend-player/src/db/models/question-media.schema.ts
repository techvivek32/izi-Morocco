import mongoose from 'mongoose'


const QuestionMediaSchema = new mongoose.Schema({

    questionId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Questions',
        required:true,
        unique:true
    } ,

    images:[
       {type: String , default:[]}
    ] ,
    videos:[
       {type: String , default:[]}
    ] ,
    videoUrls:[
       {type: String , default:[]}
    ] ,
    audios:[
       {type: String , default:[]}
    ] ,

} , {
    timestamps:true ,
    versionKey:false ,
    collection:'QuestionMedia'

})


export default mongoose.model('QuestionMedia' , QuestionMediaSchema)