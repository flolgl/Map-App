import {MealsList} from "../../components/MealsList/MealsList";
import "./style/index.css"
import React from "react";
import {MapContainer, TileLayer} from "react-leaflet";
import {LatLngTuple} from "leaflet";

const zoom:number = 13.45;

const mapCenteringPos:LatLngTuple = [48.864211, 2.380104];

export const Map = () => (

    <>
        <div className="mapContainer">
            <MapContainer id="mapId"
                          center={mapCenteringPos}
                          zoom={zoom}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />


                <div className="mealListContainer">
                    <MealsList/>
                </div>

            </MapContainer>
        </div>
    </>
)
