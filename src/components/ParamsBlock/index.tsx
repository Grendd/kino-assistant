import React from "react";

import './styles.scss'

type ItemProps = {
    keyItem: string
    value: string | number | string[]
}
const Item = ({keyItem, value}: ItemProps) => {
    const color = () => {
        if (keyItem === 'status' && value === 'Ended'){
            return 'red';
        }
        if (keyItem === 'status' && value === 'Running'){
            return 'green';
        }
        if (keyItem === 'rating'){
            if (value <= 5)
                return 'red'
            if (value <= 7)
                return 'yellow';
            return 'green'
        }
        return '';
    }
    return (
        <div className='controller_item'>
            <div>{keyItem[0].toLocaleUpperCase() + keyItem.slice(1)}:</div>
            <div className={color()}>{Array.isArray(value) ? value.join(', ') : value}</div>
        </div>
    )
}

type ParamsControllerProps = {
    items: Record<string, any>
}

const ParamsController = ({items}: ParamsControllerProps) => {
    return (
        <div className="controller">
            {Object.keys(items).map((key, i)=> <Item key={`item-${i}`} keyItem={key} value={items[key]} />)}
        </div>
    )
}

export default ParamsController