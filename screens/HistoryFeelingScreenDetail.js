import React, {useEffect, useState} from "react";
import {ScrollView} from "react-native";
import {connect} from "react-redux";
import {Image, Skeleton, Stack, Text, View} from "native-base";
import {Colors} from "../utils/Colors";
import {useIsFocused} from "@react-navigation/native";
import {getShadowCircleStyle} from "../utils/functions";
import _ from "lodash";
import moment from 'moment'


const HistoryFeelingScreenDetail = ({authDuck, route, navigation}) => {

    const isFocused = useIsFocused();
    const [detailData, setDetailData] = useState([])
    const {detail, date} = route.params;
    const [loading, setLoading] = useState(null);

    useEffect(() => {

        if (isFocused) {
            setLoading(true)
            setDetailData(_.orderBy(detail, ['date'], ['desc']))
            setTimeout(() => {
                setLoading(false)
            }, 200)

        }
    }, [isFocused])


    return (
        <ScrollView style={{flex: 1}} contentContainerStyle={{backgroundColor: Colors.white}} bounces={false}>

            <View flex={1} alignItems={'center'}>
                <Stack space={4} w="90%">
                    <Text style={{
                        fontSize: 20,
                        color: '#FF5E00',
                        textAlign: 'center',
                        fontWeight: 'bolder'
                    }}>{moment(date, 'DD/MM/YYYY').format('LL')}</Text>

                    {
                        loading ?
                            <View flex={1}>
                                <Skeleton height={20} mb={4}/>
                                <Skeleton height={20} mb={4}/>
                                <Skeleton height={20} mb={4}/>
                                <Skeleton height={20} mb={4}/>
                                <Skeleton height={20} mb={4}/>
                                <Skeleton height={20} mb={4}/>
                                <Skeleton height={20} mb={4}/>

                            </View>

                            :
                            detailData.map((ele, i) => {
                                return (

                                    <View
                                        flexDir={'row'}
                                        mb={2}
                                        bgColor={'#' + _.get(ele, 'feeling.attributes.parent.data.attributes.color', '5F6367')}
                                        style={getShadowCircleStyle(10, 10)}
                                        borderRadius={10}
                                        py={3}
                                        key={i}

                                    >
                                        <View flex={0.5} alignItems={'center'} justifyContent={'center'}>
                                            <Image  style={{height: 60, width: 60}} alt="img"
                                                   source={{uri: `${_.get(ele, 'feeling.attributes.parent.data.attributes.icon.data.attributes.url', 'https://app-ynl.s3.us-west-1.amazonaws.com/triste_4a4900f0cd.png')}`}}/>
                                        </View>
                                        <View flex={1} justifyContent={'center'}>
                                            <Text color={'white'} style={{fontWeight: 'bold'}}
                                                  fontSize={20}>{ele.feeling.attributes.name} </Text>

                                            <Text color={'white'} fontSize={16}
                                                  mb={1}>{ele.feeling.attributes.parent.data.attributes.name}</Text>


                                            {
                                                ele.comments && <Text color={'white'} fontSize={10}
                                                                      mb={1}>{ele.comments}</Text>
                                            }


                                            <Text color={'white'}
                                                  fontSize={9}>{moment(ele.date).format('hh:mm A')}</Text>
                                        </View>
                                    </View>
                                )
                            })
                    }


                </Stack>
            </View>
        </ScrollView>
    )
}

const mapState = (state) => {
    return {
        authDuck: state.authDuck
    }
}


export default connect(mapState)(HistoryFeelingScreenDetail);