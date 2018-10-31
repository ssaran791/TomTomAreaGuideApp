/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,ScrollView,Alert} from 'react-native';

import {  Card,List, ListItem,SearchBar, Button,Header,FormLabel,FormInput,Divider, Icon } from 'react-native-elements';

var Dimensions = require('Dimensions');

var { width, height } = Dimensions.get('window');

export default class App extends Component{
  from_id = ''
  to_id = ''
  constructor() {
    super();
    this.state = {
      FROM_NAME: '',
      TO_NAME: ''
    }
  }
  static navigationOptions = { header: null };
  changeFromLocation(loc_id, loc_name) {
    this.from_id = loc_id
    this.setState({
      FROM_NAME: loc_name
    })
    
  }
  changeToLocation(loc_id, loc_name) {
    this.to_id = loc_id
    this.setState({
      TO_NAME: loc_name
    })
    
  }
  search() {
    if(this.from_id.trim() === "" || this.to_id.trim() === "" || this.state.FROM_NAME.trim() === "" || this.state.TO_NAME.trim() === "") {
      // alert("Please check the details carefully. ");
      Alert.alert(
        'Invalid Details', 
        'Please enter all the required details', 
        // cancellable = false
      )
    } else {
    this.props.navigation.navigate("Map", {
      from_id: this.from_id,
      to_id: this.to_id,
      from_name: this.state.FROM_NAME,
      to_name: this.state.TO_NAME
    })
  }
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView>
      <Card containerStyle={BaseStyles.CadStyle}>
        <View style={BaseStyles.buttonHolder}>
          <View style={BaseStyles.absolute}>
        <Text style={BaseStyles.SecoundaryText}>From</Text>
        <Text
          style={[BaseStyles.PrimaryText, BaseStyles.LocationName]}
          onPress={() => {
            navigate('LocationSelection', {
            returnData: this.changeFromLocation.bind(this),
            title: 'From',
            //dont fotget to put this param
            from_id: ''
          })
         
        }}
        >{this.state.FROM_NAME}</Text>


        <Text style={[BaseStyles.SecoundaryText, BaseStyles.greenButtonIcon]}>To</Text>


        <Text
          style={[BaseStyles.PrimaryText, BaseStyles.LocationName]}
          onPress={() => {
            navigate('LocationSelection', {
            returnData: this.changeToLocation.bind(this),
            title: 'To',
            from_id: this.from_id
          })
          
        }
        }
        >{this.state.TO_NAME}</Text>
        </View>

         
        </View>


      
        <Button
          
          icon={{ name: 'search', size: 32 }}

          buttonStyle={[BaseStyles.SearchButtonStyle,{
            marginTop: 12
          }]}
          title={`Search`}
          onPress={() => {
            this.search()
            
          }}
        />
      </Card>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
const BaseStyles = StyleSheet.create({
  PrimaryText:{
  // color: ColorConst.PRIMARY_TEXT,
   },
  SecoundaryText:{
    //  color: ColorConst.SECOUNDARY_TEXT
  },
  Right:{
    marginLeft: 'auto'
  },
  HightLightText:{
   fontSize: 15,
   fontWeight: '500'
  },
  SmallText:{
      fontSize: 13
  },
  LocationName:{
   fontSize: 22,
   marginLeft: 12,
   // marginRight: 18,
   borderBottomColor: '#757575',
   borderBottomWidth: 0.5,
   height: 35
 },
 SearchButtonStyle:{
     
  //   backgroundColor: ColorConst.PRIMARY_COLOR, 
     borderRadius: 10, 
     borderWidth: 1, 
     overflow: 'hidden', 
     borderColor: '#FFFFFF' 
   },

   Past_Future: {
       fontWeight: 'bold', 
       fontSize: 17
   }, 
   CadStyle:{
       borderRadius: 10
   },
   overlay: {
       flex: 1,
       position: 'absolute',
       left: 0,
       bottom: 0,
      // opacity: 0.5,
       backgroundColor: '#F5FCFF',
       width: width,
       //height: 300
     },
     FullWidth:{
         width: width
     },
     FareText:{
        //color: ColorConst.ACCENT_COLOR
     },
     SettingsTextList: {
       marginTop: 10, 
       marginBottom: 10, 
       color: '#000000', 
       borderRadius: 10, 
       marginLeft: 17, 
       marginRight: 17 
     }, 
absolute: {
   position: 'absolute',
   height: '100%',
   width: '100%',
   alignContent: 'center',
   justifyContent: 'center'
},
   absolutes: {
   position: 'absolute',
   height: '100%',
   width: '100%',
   alignContent: 'flex-end',
   justifyContent: 'flex-end'
   },
   greenButtonIcon: {
   alignSelf: 'flex-start'
   }, 
   buttonHolder: {
       justifyContent: 'center', 
       alignItems: 'center', 
       height: 100, 
   }, 
greenButtonIcons: {
   alignSelf: 'flex-end', 
   width: "20%", 
   height: "60%", 
   backgroundColor: 'transparent',
   // borderRadius: 0, 
   borderWidth: 0, 
   paddingRight: 0, 
   paddingLeft: 0,  
}, 
})