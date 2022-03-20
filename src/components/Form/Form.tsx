import {Button, TextField} from "@mui/material"
import React, { useState } from "react";
import {useNavigate} from 'react-router-dom'
import "./style/index.css";
import * as EmailValidator from "email-validator";

interface ISignUpData {
    login: string;
    password: string;
}

interface ISingUpErr{
    formError : string;
    login: string;
    password: string;
}

export const Form = () => {


    const [signUpData, setSignUpData] = useState<ISignUpData>({login: "", password: ""})
    const [error, setError] = useState<ISingUpErr>({formError: "", login: "", password: ""})
    const navigate = useNavigate();

    const hasErrors = ():boolean =>{

        let loginError = "", pwError = "";

        if (!EmailValidator.validate(signUpData.login))
            loginError= "The email is not a valid email address."
        if (signUpData.password === "")
            pwError = "Password cannot be empty."

        setError({...error, login:loginError, password:pwError})
        return loginError !== "" || pwError !== "";

    }

    const handleSubmit = (evt: React.FormEvent)  => {
        evt.preventDefault();
        console.log(hasErrors())
        if (hasErrors())
            return;

        // console.log("je suis ici")

        fetch("http://localhost:4000/login", {
            method: "POST",
            credentials: 'include',
            mode:"cors",
            body: JSON.stringify(signUpData),
                headers: {
                    "Content-Type": "application/json"
                }
        }).then(response => response.json())
        .then(response => response.err ? setError({...error, formError:response.err}) : navigate("/map"))
        .catch(err => setError({...error, formError:err}));
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
        <>
            <div/>
            <form className="container minTaille" onKeyPress={(e => {if (e.key==="Enter") handleSubmit(e)})}>
                <div className="form shadow">
                    <div className="formInput">
                        <TextField name="login" autoFocus fullWidth label={"Email address"} id="my-input" aria-describedby="my-helper-text" onChange={handleInput} error={error.login !== ""} helperText={error.login}/>
                    </div>
                    <div className="formInput">
                        <TextField name="pw" fullWidth label={"Password"} type="password" id="my-input" aria-describedby="my-helper-text" onChange={handleInput} error={error.password !== ""} helperText={error.password}/>
                    </div>

                    <p className="errorText">{error.formError}</p>

                    <div className="formInput container">
                        <Button variant="outlined" fullWidth={true} onClick={handleSubmit}>Login</Button>
                    </div>
                </div>
            </form>
            <div/>
        </>

)
} 