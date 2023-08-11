import './App.css';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Signup from './components/Signup';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import PrivateComponent from './components/PrivateComponent';
import Login from './components/Login';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import UpdateProduct from './components/UpdateProduct';
import Profile from './components/Profile';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav/>
      <Routes>

        <Route element={<PrivateComponent/>}>
        <Route path='/' element={<ProductList/>}></Route>
        <Route path='/add' element={<AddProduct/>}></Route>
        <Route path='/update/:id' element={<UpdateProduct/>}></Route>
        {/* <Route path='/logout' element={<h1>logout</h1>}></Route> */}
        <Route path='/profile' element={<Profile/>}></Route>
        </Route>
        
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/login'  element={<Login/>}></Route>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
