import { Card, List, ListItemText, ListItem, Slider } from "@material-ui/core"
import { ChangeEvent, useState } from "react"
import { cardStyle } from "../styles/buildParams.style"



export interface Props {
    value: number
    onChange: (event: ChangeEvent<{}>, value: number | number[]) => void
} 
export const MyForm: React.FC<Props> = (props: Props) => {
    return <div>
            <Card style={cardStyle}>
                <List>
                </List>
                    <ListItem>
                        <ListItemText> Iteration number </ListItemText>
                        <Slider step={1} min={1} max={10} value={props.value} onChange={(event, value) => props.onChange(event, value)}/>
                    </ListItem>
            </Card>
        </div>
}