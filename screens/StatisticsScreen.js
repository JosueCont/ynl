import React, {useEffect, useState} from 'react';
import {ScrollView, Text, Stack, Button, Icon} from "native-base";
import {Colors} from "../utils/Colors";
import {connect} from "react-redux";
import {useIsFocused} from "@react-navigation/native";
import PieChartCustom from "./Charts/PieChartCustom";
import CalendarChartCustom from "./Charts/CalendarChartCustom";
import ApiApp from "../utils/ApiApp";
import _ from 'lodash'
import {TouchableOpacity, View} from "react-native";
import {MaterialIcons} from "@expo/vector-icons";
import {getShadowCircleStyle} from "../utils/functions";

const StatisticsScreen = ({authDuck,navigation, ...props}) => {
    const isFocused = useIsFocused();
    const [historyData, setHistoryData] = useState(null)
    const [activeButton, setActiveButton] = useState(1)
    const [countFeeling, setCountFeeling] = useState(null)
    const [dataPie, setDataPie] = useState(null);

    useEffect(()=>{
        getHistoryData(authDuck.user.id)
        getCountFeelings(authDuck.user.id)
    },[isFocused])



    const getCountFeelings=async (userId)=>{
        try{
            let startDate = '2020-01-01',enDate = '2100-01-01';
            const res = await ApiApp.getUserProgress(userId);
            console.log('semanal',res.data.data.feelings)
            setCountFeeling(res.data.data.feelings)

            setDataPie(_.map(res.data.data.feelings, (ele,i)=>{
                return {
                    name:ele.name,
                    count:ele.count,
                    color: '#'+ele.color,
                    legendFontColor: "#7F7F7F",
                    legendFontSize: 10
                }
            }))


        }catch (e){
            setCountFeeling(null)
            console.log('e',e)
        }
    }

    const getHistoryData=async (userId)=>{
        console.log('entra getHistory')
        try{
            let startDate = '2020-01-01',enDate = '2100-01-01';
            const res = await ApiApp.getHistoryFeelings(startDate,enDate,userId)
            let arrayDates  = _.map(res.data.data, (obj)=>{
                let dataItem = {
                    date: obj.attributes.createdAt,
                    color: obj.attributes.feeling.data.attributes.color,
                    feeling: obj.attributes.feeling.data,
                }

                return dataItem;
            })

            setHistoryData(arrayDates)

        }catch (e){
            console.log(e)
        }
    }

    const filter=(index)=>{
        //setActiveButton(index)
    }

    return (
        <ScrollView flexGrow={1} bgColor={Colors.gray}>
            <View mx={2} my={2} style={{marginTop:30}} alignItems={'center'}>
                <Button.Group isAttached colorScheme="red" mx={{
                    base: "auto",
                    md: 0
                }} size="sm">
                    <Button onPress={()=>{
                        filter(0)
                    }} variant={activeButton===0?'solid':'outline'} >Semana anterior</Button>
                    <Button onPress={()=>{
                        filter(1)
                    }} variant={activeButton===1?'solid':'outline'}>Semana</Button>
                    <Button onPress={()=>{
                        filter(2)
                    }} variant={activeButton===2?'solid':'outline'}>Mes</Button>
                </Button.Group>
            </View>
            <View style={{...getShadowCircleStyle(0, 10), backgroundColor:'white',paddingTop:10, marginEnd:20, marginStart:20, marginTop:20}}
                       borderRadius={30}  mx={2} my={2} alignItems={'center'}>
                <Stack direction="row" mb="2.5" mt="1.5" space={3}>
                    {
                        countFeeling && countFeeling.map((ele,i)=>{
                            return  <View key={i}>
                                <Icon  as={MaterialIcons} color={`#${ele.color}`} name={'mood'} size={'3xl'} />
                                <Text textAlign={'center'} color={`#${ele.color}`} fontSize={16} style={{display:'block'}}>{ele.count}</Text>
                            </View>
                        })
                    }
                </Stack>
            </View>
            <View mx={2} my={2} alignItems={'left'}>
                {
                    dataPie && <PieChartCustom dataCount={dataPie}/>
                }

            </View>
            <View mx={2} my={2} alignItems={'left'}>
                <CalendarChartCustom historyData={historyData}/>
            </View>

            <View mx={2} my={2} alignItems={'left'}>
                <TouchableOpacity onPress={()=>
                    navigation.navigate('HistoryFeelingScreen')
                }>
                    <Text style={{fontSize:16, color:'#FF5E00'}} mx={8}>
                        Ver detalle
                    </Text>
                </TouchableOpacity>
            </View>

        </ScrollView>
    )
}

const mapState = (state) => {
    return {
        authDuck: state.authDuck
    }
}

export default connect(mapState)(StatisticsScreen);