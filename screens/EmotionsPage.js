import React, {useEffect, useState} from "react";
import {Box, Button, Heading, HStack, Image, Text, View, VStack} from "native-base";
import {connect} from "react-redux";
import {Dimensions, ScrollView} from "react-native";
import logo from '../assets/logo.png'
import _ from 'lodash'
import {getEmotions} from '../redux/ducks/feelingsDuck'
import moment from 'moment'
import ApiApp from "../utils/ApiApp";
import SelectEmotion from "../components/SelectEmotion";
import Roulette from "react-native-roulette";

import imagedemo from '../assets/yourfeel/relationicon.png';
import {LineChart} from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;


const EmotionsPage = ({feelingsDuck, navigation, getEmotions}) => {

    const [mainfeelings, setMainFeelings] = useState([])
    const [mainFeelingSelected, setMainFeelingSelected] = useState(null)
    const [currentFeelingSelected, setCurrentFeelingSelected] = useState(null)
    const [currentListFeeling, setCurrentListFeeling] = useState(null)

    const data = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
            {
                data: [20, 45, 28, 80, 99, 43],
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                strokeWidth: 2 // optional
            }
        ],
        legend: ["Rainy Days"] // optional
    };

    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };

    useEffect(() => {
        getEmotionsList();
        getMainEmotionsList();
    }, [])

    useEffect(() => {
        if (navigation) {
            console.log('cambia el navgation')
        }
    },[navigation])


    const getMainEmotionsList=async()=>{
        try{
            let response = await ApiApp.getFeelings('filters[$and][0][parent][name][$null]=true')
            setMainFeelings(response.data.data)
        }catch (e){
            console.log(e)
        }
    }



    const getEmotionsList=async (query=null)=>{
            try{
                const res = await getEmotions(query)
                return res.data
            }catch (e){
                console.log('errors ====> ',e)
                return []
            }
    }

    /**
     * Obtenemos un listado de emociones dado un id de parent
     * @param parentId id del parent
     * @param fromMain es desde la ruleta principal?
     * @returns {*[]}
     */
    const getListFromParent=(parentId, fromMain=true)=>{
        try{
            if(feelingsDuck.feelings){
                    let newaarray =[];
                    feelingsDuck.feelings.forEach((item,i)=>{
                    if(_.get(item,'attributes.parent.data.id',0)===parentId){
                        newaarray.push(item)
                    }
                })
                if(fromMain){
                    setCurrentListFeeling(newaarray)
                }else{
                    return newaarray
                }
            }

        }catch (e){
        }

    }



    const onSelectEmotion=(emotionId)=>{
        navigation.navigate('EmotionModal',{
            emotion: feelingsDuck.feelings.filter(o => o.id === emotionId)
        })
    }


    const formatDate=(datetime)=>{
        const date = new Date(datetime)
        return moment(date).format('DD/mm/YYYY , h:mm'); // June 1, 2019
    }


    const reset=()=>{
        setMainFeelingSelected(null)
        setCurrentFeelingSelected(null)
    }

    return (
        <Box flex={1} bg="#fff" alignItems="center">
            <HStack justifyContent={'center'} pt={5} pb={3}>
                <VStack>
                    <Image size={'xs'} source={logo}/>
                </VStack>
            </HStack>
            <ScrollView w={'100%'} bounces={false}>
                <HStack justifyContent={'center'}>
                    <VStack w={'100%'} alignItems={'center'}>
                        <Heading mb={5} color={'#FF2830'} fontSize="xl" p="4" pb="3">
                            <Text bold
                                  fontSize={'20px'}>{currentFeelingSelected ? `¿Por qué te sientes ${currentFeelingSelected.attributes.name}?` : '¿Cómo te sientes hoy?'}</Text>
                        </Heading>
                    </VStack>

                </HStack>
                <HStack w={'100%'}>
                    <VStack w={'100%'} p={5}>

                        <LineChart
                            data={data}
                            width={screenWidth}
                            height={220}
                            chartConfig={chartConfig}
                        />
                        <Roulette enableUserRotate={true} rouletteRotate={0} customStyle={{backgroundColor: 'white'}}
                                  customCenterStyle={{backgroundColor: 'white'}}
                                  onRotate={(props) => console.log(props)}>

                            <Image source={imagedemo} style={{resizeMode: 'cover', width: 50, height: 50}}
                            />

                            <View style={{backgroundColor: 'white'}}>
                                <Image source={imagedemo} width={10} height={10}
                                />
                            </View>
                            <View style={{backgroundColor: 'white'}}>
                                <Image source={imagedemo} width={10} height={10}
                                />
                            </View>
                            <View style={{backgroundColor: 'white'}}>
                                <Image source={imagedemo} width={10} height={10}
                                />
                            </View>
                            <View style={{backgroundColor: 'white'}}>
                                <Image source={imagedemo} width={10} height={10}
                                />
                            </View>
                            <View style={{backgroundColor: 'white'}}>
                                <Image source={imagedemo} width={10} height={10}
                                />
                            </View>


                        </Roulette>

                        {
                            (!mainFeelingSelected) ?
                                mainfeelings && mainfeelings.map((ele, i) => {
                                    return <Button block key={i} onPress={() => {
                                        setMainFeelingSelected(ele.id)
                                        setCurrentFeelingSelected(ele)
                                        getListFromParent(ele.id)
                                    }
                                    } mt={10}>{ele.attributes.name}</Button>
                                }):null
                        }


                        {
                            (currentListFeeling && mainFeelingSelected) ?
                                currentListFeeling.map((ele,i)=>{
                                    return <SelectEmotion onSelectEmotion={onSelectEmotion} emotions={feelingsDuck.feelings} parent={ele}/>
                                }):null
                        }
                    </VStack>
                </HStack>
            </ScrollView>



        </Box>
    )
}

const mapState = (state) => {
    return {
        feelingsDuck: state.feelingsDuck
    }
}

export default connect(mapState, {getEmotions})(EmotionsPage);