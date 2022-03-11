import { useMap } from "react-leaflet";
import {LatLngTuple} from "leaflet";

interface MapCoords {
    center:LatLngTuple, zoom:number
}

export const ChangeView = ({center, zoom }: MapCoords) => {
    const map = useMap();
    map.setView(center, zoom);
    return null;
}