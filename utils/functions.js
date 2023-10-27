import AsyncStorage from '@react-native-async-storage/async-storage';
import {Platform,PixelRatio} from "react-native";
import {t} from 'i18n-js';
import { Image } from 'react-native';
const exampleImage = require('../assets/new_logo.png')
import { baseURL, isprod, isDev } from '../utils/AxiosApi'
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import moment from 'moment';
import logoPng from '../assets/new_logo.png'


export const storeDataObject = async (key='@data', value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
        // saving error
        console.log('storeDataObject error =>',e.toString())
    }
}

export const getDataObject = async (key='') => {
    try {
        const jsonValue = await AsyncStorage.getItem(key)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
        console.log('getDataObject error =>',e.toString())
    }
}



export const storeData = async (key='@data',value) => {
    try {
        await AsyncStorage.setItem(key, value)
    } catch (e) {
        // saving error
        console.log('storeData error =>',e.toString())
    }
}


export const getData = async (key='') => {
    try {
        const value = await AsyncStorage.getItem(key)
        /*
        if (value !== null) {
            // value previously stored
        }*/
    } catch(e) {
        // error reading value
        console.log('getData error => ',e.toString())
    }
}

export const removeAllData = async () => {

}

export const translateEmotions = (emotion)=>{
    let newStringEmotion = emotion.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    let msg = t(newStringEmotion.replace('.','').replace(/ /g,"").toLowerCase())
    return msg.includes('missing') ? emotion : msg
}

