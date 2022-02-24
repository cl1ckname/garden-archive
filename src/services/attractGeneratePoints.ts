

export const generatePoints = (n: number, width: number, height: number) => {
    const o = {x: width / 2, y: height / 2}
    const r = (width > height) ? height / 3 : width / 3
    const points: {x: number, y: number}[] = [{x: o.x + r, y: o.y}] 
    let dx;
    let dy;
    for (let i = 2*Math.PI / n; i < 2* Math.PI; i += 2 * Math.PI / n) {
        dx = o.x - points[0].x
        dy = o.y - points[0].y
        const c = Math.cos(i)
        const s = Math.sin(i)
        points.push({x: c * dx - s * dy + o.x, y: s * dx + c * dy + o.y})
    }
    return points
}