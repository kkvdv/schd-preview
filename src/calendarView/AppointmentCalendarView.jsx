import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";
import { memo } from 'react';
import EditAppointmentButton from "../EditAppointmentButton";

function AppointmentCalendarView(props) {

    return (
        <Card sx={{display: "flex", flexDirection: "column", margin: 2, alignSelf:"center"}}>
        <Box sx={{display: "flex", flexDirection:"row", justifyContent:"space-between"}}>
            <Typography sx={{margin:2, marginLeft:3}} variant="h6">
                Appointment
            </Typography>
            <EditAppointmentButton start={props.start} end={props.end} deleteAppt={props.deleteAppt} editAppt={props.editAppt}></EditAppointmentButton>
        </Box>
        <Box sx={{display: "flex", flexDirection:"row", justifyContent:"space-between"}}>
            <Typography sx={{ml:4, mr:7.6, mt:1, mb:1}}>
                Start:
            </Typography>
            <Typography sx={{mr:4, ml:7.6, mt:1, mb:1}}>
                {dayjs(props.start).format("HH:mm")}
            </Typography>
        </Box>
        <Box sx={{display: "flex", flexDirection:"row", justifyContent:"space-between"}}>
            <Typography sx={{ml:4, mr:7.6, mb:2, mt:1}}>
                End:
            </Typography>
            <Typography sx={{mr:4, ml:7.6, mb:2, mt:1}}>
                {dayjs(props.end).format("HH:mm")}
            </Typography>
        </Box>
        </Card>
    )
}

export default memo(AppointmentCalendarView)