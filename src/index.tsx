import {render} from 'preact';
import './style.css';
import {getGames} from "./functions/getGames";
import {useEffect, useState} from 'preact/compat';

export function App() {
	const [games, setGames] = useState()

	useEffect(() => {
		if (!games) {
			getGames()
				.then(g => setGames(g))
		}
	}, [games])

	return (
		<div>
			<h1>Test</h1>
			<pre>{JSON.stringify(games, null, 2)}</pre>
		</div>
	);
}
render(<App />, document.getElementById('cudo-game-grid'));
