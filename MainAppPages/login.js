import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer, useNavigationState} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {ImageBackground, ActivityIndicator, Button, ScrollView ,StyleSheet,TouchableOpacity, Text, View, Alert, TextInput, Image} from 'react-native';

export default class Login extends React.Component {
  state = {           // State of login component. State is data that can be used by component and changes over time
    user: null,       // The user that signs in. Will contain user details. Null by default
    verified: false,       // Boolean for whether user has verified email
    email: '',             // user email
    password: '',          // user password
    errorMessage: null,    // Will contain all error messages to display on screen
    admin: false           // Boolean for whether user is admin or not
  }

  componentDidMount(){      // Built in function that runs when component renders for the first time
    auth().onAuthStateChanged( user => {
      this.setState({user: user})                     // When a user logs in, the variable user in state is set to the user's unique details
      if(user != null){                               // After a user logs in, this condition becomes true 
        this.setState({verified: user.emailVerified}) // When a user logs in, the verified variable in state is set to the value of verfied of the user
      }
    })
  }

  async signin(){                                                                    // A function for sign in that is run when the user presses login after entering their details
      await auth().signInWithEmailAndPassword(this.state.email, this.state.password) // Details of the username and password are checked from the database. 
            .catch(err => {this.setState({errorMessage: err.message})                // In case of wrongly entered details, an error is set to the errorMessage variable in state
            })
      await firestore().collection('Users').doc(auth().currentUser.uid).get()        // Details of the user are fetched after he/she logs in successfully 
      .then(doc => {this.setState({admin: doc.data().admin})})                       // admin variable is set accroding to the value stored in the firebase 

      if(!this.state.admin && auth().currentUser.emailVerified == false){        
        this.setState({errorMessage: 'Please verify your email'})
        auth().signOut().catch(err => console.log(err))
      }
      
    }


  render(){
    if(!this.state.user || !this.state.verified){
      if(!this.state.admin){
        return (
          <ScrollView  contentContainerStyle={{flexGrow: 1}} persistentScrollbar= {true} styles={styles.scroll} >
            <ImageBackground source={require('./pdc_image_blur.png')} style={styles.container}>
            <Text style={styles.titleText}> PDC ONLINE</Text>
            {this.state.errorMessage && <Text style={styles.subtitleText}>{this.state.errorMessage}</Text>}
            <Text style={styles.subtitleText}> Email</Text>
            <TextInput style={styles.TextInput} onChangeText={email => this.setState({email: email})} value={this.state.email} placeholder='rollnumber@lums.edu.pk' textAlign={'center'}  ></TextInput>
            <Text style={styles.subtitleText}> Password</Text>
            <TextInput style={styles.TextInput} onChangeText={pass => this.setState({password: pass})} value={this.state.password} placeholder='password' secureTextEntry textAlign={'center'} ></TextInput>
            <TouchableOpacity onPress={() => this.signin()} style={styles.button}>
                <Text style={{color: 'white', fontSize: 17}} title="Login" >Login</Text>
            </TouchableOpacity>
            <Text style={styles.subtitleText} onPress={() => Alert.alert('Your Loss')}> Forgot your password?</Text>
            <Text style={styles.subtitleText} onPress={() => this.signup('21100311@lums.edu.pk', 'usmanpass')}> New to PDC Online?<Text style={{color: '#E9446A'}} onPress={() => this.props.navigation.navigate('signup')}> Sign up</Text></Text>
            </ImageBackground>
          </ScrollView>         
        )
      }
      else{
        this.setState({admin: false})
        return(
          <View>{
            this.props.navigation.navigate('adminhome')
            }
          </View>
        )
      }
    }
    return(
      <View>{
        this.props.navigation.navigate('Sessions Menu')
        }
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  titleText: {
    marginTop: 95,
    fontSize: 55, 
    fontWeight: "bold",
    color: 'white',
    height : 100,
    textShadowColor: 'black',
    textShadowOffset:  {width: -5, height: 5} ,
    textShadowRadius: 20
  },
  subtitleText: {
    marginVertical: 7,
    fontSize: 22, 
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset:  {width: -3, height: 3} ,
    textShadowRadius: 10
  },
  TextInput:{
    marginVertical: 5,
    height: 40, 
    width: 180,
    backgroundColor: 'white',
    borderColor: 'black', 
    borderWidth: 1 ,
  }, 
  button: {
    backgroundColor: '#E9446A',
    marginHorizontal: 5,
    marginVertical: 15,
    borderRadius: 4,
    borderColor: '#CA2161',
    borderWidth: 1,
    height: 52,
    width: 180,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scroll: {
    flexDirection: 'column',
    borderStyle: 'solid',
    position: 'relative'
  }   
});
