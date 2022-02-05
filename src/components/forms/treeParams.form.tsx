import { Card, List, ListItemText, ListItem, Slider, FormControl } from "@material-ui/core"
import { ChangeEvent } from "react"
import { cardStyle } from "../../styles/buildParams.style"
import { CanvasProps } from "../canvas.component"



export interface FormProps {
    canvasProps: CanvasProps
    onChangeHandler: (event: ChangeEvent<{}>, value: number, type: keyof CanvasProps) => void
} 
export const MyForm: React.FC<FormProps> = (props: FormProps) => {
    return <div>
            <Card style={cardStyle}>
                    <List>
                        <ListItem>
                            <ListItemText> Iteration number </ListItemText>
                            <Slider 
                                step={1} 
                                min={1} 
                                max={17} 
                                value={props.canvasProps.depth} 
                                onChange={(event, value) => props.onChangeHandler(event, value as number, 'depth')}/>
                        </ListItem>
                        <ListItem>
                            <ListItemText> Root size </ListItemText>
                            <Slider step={1} 
                                    min={1} 
                                    max={600} 
                                    value={props.canvasProps.rootSize} 
                                    onChange={(event, value) => props.onChangeHandler(event, value as number, 'rootSize')}/>
                        </ListItem>
                        <ListItem>
                            <ListItemText> Angle </ListItemText>
                            <Slider step={0.001} 
                                    min={0.0001} 
                                    max={Math.PI / 2 - 0.0001} 
                                    value={props.canvasProps.angle} 
                                    onChange={(event, value) => props.onChangeHandler(event, value as number, 'angle')}/>
                        </ListItem>
                        <ListItem>
                            <ListItemText> X </ListItemText>
                            <Slider step={1} 
                                    min={0} 
                                    max={window.innerWidth} 
                                    value={props.canvasProps.x} 
                                    onChange={(event, value) => props.onChangeHandler(event, value as number, 'x')}/>
                        </ListItem>
                        <ListItem>
                            <ListItemText> Y </ListItemText>
                            <Slider step={1} 
                                    min={0} 
                                    max={window.innerHeight * 1.5} 
                                    value={props.canvasProps.y} 
                                    onChange={(event, value) => props.onChangeHandler(event, value as number, 'y')}/>
                        </ListItem>
                    </List>
            </Card>
        </div>
}