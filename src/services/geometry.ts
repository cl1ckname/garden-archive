import { Graphics } from "pixi.js"
import { ColorFunction } from "./colorFunctionCollection"

export class Point {
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

export class Square implements Figure {
    points: Point[]
    number: number
    size: number
    depth: number
    constructor(p1: Point, p2: Point, p3: Point, p4: Point, depth: number, number: number = 1) {
        this.points = [p1, p2, p3, p4]
        this.number = number
        this.depth = depth
        this.size = p1.sub(p2).len()
    }

    public static build(options: FigureBuildOptions) {
        const {x, y, size: size, depth, number} = options
        const p1 = new Point(x - size / 2, y - size / 2)
        const p2 = new Point(x + size / 2, y - size / 2)
        const p3 = new Point(x + size / 2, y + size / 2)
        const p4 = new Point(x - size / 2, y + size / 2)
        const square = new Square(p1, p2, p3, p4, depth, number)
        // square.rotate(x, y, angle)
        return square
    }

    draw(ins: Graphics, getColor: ColorFunction) {
        ins.beginFill(getColor(this))
        ins.moveTo(this.points[0].x, this.points[0].y)
        for (const p of this.points) {
            ins.lineTo(p.x, p.y)
        }
        ins.lineTo(this.points[0].x, this.points[0].y)
        ins.endFill()
    }

    getNextTriangle(angle: number): Triangle {
        const p1 = this.points[0]
        const p2 = this.points[1]
        const o = p1.add(p2.sub(p1).mul(0.5))
        const rotateAngle = 2 * angle
        const p3 = o.rotate(p1, rotateAngle)
        return new Triangle(p1, p3, p2, this.depth, this.number)
    }
}

export class Triangle implements Figure {
    number: number
    points: Point[]
    size: number
    depth: number
    constructor(p1: Point, p2: Point, p3: Point, depth: number, number: number) {
        this.points = [p1, p2, p3]
        this.number = number
        this.size = p1.sub(p2).len()
        this.depth = depth
    }

    public static build(options: FigureBuildOptions) {
        const {x, y, size, depth, number} = options
        const p1 = new Point(x - size / 2, y + size / 3)
        const p2 = new Point(x + size / 2, y + size / 3)
        const p3 = new Point(x, y - size * 2 / 3)
        const triangle = new Triangle(p1, p2, p3, depth, number)
        return triangle
        // triangle.rotate(x, y, angle)
    }

    draw(ins: Graphics, getColor: ColorFunction) {
        ins.beginFill(getColor(this))
        ins.moveTo(this.points[0].x, this.points[0].y)
        for (let i = this.points.length; i--;) {
            ins.lineTo(this.points[i].x, this.points[i].y)
        }
        ins.endFill()
    }

    getLeftSquare(): Square {
        const p1 = this.points[0]
        const p2 = this.points[1]
        const p3 = this.points[2]
        const size = p1.sub(p2).len()
        const leftDerectVec = p2.sub(p3).norm().mul(size)
        const sp4 = p2.add(leftDerectVec)
        const sp3 = p1.add(leftDerectVec)
        return new Square(sp3, sp4, p2, p1, this.depth, this.number * 2);
    }

    getRightSquare(): Square {
        const p1 = this.points[2]
        const p2 = this.points[1]
        const p3 = this.points[0]
        const size = p1.sub(p2).len()
        const leftDerectVec = p2.sub(p3).norm().mul(size)
        const sp4 = p2.add(leftDerectVec)
        const sp3 = p1.add(leftDerectVec)
        return new Square(sp4, sp3, p1, p2, this.depth, this.number * 2 + 1);
    }
}