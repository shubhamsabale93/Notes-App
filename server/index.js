import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose  from 'mongoose'
import Note from './models/Note.js'
dotenv.config();


const app=express();
app.use(cors());
app.use(express.json());

const connectDB=async()=>{
    await mongoose.connect(process.env.MONGODB_URL)
    console.log("Database is connected")
}
connectDB();




app.get("/health",(req,res)=>{
    res.json({
        success:true,
        message:"Server is running",
        data:null

    })
});

app.post("/notes",async(req,res)=>{
    const {title,content,category}=req.body;

    if(!title){
        return res.json({
            success:false,
            message:"title is required",
            data:null
        })
    }

    if(!content){
        return res.json({
            success:false,
            message:"content is required",
            data:null
        })
    }

    if(!category){
        return res.json({
            success:false,
            message:"category is required",
            data:null
        })
    }

    const newNote =await Note.create({
        "title":title,
        "content":content,
        "category":category
,
    })

  

    res.json({
        success:true,
        message:"Note Added Sucessfully",
        data:newNote
    })
})

app.get("/notes/:id",async(req,res)=>{
    const {id}=req.params;

    const notes=await Note.findById(id);
    res.json({
        success:true,
        message:"Notes fetched sucessfully",
        data:notes
    })
})

app.put("/notes/:id",async(req,res)=>{
    const {id}=req.params;
    const{title,content,category}=req.body;
    await Note.updateOne({_id : id},{$set:{
        title:title,
        content:content,
        category:category
    }})

    res.json({
        success:true,
        message:"notes updated sucessfully",
        data:null
    })


})


app.delete("/notes/:id",async(req,res)=>{
    const{id}=req.params;
    await Note.deleteOne({_id :id});

    res.json({
        success:true,
        message:"Note Deleted Sucessfully",
        data:null
    })

})
const PORT=5000;

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT} port`);

});