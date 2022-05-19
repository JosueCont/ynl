import React, {useEffect, useState} from "react";
import {Button, ScrollView, Text, View} from "native-base";
import {RefreshControl, SafeAreaView} from "react-native";
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


    useEffect(() => {
        if (isFocused) {
            getGroups();
        }
    }, [isFocused])

    const getGroups = async () => {
        try {
            setLoading(true)
            const response = await ApiApp.getMyGroups(authDuck.user.id)
            setGroups(response.data.data)
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
                            refreshing={loading}
                            onRefresh={() => getGroups()}
                        />
                    }>

                    {
                        loading == false && groups.length > 0 ?
                            <View>
                                <Text fontSize={24} color={Colors.red} textAlign={'center'}>Invitación a grupos</Text>
                                {
                                    groups.map((item) => {
                                        return (
                                            <GroupsItem groupId={item.id} title={item.attributes.name}
                                                        navigation={navigation}/>
                                        )
                                    })
                                }
                            </View>
                            :
                            loading === false && groups.length === 0 &&
                            <View flex={1} alignItems={'center'} justifyContent={'center'}>
                                <Text fontSize={20}>Sin grupos</Text>
                            </View>
                    }
                    {
                        loading == false && groups.length > 0 ?
                            <View>
                                <Text fontSize={24} color={Colors.red} textAlign={'center'}>Mis grupos</Text>
                                {
                                    groups.map((item) => {
                                        return (
                                            <GroupsItem groupId={item.id} title={item.attributes.name}
                                                        navigation={navigation}/>
                                        )
                                    })
                                }
                            </View>
                            :
                            loading === false && groups.length === 0 &&
                            <View flex={1} alignItems={'center'} justifyContent={'center'}>
                                <Text fontSize={20}>Sin grupos</Text>
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