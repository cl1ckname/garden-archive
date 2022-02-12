import { Buffer } from 'buffer'
import {BitStream, BitView} from 'bit-buffer-ts'
const dec2bin = (dec: number) =>{
    return (dec >>> 0).toString(2);
}

const revert2 = (n: number) => {
    const width = Math.floor(Math.log2(n)) + 1
    var y = 0
    for(var i=0; i<width; ++i)
    {
        y = y << 1;
        y += n%2;
        n = n >> 1;
    }
    return (2**width - 1) ^ y
}

export const generateN = (steps: number) => {
    var buffer = new Uint8Array(Math.pow(2, steps) / 8)

    var bb = new BitView(buffer)
    bb.setBits(0, 1, 1)
    var l = 1
    for (let i  = 1; i <= steps; i++) {
        bb.setBit(l,1)
        for (let j = 0; j < l; j++) {
            bb.setBit(l*2 - j, (bb.getBit(j)) ? 0 : 1) // i * 2 - j + 1
        }
        l = l * 2 + 1
    }
    return bb
}