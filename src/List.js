import React from 'react';

export default function List({list}) {
    console.log(list, 4)
    const items = list.map((item,index) => {
        return (
         <Item item={item} key={index}/>
    )})

    return (
        <div>
        {items}
        </div>
    );
}

function Item({item}) {
    return (
        <div>{item.name}</div>
    )
}