import React, {useEffect, useState} from "react";
import {Box, Text, VStack,HStack, Image, Slider, Icon, Button} from "native-base";
import {Alert, ScrollView} from "react-native";
import {connect} from "react-redux";
import logo from '../assets/logo.png'
import productsDuck from "../redux/ducks/productsDuck";
import bodyicon from '../assets/yourfeel/bodyicon.png'
import mentalicon from '../assets/yourfeel/mentalicon.png'
import relationicon from '../assets/yourfeel/relationicon.png'
import finantialicon from '../assets/yourfeel/finantialicon.png'
import uuid from 'react-native-uuid';
import {db, auth} from '../utils/firebase'
import {doc,setDoc} from 'firebase/firestore'

const YourFeelScreen = ({productsDuck,navigation}) => {
    const [loading, setLoading] = useState(false)
    const [physicalNumber, setPhysicalNumber] = useState(1)
    const [mentalNumber, setMentalNumber] = useState(1)
    const [finantialNumber, setFinantialNumber] = useState(1)
    const [relationNumber, setRelationNumber] = useState(1)

    useEffect(() => {
            console.log(auth.currentUser)
    }, [])

    const saveYourFeel=async ()=>{

        try {
            setLoading(true)
            let data = {
                physical: physicalNumber,
                mental: mentalNumber,
                finantial: finantialNumber,
                relation:relationNumber,
                id: uuid.v4(),
                createdAt: new Date().getTime(),
                createdBy: auth.currentUser.uid
            }
            const res =  await setDoc(doc(db,'yourFeels', data.id), data)
            console.log('guardado exitosamente',data)
            Alert.alert(
                "Genial!",
                "Se ha guardado exitosamente"
            );
            navigation.goBack();
        }catch (e){
            console.log('errror',e)
        }finally {
            setLoading(false)
        }

    }



    return (
        <Box flex={1} bg="#fff" alignItems="center">
            <ScrollView w={'100%'}>
                <HStack justifyContent={'center'} p={10}>
                    <Image size={'md'} source={logo} />
                </HStack>
                <HStack p={1}>

                    <VStack mt={5} w={'100%'}>
                        <VStack mb={9} alignItems={'center'}>
                            <Text bold size={'md'} color={'red.400'}>Del 1 al 10</Text>
                            <Text bold  size={'md'} color={'red.400'}>¿Cómo te calificas en?</Text>
                        </VStack>
                        <VStack p={7}>
                            <Slider step={1} minValue={1} maxValue={10} defaultValue={1} colorScheme="red" onChange={(v)=>setPhysicalNumber(v)} size="lg">
                                <Slider.Track bg={'red.100'}>
                                    <Slider.FilledTrack bg={'#FF2830'} />
                                </Slider.Track>
                                <Slider.Thumb  bg={'#FF2830'}/>
                            </Slider>
                            <Text fontSize="sm" style={styles}> <Image source={bodyicon}/> Física ({physicalNumber})</Text>
                        </VStack>

                        <VStack p={9}>
                            <Slider step={1} minValue={1} maxValue={10} defaultValue={1} colorScheme="red" onChange={(v)=>setMentalNumber(v)} size="lg">
                                <Slider.Track bg={'red.100'}>
                                    <Slider.FilledTrack bg={'#FF2830'} />
                                </Slider.Track>
                                <Slider.Thumb  bg={'#FF2830'}/>
                            </Slider>
                            <Text fontSize="sm" style={styles}> <Image source={mentalicon}/> Mental ({mentalNumber})</Text>
                        </VStack>

                        <VStack p={9}>
                            <Slider step={1} minValue={1} maxValue={10} defaultValue={1} colorScheme="red" onChange={(v)=>setFinantialNumber(v)} size="lg">
                                <Slider.Track bg={'red.100'}>
                                    <Slider.FilledTrack bg={'#FF2830'} />
                                </Slider.Track>
                                <Slider.Thumb  bg={'#FF2830'}/>
                            </Slider>
                            <Text fontSize="sm" style={styles}> <Image source={finantialicon}/> Financiera ({finantialNumber})</Text>
                        </VStack>

                        <VStack p={9}>
                            <Slider step={1} minValue={1} maxValue={10} defaultValue={1} colorScheme="red" onChange={(v)=>setRelationNumber(v)} size="lg">
                                <Slider.Track bg={'red.100'}>
                                    <Slider.FilledTrack bg={'#FF2830'} />
                                </Slider.Track>
                                <Slider.Thumb  bg={'#FF2830'}/>
                            </Slider>
                            <Text fontSize="sm" style={styles}> <Image source={relationicon}/> Relaciones Humanas ({relationNumber})</Text>
                        </VStack>

                        <Button m={4} size="lg" isLoading={loading} isLoadingText={'Guardando'} colorScheme={'red'} onPress={()=>saveYourFeel()}>
                            Guardar
                        </Button>

                    </VStack>
                </HStack>
            </ScrollView>
        </Box>
    )
}

const mapState = (state) => {
    return {
        productsDuck: state.productsDuck
    }
}

const styles={
    color:'gray'
}

export default connect(mapState)(YourFeelScreen);