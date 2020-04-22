import React from 'react';
import { ScoreCardContent } from './score-card-styles';
import { Team } from '../../../utils/common-types';

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
