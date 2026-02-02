import { useState, useMemo } from 'react'

const battingStats = [
  { player: "Josh Paul", avg: .364, g: 36, ab: 132, r: 37, h: 48, doubles: 8, triples: 6, hr: 6, rbi: 26, bats: "R", throws: "R", college: "Vanderbilt", hometown: "Buffalo Grove, IL", mlb: true, awards: ["League MVP", "Batting Champion", "Outstanding Pro Prospect", "Playoff Co-MVP"] },
  { player: "Ronald Walker", avg: .382, g: 25, ab: 76, r: 17, h: 29, doubles: 6, triples: 0, hr: 4, rbi: 23, bats: "R", throws: "R", college: "Old Dominion", hometown: "Vincentown, NJ", mlb: false, awards: [] },
  { player: "Diego Rico", avg: .268, g: 37, ab: 112, r: 21, h: 30, doubles: 4, triples: 0, hr: 1, rbi: 7, bats: "L", throws: "L", college: "Arizona", hometown: "Tucson, AZ", mlb: false, awards: [], note: "Team-high 21 stolen bases" },
  { player: "Jesse Zepeda", avg: .265, g: 41, ab: 147, r: 21, h: 39, doubles: 9, triples: 2, hr: 1, rbi: 17, bats: "S", throws: "R", college: "Oklahoma", hometown: "Santa Maria, CA", mlb: false, awards: [], note: "Team-high 27 walks" },
  { player: "Ronnie Barassi", avg: .262, g: 37, ab: 107, r: 15, h: 28, doubles: 6, triples: 1, hr: 0, rbi: 11, bats: "R", throws: "R", college: "Memphis State", hometown: "Memphis, TN", mlb: false, awards: [] },
  { player: "Brandon Berger", avg: .259, g: 39, ab: 116, r: 14, h: 30, doubles: 1, triples: 2, hr: 4, rbi: 25, bats: "R", throws: "R", college: "Eastern Kentucky", hometown: "Ft. Mitchell, KY", mlb: true, awards: [], note: "Clutch 2-run HR in 10th, Game 2 vs Wareham" },
  { player: "Doug Livingston", avg: .255, g: 38, ab: 145, r: 29, h: 37, doubles: 6, triples: 1, hr: 1, rbi: 19, bats: "R", throws: "R", college: "Clemson", hometown: "Thonotosassa, FL", mlb: false, awards: [], note: "Sac fly won Game 3 vs Wareham" },
  { player: "Tim DeCinces", avg: .246, g: 37, ab: 130, r: 15, h: 32, doubles: 8, triples: 0, hr: 4, rbi: 23, bats: "L", throws: "R", college: "UCLA", hometown: "Newport Beach, CA", mlb: false, awards: [] },
  { player: "Glenn Davis", avg: .225, g: 39, ab: 142, r: 19, h: 32, doubles: 7, triples: 2, hr: 1, rbi: 17, bats: "S", throws: "L", college: "Vanderbilt", hometown: "Aston, PA", mlb: false, awards: [], note: "3-run HR in championship-clinching Game 3" },
  { player: "Mark McNelly", avg: .193, g: 31, ab: 83, r: 12, h: 16, doubles: 2, triples: 0, hr: 0, rbi: 10, bats: "R", throws: "R", college: "New Mexico State", hometown: "Phoenixville, PA", mlb: false, awards: [] },
  { player: "Brian Bernard", avg: .182, g: 34, ab: 99, r: 12, h: 18, doubles: 3, triples: 0, hr: 2, rbi: 10, bats: "R", throws: "R", college: "Wake Forest", hometown: "Ft. Lauderdale, FL", mlb: false, awards: [] },
  { player: "Chip Wade", avg: .165, g: 32, ab: 97, r: 16, h: 16, doubles: 3, triples: 1, hr: 1, rbi: 10, bats: "R", throws: "R", college: "Georgia", hometown: "Pensacola, FL", mlb: false, awards: [] },
]

