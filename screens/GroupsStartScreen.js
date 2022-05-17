import React, {useState} from "react";
import {Box, Button, HStack, Image, Input, Text, View, VStack} from "native-base";
import {ImageBackground, ScrollView} from "react-native";
import {connect} from "react-redux";
import logo from '../assets/logo.png'
import groupicon from '../assets/groupicon.png'
import backgroundGroup from '../assets/backGroups.png'
import {getMyGroups} from '../redux/ducks/groupDuck'

const GroupsStartScreen = ({authDuck, navigation, groupDuck, getMyGroups}) => {
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(null)
    const [groupName, setGroupName] = useState(null)
    const [hasGroups, setHasGroups] = useState(false)


    const registerGroup = () => {
        navigation.navigate('GroupsMembersAdd', {groupName})
    }


    const handleChange = text => setGroupName(text);


    return (
        <Box flex={1} bg="#fff" alignItems="center">
            <ScrollView contentContainerStyle={{flex: 1}} w={'100%'}>
                <HStack justifyContent={'center'} p={3}>
                    <Image size={'xs'} source={logo}/>
                </HStack>

                <View flex={1} mx={4}>
                    <View flex={1} mb={2}>
                        <ImageBackground borderRadius={10} style={styles.image} source={backgroundGroup}>
                            <HStack w={'100%'} justifyContent={'center'}>
                                <VStack w={'100%'} justifyContent={'center'}>
                                    <Box alignItems={'center'} w={'100%'}>
                                        <Image alt={'img'} size={'md'} source={groupicon}/>
                                        <Text textAlign={'center'} color={'white'} fontSize={30} w={'80%'}
                                              size={'md'}>Crea tu primer grupo</Text>
                                        <Input mx="3" onChangeText={handleChange} color={'gray.700'}
                                               backgroundColor={'white'} size={'lg'}
                                               placeholder="Nombre del grupo" w="80%"/>
                                    </Box>
                                </VStack>
                            </HStack>

                        </ImageBackground>
                    </View>
                    <View flex={0.5}>
                        <Button onPress={registerGroup} size="lg" colorScheme={'red'}>Siguiente</Button>
                    </View>
                </View>
            </ScrollView>
        </Box>
    )
}

const mapState = (state) => {
    return {
        authDuck: state.authDuck,
        groupDuck: state.groupDuck
    }
}

const styles = {
    image: {
        flex: 1,
        justifyContent: "center",
        height: '100%',
        width: '100%',
    },
}

export default connect(mapState, {getMyGroups})(GroupsStartScreen);