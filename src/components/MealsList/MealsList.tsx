import "./style/index.css";
import React, {SetStateAction, useEffect, useState} from "react";
import {Location, MarkerLoc} from "../Map/LeafletMap";
import {MealItem} from "./MealItem";

export interface LocationSetter {
    locationSetter:React.Dispatch<SetStateAction<Location>>;
}

interface Props{
    locationSetter:React.Dispatch<SetStateAction<Location>>,
    markerTabSetter:React.Dispatch<SetStateAction<MarkerLoc>>,
    markers:MarkerLoc
}

interface restoObject{
    id:number,
    name:string,
    description:string,
    location:Location

}

interface restoData{
    dataTab:restoObject[]
}

export const MealsList:any = (props:Props) =>{

    const [data, setData] = useState<restoData>();
    console.log(props)
    console.log(props.markers)
    useEffect(() => {
        fetch("http://localhost:4000/getData", {
            credentials: 'include',
            method: "GET",
            mode:"cors",
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin':'http://localhost:4000/',
            }
        }).then((res) => {res.json()})
            .then(res => console.log(res))

    },[]);

    return(
        <div className="listContainer">
            <MealItem locationSetter={props.locationSetter} markerTabSetter={props.markerTabSetter} markers={props.markers}/>
            <MealItem locationSetter={props.locationSetter} markerTabSetter={props.markerTabSetter} markers={props.markers}/>
            <MealItem locationSetter={props.locationSetter} markerTabSetter={props.markerTabSetter} markers={props.markers}/>
            <MealItem locationSetter={props.locationSetter} markerTabSetter={props.markerTabSetter} markers={props.markers}/>
            <MealItem locationSetter={props.locationSetter} markerTabSetter={props.markerTabSetter} markers={props.markers}/>
            <MealItem locationSetter={props.locationSetter} markerTabSetter={props.markerTabSetter} markers={props.markers}/>
            <MealItem locationSetter={props.locationSetter} markerTabSetter={props.markerTabSetter} markers={props.markers}/>
            <MealItem locationSetter={props.locationSetter} markerTabSetter={props.markerTabSetter} markers={props.markers}/>
            <MealItem locationSetter={props.locationSetter} markerTabSetter={props.markerTabSetter} markers={props.markers}/>
            <MealItem locationSetter={props.locationSetter} markerTabSetter={props.markerTabSetter} markers={props.markers}/>
            <MealItem locationSetter={props.locationSetter} markerTabSetter={props.markerTabSetter} markers={props.markers}/>
            <MealItem locationSetter={props.locationSetter} markerTabSetter={props.markerTabSetter} markers={props.markers}/>
            <MealItem locationSetter={props.locationSetter} markerTabSetter={props.markerTabSetter} markers={props.markers}/>
            <MealItem locationSetter={props.locationSetter} markerTabSetter={props.markerTabSetter} markers={props.markers}/>
            <MealItem locationSetter={props.locationSetter} markerTabSetter={props.markerTabSetter} markers={props.markers}/>

        </div>
    )
}