const pitchingStats = [
  { player: "Jack Cressend", g: 9, ip: 70, h: 52, r: 19, er: 19, bb: 26, so: 63, w: 7, l: 1, era: 2.44, college: "Tulane", mlb: true, hof: true, awards: ["CCBL Hall of Fame"], note: "141-pitch complete game shutout" },
  { player: "Kevin Sheredy", g: 7, ip: 29, h: 20, r: 8, er: 2, bb: 22, so: 30, w: 1, l: 1, era: 0.62, college: "UCLA", mlb: false, awards: [], note: "Recorded final out of championship" },
  { player: "Ronald Walker", g: 2, ip: 7, h: 3, r: 1, er: 1, bb: 2, so: 8, w: 0, l: 0, era: 1.29, college: "Old Dominion", mlb: false, awards: [], note: "Also played outfield" },
  { player: "Scott Bell", g: 2, ip: 3, h: 5, r: 1, er: 1, bb: 1, so: 1, w: 0, l: 0, era: 3.00, college: "", mlb: false, awards: [] },
  { player: "Mike Ramseyer", g: 18, ip: 35, h: 26, r: 13, er: 12, bb: 15, so: 27, w: 5, l: 1, era: 3.09, college: "", mlb: false, awards: [] },
  { player: "Josh Gandy", g: 8, ip: 51, h: 44, r: 26, er: 18, bb: 24, so: 34, w: 4, l: 0, era: 3.18, college: "", mlb: false, awards: ["Playoff Co-MVP"] },
  { player: "Aaron Porter", g: 11, ip: 35, h: 43, r: 17, er: 15, bb: 18, so: 21, w: 2, l: 0, era: 3.86, college: "", mlb: false, awards: [] },
  { player: "Kyle Peterson", g: 2, ip: 9, h: 7, r: 4, er: 4, bb: 4, so: 5, w: 0, l: 1, era: 4.00, college: "", mlb: false, awards: [] },
  { player: "Brendan Sullivan", g: 18, ip: 21, h: 17, r: 11, er: 10, bb: 20, so: 13, w: 2, l: 1, era: 4.29, college: "", mlb: false, awards: ["Relief Pitcher of the Year"], note: "7 saves" },
  { player: "Ryan Lynch", g: 8, ip: 47, h: 53, r: 39, er: 28, bb: 30, so: 34, w: 5, l: 1, era: 5.36, college: "UCLA", mlb: false, awards: [], note: "Complete game shutout, Game 3 vs Wareham" },
  { player: "Jason Grilli", g: 11, ip: 48, h: 58, r: 42, er: 35, bb: 24, so: 43, w: 2, l: 5, era: 6.56, college: "Seton Hall", mlb: true, awards: ["2013 MLB All-Star"], note: "139-pitch, 8-inning outing vs Falmouth" },
  { player: "Mike Skeeles", g: 9, ip: 16, h: 11, r: 15, er: 12, bb: 19, so: 14, w: 1, l: 0, era: 6.75, college: "", mlb: false, awards: [] },
]

const teamBattingTotals = { avg: .256, ab: 1386, r: 228, h: 355, doubles: 63, triples: 15, hr: 25, rbi: 198 }
const teamPitchingTotals = { ip: 371, h: 339, r: 196, er: 157, bb: 205, so: 293, w: 29, l: 11 }

const mlbAlumni = [
  { name: "Will Clark", years: "1983", position: "1B", mlbTeams: "Giants, Rangers, Cardinals, Orioles", mlbYears: "1986-2000", highlights: "6× All-Star, 2× Silver Slugger" },
  { name: "Ron Darling", years: "1980", position: "P", mlbTeams: "Mets, Expos, Athletics", mlbYears: "1983-1995", highlights: "1986 World Series Champion, Gold Glove" },
  { name: "Terry Steinbach", years: "1982", position: "C", mlbTeams: "Athletics, Twins", mlbYears: "1986-1999", highlights: "3× All-Star, CCBL hits record (75)" },
  { name: "Greg Vaughn", years: "1986", position: "OF", mlbTeams: "Brewers, Padres, Reds, Devil Rays, Rockies", mlbYears: "1989-2003", highlights: "4× All-Star, 50 HR in 1998" },
  { name: "Tim Salmon", years: "1988", position: "OF", mlbTeams: "Angels", mlbYears: "1992-2006", highlights: "1993 AL ROY, 2002 World Series Champion" },
  { name: "Chase Utley", years: "2000", position: "2B", mlbTeams: "Phillies, Dodgers", mlbYears: "2003-2018", highlights: "6× All-Star, 4× Silver Slugger, 2008 WS Champion" },
  { name: "Josh Paul", years: "1995", position: "C/OF", mlbTeams: "White Sox, Angels, Devil Rays, Nationals", mlbYears: "1999-2007", highlights: "1995 CCBL MVP, Batting Champion" },
  { name: "Jason Grilli", years: "1995", position: "P", mlbTeams: "Marlins, White Sox, Tigers, Rockies, Rangers, Pirates, Angels, Blue Jays", mlbYears: "2000-2017", highlights: "2013 All-Star, 74 saves in 2013" },
  { name: "Jack Cressend", years: "1995", position: "P", mlbTeams: "Twins, Indians, Rangers", mlbYears: "2001-2005", highlights: "CCBL Hall of Fame" },
  { name: "Brandon Berger", years: "1995", position: "OF", mlbTeams: "Royals", mlbYears: "2001-2003", highlights: "Clutch playoff performer for Kettleers" },
  { name: "Jason Kipnis", years: "2008", position: "2B", mlbTeams: "Indians, Cubs", mlbYears: "2011-2020", highlights: "2× All-Star" },
  { name: "Nick Gonzales", years: "2019", position: "2B", mlbTeams: "Pirates", mlbYears: "2024-", highlights: "2019 CCBL MVP, CCBL Hall of Fame 2025" },
  { name: "Lou Merloni", years: "1992", position: "INF", mlbTeams: "Red Sox, Padres, Indians, Angels", mlbYears: "1998-2006", highlights: "1992 CCBL Batting Champion" },
]

