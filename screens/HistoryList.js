import React, {useEffect, useState} from "react";
import {Box, FlatList, Heading, HStack, Image, Spacer, Text, VStack} from "native-base";
import {connect} from "react-redux";
import {auth, db} from '../utils/firebase'
import {TouchableOpacity} from "react-native";
import logo from '../assets/logo.png'
import historyIcon from '../assets/bxhistory.png'
import arrowIcon from '../assets/arrow_right.png'
import {collection, getDocs, query, where} from "firebase/firestore";
import {getAuth, signOut} from "firebase/auth";
import moment from 'moment'

const HistoryListScreen = ({productsDuck, navigation}) => {

    const [feelings, setFeelings] = useState(null)

    useEffect(() => {
        getFeels();
    }, [])


    const formatDate = (datetime) => {
        const date = new Date(datetime)
        return moment(date).format('DD/mm/YYYY , h:mm'); // June 1, 2019
    }

    const getFeels = async () => {
        try {
            // console.log("uid====", auth)
            const q = query(
                collection(db, 'yourFeels'),
                where("createdBy", "==", auth.currentUser.uid)
            )
            const feel = [];
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                // console.log(doc.id, " => ", doc.data());
                feel.push(doc.data())
            })
            setFeelings(feel)
        } catch (e) {
            console.log('getFeels error =>', e.toString())
        }


    }


    const logOut = async () => {
        const auth = getAuth()
        await signOut(auth)
        navigation.navigate('Login')
    }

    return (
        <Box>
            <HStack justifyContent={'center'} pt={5} pb={3}>
                <VStack>
                    <Image size={'xs'} source={logo} alt="img"/>
                </VStack>
            </HStack>
            <HStack justifyContent={'center'}>
                <VStack alignItems={'center'}>
                    <Heading mb={5} color={'#FF2830'} fontSize="xl" p="4" pb="3">
                        <Text bold fontSize={'20px'}>Registro de mi actividad</Text>
                    </Heading>
                </VStack>

            </HStack>

            <FlatList data={feelings} renderItem={({item}) => {
                return (
                    <Box borderBottomWidth="1" _dark={{
                        borderColor: "gray.200"
                    }} borderColor="gray.400" pl="4" pr="5" py="2">
                        <HStack space={3} w={'100%'} justifyContent="space-between">
                            <Image size="20px" source={historyIcon} alt="img"/>
                            <VStack w={'80%'} h={'50px'}>
                                <Text size={'md'} color="coolGray.800" bold>
                                    {formatDate(item.createdAt)}
                                </Text>
                            </VStack>
                            <TouchableOpacity>
                                <Image size="20px" mt={5} source={arrowIcon} alt="img"/>
                            </TouchableOpacity>
                            <Spacer/>

                        </HStack>
                    </Box>
                )
            }} keyExtractor={item => item.id}/>
        </Box>
    )
}

const mapState = (state) => {
    return {
        productsDuck: state.productsDuck
    }
}

export default connect(mapState)(HistoryListScreen);