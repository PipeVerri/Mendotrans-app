import {StyleSheet, Text, View} from 'react-native';
import React, { useEffect, useState } from "react";
import { Map, Camera, UserLocation } from "@maplibre/maplibre-react-native";
import * as Location from 'expo-location';

const MAP_STYLE = "https://tiles.openfreemap.org/styles/liberty";

export default function App() {
    const [permissionGranted, setPermissionGranted] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            setPermissionGranted(status === 'granted');
        })();
    }, []);

    return (
        <View style={styles.container}>
            <Map style={styles.map} mapStyle={MAP_STYLE}>
                <Camera
                    initialViewState={{
                        center: [-68.8272, -32.8895],
                        zoom: 12
                    }}
                    minZoom={8}
                    maxZoom={18}
                    trackUserLocation="default"
                />
                <UserLocation accuracy={true}></UserLocation>
            </Map>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    map: { flex: 1 },
});