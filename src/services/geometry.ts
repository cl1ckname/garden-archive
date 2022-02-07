import { Graphics } from "pixi.js"
import { ColorFunction } from "./colorFunctionCollection"

class Point {
    x: number
    y: number
    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }
    add(point: Point): Point {
        return new Point(point.x + this.x, point.y + this.y)
    }
    sub(point: Point): Point {
        return new Point(this.x - point.x, this.y - point.y)
    }
    mul(n: number): Point {
        return new Point(this.x * n, this.y * n)
    }

    len(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }
    norm(): Point {
        const l = this.len()
        return new Point(this.x / l, this.y / l)
    }


    rotate(point: Point, angle: number): Point {
        const dx = point.x - this.x
        const dy = point.y - this.y
        const c = Math.cos(angle)
        const s = Math.sin(angle)
        const newX = c * dx - s * dy + this.x
        const newY = s * dx + c * dy + this.y
        return new Point(newX, newY)
    }
}

export interface FigureBuildOptions {
    x: number, 
    y: number, 
    size: number, 
    depth: number, 
    angle: number,
    number: number
}

export interface Figure {
    points: Point[]
    number: number
    size: number
    depth: number
    // rotate(x: number, y: number, angle: number): void {
    //     const c = Math.cos(angle)
    //     const s = Math.sin(angle)
    //     for (const p of this.points) {
    //         const dx = p.x - x
    //         const dy = p.y - y
    //         p.x = c*dx - s*dy + x
    //         p.y = s*dx + c*dy + y
    //     }
    // }
}

export const rotate = (o: {x: number,y: number}, p: {x: number, y:number}, angle: number) => {
    const dx = p.x - o.x
    const dy = p.y - o.y
    const c = Math.cos(angle)
    const s = Math.sin(angle)
    return {x: c * dx - s * dy + o.x, y: s * dx + c * dy + o.y}
}

export type figure = {
    points: {x: number, y: number}[]
    number: number
}
// type squareType = ((f: figure) => figure)
// type triangleType = ((f: figure) => [figure, figure])
// type figureMaker = ((angle: number) => [triangleType, squareType])
type figureDrawer = ((fig: figure) => void)
type colorFunction = ((type: 'triangle' | 'square', number: number) => number)
// type figureMaker = ((angle: number, ins: Graphics, getColor: colorFunction, depth: number))

export const makeFigures = (angle:number, ins: Graphics, getColor: colorFunction) => {
    const triangle = (f: figure, depth: number) => {
        if (!depth) return
        const p = f.points
        let size = Math.pow(p[0].x - p[1].x, 2) + Math.pow(p[0].y - p[1].y, 2)
        const ldv = Math.sqrt( size / (Math.pow(p[1].x - p[2].x, 2) + Math.pow(p[1].y - p[2].y, 2 )))
        let sp3 = {x: p[0].x + (p[1].x - p[2].x)*ldv, y: p[0].y + (p[1].y - p[2].y)*ldv}
        let sp4 = {x: p[1].x + (p[1].x - p[2].x)*ldv, y: p[1].y + (p[1].y - p[2].y)*ldv}
        ins.beginFill(getColor('square', f.number))
        ins.moveTo(sp3.x, sp3.y)
        ins.lineTo(sp4.x, sp4.y)
        ins.lineTo(p[1].x, p[1].y)
        ins.lineTo(p[0].x, p[0].y)
        // ins.drawPolygon(sp3.x, sp3.y, sp4.x, sp4.y, p[1].x, p[1].y, p[0].x, p[0].y)
        ins.endFill()
        let fl: figure = {points:[sp3, sp4, p[1], p[0]], number:  f.number * 2};
        if (depth - 1 > 0)
            square(fl, depth - 1)

        size = Math.pow(p[1].x - p[2].x, 2) + Math.pow(p[1].y - p[2].y, 2)
        const rdv = Math.sqrt( size /  (Math.pow(p[1].x - p[0].x, 2) + Math.pow(p[1].y - p[0].y, 2 )))
        sp4 = {x: p[1].x + (p[1].x - p[0].x)*rdv, y: p[1].y + (p[1].y - p[0].y)*rdv}
        sp3 = {x: p[2].x + (p[1].x - p[0].x)*rdv, y: p[2].y + (p[1].y - p[0].y)*rdv}
        ins.beginFill(getColor('square', f.number))
        ins.moveTo(sp4.x, sp4.y)
        ins.lineTo(sp3.x, sp3.y)
        ins.lineTo(p[2].x, p[2].y)
        ins.lineTo(p[1].x, p[1].y)
        ins.endFill()
        const fr = {points: [sp4, sp3, p[2], p[1]], number: f.number * 2 + 1};
        // return [fl, fr]
        if (depth - 1 > 0)
            square(fr, depth - 1)

    }
    const square = (f: figure, depth: number): void => {
        if (!depth) return
        const p = f.points
        // const o = p[0].add(p[1].sub(p[0]).mul(0.5))
        const o = {x: (p[0].x + p[1].x)/2, y: (p[0].y + p[1].y)/2}
        const rotateAngle = 2 * angle
        const tp3 = rotate(o, p[0], rotateAngle)
        ins.beginFill(getColor('triangle', f.number))
        ins.moveTo(p[0].x, p[0].y)
        ins.lineTo(tp3.x, tp3.y)
        ins.lineTo(p[1].x, p[1].y)
        ins.endFill()
        triangle({points: [p[0], tp3, p[1]], number: f.number}, depth)
        // return {points: [p[0], tp3, p[1]], 
        //         number: f.number}
    }
    return [triangle, square]
}

