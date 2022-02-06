import { Accordion, AccordionDetails, AccordionSummary, Divider, List, ListItem, ListItemIcon, ListItemText, RadioGroup, Typography, Radio, FormControlLabel, FormControl } from "@material-ui/core"
import React, { ChangeEvent } from "react";
import { ColorCollectionElement } from "../../services/colorFunctionCollection";
import { ExpandMore, Done } from "@material-ui/icons";
import { CanvasProps } from "../canvas.component";

export interface ListPickerProps {
    colorList: ColorCollectionElement[]
    classes: { listItemClicked: string, listItemNotClicked: string }
    onChangeHandle: ((event: ChangeEvent<HTMLInputElement>, value: string) => void)
    colorFunction: number
}

export const ListPicker: React.FC<ListPickerProps> = (props: ListPickerProps) => {

    // let handleClick = (item: ColorCollectionElement) => {
    //     const e = new Event('change', { bubbles: true })
    //     props.colorFunction = item.id
    //     const propsCopy = Object.assign({}, props.canvasProps)
    //     propsCopy.colorFunction = item.id
    //     props.setCanvasProps(propsCopy)
    // }


    // handleClick = handleClick.bind(this);

    const { classes } = props;


    return <FormControl style={{ width: '100%' }}>
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header">
                <Typography>Color</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <List>
                    <RadioGroup
                        value={props.colorFunction}
                        name="controlled-radio-buttons-group"
                        onChange={props.onChangeHandle}
                    >
                        {props.colorList.map((item) => (
                            <>
                                <FormControlLabel 
                                    value={item.id} 
                                    control={<Radio />} 
                                    label={item.name} 
                                    key={item.name} 
                                    />
                                <ListItem
                                    key={item.name}
                                    className={
                                        props.colorFunction === item.id
                                            ? classes.listItemClicked
                                            : classes.listItemNotClicked
                                    }
                                >
                                    <ListItemIcon>
                                        {props.colorFunction === item.id
                                            && (
                                                <Done
                                                    style={{ color: "rgb(239, 239, 239)", fontSize: "2.2rem" }}
                                                />
                                            )
                                        }
                                    </ListItemIcon>
                                    <ListItemText primary={item.name} />
                                </ListItem>
                                <Divider />
                            </>
                        ))}
                    </RadioGroup>
                </List>
            </AccordionDetails>
        </Accordion>
    </FormControl>
}