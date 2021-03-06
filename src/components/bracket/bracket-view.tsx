import React from 'react';
import {
	BracketWrapper,
	BracketChildWrapper,
	BracketContentWrapper,
	BracketHorizontalConnector,
	BracketVerticalConnectorWrapper,
	BracketVerticalConnectorFilled,
	BracketVerticalConnectorEmpty,
	BracketContentCardWrapper,
	BracketContentCard,
	BracketFlexWrapper,
} from './bracket-styles';
import ScoreCard from './score-card';
import { BracketMatch } from '../../utils/common-types';

interface InternalBracketProps {
	bracket: BracketMatch;
	first?: boolean;
}

const InternalBracket: React.FC<InternalBracketProps> = ({ bracket, first = false }) => {
	let marginTop = 0;
	let marginBottom = 0;
	if (bracket.lowerParent && bracket.upperParent) {
		const upperWidth = bracket.upperParent.width;
		const totalWidth = bracket.lowerParent.width + upperWidth;

		const upperMiddle = (upperWidth / 2 / totalWidth) * 100;

		if (upperMiddle > 25) {
			marginTop = 2 * (upperMiddle - 25);
		} else if (upperMiddle < 25) {
			marginBottom = 2 * (25 - upperMiddle);
		}
	}

	return (
		<BracketWrapper>
			{(bracket.upperParent || bracket.lowerParent) && (
				<BracketChildWrapper>
					{bracket.upperParent && <InternalBracket bracket={bracket.upperParent} />}
					{bracket.lowerParent && <InternalBracket bracket={bracket.lowerParent} />}
				</BracketChildWrapper>
			)}
			<BracketContentWrapper>
				{bracket.upperParent && bracket.lowerParent && (
					<BracketVerticalConnectorWrapper margin={marginTop + marginBottom}>
						{marginBottom > marginTop && <BracketVerticalConnectorFilled />}
						<BracketVerticalConnectorEmpty margin={marginTop + marginBottom} />
						{marginBottom <= marginTop && <BracketVerticalConnectorFilled />}
					</BracketVerticalConnectorWrapper>
				)}
				{(bracket.upperParent || bracket.lowerParent) && <BracketHorizontalConnector />}
				<BracketContentCardWrapper>
					<BracketContentCard>
						<ScoreCard
							score={bracket.upperTeamScore}
							team={bracket.upperTeam}
							winner={bracket.winner === 'upper'}
						/>
						<ScoreCard
							score={bracket.lowerTeamScore}
							team={bracket.lowerTeam}
							winner={bracket.winner === 'lower'}
						/>
					</BracketContentCard>
				</BracketContentCardWrapper>
				{!first && <BracketHorizontalConnector />}
			</BracketContentWrapper>
		</BracketWrapper>
	);
};

interface BracketProps {
	bracket: BracketMatch;
}

const Bracket: React.FC<BracketProps> = props => {
	return (
		<BracketFlexWrapper>
			<BracketFlexWrapper>
				<InternalBracket first {...props} />
			</BracketFlexWrapper>
		</BracketFlexWrapper>
	);
};

export default Bracket;
