import { Card, List, ListItemText, ListItem, Slider } from "@material-ui/core"
import { ChangeEvent } from "react"
import { cardStyle } from "../../styles/buildParams.style"



export interface Props {
    depth: number
    rootSize: number
    onDepthChange: (event: ChangeEvent<{}>, value: number | number[]) => void
    onRootSizeChange: (event: ChangeEvent<{}>, value: number | number[]) => void
} 
export const MyForm: React.FC<Props> = (props: Props) => {
    return <div>
            <Card style={cardStyle}>
                <List>
                </List>
                    <ListItem>
                        <ListItemText> Iteration number </ListItemText>
                        <Slider step={1} min={1} max={10} value={props.depth} onChange={(event, value) => props.onDepthChange(event, value)}/>
                    </ListItem>
                    <ListItem>
                        <ListItemText> Root size </ListItemText>
                        <Slider step={1} min={1} max={700} value={props.rootSize} onChange={(event, value) => props.onRootSizeChange(event, value)}/>
                    </ListItem>
            </Card>
        </div>
}