const championships = [
  { year: 1961, opponent: "Yarmouth Indians", result: "2-1", notes: "First championship" },
  { year: 1962, opponent: "Harwich", result: "2-0", notes: "Labor Day doubleheader sweep" },
  { year: 1963, opponent: "Dennis", result: "2-1", notes: "First modern era title" },
  { year: 1964, opponent: "Harwich", result: "2-0", notes: "Fourth consecutive" },
  { year: 1972, opponent: "Chatham", result: "2-1", notes: "Jack McCarthy dynasty begins" },
  { year: 1973, opponent: "Chatham", result: "2-0", notes: "" },
  { year: 1974, opponent: "Orleans", result: "2-1", notes: "" },
  { year: 1975, opponent: "Falmouth", result: "2-0", notes: "Fourth straight" },
  { year: 1981, opponent: "Wareham", result: "2-0", notes: "" },
  { year: 1984, opponent: "Chatham", result: "2-1", notes: "Terry Steinbach" },
  { year: 1985, opponent: "Wareham", result: "2-0", notes: "" },
  { year: 1995, opponent: "Chatham", result: "2-1", notes: "Josh Paul MVP" },
  { year: 1999, opponent: "Brewster", result: "2-1", notes: "" },
  { year: 2010, opponent: "Y-D Red Sox", result: "2-1", notes: "" },
  { year: 2013, opponent: "Falmouth", result: "2-0", notes: "" },
  { year: 2019, opponent: "Harwich", result: "2-0", notes: "Nick Gonzales MVP, 17th title" },
]

const hallOfFame = [
  { name: "Arnold Mycock", inducted: 2002, role: "Executive/GM 1950-1995" },
  { name: "Jim Hubbard", inducted: 2002, role: "Player/Manager 1959-1969" },
  { name: "Jack McCarthy", inducted: 2002, role: "Manager 1972-1988" },
  { name: "Ron Darling", inducted: 2002, role: "Player 1980" },
  { name: "Will Clark", inducted: 2004, role: "Player 1983" },
  { name: "Terry Steinbach", inducted: 2004, role: "Player 1982" },
  { name: "Josh Paul", inducted: 2006, role: "Player 1995" },
  { name: "Jack Cressend", inducted: 2009, role: "Player 1995" },
  { name: "Greg Vaughn", inducted: 2009, role: "Player 1986" },
  { name: "Tim Salmon", inducted: 2013, role: "Player 1988" },
  { name: "Lou Merloni", inducted: 2017, role: "Player 1992" },
  { name: "Chase Utley", inducted: 2019, role: "Player 2000" },
  { name: "Nick Gonzales", inducted: 2025, role: "Player 2019" },
]

