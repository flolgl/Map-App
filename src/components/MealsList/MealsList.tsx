import "./style/index.css";
import React, {useEffect, useState} from "react";
import {MealItem} from "./MealItem";
import {Loading} from "../Loading/Loading";
import {LatLngTuple} from "leaflet";

export interface restoObject{
    id:number,
    nom:string,
    descriptif:string,
    location:LatLngTuple

}

export const MealsList:any = () =>{

    const [data, setData] = useState<restoObject[]>();

    useEffect(() => {
        if(data)
            return;

        // fonction fléchée nécessaire car await
        const fetchData = async ():Promise<void> => {
            let data: Response = await fetch("http://localhost:4000/getData", {
                credentials: 'include',
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    'Access-Control-Allow-Origin': 'http://localhost:4000/',
                }
            })
            // let datasTab:restoObject[] = JSON.parse(await data.text())

            setData(await parseDataLocation(JSON.parse(await data.text())))
            //setData({dataTab:todoData})
            //console.log(typeof datasTab[0].location[0]);
        }
        fetchData();

    },[data]);

    const parseDataLocation = async (data: restoObject[]) => {
        await data.forEach(((value, index) => {

            data[index].location = JSON.parse(value.location.toString())


        }))
        return data
    }

    const getElements = (data:restoObject[]) =>(
        <>
            {data.map(value => (
                <MealItem item={value}/>

            ))}
        </>
    )

    return(
        <div className="listContainer">
            {data?getElements(data): <Loading/>}
        </div>
    )
}

