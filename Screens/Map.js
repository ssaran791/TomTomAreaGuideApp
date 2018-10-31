import React, { Component } from 'react'
import { Text, View,WebView } from 'react-native'

export default class Map extends Component {
  getParam(param)
  {
    return this.props.navigation.getParam(param)
  }
  componentDidMount = () => {
    console.log('http://18.221.0.181/area_guide_final_backend/index.php?lat1='+this.getParam('lat1')+'&lon1='+this.getParam('lon1')+'&lat2='+this.getParam('lat2')+'&lon2='+this.getParam('lon2'));
  };
  
  render() {
    return (
     <WebView 
        source={{uri: 'http://18.221.0.181/area_guide_final_backend/index.php?lat1='+this.getParam('lat1')+'&lon1='+this.getParam('lon1')+'&lat2='+this.getParam('lat2')+'&lon2='+this.getParam('lon2')}}
     />
    )
  }
}