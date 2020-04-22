export interface Match {
	id: string;
	lowerParentId: string | null;
	upperParentId: string | null;
	lowerTeamId: string | null;
	upperTeamId: string | null;
	lowerTeamScore: number | null;
	upperTeamScore: number | null;
	winner: 'upper' | 'lower' | null;
}

export interface Team {
	id: string;
	name: string;
}

export interface BracketMatch {
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
