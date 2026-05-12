import { Routes, Route, Link } from 'react-router-dom'
import { useState } from 'react'
import Dashboard from './pages/Dashboard'
import Events from './pages/Events'
import Participants from './pages/Participants'

export default function App(){

  const [events, setEvents] = useState([])

  const [participants, setParticipants] = useState([])

  const addEvent = (event) => {
    setEvents([event, ...events])
  }

  const deleteEvent = (id) => {
    setEvents(events.filter((event) => event.id !== id))
  }

  const markCompleted = (id) => {
    setEvents(
      events.map((event) =>
        event.id === id
          ? { ...event, status: 'Completed' }
          : event
      )
    )
  }

  const addParticipant = (participant) => {
    setParticipants([participant, ...participants])
  }

  const deleteParticipant = (id) => {
    setParticipants(
      participants.filter((participant) => participant.id !== id)
    )
  }

  return (
    <div>

      <nav className="nav">

        <h2>Event Management Dashboard</h2>

        <div>
          <Link to="/">Dashboard</Link>
          <Link to="/events">Events</Link>
          <Link to="/participants">Participants</Link>
        </div>

      </nav>

      <div className="container">

        <Routes>

          <Route
            path="/"
            element={
              <Dashboard
                events={events}
                participants={participants}
              />
            }
          />

          <Route
            path="/events"
            element={
              <Events
                events={events}
                onAdd={addEvent}
                onDelete={deleteEvent}
                onComplete={markCompleted}
              />
            }
          />

          <Route
            path="/participants"
            element={
              <Participants
                participants={participants}
                onAdd={addParticipant}
                onDelete={deleteParticipant}
                events={events}
              />
            }
          />

        </Routes>

      </div>

      <footer className="footer">
        <p>Event Management Dashboard Project</p>
      </footer>

    </div>
  )
}