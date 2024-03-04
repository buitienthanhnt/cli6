import React, { useEffect, useState } from "react";
import {View, Dimensions, Image} from "react-native";

const Loading = (props)=>{
	if (props?.loading) {
		return(
			<View style={{
				backgroundColor: 'rgba(255, 255, 255, 0.4)', 
				position: 'absolute',
				width: Dimensions.get('screen').width, 
				height: Dimensions.get('screen').height, 
				zIndex: 1,
				justifyContent: 'center', 
				alignItems: 'center'
			}}>
				<Image source={require("@assets/Rolling-1s-200px.gif")} style={{ width: 40, height: 40 }}></Image>
			</View>
		);
	}else{
		return null;
	}
};

export default Loading;