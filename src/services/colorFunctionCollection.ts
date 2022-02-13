import { rgb2hex } from "@pixi/utils";

export type ColorFunction = (type: 'square' | 'triangle', number: number, depth: number) => number

export interface ColorCollectionElement {
    id: number
    func: ColorFunction
    name: string
}

const generateGradient = (color1: number, color2: number) => {
    const r1 = Math.floor(color1 / 16**4)
    const g1 = Math.floor(color1 / 16**2) % 16**2
    const b1 = color2 % 16**2
    const r2 = Math.floor(color2 / 16**4)
    const g2 = Math.floor(color2 / 16**2) % 16**2
    const b2 = color2 % 16**2
    const gradFunction = (type: 'square' | 'triangle', number: number, depth: number) => {
        const stage = number / depth
        return rgb2hex([(r1 * (1 - stage) + r2 * stage) / 255, (g1* (1 - stage) + g2 * stage) / 255 , (b1 * (1 - stage ) + b2 * stage) / 255 ])
    }
    return gradFunction
}

const generateTypeGradient = (squareColor1: number, squareColor2: number, triangleColor1: number, triangleColor2: number) => {
    const squareGradient = generateGradient(squareColor1, squareColor2)
    const triangleGradient = generateGradient(triangleColor1, triangleColor2)
    const gradFunction = (type: 'square' | 'triangle', number: number, depth: number) => {
        return (type === 'square') ? squareGradient('square', number, depth) : triangleGradient('triangle', number, depth)
    }
    return gradFunction
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
    var value = step * number
    if (type === 'triangle')
        value += step / 2
    return rgb2hex([value, value, value])
}

export const Flare = (type: 'square' | 'triangle', number: number, depth: number) => {
    const stage = number / depth
    return rgb2hex([(0xf1 * (1 - stage) + 0xf5 * stage) / 255, (0x27* (1 - stage) + 0xaf * stage) / 255 , (0x11 * (1 - stage ) + 0x19 * stage) / 255 ])
}

export const ColorCollection: ColorCollectionElement[] =  [
    {id: 0, func: violetGrow, name: 'VioletGrow'},
    {id: 1, func: standart, name: 'Standart'},
    {id: 2, func: green, name: 'Green'},
    {id: 3, func: whiteBlack, name: 'Black-White'},
    {id: 4, func: Gradient, name: 'Gradient'},
    {id: 5, func: Flare, name: 'Flare'},
    {id: 6, func: generateGradient(0xc31432, 0x240b36), name: 'Witching Hour'},
    {id: 7, func: generateGradient(0x74ebd5, 0xACB6E5), name: 'Digital Water'},
    {id: 8, func: generateGradient(0x155799, 0x159957), name: 'Crystal Clear'},
    {id: 9, func: generateTypeGradient(0x200122, 0x6f0000, 0x2C3E50, 0xFD746C), name: 'Love, liberty and dusk'},
    {id: 10, func: generateTypeGradient(0x283c86, 0x45a247, 0x000000, 0x0f9b0f), name: 'Terminal Meredian'},
    
]