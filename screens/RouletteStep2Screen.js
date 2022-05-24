import React, {useEffect, useState} from "react";
import {CheckIcon, Select, Text, View} from "native-base";
import {connect} from "react-redux";
import {ScrollView} from "react-native";
import ApiApp from "../utils/ApiApp";
import {Colors} from "../utils/Colors";
import Constants from 'expo-constants';

const RouletteStep2Screen = ({route, navigation}) => {

    const [service, setService] = useState(null);
    const [subParents, setSubParents] = useState(null);
    const [loading, setLoading] = useState(null);
    const [subParentSelected, setSubParentSelected] = useState(null);

    useEffect(() => {
        console.log(Constants.manifest.extra.URL + route.params.parentItem.attributes.icon.data.attributes.url)
        getSubParents(route.params.parentItem.id)
        navigation.setOptions({
            headerStyle: {backgroundColor: '#' + route.params.parentItem.attributes.color}
        })
    }, [route.params.parentItem.id])

    const getSubParents = async (parentId) => {
        try {
            setLoading(true);
            let response = await ApiApp.getFeelingsV2(`filters[$and][0][parent][id][$eq]=${parentId}`)
            setSubParents(response.data.data)
        } catch (e) {
            console.log(e.response)
        } finally {
            setLoading(false)
        }
    }

    return (
        <ScrollView style={{flex: 1, backgroundColor: '#' + route.params.parentItem.attributes.color}}
                    contentContainerStyle={{flex: 1}}>

            <View flex={1} alignItems={'center'}>
                <Text
                    fontSize={28} textAlign={'center'} color={'white'}>Hoy te sientes...</Text>
                <View w={200} h={200} bgColor={'green.200'} borderRadius={100} my={10}>
                    {/*{*/}
                    {/*    _.has(route.params.parentItem.attributes.icon.data.attributes.url) &&*/}
                    {/*    <Image source={{uri: Constants.manifest.extra.URL + route.params.parentItem.attributes.icon.data.attributes.url}} style={{width:200, height:200, resizeMode:'contain'}}></Image>*/}

                    {/*}*/}
                </View>
                <Text mb={2} color={'white'}>{`${route.params.parentItem.attributes.name}`}</Text>
                <Select

                    placeholderTextColor={Colors.red} selectedValue={service} minWidth="250"
                    backgroundColor={Colors.white} placeholder="Selecciona" _selectedItem={{
                    backgroundColor: 'red.50',
                    endIcon: <CheckIcon size="5"/>,
                    bgColor: 'red.50'
                }} mt={1} onValueChange={itemValue => {
                    setService(itemValue)
                    navigation.navigate('RouletteStep3Screen', {parentItem: itemValue})
                }}>

                    {
                        (subParents && !subParentSelected) &&
                        subParents.map((item, i) => {
                            return (
                                <Select.Item label={item.attributes.name} value={item}/>
                            )
                        })
                    }
                </Select>
            </View>
        </ScrollView>
    )
}


const mapState = (state) => {
    return {
        feelingsDuck: state.feelingsDuck,
        authDuck: state.authDuck
    }
}

export default connect(mapState)(RouletteStep2Screen);