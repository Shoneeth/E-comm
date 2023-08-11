import React ,{useState,useEffect,} from "react";
import { useParams,useNavigate } from "react-router-dom";
const UpdateProduct=()=>{
      const [name,setName]=useState("");
      const [price,setPrice]=useState("");
      const [category,setCategory]=useState("");
      const [company,setCompany]=useState("");
      // const [error,setError]=useState(false);
      const navigate=useNavigate();
      const Params = useParams();
      useEffect(()=>{
            getProductDetails();
      },[])

      const getProductDetails = async()=>{
            let result = await fetch(`https://e-comm-sand.vercel.app/product/${Params.id}`,{
                  headers:{
                        authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`
                  }
            })
            result = await result.json();
            setName(result.name)
            setPrice(result.price)
            setCategory(result.category)
            setCompany(result.company)
      }

      const updateProduct= async()=>{
            let result = await fetch(`https://e-comm-sand.vercel.app/product/${Params.id}`,{
                  method:'put',
                  body:JSON.stringify({name,price,category,company}),
                  headers:{
                        'Content-Type':'application/json',
                        authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`
                  }
            });
            result = await result.json();
            navigate('/')
      }

      return(
      <div className='products'>
      <h1>Update Product</h1>
      {/* <form onSubmit={addProduct}> */}
      <input className='inputBox' type='text' placeholder='name' value={name} onChange={(e)=>setName(e.target.value)}></input>


      <input className='inputBox' type='text' placeholder='price' value={price} onChange={(e)=>setPrice(e.target.value)}></input>
     

      <input className='inputBox' type='text' placeholder='category' value={category} onChange={(e)=>setCategory(e.target.value)}></input>
     

      <input className='inputBox' type='text' placeholder='company' value={company} onChange={(e)=>setCompany(e.target.value)}></input>
      

      <button className='appbutton' type='button' onClick={updateProduct}>Update</button>
      {/* </form> */}
     </div>
      )
}

export default UpdateProduct;
