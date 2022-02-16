import { useState } from "react"
import { AttractCanvas, AttractDrawProps } from "../canvas/attractCanvas.component"
import { Settings } from "../settings.component"
import Store from "store"

const wh = window.innerHeight
const ww = window.innerWidth
// const defautAttractSettings: AttractDrawProps = {
//     points: [{x: 500, y: 500}, 
//              {x: 750, y: 500}, 
//              {x: 1000, y: 500}, 
//              {x: 500, y: 750}, 
//              {x: 1000, y: 750}, 
//              {x: 500, y: 1000}, 
//              {x: 750, y: 1000}, 
//              {x: 1000, y: 1000}]
// }

const defautAttractSettings: AttractDrawProps = {
        points: [{x: 0, y: 0}, 
                 {x: ww / 2, y: 0}, 
                 {x: ww, y: 0}, 
                 {x: 0, y: wh / 2}, 
                 {x: ww, y: wh / 2}, 
                 {x: 0, y: wh}, 
                 {x: ww / 2, y: wh}, 
                 {x: ww, y: wh}]
    }

export const AttractPage: React.FC = () => {
    const attractSettings: AttractDrawProps = Store.get('attractSettings', defautAttractSettings)
    const [attractProps, setAttractProps] = useState<AttractDrawProps>(attractSettings)
    return <>
        <Settings><></></Settings>
        <AttractCanvas attractDrawProps={attractProps} 
                       setAttractProps={setAttractProps}/>
            </>
}