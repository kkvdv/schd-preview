import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddIcon from "@mui/icons-material/Add";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ListIcon from '@mui/icons-material/List';
import Alert from '@mui/material/Alert';
import AppBar from '@mui/material/AppBar';
import Fab from '@mui/material/Fab';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import Toolbar from '@mui/material/Toolbar';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useState } from 'react';
import NewAppointment from "./NewAppointment";
import UserProfile from './UserProfile';
import CalendarView from './calendarView/CalendarView';
import "./index.css";
import ListView from './listView/ListView';

const fab = {
  margin: 0,
  top: 'auto',
  right: 20,
  bottom: 20,
  left: 'auto',
  position: 'fixed',
};

function App() {
  
  const User = {
    name: "John Doe",
    teacher: "T. Fletcher",
    cards: [{minutes: 30, amount: 10},
            {minutes: 45, amount: 10},
            {minutes: 60, amount: 10}]
  }

  const [apptMap, setApptMap] = useState(new Map())

  //obj arr to map:[{start: dayjs(), end: dayjs()}].map(el => [dayjs(el.start).format("YYYY-MM-DD"), el]

  const [cards, setCards] = useState(User.cards)

  const [newApptState, setNewApptState] = useState(false)

  const [duplicate, setDuplicate] = useState(false)

  const [calendarView, setCalendarView] = useState(false)

  const [userState, setUser] = useState(false)

  const [editMode, setEditMode] = useState(false)

  const [today, setToday] = useState(dayjs().add(1, "day").hour(8).minute(0))

  const [duration, setDuration] = useState(0)

  function submitNewAppt(start, end) {
    const duration = dayjs(end).diff(dayjs(start), "minutes")
    console.log(duration)
    const repeat = apptMap.has(dayjs(start).format("YYYY-MM-DD"))

    if (!repeat) {
      const newAppt = {start, end}
      const newCards = cards.map( card => {
        if (card.minutes === duration) {
          return {...card, amount: card.amount - 1}
        }
        return card
      })

      setCards(newCards)
      setApptMap(apptMap.set(dayjs(newAppt.start).format("YYYY-MM-DD"), newAppt))

    } else {
      setDuplicate(true)
    }
    
  }

  function deleteAppt(start, end) {
    const duration = dayjs(end).diff(dayjs(start), "minutes")
    console.log(duration)

    const newCards = cards.map( card => {
      if (card.minutes === duration) {
        return {...card, amount: card.amount + 1}
      }
      return card
    })

    setCards(newCards)

    apptMap.delete(dayjs(start).format("YYYY-MM-DD"))
    setApptMap(apptMap)
  }

  function editAppt(start, end) {

    setToday(dayjs(start))
    setDuration(dayjs(end).diff(dayjs(start), "minutes"))
    deleteAppt(start, end)
    setEditMode(true)
    setNewApptState(true)
  }

  function closeNewApptWindow() {
    if (editMode) {
      submitNewAppt(today, today.add(duration, "minutes"))
      setDuration(0)
    }
    setNewApptState(false)
    setEditMode(false)
  }

  return (

    <LocalizationProvider dateAdapter={AdapterDayjs}>

    <AppBar position='sticky'>
      <Toolbar sx={{justifyContent: "space-between"}}>
        <IconButton color="inherit" onClick={() => setUser(true)}>
          <AccountCircleIcon></AccountCircleIcon>
        </IconButton>
        <UserProfile  name={User.name}
                      teacher={User.teacher}
                      cards={cards}
                      open={userState}
                      onClose={() => setUser(false)}></UserProfile>
        <IconButton color='inherit' onClick={() => setCalendarView(!calendarView)}>
          {calendarView ? <ListIcon/> : <CalendarMonthIcon />}
        </IconButton>
      </Toolbar>
    </AppBar>

    <Snackbar open={duplicate} autoHideDuration={6000} onClose={() => setDuplicate(false)}>
      <Alert severity="error">Cannot schedule multiple lessons on the same day</Alert>
    </Snackbar>

    {!calendarView ?  <ListView   apptMap={apptMap}
                                  deleteAppt={deleteAppt}
                                  editAppt={editAppt}></ListView>
                    : <CalendarView   apptMap={apptMap}
                                      deleteAppt={deleteAppt}
                                      editAppt={editAppt}
                                      today={today}
                                      setToday={setToday}></CalendarView>}

      <Fab color="primary" size="medium" style={fab} onClick={() => setNewApptState(true)}>
        <AddIcon />
      </Fab>
      {!newApptState ? null
                    : <NewAppointment
                        open={newApptState}
                        onClose={closeNewApptWindow}
                        cards={cards}
                        submitNewAppt={submitNewAppt}
                        setNewApptState={setNewApptState}
                        today={today}
                        duration={duration}
                        calendarView={calendarView}
                        setToday={setToday}
                        >
                      </NewAppointment> }
    </LocalizationProvider>
  )
}

export default App
