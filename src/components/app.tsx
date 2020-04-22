import React, { useState, useCallback } from 'react';
import Bracket from './bracket';
import { nanoid } from 'nanoid';

interface Match {
	id: string;
	lowerParentId: string | null;
	upperParentId: string | null;
	lowerTeamId: string | null;
	upperTeamId: string | null;
	lowerTeamScore: number | null;
	upperTeamScore: number | null;
	winner: 'upper' | 'lower' | null;
}

const matches: Match[] = [
	{
		id: '0',
		lowerParentId: null,
		upperParentId: null,
		lowerTeamId: '0',
		upperTeamId: '1',
		lowerTeamScore: 0,
		upperTeamScore: 1,
		winner: 'upper',
	},
	{
		id: '1',
		lowerParentId: '4',
		upperParentId: '2',
		lowerTeamId: null,
		upperTeamId: null,
		lowerTeamScore: null,
		upperTeamScore: null,
		winner: null,
	},
	{
		id: '2',
		lowerParentId: null,
		upperParentId: '3',
		lowerTeamId: '12',
		upperTeamId: '14',
		lowerTeamScore: 2,
		upperTeamScore: 1,
		winner: null,
	},
	{
		id: '3',
		lowerParentId: null,
		upperParentId: null,
		lowerTeamId: '12',
		upperTeamId: '13',
		lowerTeamScore: 27,
		upperTeamScore: 5,
		winner: 'lower',
	},
	{
		id: '4',
		lowerParentId: '14',
		upperParentId: '5',
		lowerTeamId: null,
		upperTeamId: null,
		lowerTeamScore: null,
		upperTeamScore: null,
		winner: null,
	},
	{
		id: '5',
		lowerParentId: '6',
		upperParentId: '7',
		lowerTeamId: '10',
		upperTeamId: '8',
		lowerTeamScore: 4,
		upperTeamScore: 1,
		winner: 'lower',
	},
	{
		id: '6',
		lowerParentId: null,
		upperParentId: null,
		lowerTeamId: '10',
		upperTeamId: '11',
		lowerTeamScore: 7,
		upperTeamScore: 3,
		winner: 'lower',
	},
	{
		id: '7',
		lowerParentId: null,
		upperParentId: '8',
		lowerTeamId: '8',
		upperTeamId: '10',
		lowerTeamScore: 1,
		upperTeamScore: 0,
		winner: 'lower',
	},
	{
		id: '8',
		lowerParentId: null,
		upperParentId: null,
		lowerTeamId: '8',
		upperTeamId: '9',
		lowerTeamScore: 2,
		upperTeamScore: 1,
		winner: 'lower',
	},
	{
		id: '9',
		lowerParentId: '0',
		upperParentId: null,
		lowerTeamId: '2',
		upperTeamId: '1',
		lowerTeamScore: 2,
		upperTeamScore: 0,
		winner: 'lower',
	},
	{
		id: '10',
		lowerParentId: null,
		upperParentId: null,
		lowerTeamId: '3',
		upperTeamId: '4',
		lowerTeamScore: 1,
		upperTeamScore: 2,
		winner: 'upper',
	},
	{
		id: '11',
		lowerParentId: '10',
		upperParentId: '9',
		lowerTeamId: '4',
		upperTeamId: '2',
		lowerTeamScore: 3,
		upperTeamScore: 0,
		winner: 'lower',
	},
	{
		id: '12',
		lowerParentId: '11',
		upperParentId: null,
		lowerTeamId: '4',
		upperTeamId: '5',
		lowerTeamScore: 2,
		upperTeamScore: 2,
		winner: null,
	},
	{
		id: '13',
		lowerParentId: null,
		upperParentId: null,
		lowerTeamId: '6',
		upperTeamId: '7',
		lowerTeamScore: 1,
		upperTeamScore: 0,
		winner: 'lower',
	},
	{
		id: '14',
		lowerParentId: '13',
		upperParentId: '12',
		lowerTeamId: null,
		upperTeamId: null,
		lowerTeamScore: null,
		upperTeamScore: null,
		winner: null,
	},
];

interface Team {
	id: string;
	name: string;
}

const teams: Team[] = [
	{
		id: '0',
		name: 'Team Project',
	},
	{
		id: '1',
		name: 'Team Agile Kidz',
	},
	{
		id: '2',
		name: 'Team Omega',
	},
	{
		id: '3',
		name: 'Team Lmao',
	},
	{
		id: '4',
		name: 'Team Mega',
	},
	{
		id: '5',
		name: 'Team Cnonq',
	},
	{
		id: '6',
		name: 'Team Kek',
	},
	{
		id: '7',
		name: 'Team Lul',
	},
	{
		id: '8',
		name: 'Team A',
	},
	{
		id: '9',
		name: 'Team B',
	},
	{
		id: '10',
		name: 'Team C',
	},
	{
		id: '11',
		name: 'Team D',
	},
	{
		id: '12',
		name: 'Team Epicett',
	},
	{
		id: '13',
		name: 'Team Epictvå',
	},
	{
		id: '14',
		name: 'Team Epictree',
	},
];

