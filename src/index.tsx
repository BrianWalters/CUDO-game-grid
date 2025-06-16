import {render} from 'preact';
import './style.css';
import {gameSchema, getGames} from "./functions/getGames";
import {useEffect, useState} from 'preact/compat';
import {z} from "zod";

export function App() {
	const [games, setGames] = useState<Array<z.infer<typeof gameSchema>>>(null)

	useEffect(() => {
		if (!games) {
			getGames()
				.then(g => setGames(g))
		}
	}, [games, setGames])

	return (
		<div>
			<h1>Test</h1>
			<pre>{JSON.stringify(games, null, 2)}</pre>
		</div>
	);
}
render(<App />, document.getElementById('cudo-game-grid'));
