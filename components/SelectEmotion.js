import React, {useEffect} from 'react'
import {Select} from "native-base";


const SelectEmotion = ({item}) => {


    useEffect(() => {
        console.log(item, 12)
    }, [])

    return (
        <Select key={item.id} borderColor="red.500" fontWeight="bold"
                fontSize={18}
                borderRadius={10}
                p={5}
                color={'gray.700'}
                onValueChange={itemValue => console.log(itemValue)}
                accessibility={true}
                style={styleSelect} mb={2}>
            
            <Select.Item label="UX Research" value="ux"/>
            <Select.Item label="Web Development" value="web"/>
            <Select.Item label="Cross Platform Development" value="cross"/>
            <Select.Item label="UI Designing" value="ui"/>
            <Select.Item label="Backend Development" value="backend"/>
           
        </Select>
    )
}

const styleSelect = {
    border: 'red',
    padding: 10
}

export default SelectEmotion;
