import {RefreshControl} from "react-native";
import GroupsItem from "./Groups/Components/GroupsItem";
import {ScrollView} from "native-base";
import React, {useEffect, useState} from "@types/react";
import {useIsFocused} from "@react-navigation/native";
import ApiApp from "../utils/ApiApp";

const GroupsMembersScreen = () => {

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
    return (
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
                loading == false &&
                groups.map((item) => {
                    console.log(item.id)
                    return (
                        <GroupsItem groupId={item.id} title={item.attributes.name} navigation={navigation}/>
                    )
                })
            }
        </ScrollView>

    )
}


export default GroupsMembersScreen;