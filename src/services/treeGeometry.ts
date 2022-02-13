import { Graphics } from "pixi.js"
import { TreeRenderParams } from "../components/treeCanvas.component"
import { ColorFunction } from "./colorFunctionCollection"

const rotate = (o: {x: number,y: number}, p: {x: number, y:number}, angle: number) => {
    const dx = p.x - o.x
    const dy = p.y - o.y
    const c = Math.cos(angle)
    const s = Math.sin(angle)
    return {x: c * dx - s * dy + o.x, y: s * dx + c * dy + o.y}
}

export type figure = {
    points: {x: number, y: number}[]
    number: number
    depth: number
}

export const makeFigures = (angle:number, ins: Graphics, getColor: ColorFunction, branchLong: number, renderParams: TreeRenderParams) => {
    const triangle = (f: figure, depth: number) => {
        if (!depth) return
        const p = f.points
        let size = Math.pow(p[0].x - p[1].x, 2) + Math.pow(p[0].y - p[1].y, 2)
        const ldv = Math.sqrt( size / (Math.pow(p[1].x - p[2].x, 2) + Math.pow(p[1].y - p[2].y, 2 ))) * branchLong
        let sp3 = {x: p[0].x + (p[1].x - p[2].x)*ldv, y: p[0].y + (p[1].y - p[2].y)*ldv}
        let sp4 = {x: p[1].x + (p[1].x - p[2].x)*ldv, y: p[1].y + (p[1].y - p[2].y)*ldv}

        if (!!renderParams.drawSquares) {
            ins.beginFill(getColor('square', f.number, f.depth))
            ins.moveTo(sp3.x, sp3.y)
            ins.lineTo(sp4.x, sp4.y)
            ins.lineTo(p[1].x, p[1].y)
            ins.lineTo(p[0].x, p[0].y)
            ins.endFill()
        }

        let fl: figure = {points:[sp3, sp4, p[1], p[0]], number:  f.number * 2, depth: f.depth};
        if (depth - 1 > 0)
            square(fl, depth - 1)

        size = Math.pow(p[1].x - p[2].x, 2) + Math.pow(p[1].y - p[2].y, 2)
        const rdv = Math.sqrt( size /  (Math.pow(p[1].x - p[0].x, 2) + Math.pow(p[1].y - p[0].y, 2 ))) * branchLong
        sp4 = {x: p[1].x + (p[1].x - p[0].x)*rdv, y: p[1].y + (p[1].y - p[0].y)*rdv}
        sp3 = {x: p[2].x + (p[1].x - p[0].x)*rdv, y: p[2].y + (p[1].y - p[0].y)*rdv}

        if (!!renderParams.drawSquares){
            ins.beginFill(getColor('square', f.number, f.depth))
            ins.moveTo(sp4.x, sp4.y)
            ins.lineTo(sp3.x, sp3.y)
            ins.lineTo(p[2].x, p[2].y)
            ins.lineTo(p[1].x, p[1].y)
            ins.endFill()
        }

        const fr = {points: [sp4, sp3, p[2], p[1]], number: f.number * 2 + 1, depth: f.depth};
        if (depth - 1 > 0)
            square(fr, depth - 1)

    }
    const square = (f: figure, depth: number): void => {
        if (!depth) return
        const p = f.points
        const o = {x: (p[0].x + p[1].x)/2, y: (p[0].y + p[1].y)/2}
        const rotateAngle = 2 * angle
        const tp3 = rotate(o, p[0], rotateAngle)
        if (renderParams.drawTriangles){
            ins.beginFill(getColor('triangle', f.number, f.depth))
            ins.moveTo(p[0].x, p[0].y)
            ins.lineTo(tp3.x, tp3.y)
            ins.lineTo(p[1].x, p[1].y)
            ins.endFill()
        }
        triangle({points: [p[0], tp3, p[1]], number: f.number, depth: f.depth}, depth)
    }
    return [triangle, square]
}

export const squareThroughtCoordinates = (x: number, 
                                          y: number, 
                                          size: number, 
                                          number: number, 
                                          ins: Graphics, 
                                          getColor: ColorFunction, 
                                          depth: number,
                                          branchLong: number): figure => {
    const p1 = {x: x - size / 2, y: y - size / 2 * branchLong}
    const p2 = {x: x + size / 2, y: y - size / 2 * branchLong}
    const p3 = {x: x + size / 2, y: y + size / 2 * branchLong}
    const p4 = {x: x - size / 2, y: y + size / 2 * branchLong}
    ins.beginFill(getColor('square', number, depth))
    ins.moveTo(p1.x, p1.y)
    ins.lineTo(p2.x, p2.y)
    ins.lineTo(p3.x, p3.y)
    ins.lineTo(p4.x, p4.y)
    ins.endFill()
    return {points: [p1, p2, p3, p4], number: number, depth: depth}
}

