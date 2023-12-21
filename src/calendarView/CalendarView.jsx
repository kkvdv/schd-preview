import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import { PickersDay } from "@mui/x-date-pickers";
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import Appointment from "./AppointmentCalendarView";


const HighlightDays = (props) => {
    const { hilite = new Map, day, outsideCurrentMonth, ...other } = props;

    //const highlighted = !props.outsideCurrentMonth && highlightedDays.includes(day.format("YYYY-MM-DD"));

    const highlighted = !props.outsideCurrentMonth && (hilite.has(dayjs(day).format("YYYY-MM-DD")))


    if (highlighted) {
        return (
                <Badge variant="dot" color="primary" overlap="circular">
                <PickersDay  {...other}
                                outsideCurrentMonth={outsideCurrentMonth}
                                day={day} />
                </Badge>            )
        
    } else {
        return (
            <PickersDay  {...other}
                        outsideCurrentMonth={outsideCurrentMonth}
                        day={day}></PickersDay>
        )
    }
};

export default function CalendarView(props) {
    useEffect(()=>hasAppt())
    
    const [appt, setAppt] = useState(hasApptInit())

    const hilite = props.apptMap

    function hasApptInit() {
        
        return (props.apptMap.get(dayjs(props.today).format("YYYY-MM-DD")))
    }

    function hasAppt() {

        setAppt(props.apptMap.get(dayjs(props.today).format("YYYY-MM-DD")))
    }

    return (
        <Box sx={{display: "flex", flexDirection: "column"}}>
            <DateCalendar   value={props.today}
                            onChange={newValue => props.setToday(newValue)}
                            slots={{day: HighlightDays}}
                            slotProps={{day: {hilite}}}
                            minDate={dayjs()}
                            >
            </DateCalendar>
            {appt === undefined ? null : <Appointment start={appt.start} end={appt.end} deleteAppt={props.deleteAppt} editAppt={props.editAppt}></Appointment>}
        </Box>
    )

}