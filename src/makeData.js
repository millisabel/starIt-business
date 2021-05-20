import namor from 'namor';
import Image from "./components/Image/Image";

const range = len => {
    const arr = [];
    for (let i = 0; i < len; i++) {
        arr.push(i)
    }
    return arr;
};


const getRandomDate = (start, end) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toJSON();
};

const newObject = (count) => {
    return {
        id: count,
        address: namor.generate({words: 1, separator: ' ', numbers: 0}),
        starts: Math.floor((Math.random() * 5) + 1),
        note: namor.generate({words: 4, separator: ' '}),
        photo: <Image alt='img' src='./logo192.png'/>,
        date: getRandomDate(new Date(2015, 1, 1), new Date()),
        time: new Date(Math.random() * (new Date())).toLocaleTimeString(),
        reaction: null,
    };
};

export default function makeData (...lens) {
    const makeDataLevel = (depth = 0) => {
        const len = lens[depth];
        return range(len).map((d, i) => {
            return {
                ...newObject(i+1),
                subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
            }
        })
    };

    return makeDataLevel()
}