import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Slider } from '@material-ui/core';
import Items from './Items';
import { generateRandomArray, springAnim, generateRandomColor } from '../utils/Utils';
import { bubbleSort } from '../utils/SortingAlgorithms';

import 'typeface-roboto';

export default function MainScreen() {

    const [numItems, setNumItems] = useState(2);
    const [isSorted, setIsSorted] = useState(false);
    const [algoFunction, setAlgoFunction] = useState("bubbleSort");

    const [items, setItems] = useState(generateRandomArray(numItems));

    function setNewItems(num){
        if(num===numItems){
            return
        }

        setNumItems(num);
        let randomItems = generateRandomArray(num);
        setItems(randomItems);
    }

    return (
        <React.Fragment>
        <CssBaseline />
        <Container maxWidth="lg" style={{ height: '100vh' }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography color="textSecondary" component="h1" variant="h1">Sorting Visualizer</Typography>
                </Grid>

                <Grid item xs={12}>
                    <Slider
                        value={typeof numItems === 'number' ? numItems : 0}
                        onChange={(e, newValue)=>setNewItems(newValue)}
                        aria-labelledby="input-slider"
                        valueLabelDisplay="auto"
                        max={10}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Typography component="h4" variant="h4">Number of items: {numItems}</Typography>
                </Grid>

                <Grid alignContent='center' alignItems='center' item xs={12}>
                    <Items isSorted={isSorted} 
                    algoFunction={algoFunction} 
                    items={items} 
                    setItems={setItems} 
                    setIsSorted={setIsSorted}/>
                </Grid>

                <button onClick={()=>setAlgoFunction("bubbleSort")}>BubbleSort</button>
            </Grid>
        </Container>
        </React.Fragment>
    );
}