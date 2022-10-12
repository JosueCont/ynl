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
import {t} from 'i18n-js'
import NoDataIcon from "../components/Shared/NoDataIcon";


const HistoryFeelingScreen = ({authDuck, navigation}) => {

    const isFocused = useIsFocused();
    const toast = useToast();
    const [historyData, setHistoryData] = useState([])
    const [historyDataDetail, setHistoryDataDetail] = useState(null)
    const [mainHistory, setMainHistory] = useState(true)
    const [loading, setLoading] = useState(null);


    useEffect(() => {
        if (isFocused) {
            getHistoryData(authDuck.user.id, authDuck.userSiteConfig)
        }
    }, [isFocused])

    // const getHistoryData_old = async (userId, site=null) => {
    //     try {
    //         setLoading(true)
    //         let startDate = '2020-01-01', enDate = '2100-01-01';
    //         const res = await ApiApp.getHistoryFeelings(startDate, enDate, userId, site)
    //         let arrayDates = _.map(res.data.data, (obj,index) => {
    //             let dataItem = {
    //                 shortDate: moment(obj.attributes.createdAt).format().split('T')[0],
    //                 date: obj.attributes.createdAt,
    //                 color: obj.attributes.feeling.data.attributes.color,
    //                 comments: obj.attributes.comments,
    //                 feeling: obj.attributes.feeling.data,
    //             }
    //             return dataItem;
    //         })

    //         setHistoryDataDetail(arrayDates)
    //         arrayDates = _.orderBy(arrayDates, ['date'], ['desc']);
    //         arrayDates = _.uniqBy(arrayDates, 'shortDate');
    //         console.log('arraydates', arrayDates.length)

    //         setHistoryData(arrayDates)
    //     } catch (e) {
    //         console.log('getHistoryData error =>', e.toString())
    //     } finally {
    //         setLoading(false)
    //     }
    // }

    const getHistoryData = async (userId, site) => {
        //console.log("🚀 ~ file: StatisticsScreen.js ~ line 79 ~ getHistoryData ~ site", site)
        try {
            //let startDate = '2020-01-01', enDate = '2100-01-01';
            const res = await ApiApp.getLastEmotion(userId, site)
            //console.log("🚀 ~ file: StatisticsScreen.js ~ line 105 ~ getHistoryData ~ res", res.data.data)
  
            setHistoryData(res.data.data)

        } catch (e) {
            console.log('StatisticsScreen getHistoryData error =>',e.toString());
        }
    }


    const goToDetailHistory = (feel) => {
        let arrayDetail = feel.details;//_.filter(historyDataDetail, {'shortDate': feel.shortDate});
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
                                onRefresh={() => getHistoryData(authDuck.user.id,authDuck.userSiteConfig)}
                            />
                        }>

                <View flex={1} mx={5}>
                            <Text size={'lg'}  style={{ color: '#FF5E00', textAlign: 'center', fontWeight: 'bold',marginTop:20}}>{t('history_my_history')}</Text>
                            <Text mb={6} style={{fontSize: 10, color: '#FF5E00', textAlign: 'center', fontWeight: 'bold'}}>{t('history_detail')}</Text>


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
                                    console.log(_.get(ele, 'feeling.attributes.name', '5F6367'))
                                    return (
                                        <TouchableOpacity
                                            key={i}
                                            onPress={() => {
                                                goToDetailHistory(ele)
                                            }}>
                                            <View
                                                flexDir={'row'}
                                                mb={2}
                                                bgColor={ele.color} //'#' + _.get(ele, 'feeling.attributes.parent.data.attributes.color', '5F6367')
                                                style={getShadowCircleStyle(10, 10)}
                                                borderRadius={10}
                                                py={3}

                                            >
                                                <View flex={0.5} alignItems={'center'} justifyContent={'center'}>
                                                    <Image style={{height: 50, width: 50}} alt="img"
                                                           source={{ uri: ele?.url  ? ele.url : 'https://app-ynl.s3.us-west-1.amazonaws.com/triste_4a4900f0cd.png'}}/>
                                                </View>
                                                <View flex={1} justifyContent={'center'}>
                                                    <Text color={'white'} style={{fontWeight: 'bold'}}
                                                          fontSize={20}>{ele.name} </Text>

                                                    <Text color={'white'} fontSize={16}
                                                          mb={1}>{ele.parent}</Text>

                                                    {
                                                        ele?.comments ? <Text color={'white'} fontSize={10} mb={1}>{ele?.comments?.trim()}</Text>:null
                                                    }


                                                    <Text color={'white'}
                                                          fontSize={9}>{ele?.date}</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })
                        }

                        {
                            (!loading && !historyData.length>0) && <NoDataIcon/>
                        }


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