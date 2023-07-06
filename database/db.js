import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const Connection=async()=>{
    const URL=`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@ac-iie0xgi-shard-00-00.vf1t7wy.mongodb.net:27017,ac-iie0xgi-shard-00-01.vf1t7wy.mongodb.net:27017,ac-iie0xgi-shard-00-02.vf1t7wy.mongodb.net:27017/?ssl=true&replicaSet=atlas-3acrux-shard-0&authSource=admin&retryWrites=true&w=majority`
    try{
       await mongoose.connect(URL,{useNewUrlParser:true,useUnifiedTopology: true})
       console.log('Database connected successfully')
    }
    catch(error){
        console.log('Error while connecting to the database',error)
    }
}
export default Connection