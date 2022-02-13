import { BitView } from 'bit-buffer-ts'

export const generateN = (steps: number) => {
    var buffer = new Uint8Array(Math.max(Math.pow(2, steps) / 8, 1))

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