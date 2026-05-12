export default function Dashboard({ events, participants }){

  const totalEvents = events.length

  const upcomingEvents = events.filter(
    (event) => event.status === 'Upcoming'
  ).length

  const completedEvents = events.filter(
    (event) => event.status === 'Completed'
  ).length

  const totalParticipants = participants.length

  return (
    <div>

      <h2>Dashboard</h2>

      <p>
        Current Date : {new Date().toLocaleDateString()}
      </p>

      <div className="grid">

        <div className="card">
          <h3>Total Events</h3>
          <p>{totalEvents}</p>
        </div>

        <div className="card">
          <h3>Upcoming Events</h3>
          <p>{upcomingEvents}</p>
        </div>

        <div className="card">
          <h3>Completed Events</h3>
          <p>{completedEvents}</p>
        </div>

        <div className="card">
          <h3>Total Participants</h3>
          <p>{totalParticipants}</p>
        </div>

      </div>

    </div>
  )
}