import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Participants({
  participants,
  onAdd,
  onDelete,
  events
}){

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [eventId, setEventId] = useState('')

  const handleAdd = (e) => {

    e.preventDefault()

    if(!name || !email || !eventId){
      alert('Please fill all fields')
      return
    }

    const selectedEvent = events.find(
      (event) => String(event.id) === String(eventId)
    )

    const newParticipant = {
      id: Date.now(),
      name: name,
      email: email,
      eventName: selectedEvent.name
    }

    onAdd(newParticipant)

    setName('')
    setEmail('')
    setEventId('')
  }

  return (
    <div>

      <h2>Participants</h2>

      <div className="card">

        {events.length === 0 ? (

          <div>

            <p>Please add events first</p>

            <Link to="/events" className="btn btn-primary">
              Go To Events
            </Link>

          </div>

        ) : (

          <form className="form" onSubmit={handleAdd}>

            <input
              type="text"
              placeholder="Participant Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <select
              value={eventId}
              onChange={(e) => setEventId(e.target.value)}
            >

              <option value="">
                Select Event
              </option>

              {events.map((event) => (

                <option
                  key={event.id}
                  value={event.id}
                >
                  {event.name}
                </option>

              ))}

            </select>

            <button
              type="submit"
              className="btn btn-primary"
            >
              Add Participant
            </button>

          </form>

        )}

      </div>

      {participants.length === 0 ? (

        <p>No Participants Added</p>

      ) : (

        <table className="table">

          <thead>

            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Event</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {participants.map((participant) => (

              <tr key={participant.id}>

                <td>{participant.name}</td>

                <td>{participant.email}</td>

                <td>{participant.eventName}</td>

                <td>

                  <button
                    className="btn btn-delete"
                    onClick={() => {

                      const confirmDelete =
                        window.confirm(
                          'Delete participant?'
                        )

                      if(confirmDelete){
                        onDelete(participant.id)
                      }

                    }}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      )}

    </div>
  )
}