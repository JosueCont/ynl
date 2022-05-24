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
import apiApp from "../utils/ApiApp";


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
                                mb={2}
                                bgColor={'#'+_.get(ele,'feeling.attributes.parent.data.attributes.parent.data.attributes.color','5F6367')}
                                style={getShadowCircleStyle(10, 10)}
                                borderRadius={40}
                                p={3}>
                                <View flex={1} height={70} alignItems={'center'} justifyContent={'center'}>
                                    <View style={{backgroundColor:'white'}} p={2} borderRadius={40}>
                                        <Image alt="Alternate Text" size="sm" source={{uri:`${apiApp._baseURL}${_.get(ele,'feeling.attributes.parent.data.attributes.parent.data.attributes.icon.data.attributes.url','5F6367')}`}}/>
                                    </View>
                                </View>
                                <View flex={2} height={70} mr={1}>
                                    <TouchableOpacity
                                        style={{
                                            flex: 1,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderRadius: 10
                                        }}
                                    >
                                        <Text fontSize={26} style={{color:'white'}} >{ele.feeling.attributes.name}</Text>
                                        <Text fontSize={16}>{moment(ele.date).format('HH:mm')}</Text>
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