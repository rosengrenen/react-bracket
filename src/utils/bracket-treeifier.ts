import { Match, BracketMatch, Team } from './common-types';

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

export function treeifyMatches(
	matches: Map<string, Match>,
	teams: Map<string, Team>,
): BracketMatch {
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
