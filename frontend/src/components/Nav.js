import React from "react";
import { NavLink,useNavigate } from "react-router-dom";

const Nav= ()=>{
      const auth =localStorage.getItem('user');
      const navigate = useNavigate();
      const logout = ()=>{
            localStorage.clear();
            navigate('/signup');
      }
      return(
           <div>
            <NavLink to="/"><span className="logo">E-Comm</span></NavLink>
            { auth ?<ul className="nav-ul">
                  <li><NavLink to="/">Products</NavLink></li>
                  <li><NavLink to="/add">Add products</NavLink></li>
                  {/* <li><NavLink to="/update">update products</NavLink></li> */}
                  <li><NavLink to="/profile">Profile</NavLink></li>
                  <li><NavLink onClick={logout} to="/signup">Logout({JSON.parse(auth).name})</NavLink></li>
            </ul>
            :
            <ul className="nav-ul nav-right">
                  <li><NavLink to="/signup">Signup</NavLink></li>
                  <li><NavLink to="/login">Login</NavLink></li>
            </ul>
            }
           </div>
      )
}
export default Nav;