interface BracketMatch {
	id: string;
	lowerParent: BracketMatch | null;
	upperParent: BracketMatch | null;
	lowerTeam: Team | null;
	upperTeam: Team | null;
	lowerTeamScore: number | null;
	upperTeamScore: number | null;
	winner: 'upper' | 'lower' | null;
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
		lowerTeamScore: currentMatch.lowerTeamScore,
		upperTeamScore: currentMatch.upperTeamScore,
		winner: currentMatch.winner,
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

function generateTeam() {
	const team: Team = {
		id: nanoid(),
		name: nanoid(6),
	};

	return team;
}

function generateRandomBracketInternal(
	continuationProbabilty: number,
	toBePlayedProbability: number,
	partiallyPlayedProbability: number,
	teamId: string | null,
	teams: Map<string, Team> = new Map(),
): BracketMatch {
	let upperTeam: Team | null = null;
	let lowerTeam: Team | null = null;
	let upperTeamScore: number | null = null;
	let lowerTeamScore: number | null = null;
	let winner: 'upper' | 'lower' | null = null;
	if (!teamId) {
		// previous was not played, so let's check if this one should be played
		if (Math.random() < toBePlayedProbability) {
			// this game should be played, generate two new teams, and their scores
			upperTeam = generateTeam();
			lowerTeam = generateTeam();
			teams.set(upperTeam.id, upperTeam);
			teams.set(lowerTeam.id, lowerTeam);

			let losingScore = Math.floor(Math.random() * 4);
			let winningScore = Math.ceil(Math.random() * 5) + losingScore;

			const winnerIsUpper = Math.random() < 0.5;

			upperTeamScore = winnerIsUpper ? winningScore : losingScore;
			lowerTeamScore = winnerIsUpper ? losingScore : winningScore;
			if (Math.random() < partiallyPlayedProbability) {
				winner = null;
			} else {
				winner = winnerIsUpper ? 'upper' : 'lower';
			}
		}
	} else {
		const losingTeam = generateTeam();
		teams.set(losingTeam.id, losingTeam);
		const winningTeam = teams.get(teamId);
		if (!winningTeam) {
			throw new Error('Should not happen');
		}

		let losingScore = Math.floor(Math.random() * 4);
		let winningScore = Math.ceil(Math.random() * 5) + losingScore;

		const winnerIsUpper = Math.random() < 0.5;
		if (winnerIsUpper) {
			winner = 'upper';
			upperTeam = winningTeam;
			upperTeamScore = winningScore;
			lowerTeam = losingTeam;
			lowerTeamScore = losingScore;
		} else {
			winner = 'lower';
			upperTeam = losingTeam;
			upperTeamScore = losingScore;
			lowerTeam = winningTeam;
			lowerTeamScore = winningScore;
		}
	}

	let upperParent: BracketMatch | null = null;
	if (Math.random() < continuationProbabilty) {
		upperParent = generateRandomBracketInternal(
			continuationProbabilty * 0.8,
			toBePlayedProbability * 1.2,
			partiallyPlayedProbability,
			upperTeam?.id || null,
			teams,
		);
	}

	let lowerParent: BracketMatch | null = null;
	if (Math.random() < continuationProbabilty) {
		lowerParent = generateRandomBracketInternal(
			continuationProbabilty * 0.8,
			toBePlayedProbability * 1.2,
			partiallyPlayedProbability,
			lowerTeam?.id || null,
			teams,
		);
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
		id: nanoid(),
		upperParent,
		lowerParent,
		lowerTeam,
		upperTeam,
		upperTeamScore,
		lowerTeamScore,
		width,
		winner,
	};
}

function generateRandomBracket(): BracketMatch {
	const continuationProbabilty = 0.9;
	const toBePlayedProbability = 0.4;
	const partiallyPlayedProbability = 0.5;
	const finishedProbability = 0.3;
	if (Math.random() < finishedProbability) {
		const team = generateTeam();
		const teams = new Map<string, Team>();
		teams.set(team.id, team);
		return generateRandomBracketInternal(continuationProbabilty, 0, 0, team.id, teams);
	} else {
		return generateRandomBracketInternal(
			continuationProbabilty,
			toBePlayedProbability,
			partiallyPlayedProbability,
			null,
		);
	}
}

const matchesMap = new Map<string, Match>();
const teamsMap = new Map<string, Team>();
matches.forEach(match => {
	matchesMap.set(match.id, match);
});
teams.forEach(team => {
	teamsMap.set(team.id, team);
});

function App() {
	const [bracket, setBracket] = useState(treeFromFlat(matchesMap, teamsMap));

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
