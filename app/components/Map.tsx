"use client"

import { icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { useCountries } from '../lib/getCountries';

const ICON = icon({
    iconUrl:
    "https://freesvg.org/img/Map-Pin.png",
    iconSize: [50, 50],
});

export default function Map({locationValue}: {locationValue: string}) {
    const { getCountryByValue } = useCountries();
    const latLang = getCountryByValue(locationValue)?.latLang;

    return(
        <MapContainer
        scrollWheelZoom={false}
        className="h-[50vh] rounded-lg relative z-0"
        center={latLang ??[12.8797, 121.7740]}
        zoom={5}
        >
        <TileLayer  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <Marker position={latLang ??[12.8797, 121.7740]} icon={ICON}/>
        </MapContainer>
    );
}