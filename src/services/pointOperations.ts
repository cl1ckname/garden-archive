export type Point = { x: number; y: number };

export function pointSum(a: Point, b: Point): Point {
    return { x: a.x + b.x, y: a.y + b.y };
}

export function pointSub(a: Point, b: Point): Point {
	return { x: (a.x - b.x), y: (a.y - b.y) }
}

export function pointMul(a: Point, b: number): Point {
	return { x: a.x * b, y: a.y * b }
}

export function pointDist(a: Point, b: Point): number {
	return (a.x - b.x)*(a.x - b.x) + (a.y - b.y)*(a.y - b.y) 
}

export function getScaledDelta(a: Point, b: Point, scale: number): Point {
	return pointMul(pointSub(a, b), scale * 2)
}