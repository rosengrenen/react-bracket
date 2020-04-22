import { BracketMatch, Team } from './common-types';
import { nanoid } from 'nanoid';

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

export function generateRandomBracket(): BracketMatch {
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
