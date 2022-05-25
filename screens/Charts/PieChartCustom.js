import React, {useEffect, useState} from "react";
import {PieChart} from "react-native-chart-kit";
import {Dimensions} from "react-native";
import {View} from "native-base";
import _ from 'lodash'

const screenWidth = Dimensions.get("window").width;

const PieChartCustom = ({dataCount,...props}) => {

    const [dataPie, setDataPie] = useState(null);


    const chartConfig = {
        backgroundGradientFrom: "white",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "white",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };

    const data = [
        {
            name: "Seoul",
            population: 50,
            color: "rgba(131, 167, 234, 1)",
            legendFontColor: "#7F7F7F",
            legendFontSize: 10
        },
        {
            name: "Toronto",
            population: 50,
            color: "#F00",
            legendFontColor: "#7F7F7F",
            legendFontSize: 10
        },
        {
            name: "Beijing",
            population: 12,
            color: "red",
            legendFontColor: "#7F7F7F",
            legendFontSize: 10
        },
        {
            name: "New York",
            population: 23,
            color: "#f14e13",
            legendFontColor: "#7F7F7F",
            legendFontSize: 10
        },
        {
            name: "Moscow",
            population: 76,
            color: "rgb(0, 0, 255)",
            legendFontColor: "#7F7F7F",
            legendFontSize: 10
        }
    ];

    return (
        <View mx={2} my={2} >
            {
                <PieChart
                    data={dataCount}
                    width={screenWidth}
                    height={250}
                    hasLegend={true}
                    chartConfig={chartConfig}
                    accessor={"count"}
                    paddingLeft={'30'}
                    backgroundColor={"transparent"}
                    center={[0,10]}
                    absolute
                />
            }

        </View>

    );
}

export default PieChartCustom;
