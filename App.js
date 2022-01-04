import React from 'react';
import { Pressable,Text, View,Button,StyleSheet,TouchableOpacity } from 'react-native';
import {ViroARSceneNavigator} from 'react-viro';

var ARScene = require('./js/ArNavigation');
class BialAR extends React.Component{
  constructor() {
    super();
  this.state = {CameraMode : "Scan"};
  this._getARNavigator = this._getARNavigator.bind(this);
  //this.updateState=this.updateState.bind(this);
  //this.updateState();
  }
//  updateState = () => this.setState({CameraMode : "scan"});
  _getARNavigator() {
    return (
      <ViroARSceneNavigator 
            initialScene={{scene: ARScene}} 
            onExitViro={this._exitViro}/>
    );
  }
    render(){
      return this._getARNavigator();
      }
}
const styles = StyleSheet.create({
    centerText: {
      flex: 1,
      fontSize: 18,
      padding: 32,
      color: '#777'
    },
    textBold: {
      fontWeight: '500',
      color: '#000'
    },
    buttonText: {
      fontSize: 21,
      color: 'rgb(100,122,255)'
    },
    buttonTouchable: {
      padding: 16
    }
  });
function onPressFunction(){
console.log("arnv");

}

export default BialAR;