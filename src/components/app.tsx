import React from 'react';
import Bracket from './bracket';

interface Match {
	id: string;
	leftParentId: string | null;
	rightParentId: string | null;
	leftTeamId: string | null;
	rightTeamId: string | null;
}

const matches: Match[] = [
	{
		id: '-1',
		leftParentId: null,
		rightParentId: null,
		leftTeamId: '6',
		rightTeamId: '4',
	},
	{
		id: '0',
		leftParentId: '-1',
		rightParentId: null,
		leftTeamId: '0',
		rightTeamId: '1',
	},
	{
		id: '1',
		leftParentId: null,
		rightParentId: null,
		leftTeamId: '2',
		rightTeamId: '3',
	},
	{
		id: '2',
		leftParentId: '10',
		rightParentId: '100',
		leftTeamId: '4',
		rightTeamId: '5',
	},
	{
		id: '3',
		leftParentId: null,
		rightParentId: null,
		leftTeamId: '6',
		rightTeamId: '7',
	},
	{
		id: '4',
		leftParentId: '1',
		rightParentId: '0',
		leftTeamId: null,
		rightTeamId: null,
	},
	{
		id: '5',
		leftParentId: '3',
		rightParentId: '2',
		leftTeamId: null,
		rightTeamId: null,
	},
	{
		id: '6',
		leftParentId: '5',
		rightParentId: '4',
		leftTeamId: null,
		rightTeamId: null,
	},
	{
		id: '10',
		leftParentId: null,
		rightParentId: null,
		leftTeamId: '4',
		rightTeamId: '5',
	},
	{
		id: '100',
		leftParentId: null,
		rightParentId: '1000',
		leftTeamId: '4',
		rightTeamId: '5',
	},
	{
		id: '1000',
		leftParentId: null,
		rightParentId: null,
		leftTeamId: '4',
		rightTeamId: '5',
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
	leftParent: BracketMatch | null;
	rightParent: BracketMatch | null;
	leftTeam: Team | null;
	rightTeam: Team | null;
}

function buildTree(
	currentMatch: Match,
	matches: Map<string, Match>,
	teams: Map<string, Team>,
): BracketMatch {
	let leftTeam: Team | null;
	if (currentMatch.leftTeamId !== null) {
		leftTeam = teams.get(currentMatch.leftTeamId) || null;
	} else {
		leftTeam = null;
	}

	let rightTeam: Team | null;
	if (currentMatch.rightTeamId !== null) {
		rightTeam = teams.get(currentMatch.rightTeamId) || null;
	} else {
		rightTeam = null;
	}

	let leftParent: BracketMatch | null;
	if (currentMatch.leftParentId) {
		const match = matches.get(currentMatch.leftParentId);
		if (!match) {
			throw new Error('Could not find match');
		}

		leftParent = buildTree(match, matches, teams);
	} else {
		leftParent = null;
	}

	let rightParent: BracketMatch | null;
	if (currentMatch.rightParentId) {
		const match = matches.get(currentMatch.rightParentId);
		if (!match) {
			throw new Error('Could not find match');
		}

		rightParent = buildTree(match, matches, teams);
	} else {
		rightParent = null;
	}

	return {
		id: currentMatch.id,
		leftTeam,
		rightTeam,
		leftParent,
		rightParent,
	};
}

function treeFromFlat(matches: Map<string, Match>, teams: Map<string, Team>): BracketMatch {
	const independent = new Set<string>();
	matches.forEach(match => {
		independent.add(match.id);
	});

	matches.forEach(match => {
		if (match.leftParentId !== null) {
			independent.delete(match.leftParentId);
		}

		if (match.rightParentId !== null) {
			independent.delete(match.rightParentId);
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
