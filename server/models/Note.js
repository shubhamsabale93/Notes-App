import  {model,Schema} from 'mongoose'
const notesSchema=new Schema({
    title:String,
    content:String,
    category:String

})
const Note=model('Note',notesSchema);
export default Note