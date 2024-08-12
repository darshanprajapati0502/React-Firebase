import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route}  from "react-router-dom";
import Signup from './Signup';
import Signin from './Signin';
import Home from './Home';
import Addproduct from './Addproduct';
import Navbar from './Navbar';
import Model from './Model';
import SignOutPage from './Signout';
import UpdateProduct from './UpdateProduct';
import AdminHome from './AdminHome';


function App() {
  return (
    <div className="App ">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/Addproduct" element={<Addproduct />}></Route>
          <Route path="/AdminHome" element={<AdminHome />}></Route>
          <Route path="/Signup" element={<Signup />}></Route>
          <Route path="/Signin" element={<Signin />}></Route>
          <Route path="/Signout" element={<SignOutPage />}></Route>
          <Route path="/Update/:pId" element={<UpdateProduct />}></Route>
          {/* <Route path="/Model" element={<Model />}></Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
