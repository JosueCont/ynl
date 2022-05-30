import AsyncStorage from '@react-native-async-storage/async-storage';
import {Platform} from "react-native";

export const storeDataObject = async (key='@data', value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
        // saving error
    }
}

export const getDataObject = async (key='') => {
    try {
        const jsonValue = await AsyncStorage.getItem(key)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
        // error reading value
    }
}



export const storeData = async (key='@data',value) => {
    try {
        await AsyncStorage.setItem(key, value)
    } catch (e) {
        // saving error
    }
}


export const getData = async (key='') => {
    try {
        const value = await AsyncStorage.getItem(key)
        if(value !== null) {
            // value previously stored
        }
    } catch(e) {
        // error reading value
    }
}

export const removeAllData = async () => {

}

const arrayMonths=[
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'junio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
]

export const getDay = () => {
    return new Date().getDate();
}

export const getMonth = () => {
    let month = new Date().getMonth();
    return arrayMonths[month]
}

export const resolvePlatform = (ios, android) => {
    return Platform.OS === 'ios' ? ios : android;
}


export const getShadowCircleStyle = (width, height) => {
    return {
        shadowColor: "#000",
        shadowOffset: {
            width: width,
            height: height,
        },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,

    }
}


export const isEmailValid = (email) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return reg.test(email);
}