import React, {useEffect, useState} from "react";
import {Box, Button, Heading, HStack, Image, Text, VStack} from "native-base";
import {connect} from "react-redux";
import {ScrollView} from "react-native";
import logo from '../assets/logo.png'
import _ from 'lodash'
import {getEmotions, getEmotionsV3} from '../redux/ducks/feelingsDuck'
import moment from 'moment'
import ApiApp from "../utils/ApiApp";
import SelectEmotion from "../components/SelectEmotion";

const EmotionsPage = ({feelingsDuck, navigation, getEmotions, getEmotionsV3, authDuck}) => {

    const [mainfeelings, setMainFeelings] = useState([])
    const [mainFeelingSelected, setMainFeelingSelected] = useState(null)
    const [currentFeelingSelected, setCurrentFeelingSelected] = useState(null)
    const [currentListFeeling, setCurrentListFeeling] = useState(null)


    useEffect(() => {
        getMainEmotionsList();
    }, [])

    useEffect(() => {
        getEmotionsList();
    }, [])

    useEffect(() => {
        if (navigation) {
            console.log('cambia el navgation')
        }
    }, [navigation])


    const getMainEmotionsList = async () => {
        try {
            let response = await ApiApp.getFeelingsV2('filters[$and][0][parent][id][$null]=true')

            console.log(response.data)
            setMainFeelings(response.data.data)
        } catch (e) {
            console.log(e.response)
        }
    }


    const getEmotionsList = async (query = null) => {
        try {
            const res = await getEmotionsV3()
            return res.data
        } catch (e) {
            console.log('errors ====> ', e.response)
            return []
        }
    }

    /**
     * Obtenemos un listado de emociones dado un id de parent
     * @param parentId id del parent
     * @param fromMain es desde la ruleta principal?
     * @returns {*[]}
     */
    const getListFromParent = (parentId, fromMain = true) => {
        try {
            if (feelingsDuck.feelings) {
                let newaarray = [];

                feelingsDuck.feelings.forEach((item, i) => {
                    console.log(_.get(item, 'attributes.parent.data.id', 0), 71, parentId)

                    if (_.get(item, 'attributes.parent.data.id', 0) === parentId) {
                        newaarray.push(item)
                    }

                })

                if (fromMain) {
                    setCurrentListFeeling(newaarray)
                } else {
                    return newaarray
                }
            }

        } catch (e) {
            console.log(e)
        }

    }


    const onSelectEmotion = (emotionId) => {
        navigation.navigate('EmotionModal', {
            emotion: feelingsDuck.feelings.filter(o => o.id === emotionId)
        })
    }


    const formatDate = (datetime) => {
        const date = new Date(datetime)
        return moment(date).format('DD/mm/YYYY , h:mm'); // June 1, 2019
    }


    const reset = () => {
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
            <ScrollView w={'100%'}>
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

                        {
                            (!mainFeelingSelected) ?
                                mainfeelings && mainfeelings.map((ele, i) => {
                                    return <Button block key={i} onPress={() => {
                                        console.log(ele.id, 134)
                                        setMainFeelingSelected(ele.id)
                                        setCurrentFeelingSelected(ele)
                                        getListFromParent(ele.id)
                                    }
                                    } mt={10}>{ele.attributes.name}</Button>
                                }) : null
                        }


                        {
                            (currentListFeeling && mainFeelingSelected) ?
                                currentListFeeling.map((ele, i) => {
                                    return <SelectEmotion onSelectEmotion={onSelectEmotion}
                                                          emotions={feelingsDuck.feelings} parent={ele}/>
                                }) : null
                        }
                    </VStack>
                </HStack>
            </ScrollView>


        </Box>
    )
}

const mapState = (state) => {
    return {
        feelingsDuck: state.feelingsDuck,
        authDuck: state.authDuck
    }
}

export default connect(mapState, {getEmotions, getEmotionsV3})(EmotionsPage);