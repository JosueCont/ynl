import React, {useEffect, useState} from "react";
import {RefreshControl} from "react-native";
import {ScrollView} from "native-base";
import {useIsFocused} from "@react-navigation/native";
import ApiApp from "../utils/ApiApp";
import GroupsMemberItem from "./Groups/Components/GroupsMemberItem";

const GroupsMembersScreen = ({route}) => {

    const isFocused = useIsFocused();
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(null);


    useEffect(() => {
        if (isFocused) {
            getGroupsMembersFunction();
        }
    }, [isFocused])

    const getGroupsMembersFunction = async () => {
        try {
            setLoading(true)
            const response = await ApiApp.getGroupMembers(route.params.groupId)
            console.log(response.data.data);
            let membersArray = [];

            for (let item of response.data.data.requests) {
                console.log(item)

                membersArray.push({
                    id: item.user.id,
                    name: item.user.email,
                    status: item.status
                })
            }

            for (let item of response.data.data.group[0].members) {
                membersArray.push({
                    id: item.id,
                    name: item.user.email,
                    status: item.status
                })
            }
            setMembers(membersArray)
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
                    onRefresh={() => getGroupsMembersFunction()}
                />
            }>
            {
                loading == false &&
                members.map((item) => {
                    return (
                        // <GroupsItem groupId={item.id} title={item.attributes.name}/>
                        <GroupsMemberItem title={item.name}
                                          pending={(item.status === 0 || item.status === 2) ? true : false}/>
                    )
                })
            }
        </ScrollView>

    )
}


export default GroupsMembersScreen;