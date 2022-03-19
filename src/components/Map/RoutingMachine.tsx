import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";

const createRoutineMachineLayer = (props:any) => {
    return L.Routing.control({
        waypoints: [
            //L.latLng(props.depart[0], props.depart[1]),
            //L.latLng(props.arrivee[0], props.arrivee[1])
        ],
        show: false,
        addWaypoints: false,
        routeWhileDragging: true,
        fitSelectedRoutes: true,
        showAlternatives: false
    });

};

export const RoutingMachine = createControlComponent(createRoutineMachineLayer);
