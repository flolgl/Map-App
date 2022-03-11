import React, {useEffect} from 'react';
import {Routes, Route, Link, useNavigate, useLocation} from "react-router-dom";
import './App.css';
import { Form } from './components/Form/Form';
import {Map} from "./pages/Map/Map";

const App:React.FC = () => {

    const navigate = useNavigate();
    const location = useLocation()

    useEffect(() => {
        fetch("http://localhost:4000/login", {
            credentials: 'include',
            method: "GET",
            mode:"cors",
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin':'http://localhost:4000/',
            }
        }).then(response => response.json())
        .then(response => {
            if (!response.loggedIn)
                return navigate("/")

            if (location.pathname === "/")
                navigate("/map")
        })

    }, [navigate])
  return (
    <div className='app'>
{/*        <div className='form'>
            <Form/>
        </div>*/}
        <Routes>
            <Route path="/" element={<Form/>} />
            <Route path="map" element={<Map/>} />
        </Routes>

    </div>
  )
}
export default App;
