import React, {useEffect, useState} from 'react';
import {ScrollView, Text} from "native-base";
import {Colors} from "../utils/Colors";
import {connect} from "react-redux";
import {useIsFocused} from "@react-navigation/native";
import LineChartCustom from "./Charts/LineChartCustom";
import CalendarChartCustom from "./Charts/CalendarChartCustom";
import ApiApp from "../utils/ApiApp";
import _ from 'lodash'
import {TouchableOpacity, View} from "react-native";

const StatisticsScreen = ({authDuck,navigation, ...props}) => {
    const isFocused = useIsFocused();
    const [historyData, setHistoryData] = useState(null)

    useEffect(()=>{
        console.log('entra')
            getHistoryData(authDuck.user.id)
    },[isFocused])




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

    return (
        <ScrollView flexGrow={1} bgColor={Colors.gray}>
            <LineChartCustom/>
            <CalendarChartCustom historyData={historyData}/>
            <View mx={2} my={2} alignItems={'left'}>
                <TouchableOpacity onPress={()=>
                    navigation.navigate('HistoryFeelingScreen')
                }>
                    <Text style={{fontSize:10}} mx={8}>
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