import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronRight,
  CircleUserRound,
  Clock3,
  Heart,
  Info,
  MapPin,
  Search,
  Settings2,
  SlidersHorizontal,
  Sparkles,
  Target,
  Trophy,
  X,
} from 'lucide-react';
import './styles.css';

const TEAMS = {
  LG: { name: 'LG', city: '서울', color: '#c81d3c' },
  HH: { name: '한화', city: '대전', color: '#f36f21' },
  LT: { name: '롯데', city: '부산', color: '#173e7a' },
  KT: { name: 'KT', city: '수원', color: '#222222' },
  SS: { name: '삼성', city: '대구', color: '#1764ae' },
  NC: { name: 'NC', city: '창원', color: '#315288' },
  DS: { name: '두산', city: '서울', color: '#182958' },
  WO: { name: '키움', city: '서울', color: '#7d2248' },
  SK: { name: 'SSG', city: '인천', color: '#ce0e2d' },
  KIA: { name: 'KIA', city: '광주', color: '#e31937' },
};

const DAYS = [
  { key: '2026-06-30', day: '화', label: '6.30' },
  { key: '2026-07-01', day: '수', label: '7.1' },
  { key: '2026-07-02', day: '목', label: '7.2' },
];

const GAMES = {
  '2026-06-30': [
    { id: 'lg-hh', away: 'LG', home: 'HH', time: '18:30', venue: '대전', weather: '맑음 27°' },
    { id: 'lt-kt', away: 'LT', home: 'KT', time: '18:30', venue: '수원', weather: '구름 26°' },
    { id: 'ss-nc', away: 'SS', home: 'NC', time: '18:30', venue: '창원', weather: '구름 25°' },
    { id: 'ds-wo', away: 'DS', home: 'WO', time: '18:30', venue: '고척', weather: '실내' },
    { id: 'sk-kia', away: 'SK', home: 'KIA', time: '18:30', venue: '광주', weather: '비 24°' },
  ],
  '2026-07-01': [
    { id: 'hh-lg', away: 'HH', home: 'LG', time: '18:30', venue: '잠실', weather: '맑음 28°' },
    { id: 'kt-lt', away: 'KT', home: 'LT', time: '18:30', venue: '사직', weather: '구름 25°' },
    { id: 'nc-ss', away: 'NC', home: 'SS', time: '18:30', venue: '대구', weather: '맑음 27°' },
  ],
  '2026-07-02': [
    { id: 'lg-sk', away: 'LG', home: 'SK', time: '18:30', venue: '인천', weather: '구름 24°' },
    { id: 'kia-hh', away: 'KIA', home: 'HH', time: '18:30', venue: '대전', weather: '맑음 28°' },
    { id: 'wo-ds', away: 'WO', home: 'DS', time: '18:30', venue: '잠실', weather: '구름 27°' },
  ],
};

