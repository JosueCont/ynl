import AsyncStorage from '@react-native-async-storage/async-storage';

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
    try {
        await AsyncStorage.remove('@user')
        await AsyncStorage.remove('@jwt')
    } catch (e) {
        // error reading value
    }
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

export const getDay=()=>{
    return new Date().getDate();
}

export const getMonth=()=>{
    let month = new Date().getMonth();
    return arrayMonths[month]
}