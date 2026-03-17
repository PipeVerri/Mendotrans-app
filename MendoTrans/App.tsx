import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Map from './Map/Map';

export default function App() {
  return (
    <View style={styles.container}>
      <Map />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});