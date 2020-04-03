export function bubbleSort(items, setItems){
    let resultItems = JSON.parse(JSON.stringify(items));

    let isSorted = false;
    while(isSorted===false){
        isSorted = true;

        for(let i = 0;i<resultItems.length-1;i++){
            if(resultItems[i].itemValue>resultItems[i+1].itemValue){
                [resultItems[i], resultItems[i+1]] = [resultItems[i+1], resultItems[i]];
                isSorted = false;
                return resultItems;
            }
        }
    }
    return resultItems;
}

export function getAlgoFunction(algoFunction){
    if(algoFunction="bubbleSort"){
        return bubbleSort;
    }
    return bubbleSort;
}