import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React, {useEffect, useState} from "react";
import "./style/index.css"

interface Props{
    open:boolean
    setOpen:(state:boolean) => void,
    setNewData:(state:boolean) => void,

}

interface IFormError{
    formError : string;
    name: boolean;
    descr: boolean;
    lat: boolean;
    lng: boolean;
}

interface IForm{
    name: string;
    descr: string;
    lat: string;
    lng: string;
    correct:boolean
}

export const FormDialog = (props:Props) => {

    const [error, setError] = useState<IFormError>({formError:"", name: false, descr:false, lat:false, lng:false})
    const [form, setForm] = useState<IForm>({name: "", descr:"", lat:"", lng:"", correct:false})

    const handleClose = () => {
        props.setOpen(false);
    };

    const handleFormSubmit = () => {

        if (hasErrors()) {
            setError({...error, formError: "Le formulaire contient des erreurs"})
            return;
        }
        postData()

    }
    const postData = async ():Promise<void> => {
        let data: Response = await fetch("http://localhost:4000/addRestaurant", {
            method: "POST",
            credentials: 'include',
            mode:"cors",
            body: JSON.stringify(form),
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (!data.ok){
            setError({...error, formError:await data.json()})
            return;
        }
        props.setNewData(true)
        handleClose()
    }

    useEffect(() => {

    }, [])

    const hasErrors = ():boolean =>{


        const toNumber = (str:String) => {
            str = String(str).trim();
            return !str ? NaN : Number(str);
        }

        let errors:boolean[] = [false, false, false, false];
        const fields: string[] = [form.name, form.descr, form.lat, form.lng]

        fields.forEach((v, i) =>  {
            if (v.trim() === "")
                errors[i] = true;

        })

        if(isNaN(toNumber(form.lat)))
            errors[2] = true
        if(isNaN(toNumber(form.lng)))
            errors[3] = true

        console.log(errors)
        setError({...error, name:errors[0], descr:errors[1], lat:errors[2], lng:errors[3]})
        return errors.includes(true);

    }


    return (
        <div>
            <Dialog open={props.open} onClose={handleClose}>
                <DialogTitle>Ajouter un nouveau restaurant</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Veuillez remplir ce formulaire afin d'ajouter un restaurant
                    </DialogContentText>
                    <div className="txtFieldContainer">

                        <TextField
                            autoFocus
                            margin="dense"
                            id="restaurantName"
                            label="Nom du restaurant"
                            type="text"
                            variant="outlined"
                            onChange={evt => setForm({...form, name: evt.target.value})}
                            error={error.name}
                        />
                        <TextField
                            margin="dense"
                            id="description"
                            label="Description"
                            type="text"
                            variant="outlined"
                            onChange={evt => setForm({...form, descr: evt.target.value})}
                            error={error.descr}
                        />
                    </div>

                    <div className="txtFieldContainer">
                        <TextField
                            margin="dense"
                            id="lat"
                            label="Lattitude"
                            type="number"
                            variant="outlined"
                            onChange={evt => setForm({...form, lat: evt.target.value})}
                            error={error.lat}
                        />
                        <TextField
                            margin="dense"
                            id="lng"
                            label="Longitude"
                            type="number"
                            variant="outlined"
                            onChange={evt => setForm({...form, lng: evt.target.value})}
                            error={error.lng}
                        />
                    </div>

                    <DialogContentText className="errorText">{error.formError}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Annuler</Button>
                    <Button onClick={handleFormSubmit}>Ajouter</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}