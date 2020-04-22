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

interface Team {
	id: string;
	name: string;
}

interface BracketMatch {
	id: string;
	leftParent: BracketMatch | null;
	rightParent: BracketMatch | null;
	leftTeam: Team | null;
	rightTeam: Team | null;
	width: number;
}

interface InternalBracketProps {
	bracket: BracketMatch;
	first?: boolean;
}

const InternalBracket: React.FC<InternalBracketProps> = ({ bracket, first = false }) => {
	let marginTop = 0;
	let marginBottom = 0;
	if (bracket.leftParent && bracket.rightParent) {
		const leftWidth = bracket.leftParent.width;
		const rightWidth = bracket.rightParent.width;
		const totalWidth = leftWidth + rightWidth;

		const rightMiddle = (rightWidth / 2 / totalWidth) * 100;

		if (rightMiddle > 25) {
			marginTop = rightMiddle - 25;
		} else if (rightMiddle < 25) {
			marginBottom = 25 - rightMiddle;
		}
	}
	return (
		<BracketWrapper>
			{(bracket.rightParent || bracket.leftParent) && (
				<BracketChildWrapper>
					{bracket.rightParent && <InternalBracket bracket={bracket.rightParent} />}
					{bracket.leftParent && <InternalBracket bracket={bracket.leftParent} />}
				</BracketChildWrapper>
			)}
			<BracketContentWrapper>
				{bracket.rightParent && bracket.leftParent && (
					<BracketVerticalConnectorWrapper margin={2 * (marginTop + marginBottom)}>
						{marginBottom > marginTop && <BracketVerticalConnectorFilled />}
						<BracketVerticalConnectorEmpty margin={2 * (marginTop + marginBottom)} />
						{marginBottom <= marginTop && <BracketVerticalConnectorFilled />}
					</BracketVerticalConnectorWrapper>
				)}
				{(bracket.rightParent || bracket.leftParent) && <BracketHorizontalConnector />}
				<BracketContentCardWrapper>
					<BracketContentCard>
						<div>{bracket.rightTeam ? bracket.rightTeam.name : 'TBD'}</div>
						<div>{bracket.leftTeam ? bracket.leftTeam.name : 'TBD'}</div>
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