const RECORD_INPUTS = [
  {
    id: 1, date: '2026-06-30', game: 'lg-hh', team: 'HH', player: '문현빈', role: '타자',
    milestone: 100, current: 98, unit: '안타', title: '개인 통산 100안타', recent: [1, 2, 0, 2, 1],
    season: { 경기: 72, 타율: '0.312', 안타: 87, 홈런: 8, 타점: 39 }, note: '최근 5경기에서 6안타를 기록 중이에요.',
  },
  {
    id: 2, date: '2026-06-30', game: 'sk-kia', team: 'KIA', player: '최형우', role: '타자',
    milestone: 1700, current: 1699, unit: '타점', title: '개인 통산 1,700타점', recent: [0, 1, 2, 0, 1],
    season: { 경기: 68, 타율: '0.286', 안타: 69, 홈런: 11, 타점: 48 }, note: '타점 1개를 추가하면 대기록에 도달해요.',
  },
  {
    id: 3, date: '2026-06-30', game: 'lt-kt', team: 'KT', player: '고영표', role: '투수',
    milestone: 1000, current: 995, unit: '이닝', title: '개인 통산 1,000이닝', recent: [6, 7, 5, 6, 7],
    season: { 경기: 15, 평균자책: '3.24', 승: 8, 패: 4, 이닝: '94.2' }, note: '선발 등판 시 5이닝을 소화하면 달성해요.',
  },
  {
    id: 4, date: '2026-06-30', game: 'ss-nc', team: 'SS', player: '구자욱', role: '타자',
    milestone: 150, current: 149, unit: '홈런', title: '개인 통산 150홈런', recent: [0, 0, 1, 0, 0],
    season: { 경기: 70, 타율: '0.329', 안타: 91, 홈런: 14, 타점: 52 }, note: '홈런 1개가 남았어요.',
  },
  {
    id: 5, date: '2026-06-30', game: 'ds-wo', team: 'DS', player: '곽빈', role: '투수',
    milestone: 50, current: 49, unit: '승', title: '개인 통산 50승', recent: [1, 0, 1, 0, 1],
    season: { 경기: 14, 평균자책: '3.61', 승: 7, 패: 5, 이닝: '82.1' }, note: '오늘 승리투수가 되면 50승을 채워요.',
  },
  {
    id: 6, date: '2026-06-30', game: 'lg-hh', team: 'LG', player: '홍창기', role: '타자',
    milestone: 500, current: 497, unit: '득점', title: '개인 통산 500득점', recent: [1, 0, 0, 2, 1],
    season: { 경기: 69, 타율: '0.301', 안타: 82, 홈런: 4, 득점: 51 }, note: '3득점이 필요해 오늘 달성 난도는 높은 편이에요.',
  },
  {
    id: 7, date: '2026-07-01', game: 'hh-lg', team: 'LG', player: '오지환', role: '타자',
    milestone: 300, current: 299, unit: '2루타', title: '개인 통산 300 2루타', recent: [0, 1, 0, 0, 1],
    season: { 경기: 71, 타율: '0.274', 안타: 70, 홈런: 7, 타점: 35 }, note: '2루타 하나면 달성합니다.',
  },
  {
    id: 8, date: '2026-07-02', game: 'kia-hh', team: 'HH', player: '노시환', role: '타자',
    milestone: 150, current: 148, unit: '홈런', title: '개인 통산 150홈런', recent: [0, 1, 0, 1, 0],
    season: { 경기: 73, 타율: '0.291', 안타: 78, 홈런: 17, 타점: 55 }, note: '홈런 2개가 필요합니다.',
  },
];

const TEAM_RECORD_INPUTS = [
  {
    id: 101, scope: '구단', date: '2026-06-30', game: 'lg-hh', team: 'LG', entity: 'LG 트윈스',
    milestone: 2600, current: 2599, unit: '승', title: '구단 통산 2,600승', recent: [1, 0, 1, 1, 0],
    season: { 경기: 75, 승: 44, 패: 29, 무: 2, 순위: '2위' }, note: '오늘 승리하면 구단 통산 2,600승에 도달해요.',
  },
  {
    id: 102, scope: '구단', date: '2026-06-30', game: 'ss-nc', team: 'SS', entity: '삼성 라이온즈',
    milestone: 5200, current: 5198, unit: '홈런', title: '구단 통산 5,200홈런', recent: [1, 2, 0, 1, 1],
    season: { 경기: 74, 승: 39, 패: 33, 홈런: 81, 득점: 348 }, note: '팀 홈런 2개를 추가하면 달성하는 기록이에요.',
  },
  {
    id: 103, scope: '구단', date: '2026-07-01', game: 'hh-lg', team: 'HH', entity: '한화 이글스',
    milestone: 2400, current: 2399, unit: '승', title: '구단 통산 2,400승', recent: [1, 1, 0, 1, 0],
    season: { 경기: 76, 승: 42, 패: 31, 무: 3, 순위: '3위' }, note: '승리 하나가 남아 있어요.',
  },
];

