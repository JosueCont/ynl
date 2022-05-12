import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Image} from "native-base";
import circleParts from '../assets/circleImage.jpg';
import {GestureDetector} from 'react-native-gesture-handler';
import Animated, {useAnimatedStyle, useSharedValue} from "react-native-reanimated";

const RotateCustom = () => {

    const rotation = useSharedValue(1);
    const savedRotation = useSharedValue(1);

    const rotationGesture = Gesture.Rotation()
        .onUpdate((e) => {
            rotation.value = savedRotation.value + e.rotation;
        })
        .onEnd(() => {
            savedRotation.value = rotation.value;
        });

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{rotateZ: `${(rotation.value / Math.PI) * 180}deg`}]
        }
    }, [transform]);


    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            {/*<TouchableOpacity*/}
            {/*    onPress={async () => handleAnimation()}*/}
            {/*    style={{width: 60}}*/}
            {/*>*/}
            {/*    <Animated.Text style={animatedStyle}>Click me</Animated.Text>*/}
            {/*</TouchableOpacity>*/}

            <GestureDetector gesture={rotationGesture}>
                <Animated.View style={[{
                    alignItems: 'center',
                    justifyContent: 'center'
                }, animatedStyle]}>
                    <TouchableOpacity activeOpacity={true}
                                      onPress={() => {
                                          //setDeg(deg + 45)
                                      }}
                    >
                        <Image source={circleParts} width={250} height={250}/>
                    </TouchableOpacity>
                </Animated.View>
            </GestureDetector>
        </View>
    );
};

export default RotateCustom;