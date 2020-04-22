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
}

interface Props {
	bracket: BracketMatch;
}

const Bracket: React.FC<Props> = ({ bracket }) => {
	return (
		<div
			style={{ display: 'flex', flexGrow: 1, flexDirection: 'row', justifyContent: 'flex-end' }}
			id={bracket.id}
		>
			{(bracket.rightParent || bracket.leftParent) && (
				<div
					style={{
						background: 'rgba(0, 0, 255, 0.5)',
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
					background: 'rgba(255, 0, 0, 0.5)',
					flexShrink: 0,
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					padding: '10px 0',
				}}
			>
				<div style={{ width: '2px', height: 'calc(50% + 12px)', background: 'black' }} />
				<div style={{ width: '20px', height: '2px', background: 'black' }} />
				<div style={{ width: '200px', background: 'cyan', border: '2px solid black' }}>
					<div>{bracket.rightTeam ? bracket.rightTeam.name : 'TBD'}</div>
					<div>{bracket.leftTeam ? bracket.leftTeam.name : 'TBD'}</div>
				</div>
				<div style={{ width: '20px', height: '2px', background: 'black' }} />
			</div>
		</div>
	);
};

const BrackerWrapper: React.FC<Props> = props => {
	console.log(props);
	return (
		<div style={{ display: 'flex' }}>
			<div style={{ background: 'green', display: 'flex' }}>
				<Bracket {...props} />
			</div>
		</div>
	);
};

export default BrackerWrapper;
