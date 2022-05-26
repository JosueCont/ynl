import React, {useEffect, useState} from "react";
import {RefreshControl, SafeAreaView, ScrollView, TouchableOpacity} from "react-native";
import {connect} from "react-redux";
import {Image, Skeleton, Stack, Text, useToast, View} from "native-base";
import {Colors} from "../utils/Colors";
import ApiApp from "../utils/ApiApp";
import {useIsFocused} from "@react-navigation/native";
import {getShadowCircleStyle} from "../utils/functions";
import _ from "lodash";
import moment from 'moment'


const HistoryFeelingScreen = ({authDuck, navigation}) => {

    const isFocused = useIsFocused();
    const toast = useToast();
    const [historyData, setHistoryData] = useState([])
    const [historyDataDetail, setHistoryDataDetail] = useState(null)
    const [mainHistory, setMainHistory] = useState(true)
    const [loading, setLoading] = useState(null);


    useEffect(() => {
        if (isFocused) {
            getHistoryData(authDuck.user.id)
        }
    }, [isFocused])

    const getHistoryData = async (userId) => {
        console.log('entra getHistory')
        try {
            setLoading(true)
            let startDate = '2020-01-01', enDate = '2100-01-01';
            const res = await ApiApp.getHistoryFeelings(startDate, enDate, userId)
            let arrayDates = _.map(res.data.data, (obj) => {
                let dataItem = {
                    shortDate: obj.attributes.createdAt.split('T')[0],
                    date: obj.attributes.createdAt,
                    color: obj.attributes.feeling.data.attributes.color,
                    feeling: obj.attributes.feeling.data,
                }
                return dataItem;
            })

            setHistoryDataDetail(arrayDates)
            arrayDates = _.orderBy(arrayDates, ['date'], ['desc']);
            arrayDates = _.uniqBy(arrayDates, 'shortDate');
            setHistoryData(arrayDates)
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }


    const goToDetailHistory = (feel) => {
        let arrayDetail = _.filter(historyDataDetail, {'shortDate': feel.shortDate});
        console.log('arrayDetail', arrayDetail.length, arrayDetail)
        navigation.navigate('HistoryFeelingScreenDetail', {detail: arrayDetail, date: moment(feel.date).format('L')})
    }


    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>

            <ScrollView contentContainerStyle={{flexGrow: 1, backgroundColor: Colors.white}}
                        refreshControl={
                            <RefreshControl
                                style={{backgroundColor: 'white'}}
                                tintColor={Colors.red}
                                refreshing={loading}
                                onRefresh={() => getHistoryData(authDuck.user.id)}
                            />
                        }>

                <View flex={1} alignItems={'center'}>
                    <Stack space={4} w="90%">
                        <Text style={{fontSize: 20, color: '#FF5E00', textAlign: 'center', fontWeight: 'bolder'}}>Mi
                            Historial</Text>

                        {
                            loading ?
                                <View flex={1}>
                                    <Skeleton height={20} mb={4}/>
                                    <Skeleton height={20} mb={4}/>
                                    <Skeleton height={20} mb={4}/>
                                    <Skeleton height={20} mb={4}/>
                                    <Skeleton height={20} mb={4}/>
                                    <Skeleton height={20} mb={4}/>
                                    <Skeleton height={20} mb={4}/>

                                </View>

                                :
                                historyData.map((ele, i) => {
                                    console.log(ele)
                                    return (
                                        <TouchableOpacity
                                            onPress={() => {
                                                goToDetailHistory(ele)
                                            }}>
                                            <View
                                                flexDir={'row'}
                                                mb={2}
                                                bgColor={'#' + _.get(ele, 'feeling.attributes.parent.data.attributes.parent.data.attributes.color', '5F6367')}
                                                style={getShadowCircleStyle(10, 10)}
                                                borderRadius={10}
                                                py={3}

                                            >
                                                <View flex={0.5} alignItems={'center'} justifyContent={'center'}>
                                                    <Image tintColor={'white'} style={{height: 40, width: 40}}
                                                           source={{uri: `${_.get(ele, 'feeling.attributes.parent.data.attributes.parent.data.attributes.icon.data.attributes.url', 'https://app-ynl.s3.us-west-1.amazonaws.com/triste_4a4900f0cd.png')}`}}/>
                                                </View>
                                                <View flex={1} justifyContent={'center'}>
                                                    <Text color={'white'} style={{fontWeight: 'bold'}}
                                                          fontSize={20}>{ele.feeling.attributes.name} </Text>

                                                    <Text color={'white'} fontSize={16}
                                                          mb={1}>{ele.feeling.attributes.parent.data.attributes.name} - {ele.feeling.attributes.parent.data.attributes.parent.data.attributes.name}</Text>
                                                    <Text color={'white'}
                                                          fontSize={9}>{moment(ele.date).format('L')}</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })
                        }


                    </Stack>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const mapState = (state) => {
    return {
        authDuck: state.authDuck
    }
}


export default connect(mapState)(HistoryFeelingScreen);