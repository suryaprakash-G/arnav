'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroARImageMarker,
  ViroAnimatedImage,
  ViroARTrackingTargets,
  ViroMaterials,
  Viro3DObject,
  ViroAmbientLight
} from 'react-viro';

var Nav_Data={
  direction:[
    [0,0.5,-1, 0,0,0, "this way"],
    [0,0,-1, 0,0,0, ""],
    [1,0,-1, 0,90,0, "turn right"],
    [1,0,0, 0,90,0, ""],
    [1,0,-1, 0,0,0, ""],
    [0,0,-1, 0,0,0, ""],
    [0,0,-1, 0,0,0, "destination"]
  ],
  key:"lol",
};
ViroARTrackingTargets.createTargets({
  "terminal7" : {
    source : require('./res/bial_qr.png'),
    orientation : "Up",
    physicalWidth : 0.15, // real world width in meters
    type:"Image"
  }
});
export default class ArNavigation extends Component {

  constructor() {
    super();

    // Set initial state here
    this.state = {
      text : "Initializing AR..."
    };
    
    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }
  
  route() {
    //console.log("##################################");
    //console.log(Nav_Data["direction"]);

    var x_off=0,y_off=0,z_off=0;
    var x_rot=0,y_rot=0,z_rot=0;
    var Direction=Nav_Data["direction"];
    return Direction.map((Dir, index) => {

      //directional offsets
      x_off+=Dir[0];
      y_off+=Dir[2];
      z_off+=Dir[1];

      //rotational values
      x_rot=Dir[3]-90;
      y_rot=Dir[5];
      z_rot=Dir[4];

      var ret;
     ret= <Viro3DObject key={index} source={require('./res/arrow.obj')}
           resources={[require('./res/arrow.mtl')]}
           position={[x_off, y_off, z_off]}
           rotation={[x_rot,y_rot,z_rot]}
           scale={[.03, .03, .03]}
           materials={["heart"]}
           type="OBJ"
          />;
      
      return ret;
    })
  }
  waytext() {
    //console.log("##################################");
    //console.log(Nav_Data["direction"]);

    var x_off=0,y_off=0,z_off=0.5;
    var x_rot=0,y_rot=0,z_rot=0;
    var Direction=Nav_Data["direction"];
    
    return Direction.map((Dir, index) => {

            //directional offsets
            x_off+=Dir[0];
            y_off+=Dir[2];
            z_off+=Dir[1];
      
            //rotational values
            x_rot=Dir[3]-90;
            y_rot=Dir[5];
            z_rot=Dir[4];
      

      var ret;
      
     ret=
     <ViroText
       key={index}
       text={Dir[6]}
       scale={[.5, .5, .5]}
       position={[x_off, y_off, z_off-1]}
       rotation={[-90,0,0]}
       style={styles.helloWorldTextStyle}/>
      
      return ret;
    })
  }
  render() {
    ViroMaterials.createMaterials({
      white:{
        lightingModel:'Blinn',
        diffuseColor:'rgb(231,231,231)'
      }
    });
    ViroMaterials.createMaterials({
      heart: {
         lightingModel: "Blinn",
         diffuseColor:"rgb(0,153,204)",
       },
    });
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        <ViroAmbientLight color="#FFFFFF" />
        
        <ViroARImageMarker target={"terminal7"} >
          {this.route()}
          {this.waytext()}
          {false?
          <ViroAnimatedImage
              height={0.5}
              width={0.5}
              position={[0, -0.2, -0.1]}
              rotation={[-90,0,0]}
              onClick={this.ScanQr}
              placeholderSource={require("./res/spinner.gif")}
              source={require("./res/spinner.gif")}
          />:null }
        </ViroARImageMarker>
      </ViroARScene>
    );
  }
  ScanQr(source) {
    console.log("took ss");
    //this.props.sceneNavigator.takeScreenshot(fileName= "screens", saveToCameraRoll= true);
  }
  _onLoadStart() {
     console.log("OBJ loading has started"); 
  }
  _onLoadEnd() {
     console.log("OBJ loading has finished");
  }
  _onError(event) {
    console.log("OBJ loading failed with error: " + event.nativeEvent.error);
  }
  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text : "loaded"
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 20,
    color: '#ff0000',
    textAlignVertical: 'center',
    textAlign: 'center',  
  },
});

module.exports = ArNavigation;