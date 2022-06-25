import React from "react";
import {ProgressChart} from "react-native-chart-kit";
import {Dimensions} from "react-native";
import {View} from "native-base";

const screenWidth = Dimensions.get("window").width;

const ProgressChartCustom = () => {


    const data = {
        labels: ["Físico", "Mental", "Financiera", "Relaciones humanas"], // optional
        data: [1, 0.6, 1, 0.7]
    };

    const chartConfig={
        backgroundGradientFrom: "#fff",
        backgroundGradientTo: "#fff",
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    }


    return (
        <View mx={2} my={2} alignItems={'center'}>
            <ProgressChart
                data={data}
                width={screenWidth-20}
                height={220}
                strokeWidth={10}
                radius={40}
                chartConfig={chartConfig}
                hideLegend={true    }
            />
        </View>

    );
}

export default ProgressChartCustom;