const VENUE_RECORD_INPUTS = [
  {
    id: 201, scope: '구장', date: '2026-06-30', game: 'lg-hh', team: 'HH', entity: '대전구장', venue: '대전',
    milestone: 1800, current: 1799, unit: '홈런', title: '구장 통산 1,800홈런', recent: [2, 1, 0, 3, 1],
    season: { 경기: 37, 홈런: 76, 득점: 341, 안타: 692, 평균득점: '9.2' }, note: '오늘 양 팀 합계 홈런 1개가 나오면 달성해요.',
  },
  {
    id: 202, scope: '구장', date: '2026-06-30', game: 'ds-wo', team: 'WO', entity: '고척돔', venue: '고척',
    milestone: 5000, current: 4994, unit: '득점', title: '구장 통산 5,000득점', recent: [7, 4, 9, 5, 8],
    season: { 경기: 36, 홈런: 61, 득점: 326, 안타: 641, 평균득점: '9.1' }, note: '오늘 양 팀 합계 6득점이 나오면 달성해요.',
  },
  {
    id: 203, scope: '구장', date: '2026-07-02', game: 'lg-sk', team: 'SK', entity: '인천구장', venue: '인천',
    milestone: 12000, current: 11992, unit: '안타', title: '구장 통산 12,000안타', recent: [14, 9, 17, 12, 11],
    season: { 경기: 38, 홈런: 72, 득점: 337, 안타: 668, 평균득점: '8.9' }, note: '양 팀 합계 8안타가 필요해요.',
  },
];

const ALL_RECORDS = [...RECORD_INPUTS, ...TEAM_RECORD_INPUTS, ...VENUE_RECORD_INPUTS];

function getRecordState(record) {
  const remaining = Math.max(record.milestone - record.current, 0);
  const recentAverage = record.recent.reduce((sum, value) => sum + value, 0) / record.recent.length;
  const likelihood = remaining === 0 ? '달성' : remaining <= Math.max(1, recentAverage) ? '매우 유력' : remaining <= Math.max(2, recentAverage * 2) ? '주목' : '도전';
  return { remaining, likelihood, progress: Math.min((record.current / record.milestone) * 100, 100) };
}

function TeamMark({ code, small = false }) {
  const team = TEAMS[code];
  return <span className={`team-mark ${small ? 'small' : ''}`} style={{ '--team-color': team.color }}>{team.name.slice(0, 2)}</span>;
}

function RecordMark({ record }) {
  if (record.scope === '구장') {
    return <span className="venue-mark"><MapPin size={21} /></span>;
  }
  return <TeamMark code={record.team} />;
}

function GameCard({ game, selected, favorite, onSelect }) {
  return (
    <button className={`game-card ${selected ? 'selected' : ''}`} onClick={() => onSelect(game.id)}>
      <span className="game-meta"><Clock3 size={13} /> {game.time} · {game.venue}</span>
      <span className="matchup">
        <span><TeamMark code={game.away} small /> <b>{TEAMS[game.away].name}</b></span>
        <em>vs</em>
        <span><TeamMark code={game.home} small /> <b>{TEAMS[game.home].name}</b></span>
      </span>
      <span className="weather">{game.weather}</span>
      {favorite && <Heart className="favorite-dot" size={14} fill="currentColor" />}
    </button>
  );
}

function RecordCard({ record, onOpen }) {
  const state = getRecordState(record);
  const game = GAMES[record.date].find((item) => item.id === record.game);
  return (
    <button className="record-card" onClick={() => onOpen(record)}>
      <span className="record-topline">
        <span className={`chance chance-${state.likelihood}`}>{state.likelihood}</span>
        <span className="record-game">{TEAMS[game.away].name} vs {TEAMS[game.home].name}</span>
      </span>
      <span className="player-row">
        <RecordMark record={record} />
        <span className="player-copy">
          <span className="player-name">{record.player || record.entity} <small>{record.role || `${record.scope} 기록`}</small></span>
          <strong>{record.title}</strong>
        </span>
        <ChevronRight size={20} />
      </span>
      <span className="progress-track"><span style={{ width: `${state.progress}%` }} /></span>
      <span className="progress-label">
        <span>현재 <b>{record.current.toLocaleString()}{record.unit}</b></span>
        <strong>{state.remaining}{record.unit} 남음</strong>
      </span>
    </button>
  );
}

