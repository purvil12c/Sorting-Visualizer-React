import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Slider } from '@material-ui/core';
import Items from './Items';

import 'typeface-roboto';

export default function MainScreen() {
    const [numItems, setNumItems] = useState(2);
    const [isSorted, setIsSorted] = useState(false);

    return (
        <React.Fragment>
        <CssBaseline />
        <Container maxWidth="lg" style={{ backgroundColor: '#cfe8fc', height: '100vh' }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography component="h1" variant="h1">Sorting Visualizer</Typography>
                </Grid>

                <Grid item xs={12}>
                    <Slider
                        value={typeof numItems === 'number' ? numItems : 0}
                        onChange={(e, newValue)=>setNumItems(newValue)}
                        aria-labelledby="input-slider"
                        valueLabelDisplay="auto"
                        max={10}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Typography component="h4" variant="h4">Number of items: {numItems}</Typography>
                </Grid>

                <Grid item xs={12}>
                    <Items numItems={numItems} setIsSorted={setIsSorted}></Items>
                </Grid>
            </Grid>
        </Container>
        </React.Fragment>
    );
}