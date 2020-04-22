import React from 'react';
import Bracket from './bracket';

interface Match {
	id: string;
	lowerParentId: string | null;
	upperParentId: string | null;
	lowerTeamId: string | null;
	upperTeamId: string | null;
}

const matches: Match[] = [
	{
		id: '-1',
		lowerParentId: null,
		upperParentId: null,
		lowerTeamId: '6',
		upperTeamId: '4',
	},
	{
		id: '0',
		lowerParentId: '-1',
		upperParentId: null,
		lowerTeamId: '0',
		upperTeamId: '1',
	},
	{
		id: '1',
		lowerParentId: null,
		upperParentId: null,
		lowerTeamId: '2',
		upperTeamId: '3',
	},
	{
		id: '2',
		lowerParentId: '10',
		upperParentId: '100',
		lowerTeamId: '4',
		upperTeamId: '5',
	},
	{
		id: '3',
		lowerParentId: null,
		upperParentId: null,
		lowerTeamId: '6',
		upperTeamId: '7',
	},
	{
		id: '4',
		lowerParentId: '1',
		upperParentId: '0',
		lowerTeamId: null,
		upperTeamId: null,
	},
	{
		id: '5',
		lowerParentId: '3',
		upperParentId: '2',
		lowerTeamId: null,
		upperTeamId: null,
	},
	{
		id: '6',
		lowerParentId: '5',
		upperParentId: '4',
		lowerTeamId: null,
		upperTeamId: null,
	},
	{
		id: '10',
		lowerParentId: null,
		upperParentId: null,
		lowerTeamId: '4',
		upperTeamId: '5',
	},
	{
		id: '100',
		lowerParentId: null,
		upperParentId: '1000',
		lowerTeamId: '4',
		upperTeamId: '5',
	},
	{
		id: '1000',
		lowerParentId: '10000',
		upperParentId: '100000',
		lowerTeamId: '4',
		upperTeamId: '5',
	},
	{
		id: '10000',
		lowerParentId: null,
		upperParentId: null,
		lowerTeamId: '4',
		upperTeamId: '5',
	},
	{
		id: '100000',
		lowerParentId: '1000000',
		upperParentId: '99',
		lowerTeamId: '4',
		upperTeamId: '5',
	},
	{
		id: '1000000',
		lowerParentId: null,
		upperParentId: null,
		lowerTeamId: '4',
		upperTeamId: '5',
	},
	{
		id: '99',
		lowerParentId: null,
		upperParentId: null,
		lowerTeamId: '4',
		upperTeamId: '5',
	},
];

interface Team {
	id: string;
	name: string;
}

const teams: Team[] = [
	{
		id: '0',
		name: 'Team 0',
	},
	{
		id: '1',
		name: 'Team 1',
	},
	{
		id: '2',
		name: 'Team 2',
	},
	{
		id: '3',
		name: 'Team 3',
	},
	{
		id: '4',
		name: 'Team 4',
	},
	{
		id: '5',
		name: 'Team 5',
	},
	{
		id: '6',
		name: 'Team 6',
	},
	{
		id: '7',
		name: 'Team 7',
	},
];

interface BracketMatch {
	id: string;
	lowerParent: BracketMatch | null;
	upperParent: BracketMatch | null;
	lowerTeam: Team | null;
	upperTeam: Team | null;
	width: number;
}

function buildTree(
	currentMatch: Match,
	matches: Map<string, Match>,
	teams: Map<string, Team>,
): BracketMatch {
	let lowerTeam: Team | null;
	if (currentMatch.lowerTeamId !== null) {
		lowerTeam = teams.get(currentMatch.lowerTeamId) || null;
	} else {
		lowerTeam = null;
	}

	let upperTeam: Team | null;
	if (currentMatch.upperTeamId !== null) {
		upperTeam = teams.get(currentMatch.upperTeamId) || null;
	} else {
		upperTeam = null;
	}

	let lowerParent: BracketMatch | null;
	if (currentMatch.lowerParentId) {
		const match = matches.get(currentMatch.lowerParentId);
		if (!match) {
			throw new Error('Could not find match');
		}

		lowerParent = buildTree(match, matches, teams);
	} else {
		lowerParent = null;
	}

	let upperParent: BracketMatch | null;
	if (currentMatch.upperParentId) {
		const match = matches.get(currentMatch.upperParentId);
		if (!match) {
			throw new Error('Could not find match');
		}

		upperParent = buildTree(match, matches, teams);
	} else {
		upperParent = null;
	}

	let width: number;
	if (upperParent && lowerParent) {
		width = upperParent.width + lowerParent.width;
	} else if (upperParent) {
		width = upperParent.width;
	} else if (lowerParent) {
		width = lowerParent.width;
	} else {
		width = 1;
	}

	return {
		id: currentMatch.id,
		lowerTeam,
		upperTeam,
		lowerParent,
		upperParent,
		width,
	};
}

function treeFromFlat(matches: Map<string, Match>, teams: Map<string, Team>): BracketMatch {
	const independent = new Set<string>();
	matches.forEach(match => {
		independent.add(match.id);
	});

	matches.forEach(match => {
		if (match.lowerParentId !== null) {
			independent.delete(match.lowerParentId);
		}

		if (match.upperParentId !== null) {
			independent.delete(match.upperParentId);
		}
	});

	if (independent.size !== 1) {
		throw new Error('Invalid input');
	}

	const rootId = Array.from(independent)[0];
	const root = matches.get(rootId);
	if (!root) {
		throw new Error('Invalid input');
	}

	return buildTree(root, matches, teams);
}

const matchesMap = new Map<string, Match>();
const teamsMap = new Map<string, Team>();
matches.forEach(match => {
	matchesMap.set(match.id, match);
});
teams.forEach(team => {
	teamsMap.set(team.id, team);
});

const bracket = treeFromFlat(matchesMap, teamsMap);

function App() {
	return <Bracket bracket={bracket} />;
}

export default App;
