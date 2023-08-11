import React,{useState,useEffect,useRef} from "react";
import {useNavigate} from 'react-router-dom';

const Login =()=>{
      const [email,setEmail]=useState("");
      const [password,setPassword]=useState("");
      const navigate = useNavigate();
      useEffect(()=>{
            const auth =localStorage.getItem('user');
            if(auth){
              navigate('/');
            }
      },[]);
      const loginHandle=async(e)=>{
            //console.log(name,email,password);
            e.preventDefault();
            let result= await fetch('https://e-comm-sand.vercel.app/login',{
              method:'post',
              body: JSON.stringify({email,password}),
              headers:{
                'Content-Type':'application/json'
              }
            })

            result= await result.json();
            console.log(result);
            if(result.auth){
            localStorage.setItem("user",JSON.stringify(result.user));
            localStorage.setItem("token",JSON.stringify(result.auth));
            navigate('/')
            }else{
                  alert('please enter correct details');
            }
      }
      return(
      <div className='login'>
      <h1>Login</h1>
      <form onSubmit={loginHandle}>
      <input className='inputBox' type='email' placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)}></input>
      <input className='inputBox' type='password' placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)}></input>
      <button className='appbutton' type='submit'>Login</button>
      </form>
    </div>
 )
}

export default Login;
