import React, {useEffect, useState} from 'react';
import {Button, Image, ScrollView, Skeleton, Stack, Text, View, Divider} from "native-base";
import {Colors} from "../utils/Colors";
import {connect} from "react-redux";
import {useIsFocused} from "@react-navigation/native";
import PieChartCustom from "./Charts/PieChartCustom";
import CalendarChartCustom from "./Charts/CalendarChartCustom";
import ApiApp from "../utils/ApiApp";
import _ from 'lodash'
import {t} from 'i18n-js';
import DatePicker from 'react-native-date-ranges';
import moment from 'moment'
import {RefreshControl, SafeAreaView} from "react-native";
import {getShadowCircleStyle} from "../utils/functions";
import LineChartCustom from "./Charts/LineChartCustom";
import ProgressChartCustom from "./Charts/ProgressChart";
import FeelingCard from "../components/FeelingCard";
import NoDataIcon from "../components/Shared/NoDataIcon";

const StatisticsScreen = ({authDuck, navigation, ...props}) => {
    const isFocused = useIsFocused();
    const [historyData, setHistoryData] = useState(null)
    const [activeButton, setActiveButton] = useState(2)
    const [countFeeling, setCountFeeling] = useState([])
    const [loading, setLoading] = useState(null);
    const [refreshing, setRefreshing] = useState(null);
    const [dataPie, setDataPie] = useState(null);
    const [feelingCard, setFeelingCard] = useState(null);

    useEffect(() => {
        if (isFocused) {
            boot()
        }
    }, [isFocused])

    const refreshScreen=()=>{
        setRefreshing(true)
        boot();
    }

    const boot = async () => {
        try {
            setLoading(true)
            await getHistoryData(authDuck.user.id, authDuck.userSiteConfig)
            await getCountFeelings(authDuck.user.id, authDuck.userSiteConfig)//
            setActiveButton(2)
        } catch (e) {
            console.log('StatisticsScreen boot error =>',e.toString());
        } finally {
            setLoading(false)
            setRefreshing(false)
        }

    }


    const getCountFeelings = async (userId, site, option = 2) => {
        try {
            setLoading(true)
            const res = await ApiApp.getUserProgress(userId, site, option);
            // console.log('semanal',res.data.data.feelings)
            setCountFeeling(res?.data?.data?.feelings_rev)
            setFeelingCard(res?.data?.data?.feeling_card)

            if(res?.data?.data?.feelings_rev){
                setDataPie(_.map(res.data.data.feelings, (ele, i) => {
                    return {
                        name: ele.name,
                        count: ele.count,
                        color: '#' + ele.color,
                        legendFontColor: "#7F7F7F",
                        legendFontSize: 10
                    }
                }))
            }



        } catch (e) {
            setCountFeeling(null)

            console.log('StatisticsScreen getCountFeelings error =>',e.toString());
        }finally {
            setLoading(false)
        }
    }

    const getHistoryData_old = async (userId, site) => {
        //console.log("🚀 ~ file: StatisticsScreen.js ~ line 79 ~ getHistoryData ~ site", site)
        try {
            let startDate = '2020-01-01', enDate = '2100-01-01';
            const res = await ApiApp.getHistoryFeelings(startDate, enDate, userId, site)
            let arrayDates = _.map(res.data.data, (obj) => {
                let dataItem = {
                    date: moment(obj.attributes.createdAt).format(),
                    color: _.get(obj, 'attributes.feeling.data.attributes.parent.data.attributes.color', 'red'),
                    feeling: obj.attributes.feeling.data,
                }

                return dataItem;
            })

            setHistoryData(arrayDates)

        } catch (e) {
            console.log('StatisticsScreen getHistoryData error =>',e.toString());
        }
    }

    const getHistoryData = async (userId, site, option = 2) => {
        //console.log("🚀 ~ file: StatisticsScreen.js ~ line 79 ~ getHistoryData ~ site", site)
        try {
            //let startDate = '2020-01-01', enDate = '2100-01-01';
            const res = await ApiApp.getLastEmotion(userId, site, option)
            //console.log("🚀 ~ file: StatisticsScreen.js ~ line 105 ~ getHistoryData ~ res", res.data.data)
            
            let arrayDates = _.map(res.data.data, (obj, index) => {
                
                 
                let dataItem = {
                    date: moment(index).format(),
                    color: obj.color,
                    //feeling: obj.attributes.feeling.data,
                }

                return dataItem;
            })

            console.log("🚀 ~ file: StatisticsScreen.js ~ line 108 ~ arrayDates ~ obj", arrayDates)

            setHistoryData(arrayDates)

        } catch (e) {
            console.log('StatisticsScreen getHistoryData error =>',e.toString());
        }
    }

    const filter = (option, startDate=null, endDate=null) => {
        // 1 - la semana anterior, 2 - la semana en curso, 3 el mes, 4 mes anterior
        getCountFeelings(authDuck.user.id, authDuck.userSiteConfig, option)
        getHistoryData(authDuck.user.id, authDuck.userSiteConfig, option)
        setActiveButton(option)
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <ScrollView _contentContainerStyle={{flexGrow: 1}} 
                bgColor={Colors.gray}
                refreshControl={
                    <RefreshControl
                        style={{backgroundColor: 'white'}}
                        tintColor={Colors.red}
                        refreshing={loading && refreshing}
                        onRefresh={refreshScreen}
                    />
                }>
                <View mx={2} my={2} alignItems={'center'} mb={4}>
                    <Button.Group isAttached colorScheme="red" mx={{
                        base: "auto",
                        md: 0
                    }} size="sm">
                        <Button colorScheme={'orange'} onPress={() => {
                            filter(1)
                        }} variant={activeButton === 1 ? 'solid' : 'outline'}>{t('dash_last_week')}</Button>
                        <Button colorScheme={'orange'} onPress={() => {
                            filter(2)
                        }} variant={activeButton === 2 ? 'solid' : 'outline'}>{t('week')}</Button>
                        <Button colorScheme={'orange'} onPress={() => {
                            filter(3)
                        }} variant={activeButton === 3 ? 'solid' : 'outline'}>{t('month')}</Button>
                        <Button colorScheme={'orange'} onPress={() => {
                            filter(4)
                        }} variant={activeButton === 4 ? 'solid' : 'outline'}>Mes anterior</Button>
                    </Button.Group>


                </View>
                {
                    loading === true ?
                        <View mx={2} my={2}>
                            <Skeleton height={100} p={2}></Skeleton>
                        </View>
                        :
                        <View mx={2} my={2} style={[
                            getShadowCircleStyle(10, 10), {
                                backgroundColor: 'white'
                            }]}
                              borderRadius={30} alignItems={'center'}>
                            <Stack direction="row" mb="2.5" mt="1.5" space={4} p={2}>
                                {
                                    countFeeling && countFeeling.map((ele, i) => {
                                        return (
                                            <View key={i}>
                                                <Image source={{uri: ele.icon}} width={30} height={30} mb={1} alt="img"/>
                                                <Text textAlign={'center'} color={`#${ele.color}`} fontSize={14}>{ele.count}</Text>
                                            </View>
                                        )
                                    })
                                }
                            </Stack>
                        </View>
                }


                <View mx={2} my={2} alignItems={'center'}>
                    {
                        loading ?
                            <Skeleton height={250} p={2}></Skeleton> :
                            (dataPie && feelingCard && feelingCard?.most_select?.count >0 ) ?
                            <PieChartCustom dataCount={dataPie}/> : <NoDataIcon mt={10}/>
                    }
                </View>
                <View mx={2} my={2} mb={2}>

                    {
                        loading &&  <Skeleton height={35} p={2}></Skeleton>
                    }
                    {
                     feelingCard && !loading && <FeelingCard feelingCard={feelingCard} user={authDuck.user}/>
                    }

                    {/*{*/}
                    {/*    loading ?*/}
                    {/*        <Skeleton height={250} p={2}></Skeleton> :*/}
                    {/*        <CalendarChartCustom historyData={historyData}/>*/}
                    {/*}*/}
                </View>

                {/*<View flex={0.1} mx={4} mb={5}>*/}
                {/*    /!*<Button isLoading={loading} size="md" colorScheme={'orange'}*!/*/}
                {/*    /!*        onPress={() => navigation.navigate('HistoryFeelingScreen')}>*!/*/}
                {/*    /!*    Ver detalle*!/*/}
                {/*    /!*</Button>*!/*/}
                {/*    <Divider></Divider>*/}
                {/*</View>*/}


                {/*<View>*/}
                {/*    <Text size={'sm'} textAlign={'center'}>Cómo te estás calificando en tus diferentes aspectos</Text>*/}
                {/*    <ProgressChartCustom data={[]}/>*/}
                {/*</View>*/}




            </ScrollView>
        </SafeAreaView>
    )
}

const mapState = (state) => {
    return {
        authDuck: state.authDuck
    }
}

export default connect(mapState)(StatisticsScreen);