import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Constants, Location, Permissions, MapView } from 'expo';

export default class App extends React.Component {
  state = {
    mapRegion: { latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, 
      longitudeDelta: 0.0421 },
    location: {coords: { latitude: 37.78825, longitude: -122.4324}},
    marker : { latitude: 0, longitude: 0 },
    locationResult: null,
    errorMessage: null,
  };

  handleCurrentLocation = () => {
    this._getLocationAsync();
  };

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
    console.log(location.coords);
    this.setState({ marker: location.coords, 
      locationResult: JSON.stringify(location), location, 
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView 
        style={StyleSheet.absoluteFillObject}
        region={{ latitude: this.state.location.coords.latitude, longitude: this.state.location.coords.longitude, latitudeDelta: 0.0322, 
          longitudeDelta: 0.0321}}
        onRegionChange={(mapRegion) => this._handleMapRegionChange}
        >
        {this.state.marker ?  
        <MapView.Marker 
          coordinate={this.state.marker}
          title="Current Location"
          description="You are here..."
        />
        :
        ''}

        </MapView>
        <TouchableOpacity
          style={styles.button}
          accessible={true}
          accessibilityLabel="Current Location Button"
          onPress={this.handleCurrentLocation}>
          <Text style={{color: '#E6E8E6'}}>Locate Me</Text>
          </TouchableOpacity>
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
  button: {
    alignItems: 'center',
    backgroundColor: '#3772FF',
    padding: 10,
    marginBottom: 20,
    position: 'absolute',
    bottom: 0,
    borderRadius: 5,
  },
});
