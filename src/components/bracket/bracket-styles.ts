import styled from 'styled-components';

const CONNECTOR_LINE_LENGTH = 40;
const CONNECTOR_LINE_LENGTH_PX = `${CONNECTOR_LINE_LENGTH}px`;
const CONNECTOR_LINE_THICKNESS = 2;
const CONNECTOR_LINE_THICKNESS_PX = `${CONNECTOR_LINE_THICKNESS}px`;
const CONNECTOR_LINE_THICKNESS_PX_HALF = `${CONNECTOR_LINE_THICKNESS / 2}px`;

// Layout
export const BracketWrapper = styled.div`
	display: flex;
	flex-grow: 1;
	flexdirection: row;
	justify-content: flex-end;
`;

export const BracketChildWrapper = styled.div`
	flex-grow: 1;
	display: flex;
	flex-direction: column;
`;

export const BracketContentWrapper = styled.div`
	flex-shrink: 0;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const BracketFlexWrapper = styled.div`
	display: flex;
`;

// Connectors
export const BracketHorizontalConnector = styled.div`
	width: ${CONNECTOR_LINE_LENGTH_PX};
	height: ${CONNECTOR_LINE_THICKNESS_PX};
	background: black;
`;

interface BracketVerticalConnectorWrapperProps {
	margin: number;
}

export const BracketVerticalConnectorWrapper = styled.div<BracketVerticalConnectorWrapperProps>`
	height: calc(50% + ${({ margin }) => margin}% + ${CONNECTOR_LINE_THICKNESS_PX});
	display: flex;
	flex-direction: column;
`;

export const BracketVerticalConnectorFilled = styled.div`
	width: ${CONNECTOR_LINE_THICKNESS_PX};
	flex-grow: 1;
	background: black;
`;

interface BracketVerticalConnectorEmptyProps {
	margin: number;
}

export const BracketVerticalConnectorEmpty = styled.div<BracketVerticalConnectorEmptyProps>`
	width: ${CONNECTOR_LINE_THICKNESS_PX};
	flex-basis: calc(
		${({ margin }) => (margin / (margin + 50)) * 100}% - ${CONNECTOR_LINE_THICKNESS_PX_HALF}
	);
	flex-shrink: 0;
`;

// Card
export const BracketContentCardWrapper = styled.div`
	width: 200px;
	padding: 10px 0;
`;

export const BracketContentCard = styled.div`
	background: cyan;
	padding: 5px;
	border: 2px solid black;
`;
