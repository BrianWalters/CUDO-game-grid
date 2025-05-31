import { render } from 'preact';

import './style.css';

export function App() {
	return (
		<div>
			Hello world
		</div>
	);
}

render(<App />, document.getElementById('cudo-game-grid'));
