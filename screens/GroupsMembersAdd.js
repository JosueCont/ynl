import React, {useEffect, useRef, useState} from "react";
import {Divider, Icon, Input, ScrollView, Spinner, View, VStack} from "native-base";
import {connect} from "react-redux";
import ApiApp from "../utils/ApiApp";
import {Ionicons} from "@expo/vector-icons";
import {getUsersByUserName, resetUsersSearch} from '../redux/ducks/groupDuck'
import _ from 'lodash'
import GroupsListUsers from "./Groups/Components/GroupsListUsers";
import {useFocusEffect} from "@react-navigation/native";

const GroupsMembersAdd = ({navigation, route, groupDuck, authDuck, getUsersByUserName, resetUsersSearch}) => {
    const [loading, setLoading] = useState(false)
    const [adding, setAdding] = useState(false)
    const [user, setUser] = useState(null)
    const [groupName, setGroupName] = useState(null)
    const [usersSelected, setUsersSelected] = useState([])
    const [text, setText] = useState(null);
    const [isAddMembers, setisAddMembers] = useState(false)
    const [membersExist, setMembersExist] = useState([])
    const searchBox = useRef();


    useFocusEffect(
        React.useCallback(() => {
            return () => {
                if(usersSelected.length>0){
                    setUsersSelected([])
                }
                resetUsersSearch()
                searchBox.current.clear()
            };
        }, [])
    );


    useEffect(() => {
        if (authDuck.isLogged) {
            setUser(authDuck.user)
            setUsersSelected([])
        }
    }, [authDuck])


    useEffect(() => {
        if (route.params) {
            setGroupName(route.params.groupName)
            if (route.params.option === 'add'){
                setisAddMembers(true)
                setMembersExist(route.params.members)
                setUsersSelected([])
            }else{
                setisAddMembers(false)
                setMembersExist([])
                setUsersSelected([])
            }
            //getUsersByUserName(undefined, authDuck.user, membersExist)
        }
    }, [route.params])

    const registerGroup = async () => {
        try {
            setLoading(true)
            setAdding(true)

            let members = _.filter(usersSelected, function (o) {
                if(typeof o.id !== 'string'){
                    return o.id;
                }
            });
            let publicEmails = _.filter(usersSelected, function (o) {
                if(typeof o.id === 'string'){
                    return o.id;
                }

            });

            let data={}
            if (isAddMembers){
                data = {
                    data: {
                        groupId: route.params.groupId,
                        members: members.map((item) => item.id),
                        publicEmails: publicEmails.map((item) => item.email)
                    }
                }
                // console.log(data)
                 let response = await ApiApp.addMemberGroup(data)
                 setUsersSelected([])
                 setMembersExist([])
                 navigation.navigate('GroupsDetailsScreen', {groupId: route.params.groupId, isOwner: route.params.isOwner, thisOwner:route.params.thisOwner})
            }else{
                data = {
                    data: {
                        name: groupName,
                        owner: authDuck.user.id,
                        description: "",
                        members: members.map((item) => item.id),
                        publicEmails: publicEmails.map((item) => item.email)
    
                    }
                }

                if (authDuck.userSiteConfig?.id) {
                    data.data.site= authDuck.userSiteConfig.id
                }


                // console.log(data)
                 let response = await ApiApp.createGroup(data)
                 setUsersSelected([])
                 navigation.navigate('GroupsScreen')
            }
        } catch (e) {
            console.log("registerGroup error =>",e.toString())
        }finally {
            setLoading(false)
            setAdding(false)
        }
    }

    const searchUsers = async (value) => {
        try {
            const response = await getUsersByUserName(value.trim(), authDuck.user, authDuck.userSiteConfig, membersExist)
        } catch (e) {
            console.log("searchUsers error =>",e.toString())
        }
    }

    const addUserToList = (user) => {
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
            // console.log('dato usuario', data)
            return data.username
        } catch (e) {
            console.log("getNameUsr error =>",e.toString())
        }

    }


    return (

        <ScrollView _contentContainerStyle={{alignItems: 'center', backgroundColor: 'white'}}>
            <View flex={1}>
                <VStack my="4" space={5} w="100%" maxW="350px">
                    <VStack w="100%" space={0} alignSelf="center">
                        <Input ref={searchBox} placeholder={`Buscar amigos para añadir a ${groupName}`}
                               width="100%"
                               height={10}
                               autoCapitalize="none"
                               borderRadius="10"
                               py="1" px="2"
                               borderWidth="2"
                               clearButtonMode="never"
                               onChangeText={_.debounce(searchUsers, 1000)}
                               borderColor={'#FD5535'}
                               InputLeftElement={<Icon ml="2" size={4} color="gray.400"
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
                        <GroupsListUsers usersSelected={usersSelected} adding={adding} registerGroup={registerGroup}
                                         isUserSelected={isUserSelected} addUserToList={addUserToList} isAddMembers={isAddMembers}/>
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


export default connect(mapState, {getUsersByUserName, resetUsersSearch})(GroupsMembersAdd);