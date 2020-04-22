import React from 'react';
import { ScoreCardContent } from './score-card-styles';

interface Team {
	id: string;
	name: string;
}

interface Match {
	team: Team | null;
	teamScore: number | null;
	winner: boolean | null;
}

interface Props {
	team: Team | null;
	score: number | null;
	winner: boolean | null;
}

const ScoreCardView: React.FC<Props> = ({ team, score, winner }) => {
	return (
		<ScoreCardContent winner={!!winner}>
			{team ? team.name : 'TBD'}
			{score !== null ? `: ${score}` : ''}
		</ScoreCardContent>
	);
};

export default ScoreCardView;
