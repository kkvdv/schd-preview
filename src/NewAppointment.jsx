
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { MobileDateTimePicker } from "@mui/x-date-pickers";
import { nanoid } from "nanoid";
import { useState } from "react";



export default function NewAppointment(props) {

/*TODO
    - what is the earliest time?
    - what is the latest?
    */

    const [start, setStart] = useState(props.today)
    const [duration, setDuration] = useState(props.duration)
    const [submitAllowed, setSubmitAllowed] = useState(false)

    function handleSelect(e) {
        setDuration(e.target.value)
        setSubmitAllowed(true)
    }

    function handleClick() {
        props.submitNewAppt(start, start.add(duration, "m"))
        setDuration(0)
        setSubmitAllowed(false)
        props.setToday(start)
        props.setNewApptState(false)
    }

    return (
        <Dialog open={props.open} onClose={props.onClose}>
        <Box sx={{margin: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
            <MobileDateTimePicker   label="Start date and time"
                                    ampm={false}
                                    value={start}
                                    disablePast
                                    onChange={newValue => setStart(newValue)}
                                    minutesStep={5}
                                    format="DD/MM/YYYY HH:mm"
                                    openTo={props.calendarView ? "hours" : "day"}></MobileDateTimePicker>
            <FormControl fullWidth>
            <InputLabel id="new-appt-list-view-label">Lesson duration</InputLabel>
            <Select label="Lesson duration"
                    labelId="new-appt-list-view-label"
                    onChange={handleSelect}
                    value={duration}>
                    <MenuItem key={nanoid()} value={0} disabled>{``}</MenuItem>
                    {props.cards.map((card) =>(<MenuItem key={nanoid()} value={card.minutes} disabled={card.amount<=0}>{`${card.minutes} minutes`}</MenuItem>))}
                    </Select>
            </FormControl>
            <Button id="submitButton" onClick={handleClick} disabled={!submitAllowed}>
                Submit
            </Button>
        </Box>
        </Dialog>
        
    )
}