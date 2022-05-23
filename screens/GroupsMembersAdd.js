import React, {useEffect, useRef, useState} from "react";
import {Divider, Icon, Image, Input, ScrollView, Spinner, View, VStack} from "native-base";
import {connect} from "react-redux";
import logo from '../assets/logo.png'
import {Ionicons} from "@expo/vector-icons";
import {getUsersByUserName} from '../redux/ducks/groupDuck'
import _ from 'lodash'
import GroupsListUsers from "./Groups/Components/GroupsListUsers";
import ApiApp from "../utils/ApiApp";
import {useFocusEffect} from "@react-navigation/native";

const GroupsMembersAdd = ({navigation, route, groupDuck, authDuck, getUsersByUserName}) => {
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(null)
    const [groupName, setGroupName] = useState(null)
    const [usersSelected, setUsersSelected] = useState([])
    const [text, setText] = useState(null);
    const searchBox = useRef();


    useFocusEffect(
        React.useCallback(() => {
            return () => {
                setUsersSelected([])
                searchBox.current.clear()
            };
        }, [])
    );


    useEffect(() => {
        getUsersByUserName()
    }, [])

    useEffect(() => {
        if (authDuck.isLogged) {
            setUser(authDuck.user)
        }
    }, [authDuck])


    useEffect(() => {
        if (route.params) {
            setGroupName(route.params.groupName)
        }
    }, [route.params])

    const registerGroup = async () => {
        try {
            let data = {
                data: {
                    name: groupName,
                    owner: authDuck.user.id,
                    description: "",
                    members: usersSelected.map(obj => obj.id)
                }
            }
            let response = await ApiApp.createGroup(data)
            if (response.status === 200) {
                console.log('success')
            }
            navigation.navigate('GroupsScreen')
        } catch (ex) {
            console.log(ex)
        }
    }

    const searchUsers = async (value) => {
        try {
            const response = await getUsersByUserName(value.trim())
        } catch (e) {
            console.log(e)
        }
    }

    const addUserToList = (user) => {
        console.log(_.uniq([...usersSelected, user]))
        let newArray = _.uniq([...usersSelected, user])
        //validamos si ya fue seleccionado previamente
        if (isUserSelected(user)) {
            newArray = _.remove(newArray, function (u) {
                return u.id !== user.id;
            });
            setUsersSelected(newArray)
            //eliminamos al elemento previamente seleccionado
        } else {
            setUsersSelected(newArray)
        }

    }

    const isUserSelected = (user) => {
        const idx = _.findIndex(usersSelected, function (o) {
            return o.id === user.id;
        });
        if (idx >= 0) {
            return true
        }
        return false
    }

    const getNameUsr = (usrID) => {
        try {
            const data = _.find(groupDuck.users, {'id': usrID});
            console.log('dato usuario', data)
            return data.username
        } catch (e) {

        }

    }


    return (

        <ScrollView _contentContainerStyle={{alignItems: 'center', backgroundColor: 'white'}}>

            <Image size={'xs'} source={logo}/>
            <View flex={1}>
                <VStack my="4" space={5} w="100%" maxW="350px">
                    <VStack w="100%" space={5} alignSelf="center">
                        <Input ref={searchBox} placeholder={`Buscar amigos para añadir a ${groupName}`}
                               width="100%"
                               height={10}
                               autoCapitalize="none"
                               borderRadius="10"
                               py="1" px="2"
                               borderWidth="2"
                               clearButtonMode="never"
                               onChangeText={_.debounce(searchUsers, 1000)}
                               borderColor={'red.500'}
                               InputLeftElement={<Icon ml="2" size="4" color="gray.400"
                                                       as={<Ionicons name="ios-search"/>}/>}
                               autoCorrect={false}
                        />
                        <Divider/>
                    </VStack>
                </VStack>
            </View>
            <View flex={1} px={4}>
                {
                    groupDuck.fetchingUsers ?
                        <Spinner size="sm" color={'red.400'}/> :
                        <GroupsListUsers usersSelected={usersSelected} registerGroup={registerGroup}
                                         isUserSelected={isUserSelected} addUserToList={addUserToList}/>
                }
            </View>


        </ScrollView>
    )
}

const mapState = (state) => {
    return {
        authDuck: state.authDuck,
        groupDuck: state.groupDuck
    }
}


export default connect(mapState, {getUsersByUserName})(GroupsMembersAdd);