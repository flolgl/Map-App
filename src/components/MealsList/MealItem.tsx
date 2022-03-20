import curry from "../../assets/images/E.png";
import {IconButton, Tooltip} from "@mui/material";
import DirectionsIcon from "@mui/icons-material/Directions";
import React, {useState} from "react";
import {restoObject} from "./MealsList";
import {Marker, Popup, useMap} from "react-leaflet";
import L, {LatLngTuple} from "leaflet";
import {AlertDialog} from "../Dialog/Alert/Dialog";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {CustomizedSnackbars} from "../Alert/Alert";
interface Props{
    item:restoObject
    setLocationRoute: (location: LatLngTuple[]) => void;
    userLocation: LatLngTuple | null
}

export const MealItem = (props:Props) => {
    const map = useMap();


    /**
     * Used to display dialog popup
     */
    const [dialogOpened, setDialogOpened] = useState(false);


    /**
     * Used to know if button has been pressed
     * if true, resto location is showed
     */
    const [locationPin, setlocationPin] = useState<boolean>(false);

    /**
     * Used for up voting restaurants
     */
    const [upVoteSnackBarText, setUpVoteSnackBarText] = useState<string>("");

    /**
     * State showing up vote snack bar
     */
    const [upVoteSnackBar, setUpVoteSnackBar] = useState<boolean>(false);

    /**
     * State managing the restaurant's votes
     */
    const [upVoteCounter, setUpVoteCounter] = useState<number>(props.item.upvotes);

    /**
     * Icon linked to db
     */
    const getIcon = L.icon({
        iconUrl: require(`../../assets/images/${props.item.lettre}.png`),
        iconSize: [32,32],
        iconAnchor: [0,0],
    });

    const showItemLocationPin = (location:[number, number]) => (
        <Marker position={location} icon={getIcon}>
            <Popup>
                {props.item.nom}
            </Popup>
        </Marker>
    )

    const vote = async (upVote: boolean):Promise<void> => {
        let data: Response = await fetch("http://localhost:4000/vote", {
            method: "POST",
            credentials: 'include',
            mode: "cors",
            body: JSON.stringify({itemId: props.item.id, upVote: upVote}),
            headers: {
                "Content-Type": "application/json"
            }
        })
        let rspJson = await data.json()
        setUpVoteSnackBarText(rspJson.err? rspJson.err : "Vote pris en compte");
        setUpVoteSnackBar(true)
        if(!rspJson.err)
            setUpVoteCounter(upVoteCounter+(upVote?1:-1))

    }


    return (
        <>
            <CustomizedSnackbars error={upVoteSnackBarText.includes("Erreur")} text={upVoteSnackBarText} setOpen={setUpVoteSnackBar} open={upVoteSnackBar}/>
            <AlertDialog open={dialogOpened} setOpen={setDialogOpened} title="Pas si vite !" text={"Impossible car position non partagée"}/>

            <div className="mealContainer">
                <div className="votesContainer">
                    <Tooltip title="Upvote">

                        <IconButton aria-label="" onClick={() => {vote(true)}}>
                            <ArrowDropUpIcon/>
                        </IconButton>
                    </Tooltip>
                    <p className="votesCounter">{upVoteCounter}</p>
                    <Tooltip title="Downvote">

                        <IconButton aria-label="Downvote" onClick={() => {vote(false)}}>
                            <ArrowDropDownIcon />
                        </IconButton>
                    </Tooltip>

                </div>
                <div className="mealItem">
                    <img className="mealImg" src={require(`../../assets/images/${props.item.lettre}.png`)} alt="curry"/>
                </div>
                <div className="mealItem textItem">
                    <h1 className="text"><a href={props.item.site ? props.item.site : "#"}>{props.item.nom}</a></h1>
                    <p className="text">{props.item.descriptif}</p>
                </div>

                <div className="mealItem itemIcon">
                    <div className="">
                        <Tooltip title="Itinéraire">

                            <IconButton aria-label="Direction" size="large" onClick={() => {
                                if (!props.userLocation)
                                    return setDialogOpened(true)
                                //setlocationPin(true)
                                props.setLocationRoute([props.item.location])
                            }}>
                                {locationPin?showItemLocationPin(props.item.location):null}


                                <DirectionsIcon fontSize="large"  />
                            </IconButton>
                        </Tooltip>

                    </div>
                    <div>
                        <Tooltip title="Marquer le restaurant sur la carte">

                            <IconButton aria-label="Pin restaurant" size="large" onClick={() => {
                                setlocationPin(true)
                                map.setView(props.item.location);
                            }}>
                                <LocationOnIcon fontSize="large"/>
                            </IconButton>
                        </Tooltip>

                    </div>
                </div>


            </div>
        </>

            )
}


