import React ,{useState,useEffect }from "react";
import { Link } from "react-router-dom";

const ProductList =()=>{
      const [products,setProducts]=useState([]);

      useEffect(()=>{
            getproducts();
      },[])

      const getproducts = async ()=>{
            let result = await fetch("http://localhost:5000/products",{
                  headers:{
                        authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`  
                  }
            })
            result = await result.json();
            setProducts(result)
      }

      const deleteProduct = async(id) => {
            let result = await fetch(`http://localhost:5000/product/${id}`,{
                  method:"Delete",
                  headers:{
                        authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`
                  }
            })
            result = await result.json()
            if(result){
                  getproducts();
            }
      }
      const searchHandle = async (e)=>{
            let key = e.target.value;
            let result = await fetch(`http://localhost:5000/search/${key}`,{
                  headers:{
                  authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`
                  }
            })
            result = await result.json()
            if(result){
                  setProducts(result)
            }else{
                  getproducts();
            }
      }

      return(
            <div className="productList">
                  <h3>Products list</h3>
                  <input className="search" type="text" placeholder="search product" onChange={searchHandle}/>
                  <ul>
                        <li>S.No</li>
                        <li>Name</li>
                        <li>Price</li>
                        <li>Category</li>
                        <li>Operation</li>
                  </ul>
                  {     
                        products.length>0 ? products.map((item,index)=>
                        <ul key={item._id}>
                        <li>{index+1}</li>
                        <li>{item.name}</li>
                        <li>Rs.{item.price}</li>
                        <li>{item.category}</li>
                        <li><button onClick={()=> deleteProduct(item._id)}>Delete</button>
                        <Link to={'/update/'+ item._id}>Update</Link>
                        </li>
                        </ul>
                        )
                        : <h1>NO match found</h1>
                  }
            </div>
      )
}

export default ProductList;