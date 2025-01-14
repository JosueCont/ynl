import React, {useEffect, useState} from 'react';
import {Calendar, LocaleConfig} from "react-native-calendars";
import {View, Text} from "native-base";
import {Dimensions} from "react-native";
import _ from 'lodash'
import moment from 'moment'
const screenWidth = Dimensions.get("window").width;

const CalendarChartCustom = ({historyData}) => {

    const [arrayDate,setArrayDates] = useState({})

    LocaleConfig.locales['es'] = {
        monthNames: [
            'Enero',
            'Febrero',
            'Marzo',
            'Abril',
            'Mayo',
            'Junio',
            'Julio',
            'Agosto',
            'Septiembre',
            'Octubre',
            'Noviembre',
            'Diciembre'
        ],
        monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep.', 'Oct', 'Nov', 'Dic'],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sabado'],
        dayNamesShort: ['Dom.', 'Lun.', 'Mar.', 'Mie.', 'Jue.', 'Vie.', 'Sab.'],
        today: "Hoy"
    };

    LocaleConfig.defaultLocale = 'es';

    useEffect(()=>{
         if(historyData){
             //console.log(historyData)
             let arr = {}
             //historyData = _.sortBy(historyData, ['date'])
             
             historyData.forEach((obj, i)=>{
                 //console.log(obj.date)
                 //arr[moment(obj.date).format().split('T')[0]] = {textColor:'white',color: `#${obj.color}`, endingDay: true, startingDay: true}
                 arr[moment(obj.date).format().split('T')[0]] = {textColor:'white',color: `${obj.color}`, endingDay: true, startingDay: true}
             })
             console.log(arr)
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