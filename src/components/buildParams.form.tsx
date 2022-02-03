import { TextField, Card, List, ListItemText, ListItem } from "@material-ui/core"
import { BuildFromStyle, cardStyle } from "../styles/buildParams.style"



export interface Props {
    onSubmit: () => void
} 
export const MyForm: React.FC<Props> = () => {
    return <div>
            <Card style={cardStyle}>
                <List> 
                </List>
                    <ListItem>
                        <ListItemText> Iteration number </ListItemText>
                        <TextField type='number' style = {BuildFromStyle.input} label='number'/>
                    </ListItem>
            </Card>
        </div>
}