import { Accordion, 
    AccordionDetails, 
    AccordionSummary, 
    Divider, 
    List, 
    ListItem, 
    RadioGroup, 
    Typography, 
    FormControlLabel, 
    FormControl } from "@material-ui/core"
import React, { ChangeEvent } from "react";
import { ColorCollectionElement } from "../../services/colorFunctionCollection";
import { ExpandMore, } from "@material-ui/icons";
import { ColorPickerRadio } from "./inputs/ColorSchemeRadio";

export interface ListPickerProps {
    colorList: ColorCollectionElement[]
    classes: { listItemClicked: string, listItemNotClicked: string }
    onChangeHandle: ((event: ChangeEvent<HTMLInputElement>, value: string) => void)
    colorFunction: number
}


export const ListPicker: React.FC<ListPickerProps> = (props: ListPickerProps) => {
    const { classes } = props;
    const listItems = props.colorList.map((item) => {
            return <><ListItem key={item.name} className={
                                props.colorFunction === item.id
                                ? classes.listItemClicked
                                : classes.listItemNotClicked
                        }
                        style={{ width: '100%' }}   
                    >
                    <FormControlLabel 
                        value={item.id} 
                        control={<ColorPickerRadio />} 
                        label={item.name} 
                        key={item.name} 
                        style={{ width: '100%' }}/>
                </ListItem>
            <Divider /></>
    })

    return <FormControl style={{ width: '100%' }}>
        <Accordion style={{backgroundColor: 'rgba(255, 255, 255, 0.3)'}}>
            <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                <Typography>Color:    {props.colorList[props.colorFunction].name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <List style={{ width: '100%', position: 'relative', overflow: 'auto', maxHeight: '20em' }}>
                        <RadioGroup
                            value={props.colorFunction}
                            name="controlled-radio-buttons-group"
                            onChange={props.onChangeHandle}
                        >
                            {listItems}
                        </RadioGroup>
                </List>
            </AccordionDetails>
        </Accordion>
    </FormControl>
}