const arrayMonths=[
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'junio',
    'Julio',
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

export const getProgressProject = (project) => {
    const val = 100/6

    total = 0
    if(project?.attributes?.goal){
        total+= val
    }
    if(project?.attributes?.reason){
        total+= val
    }
    if(project?.attributes?.how){
        total+= val
    }
    if(project?.attributes?.when){
        total+= val
    }
    if(project?.attributes?.where){
        total+= val
    }
    if(project?.attributes?.how_much){
        total+= val
    }
    if(total  === 0){
        return 0
    }else{
        return Math.ceil(total)
    }
}

export const getUrlImage = (url=null) => {
    if(url){
        return (isprod || isDev)  ? url : baseURL+url
    }else{
        return 'https://i0.wp.com/fenamacajedrez.com/wp-content/uploads/2023/02/placeholder-5.png?fit=1200%2C800&ssl=1'
    }
}

const fetchImageData = async (uri) => { // fetch Base64 string of image data
    const data = await FileSystem.readAsStringAsync('file://' + uri, {
     encoding: FileSystem.EncodingType.Base64,
    });
    return imageData = 'data:image/png;base64,' + data;
   };

export const printProject = async (data) => {
    console.log('printProject', data)
    const { default: imageYnl } = await import('../assets/new_logo.png')
    const { default: imageSixPack } = await import('../assets/six_pack.png')
    const { default: appStore } = await import('../assets/app_store.png')
    const { default: playStore } = await import('../assets/play_store.png')

    /* const logoYnl = Image.resolveAssetSource(imageYnl).uri */
    const logoYnl = "https://app-ynl.s3.us-west-1.amazonaws.com/new_logo_9f8f5943b8.png"
    /* const logoSixPack = Image.resolveAssetSource(imageSixPack).uri */
    const logoSixPack = "https://app-ynl.s3.us-west-1.amazonaws.com/six_pack_2773652b37.png"
    /* const appStoreUrl = Image.resolveAssetSource(appStore).uri */
    const appStoreUrl = "https://app-ynl.s3.us-west-1.amazonaws.com/app_store_0ee7e7bc79.png"
    /* const playStoreUrl = Image.resolveAssetSource(playStore).uri */
    const playStoreUrl = "https://app-ynl.s3.us-west-1.amazonaws.com/play_store_bab348f5ee.png"
    

    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <table style="width: 100%;">
            <tr>
                <td style=" padding-top: 20px; padding-bottom:20px">
                    <img src=${logoYnl} width="100px" height="90px" />
                </td>
                <td style=" padding-top: 20px; padding-bottom:20px; ext-align: center; text-align: center;" >
                    ${data?.attributes?.name}
                </td>
                <td style=" padding-top: 20px; padding-bottom:20px; text-align: right;">
                    <img src=${logoSixPack} width="100px" height="80px" />
                </td>
            </tr>
            <tr>
                <td colspan="3" style="background-color: #F5AC00; padding:10px ;" ><b>Objetivo</b></td>
            </tr>
            <tr>
                <td colspan="3" style="padding: 10px; padding-bottom: 50px;">${data.attributes.goal === null ? "" : data?.attributes.goal}</td>
            </tr>
            <tr>
                <td colspan="3"  style="background-color: #F5AC00; padding:10px ;" ><b>¿Por qué?</b></td>
            </tr>
            <tr>
                <td colspan="3" style="padding: 10px;padding-bottom: 50px;">${data?.attributes.reason === null ? "" : data?.attributes?.reason}</td>
            </tr>
            <tr>
                <td colspan="3"  style="background-color: #F5AC00; padding:10px ;" ><b>¿Cómo?</b></td>
            </tr>
            <tr>
                <td colspan="3" style="padding: 10px;padding-bottom: 50px;">${data?.attributes.how === null ? "" : data?.attributes?.how}</td>
            </tr>
            <tr>
                <td colspan="3" style="background-color: #F5AC00; padding:10px ;" ><b>¿Cuando?</b></td>
            </tr>
            <tr>
                <td colspan="3" style="padding: 10px;padding-bottom: 50px;">${data?.attributes.when === null ? "" : data?.attributes?.when }</td>
            </tr>
            <tr>
                <td colspan="3" style="background-color: #F5AC00; padding:10px ;" ><b>¿Dónde?</b></td>
            </tr>
            <tr>
                <td colspan="3" style="padding: 10px;padding-bottom: 50px;">${data?.attributes.where === null ? "" : data?.attributes?.where}</td>
            </tr>
            <tr>
                <td colspan="3" style="background-color: #F5AC00; padding:10px ;" ><b>¿Cuanto?</b></td>
            </tr>
            <tr>
                <td colspan="3" style="padding: 10px;padding-bottom: 50px;">${data?.attributes.how_much === null ? "" : data?.attributes?.how_much}</td>
            </tr>
            <tr style="text-align:center;" >
                <td colspan="3">
                    <table>
                        <tr>
                            <td>

                            </td>
                            <td colspan="2">
                                Encuéntranos en las tiendas como YNL:
                            </td>
                            <td>
                                <img src=${appStoreUrl} width="160px" height="50px" />
                            </td>
                            <td>
                                <img src=${playStoreUrl} width="150px" height="65px" />
                            </td>
                        </tr>
                    </table>
                </td>  
            </tr>
        </table>
    </body>
    </html>`

    await Print.printAsync({
        html,
    });
}

export const SharePdfProject = async (data) => {
    const { default: imageYnl } = await import('../assets/new_logo.png')
    const { default: imageSixPack } = await import('../assets/six_pack.png')
    const { default: appStore } = await import('../assets/app_store.png')
    const { default: playStore } = await import('../assets/play_store.png')

    /* const logoYnl = Image.resolveAssetSource(imageYnl).uri */
    const logoYnl = "https://app-ynl.s3.us-west-1.amazonaws.com/new_logo_9f8f5943b8.png"
    /* const logoSixPack = Image.resolveAssetSource(imageSixPack).uri */
    const logoSixPack = "https://app-ynl.s3.us-west-1.amazonaws.com/six_pack_2773652b37.png"
    /* const appStoreUrl = Image.resolveAssetSource(appStore).uri */
    const appStoreUrl = "https://app-ynl.s3.us-west-1.amazonaws.com/app_store_0ee7e7bc79.png"
    /* const playStoreUrl = Image.resolveAssetSource(playStore).uri */
    const playStoreUrl = "https://app-ynl.s3.us-west-1.amazonaws.com/play_store_bab348f5ee.png"

    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <table style="width: 100%;">
            <tr>
                <td style=" padding-top: 20px; padding-bottom:20px">
                    <img src="${logoYnl}" width="100px" height="90px" />
                </td>
                <td style=" padding-top: 20px; padding-bottom:20px; ext-align: center; text-align: center;" >
                    ${data?.attributes?.name}
                </td>
                <td style=" padding-top: 20px; padding-bottom:20px; text-align: right;">
                    <img src="${logoSixPack}" width="100px" height="80px" />
                </td>
            </tr>
            <tr>
                <td colspan="3" style="background-color: #F5AC00; padding:10px ;" ><b>Objetivo</b></td>
            </tr>
            <tr>
                <td colspan="3" style="padding: 10px; padding-bottom: 50px;">${data?.attributes.goal === null ? "" : data?.attributes?.goal}</td>
            </tr>
            <tr>
                <td colspan="3"  style="background-color: #F5AC00; padding:10px ;" ><b>¿Por qué?</b></td>
            </tr>
            <tr>
                <td colspan="3" style="padding: 10px;padding-bottom: 50px;">${data?.attributes.reason === null ? "" : data?.attributes.reason}</td>
            </tr>
            <tr>
                <td colspan="3"  style="background-color: #F5AC00; padding:10px ;" ><b>¿Cómo?</b></td>
            </tr>
            <tr>
                <td colspan="3" style="padding: 10px;padding-bottom: 50px;">${data?.attributes.how === null ? "" : data?.attributes?.how}</td>
            </tr>
            <tr>
                <td colspan="3" style="background-color: #F5AC00; padding:10px ;" ><b>¿Cuando?</b></td>
            </tr>
            <tr>
                <td colspan="3" style="padding: 10px;padding-bottom: 50px;">${data?.attributes.when === null ? "" : data?.attributes?.when }</td>
            </tr>
            <tr>
                <td colspan="3" style="background-color: #F5AC00; padding:10px ;" ><b>¿Dónde?</b></td>
            </tr>
            <tr>
                <td colspan="3" style="padding: 10px;padding-bottom: 50px;">${data?.attributes.where === null ? "" :data?.attributes?.where }</td>
            </tr>
            <tr>
                <td colspan="3" style="background-color: #F5AC00; padding:10px ;" ><b>¿Cuanto?</b></td>
            </tr>
            <tr>
                <td colspan="3" style="padding: 10px;padding-bottom: 50px;">${data?.attributes.how_much === null ? "" : data?.attributes?.how_much}</td>
            </tr>
            <tr style="text-align:center;" >
                <td colspan="3">
                    <table>
                        <tr>
                            <td>

                            </td>
                            <td colspan="2">
                                Encuéntranos en las tiendas como YNL:
                            </td>
                            <td>
                                <img src="${appStoreUrl}" width="160px" height="50px" />
                            </td>
                            <td>
                                <img src="${playStoreUrl}" width="150px" height="65px" />
                            </td>
                        </tr>
                    </table>
                </td>  
            </tr>
        </table>
    </body>
    </html>`

    const { uri } = await Print.printToFileAsync({ html });
    await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' })
}   

export const getProjectsAvailable = (user) => {
    const today =  moment()
    const registerDate = moment(user?.createdAt)
    const dif = today.diff(registerDate, 'days')
    if(dif > 21){
        return true
    }else{
        return false
    }
}

const fontScale = PixelRatio.getFontScale();
export const getFontSize = size => size/fontScale;