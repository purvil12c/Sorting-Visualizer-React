import {uid} from 'react-uid';

const initialColors = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF", 
"#eb4559", "#f78259", "#aeefec", "#f2ed6f", "#f3c623", "#10375c", "#116979"];

// Generate a list (length provided as arg) of unique random numbers between 0 and 100
export function generateRandomArray(length){
    let randomItems = []
    while(length-->0){
        const randomNumber = Math.floor(Math.random() * 101);
        if(randomItems.indexOf(randomNumber)===-1)
            randomItems.push({ id: uid(Math.random()), itemValue: randomNumber, color: generateRandomColor()})
    }
    return randomItems;
}

export function generateRandomColor(){
    return initialColors[Math.floor(Math.random() * initialColors.length)]
}

export const springAnim = {
    type: "spring",
    damping: 20,
    stiffness: 300
};
  