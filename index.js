const express = require('express')

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const bodyParser=require('body-parser')
const cors=require('cors')
require('dotenv').config()

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gyuhd.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const app = express()


const port = process.env.PORT || 8080
app.use(bodyParser.json())
app.use(cors())






const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const booksCollection = client.db("bookShop").collection("books");
  const orderCollection = client.db("bookShop").collection("bookOrders");
  // console.log("database connected")

  app.post('/addBooks',(req,res)=>{
      const newBook=req.body;
      console.log(newBook)
      booksCollection.insertOne(newBook)
      .then(result=>{
          // console.log(result.insertedCount)
          res.send(result.insertedCount>0)
      })

  })
  app.get('/books',(req,res)=>{
    booksCollection.find({})
    .toArray((err,items)=>{
        res.send(items)
    })
})

app.delete('/delete/:id', (req,res) => {
  booksCollection.deleteOne({_id:ObjectId( req.params.id)})
  .then((result)=> {
   
  })
})



app.post('/detailsOrder',(req,res)=>{
  const order=req.body; 
  // console.log(products)
  orderCollection.insertOne(order)
  .then(result=>{
 
      res.send(result.insertedCount > 0)
  })
})


app.get('/sendInfo',(req,res)=>{
  orderCollection.find({})
  .toArray((err,items)=>{
      res.send(items)
      console.log(items)
  })
})
 
});




app.listen(port)