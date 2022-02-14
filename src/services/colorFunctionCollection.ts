import { rgb2hex } from "@pixi/utils";

export type ColorFunction = (type: 'primary' | 'secondary', number: number, depth: number) => number

export interface ColorCollectionElement {
    id: number
    func: ColorFunction
    name: string
}

const generateGradient = (color1: number, color2: number) => {
    const r1 = Math.floor(color1 / 16**4)
    const g1 = Math.floor(color1 / 16**2) % 16**2
    const b1 = color1 % 16**2
    const r2 = Math.floor(color2 / 16**4)
    const g2 = Math.floor(color2 / 16**2) % 16**2
    const b2 = color2 % 16**2
    const gradFunction = (type: 'primary' | 'secondary', number: number, depth: number) => {
        const stage = number / depth
        return rgb2hex([(r1 * (1 - stage) + r2 * stage) / 255, (g1* (1 - stage) + g2 * stage) / 255 , (b1 * (1 - stage ) + b2 * stage) / 255 ])
    }
    return gradFunction
}

const generateTypeGradient = (squareColor1: number, squareColor2: number, triangleColor1: number, triangleColor2: number) => {
    const squareGradient = generateGradient(squareColor1, squareColor2)
    const triangleGradient = generateGradient(triangleColor1, triangleColor2)
    const gradFunction = (type: 'primary' | 'secondary', number: number, depth: number) => {
        return (type === 'primary') ? squareGradient('primary', number, depth) : triangleGradient('secondary', number, depth)
    }
    return gradFunction
}

const GenerateTripleGradient = (color1: number, color2: number, color3: number) => {
    const f1 = generateGradient(color1, color2)
    const f2 = generateGradient(color2, color3)
    return (type: 'primary' | 'secondary', number: number, depth: number) => {
        if (number / depth < 0.5)
            return f1(type, number, depth / 2)
        return f2(type, number / 2, depth / 2)
    }
}

export const standart = (type: 'primary' | 'secondary', number: number, depth: number) => {
    if (type === 'primary')
        return 0x99ffdd
    return 0x5599ff
}

export const violetGrow = (type: 'primary' | 'secondary', number: number, depth: number) => {
    if (type === 'primary') {
        return 0x552266 + 0x020000 * number + 0x000011 * number
    }
    return 0x331133 + 0x001000 * number + 0x000010 * number
}

export const whiteBlack = (type: 'primary' | 'secondary', number: number, depth: number) => {
    if (type ==='secondary') {
        return 0x000000
    }
    return 0xffffff
}

export const Gradient = (type: 'primary' | 'secondary', number: number, depth: number) => {
    const step = 1 / depth
    var value = step * number
    if (type === 'secondary')
        value += step / 2
    return rgb2hex([value, value, value])
}

export const Flare = (type: 'primary' | 'secondary', number: number, depth: number) => {
    const stage = number / depth
    return rgb2hex([(0xf1 * (1 - stage) + 0xf5 * stage) / 255, (0x27* (1 - stage) + 0xaf * stage) / 255 , (0x11 * (1 - stage ) + 0x19 * stage) / 255 ])
}

export const CloudDischarge = (type: 'primary' | 'secondary', number: number, depth: number) => {
    const stage = number / depth
    if (type === 'primary')
        return 0xababfb*(stage) + 0xa7e083*stage 
    return 0x8953EE * (1 - stage) / Math.SQRT2 + 0xfe0753 
}

export const NoSignal = (type: 'primary' | 'secondary', number: number, depth: number) => {
    const stage = number / depth
    if (type === 'primary')
        return 0xababfb*(number) + 0xa7e083*stage 
    return 0x8953EE * number
}


export const ColorCollection: ColorCollectionElement[] =  [
    {id: 0, func: violetGrow, name: 'VioletGrow'},
    {id: 1, func: standart, name: 'Standart'},
    {id: 2, func: whiteBlack, name: 'Black-White'},
    {id: 3, func: Gradient, name: 'Gradient'},
    {id: 4, func: Flare, name: 'Flare'},
    {id: 5, func: generateGradient(0xc31432, 0x240b36), name: 'Witching Hour'},
    {id: 6, func: generateGradient(0x74ebd5, 0xACB6E5), name: 'Digital Water'},
    {id: 7, func: generateGradient(0x155799, 0x159957), name: 'Crystal Clear'},
    {id: 8, func: generateGradient(0x00c3ff, 0xffff1c), name: 'Brady Brady Fun Fun'},
    {id: 9, func: generateTypeGradient(0x200122, 0x6f0000, 0x2C3E50, 0xFD746C), name: 'Love, liberty and dusk'},
    {id: 10, func: generateTypeGradient(0x283c86, 0x45a247, 0x000000, 0x0f9b0f), name: 'Terminal Meredian'},
    {id: 11, func: CloudDischarge, name: 'Discharge in the clouds'},
    {id: 12, func: NoSignal, name: 'No signal'},
    {id: 13, func: GenerateTripleGradient(0xaa4b6b, 0x6b6b83, 0x3b8d99), name: 'Memarian'},
    {id: 14, func: GenerateTripleGradient(0x8A2387, 0xE94057, 0xf27121), name: 'Wiretap'},
]