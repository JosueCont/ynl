import React, {useEffect, useState} from "react";
import {CheckIcon, Select, Text, View} from "native-base";
import {connect} from "react-redux";
import {ScrollView} from "react-native";
import ApiApp from "../utils/ApiApp";
import {Colors} from "../utils/Colors";

const RouletteStep3Screen = ({route, navigation}) => {

    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(null);
    const [subParentSelected, setSubParentSelected] = useState(null);
    const [children, setChildren] = useState(null);


    useEffect(() => {
        console.log(route.params.parentItem)
        getChildren(route.params.parentItem.id)
        navigation.setOptions({
            headerStyle: {backgroundColor: '#' + route.params.parentItem.attributes.color}
        })
    }, [route.params.parentItem.id])


    const getChildren = async (parentId) => {
        try {
            setLoading(true);
            let response = await ApiApp.getFeelingsV2(`filters[$and][0][parent][id][$eq]=${parentId}`)
            setChildren(response.data.data)
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
                    fontSize={28} textAlign={'center'}>Hoy te sientes...</Text>
                <View w={200} h={200} bgColor={'green.200'} borderRadius={100} my={10}>
                    {/*{*/}
                    {/*    _.has(route.params.parentItem.attributes.icon.data.attributes.url) &&*/}
                    {/*    <Image source={{uri: Constants.manifest.extra.URL + route.params.parentItem.attributes.icon.data.attributes.url}} style={{width:200, height:200, resizeMode:'contain'}}></Image>*/}

                    {/*}*/}

                </View>
                <Text mb={2}>{`${route.params.parentItem.attributes.name}`}</Text>
                <Select placeholderTextColor={Colors.red} backgroundColor={Colors.white} selectedValue={service}
                        minWidth="250" placeholder="Selecciona" _selectedItem={{
                    bg: "red.100",
                    endIcon: <CheckIcon size="5"/>
                }} mt={1} onValueChange={itemValue => {

                    setService(itemValue)
                    navigation.navigate('RouletteStep4Screen', {emotion: itemValue})

                }}>
                    {
                        (children) &&
                        children.map((item, i) => {
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

export default connect(mapState)(RouletteStep3Screen);