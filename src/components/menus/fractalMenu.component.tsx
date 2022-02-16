import { Card, List, ListItem, ListItemText, Divider, Typography } from "@material-ui/core"
import CSS from 'csstype'
import { Link } from "react-router-dom"

const cardStyle: CSS.Properties = {
    boxShadow: 'none',
    background: 0
}

const undecoratedText: CSS.Properties = {
    textDecoration: "none"
}

const cardText: CSS.Properties = {
    fontFamily: "Assistant"
}

const listContainer: CSS.Properties = {
    display: 'flex',
    flexDirection: 'column',
    width: '18em',
    padding: 0,
    background: 0,
}

const listCard: CSS.Properties = {
    color: 'white',
    flexBasis: 'auto',
    height: '15em',
    backgroundColor: 'rgba(66, 66, 66, 0.5)',
    marginBottom: '1em',
    textAlign: 'center',
    borderRadius: '5px',
}
const listHeadder: CSS.Properties = {
    fontFamily: "Assistant",
    fontWeight: 'bold',
    textAlign: 'center',
    flexBasis: 'auto',
    backgroundColor: '#6C0305',
    color: 'white',
    marginBottom: '0.6em'
}
const listDivider: CSS.Properties = {
    backgroundColor: '#000000'
}

export const FractalMenu: React.FC = () => {
    return <Card style={cardStyle}>
        <List style={listContainer}>
            <Link to='/' style={undecoratedText}>
                <ListItem style={listCard}>
                    <ListItemText>
                        <Typography style ={cardText} variant="h5"> PYPHAGORIOS TREE </Typography>
                    </ListItemText>
                </ListItem>
            </Link>
            <ListItem style={listHeadder}>
                <ListItemText style={{ fontWeight: 'bold', fontSize: '1.2em !importent' }}>
                    <Typography variant="h6">Fractals</Typography>
                </ListItemText>
            </ListItem>
            <Link to='/dragon' style={undecoratedText}>
                <ListItem style={listCard}>
                    <ListItemText>
                        <Typography style ={cardText} variant="h5"> DRAGON CURVE </Typography>
                    </ListItemText>
                </ListItem>
            </Link>
            <Link to='/attract' style={undecoratedText}>
                <ListItem style={listCard}>
                    <ListItemText>
                        <Typography style ={cardText} variant="h5"> ATTRACT </Typography>
                    </ListItemText>
                </ListItem>
            </Link>
        </List>
    </Card>
}