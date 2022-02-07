import { hex2rgb, rgb2hex } from "@pixi/utils";

export type ColorFunction = (type: 'square' | 'triangle', number: number, depth: number) => number

export interface ColorCollectionElement {
    id: number
    func: ColorFunction
    name: string
}

export const green = (type: 'square' | 'triangle', number: number, depth: number) => {
	return 0x009900;
}

export const standart = (type: 'square' | 'triangle', number: number, depth: number) => {
    if (type === 'square')
        return 0x99ffdd
    return 0x5599ff
}

export const violetGrow = (type: 'square' | 'triangle', number: number, depth: number) => {
    if (type === 'square') {
        return 0x552266 + 0x020000 * number + 0x000011 * number
    }
    return 0x331133 + 0x001000 * number + 0x000010 * number
}

export const whiteBlack = (type: 'square' | 'triangle', number: number, depth: number) => {
    if (type ==='triangle') {
        return 0x000000
    }
    return 0xffffff
}

export const Gradient = (type: 'square' | 'triangle', number: number, depth: number) => {
    const step = 1 / depth
    var value = step * Math.floor(Math.log2(number))
    if (type === 'triangle')
        value += step / 2
    return rgb2hex([value, value, value])
}

export const Flare = (type: 'square' | 'triangle', number: number, depth: number) => {
    const stage = Math.floor(Math.log2(number)) / depth
    return rgb2hex([(0xf1 * (1 - stage) + 0xf5 * stage) / 255, (0x27* (1 - stage) + 0xaf * stage) / 255 , (0x11 * (1 - stage ) + 0x19 * stage) / 255 ])
}

export const ColorCollection: ColorCollectionElement[] =  [
    {id: 0, func: violetGrow, name: 'VioletGrow'},
    {id: 1, func: standart, name: 'Standart'},
    {id: 2, func: green, name: 'Green'},
    {id: 3, func: whiteBlack, name: 'Black-White'},
    {id: 4, func: Gradient, name: 'Gradient'},
    {id: 5, func: Flare, name: 'Flare'},
    
]