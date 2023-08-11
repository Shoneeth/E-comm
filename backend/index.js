const express = require('express');
const cors = require('cors');
require('./dbs/configdb');
const User = require('./dbs/user');
const Product = require('./dbs/product');
const Jwt= require('jsonwebtoken');
const jwtkey ='e-comm';

const app=express();
app.use(express.json());
app.use(cors());

app.get("/",(req,resp)=>{
      resp.json("hello");
})

app.post("/register",async (req,resp)=>{
      let user = new  User(req.body);
      let result = await user.save();
      result = result.toObject();
      delete result.password;
      Jwt.sign({result},jwtkey,{expiresIn:"2h"},(err,token)=>{
            if(err){
                  resp.send({result:"Oops, something went wrong"})
            }
            resp.send({result,auth:token}) 
      })
})

app.post("/login",async (req,resp)=>{ 
      let user = await User.findOne(req.body).select("-password")
      if(req.body.password && req.body.email){
      if(user){
            Jwt.sign({user},jwtkey,{expiresIn:"2h"},(err,token)=>{
                  if(err){
                        resp.send({result:"Oops, something went wrong"})
                  }
                  resp.send({user,auth:token}) 
            })
      }
      else{
            resp.send({result:"No user found"})
      }
      }
      else{
            resp.send({result:"No user found"})
      }
      
})

app.post("/add-product",verifyToken, async(req,resp) =>{
    let product = new Product(req.body)
    let result = await product.save();
    resp.send(result);
})

app.get("/products",verifyToken,async(req,resp)=>{
      let product = await Product.find();
      if(product.length>0){
            resp.send(product);
      }else{
            resp.send({result:"no product found"})
      }
})

app.delete("/product/:id",verifyToken,async (req,resp)=>{
      const result = await Product.deleteOne({_id:req.params.id})
      resp.send(result);
})

app.get("/product/:id",verifyToken,async (req,resp)=>{
      let result = await Product.findOne({_id:req.params.id})
      if(result){
            resp.send(result)
      }else{
            resp.send({result:"no product found"})
      }
})

app.put("/product/:id",verifyToken,async(req,resp)=>{
      let result = await Product.updateOne(
            {_id:req.params.id},
            {
                  $set:req.body
            }
      )
      resp.send(result)
})

app.get("/search/:key",verifyToken,async (req,resp)=>{
      let result = await Product.find({
            "$or":[
                  {name:{$regex:req.params.key}},
                  {category:{$regex:req.params.key}},
                  {company:{$regex:req.params.key}},
            ]
      })
      resp.send(result)
})
function verifyToken(req,resp,next){
      //middleware
      let token = req.headers['authorization'];
      if(token){
            token=token.split(' ')[1];
            Jwt.verify(token,jwtkey,(err,valid)=>{
                  if(err){
                        resp.status(401).send({result:"please add valid token to header"})
                  }else{
                        next();
                  }
            })
      }else{
            resp.status(403).send({result:"please add token to header"})
      }
}


app.listen(5000);
