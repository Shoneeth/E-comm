import React ,{useState,useEffect} from "react";
// import { useNavigate } from "react-router-dom";
const AddProduct=()=>{
      const [name,setName]=useState("");
      const [price,setPrice]=useState("");
      const [category,setCategory]=useState("");
      const [company,setCompany]=useState("");
      const [error,setError]=useState(false);
      // const navigate=useNavigate();
      const addProduct= async()=>{
            // e.preventDefault();
            if(!name || !category || !price || !company){
                  setError(true);
                  return false;
            }

            const userId = JSON.parse(localStorage.getItem('user'))._id;
            let result = await fetch("http://localhost:5000/add-product",{
                  method:'post',
                  body:JSON.stringify({name,price,category,userId,company}),
                  headers:{
                        'Content-Type':'application/json',
                        authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`
                  }
            });
            result = await result.json();
      }

      return(
      <div className='products'>
      <h1>Add Product</h1>
      {/* <form onSubmit={addProduct}> */}
      <input className='inputBox' type='text' placeholder='name' value={name} onChange={(e)=>setName(e.target.value)}></input>
      {error && !name && <span className="invalid" >Enter valid name</span>}

      <input className='inputBox' type='text' placeholder='price' value={price} onChange={(e)=>setPrice(e.target.value)}></input>
      {error && !price && <span className="invalid" >Enter valid price</span>}

      <input className='inputBox' type='text' placeholder='category' value={category} onChange={(e)=>setCategory(e.target.value)}></input>
      {error && !category && <span className="invalid" >Enter valid category</span>}

      <input className='inputBox' type='text' placeholder='company' value={company} onChange={(e)=>setCompany(e.target.value)}></input>
      {error && !company && <span className="invalid" >Enter valid company</span>}

      <button className='appbutton' type='button' onClick={addProduct}>ADD</button>
      {/* </form> */}
     </div>
      )
}

export default AddProduct;