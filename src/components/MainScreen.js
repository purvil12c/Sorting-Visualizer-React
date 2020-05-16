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
import {generateRandomArray, generateRandomColor} from '../utils/Utils';
import { getAlgoFunction } from '../utils/SortingAlgorithms';

import 'typeface-roboto';
import {uid} from "react-uid";

export default function MainScreen() {
    const [layout, setLayout] = useState("horizontal");
    const [speed, setSpeed] = useState(1000);
    const [numItems, setNumItems] = useState(2);
    const [isSorted, setIsSorted] = useState(false);
    const [algoFunction, setAlgoFunction] = useState("BubbleSort");
    const [inputType, setInputType] = useState("DefaultInput");
    // State to start the sort process
    const [process, setProcess] = useState(false);
    const [items, setItems] = useState(generateRandomArray(numItems));
    const [customNumbers, setCustomNumbers] = useState([]);

    const maxItems = layout === 'horizontal' ? 10 : 30;

    function changeSpeed(e) {
        const newSpeed = e.target.value;
        if (newSpeed < 0 || newSpeed > 1000) {
            alert('Speed should be between 0 and 1000 ms');
        } else {
            setSpeed(newSpeed);
        }
    }

    function customInput(e){
        let input = e.target.value.split(' ').filter(number => parseInt(number));
        setCustomNumbers(input);
    }

    function submit(){
      setItems([]);
      let customItems = [];
      for(let i=0;i<customNumbers.length;i++){
          const value = customNumbers[i];
          customItems.push({ id: uid(Math.random()), itemValue: Number(value), color: generateRandomColor(), IsBeingSwapped : false})
      }
      setItems(customItems)
    }
    function toggleLayout() {
        if (layout === "vertical")
            setLayout("horizontal");
        else
            setLayout("vertical");
    }

    function reset() {
        setProcess(false);
        setAlgoFunction("BubbleSort");
        setIsSorted(false);
        setNumItems(2);
    }

    function reset(num) {
        setProcess(false);
        setAlgoFunction("BubbleSort");
        setIsSorted(false);
        setNewItems(num);
    }

    function setNewItems(num) {
        if (num === numItems) {
            return
        }

        setNumItems(num);
        let randomItems = generateRandomArray(num);
        setItems(randomItems);
    }

    function checkSwappedElements(itemsPrev, itemsCurrent)
    {
        let newItems = []
        for (let i = 0; i < items.length; i++)
        {
            newItems[i] = itemsCurrent[i];
            if(itemsCurrent[i].itemValue != itemsPrev[i].itemValue)
            {
                newItems[i].IsBeingSwapped = true;
            }
        }
        return newItems;
    }

    function runAlgorithm() {
        const result = getAlgoFunction(algoFunction)(items);
        for (let i = 0; i < result.length; i++) {

            if( i!= result.length-1)
            {
                let resultItemsWithSwapState = i==0?checkSwappedElements(items,result[i]):checkSwappedElements(result[i-1],result[i]);
                setTimeout(() => setItems(resultItemsWithSwapState), i * speed);
            }
            else
            {
                setTimeout(() => setItems(result[i]), i * speed);
            }   
        }
    }

    return (
        <React.Fragment>
            <CssBaseline/>
            <Container maxWidth="lg" style={{height: '100vh'}}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography color="textSecondary" component="h1" variant="h1">Sorting
                            Visualizer</Typography>
                    </Grid>

                    {inputType ==="DefaultInput" && <Grid item xs={12}>
                        <Slider
                            value={typeof numItems === 'number' ? numItems : 0}
                            onChange={(e, newValue) => reset(newValue)}
                            aria-labelledby="input-slider"
                            valueLabelDisplay="auto"
                            max={maxItems}
                        />
                    </Grid>}

                    {inputType ==="DefaultInput" && <Grid item xs={12}>
                        <Typography component="h4" variant="h4">Number of items: {numItems}</Typography>
                    </Grid>}

                    <Grid item xs={12}>
                        <FormControl component="fieldset">
                            <RadioGroup row aria-label="input-type" name="input-type" value={inputType}
                                        onChange={(e)=>setInputType(e.target.value)}>
                                <FormControlLabel value="CustomInput" control={<Radio/>} label="Custom Input"/>
                                <FormControlLabel value="DefaultInput" control={<Radio/>}
                                                  label="Default Input"/>
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    {inputType === "CustomInput" && <Grid item xs={12}>
                        <TextField id="custom_input"
                                   onChange={customInput}
                                   type="text"
                                   placeholder="Insert space separated numbers. Eg: 23 7 12 90"
                                   style={{width:"100%"}}
                                   />
                        <Button disabled={process} variant="contained" color="primary"
                                onClick={() => submit()}>
                            Done!
                        </Button>
                    </Grid>


                    }
                    <Grid item xs={12}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Sorting Algorithm</FormLabel>
                            <RadioGroup row aria-label="algorithm" name="algorithm" value={algoFunction}
                                        onChange={(e) => setAlgoFunction(e.target.value)}>
                                <FormControlLabel value="BubbleSort" control={<Radio/>} label="BubbleSort"/>
                                <FormControlLabel value="InsertionSort" control={<Radio/>} label="InsertionSort"/>
                                <FormControlLabel value="SelectionSort" control={<Radio/>} label="SelectionSort"/>
                                <FormControlLabel value="MergeSort" control={<Radio/>} label="MergeSort"/>
                                <FormControlLabel value="QuickSort" control={<Radio/>} label="QuickSort"/>
                            </RadioGroup>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} style={{display: 'flex', justifyContent: 'space-between'}}>
                        <Button disabled={process} variant="contained" color="primary"
                                onClick={() => runAlgorithm()}>
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
                            onChange={changeSpeed}
                        />

                        <Button style={{float: 'right'}} disabled={process} variant="contained" color="secondary"
                                onClick={() => toggleLayout()}>
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
