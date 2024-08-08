import React, { useState } from 'react';
import './Signup.css'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";

//import { App } from "./Fireconfig";
import { db } from "./Fireconfig";

function Signup() {
  const [data, setData] = useState({
    username: " ",
    email: " ",
    password: " ",
    address:"",
   
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    alert(JSON.stringify(data));

    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(userCredential);
        const docRef =  addDoc(collection(db, "userInfo"), {
          Name: data.username,
          email: data.email,
          password: data.password,
          address: data.address,
        })
          
        console.log("Document written with ID: ", docRef?.id);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log( error);
        // ..
      });
  };

  return (
    <div className="py-20">
      <div className="Signup">
        <form action="">
          <h1 className="text-2xl font-bold text-[#5e7ad6]">Sign up</h1>
          <div>
            <label htmlFor="name " className="font-bold">
              Name:
            </label>
            <input
              onChange={(e) => {
                setData({ ...data, username: e.target.value });
              }}
              type="text"
              id="name"
              name="name"
            />
          </div>
          <div>
            <label htmlFor="email" className="font-bold">
              Email:
            </label>
            <input
              onChange={(e) => {
                setData({ ...data, email: e.target.value });
              }}
              type="email"
              id="email"
              name="email"
            />
          </div>
          <div>
            <label htmlFor="password" className="font-bold">
              Password:
            </label>
            <input
              onChange={(e) => {
                setData({ ...data, password: e.target.value });
              }}
              type="password"
              id="password"
              name="password"
            />
          </div>
          <div>
            <label htmlFor="name" className="font-bold">
              Address:
            </label>
            <input
              onChange={(e) => {
                setData({ ...data, address: e.target.value });
              }}
              type="text"
              id="address"
              name="address"
            />
          </div>

          <button onClick={handleSubmit} type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup