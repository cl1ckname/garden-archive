import { Card, List, ListItemText, ListItem, Slider } from "@material-ui/core"
import { ChangeEvent, useState } from "react"
import { cardStyle } from "../styles/buildParams.style"



export interface Props {
    onSubmit: () => void
} 
export const MyForm: React.FC<Props> = () => {
    const [value, setValue] = useState<number>(1)
    const changeHandler = (event: ChangeEvent<{}>, value: number) => {
        event.preventDefault()
        setValue(value)
        console.log(value)
    }
    return <div>
            <Card style={cardStyle}>
                <List>
                </List>
                    <ListItem>
                        <ListItemText> Iteration number </ListItemText>
                        {/* <Slider step={1} min={1} max={10} value={value} onChange={changeHandler}/> */}
                        <Slider step={1} min={1} max={10} value={value} onChange={(event, value) => changeHandler(event, value as number)}/>
                        {/* <TextField type='number' style = {BuildFromStyle.input} label='number'/> */}
                    </ListItem>
            </Card>
        </div>
}