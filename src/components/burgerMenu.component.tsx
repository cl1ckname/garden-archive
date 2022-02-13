import { AppBar, Box, Drawer, Icon, IconButton, Toolbar } from "@material-ui/core"
import { Menu } from "@material-ui/icons"
import { makeStyles } from "@material-ui/styles";
import { useState } from "react";

const useStyles = makeStyles({
    list: {
      width: 250
    },
    fullList: {
      width: "auto"
    },
    paper: {
      borderRadius: 0,
      boxShadow: 'none'
    },
    root: {
        "& .MuiPaper-root": {
          borderRadius: 0,
          background: 'rgba(33, 33, 33, 0.9)',
          
        }
      }
});


export interface BurgerMenuProps {
    children: React.ReactNode
}

export const BurgerMenu: React.FC<BurgerMenuProps> = (props: BurgerMenuProps) => {
    const classes = useStyles()
    const [open, setState] = useState(false);

    const toggleDrawer = (open: boolean) => (event: any) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
        setState(open);
      };

    return <div style={{position: 'absolute', top: '1em', right: '2em'}}>
        <IconButton 
            edge="start"
            color='secondary'
            aria-label="open drawer"
            onClick={toggleDrawer(true)}>
            <Menu fontSize="large"/>
        </IconButton>
            <Drawer
                classes={{paper: classes.paper, root: classes.root}}
                anchor="right"
                onClose={toggleDrawer(false)}
                open={open}  
            >
                <Box style={{background: 0}}>
                    {props.children}
                </Box>

            </Drawer>
    </div>
}