import React from 'react'
import { useNavigate } from 'react-router-dom';
//import './Navbar.css'
//import { TiDocumentAdd } from "react-icons/ti";


function Navbar() {
    const navigate = useNavigate();
   
  return (
    <div>
      <div className="flex place-content-between  bg-slate-400 py-5 border-b-4 border-[#778dc6]">
        <div className="navleft mx-10">
          {" "}
          <h2 className="font-extrabold font-serif text-3xl underline">
            Sample Site
          </h2>
          <div className="flex flex-row gap-3">
            <h4 className="font-medium font-serif">Hello......</h4>
            <p className="email hover:underline-offset-4 hover:text-white font-medium font-serif">
              {localStorage.getItem("signInEmail")}
            </p>
          </div>
        </div>
        <div className="flex gap-5 mx-10 text-[#376748]  ">
          <div></div>
          <h2
            className="font-extrabold  hover:text-white"
            onClick={() => {
              navigate("/");
            }}
          >
            Home
          </h2>
          <h2
            className=" hover:text-white font-extrabold"
            onClick={() => {
              navigate("/Addproduct");
            }}
          >
            Addproduct
          </h2>

          <h3
            className=" hover:text-white font-extrabold"
            onClick={() => {
              navigate("/Signup");
            }}
          >
            Signup
          </h3>
          <h3
            className=" hover:text-white font-extrabold"
            onClick={() => {
              navigate("/Signin");
            }}
          >
            Signin
          </h3>
          <h3
            className=" hover:text-white font-extrabold"
            onClick={() => {
              navigate("/Signout");
            }}
          >
            Signout
          </h3>
        </div>
      </div>
    </div>
  );
}

export default Navbar