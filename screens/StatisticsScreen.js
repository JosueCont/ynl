import React, {useEffect, useState} from 'react';
import {Button, Image, ScrollView, Skeleton, Stack, Text, View} from "native-base";
import {Colors} from "../utils/Colors";
import {connect} from "react-redux";
import {useIsFocused} from "@react-navigation/native";
import PieChartCustom from "./Charts/PieChartCustom";
import CalendarChartCustom from "./Charts/CalendarChartCustom";
import ApiApp from "../utils/ApiApp";
import _ from 'lodash'
import {RefreshControl, SafeAreaView} from "react-native";
import {getShadowCircleStyle} from "../utils/functions";

const StatisticsScreen = ({authDuck, navigation, ...props}) => {
    const isFocused = useIsFocused();
    const [historyData, setHistoryData] = useState(null)
    const [activeButton, setActiveButton] = useState(2)
    const [countFeeling, setCountFeeling] = useState([])
    const [loading, setLoading] = useState(null);
    const [dataPie, setDataPie] = useState(null);

    useEffect(() => {
        if (isFocused) {
            boot()
        }
    }, [isFocused])

    const boot = async () => {
        setLoading(true)
        try {

            await getHistoryData(authDuck.user.id)
            await getCountFeelings(authDuck.user.id)
        } catch (ex) {

        } finally {
            setLoading(false)
        }

    }


    const getCountFeelings = async (userId, option = null) => {
        setLoading(true)
        try {

            const res = await ApiApp.getUserProgress(userId, option);
            console.log('semanal',res.data.data.feelings)
            setCountFeeling(res.data.data.feelings)

            setDataPie(_.map(res.data.data.feelings, (ele, i) => {
                return {
                    name: ele.name,
                    count: ele.count,
                    color: '#' + ele.color,
                    legendFontColor: "#7F7F7F",
                    legendFontSize: 10
                }
            }))


        } catch (e) {
            setCountFeeling(null)

            console.log('error===>', e)
        }finally {
            setLoading(false)
        }
    }

    const getHistoryData = async (userId) => {
        console.log('entra getHistory')
        try {
            let startDate = '2020-01-01', enDate = '2100-01-01';
            const res = await ApiApp.getHistoryFeelings(startDate, enDate, userId)
            let arrayDates = _.map(res.data.data, (obj) => {
                let dataItem = {
                    date: obj.attributes.createdAt,
                    color: _.get(obj, 'attributes.feeling.data.attributes.parent.data.attributes.parent.data.attributes.color', 'red'),
                    feeling: obj.attributes.feeling.data,
                }

                return dataItem;
            })

            setHistoryData(arrayDates)

        } catch (e) {
            console.log(e)
        }
    }

    const filter = (option) => {
        // 1 - la semana anterior, 2 - la semana en curso, 3 el mes
        getCountFeelings(authDuck.user.id, option)
        setActiveButton(option)
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <ScrollView _contentContainerStyle={{flexGrow: 1}} bgColor={Colors.gray}
                        refreshControl={
                            <RefreshControl
                                style={{backgroundColor: 'white'}}
                                tintColor={Colors.red}
                                refreshing={loading}
                                onRefresh={boot}
                            />
                        }>
                <View mx={2} my={2} alignItems={'center'} mb={4}>
                    <Button.Group isAttached colorScheme="red" mx={{
                        base: "auto",
                        md: 0
                    }} size="sm">
                        <Button colorScheme={'orange'} onPress={() => {
                            filter(1)
                        }} variant={activeButton === 1 ? 'solid' : 'outline'}>Semana anterior</Button>
                        <Button colorScheme={'orange'} onPress={() => {
                            filter(2)
                        }} variant={activeButton === 2 ? 'solid' : 'outline'}>Semana</Button>
                        <Button colorScheme={'orange'} onPress={() => {
                            filter(3)
                        }} variant={activeButton === 3 ? 'solid' : 'outline'}>Mes</Button>
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
                              borderRadius={30} mx={2} my={2} alignItems={'center'}>
                            <Stack direction="row" mb="2.5" mt="1.5" space={4} p={2}>

                                {
                                    countFeeling && countFeeling.map((ele, i) => {
                                        return (
                                            <View key={i}>
                                                <Image source={{uri: ele.icon}} width={30} height={30} mb={1}/>
                                                <Text textAlign={'center'} color={`#${ele.color}`} fontSize={14}
                                                      style={{display: 'block'}}>{ele.count}</Text>
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
                            dataPie &&
                            <PieChartCustom dataCount={dataPie}/>
                    }
                </View>
                <View mx={2} my={2} mb={2}>
                    {
                        loading ?
                            <Skeleton height={250} p={2}></Skeleton> :
                            <CalendarChartCustom historyData={historyData}/>
                    }

                </View>

                <View flex={0.1} mx={4}>
                    <Button isLoading={loading} size="md" colorScheme={'orange'}
                            onPress={() => navigation.navigate('HistoryFeelingScreen')}>
                        Ver detalle
                    </Button>

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

export default connect(mapState)(StatisticsScreen);