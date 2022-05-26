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
    const [detailData, setDetailData] = useState(null)
    const { detail, date } = route.params;

    useEffect(() => {
        if (isFocused) {
            setDetailData(_.orderBy(detail,['date'],['desc']))

        }
    }, [isFocused])




    return (
        <ScrollView style={{flex: 1}} contentContainerStyle={{backgroundColor: Colors.white}}>

            <View flex={1} alignItems={'center'}>
                <Stack space={4} w="90%">
                    <Text style={{fontSize:20, color:'#FF5E00', textAlign:'center',fontWeight:'bolder'}}>{date}</Text>

                    {
                        detailData && detailData.map((ele,i)=>{
                            return  <View
                                flexDir={'row'}
                                mb={2}
                                bgColor={'#'+_.get(ele,'feeling.attributes.parent.data.attributes.parent.data.attributes.color','5F6367')}
                                style={getShadowCircleStyle(10, 10)}
                                borderRadius={40}
                                p={3}>
                                <View flex={1} height={70} alignItems={'center'} justifyContent={'center'}>
                                    <View style={{backgroundColor:'white'}} p={2} borderRadius={40}>
                                        <Image alt=":)" size="sm" source={{uri:`${_.get(ele,'feeling.attributes.parent.data.attributes.parent.data.attributes.icon.data.attributes.url','https://app-ynl.s3.us-west-1.amazonaws.com/triste_4a4900f0cd.png')}`}}/>
                                    </View>
                                </View>
                                <View flex={2} height={70} mr={1}>
                                        <Text fontSize={26} style={{color:'white'}} >{ele.feeling.attributes.name}</Text>
                                        <Text fontSize={16}>{moment(ele.date).format('HH:mm')}</Text>
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