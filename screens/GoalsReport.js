import { SafeAreaView, View, StyleSheet, TouchableOpacity, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { HStack, ScrollView, Image, Text, VStack, Spinner, Skeleton } from 'native-base'
import { Colors } from '../utils/Colors'
import { connect, useDispatch, useSelector } from 'react-redux'
import {baseURL} from '../utils/AxiosApi'
import { Dimensions } from "react-native";
import Tree from '../assets/tree.png'
import FooterLines from '../components/FooterLines'
import BarChartGoals from '../components/goals/BarChartGoals'
import {getGoalsReport} from '../redux/ducks/goalsDuck'

/* Assets */
import Logo from '../assets/new_logo.png'
import moment from 'moment'
import { useNavigation } from '@react-navigation/native'
import { getUrlImage } from '../utils/functions'




const GoalsReport = ({goalsDuck, authDuck, getGoalsReport, ...props}) => {
    const [optionSelected, setoptionSelected] = useState(null)
    const [loading, setLoading] = useState(false)
    const [isRefresh, setIsRefresh] = useState(false)
    const [rangeDate, setRangeDate] = useState([])

    const screenWidth = Dimensions.get("window").width;
    const screenHeight = Dimensions.get("window").height
    const navigation = useNavigation();
    
    const user = authDuck?.user
    
    const report = goalsDuck?.report
    const categories = goalsDuck?.categories

    useEffect(() => {
      console.log('rangeDate',rangeDate)
    }, [rangeDate])
    

    const getDateRange = () => {
        var currentDate = moment();

        if(optionSelected === 1){
            var weekStart = currentDate.clone().startOf('isoWeek');
            var weekEnd = currentDate.clone().endOf('isoWeek');
            let startD = moment(weekStart).format("YYYY-MM-DD")
            let endD = moment(weekEnd).format("YYYY-MM-DD")
            setRangeDate([startD, endD])
        }else if(optionSelected === 2){
            const startOfMonth = moment().clone().startOf('month').format('YYYY-MM-DD');
            const endOfMonth = moment().clone().endOf('month').format('YYYY-MM-DD');
            setRangeDate([startOfMonth, endOfMonth])
        }else if(optionSelected === 3){
            const start = moment(currentDate).subtract(1,'months').startOf('month').format('YYYY-MM-DD');
            const end = moment(currentDate).subtract(1,'months').endOf('month').format('YYYY-MM-DD');
            setRangeDate([start, end])
        }
    }

    useEffect(() => {
        if(rangeDate.length > 0){
            getInfo()
        }
    }, [rangeDate])

    const getInfo = async () => {
        const data = {
            userId: user.id,
            dateOne: rangeDate[0],
            dateTwo: rangeDate[1]
        }
        setLoading(true)
        const resp = await getGoalsReport(data)
        setLoading(false)
    }
    


    const onRefresh = async () => {
        const data = {
            userId: user.id,
            dateOne: rangeDate[0],
            dateTwo: rangeDate[1]
        }
        setIsRefresh(true)
        setLoading(true)
        await getGoalsReport(data)
        setIsRefresh(false)
        setLoading(false)
    }
    

    useEffect(() => {
        if(user?.id){
            setoptionSelected(2)
            /* getDateRange() */
        }
    }, [])
    
    useEffect(() => {
        getDateRange()
    }, [optionSelected])
    
    
    

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <ScrollView showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={isRefresh}  onRefresh={onRefresh} />}
        >
        <View flex={1} style={{ flexDirection: 'column', paddingBottom:150, paddingHorizontal:30 }} >
            <HStack justifyContent={'center'} p={1}   marginBottom={5}>
              <Image
                source={Logo}
                alt='question1'
                style={styles.logo}
              />
            </HStack>
            <HStack backgroundColor={Colors.white} zIndex={10}>
                <View flex={1} style={ optionSelected === 1 ? styles.optionSelected : styles.headerOptions }>
                    <TouchableOpacity onPress={() => setoptionSelected(1)} style={{ height:'100%', width:'100%' }} >
                        <Text textAlign={'center'} margin={'auto'} color={optionSelected === 1 ? Colors.white : Colors.black}>
                            Semana
                        </Text>
                    </TouchableOpacity>
                </View>
                <View flex={1} style={ optionSelected === 2 ? styles.optionSelected : styles.headerOptions }>
                    <TouchableOpacity onPress={() => setoptionSelected(2)} style={{ height:'100%', width:'100%' }} >
                        <Text textAlign={'center'} margin={'auto'} color={optionSelected === 2 ? Colors.white : Colors.black}>
                            Mes
                        </Text>
                    </TouchableOpacity>
                </View>
                <View flex={1} style={ optionSelected === 3 ? styles.optionSelected : styles.headerOptions }>
                    <TouchableOpacity onPress={() => setoptionSelected(3)} style={{ height:'100%', width:'100%' }} >
                        <Text textAlign={'center'} margin={'auto'} color={optionSelected === 3 ? Colors.white : Colors.black}>
                            Mes anterior
                        </Text>
                    </TouchableOpacity>
                </View>
            </HStack>
            <HStack backgroundColor={Colors.white} zIndex={10} justifyContent={'center'} paddingTop={5} paddingX={5} paddingBottom={2}>
                {
                    loading && <Skeleton width={'100%'} />
                }
                {
                    report?.map(item => (
                        <View flex={1} >
                            <Image alt='img1' resizeMode='contain' aspectRatio={3}  source={{ uri: getUrlImage(item?.icon?.url) }} />
                            <Text textAlign={'center'}>
                                {item?.name}

                            </Text>
                            <Text textAlign={'center'}>
                            {item?.goals_completed}/{item?.goals}
                            </Text>
                        </View>
                        )
                    )
                }
            </HStack>
            <BarChartGoals dataReport={report} loading={loading || isRefresh} />
            {
                !loading &&
                <HStack justifyContent={'center'} backgroundColor={'transparent'}  >
                    <TouchableOpacity onPress={() => navigation.navigate('HomeScreen') } style={{ backgroundColor: Colors.black, width: 147, height: 34, display:'flex', borderRadius:10, marginTop:100}}>
                        <Text color={Colors.white} margin={'auto'} >
                            Continuar
                        </Text>
                    </TouchableOpacity>
                </HStack>
            }
        </View>
        <FooterLines />
        </ScrollView>
    </SafeAreaView>
  )
}

