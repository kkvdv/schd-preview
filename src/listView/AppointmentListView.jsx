import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import dayjs from 'dayjs';
import { memo } from 'react';
import EditAppointmentButton from "../EditAppointmentButton";

function Appointment(props)  {

    return (
    
    <Box sx={{ margin: 1.5, display: 'flex', flexWrap: 'nowrap', justifyContent: 'space-between'}}>
    
    <Paper sx={{flexGrow: 100 }}>
        <Accordion TransitionProps={{ unmountOnExit: true }} >
        <AccordionSummary
            expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6"> {dayjs(props.start).format("DD.MM.YYYY")}</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ margin: 1.5, display: 'flex', flexWrap: 'nowrap', justifyContent: 'space-between'}}>
        <div>
            <Typography variant="h7" sx = {{ mr: 0.5, color: 'text.secondary'}}>
                Start:
            </Typography>
            <Typography variant="h7">
                {dayjs(props.start).format("HH:mm")}
            </Typography>
        </div>
        <div>
            <Typography variant="h7" sx = {{color: 'text.secondary'}}>
                End:
            </Typography>
            <Typography variant="h7" sx = {{mx: 1}}>
                {dayjs(props.end).format("HH:mm")}
            </Typography>
        </div>

        </AccordionDetails>
        </Accordion>
    </Paper>

    <EditAppointmentButton start={props.start} end={props.end} deleteAppt={props.deleteAppt} editAppt={props.editAppt}></EditAppointmentButton>

    </Box>
    )
}

export default memo(Appointment)
