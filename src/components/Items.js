import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { springAnim } from '../utils/Utils';
import { getAlgoFunction } from '../utils/SortingAlgorithms';

const liStyle = {
    marginTop: 24,
    marginBottom: 24,
    borderRadius: 5,
    listStyle: 'none',
    color: 'white',
    fontSize: '32px',
    textAlign: 'center',
    display: 'grid',
    alignItems: 'center'
}

export default function Items({items, isSorted, setIsSorted, setItems, algoFunction, process}){
    const liHeight = Math.floor((window.innerHeight/2) / items.length);
    const liWidthUnit = Math.floor((window.innerWidth/2) / 100);
    
    useEffect(() => {
        if(isSorted === false && process==true){
            const intervalId = setInterval(
                () => doNextRun(algoFunction), 
                1000);

            return () => clearInterval(intervalId);
        }
    }, [items, algoFunction, isSorted, process])

    function doNextRun(algoFunction){
        const result = getAlgoFunction(algoFunction)(items);
        setItems(result)
    }

    return(
        <div style={{display: 'grid', justifyItems: 'center'}}>
            {
                items.map(item => 
                    <motion.div 
                        key={item.itemValue}
                        layoutTransition={springAnim}
                        style={{...liStyle, 
                        background: item.color, 
                        width: item.itemValue*liWidthUnit,
                        height: liHeight
                        }}>
                            <h5 style={{margin: 0}}>{item.itemValue}</h5>
                    </motion.div>
                )
            }
        </div>
    )
}