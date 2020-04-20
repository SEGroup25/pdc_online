import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {ImageBackground, Button, StyleSheet, Text, View, Alert, Image, ScrollView} from 'react-native';
import Sidebar from 'react-native-sidebar';
 

export default class SessionMenu extends React.Component {
  render(){
    return (
      <ScrollView showsVerticalScrollIndicator= {true} styles={styles.scroll} >
        <View style={styles.titleback}>
        <Text style={styles.titleText}>Sessions</Text>
        </View>
        <View style={styles.container}>
                
           <Image style={styles.Img} source={require('./breakfast.jpeg')} />
           <Text style={styles.sessioname}>Breakfast</Text>
           
           <Image style={styles.Img} source={require('./lunch.jpeg')} />
           <Text style={styles.sessioname}>Lunch</Text>
           
           <Image style={styles.Img} source={require('./dinner.jpg')} />
           <Text style={styles.sessioname}>Dinner</Text>
       
        </View>
     </ScrollView>
   );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  titleback: {
    backgroundColor:'navajowhite',
    alignSelf: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    height: '7%',
    width: '95%'
  },
  titleText: {
    fontSize: 30,
    textAlign:'center',
    fontWeight: "bold",
    paddingTop: '2%',
    color: 'black'
  },
  Img: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    height: 220,
    width: 380
  },
  sessioname: {
    fontSize: 25,
    paddingBottom: '6%',
    color: 'black'
  },
  scroll: {
    flexDirection: 'column',
    borderColor: 'red',
    borderStyle: 'solid',
    borderWidth: 20,
    borderRadius: 10,
    position: 'relative'
 
  }   

 });