function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [statsView, setStatsView] = useState('batting')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortConfig, setSortConfig] = useState({ key: 'avg', direction: 'desc' })
  const [showMLBOnly, setShowMLBOnly] = useState(false)

  const sortedBattingStats = useMemo(() => {
    let filtered = [...battingStats]
    if (showMLBOnly) filtered = filtered.filter(p => p.mlb)
    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.player.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.college.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.hometown.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    return filtered.sort((a, b) => {
      if (sortConfig.key === 'player' || sortConfig.key === 'college' || sortConfig.key === 'hometown') {
        return sortConfig.direction === 'asc' ? a[sortConfig.key].localeCompare(b[sortConfig.key]) : b[sortConfig.key].localeCompare(a[sortConfig.key])
      }
      return sortConfig.direction === 'asc' ? a[sortConfig.key] - b[sortConfig.key] : b[sortConfig.key] - a[sortConfig.key]
    })
  }, [searchTerm, sortConfig, showMLBOnly])

  const sortedPitchingStats = useMemo(() => {
    let filtered = [...pitchingStats]
    if (showMLBOnly) filtered = filtered.filter(p => p.mlb)
    if (searchTerm) {
      filtered = filtered.filter(p => p.player.toLowerCase().includes(searchTerm.toLowerCase()) || (p.college && p.college.toLowerCase().includes(searchTerm.toLowerCase())))
    }
    return filtered.sort((a, b) => {
      if (sortConfig.key === 'player' || sortConfig.key === 'college') {
        return sortConfig.direction === 'asc' ? (a[sortConfig.key] || '').localeCompare(b[sortConfig.key] || '') : (b[sortConfig.key] || '').localeCompare(a[sortConfig.key] || '')
      }
      return sortConfig.direction === 'asc' ? a[sortConfig.key] - b[sortConfig.key] : b[sortConfig.key] - a[sortConfig.key]
    })
  }, [searchTerm, sortConfig, showMLBOnly])

  const handleSort = (key) => setSortConfig(prev => ({ key, direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc' }))
  const SortIcon = ({ columnKey }) => sortConfig.key !== columnKey ? <span className="text-gray-400 ml-1">↕</span> : <span className="text-amber-600 ml-1">{sortConfig.direction === 'desc' ? '↓' : '↑'}</span>

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <header className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 border-b-4 border-amber-600">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 flex items-center justify-center shadow-lg border-2 border-amber-400">
              <span className="text-slate-900 font-bold text-2xl">CK</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white tracking-tight">Cotuit Kettleers</h1>
              <p className="text-amber-500 text-lg font-medium">Historical Archive</p>
              <p className="text-slate-400 text-sm">17-Time Cape Cod Baseball League Champions</p>
            </div>
          </div>
          <nav className="mt-6 flex gap-2 flex-wrap">
            {[{ id: 'home', label: 'Home' }, { id: 'stats', label: '1995 Stats' }, { id: 'championships', label: 'Championships' }, { id: 'alumni', label: 'MLB Alumni' }, { id: 'history', label: 'History' }].map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-5 py-2 rounded-lg font-medium transition-all ${activeTab === tab.id ? 'bg-amber-600 text-white shadow-lg' : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700 hover:text-white'}`}>{tab.label}</button>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'home' && (
          <div className="space-y-8">
            <section className="bg-gradient-to-r from-blue-900/50 to-slate-800/50 rounded-xl p-8 border border-slate-700">
              <h2 className="text-3xl font-bold text-white mb-4">Welcome to the Kettleers Archive</h2>
              <p className="text-slate-300 text-lg leading-relaxed mb-6">The Cotuit Kettleers are the most successful franchise in Cape Cod Baseball League history, with a record 17 championships spanning from 1961 to 2019. Over 150 Kettleers alumni have gone on to play in Major League Baseball.</p>
            </section>
            <section className="bg-slate-800/50 rounded-xl p-8 border border-amber-600/30">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2 h-12 bg-amber-600 rounded"></div>
                <div>
                  <h2 className="text-2xl font-bold text-amber-500">Featured: 1995 Championship Season</h2>
                  <p className="text-slate-400">29-11-3 Regular Season • West Division Champions</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h3 className="text-amber-500 font-semibold mb-2">Season Highlights</h3>
                  <ul className="text-slate-300 space-y-1 text-sm">
                    <li>• 11-game winning streak (July 6-20)</li>
                    <li>• Never lost consecutive games all season</li>
                    <li>• Four future MLB players on roster</li>
                  </ul>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-4">
                  <h3 className="text-amber-500 font-semibold mb-2">Award Winners</h3>
                  <ul className="text-slate-300 space-y-1 text-sm">
                    <li><span className="text-white font-medium">Josh Paul:</span> MVP, Batting Champion (.364)</li>
                    <li><span className="text-white font-medium">Mike Coutts:</span> Manager of the Year</li>
                    <li><span className="text-white font-medium">Brendan Sullivan:</span> Relief Pitcher of Year</li>
                  </ul>
                </div>
              </div>
              <button onClick={() => setActiveTab('stats')} className="mt-6 px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-lg transition-colors">View Complete 1995 Statistics →</button>
            </section>
            <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[{ label: 'Championships', value: '17', sub: 'League Record' }, { label: 'MLB Alumni', value: '150+', sub: 'And Counting' }, { label: 'Hall of Famers', value: '13', sub: 'CCBL HOF' }, { label: 'Founded', value: '1947', sub: 'Lowell Park' }].map((stat, i) => (
                <div key={i} className="bg-slate-800/50 rounded-xl p-6 text-center border border-slate-700">
                  <div className="text-3xl font-bold text-amber-500">{stat.value}</div>
                  <div className="text-white font-medium">{stat.label}</div>
                  <div className="text-slate-400 text-sm">{stat.sub}</div>
                </div>
              ))}
            </section>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div><h2 className="text-2xl font-bold text-white">1995 Season Statistics</h2><p className="text-slate-400">Complete batting and pitching stats for the championship roster</p></div>
              <div className="flex bg-slate-700 rounded-lg p-1">
                <button onClick={() => { setStatsView('batting'); setSortConfig({ key: 'avg', direction: 'desc' }) }} className={`px-4 py-2 rounded-md font-medium transition-colors ${statsView === 'batting' ? 'bg-amber-600 text-white' : 'text-slate-300 hover:text-white'}`}>Batting</button>
                <button onClick={() => { setStatsView('pitching'); setSortConfig({ key: 'era', direction: 'asc' }) }} className={`px-4 py-2 rounded-md font-medium transition-colors ${statsView === 'pitching' ? 'bg-amber-600 text-white' : 'text-slate-300 hover:text-white'}`}>Pitching</button>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 items-center">
              <div className="relative flex-1 min-w-[250px]">
                <input type="text" placeholder="Search by name, college, or hometown..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-amber-500" />
                {searchTerm && <button onClick={() => setSearchTerm('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">✕</button>}
              </div>
              <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                <input type="checkbox" checked={showMLBOnly} onChange={(e) => setShowMLBOnly(e.target.checked)} className="w-5 h-5 rounded bg-slate-700 border-slate-600 text-amber-600" />Future MLB Players Only
              </label>
            </div>

            {statsView === 'batting' && (
              <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-slate-900/50 text-left">
                        <th className="px-4 py-3 text-slate-300 font-semibold cursor-pointer hover:text-amber-500" onClick={() => handleSort('player')}>Player <SortIcon columnKey="player" /></th>
                        <th className="px-3 py-3 text-slate-300 font-semibold cursor-pointer hover:text-amber-500 text-right" onClick={() => handleSort('avg')}>AVG <SortIcon columnKey="avg" /></th>
                        <th className="px-3 py-3 text-slate-300 font-semibold cursor-pointer hover:text-amber-500 text-right" onClick={() => handleSort('g')}>G <SortIcon columnKey="g" /></th>
                        <th className="px-3 py-3 text-slate-300 font-semibold cursor-pointer hover:text-amber-500 text-right" onClick={() => handleSort('ab')}>AB <SortIcon columnKey="ab" /></th>
                        <th className="px-3 py-3 text-slate-300 font-semibold cursor-pointer hover:text-amber-500 text-right" onClick={() => handleSort('r')}>R <SortIcon columnKey="r" /></th>
                        <th className="px-3 py-3 text-slate-300 font-semibold cursor-pointer hover:text-amber-500 text-right" onClick={() => handleSort('h')}>H <SortIcon columnKey="h" /></th>
                        <th className="px-3 py-3 text-slate-300 font-semibold cursor-pointer hover:text-amber-500 text-right" onClick={() => handleSort('doubles')}>2B <SortIcon columnKey="doubles" /></th>
                        <th className="px-3 py-3 text-slate-300 font-semibold cursor-pointer hover:text-amber-500 text-right" onClick={() => handleSort('triples')}>3B <SortIcon columnKey="triples" /></th>
                        <th className="px-3 py-3 text-slate-300 font-semibold cursor-pointer hover:text-amber-500 text-right" onClick={() => handleSort('hr')}>HR <SortIcon columnKey="hr" /></th>
                        <th className="px-3 py-3 text-slate-300 font-semibold cursor-pointer hover:text-amber-500 text-right" onClick={() => handleSort('rbi')}>RBI <SortIcon columnKey="rbi" /></th>
                        <th className="px-3 py-3 text-slate-300 font-semibold text-center">B/T</th>
                        <th className="px-4 py-3 text-slate-300 font-semibold cursor-pointer hover:text-amber-500" onClick={() => handleSort('college')}>College <SortIcon columnKey="college" /></th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedBattingStats.map((player, i) => (
                        <tr key={i} className={`border-t border-slate-700/50 hover:bg-slate-700/30 ${player.mlb ? 'bg-amber-900/10' : ''}`}>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <span className="text-white font-medium">{player.player}</span>
                              {player.mlb && <span className="px-1.5 py-0.5 bg-amber-600/20 text-amber-500 text-xs rounded">MLB</span>}
                              {player.awards.length > 0 && <span className="text-amber-500">★</span>}
                            </div>
                            {player.awards.length > 0 && <div className="text-xs text-amber-500/80 mt-1">{player.awards.join(' • ')}</div>}
                            {player.note && <div className="text-xs text-slate-500 mt-1">{player.note}</div>}
                          </td>
                          <td className="px-3 py-3 text-right font-mono text-white">{player.avg.toFixed(3)}</td>
                          <td className="px-3 py-3 text-right font-mono text-slate-300">{player.g}</td>
                          <td className="px-3 py-3 text-right font-mono text-slate-300">{player.ab}</td>
                          <td className="px-3 py-3 text-right font-mono text-slate-300">{player.r}</td>
                          <td className="px-3 py-3 text-right font-mono text-slate-300">{player.h}</td>
                          <td className="px-3 py-3 text-right font-mono text-slate-300">{player.doubles}</td>
                          <td className="px-3 py-3 text-right font-mono text-slate-300">{player.triples}</td>
                          <td className="px-3 py-3 text-right font-mono text-slate-300">{player.hr}</td>
                          <td className="px-3 py-3 text-right font-mono text-slate-300">{player.rbi}</td>
                          <td className="px-3 py-3 text-center text-slate-400">{player.bats}/{player.throws}</td>
                          <td className="px-4 py-3 text-slate-400">{player.college}</td>
                        </tr>
                      ))}
                      <tr className="border-t-2 border-amber-600/50 bg-slate-900/50 font-semibold">
                        <td className="px-4 py-3 text-amber-500">TEAM TOTALS</td>
                        <td className="px-3 py-3 text-right font-mono text-amber-500">{teamBattingTotals.avg.toFixed(3)}</td>
                        <td className="px-3 py-3 text-right font-mono text-slate-400">—</td>
                        <td className="px-3 py-3 text-right font-mono text-slate-300">{teamBattingTotals.ab}</td>
                        <td className="px-3 py-3 text-right font-mono text-slate-300">{teamBattingTotals.r}</td>
                        <td className="px-3 py-3 text-right font-mono text-slate-300">{teamBattingTotals.h}</td>
                        <td className="px-3 py-3 text-right font-mono text-slate-300">{teamBattingTotals.doubles}</td>
                        <td className="px-3 py-3 text-right font-mono text-slate-300">{teamBattingTotals.triples}</td>
                        <td className="px-3 py-3 text-right font-mono text-slate-300">{teamBattingTotals.hr}</td>
                        <td className="px-3 py-3 text-right font-mono text-slate-300">{teamBattingTotals.rbi}</td>
                        <td className="px-3 py-3"></td><td className="px-4 py-3"></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {statsView === 'pitching' && (
              <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-slate-900/50 text-left">
                        <th className="px-4 py-3 text-slate-300 font-semibold cursor-pointer hover:text-amber-500" onClick={() => handleSort('player')}>Player <SortIcon columnKey="player" /></th>
                        <th className="px-3 py-3 text-slate-300 font-semibold cursor-pointer hover:text-amber-500 text-right" onClick={() => handleSort('era')}>ERA <SortIcon columnKey="era" /></th>
                        <th className="px-3 py-3 text-slate-300 font-semibold cursor-pointer hover:text-amber-500 text-right" onClick={() => handleSort('w')}>W <SortIcon columnKey="w" /></th>
                        <th className="px-3 py-3 text-slate-300 font-semibold cursor-pointer hover:text-amber-500 text-right" onClick={() => handleSort('l')}>L <SortIcon columnKey="l" /></th>
                        <th className="px-3 py-3 text-slate-300 font-semibold cursor-pointer hover:text-amber-500 text-right" onClick={() => handleSort('g')}>G <SortIcon columnKey="g" /></th>
                        <th className="px-3 py-3 text-slate-300 font-semibold cursor-pointer hover:text-amber-500 text-right" onClick={() => handleSort('ip')}>IP <SortIcon columnKey="ip" /></th>
                        <th className="px-3 py-3 text-slate-300 font-semibold cursor-pointer hover:text-amber-500 text-right" onClick={() => handleSort('h')}>H <SortIcon columnKey="h" /></th>
                        <th className="px-3 py-3 text-slate-300 font-semibold cursor-pointer hover:text-amber-500 text-right" onClick={() => handleSort('bb')}>BB <SortIcon columnKey="bb" /></th>
                        <th className="px-3 py-3 text-slate-300 font-semibold cursor-pointer hover:text-amber-500 text-right" onClick={() => handleSort('so')}>SO <SortIcon columnKey="so" /></th>
                        <th className="px-4 py-3 text-slate-300 font-semibold">College</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedPitchingStats.map((player, i) => (
                        <tr key={i} className={`border-t border-slate-700/50 hover:bg-slate-700/30 ${player.mlb ? 'bg-amber-900/10' : ''}`}>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <span className="text-white font-medium">{player.player}</span>
                              {player.mlb && <span className="px-1.5 py-0.5 bg-amber-600/20 text-amber-500 text-xs rounded">MLB</span>}
                              {player.hof && <span className="px-1.5 py-0.5 bg-blue-600/20 text-blue-400 text-xs rounded">HOF</span>}
                              {player.awards.length > 0 && <span className="text-amber-500">★</span>}
                            </div>
                            {player.awards.length > 0 && <div className="text-xs text-amber-500/80 mt-1">{player.awards.join(' • ')}</div>}
                            {player.note && <div className="text-xs text-slate-500 mt-1">{player.note}</div>}
                          </td>
                          <td className="px-3 py-3 text-right font-mono text-white">{player.era.toFixed(2)}</td>
                          <td className="px-3 py-3 text-right font-mono text-slate-300">{player.w}</td>
                          <td className="px-3 py-3 text-right font-mono text-slate-300">{player.l}</td>
                          <td className="px-3 py-3 text-right font-mono text-slate-300">{player.g}</td>
                          <td className="px-3 py-3 text-right font-mono text-slate-300">{player.ip}</td>
                          <td className="px-3 py-3 text-right font-mono text-slate-300">{player.h}</td>
                          <td className="px-3 py-3 text-right font-mono text-slate-300">{player.bb}</td>
                          <td className="px-3 py-3 text-right font-mono text-slate-300">{player.so}</td>
                          <td className="px-4 py-3 text-slate-400">{player.college || '—'}</td>
                        </tr>
                      ))}
                      <tr className="border-t-2 border-amber-600/50 bg-slate-900/50 font-semibold">
                        <td className="px-4 py-3 text-amber-500">TEAM TOTALS</td>
                        <td className="px-3 py-3 text-right font-mono text-amber-500">{(teamPitchingTotals.er * 9 / teamPitchingTotals.ip).toFixed(2)}</td>
                        <td className="px-3 py-3 text-right font-mono text-slate-300">{teamPitchingTotals.w}</td>
                        <td className="px-3 py-3 text-right font-mono text-slate-300">{teamPitchingTotals.l}</td>
                        <td className="px-3 py-3 text-right font-mono text-slate-400">—</td>
                        <td className="px-3 py-3 text-right font-mono text-slate-300">{teamPitchingTotals.ip}</td>
                        <td className="px-3 py-3 text-right font-mono text-slate-300">{teamPitchingTotals.h}</td>
                        <td className="px-3 py-3 text-right font-mono text-slate-300">{teamPitchingTotals.bb}</td>
                        <td className="px-3 py-3 text-right font-mono text-slate-300">{teamPitchingTotals.so}</td>
                        <td className="px-4 py-3"></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            <div className="bg-slate-800/30 rounded-lg p-4 text-sm">
              <h4 className="text-slate-400 font-semibold mb-2">Legend</h4>
              <div className="flex flex-wrap gap-4 text-slate-500">
                <span><span className="px-1.5 py-0.5 bg-amber-600/20 text-amber-500 text-xs rounded mr-1">MLB</span> Reached Major Leagues</span>
                <span><span className="px-1.5 py-0.5 bg-blue-600/20 text-blue-400 text-xs rounded mr-1">HOF</span> CCBL Hall of Fame</span>
                <span><span className="text-amber-500 mr-1">★</span> Award Winner</span>
                <span className="text-slate-600">|</span><span>Click column headers to sort</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'championships' && (
          <div className="space-y-6">
            <div><h2 className="text-2xl font-bold text-white">17 Championships</h2><p className="text-slate-400">The most in Cape Cod Baseball League history</p></div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-r from-amber-900/30 to-slate-800/50 rounded-xl p-6 border border-amber-600/30">
                <h3 className="text-amber-500 font-bold text-lg mb-2">First Dynasty: 1961-1964</h3>
                <p className="text-slate-300">Four consecutive championships under manager Jim Hubbard.</p>
              </div>
              <div className="bg-gradient-to-r from-amber-900/30 to-slate-800/50 rounded-xl p-6 border border-amber-600/30">
                <h3 className="text-amber-500 font-bold text-lg mb-2">Second Dynasty: 1972-1975</h3>
                <p className="text-slate-300">Manager Jack McCarthy led another four-peat.</p>
              </div>
            </div>
            <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
              <table className="w-full text-sm">
                <thead><tr className="bg-slate-900/50 text-left"><th className="px-4 py-3 text-slate-300 font-semibold">Year</th><th className="px-4 py-3 text-slate-300 font-semibold">Championship Series</th><th className="px-4 py-3 text-slate-300 font-semibold">Result</th><th className="px-4 py-3 text-slate-300 font-semibold">Notes</th></tr></thead>
                <tbody>
                  {championships.map((champ, i) => (
                    <tr key={i} className={`border-t border-slate-700/50 hover:bg-slate-700/30 ${champ.year === 1995 ? 'bg-amber-900/20' : ''}`}>
                      <td className="px-4 py-3 font-bold text-amber-500">{champ.year}</td>
                      <td className="px-4 py-3 text-white">vs {champ.opponent}</td>
                      <td className="px-4 py-3 text-slate-300">{champ.result}</td>
                      <td className="px-4 py-3 text-slate-400">{champ.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'alumni' && (
          <div className="space-y-6">
            <div><h2 className="text-2xl font-bold text-white">MLB Alumni</h2><p className="text-slate-400">Over 150 Kettleers have reached the Major Leagues.</p></div>
            <div className="grid gap-4">
              {mlbAlumni.map((alum, i) => (
                <div key={i} className={`bg-slate-800/50 rounded-xl p-5 border border-slate-700 hover:border-slate-600 ${alum.years === '1995' ? 'border-l-4 border-l-amber-600' : ''}`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div><h3 className="text-white font-bold text-lg">{alum.name}</h3><p className="text-slate-400">{alum.position} • Kettleers {alum.years}</p></div>
                    <div className="text-right"><p className="text-amber-500 font-medium">{alum.mlbYears}</p><p className="text-slate-500 text-sm">{alum.mlbTeams}</p></div>
                  </div>
                  <p className="text-slate-300 mt-2">{alum.highlights}</p>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <h3 className="text-xl font-bold text-white mb-4">CCBL Hall of Fame Inductees</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {hallOfFame.map((member, i) => (
                  <div key={i} className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/50">
                    <div className="text-white font-medium">{member.name}</div>
                    <div className="text-amber-500 text-sm">{member.role}</div>
                    <div className="text-slate-500 text-sm">Inducted {member.inducted}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-8">
            <div><h2 className="text-2xl font-bold text-white">Team History</h2><p className="text-slate-400">From a brass kettle to baseball royalty</p></div>
            <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700">
              <h3 className="text-amber-500 font-bold text-xl mb-4">The Origin of "Kettleers"</h3>
              <p className="text-slate-300 leading-relaxed mb-4">More than 300 years ago, the Wampanoag people bartered with early European settlers for the land on which Cotuit and Santuit now stand. The terms of the sale were a brass kettle with a hoe thrown in for good measure.</p>
              <p className="text-slate-300 leading-relaxed">Cape Cod Standard-Times sports editor Ed Semprini coined the nickname "Kettleers" in the late 1940s as a nod to this legendary transaction.</p>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700">
              <h3 className="text-amber-500 font-bold text-xl mb-4">Founding (1947)</h3>
              <p className="text-slate-300 leading-relaxed">The Cotuit Athletic Association was formed in 1947 to sponsor the village's new Cape League franchise. The inaugural team featured first baseman Manny Robello, known as the "original Kettleer."</p>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700">
              <h3 className="text-amber-500 font-bold text-xl mb-4">Lowell Park</h3>
              <p className="text-slate-300 leading-relaxed">Lowell Park is the only Cape Cod Baseball League field maintained entirely by private funds. The Cotuit Athletic Association depends entirely on donations to support the team and maintain the facility.</p>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-slate-900 border-t border-slate-800 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <div className="text-amber-500 font-bold text-lg mb-2">Cotuit Kettleers Historical Archive</div>
          <p className="text-slate-500 text-sm">A personal archive celebrating the rich history of Cotuit baseball.<br/>Not affiliated with the Cotuit Athletic Association or Cape Cod Baseball League.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
