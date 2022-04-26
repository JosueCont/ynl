import React, {useEffect, useState} from 'react'
import {Select} from "native-base";
import _ from "lodash";


const SelectEmotion=({parent,emotions,...props})=>{

    const [child, setChild]=useState(null)

    useEffect(()=>{
        if(emotions){
            getListFromParent()
        }
    },[emotions])

    /**
     * Obtenemos un listado de emociones dado un id de parent
     * @returns {*[]}
     */
    const getListFromParent=()=>{
        try{
            if(emotions){
                let newaarray =[];
                emotions.forEach((item,i)=>{
                    if(_.get(item,'attributes.parent.data.id',0)===parent.id){
                        newaarray.push(item)
                    }
                })
                console.log('new current list', newaarray)
                setChild(newaarray)
            }
        }catch (e){
            console.log('errors', e)
        }
    }

    return (
        <Select  borderColor="red.500" fontWeight="bold"
                     fontSize={18}
                     borderRadius={10}
                     p={5}
                     color={'gray.700'}
                     onValueChange={itemValue => props.onSelectEmotion(itemValue)}
                     accessibility={true}
                     style={styleSelect} mb={2}
                     placeholder={parent.attributes.name} >
            {
                child?child.map((item,i)=>{
                    return <Select.Item color={'black'} fontSize={20} fontWeight="bold" key={i} value={item.id} label={item.attributes.name} />
                }):null
            }
        </Select>
    )
}

const styleSelect={
    border:'red',
    padding:10
}

export default SelectEmotion;
