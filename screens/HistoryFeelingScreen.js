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


const HistoryFeelingScreen = ({authDuck, navigation}) => {

    const isFocused = useIsFocused();
    const toast = useToast();
    const [historyData, setHistoryData] = useState(null)
    const [historyDataDetail, setHistoryDataDetail] = useState(null)
    const [mainHistory, setMainHistory] = useState(true)


    useEffect(() => {
        if (isFocused) {
            getHistoryData(authDuck.user.id)
        }
    }, [isFocused])

    const getHistoryData=async (userId)=>{
        console.log('entra getHistory')
        try{
            let startDate = '2020-01-01',enDate = '2100-01-01';
            const res = await ApiApp.getHistoryFeelings(startDate,enDate,userId)
            let arrayDates  = _.map(res.data.data, (obj)=>{
                let dataItem = {
                    shortDate: obj.attributes.createdAt.split('T')[0],
                    date: obj.attributes.createdAt,
                    color: obj.attributes.feeling.data.attributes.color,
                    feeling: obj.attributes.feeling.data,
                }
                return dataItem;
            })

            setHistoryDataDetail(arrayDates)
            arrayDates = _.orderBy(arrayDates, ['date'],['desc']);
            arrayDates= _.uniqBy(arrayDates,'shortDate');
            setHistoryData(arrayDates)
        }catch (e){
            console.log(e)
        }
    }


    const goToDetailHistory=(feel)=>{
        let arrayDetail = _.filter(historyDataDetail, { 'shortDate': feel.shortDate});
        console.log('arrayDetail',arrayDetail.length, arrayDetail)
        navigation.navigate('HistoryFeelingScreenDetail', {detail:arrayDetail, date:feel.shortDate})
    }


    return (
        <ScrollView style={{flex: 1}} contentContainerStyle={{backgroundColor: Colors.white}}>

            <View flex={1} alignItems={'center'}>
                <Stack space={4} w="90%">
                    <Text style={{fontSize:20, color:'#FF5E00', textAlign:'center',fontWeight:'bolder'}}>Mi Historial</Text>

                    {
                        mainHistory && historyData && historyData.map((ele,i)=>{
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
                                        onPress={() => {
                                            goToDetailHistory(ele)
                                           }
                                        }
                                    >
                                        <Text fontSize={26} >{ele.feeling.attributes.name}</Text>
                                        <Text fontSize={12}>{moment(ele.date).format('L HH:mm')}</Text>
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


export default connect(mapState)(HistoryFeelingScreen);