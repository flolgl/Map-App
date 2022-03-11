import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { LatLngTuple } from 'leaflet';
import {ChangeView} from "./ChangeView";
import {RoutingMachine} from "./RoutingMachine";

export interface Location{
    LatLng: LatLngTuple
}

export interface MarkerLoc {
    markerTab:LatLngTuple[]
}


interface Props{
    LatLng:Location,
    markerTab:MarkerLoc,
}

const zoom:number = 13.45;

export const LeafletMap = (props:Props) => {




    // console.log(LatLng)
    return (
        <MapContainer id="mapId"
            center={props.LatLng.LatLng}
            zoom={zoom}
        >
            <ChangeView center={props.LatLng.LatLng} zoom={zoom} />
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            />
            {props.markerTab.markerTab.map((position, idx) =>
                <Marker key={`marker-${idx}`} position={position}>
                    <Popup>
                        <span>A pretty CSS3 popup. <br/> Easily customizable.</span>
                    </Popup>
                </Marker>
            )}
            <RoutingMachine/>

        </MapContainer>
    )
}

