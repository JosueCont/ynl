import React, {useEffect, useState} from "react";
import {Button, Image, Text, View} from "native-base";
import {connect} from "react-redux";
import {ImageBackground} from "react-native";
import calendar from '../assets/calendaricon.png'
import logo from '../assets/logo.png'
import {getDay, getMonth} from '../utils/functions'
import {saveEmotion} from "../redux/ducks/feelingsDuck";
import {Colors} from "../utils/Colors";
import ScreenBaseV1 from "./Components/ScreenBaseV1";

const RouletteStep4Screen = ({navigation, route, saveEmotion, authDuck}) => {

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        navigation.setOptions({
            headerStyle: {backgroundColor: '#' + route.params.emotion.attributes.color}
        })
    }, [route.params.emotion.id])

    const saveFeelings = async () => {
        setLoading(true)

        try {
            let data = {
                label: route.params.emotion.attributes.name,
                feeling: route.params.emotion.id,
                user: authDuck.user.id
            }
            let res = await saveEmotion({data})
            if (res) {

                navigation.reset({
                    index: 0,
                    routes: [{name: 'HomeScreen'}],
                });
            }
        } catch (e) {

        } finally {
            setLoading(false)
        }
    }

    return (
        <ScreenBaseV1 color={'#' + route.params.emotion.attributes.color}>
            <View flex={1} mx={4} w={'100%'}>

                <View flex={0.5} alignItems={'center'} mt={4}>
                    <Image size={'xs'} source={logo}/>
                </View>

                <View flex={1} alignItems={'center'}>
                    <Text style={{fontSize: 20, color: 'black'}}>Hoy me siento</Text>

                    <Text bold color={Colors.red}
                          fontSize={30}>{route.params.emotion && route.params.emotion.attributes.name.toUpperCase()}</Text>

                    <ImageBackground source={calendar} style={{width: 80}} resizeMode={'contain'}>
                        <Text style={styles.textMonth}>{getMonth()}</Text>
                        <Text style={styles.textDay}>{getDay()}</Text>
                    </ImageBackground>
                </View>

                <View flex={0.1} mx={4}>
                    <Button isLoading={loading} size="md" colorScheme={'orange'}
                            onPress={() => saveFeelings()}>
                        Terminar
                    </Button>

                </View>
            </View>

        </ScreenBaseV1>
    )
}

const mapState = (state) => {
    return {
        productsDuck: state.productsDuck,
        authDuck: state.authDuck
    }
}

const styles = {
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: 10,
        paddingTop: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        flex: 1,
        justifyContent: "center",
        height: 80,
        width: 80,
    },
    textDay: {
        color: 'black',
        fontSize: 30,
        position: 'relative',
        marginBottom: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    textMonth: {
        color: 'white',
        fontSize: 15,
        marginTop: 10,
        textAlign: 'center'
    }
};


export default connect(mapState, {saveEmotion})(RouletteStep4Screen);