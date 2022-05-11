import React from "react";
import {LineChart} from "react-native-chart-kit";
import {Dimensions} from "react-native";
import {View} from "native-base";

const screenWidth = Dimensions.get("window").width;

const lineChartCustom = () => {

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

    const data = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
            {
                data: [20, 45, 28, 80, 99, 43],
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // optional
                strokeWidth: 2 // optional
            }
        ],
        legend: ["Rainy Days"] // optional
    };

    return (
        <View mx={2} my={2} alignItems={'center'}>
            <LineChart
                data={data}
                width={screenWidth / 1.1}
                height={220}
                chartConfig={chartConfig}
                style={{borderRadius: 10}}
            />
        </View>

    );
}

export default lineChartCustom;
