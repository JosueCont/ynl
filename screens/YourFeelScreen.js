import React, {useEffect, useState} from "react";
import {Box, Button, HStack, Icon, Image, Skeleton, Slider, Text, useToast, View, VStack} from "native-base";
import {ScrollView} from "react-native";
import {connect} from "react-redux";
import bodyicon from '../assets/yourfeel/bodyicon.png'
import { MaterialIcons } from "@expo/vector-icons";
import mentalicon from '../assets/yourfeel/mentalicon.png'
import relationicon from '../assets/yourfeel/relationicon.png'
import finantialicon from '../assets/yourfeel/finantialicon.png'
import ApiApp from "../utils/ApiApp";
import {Colors} from "../utils/Colors";
import {t} from 'i18n-js';
import ModalSuccess from "./Modals/ModalSuccess";
import ModalError from "./Modals/ModalError";
import {useIsFocused} from "@react-navigation/native";

const YourFeelScreen = ({authDuck, navigation}) => {
    const isFocused = useIsFocused();
    const [loading, setLoading] = useState(true)
    const [physicalNumber, setPhysicalNumber] = useState(1)
    const [mentalNumber, setMentalNumber] = useState(1)
    const [finantialNumber, setFinantialNumber] = useState(1)
    const [relationNumber, setRelationNumber] = useState(1)
    const [user, setUser] = useState(false)
    const [site, setSite] = useState(null)
    const toast = useToast();
    const [modalSuccessVisible, setModalSuccessVisible] = useState(null)
    const [modalErrorVisible, setModalErrorVisible] = useState(null)


    useEffect(() => {
        if (authDuck.isLogged) {
            setUser(authDuck.user)
            if (authDuck.userSiteConfig?.id) {
                setSite(authDuck.userSiteConfig)
            } 
        }
    }, [authDuck])

    useEffect(() => {
        if(isFocused){
            getYourFeel(authDuck.user.id);
        }

    }, [isFocused])


    const saveYourFeel = async () => {
        try {
            setLoading(true)

            let data = {
                finantial: finantialNumber,
                mental: mentalNumber,
                physical: physicalNumber,
                relations: relationNumber,
                user: user ? user.id : null,
                site: site ? site.id : null
            }
            console.log("🚀 ~ file: YourFeelScreen.js ~ line 58 ~ saveYourFeel ~ data", data)
            const res = await ApiApp.saveFeelAspects({data})
            // console.log('res', res)

            setModalSuccessVisible(true)

        } catch (e) {
            console.log('saveYourFeel error =>',e.toString());
            setModalErrorVisible(true)
        } finally {
            setLoading(false)
        }

    }


    const getYourFeel = async () => {
        try {
            setLoading(true)
            const response = await ApiApp.getFeelings(authDuck.user.id, authDuck.userSiteConfig);
            const {physical, finantial, mental, relations} = response.data.data[0].attributes;
            setPhysicalNumber(physical);
            setFinantialNumber(finantial);
            setMentalNumber(mental);
            setRelationNumber(relations);
        } catch (e) {
            console.log('getYourFeel error =>',e.toString());
        } finally {
            setLoading(false)
        }
    }


    return (
        <Box flex={1} bg="#fff" alignItems="center">
            <ScrollView w={'100%'}>
               {/* <HStack justifyContent={'center'} p={10}>
                    <Image size={'md'} source={logo} alt="img"/>
                </HStack>*/}
                <HStack p={1} mt={10}>

                    <VStack mt={5} w={'100%'}>
                        <VStack mb={4} alignItems={'center'}>
                            <Text bold size={'md'} color={Colors.red} textAlign={'center'} mb={6}>{t('aspects_1_to_10')} {'\n'} {t('aspects_how_are_in')}</Text>
                        </VStack>
                        {
                            loading ?
                                <VStack px={9} mt={3} pb={3}>
                                    <Skeleton h={10}></Skeleton>
                                </VStack>
                                :
                                <VStack px={9} mt={3} pb={3}>
                                    <View flexDirection={'row'}>
                                        <View style={{flex:1}}>
                                            <Icon
                                                as={MaterialIcons}
                                                name="minimize"
                                                size={3}
                                            />
                                        </View>

                                        <View  style={{flex:1}}>
                                            <Icon
                                                as={MaterialIcons}
                                                name="add"
                                                style={{alignSelf: "flex-end"}}
                                                size={3}
                                            />
                                        </View>
                                    </View>
                                    <Slider step={1} minValue={1} maxValue={10} value={physicalNumber}
                                            colorScheme="orange"
                                            onChange={(v) => setPhysicalNumber(v)} size="lg">
                                        <Slider.Track bg={'red.100'}>
                                            <Slider.FilledTrack bg={Colors.red}/>
                                        </Slider.Track>
                                        <Slider.Thumb bg={Colors.red}/>
                                    </Slider>
                                    <View flexDirection={'row'}>
                                        <View justifyContent={'center'}>
                                            <Image source={bodyicon} tintColor={Colors.red} width={4}
                                                   style={{resizeMode: 'contain'}} alt="img"/>
                                        </View>
                                        <View justifyContent={'center'}>
                                            <Text fontSize="md" style={styles}> {t('fisica')} ({physicalNumber})</Text>

                                        </View>
                                    </View>
                                </VStack>
                        }
                        {
                            loading ?
                                <VStack px={9} mt={3} pb={3}>
                                    <Skeleton h={10}></Skeleton>
                                </VStack>
                                : <VStack px={9} mt={3} pb={3}>
                                    <View flexDirection={'row'}>
                                        <View style={{flex:1}}>
                                            <Icon
                                                as={MaterialIcons}
                                                name="minimize"
                                                size={3}
                                            />
                                        </View>

                                        <View  style={{flex:1}}>
                                            <Icon
                                                as={MaterialIcons}
                                                name="add"
                                                style={{alignSelf: "flex-end"}}
                                                size={3}
                                            />
                                        </View>
                                    </View>
                                    <Slider step={1} minValue={1} maxValue={10} value={mentalNumber} colorScheme="orange"
                                            onChange={(v) => setMentalNumber(v)} size="lg">
                                        <Slider.Track bg={'red.100'}>
                                            <Slider.FilledTrack bg={Colors.red}/>
                                        </Slider.Track>
                                        <Slider.Thumb bg={Colors.red}/>
                                    </Slider>

                                    <View flexDirection={'row'}>
                                        <View justifyContent={'center'}>
                                            <Image tintColor={Colors.red} source={mentalicon} width={4}
                                                   style={{resizeMode: 'contain'}} alt="img"/>
                                        </View>
                                        <View justifyContent={'center'}>
                                            <Text fontSize="md" style={styles}> {t('mental')} ({mentalNumber})</Text>

                                        </View>
                                    </View>
                                </VStack>
                        }

                        {
                            loading ?
                                <VStack px={9} mt={3} pb={3}>
                                    <Skeleton h={10}></Skeleton>
                                </VStack> :
                                <VStack px={9} mt={3} pb={3}>
                                    <View flexDirection={'row'}>
                                        <View style={{flex:1}}>
                                            <Icon
                                                as={MaterialIcons}
                                                name="minimize"
                                                size={3}
                                            />
                                        </View>

                                        <View  style={{flex:1}}>
                                            <Icon
                                                as={MaterialIcons}
                                                name="add"
                                                style={{alignSelf: "flex-end"}}
                                                size={3}
                                            />
                                        </View>
                                    </View>
                                    <Slider step={1} minValue={1} maxValue={10} value={finantialNumber}
                                            colorScheme="orange"
                                            onChange={(v) => setFinantialNumber(v)} size="lg">
                                        <Slider.Track bg={'red.100'}>
                                            <Slider.FilledTrack bg={Colors.red}/>
                                        </Slider.Track>
                                        <Slider.Thumb bg={Colors.red}/>
                                    </Slider>
                                    <View flexDirection={'row'}>
                                        <View justifyContent={'center'}>
                                            <Image tintColor={Colors.red} source={finantialicon} width={4}
                                                   style={{resizeMode: 'contain'}} alt="img"/>
                                        </View>
                                        <View justifyContent={'center'}>
                                            <Text fontSize="md" style={styles}> {t('finantial')} ({finantialNumber})</Text>

                                        </View>
                                    </View>

                                </VStack>
                        }
                        {
                            loading ?
                                <VStack px={9} mt={3} pb={3}>
                                    <Skeleton h={10}></Skeleton>
                                </VStack> :
                                <VStack px={9} mt={3} pb={3}>
                                    <View flexDirection={'row'}>
                                        <View style={{flex:1}}>
                                            <Icon
                                                as={MaterialIcons}
                                                name="minimize"
                                                size={3}
                                            />
                                        </View>

                                        <View  style={{flex:1}}>
                                            <Icon
                                                as={MaterialIcons}
                                                name="add"
                                                style={{alignSelf: "flex-end"}}
                                                size={3}
                                            />
                                        </View>
                                    </View>
                                    <Slider step={1} minValue={1} maxValue={10} value={relationNumber}
                                            colorScheme="orange"
                                            onChange={(v) => setRelationNumber(v)} size="lg">
                                        <Slider.Track bg={'red.100'}>
                                            <Slider.FilledTrack bg={Colors.red}/>
                                        </Slider.Track>
                                        <Slider.Thumb bg={Colors.red}/>
                                    </Slider>
                                    <View flexDirection={'row'}>
                                        <View justifyContent={'center'}>
                                            <Image tintColor={Colors.red} source={relationicon} width={4}
                                                   style={{resizeMode: 'contain'}} alt="img"/>
                                        </View>
                                        <View justifyContent={'center'}>
                                            <Text fontSize="md" style={styles}> {t('relations')}
                                                ({relationNumber})</Text>
                                        </View>
                                    </View>

                                </VStack>

                        }
                        {
                            loading ?
                                <VStack px={9} pb={3}>
                                    <Skeleton h={10}></Skeleton>
                                </VStack> :
                                <Button m={4} mt={5} size="lg" isLoading={loading} isLoadingText={'Guardando'}
                                        colorScheme={'orange'}
                                        onPress={() => saveYourFeel()}>
                                    {t('save')}
                                </Button>
                        }

                    </VStack>
                </HStack>
                <ModalSuccess visible={modalSuccessVisible} withGoback={true} setVisible={setModalSuccessVisible}></ModalSuccess>
                <ModalError visible={modalErrorVisible} setVisible={setModalErrorVisible}></ModalError>

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