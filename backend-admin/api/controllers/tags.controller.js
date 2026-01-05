import handleError from "../utils/handleError.js";
import buildErrorObject from "../utils/buildErrorObject.js";
import buildResponse from "../utils/buildResponse.js";
import { matchedData } from "express-validator";
import  httpStatus  from 'http-status';
import slugify from "slugify";
import Tags from '../models/tags.schema.js'





export const createTagsController = async(req , res)=>{
    try{
        const validatedData = matchedData(req)



        console.log(validatedData)

         const slugName = slugify(validatedData.name, {
                                                lower: true,
                                                strict: true, 
                                                trim: true,
                                                }); 



        console.log(slugName)


        const existingTag = await Tags.findOne({ name: slugName , isDeleted:
          {
            $ne: true
          }
         });





        if(existingTag){
            throw buildErrorObject(httpStatus.CONFLICT , 'Tag with same name already exists')

        }



        const newTag = await Tags.create({
            name:slugName ,
            manualEntry:true

        })








        res.status(httpStatus.CREATED).json(buildResponse(httpStatus.CREATED , newTag , 'Tag created successfully'))



    }catch(err){

if (err.code === 11000) {
    throw buildErrorObject(httpStatus.CONFLICT , 'Tag already exists')

    }
    handleError(res , err)

}


}



export const getTagsController = async (req, res) => {
  try {
    let { page = 1, limit = 50, search = '' } = matchedData(req)
    page = Number(page) || 1
    limit = Number(limit) || 50
    if (limit > 50) limit = 50

    const filter = { isDeleted: { $ne: true } }

    if (search) {
      filter.name = { $regex: search, $options: 'i' }
    }

    const [data, totalDocs] = await Promise.all([
      Tags.find(filter)
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({  name:1})
        .lean(),
      Tags.countDocuments(filter)
    ])

    const totalPages = Math.ceil(totalDocs / limit)


    const response ={
        docs:data ,
        totalDocs ,
        limit ,
        page ,
        totalPages,
        hasNext: page*limit < totalDocs ,
        hasPrev: page > 1 

    }



    res.status(httpStatus.OK).json(buildResponse(httpStatus.OK , response , 'Tags fetched successfully'))

    
  } catch (err) {
    handleError(res, err)
  }
}


export const deleteTagController = async (req, res) => {
    try {
      const validatedData = matchedData(req)
  
      const tag = await Tags.findById(validatedData.id)
  
      if (!tag) {
        throw buildErrorObject(httpStatus.NOT_FOUND, 'Tag not found')
      }

      if(tag.isDeleted){
        throw buildErrorObject(httpStatus.NOT_FOUND, 'Tag already deleted')
      }
  
      tag.isDeleted = true
      await tag.save()  


      res.status(httpStatus.OK).json(buildResponse(httpStatus.OK ,'Tag deleted successfully'))
  

    } catch (err) {
      handleError(res, err)
    }
}



export const updateTagController = async (req, res) => {
  try {
    const validatedData = matchedData(req)

    const tag = await Tags.findById(validatedData.id)

    if (!tag) {
      throw buildErrorObject(httpStatus.NOT_FOUND, 'Tag not found')
    }

    if (tag.isDeleted) {
      throw buildErrorObject(httpStatus.NOT_FOUND, 'Tag is deleted')
    }

    if (validatedData.name) {
      const slugName = slugify(validatedData.name, {
        lower: true,
        strict: true,
        trim: true,
      })

      const existingTag = await Tags.findOne({
        name: slugName,
        _id: { $ne: validatedData.id },
        isDeleted: { $ne: true }
      })

      if (existingTag) {
        throw buildErrorObject(httpStatus.CONFLICT, 'Tag with same name already exists')
      }

      tag.name = slugName
    }

    await tag.save()

    res.status(httpStatus.OK).json(
      buildResponse(httpStatus.OK, tag, 'Tag updated successfully')
    )

  } catch (err) {
    if (err.code === 11000) {
      throw buildErrorObject(httpStatus.CONFLICT, 'Tag already exists')
    }
    handleError(res, err)
  }
}




  


