export function bubbleSort(items){
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

export function insertionSort(items){
    let resultItems = JSON.parse(JSON.stringify(items));
    for(let i = 1; i<resultItems.length;i++){
        let j = i;
        while(j>0 && resultItems[j]<resultItems[j-1]){
            [resultItems[j], resultItems[j-1]] = [resultItems[j-1], resultItems[j]]
            j-=1
            return resultItems
        }
    }
    return resultItems;
}

export function getAlgoFunction(algoFunction){
    if(algoFunction==="BubbleSort"){
        return bubbleSort;
    }
    if(algoFunction==="InsertionSort")
    return insertionSort;
}