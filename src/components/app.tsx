import React, { useState, useCallback } from 'react';
import Bracket from './bracket';
import { matches, teams } from '../utils/consts';
import { Team, Match } from '../utils/common-types';
import { treeifyMatches } from '../utils/bracket-treeifier';
import { generateRandomBracket } from '../utils/random-bracket';

const matchesMap = new Map<string, Match>();
const teamsMap = new Map<string, Team>();
matches.forEach(match => {
	matchesMap.set(match.id, match);
});
teams.forEach(team => {
	teamsMap.set(team.id, team);
});

function App() {
	const [bracket, setBracket] = useState(treeifyMatches(matchesMap, teamsMap));

	const handleGenerateBracket = useCallback(() => {
		setBracket(generateRandomBracket());
	}, []);

	return (
		<div>
			<Bracket bracket={bracket} />
			<button onClick={handleGenerateBracket}>Generate random bracket</button>
		</div>
	);
}

export default App;
