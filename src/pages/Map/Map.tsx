import {LeafletMap, Location, MarkerLoc} from "../../components/Map/LeafletMap"
import {MealsList} from "../../components/MealsList/MealsList";
import "./style/index.css"
import React, {useState} from "react";



export const Map = () => {

    const [location, setLocation] = useState<Location>({LatLng: [48.864211, 2.380104]});
    const [markers, setMarker] = useState<MarkerLoc>({markerTab:[[48.864211, 2.380104]]})


    console.log(location)
    console.log(markers)

    return (
        <>
            <div className="mapContainer">
                <LeafletMap LatLng={location} markerTab={markers}/>
            </div>

            <div className="mealListContainer">
                <MealsList locationSetter={setLocation}
                           markers={markers} markerTabSetter={setMarker} />
            </div>


        </>
    )
}