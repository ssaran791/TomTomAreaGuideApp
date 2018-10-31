import React, { Component } from 'react'
import { Text, View,WebView } from 'react-native'

export default class Map extends Component {
  render() {
    return (
     <WebView 
        source={{uri: 'http://18.221.0.181/area_guide_final_backend/index.php?lat1=1&lon1=11&lat2=2&lon2=22'}}
     />
    )
  }
}