import React, {useEffect, useState} from "react";
import {Button, ScrollView, Text, View} from "native-base";
import {Alert, RefreshControl, SafeAreaView} from "react-native";
import GroupsItem from "./Groups/Components/GroupsItem";
import {Colors} from "../utils/Colors";
import ApiApp from "../utils/ApiApp";
import {connect} from "react-redux";
import {useIsFocused} from "@react-navigation/native";
import GroupsModalCreate from "./Groups/Components/GroupsModalCreate";

const GroupsScreen = ({authDuck, navigation}) => {
    const isFocused = useIsFocused();

    const [modalGroupsCreate, setModalGroupsCreate] = useState(null);
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(null);
    const [groupsRequests, setGroupsRequests] = useState([])
    const [reload, setReload] = useState(null);

    useEffect(() => {
        if (isFocused) {
            getGroups();
            getGroupsRequests();
        }
    }, [isFocused, reload])

    const getGroups = async () => {
        try {
            setLoading(true)
            const response = await ApiApp.getMyGroups(authDuck.user.id)
            // setGroups(response.data.data)
            setGroups(response.data.data.entries)
        } catch (ex) {
            console.log(ex)
        } finally {
            setLoading(false)
        }
    }

    const getGroupsRequests = async () => {
        try {
            setLoading(true)
            const response = await ApiApp.getGroupsRequests(authDuck.user.id)
            setGroupsRequests(response.data.data)
        } catch (ex) {
            console.log(ex)
        } finally {
            setLoading(false)
        }
    }

    const createGroup = async (value) => {
        setModalGroupsCreate(false)
        navigation.navigate('GroupsMembersAdd', {groupName: value})
    }

    const groupAcceptInvite = async (token, accept) => {
        try {
            const response = await ApiApp.groupAcceptInvite(token, accept);
            if (reload){
                setReload(!reload)
            }else{
                setReload(true)
            }
        } catch (ex) {
            console.log(ex.response)
        }
    }

    const groupDeleteFunction = async (groupId) => {

        try {
            const response = await ApiApp.groupsDelete(groupId);
            // console.log(response.data)
            if (reload){
                setReload(!reload)
            }else{
                setReload(true)
            }
        } catch (ex) {
            console.log(ex.response)
        }
    }

    return (
        <SafeAreaView flex={1}>
            <View flex={1} px={2} style={{backgroundColor: Colors.gray}}>
                {/*<Text textAlign={'center'} fontSize={24}>Mis grupos/Clubs</Text>*/}
                <ScrollView
                    flex={1}

                    nestedScrollEnabled={true}
                    my={4}
                    backgroundColor={'white'}
                    borderRadius={10}
                    pt={5}
                    refreshControl={
                        <RefreshControl
                            tintColor={Colors.red}
                            refreshing={loading}
                            onRefresh={() => getGroups()}
                        />
                    }>

                    {
                        loading === false &&
                        <View>
                            {
                                groupsRequests.length > 0 &&
                                <View>
                                    <Text fontSize={24} color={Colors.red} textAlign={'center'} mb={4}>Invitación a
                                        grupos</Text>
                                    {
                                        groupsRequests.map((item) => {
                                            if (item.attributes.group.data){
                                                return (
                                                    <GroupsItem groupId={item.id}
                                                                title={item.attributes.group.data.attributes.name}
                                                                navigation={navigation} acceptInvite={true}
                                                                token={item.attributes.token}
                                                                acceptAction={groupAcceptInvite}
                                                    />
                                                )
                                            }
                                        })
                                    }
                                </View>
                            }
                        </View>
                    }

                    {
                        loading === false &&
                        <View>
                            <Text fontSize={24} color={Colors.red} textAlign={'center'} mb={4}>Mis
                                            grupos</Text>
                            {
                                groups.length > 0 ?
                                    <View>
                                        {/* <Text fontSize={24} color={Colors.red} textAlign={'center'} mb={4}>Mis
                                            grupos</Text> */}
                                        {
                                            groups.map((item) => {
                                                if(item.owner){
                                                    return (
                                                        <GroupsItem groupId={item.id} title={item.name}
                                                                navigation={navigation} deleteAction={() => {
                                                        Alert.alert(
                                                            "Your Next Level",
                                                            "¿Deseas eliminar este grupo?",
                                                            [
                                                                {
                                                                    text: "No",
                                                                    onPress: () => console.log("Cancel Pressed"),
                                                                    style: "cancel"
                                                                },
                                                                {
                                                                    text: "Eliminar",
                                                                    onPress: () => groupDeleteFunction(item.id)
                                                                }
                                                            ])
                                                    }} isOwner = {item.owner.id === authDuck.user.id} thisOwner={authDuck.user.id}/>
                                                )}
                                            })
                                        }
                                    </View>
                                    :
                                    groups.length === 0 &&
                                    <View flex={1} alignItems={'center'} justifyContent={'center'}>
                                        <Text fontSize={20} color="gray.300">Sin grupos</Text>
                                    </View>
                            }
                        </View>
                    }
                </ScrollView>
                <View flex={0.1}>
                    <Button colorScheme={'orange'} onPress={() => setModalGroupsCreate(true)}>Crear nuevo grupo</Button>
                </View>
                <GroupsModalCreate visible={modalGroupsCreate} setVisible={setModalGroupsCreate} action={createGroup}/>
            </View>
        </SafeAreaView>
    )
}

const mapState = (state) => {
    return {
        authDuck: state.authDuck
    }
}

export default connect(mapState)(GroupsScreen);