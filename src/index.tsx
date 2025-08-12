import {render} from 'preact';
import './style.css';
import {Game, getGames} from "./functions/getGames";
import {useEffect, useState} from 'preact/compat';

export function App() {
    const [games, setGames] = useState<Game[]>(null)
    const [seasons, setSeasons] = useState<Season[]>(null)
    const [filterSelections, setFilterSelections] = useState<FilterSelections>({
        season: null
    })

    useEffect(() => {
        if (!games) {
            getGames()
                .then(gs => {
                    setGames(gs)
                    const seasons: Season[] = []
                    gs.forEach(g => {
                        const foundSeason = seasons.find(s => s.id === g.season._id)
                        if (!foundSeason)
                            seasons.push({
                                id: g.season._id,
                                name: g.season.name
                            })
                    })
                    seasons.sort((a, b) => {
                        return parseInt(a.name.slice(6)) - parseInt(b.name.slice(6));
                    })
                    setSeasons(seasons);
                })
        }
    }, [games, setGames])

    function gamesToShow() {
        return games
            .filter(g => {
                if (!filterSelections.season) return true

                return g.season._id === filterSelections.season;
            })
            .sort((a, b) => {
                if (b.name > a.name) return -1;
                return 1;
            })
    }

    return (
        <div class="cudo-grid">
            {!games && 'Loading...'}
            {games && <div>
                <div class="cudo-grid__controls">
                    <label>
                        <span class="cudo-grid__select-label">Season</span>
                        <select onChange={evt => setFilterSelections((prevState) => {
                            return {
                                ...prevState,
                                season: evt.currentTarget.value
                            }
                        })}
						value={filterSelections.season}>
                            <option value=""></option>
                            {seasons.map(s => {
                                return <option value={s.id}>{s.name}</option>
                            })}
                        </select>
                    </label>
                </div>
                <div class='cudo-grid__grid'>
                    {gamesToShow().map(g => {
                        return (
                            <div className="cudo-grid__game-card" key={g._id}>
                                <p class="cudo-grid__name">{g.name}</p>
                                <p>{g.minimumPlayers} - {g.maximumPlayers} players</p>
                                <p>{g.timeLower} - {g.timeUpper} minutes</p>
                                <p><strong>Designed by</strong></p>
                                <ul class="cudo-grid__list">
                                    {g.teamMembers.map(tm => (
                                        <li key={tm._id}>
                                            {tm.name}
                                        </li>
                                    ))}
                                </ul>
                                <p>{g.season.name}</p>
                                <ul class="cudo-grid__list">
                                    {g.awards.map(a => (
                                        <li key={a._id}>
                                            🥇 {a.name}
                                        </li>
                                    ))}
                                    {g.runnerUpAwards.map(a => (
                                        <li key={a._id}>
                                            🥈 {a.name}
                                        </li>
                                    ))}
                                </ul>
                                <p>{g.summary}</p>
                                {g.images && <div class="cudo-grid__gallery">
                                    {g.images.map(i => (
                                        <a key={i._id} href={i.url} target="_blank" rel="noreferrer">
                                            <img alt="" src={`${i.url}?w=100`}/>
                                        </a>
                                    ))}
                                </div>}
                            </div>
                        )
                    })}
                </div>
            </div>}
        </div>
    );
}

render(<App/>, document.getElementById('cudo-game-grid'));
