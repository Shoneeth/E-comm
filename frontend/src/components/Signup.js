import React,{useState,useEffect} from 'react'; 
import {useNavigate} from 'react-router-dom';

export default function Signup() {
      const [name,setName]=useState("");
      const [email,setEmail]=useState("");
      const [password,setPassword]=useState("");

      const navigate=useNavigate();

      useEffect(()=>{
        const auth =localStorage.getItem('user');
        if(auth){
          navigate('/');
        }
      },[]);

      const collectData = async(e)=>{
            //console.log(name,email,password);
            e.preventDefault()
            let result= await fetch('https://e-comm-sand.vercel.app/register',{
              method:'post',
              body: JSON.stringify({name,email,password}),
              headers:{
                'Content-Type':'application/json'
              }
            })
            result= await result.json();
            console.log(result);
            localStorage.setItem("user",JSON.stringify(result.result));
            localStorage.setItem("token",JSON.stringify(result.auth));
            navigate('/')
      }

  return (
    <div className='register'>
      <h1>Register</h1>
      <form onSubmit={collectData}>
      <input className='inputBox' type='text' placeholder='name' value={name} onChange={(e)=>setName(e.target.value)}></input>
      <input className='inputBox' type='email' placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)}></input>
      <input className='inputBox' type='password' placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)}></input>
      <button className='appbutton' type='submit'>Signup</button>
      </form>
    </div>
  )
}
