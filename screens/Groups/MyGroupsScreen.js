import React, {useEffect, useState} from "react";
import {
    Box,
    Text,
    VStack,
    HStack,
    Image,
    Slider,
    Icon,
    Button,
    Input,
    FlatList,
    Avatar,
    NativeBaseProvider,
    Spacer,
    FormControl
} from "native-base";
import {Alert, ScrollView, ImageBackground, TouchableOpacity, SafeAreaView} from "react-native";
import {connect} from "react-redux";
import logo from '../../assets/logo.png'
import groupicon from '../../assets/groupicon.png'
import backgroundGroup from '../../assets/backGroups.png'
import ApiApp from "../../utils/ApiApp";
import authDuck from "../../redux/ducks/authDuck";
import groupDuck, {getMyGroups} from '../../redux/ducks/groupDuck'
import uuid from 'react-native-uuid';
import { useFormik } from 'formik';
import group from "native-base/src/components/composites/Avatar/Group";
import {Ionicons} from "@expo/vector-icons";
import {colors} from '../../utils/Constants'
import _ from 'lodash'
import * as Yup from "yup";

const MyGroupsScreen = ({authDuck,navigation,groupDuck,getMyGroups}) => {
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(null)
    const [groupName, setGroupName] = useState(null)
    const [hasGroups, setHasGroups] = useState(false)




    useEffect(()=>{
        if(authDuck.isLogged){
            setUser(authDuck.user)
            _getMyGroups()
        }
    },[authDuck])

    useEffect(()=>{
        if(groupDuck.groups){
            if(groupDuck.groups.length>0){
                setHasGroups(true)
            }
        }
    },[groupDuck])


    const _getMyGroups=async()=>{
        console.log('entra getMyGroups')
        if(authDuck.user){
            try{
                const res = await getMyGroups(authDuck.user.id)
                console.log('mis grupos' ,res)
            }catch (e){
                console.log(e)
            }
        }
    }

    const registerGroup=()=>{
        navigation.navigate('AddMemberScreen',{groupName})
    }

    const addGroup=()=>{
        console.log('crear nuevo grupo desde listado de grupos')
    }

    const handleChange = text => setGroupName(text);

    function ListGroups(){
        return <HStack flex={1} w={'100%'}>
            <VStack h={'100%'}>
                <SafeAreaView style={{flex: 1}}>
                <FlatList data={groupDuck.groups} renderItem={({
                                                                  item
                                                              }) => <Box borderBottomWidth="1" borderColor="coolGray.200" pl="4" pr="5" py="2">
                    <TouchableOpacity>
                        <HStack  w={'100%'} space={3} justifyContent="space-between">
                            <Avatar bg={'#FF2830'} mr={1} size="30px"></Avatar>
                            <VStack>
                                <Text size={'md'} color="#FF2830" bold>
                                    {item.attributes.name}
                                </Text>
                                <Text fontSize={10} color="gray.800" >
                                    {item.attributes.description}
                                </Text>
                            </VStack>
                            <Spacer />
                           <Ionicons size="15" color={colors.primary} name="ios-arrow-forward-outline" />
                        </HStack>
                    </TouchableOpacity>
                </Box>} keyExtractor={item => item.attributes.id} />
                </SafeAreaView>
                <Button onPress={addGroup} size="lg" backgroundColor={colors.primary} m={3}>
                    Crear nuevo grupo
                </Button>
            </VStack>
        </HStack>
    }


    return (
            <Box flex={1} bg="#fff" alignItems="center">
                <ScrollView w={'100%'}>
                    <HStack justifyContent={'center'} p={3}>
                        <Image size={'xs'} source={logo} />
                    </HStack>
                    <HStack justifyContent={'center'}  pl={7} pr={7}>
                        <VStack >
                            {
                                hasGroups?

                                    <>
                                        <Text mb={10} textAlign={'center'} mt={10} fontSize={20} bold>Mis Grupos / Clubs</Text>
                                        <Box p={5} borderRadius={20} borderWidth={1} borderColor={colors.primary}>
                                            <ListGroups/>
                                        </Box>
                                    </>
                                    :<VStack alignItems={'center'} mt={2} h={'600px'} w={'100%'}>
                                        <ImageBackground  borderRadius={10} style={styles.image} source={backgroundGroup}>
                                            <HStack w={'100%'} justifyContent={'center'}>
                                                <VStack w={'100%'} justifyContent={'center'}>
                                                    <Box alignItems={'center'} w={'100%'}>
                                                        <Image alt={'img'}  size={'md'} source={groupicon} />
                                                        <Text textAlign={'center'} color={'white'} fontSize={30} w={'80%'} size={'md'}>Crea tu primer grupo</Text>
                                                        <Input mx="3"  onChangeText={handleChange} color={'gray.700'}  backgroundColor={'white'} size={'lg'}  placeholder="Nombre del grupo" w="80%" />
                                                    </Box>
                                                </VStack>
                                            </HStack>
                                            <HStack w={'100%'}>
                                                <VStack w={'100%'}>
                                                    <Button  onPress={registerGroup} size="lg" colorScheme={'red'} m={3}>
                                                        Siguiente
                                                    </Button>
                                                </VStack>
                                            </HStack>
                                        </ImageBackground>
                                    </VStack>
                            }



                        </VStack>


                    </HStack>
                </ScrollView>
            </Box>
    )
}

const mapState = (state) => {
    return {
        authDuck: state.authDuck,
        groupDuck:state.groupDuck
    }
}

const styles={
    image: {
        flex: 1,
        justifyContent: "center",
        height:'100%',
        width:'100%',
    },
}

export default connect(mapState,{getMyGroups})(MyGroupsScreen);