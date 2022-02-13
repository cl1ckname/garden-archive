import { Accordion, AccordionDetails, AccordionSummary, Card } from "@material-ui/core"
import { ExpandMore } from "@material-ui/icons"
import { cardStyle } from "../styles/buildParams.style"

export interface SettingsProps {
    children: React.ReactNode
}
export const Settings: React.FC<SettingsProps> = (props: SettingsProps) => {
    return <div>
            <Card style={cardStyle}>
            <Accordion style={{backgroundColor: 'rgba(255, 255, 255, 0)'}}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                    Settings
                </AccordionSummary>
                <AccordionDetails style={{flexDirection: 'column'}}>
                    {props.children}
                </AccordionDetails>
                </Accordion>
            </Card>
        </div>
}