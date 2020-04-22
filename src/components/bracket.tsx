import React from 'react';

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

interface Props {
	bracket: BracketMatch;
	first?: boolean;
}

const Bracket: React.FC<Props> = ({ bracket, first = false }) => {
	let count = 0;
	if (bracket.leftParent) {
		count++;
	}
	if (bracket.rightParent) {
		count++;
	}
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
		<div
			style={{ display: 'flex', flexGrow: 1, flexDirection: 'row', justifyContent: 'flex-end' }}
			id={bracket.id}
		>
			{(bracket.rightParent || bracket.leftParent) && (
				<div
					style={{
						// background: 'rgba(0, 0, 255, 0.5)',
						flexGrow: 1,
						display: 'flex',
						flexDirection: 'column',
					}}
				>
					{bracket.rightParent && <Bracket bracket={bracket.rightParent} />}
					{bracket.leftParent && <Bracket bracket={bracket.leftParent} />}
				</div>
			)}
			<div
				style={{
					// background: 'rgba(255, 0, 0, 0.5)',
					flexShrink: 0,
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					// padding: '10px 0',
				}}
			>
				{count === 2 && (
					<div
						style={{
							height: `calc(50% + ${marginBottom * 2 + marginTop * 2}% + 2px)`,
							display: 'flex',
							flexDirection: 'column',
						}}
					>
						{marginBottom > marginTop && (
							<div style={{ width: '2px', flexGrow: 1, background: 'black' }} />
						)}
						<div
							style={{
								width: '2px',
								flexBasis: `calc(${
									((2 * (marginBottom + marginTop)) / (2 * (marginBottom + marginTop) + 50)) * 100
								}% - 1px)`,
								flexShrink: 0,
							}}
						/>
						{marginBottom <= marginTop && (
							<div style={{ width: '2px', flexGrow: 1, background: 'black' }} />
						)}
					</div>
				)}
				{count >= 1 && <div style={{ width: '20px', height: '2px', background: 'black' }} />}
				<div style={{ width: '200px', padding: '10px 0 ' }}>
					<div style={{ background: 'cyan', border: '2px solid black' }}>
						<div>{bracket.rightTeam ? bracket.rightTeam.name : 'TBD'}</div>
						<div>{bracket.leftTeam ? bracket.leftTeam.name : 'TBD'}</div>
					</div>
				</div>
				{!first && <div style={{ width: '20px', height: '2px', background: 'black' }} />}
			</div>
		</div>
	);
};

const BrackerWrapper: React.FC<Props> = props => {
	console.log(props);
	return (
		<div style={{ display: 'flex' }}>
			<div
				style={{
					// background: 'green',
					display: 'flex',
				}}
			>
				<Bracket first {...props} />
			</div>
		</div>
	);
};

export default BrackerWrapper;
