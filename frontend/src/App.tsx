import { useMemo, useState } from 'react'
import './App.css'
import teamsData from './CollegeBasketballTeams.json'

type Team = {
  tid: number
  school: string
  name: string
  city: string
  state: string
}

type TeamCardProps = {
  team: Team
}

type TeamMenuProps = {
  teams: Team[]
  selectedTeamId: number
  onSelectTeam: (teamId: number) => void
}

function HeadingSection() {
  return (
    <header className="heading-section">
      <h1>NCAA College Basketball Teams</h1>
      <p>Select a school from the menu to view its team card details.</p>
    </header>
  )
}

function TeamMenu({ teams, selectedTeamId, onSelectTeam }: TeamMenuProps) {
  return (
    <aside className="team-menu" aria-label="College selection menu">
      <h2>Colleges</h2>
      <ul>
        {teams.map((team) => (
          <li key={team.tid}>
            <button
              type="button"
              className={team.tid === selectedTeamId ? 'selected' : ''}
              onClick={() => onSelectTeam(team.tid)}
            >
              {team.school}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  )
}

function TeamCard({ team }: TeamCardProps) {
  return (
    <article className="team-card">
      <h2>{team.school}</h2>
      <p>
        <span>Mascot Name:</span> {team.name || 'Not listed'}
      </p>
      <p>
        <span>Location:</span> {team.city}, {team.state}
      </p>
    </article>
  )
}

function App() {
  const teams = useMemo(
    () => [...teamsData.teams].sort((a, b) => a.school.localeCompare(b.school)),
    [],
  )

  const [selectedTeamId, setSelectedTeamId] = useState<number>(teams[0].tid)

  const selectedTeam =
    teams.find((team) => team.tid === selectedTeamId) ?? teams[0]

  return (
    <main className="app-container">
      <HeadingSection />
      <section className="content-layout">
        <TeamMenu
          teams={teams}
          selectedTeamId={selectedTeam.tid}
          onSelectTeam={setSelectedTeamId}
        />
        <TeamCard team={selectedTeam} />
      </section>
    </main>
  )
}

export default App
