import './App.css';
import styled from "styled-components";
import { useState } from 'react';
import { API } from './config';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter  as Router, Routes, Route} from 'react-router-dom';
import Login from './paginas/Login';
import Home from './paginas/Home';

function App() {
  

  return (
    

    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/home" element={<Home/>}/>
    </Routes>
    

  );
}

export default App;
