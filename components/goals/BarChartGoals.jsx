import { Dimensions, StyleSheet} from 'react-native'
import React, { useEffect, useState } from 'react'
import { BarChart } from "react-native-chart-kit";
import { Colors } from '../../utils/Colors';
import { height, textAlign, zIndex } from 'styled-system';
import { HStack, Image, Skeleton, Spinner, Text, VStack, View } from 'native-base';
import { useSelector } from 'react-redux';
import { baseURL } from '../../utils/AxiosApi';
import { getUrlImage } from '../../utils/functions';


const BarChartGoals = ({dataReport, loading, ...props}) => {

  const categories = useSelector(state => state.goalsDuck?.categories);
  const [dataChart, setDataChart] = useState([])
  const screenWidth = Dimensions.get("window").width;

  const chartConfig = {
    backgroundGradientFrom: Colors.white,
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: Colors.white,
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(100, 100, 100, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.75,
    decimalPlaces:0,
    useShadowColorFromDataset: false, // optional
  };
  
  useEffect(() => {
    let data = []
    for (let idx = 0; idx < dataReport.length ; idx++) {
      data.push(dataReport[idx]['goals'])
      data.push(dataReport[idx]['goals_completed'])
      data.push(0)
    }
    
    setDataChart(data)
  }, [dataReport])
  


  const data = {
    labels: ["", "", "", ""],
    datasets: [
      {
        data: dataChart,
        colors: [
            (opacity = 1) => Colors.yellowV2,
            (opacity = 1) => Colors.red,
            (opacity = 1) => Colors.yellowV2,
            (opacity = 1) => Colors.yellowV2,
            (opacity = 1) => Colors.red,
            (opacity = 1) => Colors.yellowV2,
            (opacity = 1) => Colors.yellowV2,
            (opacity = 1) => Colors.red,
            (opacity = 1) => Colors.yellowV2,
            (opacity = 1) => Colors.yellowV2,
            (opacity = 1) => Colors.red,
            (opacity = 1) => Colors.red,
        ]
      }
    ]
  };

  return (
    <View style={{ position:'relative' }} >
      {
        loading ? 
        <Skeleton height={screenWidth} /> :
        <>
          <BarChart
          showBarTops={false}
          data={data}
          width={screenWidth}
          height={screenWidth-50}
          verticalLabelRotation={270}
          chartConfig={chartConfig}
          horizontalLabelRotation={270}
          withHorizontalLabels={true}
          yLabelsOffset={-325}
          withCustomBarColorFromData={true}
          flatColor={true}
          bezier
          style={{
            paddingLeft:0,
            marginTop:-87,
            transform: [{ rotate: "90deg" }],
          }}
      />
      <View style={styles.categoriesLeft} height={screenWidth}  >
        <VStack space={39} marginTop={2} justifyContent={'space-between'}  >
        {
          loading && <Skeleton height={'90%'} width={50} />
        }
        {
          dataReport?.map(item => (
            <View >
                <Image alt={`${item.id}`} resizeMode='contain' aspectRatio={2}  source={{ uri: getUrlImage(item?.icon?.url) }} />
                <Text textAlign={'center'} fontSize={10}>
                    {item?.name}
                </Text>
            </View>
            )
          )
        }
        </VStack>
      </View>
        </>
      }
    </View>
  )
}

export default BarChartGoals

const styles = StyleSheet.create({
  categoriesLeft: {
    position:'absolute',
    left:0,
    with:500,
    zIndex:10
  },
  overlayLoading:{
    width:'100%',
    height:'100%',
  },
  overlayText:{
    margin:'auto',
    justifyContent:'center'
  }
  /* categoriesLabels:{

  } */
})