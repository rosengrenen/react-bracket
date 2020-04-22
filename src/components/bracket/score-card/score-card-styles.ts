import styled from 'styled-components';

interface ScoreCardContentProps {
	winner: boolean;
}

export const ScoreCardContent = styled.div<ScoreCardContentProps>`
	background: ${({ winner }) => (winner ? 'green' : 'none')};
`;
