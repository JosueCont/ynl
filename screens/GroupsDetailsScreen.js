import React, {useEffect, useState} from "react";
import {RefreshControl, TouchableOpacity} from "react-native";
import {ScrollView, Text, View} from "native-base";
import {useIsFocused} from "@react-navigation/native";
import ApiApp from "../utils/ApiApp";
import GroupsMemberItem from "./Groups/Components/GroupsMemberItem";
import {Colors} from "../utils/Colors";


const GroupsDetailsScreen = ({route}) => {

    const isFocused = useIsFocused();
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(null);
    const [tabPosition, setTabPosition] = useState(0);
    const [name, setName] = useState(null);


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
            setName(response.data.data.group[0].name)
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
                    name: item.email,
                    status: 1
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
            backgroundColor={'white'}
            borderRadius={10}
            pt={5}
            refreshControl={
                <RefreshControl
                    refreshing={loading}
                    onRefresh={() => getGroupsMembersFunction()}
                />
            }>


            <Text textAlign={'center'} mb={2} color={Colors.red}>{name}</Text>

            <View mx={6}>
                <View flexDir={'row'} mb={6}>
                    <TouchableOpacity style={{
                        marginRight: 10,
                        borderBottomWidth: tabPosition === 0 ? 1 : 0,
                        borderBottomColor: Colors.red,
                        paddingBottom: 10
                    }} onPress={() => setTabPosition(0)}>
                        <Text fontSize={18}>Detalles</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        marginHorizontal: 10,
                        borderBottomWidth: tabPosition === 1 ? 1 : 0,
                        borderBottomColor: Colors.red,
                        paddingBottom: 10
                    }} onPress={() => setTabPosition(1)}>
                        <Text fontSize={18}>Miembros</Text>
                    </TouchableOpacity>
                </View>


                {
                    tabPosition === 0 &&
                    <View>
                        <Text>Detalle</Text>
                    </View>

                }
                {
                    tabPosition === 1 &&
                    <View>
                        {
                            loading == false &&
                            members.map((item) => {
                                return (
                                    <GroupsMemberItem title={item.name}
                                                      pending={(item.status === 0 || item.status === 2) ? true : false}/>
                                )
                            })
                        }
                    </View>

                }
            </View>
        </ScrollView>

    )
}


export default GroupsDetailsScreen;