function DetailSheet({ record, onClose }) {
  if (!record) return null;
  const state = getRecordState(record);
  const maxRecent = Math.max(...record.recent, 1);
  return (
    <div className="sheet-backdrop" onMouseDown={onClose}>
      <section className="detail-sheet" onMouseDown={(event) => event.stopPropagation()} aria-modal="true" role="dialog">
        <div className="sheet-handle" />
        <button className="icon-button close-button" onClick={onClose} aria-label="닫기"><X size={20} /></button>
        <div className="detail-heading">
          <RecordMark record={record} />
          <div><span>{record.scope === '구장' ? `${record.venue} · 구장 기록` : `${TEAMS[record.team].name} · ${record.role || '구단 기록'}`}</span><h2>{record.player || record.entity}</h2></div>
        </div>
        <div className="milestone-callout">
          <span><Target size={18} /> 오늘의 도전 기록</span>
          <h3>{record.title}</h3>
          <p>현재 {record.current.toLocaleString()}{record.unit} <b>· {state.remaining}{record.unit} 남음</b></p>
        </div>
        <div className="detail-section">
          <div className="section-title"><h3>{record.scope === '구장' ? '구장 현황' : '시즌 현황'}</h3><span>데모 입력값</span></div>
          <div className="stat-grid">
            {Object.entries(record.season).map(([label, value]) => <div key={label}><span>{label}</span><b>{value}</b></div>)}
          </div>
        </div>
        <div className="detail-section">
          <div className="section-title"><h3>최근 5경기</h3><span>경기별 {record.unit}</span></div>
          <div className="mini-chart">
            {record.recent.map((value, index) => (
              <div key={index}><span style={{ height: `${Math.max(8, (value / maxRecent) * 68)}px` }} /><b>{value}</b><small>{index + 1}G</small></div>
            ))}
          </div>
          <p className="insight"><Sparkles size={16} /> {record.note}</p>
        </div>
        <p className="demo-notice"><Info size={15} /> 이 화면의 선수 기록과 일정은 기능 확인용 샘플입니다.</p>
      </section>
    </div>
  );
}

function TeamSettings({ current, onSave, onClose }) {
  const [selected, setSelected] = useState(current);
  return (
    <div className="sheet-backdrop" onMouseDown={onClose}>
      <section className="team-sheet" onMouseDown={(event) => event.stopPropagation()} aria-modal="true" role="dialog">
        <div className="sheet-handle" />
        <button className="icon-button close-button" onClick={onClose} aria-label="닫기"><X size={20} /></button>
        <h2>선호팀 설정</h2>
        <p>선택한 팀의 경기와 기록을 먼저 보여드려요.</p>
        <div className="team-grid">
          {Object.entries(TEAMS).map(([code, team]) => (
            <button key={code} className={selected === code ? 'active' : ''} onClick={() => setSelected(code)}>
              <TeamMark code={code} /><span>{team.name}</span>{selected === code && <Check size={16} />}
            </button>
          ))}
        </div>
        <button className="primary-button" onClick={() => onSave(selected)}>선택 완료</button>
      </section>
    </div>
  );
}

