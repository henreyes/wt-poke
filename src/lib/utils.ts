export function getRandomNumber(gen: string, inclu: boolean) {
    let min = 0
    let max = 0
    console.log("gen inside randomNumber", gen)

        if (gen === "one"){
            min = 0
            max = 150
            return Math.floor(Math.random() * (max - min + 1)) + min;
            
          }
          if (gen === "two"){
            min = 152
            max = 251 
          }
          if (gen === "three"){
            min = 252
            max = 386 
          }
          if (gen === "four"){
            min =  387
            max = 495
          }
          else {
            min = 496
            max = 649 
          }
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
export type Difficulty = 'Gen 1' | 'Gen 2' | 'Gen 3' | 'Gen 4' | 'Gen 5';

export const  difficultyToColor: { [key in Difficulty]: string } = {
    "Gen 1": 'bg-green-500',
    "Gen 2": 'bg-purple-500',
    "Gen 3": 'bg-red-500',
    "Gen 4": 'bg-blue-500',
    "Gen 5": 'bg-orange-500',
  };

export const schemaMatch: { [key in Difficulty]: string } = {
    "Gen 1": 'one',
    "Gen 2": 'two',
    "Gen 3": 'three',
    "Gen 4": 'four',
    "Gen 5": 'five',
};

;
export const typeToColor: { [key: string]: string } = {
    grass: 'bg-green-500',
    poison: 'bg-purple-500',
    fire: 'bg-red-500',
    water: 'bg-blue-500',
    electric: 'bg-yellow-500',
    flying: "bg-sky-300"
  };
