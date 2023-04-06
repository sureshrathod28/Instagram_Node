const express=require("express")
const cors=require('cors')
const bodyParser=require('body-parser')
const server=express()
const mongoose=require('mongoose')

server.use(cors())
server.use(bodyParser.json({ limit: '10mb' }));
server.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

main().catch(err=>console.log(err))
async function main(){
    await mongoose.connect("mongodb+srv://root:10xAcademy@cluster0.lkbvqs4.mongodb.net/?retryWrites=true&w=majority")
    console.log("DB Connected")
}
const userSchema=new mongoose.Schema({
    myFile:String,
    author:{type:String,
            required:true},
    location:{type:String,
               required:true},
    description:{type:String,
                required:true},
    createdAt: {
        type: Date,
        default: new Date()
      }
})
const Instagram=mongoose.model('Instagram',userSchema)



server.post('/demo',async(req,resp)=>{
    let user=new Instagram()
    user.author=req.body.author
    user.location=req.body.location
    user.description=req.body.description
    const body=req.body
    try{
       const newImage=await Instagram.create(body)
       newImage.save()
    }catch(err){
        resp.status(409).json({message:err.message})
    }
    const doc=  await user.save()
    console.log(doc)
    resp.json(doc)
})

server.get('/demo',async(req,resp)=>{
    const docs=await Instagram.find({})
    resp.json(docs)
})
server.listen(8080,()=>{
    console.log('listening to the server')
})
