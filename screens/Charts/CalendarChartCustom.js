import React from 'react';
import {Calendar} from "react-native-calendars";
import {View} from "native-base";
import {Dimensions} from "react-native";

const screenWidth = Dimensions.get("window").width;

const CalendarChartCustom = () => {
    return (
        <View mx={2} my={2} alignItems={'center'}>
            <Calendar
                style={{width: screenWidth / 1.1, borderRadius: 10}}
                markingType={'period'}
                markedDates={{
                    '2022-05-20': {textColor: 'green'},
                    '2022-05-22': {startingDay: true, color: 'green'},
                    '2022-05-23': {selected: true, endingDay: true, color: 'green', textColor: 'gray'},
                    '2022-05-04': {disabled: true, startingDay: true, color: 'green', endingDay: true}
                }}
            />
        </View>
    )
}

export default CalendarChartCustom;