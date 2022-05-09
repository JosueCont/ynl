import React, {useEffect, useState} from "react";
import {Box, Button, HStack, Image, Skeleton, Slider, Text, View, VStack} from "native-base";
import {Alert, ScrollView} from "react-native";
import {connect} from "react-redux";
import logo from '../assets/logo.png'
import bodyicon from '../assets/yourfeel/bodyicon.png'
import mentalicon from '../assets/yourfeel/mentalicon.png'
import relationicon from '../assets/yourfeel/relationicon.png'
import finantialicon from '../assets/yourfeel/finantialicon.png'
import ApiApp from "../utils/ApiApp";

const YourFeelScreen = ({authDuck, navigation}) => {
    const [loading, setLoading] = useState(false)
    const [physicalNumber, setPhysicalNumber] = useState(1)
    const [mentalNumber, setMentalNumber] = useState(1)
    const [finantialNumber, setFinantialNumber] = useState(1)
    const [relationNumber, setRelationNumber] = useState(1)
    const [user, setUser] = useState(false)


    useEffect(() => {
        if (authDuck.isLogged) {
            setUser(authDuck.user)
        }
    }, [authDuck])

    useEffect(() => {
        getYourFeel(authDuck.user.id);
    }, [])


    const saveYourFeel = async () => {

        try {
            setLoading(true)

            let data = {
                finantial: finantialNumber,
                mental: mentalNumber,
                physical: physicalNumber,
                relations: relationNumber,
                user: user ? user.id : null
            }
            const res = await ApiApp.saveFeelAspects({data})
            console.log('res', res)

            Alert.alert(
                "Genial!",
                "Se ha guardado exitosamente"
            );
            // navigation.goBack();
        } catch (e) {
            console.log('errror', e)
        } finally {
            setLoading(false)
        }

    }


    const getYourFeel = async () => {
        try {
            setLoading(true)
            const response = await ApiApp.getFeelings(authDuck.user.id);
            const {physical, finantial, mental, relations} = response.data.data[0].attributes;
            setPhysicalNumber(physical);
            setFinantialNumber(finantial);
            setMentalNumber(mental);
            setRelationNumber(relations);
        } catch (ex) {
            console.log(ex)
        } finally {
            setLoading(false)
        }
    }


    return (
        <Box flex={1} bg="#fff" alignItems="center">
            <ScrollView w={'100%'}>
                <HStack justifyContent={'center'} p={10}>
                    <Image size={'sm'} source={logo}/>
                </HStack>
                <HStack p={1}>

                    <VStack mt={5} w={'100%'}>
                        <VStack mb={9} alignItems={'center'}>
                            <Text bold size={'md'} color={'red.400'} textAlign={'center'}>Del 1 al 10{'\n'}¿Cómo te
                                calificas en?</Text>
                        </VStack>
                        {
                            loading ?
                                <VStack p={9} pb={0}>
                                    <Skeleton h={10}></Skeleton>
                                </VStack>
                                :
                                <VStack p={9} pb={5}>
                                    <Slider step={1} minValue={1} maxValue={10} value={physicalNumber} colorScheme="red"
                                            onChange={(v) => setPhysicalNumber(v)} size="lg">
                                        <Slider.Track bg={'red.100'}>
                                            <Slider.FilledTrack bg={'#FF2830'}/>
                                        </Slider.Track>
                                        <Slider.Thumb bg={'#FF2830'}/>
                                    </Slider>
                                    <View flexDirection={'row'}>
                                        <View justifyContent={'center'}>
                                            <Image source={bodyicon} width={4} style={{resizeMode: 'contain'}}/>
                                        </View>
                                        <View justifyContent={'center'}>
                                            <Text fontSize="md" style={styles}>Física ({physicalNumber})</Text>

                                        </View>
                                    </View>
                                </VStack>
                        }
                        {
                            loading ?
                                <VStack p={9} pb={0}>
                                    <Skeleton h={10}></Skeleton>
                                </VStack>
                                : <VStack p={9} pb={5}>
                                    <Slider step={1} minValue={1} maxValue={10} value={mentalNumber} colorScheme="red"
                                            onChange={(v) => setMentalNumber(v)} size="lg">
                                        <Slider.Track bg={'red.100'}>
                                            <Slider.FilledTrack bg={'#FF2830'}/>
                                        </Slider.Track>
                                        <Slider.Thumb bg={'#FF2830'}/>
                                    </Slider>

                                    <View flexDirection={'row'}>
                                        <View justifyContent={'center'}>
                                            <Image source={mentalicon} width={4} style={{resizeMode: 'contain'}}/>
                                        </View>
                                        <View justifyContent={'center'}>
                                            <Text fontSize="md" style={styles}> Mental ({mentalNumber})</Text>

                                        </View>
                                    </View>
                                </VStack>
                        }

                        {
                            loading ?
                                <VStack p={9} pb={0}>
                                    <Skeleton h={10}></Skeleton>
                                </VStack> :
                                <VStack p={9} pb={5}>
                                    <Slider step={1} minValue={1} maxValue={10} value={finantialNumber}
                                            colorScheme="red"
                                            onChange={(v) => setFinantialNumber(v)} size="lg">
                                        <Slider.Track bg={'red.100'}>
                                            <Slider.FilledTrack bg={'#FF2830'}/>
                                        </Slider.Track>
                                        <Slider.Thumb bg={'#FF2830'}/>
                                    </Slider>
                                    <View flexDirection={'row'}>
                                        <View justifyContent={'center'}>
                                            <Image source={finantialicon} width={4} style={{resizeMode: 'contain'}}/>
                                        </View>
                                        <View justifyContent={'center'}>
                                            <Text fontSize="md" style={styles}>Financiera ({finantialNumber})</Text>

                                        </View>
                                    </View>

                                </VStack>
                        }
                        {
                            loading ?
                                <VStack p={9} pb={0}>
                                    <Skeleton h={10}></Skeleton>
                                </VStack> :
                                <VStack p={9} pb={5}>
                                    <Slider step={1} minValue={1} maxValue={10} value={relationNumber} colorScheme="red"
                                            onChange={(v) => setRelationNumber(v)} size="lg">
                                        <Slider.Track bg={'red.100'}>
                                            <Slider.FilledTrack bg={'#FF2830'}/>
                                        </Slider.Track>
                                        <Slider.Thumb bg={'#FF2830'}/>
                                    </Slider>
                                    <View flexDirection={'row'}>
                                        <View justifyContent={'center'}>
                                            <Image source={relationicon} width={4} style={{resizeMode: 'contain'}}/>
                                        </View>
                                        <View justifyContent={'center'}>
                                            <Text fontSize="md" style={styles}> Relaciones Humanas
                                                ({relationNumber})</Text>
                                        </View>
                                    </View>

                                </VStack>

                        }
                        {
                            loading ?
                                <VStack p={9} pb={0}>
                                    <Skeleton h={10}></Skeleton>
                                </VStack> :
                                <Button m={4} size="lg" isLoading={loading} isLoadingText={'Guardando'}
                                        colorScheme={'red'}
                                        onPress={() => saveYourFeel()}>
                                    Guardar
                                </Button>
                        }

                    </VStack>
                </HStack>
            </ScrollView>
        </Box>
    )
}

const mapState = (state) => {
    return {
        authDuck: state.authDuck
    }
}

const styles = {
    color: 'gray'
}

export default connect(mapState)(YourFeelScreen);