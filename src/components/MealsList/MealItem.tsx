import curry from "../../assets/images/curry.png";
import {IconButton} from "@mui/material";
import DirectionsIcon from "@mui/icons-material/Directions";
import React, {useState} from "react";
import {AlertDialog} from "../Dialog/Dialog";
import {restoObject} from "./MealsList";
import {Marker, Popup} from "react-leaflet";
import {LatLngTuple} from "leaflet";

interface Props{
    item:restoObject
}

export const MealItem = (props:Props) => {
    /**
     * Used to display dialog popup
     */
    const [dialogOpened, setDialogOpened] = useState(false);
    /**
     * Used to know if button has been pressed
     * if true, pin location is showed
     */
    const [locationPin, setlocationPin] = useState(false);

    const showItemLocationPin = (location:LatLngTuple) => (
        <Marker position={location}>
            <Popup>
                {props.item.nom}
            </Popup>
        </Marker>
    )

    return (
        <div className="mealContainer">
            <img className="mealItem" src={curry} alt="curry"/>
            <div className="mealItem textItem itemIcon">
                <h1 className="text">{props.item.nom}</h1>
                <p className="text">{props.item.descriptif}</p>
            </div>
            <div className="mealItem itemIcon">
                <div className="">
                    <IconButton aria-label="Direction" size="large" onClick={() => {
                        setDialogOpened(!dialogOpened)
                        setlocationPin(true)

                    }}>
                        {locationPin?showItemLocationPin(props.item.location):null}

                        <DirectionsIcon fontSize="large"  />
                    </IconButton>
                    <AlertDialog open={dialogOpened} setOpen={setDialogOpened}/>
                </div>
            </div>

        </div>
    )
}