export const squareThroughtCoordinates = (x: number, y: number, size: number, number: number): figure => {
    const p1 = {x: x - size / 2, y: y - size / 2}
    const p2 = {x: x + size / 2, y: y - size / 2}
    const p3 = {x: x + size / 2, y: y + size / 2}
    const p4 = {x: x - size / 2, y: y + size / 2}
    return {points: [p1, p2, p3, p4], number: number}
}

// export const makeDrawer = (ins: Graphics, getColor: ColorFunction) => {
//     return (fig: figure) => {
//         ins.beginFill(getColor(fig))
//         ins.moveTo(fig.points[0].x, fig.points[0].y)
//         for (const p of fig.points) {
//             ins.lineTo(p.x, p.y)
//         }
//         ins.endFill()
//     }
// }





// export class Square implements Figure {
//     points: Point[]
//     number: number
//     size: number
//     depth: number
//     constructor(p1: Point, p2: Point, p3: Point, p4: Point, depth: number, number: number = 1) {
//         this.points = [p1, p2, p3, p4]
//         this.number = number
//         this.depth = depth
//         this.size = p1.sub(p2).len()
//     }

//     public static build(options: FigureBuildOptions) {
//         const {x, y, size: size, depth, number} = options
//         const p1 = new Point(x - size / 2, y - size / 2)
//         const p2 = new Point(x + size / 2, y - size / 2)
//         const p3 = new Point(x + size / 2, y + size / 2)
//         const p4 = new Point(x - size / 2, y + size / 2)
//         const square = new Square(p1, p2, p3, p4, depth, number)
//         // square.rotate(x, y, angle)
//         return square
//     }

//     draw(ins: Graphics, getColor: ColorFunction) {
//         ins.beginFill(getColor(this))
//         ins.moveTo(this.points[0].x, this.points[0].y)
//         for (const p of this.points) {
//             ins.lineTo(p.x, p.y)
//         }
//         ins.lineTo(this.points[0].x, this.points[0].y)
//         ins.endFill()
//     }

//     getNextTriangle(angle: number): Triangle {
//         const p1 = this.points[0]
//         const p2 = this.points[1]
//         const o = p1.add(p2.sub(p1).mul(0.5))
//         const rotateAngle = 2 * angle
//         const p3 = o.rotate(p1, rotateAngle)
//         return new Triangle(p1, p3, p2, this.depth, this.number)
//     }
// }

// export class Triangle implements Figure {
//     number: number
//     points: Point[]
//     size: number
//     depth: number
//     constructor(p1: Point, p2: Point, p3: Point, depth: number, number: number) {
//         this.points = [p1, p2, p3]
//         this.number = number
//         this.size = p1.sub(p2).len()
//         this.depth = depth
//     }

//     public static build(options: FigureBuildOptions) {
//         const {x, y, size, depth, number} = options
//         const p1 = new Point(x - size / 2, y + size / 3)
//         const p2 = new Point(x + size / 2, y + size / 3)
//         const p3 = new Point(x, y - size * 2 / 3)
//         const triangle = new Triangle(p1, p2, p3, depth, number)
//         return triangle
//         // triangle.rotate(x, y, angle)
//     }

//     draw(ins: Graphics, getColor: ColorFunction) {
//         ins.beginFill(getColor(this))
//         ins.moveTo(this.points[0].x, this.points[0].y)
//         for (let i = this.points.length; i--;) {
//             ins.lineTo(this.points[i].x, this.points[i].y)
//         }
//         ins.endFill()
//     }

//     getLeftSquare(): Square {
//         const p1 = this.points[0]
//         const p2 = this.points[1]
//         const p3 = this.points[2]
//         const size = p1.sub(p2).len()
//         const leftDerectVec = p2.sub(p3).norm().mul(size)
//         const sp4 = p2.add(leftDerectVec)
//         const sp3 = p1.add(leftDerectVec)
//         return new Square(sp3, sp4, p2, p1, this.depth, this.number * 2);
//     }

//     getRightSquare(): Square {
//         const p1 = this.points[2]
//         const p2 = this.points[1]
//         const p3 = this.points[0]
//         const size = p1.sub(p2).len()
//         const rightDerectVec = p2.sub(p3).norm().mul(size)
//         const sp4 = p2.add(rightDerectVec)
//         const sp3 = p1.add(rightDerectVec)
//         return new Square(sp4, sp3, p1, p2, this.depth, this.number * 2 + 1);
//     }
// }