import React from "react";

const Profile = ()=>{
      const profile = localStorage.getItem('user');
      return(
            <div className="profile">
                  <img  className="profileImg" src='profile.jpg' alt="profile"></img>
                  <p className="prof">Name : <span className="pf">{JSON.parse(profile).name}</span></p>
                  <p className="prof">E-mail : <span className='pf'>{JSON.parse(profile).email}</span></p>
            </div>
      )
}
export default Profile;