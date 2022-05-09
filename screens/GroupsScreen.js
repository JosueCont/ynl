import {Button, ScrollView, Text, View} from "native-base";
import {RefreshControl, SafeAreaView} from "react-native";
import GroupsItem from "./Groups/Components/GroupsItem";
import React, {useEffect, useState} from "react";
import {Colors} from "../utils/Colors";
import ApiApp from "../utils/ApiApp";
import {connect} from "react-redux";
import {useIsFocused} from "@react-navigation/native";
import GroupsModalCreate from "./Groups/Components/GroupsModalCreate";

const GroupsScreen = ({authDuck}) => {
    const isFocused = useIsFocused();

    const [modalGroupsCreate, setModalGroupsCreate] = useState(null);
    const [groups, setGroups] = useState(null);
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
        try {
            let data = {
                data: {
                    name: value,
                    owner: authDuck.user.id,
                    description: ""
                }
            }
            let response = await ApiApp.createGroup(data)
            if (response.status === 200) {
                console.log('success')
            }
            getGroups();
        } catch (ex) {
            console.log(ex)
        }

    }


    return (
        <SafeAreaView flex={1}>
            <View flex={1} px={2} style={{backgroundColor: Colors.gray}}>
                <Text textAlign={'center'} fontSize={24}>Mis grupos/Clubs</Text>
                <ScrollView
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
                        loading == false &&
                        groups.map((item) => {
                            console.log()
                            return (
                                <GroupsItem title={item.attributes.name}/>
                            )
                        })
                    }
                </ScrollView>
                <Button colorScheme={'red'} onPress={() => setModalGroupsCreate(true)}>Crear nuevo grupo</Button>
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