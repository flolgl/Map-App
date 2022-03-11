import curry from "../../assets/images/curry.png";
import {IconButton} from "@mui/material";
import DirectionsIcon from "@mui/icons-material/Directions";
import React, {SetStateAction, useState} from "react";
import {Location, MarkerLoc} from "../Map/LeafletMap";
import {LatLngTuple} from "leaflet";
import {AlertDialog} from "../Dialog/Dialog";

interface Props{
    locationSetter:React.Dispatch<SetStateAction<Location>>,
    markerTabSetter:React.Dispatch<SetStateAction<MarkerLoc>>,
    markers:MarkerLoc

}

export const MealItem = (props:Props) => {
    const [open, setOpen] = useState(false);
    const [userLocation, setUserLocation] = useState<Location | null>(null)

    console.log(userLocation)

    const addMarker = (loc: LatLngTuple) => {
        const newMarkers = props.markers.markerTab
        newMarkers.push(loc)
        props.markerTabSetter({markerTab: newMarkers})
    }

    return (
        <div className="mealContainer">
            <img className="mealItem" src={curry} alt="curry"/>
            <div className="mealItem textItem itemIcon">
                <h1 className="text">Curry rice</h1>
                <p className="text">C'est si doux !</p>
            </div>
            <div className="mealItem itemIcon">
                <div className="">
                    <IconButton aria-label="Direction" size="large" onClick={() => {
                        setOpen(!open)
                        navigator.geolocation.getCurrentPosition((res) => {
                            setUserLocation({LatLng: [res.coords.latitude, res.coords.longitude]})
                            props.locationSetter({LatLng: [res.coords.latitude, res.coords.longitude]})
                            addMarker([res.coords.latitude, res.coords.longitude])
                        })
                    }}>
                        <DirectionsIcon fontSize="large"  />
                    </IconButton>
                    <AlertDialog open={open} setOpen={setOpen}/>
                </div>
            </div>

        </div>
    )
}


