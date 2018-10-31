
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView
} from 'react-native';
import {  Card, List,ListItem,SearchBar, Button,Header,FormLabel,FormInput,Divider } from 'react-native-elements';

const cache_max_limit = 25
export default class LocationSelection extends Component {
  //used for the suggstion speedup by canceling the old loading request
  //for canceling the old request making a var
  request=null
  //caching the response from the server to increase the UI experice
  //contains the key => value ; key = URL , value = (json_parsed_response)
  cache={}
  total_cache=0
  cached_url_list=[]
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title}`,
  });
    constructor()
    {
        super();
        this.state={
            list : [
      
              ]
        }
    }
   
    async search(text)
    {
      //converting to lowercase
      text=text.toLowerCase();
      //make sure that sending this params 
      //need to check the variable
      
      let to_request_url=`https://api.tomtom.com/search/2/search/${text}.json?typeahead=true&language=en-GB&view=IN&minFuzzyLevel=1&maxFuzzyLevel=2&key=ry3v1O1DTQ4bA9k31y5Sv10NAfax9sbs`;
    
      if(this.cache[to_request_url])
      {
        this.setState({
          list: this.cache[to_request_url]
        })
        return;
      }


      //if the data is not in cache then goes for HTTP

      //check if any pending req is delay due to internet connection then abort to load the new request
      if(this.request==null){
        this.request = new XMLHttpRequest();
      }else{
        this.request.abort();
        this.request = new XMLHttpRequest();
      }
      this.request.onreadystatechange = (e) => {
        if (this.request.readyState !== 4) {
          return;
        }

        if (this.request.status === 200) {
          //console.log("Response_Url="+this.request.responseURL);
          let parsed_json_http=JSON.parse(this.request.responseText)
          let parsed_json = []

          parsed_json_http.results.map((index,i)=>{
              parsed_json.push({
                  place_id: index.position.lat+","+index.position.lon,
                  place_name: index.address.freeformAddress
              })
          })

          
          this.setState({
            list: parsed_json
          })
          //setting up cache
          if(this.total_cache>=cache_max_limit)
          {
            delete this.cache[this.cached_url_list.shift()];
            
          }
          this.cache[this.request.responseURL]=parsed_json
          this.total_cache++;
          this.cached_url_list.push(this.request.responseURL);
          this.request=null;
        } else {
          console.log('Error in retriving Suggestion.');
        }
      };

      this.request.open('GET', to_request_url);
      this.request.send();
       
    }

 
      retrunData(loc_id,loc_name)
      {
        this.props.navigation.state.params.returnData( loc_id,loc_name);
        this.props.navigation.goBack();
      
        
      }
    render() {
        return (
          <View>
             <SearchBar 
             autoFocus
             onChangeText={(text)=>this.search(text)}
             />
          <ScrollView
          keyboardShouldPersistTaps='handled'
          >
            
             <List containerStyle={{
               marginTop: 0
             }}>
  {
    this.state.list.map((item, i) => (
      <ListItem
        key={i}
        title={item.place_name}
        leftIcon={{name: "location-city"}}
        onPress={() => this.retrunData(item.place_id,item.place_name)}
      />
    ))
  }
</List>
              </ScrollView>
              </View>
        );
    }
}