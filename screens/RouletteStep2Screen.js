import React, {useEffect, useState} from "react";
import {CheckIcon, Image, Select, Text, View} from "native-base";
import {connect} from "react-redux";
import {ScrollView} from "react-native";
import ApiApp from "../utils/ApiApp";
import {Colors} from "../utils/Colors";
import _ from "lodash";

const RouletteStep2Screen = ({route, navigation}) => {

    const [service, setService] = useState(null);
    const [subParents, setSubParents] = useState(null);


    useEffect(() => {
        setSubParents(null)
        getSubParents(route.params.parentItem.id)
        //console.log('param',route.params.parentItem.color)
        //console.log('color',route.params.parentItem.attributes.color)
        // navigation.setOptions({
        //     headerStyle: {backgroundColor:'#'+ route.params.parentItem.attributes.color}
        // })
    }, [route.params.parentItem.id])

    const getSubParents = async (parentId) => {
        try {
            let response = await ApiApp.getFeelingsV2(`filters[$and][0][parent][id][$eq]=${parentId}&populate[parent][populate][0]=icon`)
            
            response.data.data = _.sortBy(_.uniqBy(response.data.data, 'attributes.name'), 'attributes.name');
            //console.log("🚀 ~ file: RouletteStep2Screen.js ~ line 34 ~ getSubParents ~ response.data.data", response.data.data)
            
            setSubParents(response.data.data)
        } catch (e) {
            console.log('getSubParents error =>',e.toString());
        }
    }

    return (
        <ScrollView style={{flex: 1, backgroundColor:'#'+route.params.parentItem.attributes.color}}
                    contentContainerStyle={{flex: 1}}>

            <View flex={1} alignItems={'center'} style={{paddingTop: 20}}>
                <Text
                    style={styles.shadow}
                    fontSize={18} textAlign={'center'} color={'white'}>Hoy te sientes...</Text>
                <Text mb={2} fontSize={40} color={'white'} style={styles.shadow}>{`${route.params.parentItem.attributes.name}`}</Text>

                <View w={200} h={200} bgColor={'white'} borderRadius={100} my={10} alignItems={'center'}
                      justifyContent={'center'}>
                    {
                        subParents && _.has(route.params, 'parentItem.attributes.icon.data.attributes.url') &&
                        <Image
                            source={{uri: route.params.parentItem.attributes.animation.data.attributes.url}}
                            style={{width: 150, height: 250, resizeMode: 'contain'}} alt="img"/>

                    }
                </View>
                <Select

                    placeholderTextColor={'#' + route.params.parentItem.attributes.color} selectedValue={service}
                    minWidth="250"
                    borderRadius={20}
                    backgroundColor={Colors.white} placeholder="Selecciona" _selectedItem={{
                    backgroundColor: 'red.50',
                    endIcon: <CheckIcon size="5"/>,
                    bgColor: 'red.50'
                }} mt={1} onValueChange={itemValue => {
                    setService(itemValue)
                    navigation.navigate('RouletteStep4Screen', {parent: route.params.parentItem, emotion: itemValue, color:route.params.parentItem.attributes.color})
                }}>

                    {
                        (subParents) &&
                        subParents.map((item, i) => {
                            return (
                                <Select.Item label={item.attributes.name} key={i} value={item}/>
                            )
                        })
                    }
                </Select>
            </View>
        </ScrollView>
    )
}

const styles={
    shadow:{
        textShadowColor: 'rgba(0, 0, 0, 0.50)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10
    }
}

const mapState = (state) => {
    return {
        feelingsDuck: state.feelingsDuck,
        authDuck: state.authDuck
    }
}

export default connect(mapState)(RouletteStep2Screen);