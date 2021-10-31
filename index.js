const express =require('express');
const { MongoClient } = require('mongodb');
const cors =require('cors');
require('dotenv').config()
const app =express();
const port=process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.01vip.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
async function run() {
  try {
    await client.connect();
    const database = client.db("foodmami");
    const haiku = database.collection("offer");
    // get api 
    app.get('/offers', async(req,res)=>{
      const cursor = haiku.find({});
      const offers =await cursor.toArray()
      res.send(offers);
    } );
    // get single service 
    app.get('/services/:id',async(req,res)=>{
      const id =req.params.id;
    })

    //Get single Service
    app.get('/offers/:id',async(req,res)=>{
      const id =req.params.id;
      const query ={_id:ObjectId(id)};
      const offers =await haiku .findOne(query);
      res.json(offer);
    })
    // post api
    app.post('/offers', async (req,res)=>{
      const offers =req.body;
      console.log('hitting',offers)

      const result =await haiku.insertOne(offers);
      console.log(result)
      res.json(result)
    })
    // Delete api 
    app. delete('/offer/:id',async(req,res)=>{
      const id =req.params.id;
      const query={_id:ObjectId(id)};
      const result =await haiku.deleteOne(query);
      res.json(result);
    })
  } finally {
  //   await client.close();
  }
}
run().catch(console.dir);

app.get('/',(req,res)=>{
    res.send('FoodMami server is running')
});
app.listen(port,()=>{
    console.log('server running at port',port);
});