export const charX = '✕';
export const charO = '〇';

export const getHorizontalCombinations = (size: number) => {
    const arr = [];
    let firstItem = '';

    for (let i = 1; i <= size; i++) {
        firstItem += i === 1 ? i : ` ${i}`;
    };

    arr.push(firstItem);

    for (let i = 1; i < size; i++) {
        const comb = firstItem.split(' ').map((item) => +item + size * i).join(' ');

        arr.push(comb)
    }

    return arr;
}

export const getVerticalCombinations = (size: number) => {
    const arr = [];
    let firstItem = '';

    for (let i = 1; i <= size * size; i += size) {
        firstItem += i === 1 ? i : ` ${i}`;
    };

    arr.push(firstItem);

    for (let i = 1; i < size; i++) {
        const comb = firstItem.split(' ').map((item) => +item + i).join(' ');

        arr.push(comb);
    }

    return arr;
}

export const getDiagonalCombinations = (size: number) => {
    const arr = [];
    let comb1 = '';
    let comb2 = '';

    for (let i = 1; i <= size * size; i += size + 1) {
        comb1 += i === 1 ? i : ` ${i}`;
    };

    arr.push(comb1);

    for (let i = size; i < size * size; i += size - 1) {
        comb2 += i === size ? i : ` ${i}`;
    };

    arr.push(comb2);

    return arr;
}

export const getInitialValues = (size: number) => {
    const result: { [key: string]: string | null } = {}

    for (let i = 1; i <= size * size; i++) {
        result[i] = null;
    }

    return result;
}