const mapState = (state) => {
    return {
        goalsDuck: state.goalsDuck,
        authDuck: state.authDuck
    }
}

export default connect(mapState, {getGoalsReport})(GoalsReport)

const styles = StyleSheet.create({
    headerOptions:{
        borderColor: Colors.back,
        borderWidth: 1,
        height:40,
        display: 'flex'
    },
    optionSelected:{
        borderColor: Colors.yellow,
        borderWidth: 1,
        height:40,
        display: 'flex',
        backgroundColor: Colors.yellow,
        color: Colors.white
    },

    orangeLeft:{
        flex: 0.4,
        height: 24,
        backgroundColor: Colors.yellow,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        marginTop: 'auto'
      },
      orangeLeftPadding:{
        flex: 0.2,
        height: 13,
        backgroundColor: Colors.yellow,
        borderRadius:20,
        marginBottom: 'auto'
      },
      orangeRight:{
        flex: 0.4,
        height: 24,
        backgroundColor: Colors.yellow,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        marginTop: 'auto'
      },
      orangeRightPadding:{
        flex: 0.2,
        height: 13,
        backgroundColor: Colors.yellow,
        borderRadius:20,
        marginBottom: 'auto'
      },
      orangeCenter:{
        flex: .75,
        height: 24,
        backgroundColor: Colors.yellow,
        borderRadius: 20
      }
})