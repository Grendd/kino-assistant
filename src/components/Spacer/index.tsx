import React from 'react';

interface SpacerProps {
    size: number
}
const Spacer = ({size}: SpacerProps) => (
    <div style={{width: '100%', height: `${size * 4}px`}} />
);

export default Spacer;