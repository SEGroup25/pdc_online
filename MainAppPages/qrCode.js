import React from 'react';
import {Text,Button,StyleSheet,View} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import QRCode from 'react-native-qrcode-svg';
import Icon from 'react-native-vector-icons/Ionicons'
import {ProgressBar,Title,Appbar,Colors} from 'react-native-paper';

export default class QRcode extends React.Component{

    state ={
        orderReceived : {},
        verify: false,
    }
   
    checkVerified(){
        let listener = firestore().collection('Orders').doc(this.props.route.params.orderID).onSnapshot(docSnapshot => {
            if(docSnapshot.data().verified == true){
                this.setState({verify: true})
                listener()
            }
        },
        err => console.log(err))
    }

    resetUserOrder(){
        firestore().collection('Users').doc(this.props.route.params.uid).update({
            currentOrder: {}
        })
        .catch(err => console.log(err))
    }
    
    render(){
        console.log(this.props.route.params.orderID.concat(this.props.route.params.time))
        if(this.state.verify == false){
            return(
                <View>
                     <Appbar style={styles.Appbar} >
                                <Icon style={{marginLeft: '3%'}} onPress={() => this.props.navigation.openDrawer()} name='md-menu' size={40} /* on clicking this icon we get a side tab/drawer */ />
                                <Title  style = {styles.titleText} >QR Code</Title>
                        </Appbar>
                        <ProgressBar style={styles.ProgressBar} progress={0.75} color={Colors.green800} />
                
                        <View style={{flex: 1,alignItems:'center', justifyContent: 'center',backgroundColor:'#75FFCF'}}>
                            <Text style={{fontSize: 30,textAlign:'center',marginHorizontal:'3%',marginTop:'115%',marginBottom:'10%', fontWeight: 'bold'}}>{this.checkVerified()}Your payment is complete. Scan this QR Code at the PDC Counter to get your food</Text>
                            <QRCode
                            size={210}
                            value={this.props.route.params.orderID.concat(this.props.route.params.time)}
                            logo={require('./images/pdc_online_icon.png')}
                            logoSize={55}
                            logoBackgroundColor='white'
                            logoMargin={1}
                            logoBorderRadius={30}
                            />
                        </View>
                </View>
                ) 
        }
        else{
            this.resetUserOrder()
            return(
                <View style={{flex: 1, backgroundColor:'#75FFCF'}}>
                    <View>
                        <Appbar style={styles.Appbar} >
                                    <Icon style={{marginLeft: '3%'}} onPress={() => this.props.navigation.openDrawer()} name='md-menu' size={40} /* on clicking this icon we get a side tab/drawer */ />
                                    <Title  style = {styles.titleText} >QR Code</Title>
                        </Appbar>
                        <ProgressBar style={styles.ProgressBar} progress={1} color={Colors.green800} />
                    </View>
        
                    <View style={{flex: 1,alignItems:'center', justifyContent: 'center'}}>
                         <Text style={{fontSize: 30, fontWeight: 'bold'}}>Order Verified!</Text>                
                    </View>
                </View>         
                )
        }
    }
}

const styles = StyleSheet.create({

    ProgressBar:{
        height:20 ,
      },
      Appbar: {
        backgroundColor:'#E9446A',
        height: 67
      },
      titleText: {
        fontSize: 30,
        fontWeight: "bold",
        marginTop: '2%',
        marginLeft:'25%',
        color: 'black'
      },
})