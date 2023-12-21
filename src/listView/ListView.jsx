import dayjs from "dayjs";
import { memo } from "react";
import Appointment from "./AppointmentListView";


// TODO either change element from accordion (best) or make all close when one opens
function ListView(props) {

    return (
    <div>
        {Array.from(props.apptMap, ([key, value]) => value).sort((a,b) => dayjs(a.start).isBefore(dayjs(b.start)) ? -1 : 1).map((appt) => <Appointment key={appt.start} start={appt.start} end={appt.end} deleteAppt={props.deleteAppt} editAppt={props.editAppt}></Appointment>)}
    </div>
    )
}

export default memo(ListView)