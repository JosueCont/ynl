import React, {useEffect, useState} from 'react';
import {Calendar} from "react-native-calendars";
import {View, Text} from "native-base";
import {Dimensions} from "react-native";
import _ from 'lodash'
const screenWidth = Dimensions.get("window").width;

const CalendarChartCustom = ({historyData}) => {

    const [arrayDate,setArrayDates] = useState({})

    useEffect(()=>{
         if(historyData){
             let arr = {}
             historyData.forEach((obj, i)=>{
                 arr[obj.date.split('T')[0]] = {textColor:'white',color: `#${obj.color}`, endingDay: true, startingDay: true}
             })

             setArrayDates(arr)
         }
    },[historyData])

    return (
        <View mx={2} my={2} alignItems={'center'}>
            <Calendar
                style={{width: screenWidth / 1.1, borderRadius: 10}}
                markingType={'period'}
                markedDates={arrayDate}
            />
        </View>
    )
}

export default CalendarChartCustom;