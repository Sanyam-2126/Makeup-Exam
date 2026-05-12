import { useState } from 'react'

export default function Events({ events, onAdd, onDelete, onComplete }){

  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [venue, setVenue] = useState('')
  const [organizer, setOrganizer] = useState('')

  const handleAdd = (e) => {

    e.preventDefault()

    if(!name || !date || !venue || !organizer){
      alert('Please fill all fields')
      return
    }

    const newEvent = {
      id: Date.now(),
      name: name,
      date: date,
      venue: venue,
      organizer: organizer,
      status: 'Upcoming'
    }

    onAdd(newEvent)

    setName('')
    setDate('')
    setVenue('')
    setOrganizer('')
  }

  return (
    <div>

      <h2>Events</h2>

      <div className="card">

        <form className="form" onSubmit={handleAdd}>

          <input
            type="text"
            placeholder="Event Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <input
            type="text"
            placeholder="Venue"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
          />

          <input
            type="text"
            placeholder="Organizer Name"
            value={organizer}
            onChange={(e) => setOrganizer(e.target.value)}
          />

          <button className="btn btn-primary">
            Add Event
          </button>

        </form>

      </div>

      {events.length === 0 ? (

        <p>No Events Available</p>

      ) : (

        <table className="table">

          <thead>

            <tr>
              <th>Event Name</th>
              <th>Date</th>
              <th>Venue</th>
              <th>Organizer</th>
              <th>Status</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {events.map((event) => (

              <tr key={event.id}>

                <td>{event.name}</td>

                <td>{event.date}</td>

                <td>{event.venue}</td>

                <td>{event.organizer}</td>

                <td>

                  <span
                    className={
                      event.status === 'Completed'
                        ? 'completed'
                        : 'upcoming'
                    }
                  >
                    {event.status}
                  </span>

                </td>

                <td>

                  <button
                    className="btn btn-delete"
                    onClick={() => {

                      const confirmDelete =
                        window.confirm(
                          'Delete this event?'
                        )

                      if(confirmDelete){
                        onDelete(event.id)
                      }

                    }}
                  >
                    Delete
                  </button>

                  {event.status !== 'Completed' && (

                    <button
                      className="btn btn-complete"
                      onClick={() => onComplete(event.id)}
                    >
                      Complete
                    </button>

                  )}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      )}

    </div>
  )
}