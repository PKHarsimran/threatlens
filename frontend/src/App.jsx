import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [feed, setFeed] = useState([])
  const [stats, setStats] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(null)

  useEffect(() => {
    fetch('/threat-intel/threat-feed.csv')
      .then(res => res.text())
      .then(text => {
        const lines = text.trim().split('\n')
        const [, ...rows] = lines
        const data = rows.map(line => {
          const [indicator, type, ...srcParts] = line.split(',')
          return { indicator, type, source: srcParts.join(',') }
        })
        setFeed(data)
      })
      .catch(err => console.error('Failed to load feed', err))

    fetch('/threat-intel/stats.json')
      .then(res => res.json())
      .then(setStats)
      .catch(err => console.error('Failed to load stats', err))

    fetch('/threat-intel/feed_status.json')
      .then(res => res.json())
      .then(data => setLastUpdated(data.last_updated))
      .catch(err => console.error('Failed to load status', err))
  }, [])

  return (
    <div className="container">
      <h1>ThreatLens Feed</h1>
      {lastUpdated && <p>Last Updated: {new Date(lastUpdated).toLocaleString()}</p>}
      {stats && (
        <div className="stats">
          <strong>Stats:</strong>
          <ul>
            {Object.entries(stats.counts).map(([key, value]) => (
              <li key={key}>{key}: {value}</li>
            ))}
          </ul>
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th>Indicator</th>
            <th>Type</th>
            <th>Source</th>
          </tr>
        </thead>
        <tbody>
          {feed.map((item, idx) => (
            <tr key={idx}>
              <td>{item.indicator}</td>
              <td>{item.type}</td>
              <td><a href={item.source} target="_blank" rel="noopener noreferrer">{item.source}</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App
