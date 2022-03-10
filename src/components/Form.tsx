import { FormControl, Button, Input, InputLabel } from "@mui/material"
import React, { useState } from "react";
import "./style/Form.css";
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


    const hasErrors = ():boolean =>{
        setError({login: false, password:false})

        //console.log(signUpData)
        //console.log(EmailValidator.validate(signUpData.login))
        
        if (!EmailValidator.validate(signUpData.login))
            setError({...error, login: true})
        if (signUpData.password === "")
            setError({...error, password: true})
        return !error.password && !error.login;
    }

    const handleSubmit = (evt: React.FormEvent)  => {
        evt.preventDefault();
        if (!hasErrors())
            return console.log("erruer");

        fetch("http://localhost:4000/login", {
            method: "POST",
            body: JSON.stringify(signUpData),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => response.json())
        .then(response => console.log("Success:", JSON.stringify(response)))
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
        <div className="container minTaille">
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
                        <Input name="pw" type="password"id="my-input" aria-describedby="my-helper-text" onChange={handleInput} error={error.password}/>
                    </FormControl>
                </div>

                <div className="formInput container">
                    <Button variant="outlined" fullWidth={true} onClick={handleSubmit}>Login</Button>
                </div>
            </div>
        </div>
    )
} 