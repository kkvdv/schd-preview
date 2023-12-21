import MoreVert from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import { memo, useState } from 'react';

function EditAppointmentButton(props) {

    const [anchorEl, setAnchorEl] = useState(null)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const open = Boolean(anchorEl)

    function deleteAppt() {
        setAnchorEl(null)
        setConfirmDelete(true)
    }

    return (
    <div>
    <IconButton onClick={event => setAnchorEl(event.target)}>
            <MoreVert />
        </IconButton>
    <Menu open={open} anchorEl={anchorEl} onClose={()=>setAnchorEl(null)}>
        <MenuItem onClick={() => props.editAppt(props.start, props.end)}>
            Edit
        </MenuItem>
        <MenuItem onClick={deleteAppt}>
            Delete
        </MenuItem>
    </Menu>
    {!confirmDelete ? null
                    : <Dialog open={confirmDelete} onClose={()=>setConfirmDelete(false)}>
                        <Box sx={{display:"flex", flexDirection:"column", mx:2.5, my:2, alignItems:"stretch"}}>
                            <Typography align='center'>Are you sure you want to delete the following appointment:<b>{` ${dayjs(props.start).format("dddd, D MMM YYYY, HH:mm-")}${dayjs(props.end).format("HH:mm")} ?`}</b></Typography>
                            <Box sx={{display:"flex", flexDirection:"row", justifyContent:"space-around", flexGrow:"100"}}>
                                <Button onClick={() => props.deleteAppt(props.start, props.end)}>Confirm</Button>
                                <Button onClick={() => setConfirmDelete(false)}>Cancel</Button>
                            </Box>
                        </Box>
                    </Dialog>
    }
    </div>
    )
}

export default memo(EditAppointmentButton)