import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import { memo } from "react";

function UserProfile(props)  {

    const cList = props.cards.map((card) => (
        <ListItem key = {card.minutes}>
            <Typography>{card.minutes}</Typography>
            <Typography sx={{marginLeft: 0.5}}>minute cards:</Typography>
            <Typography sx={{marginLeft: 1}}>{card.amount}</Typography>
        </ListItem>))

    return (
        <Drawer open={props.open} anchor='left' onClose={props.onClose} >
        <List sx={{ height: 9999}}>
            <ListItem>
                <Typography>Name:</Typography><Typography sx={{marginLeft: 0.7}}>{props.name}</Typography>
            </ListItem>
            <ListItem>
                <Typography>Teacher:</Typography><Typography sx={{marginLeft: 0.7}}>{props.teacher}</Typography>
            </ListItem>
            <Divider></Divider>
            {cList}
        </List>
        </Drawer>

    )
}

export default memo(UserProfile)