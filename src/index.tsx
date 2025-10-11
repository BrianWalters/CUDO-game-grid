import {render} from 'preact';
import './style.css';
import {getGames} from "./functions/getGames";
import {useEffect, useState} from 'preact/compat';
import {Game} from "./types/GameSchema";
import {makeDuration} from "./functions/makeDuration";
import {makePlayers} from "./functions/makePlayers";

export function App() {
    const [games, setGames] = useState<Game[]>(null)
    const [seasons, setSeasons] = useState<Season[]>(null)
    const [awards, setAwards] = useState<Award[]>()
    const [filterSelections, setFilterSelections] = useState<FilterSelections>({
        season: null,
        award: null,
        search: null,
    })

    useEffect(() => {
        if (!games) {
            getGames()
                .then(gs => {
                    setGames(gs)
                    const seasons: Season[] = []
                    const awards: Award[] = [];
                    gs.forEach(g => {
                        const foundSeason = seasons.find(s => s.id === g.season._id)
                        if (!foundSeason)
                            seasons.push({
                                id: g.season._id,
                                name: g.season.name
                            })
                        const awardsOnGame = [...g.awards, ...g.runnerUpAwards];
                        awardsOnGame.forEach(aog => {
                            const foundAward = awards.find(a => a.id === aog._id)
                            if (!foundAward)
                                awards.push({
                                    id: aog._id,
                                    name: aog.name
                                })
                        })
                    })
                    seasons.sort((a, b) => {
                        return parseInt(a.name.slice(6)) - parseInt(b.name.slice(6));
                    })
                    awards.sort((a, b) => {
                        if (b.name > a.name) return -1;
                        return 1;
                    })
                    setSeasons(seasons);
                    setAwards(awards);
                    setFilterSelections({
                        award: null,
                        season: seasons[seasons.length - 1].id,
                        search: null,
                    })
                })
        }
    }, [games, setGames])

    function gamesToShow() {
        return games
            .filter(g => {
                if (!filterSelections.season) return true

                return g.season._id === filterSelections.season;
            })
            .filter(g => {
                if (!filterSelections.award) return true;
                const gameAwards = [...g.awards, ...g.runnerUpAwards];
                return gameAwards.find(ga => ga._id === filterSelections.award);
            })
            .filter(g => {
                if (!filterSelections.search) return true;
                const searchLowerCase = filterSelections.search.toLowerCase();
                if (g.name.toLowerCase().search(searchLowerCase) > -1) return true;
                return g.summary.toLowerCase().search(searchLowerCase) > -1;

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
                        <span className="cudo-grid__select-label">Season</span>
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
                    <label>
                        <span className="cudo-grid__select-label">Award</span>
                        <select onChange={evt => setFilterSelections((prevState) => {
                            return {
                                ...prevState,
                                award: evt.currentTarget.value
                            }
                        })}
                                value={filterSelections.award}>
                            <option value=""></option>
                            {awards.map(a => {
                                return <option value={a.id}>{a.name}</option>
                            })}
                        </select>
                    </label>
                    <label>
                        <span className="cudo-grid__select-label">Search</span>
                        <input type="search" onInput={(event) => {
                            setFilterSelections(prevState => {
                                return {
                                    ...prevState,
                                    search: event.currentTarget.value
                                }
                            })
                        }} />
                    </label>
                    <div>
                        Legend:
                        🥇 Award winner
                        🥈 Runner-up
                    </div>
                </div>
                {!gamesToShow() && <div>Nothing matches these filters.</div>}
                <div class='cudo-grid__grid'>
                    {gamesToShow().map(g => {
                        return (
                            <div className="cudo-grid__game-card" key={g._id}>
                                <p class="cudo-grid__name">{g.name}</p>
                                <p>{makePlayers(g)}</p>
                                <p>{makeDuration(g)}</p>
                                <ul class="cudo-grid__designer-list">
                                    {g.teamMembers.map(tm => (
                                        <li key={tm._id}>
                                            {tm.name}
                                        </li>
                                    ))}
                                </ul>
                                <p>{g.season.name}</p>
                                <ul class="cudo-grid__award-list">
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
                                {g.images && g.images.length > 0 &&
                                    <img className="cudo-grid__image" alt="" src={`${g.images[0].url}?w=800`}/>
                                }
                                {g.images && g.images.length > 1 && <details className="cudo-grid__gallery-details">
                                    <summary className="cudo-grid__gallery-summary">
                                        More game images
                                    </summary>
                                    <div className="cudo-grid__gallery">
                                        {g.images.slice(1).map(i => (
                                            <a key={i._id} href={i.url} target="_blank" rel="noreferrer">
                                                <img className="cudo-grid__image" alt="" src={`${i.url}?w=800`}/>
                                            </a>
                                        ))}
                                    </div>
                                </details>}
                            </div>
                        )
                    })}
                </div>
            </div>}
        </div>
    );
}

render(<App/>, document.getElementById('cudo-game-grid'));
