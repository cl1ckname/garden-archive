import { Figure } from "./geometry";

export type ColorFunction = (figure: Figure) => number

export interface ColorCollectionElement {
    id: number
    func: ColorFunction
    name: string
}

export const green = (figure: Figure) => {
	return 0x009900;
}

export const standart = (figure: Figure) => {
    if (figure.points.length == 4)
        return 0x99ffdd
    return 0x5599ff
}

export const violetGrow = (figure: Figure) => {
    if (figure.points.length == 4) {
        return 0x552266 + 0x020000 * figure.number + 0x000011 * figure.number
    }
    return 0x331133 + 0x001000 * figure.number + 0x000010 * figure.number
}

export const whiteBlack = (figure: Figure) => {
    if (figure.points.length == 4) {
        return 0x000000
    }
    return 0xffffff
}

export const ColorCollection: ColorCollectionElement[] =  [
    {id: 0, func: violetGrow, name: 'VioletGrow'},
    {id: 1, func: standart, name: 'Standart'},
    {id: 2, func: green, name: 'Green'},
    {id: 3, func: whiteBlack, name: 'Black-White'}
    
]