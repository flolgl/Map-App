import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'

export let instance:L.Routing.Control;
const createRoutineMachineLayer = (props:any) => {
    instance = L.Routing.control({
        waypoints: [
            L.latLng(props.location[0]),
            L.latLng(props.location[1])
        ],
        show: false,
        addWaypoints: false,
        routeWhileDragging: true,
        fitSelectedRoutes: true,
        showAlternatives: false,
    });

    // console.log()

    // instance.getRouter().options[0] = L.latLng(props.location[0])
    return instance;
};

// Pass our createRoutingMachineLayer to the createControlHook:
const RoutingMachine = createControlComponent(createRoutineMachineLayer);

// Export
export default RoutingMachine;