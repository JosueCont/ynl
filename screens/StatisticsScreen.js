import React from 'react';
import {ScrollView} from "native-base";
import {Colors} from "../utils/Colors";
import LineChartCustom from "./Charts/LineChartCustom";
import CalendarChartCustom from "./Charts/CalendarChartCustom";

const StatisticsScreen = () => {
    return (
        <ScrollView flexGrow={1} bgColor={Colors.gray}>
            <LineChartCustom/>

            <CalendarChartCustom/>
        </ScrollView>
    )
}

export default StatisticsScreen;