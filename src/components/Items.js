import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { generateRandomArray, springAnim, generateRandomColor } from '../utils/Utils';

const liStyle = {
    marginTop: 24,
    marginBottom: 24,
    borderRadius: 5,
}

export default function Items({numItems, setIsSorted}){
    const liHeight = Math.floor((window.innerHeight - 500) / numItems);
    const liWidthUnit = Math.floor((window.innerWidth - 500) / 100);
    const randomItems = generateRandomArray(numItems);
    return(
        <ul>
            {
                randomItems.map(item => 
                    <motion.li 
                        key={item.itemValue}
                        style={{...liStyle, 
                        background: item.color, 
                        width: item.itemValue*liWidthUnit,
                        height: liHeight
                        }}>
                            {item.itemValue}
                    </motion.li>
                )
            }
        </ul>
    )
}