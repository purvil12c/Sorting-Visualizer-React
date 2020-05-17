import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { springAnim } from '../utils/Utils';

const liStyle = {
    marginTop: 8,
    marginBottom: 8,
    marginLeft: 4,
    marginRight: 4,
    borderRadius: 5,
    listStyle: 'none',
    color: 'white',
    fontSize: '32px',
    textAlign: 'center',
    alignItems: 'center',
    display: 'grid'
}

export default function Items({items, layout}){
    let liHeight, liWidth;
    if(layout==='horizontal'){
        liHeight = 48;
        liWidth = Math.floor((window.innerWidth/2) / 100);
    }
    else{
        liHeight = Math.floor((window.innerHeight/2) / 100);
        liWidth = 32;
    }

    return(
        <div style={{display: layout==='horizontal'?'grid':'inline-flex', justifyItems: 'center'}}>
            {
                items.map(item =>
                    <motion.div
                        key={item.id}
                        layoutTransition={springAnim}
                        style={{...liStyle,
                        background: item.IsBeingSwapped === true?"black":item.color,
                        width: layout==='horizontal'?(item.itemValue+10)*liWidth:liWidth,
                        height: layout==='horizontal'?liHeight:liHeight*(item.itemValue+10)
                        }}>
                            <h6 style={{margin: 0}}>{item.itemValue}</h6>
                    </motion.div>
                )
            }
        </div>
    )
}