function App() {
  const [date, setDate] = useState('2026-06-30');
  const [favoriteTeam, setFavoriteTeam] = useState(() => localStorage.getItem('favoriteTeamV2') || 'LG');
  const [selectedGame, setSelectedGame] = useState('all');
  const [scope, setScope] = useState('선수');
  const [role, setRole] = useState('전체');
  const [query, setQuery] = useState('');
  const [detail, setDetail] = useState(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [mobileView, setMobileView] = useState('records');

  const games = GAMES[date] || [];
  const records = useMemo(() => ALL_RECORDS
    .filter((record) => record.date === date)
    .filter((record) => (record.scope || '선수') === scope)
    .filter((record) => selectedGame === 'all' || record.game === selectedGame)
    .filter((record) => scope !== '선수' || role === '전체' || record.role === role)
    .filter((record) => !query || `${record.player || ''} ${record.entity || ''} ${record.title} ${TEAMS[record.team].name}`.includes(query.trim()))
    .sort((a, b) => Number(b.team === favoriteTeam) - Number(a.team === favoriteTeam) || getRecordState(a).remaining - getRecordState(b).remaining),
  [date, selectedGame, scope, role, query, favoriteTeam]);

  useEffect(() => setSelectedGame('all'), [date]);

  const changeDate = (direction) => {
    const index = DAYS.findIndex((day) => day.key === date);
    setDate(DAYS[Math.min(Math.max(index + direction, 0), DAYS.length - 1)].key);
  };

  const saveTeam = (team) => {
    setFavoriteTeam(team);
    localStorage.setItem('favoriteTeamV2', team);
    setSettingsOpen(false);
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand"><span className="brand-ball" /><span><b>기록앞에</b><small>오늘 만날 야구 기록</small></span></div>
        <button className="favorite-button" onClick={() => setSettingsOpen(true)}><TeamMark code={favoriteTeam} small /><span>{TEAMS[favoriteTeam].name}</span><Settings2 size={16} /></button>
      </header>

      <main>
        <section className="date-bar">
          <button className="icon-button" onClick={() => changeDate(-1)} aria-label="이전 날짜"><ArrowLeft size={19} /></button>
          <div><CalendarDays size={18} /><b>{date === '2026-06-30' ? '오늘' : `${Number(date.slice(5, 7))}월 ${Number(date.slice(8))}일`} · {DAYS.find((day) => day.key === date).day}요일</b><span className="demo-badge">DEMO</span></div>
          <button className="icon-button" onClick={() => changeDate(1)} aria-label="다음 날짜"><ArrowRight size={19} /></button>
        </section>

        <section className={`schedule-section ${mobileView !== 'schedule' ? 'mobile-panel-hidden' : ''}`}>
          <div className="section-title"><div><span className="eyebrow">GAME SCHEDULE</span><h1>오늘의 경기</h1></div><span>{games.length}경기</span></div>
          <div className="game-scroller">
            <button className={`game-card all-game ${selectedGame === 'all' ? 'selected' : ''}`} onClick={() => setSelectedGame('all')}>
              <span className="all-icon"><CalendarDays size={20} /></span><b>전체 경기</b><span>모든 기록 보기</span>
            </button>
            {games.map((game) => <GameCard key={game.id} game={game} selected={selectedGame === game.id} favorite={game.away === favoriteTeam || game.home === favoriteTeam} onSelect={(gameId) => { setSelectedGame(gameId); setMobileView('records'); }} />)}
          </div>
        </section>

        <section className={`records-section ${mobileView !== 'records' ? 'mobile-panel-hidden' : ''}`}>
          <div className="record-header">
            <div><span className="eyebrow">POSSIBLE RECORDS</span><h2>달성 가능 기록 <b>{records.length}</b></h2></div>
            <button className="icon-button desktop-search-toggle" aria-label="검색"><Search size={19} /></button>
          </div>
          <div className="scope-tabs" aria-label="기록 범위">
            {[
              { id: '선수', label: '선수 기록', icon: CircleUserRound },
              { id: '구단', label: '구단 기록', icon: Trophy },
              { id: '구장', label: '구장 기록', icon: MapPin },
            ].map(({ id, label, icon: Icon }) => (
              <button key={id} className={scope === id ? 'active' : ''} onClick={() => { setScope(id); setRole('전체'); setQuery(''); }}><Icon size={16} />{label}</button>
            ))}
          </div>
          <div className="tools-row">
            <label className="search-box"><Search size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="선수 또는 기록 검색" /></label>
            {scope === '선수' && <div className="segmented" aria-label="선수 유형">
              {['전체', '타자', '투수'].map((item) => <button key={item} className={role === item ? 'active' : ''} onClick={() => setRole(item)}>{item}</button>)}
            </div>}
          </div>
          {records.length > 0 ? (
            <div className="record-list">{records.map((record) => <RecordCard key={record.id} record={record} onOpen={setDetail} />)}</div>
          ) : (
            <div className="empty-state"><SlidersHorizontal size={28} /><h3>조건에 맞는 기록이 없어요</h3><p>다른 경기나 선수 유형을 선택해보세요.</p><button onClick={() => { setSelectedGame('all'); setRole('전체'); setQuery(''); }}>필터 초기화</button></div>
          )}
        </section>
      </main>

      <footer><span>기능 검토용 자체 계산 데모</span><p>KBO 및 구단의 공식 서비스가 아니며, 표시된 일정과 기록은 샘플 데이터입니다.</p></footer>

      <nav className="mobile-nav">
        <button className={mobileView === 'records' ? 'active' : ''} onClick={() => { setMobileView('records'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}><Target size={21} /><span>오늘 기록</span></button>
        <button className={mobileView === 'schedule' ? 'active' : ''} onClick={() => { setMobileView('schedule'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}><CalendarDays size={21} /><span>경기 일정</span></button>
        <button onClick={() => setSettingsOpen(true)}><CircleUserRound size={21} /><span>내 팀</span></button>
      </nav>

      <DetailSheet record={detail} onClose={() => setDetail(null)} />
      {settingsOpen && <TeamSettings current={favoriteTeam} onSave={saveTeam} onClose={() => setSettingsOpen(false)} />}
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
