import "./style/index.css";
import React, {useEffect, useState} from "react";
import {MealItem} from "./MealItem";
import {Loading} from "../Loading/Loading";
import L, {LatLngTuple} from "leaflet";
import {AlertDialog} from "../Dialog/Alert/Dialog";
import RoutingMachine, {instance} from "../Map/RoutingMachine";
import {Button} from "@mui/material";
import {FormDialog} from "../Dialog/Form/FormDialog";
import {useMap} from "react-leaflet";

export interface restoObject{
    id:number,
    nom:string,
    descriptif:string,
    location:[number, number],
    upvotes:number
    lettre:string
    site:string | null
}

let controls: L.Routing.Control[] = [];

export const MealsList:any = () =>{

    const map = useMap()

    const [data, setData] = useState<restoObject[]>();
    /**
     * User's location
     */
    const [userLocation, setUserLocation] = useState<LatLngTuple | null>(null)


    /**
     * Used to display dialog popup
     */
    const [dialogOpened, setDialogOpened] = useState(false);

    /**
     * Used to display dialog popup
     */
    const [formDialogOpened, setFormDialogOpened] = useState(false);

    /**
     * Used to know if restaurant has been added
     */
    const [newData, setNewData] = useState<boolean>(false)

    /**
     * Used for routes
     */
    const [routes, setRoutes] = useState<LatLngTuple[] | null>(null)

    useEffect(() => {
        console.log("render")

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

            if(!data.ok)
                return;

            setData(await parseDataLocation(JSON.parse(await data.text())))
            //setNewData(false)
            //setData({dataTab:todoData})
            //console.log(typeof datasTab[0].location[0]);
        }
        fetchData();
        navigator.geolocation.getCurrentPosition(position=>setUserLocation([position.coords.latitude, position.coords.longitude]), err => setDialogOpened(!dialogOpened));


    }, [newData]);


    const parseDataLocation = async (data: restoObject[]) => {
        await data.forEach(((value, index) => {

            data[index].location = JSON.parse(value.location.toString())


        }))
        return data
    }

    const getElements = (data:restoObject[]) =>(
        <>
            {data.map(value => (
                <MealItem item={value} setLocationRoute={setRoutes} userLocation={userLocation}/>

            ))}
        </>
    )

    const addRestoButton = () => {
        setFormDialogOpened(!formDialogOpened);
    }

    const getItineraire = () => {

        if(!routes || !userLocation)
            return;

        if(!instance)
            console.log()


        if(controls.length !==0){
            map.removeControl(controls[0])
            controls.pop()
        }
        const waypoints = [
            L.latLng(routes[0]),
            L.latLng(userLocation)
        ]

        let control = L.Routing.control({
            waypoints: waypoints,
            show: true,
            addWaypoints: false,
            routeWhileDragging: true,
            fitSelectedRoutes: true,
            showAlternatives: false,
            plan: L.Routing.plan(waypoints, {
                createMarker: function (i, wp) {
                    return L.marker(wp.latLng, {
                        draggable: true,
                        icon: i === 0 ?
                            new L.Icon({
                                iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
                                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                                iconSize: [25, 41],
                                iconAnchor: [12, 41],
                                popupAnchor: [1, -34],
                                shadowSize: [41, 41]
                            })
                            :
                            new L.Icon({
                                iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png',
                                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                                iconSize: [25, 41],
                                iconAnchor: [12, 41],
                                popupAnchor: [1, -34],
                                shadowSize: [41, 41]
                            })
                        ,
                    });
                },
            })
        });

        controls.push(control)
        control.addTo(map)

    }

    if (data) {
        return (
            <>
                <div className="listContainer">
                    {getElements(data)}
                    {getItineraire()}
                    {/*{routes ? <RoutingMachine location={[routes[0], userLocation]} cle={locationRoute}/> : null}*/}
                    <AlertDialog open={dialogOpened} setOpen={setDialogOpened} title="Partager sa position" text={"Vous ne souhaitez pas partager votre position. Les itinéraires sont donc impossibles"}/>
                    <FormDialog open={formDialogOpened} setOpen={setFormDialogOpened} setNewData={setNewData}/>
                </div>
                <div className="bottomContainer">
                    <div className="buttonContainer">
                        <Button variant="contained" fullWidth={true} onClick={addRestoButton}>Ajouter un resto</Button>
                    </div>
                </div>
            </>
        )
    } else {
        return (
            <div className="listContainer">
                {<Loading/>}
            </div>
        )
    }
}

