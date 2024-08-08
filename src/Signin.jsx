import React, { useEffect, useState } from 'react';
import './Signin.css'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { db } from './Fireconfig';
import { collection } from 'firebase/firestore';
import { addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';



function Signin() {
   const navigate = useNavigate();

  const [data,setData] = useState({
    email:" ",
    password:" "
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
   const handleSubmit = (e) => {
     e.preventDefault();
     // Handle form submission logic here
     console.log("Form submitted:", data);
     const auth = getAuth();
     signInWithEmailAndPassword(auth, data.email, data.password)
       .then((userCredential) => {
         // Signed in
         const user = userCredential.user;
         // ...
         console.log(userCredential);
      
         const docRef = addDoc(collection(db, "userInfo"), {
          
           email: data.email,
           password: data.password,
          
         });
            localStorage.setItem("signInEmail", data.email);
            if (data.email == "nd2405@gmail.com") {
              navigate("/AdminHomec");
            }
       })
       .catch((error) => {
         const errorCode = error.code;
         const errorMessage = error.message;
         console.log(error);
       }).then((r)=>{
        console.log(e);
       }).catch((error)=>{console.log(error)})
   };
   
     return (
       <div className="signin my-10">
         <div className="signin-form  ">
           <h1 className="text-2xl font-bold text-[#5e7ad6]">Sign In</h1>
           <form>
             <div className="form-group">
               <label htmlFor="email" className="font-bold">
                 Email:
               </label>
               <input
                 type="email"
                 id="email"
                 name="email"
                 onChange={handleChange}
               />
             </div>
             <div className="form-group">
               <label htmlFor="password" className="font-bold">
                 Password:
               </label>
               <input
                 type="password"
                 id="password"
                 name="password"
                 onChange={handleChange}
               />
             </div>
             <button type="submit" onClick={handleSubmit}>
               Sign In
             </button>
           </form>
         </div>
       </div>
     );
}

export default Signin