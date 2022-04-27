import React, {useEffect, useState} from "react";
import {Box, Text, Button, VStack, HStack, FlatList, Avatar, Spacer,Heading, Image} from "native-base";
import {connect} from "react-redux";
import {View,ImageBackground, ScrollView} from "react-native";
import calendar from '../assets/calendaricon.png'
import logo from '../assets/logo.png'
import {getDay, getMonth} from '../utils/functions'
import {saveEmotion} from "../redux/ducks/feelingsDuck";

const EmotionModal = ({navigation,route,saveEmotion,authDuck}) => {

    const [loading,setLoading] = useState(false)


    const saveFeelings=async()=>{
        setLoading(true)

         try{
         let data={
             label:route.params.emotion[0].attributes.name,
             feeling:route.params.emotion[0].id,
             user:authDuck.user.id
         }
          let res =  await saveEmotion({data})
          if(res){
              alert('Guardado correctamente')
              navigation.reset({
                  index: 0,
                  routes: [{ name: 'Home' }],
              });
          }
         }catch (e){

         }finally {
             setLoading(false)
         }
    }

    return (
        <ScrollView>
            <HStack justifyContent={'center'} mt={20}>
                <VStack>
                    <Image size={'xs'} source={logo}/>
                </VStack>
            </HStack>
            <View style={styles.container}>
                <HStack w={'100%'} alignContent={'center'} justifyContent={'center'}>
                    <VStack alignItems={'center'}>
                        <Text style={{fontSize: 20, color: 'black'}}>Hoy me siento</Text>
                        <Heading mb={5} color={'#FF2830'} fontSize="xl" p="4" pb="3">
                            <Text bold fontSize={'40px'}>{route.params.emotion && route.params.emotion[0].attributes.name.toUpperCase()}</Text>
                        </Heading>
                    </VStack>
                </HStack>
                <HStack w={'100%'} justifyContent={'center'}>
                    <VStack w={'100%'} justifyContent={'center'}>
                        <View style={{flexDirection: 'column', alignItems: 'center'}}>
                            <ImageBackground source={calendar} style={styles.image}>
                                <Text style={styles.textMonth}>{getMonth()}</Text>
                                <Text style={styles.textDay}>{getDay()}</Text>
                            </ImageBackground>
                        </View>
                    </VStack>
                </HStack>
            </View>
            <HStack w={'100%'} justifyContent={'center'} mt={10} pl={20} pr={20}>
                <Button isLoading={loading} size="sm" w={'100%'} colorScheme={'red'} onPress={() => saveFeelings()}>
                    Continuar
                </Button>

            </HStack>
        </ScrollView>
    )
}

const mapState = (state) => {
    return {
        productsDuck: state.productsDuck,
        authDuck: state.authDuck
    }
}

const styles = {
    container:{
        flex: 1,
        flexDirection: 'column',
        padding:10,
        paddingTop:'50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        flex: 1,
        justifyContent: "center",
        height:80,
        width:80,
    },
    textDay: {
        color: 'black',
        fontSize: 30,
        position: 'relative',
        marginBottom:20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    textMonth:{
        color:'white',
        fontSize: 15,
        position:'relative',
        marginTop:10,
        textAlign: 'center'
    }
};


export default connect(mapState,{saveEmotion})(EmotionModal);