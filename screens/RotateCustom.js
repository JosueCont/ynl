import React, {useState} from 'react';
import {Animated, TouchableOpacity, View} from 'react-native';
import {Image} from "native-base";
import circleParts from '../assets/circleImage.jpg';
import Swipeable from 'react-native-gesture-handler/Swipeable';

const RotateCustom = () => {
    const [rotateAnimation, setRotateAnimation] = useState(new Animated.Value(0));
    const [deg, setDeg] = useState(null)

    const handleAnimation = () => {
        Animated.timing(rotateAnimation, {
            toValue: 0.5,
            duration: 2000,
        }).start(() => {
            rotateAnimation.setValue(0);
        });
    };

    const interpolateRotating = rotateAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '720deg'],
    });

    const animatedStyle = {
        transform: [
            {
                rotate: interpolateRotating,
            },
        ],
    };

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            {/*<TouchableOpacity*/}
            {/*    onPress={async () => handleAnimation()}*/}
            {/*    style={{width: 60}}*/}
            {/*>*/}
            {/*    <Animated.Text style={animatedStyle}>Click me</Animated.Text>*/}
            {/*</TouchableOpacity>*/}
            <Swipeable
                renderLeftActions={() => {

                }}
                renderRightActions={() => {

                }}
                onSwipeableRightOpen={() => {
                    setDeg(deg + 45);
                }}
                onSwipeableLeftOpen={() => {
                    setDeg(deg + 45);
                }}
            >
                <View style={[{
                    transform: [{rotate: deg + "deg"}],
                    alignItems: 'center',
                    justifyContent: 'center'
                }]}>
                    <TouchableOpacity activeOpacity={true}
                                      onPress={() => {
                                          setDeg(deg + 45)
                                      }}
                    >
                        <Image source={circleParts} width={250} height={250}/>
                    </TouchableOpacity>
                </View>
            </Swipeable>
        </View>
    );
};

export default RotateCustom;