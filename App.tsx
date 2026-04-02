import React from 'react';
import { StyleSheet, View } from 'react-native';
import {Map, Camera, UserLocation} from '@maplibre/maplibre-react-native';
import { StopsLayer } from './src/map/Stops';

const MAP_STYLE = 'https://tiles.openfreemap.org/styles/fiord';

export default function App() {
  return (
    <View style={styles.container}>
      <Map
        style={styles.map}
        mapStyle={MAP_STYLE}
        androidView="texture" // Keep this for Android stability
      >
        <Camera
          initialViewState={{
            center: [-68.84, -32.89], // Mendoza
            zoom: 12,
          }}
        />
        <UserLocation accuracy={true} />

        {/* We only render our custom layer here */}
        <StopsLayer />
      </Map>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});