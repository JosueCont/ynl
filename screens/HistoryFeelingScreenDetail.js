import React, {useEffect, useState} from "react";
import {ScrollView, TouchableOpacity} from "react-native";
import {connect} from "react-redux";
import {Box, Button, Checkbox, FormControl, Icon, Image, Input, Stack, Text, useToast, View} from "native-base";
import {Entypo, MaterialIcons} from "@expo/vector-icons";
import {Colors} from "../utils/Colors";
import ApiApp from "../utils/ApiApp";
import {useIsFocused} from "@react-navigation/native";
import {getShadowCircleStyle} from "../utils/functions";
import bg1 from "../assets/bg1.png";
import _ from "lodash";
import moment from 'moment'


const HistoryFeelingScreenDetail = ({authDuck, route,navigation}) => {

    const isFocused = useIsFocused();
    const { detail, date } = route.params;

    useEffect(() => {
        if (isFocused) {
            console.log('detail',detail)
        }
    }, [isFocused])




    return (
        <ScrollView style={{flex: 1}} contentContainerStyle={{backgroundColor: Colors.white}}>

            <View flex={1} alignItems={'center'}>
                <Stack space={4} w="90%">
                    <Text style={{fontSize:20, color:'#FF5E00', textAlign:'center',fontWeight:'bolder'}}>{date}</Text>

                    {
                        detail && detail.map((ele,i)=>{
                            return  <View
                                flexDir={'row'}
                                mb={8}
                                bgColor={Colors.gray}
                                style={getShadowCircleStyle(10, 10)}
                                borderRadius={10}
                                p={3}>
                                <View flex={1} height={70} alignItems={'center'} justifyContent={'center'}>
                                    <Icon as={MaterialIcons} name={'mood'} size={'6xl'} color={Colors.red}></Icon>
                                </View>
                                <View flex={1} height={70} mr={1}>
                                    <TouchableOpacity
                                        style={{
                                            flex: 1,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderRadius: 10
                                        }}
                                    >
                                        <Text fontSize={26} >{ele.feeling.attributes.name}</Text>
                                        <Text fontSize={12}>{moment(ele.date).format('HH:mm')}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        })
                    }


                </Stack>
            </View>
        </ScrollView>
    )
}

const mapState = (state) => {
    return {
        authDuck: state.authDuck
    }
}


export default connect(mapState)(HistoryFeelingScreenDetail);