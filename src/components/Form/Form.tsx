import { FormControl, Button, Input, InputLabel } from "@mui/material"
import React, { useState } from "react";
import {useNavigate} from 'react-router-dom'
import "./style/index.css";
import * as EmailValidator from "email-validator";

interface ISignUpData {
    login: string;
    password: string;
}

interface ISingUpErr{
    login: boolean;
    password: boolean;
}

export const Form = () => {


    const [signUpData, setSignUpData] = useState<ISignUpData>({login: "", password: ""})
    const [error, setError] = useState<ISingUpErr>({login: false, password: false})
    const navigate = useNavigate();

    const hasErrors = ():boolean =>{

        let loginError = false, pwError = false;

        if (!EmailValidator.validate(signUpData.login))
            loginError=true
        if (signUpData.password === "")
            pwError = true

        setError({login:loginError, password:pwError})
        return loginError || pwError;

    }

    const handleSubmit = (evt: React.FormEvent)  => {
        evt.preventDefault();
        console.log(hasErrors())
        if (hasErrors())
            return;

        console.log("je suis ici")

        fetch("http://localhost:4000/login", {
            method: "POST",
            credentials: 'include',
            mode:"cors",
            body: JSON.stringify(signUpData),
                headers: {
                    "Content-Type": "application/json"
                }
        }).then(response => response.json())
        .then(response => console.log("Success:", JSON.stringify(response)))
        .then(() => navigate("/map"))
        .catch(err => setError(err));
    };

    const handleInput = (evt: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const name = evt.target.name;
        const newValue = evt.target.value;
        if (name === "login")
            setSignUpData({...signUpData, login: newValue});
        else
            setSignUpData({...signUpData, password: newValue});
    };

    return (
        <form className="container minTaille" onKeyPress={(e => {if (e.key==="Enter") handleSubmit(e)})}>
            <div className="form shadow">
                <div className="formInput">
                    <FormControl>
                        <InputLabel htmlFor="my-input">Email address</InputLabel>
                        <Input name="login" id="my-input" aria-describedby="my-helper-text" onChange={handleInput} error={error.login}/>
                    </FormControl>
                </div>
                <div className="formInput">
                    <FormControl>
                        <InputLabel htmlFor="my-input">Password</InputLabel>
                        <Input name="pw" type="password" id="my-input" aria-describedby="my-helper-text" onChange={handleInput} error={error.password}/>
                    </FormControl>
                </div>

                <div className="formInput container">
                    <Button variant="outlined" fullWidth={true} onClick={handleSubmit}>Login</Button>
                </div>
            </div>
        </form>
    )
} 