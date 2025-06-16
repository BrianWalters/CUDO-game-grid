import {render} from 'preact';
import './style.css';
import {Game, getGames} from "./functions/getGames";
import {useEffect, useState} from 'preact/compat';

export function App() {
	const [games, setGames] = useState<Game[]>(null)

	useEffect(() => {
		if (!games) {
			getGames()
				.then(g => setGames(g))
		}
	}, [games, setGames])

	return (
		<div class="cudo-grid">
			{!games && 'Loading...'}
			{games && games.map(g => {
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
									<img alt="" src={`${i.url}?w=100`} />
								</a>
							))}
						</div>}
					</div>
				)
			})}
		</div>
	);
}
render(<App />, document.getElementById('cudo-game-grid'));
