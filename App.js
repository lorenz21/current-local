import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Constants, Location, Permissions, MapView } from 'expo';

export default class App extends React.Component {
  state = {
    mapRegion: { latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
    location: {coords: { latitude: 37.78825, longitude: -122.4324}},
    locationResult: null,
    errorMessage: null,
  };

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'This will not work on Sketch in an Android emulator. Try it on your device',
      });
    }
    else {
      this._getLocationAsync();
    }
  }

  _handleMapRegionChange = mapRegion => {
    this.setState({ mapRegion });
  };

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if(status !== 'granted'){
      this.setState({
        errorMessage:'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ locationResult: JSON.stringify(location), location, });
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView 
        style={{ alignSelf: 'stretch', height: 500 }}
        region={{ latitude: this.state.location.coords.latitude, longitude: this.state.location.coords.longitude, latitudeDelta: 0.0922, 
        longitudeDelta: 0.0421}}
        onRegionChange={this._handleMapRegionChange}
        >

        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paragraph: {
    margin: 24, 
    fontSize: 18, 
    textAlign: 'center',
  },
});
