import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Slider } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Items from './Items';
import { generateRandomArray } from '../utils/Utils';
import { getAlgoFunction } from '../utils/SortingAlgorithms';

import 'typeface-roboto';

export default function MainScreen() {
    const [layout, setLayout] = useState("horizontal");
    const [speed, setSpeed] = useState(1000);
    const [numItems, setNumItems] = useState(2);
    const [isSorted, setIsSorted] = useState(false);
    const [algoFunction, setAlgoFunction] = useState("BubbleSort");
    // State to start the sort process
    const [process, setProcess] = useState(false);
    const [items, setItems] = useState(generateRandomArray(numItems));

    const maxItems = layout==='horizontal'?10:30;

    function changeSpeed(e){
        const newSpeed = e.target.value;
        if(newSpeed<0 || newSpeed>1000){
            alert('Speed should be between 0 and 1000 ms');
        }
        else{
            setSpeed(newSpeed);
        }
    }

    function toggleLayout(){
        if(layout === "vertical")
            setLayout("horizontal");
        else
            setLayout("vertical");
    }

    function reset(){
        setProcess(false);
        setAlgoFunction("BubbleSort");
        setIsSorted(false);
        setNumItems(2);
    }

    function reset(num){
        setProcess(false);
        setAlgoFunction("BubbleSort");
        setIsSorted(false);
        setNewItems(num);
    }

    function setNewItems(num){
        if(num===numItems){
            return
        }

        setNumItems(num);
        let randomItems = generateRandomArray(num);
        setItems(randomItems);
    }

    function runAlgorithm(){
        const result = getAlgoFunction(algoFunction)(items);
        for(let i = 0; i<result.length;i++){
            setTimeout(()=>setItems(result[i]),i*speed);
        }
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
                        onChange={(e, newValue)=>reset(newValue)}
                        aria-labelledby="input-slider"
                        valueLabelDisplay="auto"
                        max={maxItems}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Typography component="h4" variant="h4">Number of items: {numItems}</Typography>
                </Grid>

                <Grid item xs={12}>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Sorting Algorithm</FormLabel>
                        <RadioGroup row aria-label="algorithm" name="algorithm" value={algoFunction} onChange={(e) => setAlgoFunction(e.target.value)}>
                            <FormControlLabel value="BubbleSort" control={<Radio />} label="BubbleSort" />
                            <FormControlLabel value="InsertionSort" control={<Radio />} label="InsertionSort" />
                            <FormControlLabel value="SelectionSort" control={<Radio />} label="SelectionSort" />
                            <FormControlLabel disabled value="MergeSort" control={<Radio />} label="MergeSort" />
                            <FormControlLabel value="QuickSort" control={<Radio />} label="QuickSort" />
                        </RadioGroup>
                    </FormControl>
                </Grid>

                <Grid item xs={12} style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Button disabled={process} variant="contained" color="primary" onClick={()=>runAlgorithm()}>
                        Launch Sort! 🚀
                    </Button>
                    
                    <TextField
                        id="standard-number"
                        label="Speed (ms)"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={speed}
                        onChange = {changeSpeed}
                    />

                    <Button style={{float: 'right'}} disabled={process} variant="contained" color="secondary" onClick={()=>toggleLayout()}>
                        Toggle Layout: {layout.toUpperCase()}
                    </Button>
                </Grid>

                <Grid alignContent='center' alignItems='center' item xs={12}>
                    <Items 
                        items={items} 
                        layout={layout}
                    />
                </Grid>
            </Grid>
        </Container>
        </React.Fragment>
    );
}