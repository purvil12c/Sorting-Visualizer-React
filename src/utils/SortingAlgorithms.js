export function mergeSort(items){
    let results = [];
    let resultItems = JSON.parse(JSON.stringify(items));

    function mergeSort (unsortedArray) {
        if (unsortedArray.length <= 1) {
          return unsortedArray;
        }

        const middle = Math.floor(unsortedArray.length / 2);
        const left = unsortedArray.slice(0, middle);
        const right = unsortedArray.slice(middle);

        return merge(
          mergeSort(left), mergeSort(right)
        );
    }

    function merge (left, right) {
        let resultArray = [], leftIndex = 0, rightIndex = 0;

        while (leftIndex < left.length && rightIndex < right.length) {
          if (left[leftIndex].itemValue < right[rightIndex].itemValue) {
            resultArray.push(left[leftIndex]);
            leftIndex++; 
          } else {
            resultArray.push(right[rightIndex]);
            rightIndex++; 
          }
        }
        let result = resultArray.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
        results.push(JSON.parse(JSON.stringify(result)));
        return result;
      }

    mergeSort(resultItems);

    return results;
}

export function quickSort(items){
    let results = [];
    let resultItems = JSON.parse(JSON.stringify(items));
    
    function quickSortHelper(arr, left, right){
        var len = arr.length, 
        pivot,
        partitionIndex;
     
     
       if(left < right){
         pivot = right;
         partitionIndex = partition(arr, pivot, left, right);
         
        //sort left and right
        quickSortHelper(arr, left, partitionIndex - 1);
        quickSortHelper(arr, partitionIndex + 1, right);
       }
       return arr;
     }

     function partition(arr, pivot, left, right){
        var pivotValue = arr[pivot].itemValue,
            partitionIndex = left;
     
        for(var i = left; i < right; i++){
         if(arr[i].itemValue < pivotValue){
           [arr[i], arr[partitionIndex]] = [arr[partitionIndex], arr[i]]
           partitionIndex++;
         }
         results.push(JSON.parse(JSON.stringify(arr)));
       }
       [arr[right], arr[partitionIndex]] = [arr[partitionIndex], arr[right]]
       return partitionIndex;
     }
     
     quickSortHelper(resultItems, 0, resultItems.length - 1);
     
     results.push(results[results.length-1]);
     return results;
}


export function bubbleSort(items){
    let results = [];
    let resultItems = JSON.parse(JSON.stringify(items));

    let isSorted = false;
    while(isSorted===false){
        isSorted = true;

        for(let i = 0;i<resultItems.length-1;i++){
            if(resultItems[i].itemValue>resultItems[i+1].itemValue){
                [resultItems[i], resultItems[i+1]] = [resultItems[i+1], resultItems[i]];
                isSorted = false;

                results.push(JSON.parse(JSON.stringify(resultItems)));
            }
        }
    }
    results.push(JSON.parse(JSON.stringify(resultItems)));
    return results;
}

export function insertionSort(items){
    let results = [];

    let resultItems = JSON.parse(JSON.stringify(items));
    for(let i = 1; i<resultItems.length;i++){
        let j = i;
        while(j>0 && resultItems[j].itemValue<resultItems[j-1].itemValue){
            [resultItems[j], resultItems[j-1]] = [resultItems[j-1], resultItems[j]]
            j-=1
            results.push(JSON.parse(JSON.stringify(resultItems)));
        }
    }
    results.push(JSON.parse(JSON.stringify(resultItems)));
    return results;
}

export function selectionSort(items){
    let results = [];

    let resultItems = JSON.parse(JSON.stringify(items));

    let current_index = 0
    while(current_index<resultItems.length - 1){
        let min_val = resultItems[current_index].itemValue;
        let min_idx = current_index;
        
        for(let i = current_index+1; i<resultItems.length;i++){
            if(resultItems[i].itemValue<min_val){
                min_val = resultItems[i].itemValue;
                min_idx = i;
            }
        }
        
        [resultItems[current_index], resultItems[min_idx]] = [resultItems[min_idx], resultItems[current_index]];
        current_index+=1
        results.push(JSON.parse(JSON.stringify(resultItems)));
    }
    
    results.push(JSON.parse(JSON.stringify(resultItems)));
    return results;
}

export function getAlgoFunction(algoFunction){
    if(algoFunction==="BubbleSort")
        return bubbleSort;

    if(algoFunction==="InsertionSort")
        return insertionSort;

    if(algoFunction==="SelectionSort")
        return selectionSort;

    if(algoFunction==="MergeSort")
        return mergeSort;

    if(algoFunction==="QuickSort")
        return quickSort;
}
