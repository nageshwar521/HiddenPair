import React from 'react';
import Svg, { Rect, Line, Defs } from 'react-native-svg';

interface BackCardProps {
  width: number;
  height: number;
}

const BackCard: React.FC<BackCardProps> = ({ width, height }) => {
  return (
    <Svg height={height} width={width}>
      <Defs />
      <Rect
        fill="white"
        height={height}
        rx="10"
        ry="10"
        stroke="black"
        strokeWidth="2"
        width={width}
        x="0"
        y="0"
      />
      <Line stroke="black" strokeWidth="1.5" x1="0" x2="0" y1="0" y2="0" />
      <Line stroke="black" strokeWidth="1.5" x1="10" x2="0" y1="0" y2="10" />
      <Line stroke="black" strokeWidth="1.5" x1="20" x2="0" y1="0" y2="20" />
      <Line stroke="black" strokeWidth="1.5" x1="30" x2="0" y1="0" y2="30" />
      <Line stroke="black" strokeWidth="1.5" x1="40" x2="0" y1="0" y2="40" />
      <Line stroke="black" strokeWidth="1.5" x1="50" x2="0" y1="0" y2="50" />
      <Line stroke="black" strokeWidth="1.5" x1="60" x2="0" y1="0" y2="60" />
      <Line stroke="black" strokeWidth="1.5" x1="70" x2="0" y1="0" y2="70" />
      <Line stroke="black" strokeWidth="1.5" x1="80" x2="0" y1="0" y2="80" />
      <Line stroke="black" strokeWidth="1.5" x1="90" x2="0" y1="0" y2="90" />
      <Line stroke="black" strokeWidth="1.5" x1="100" x2="0" y1="0" y2="100" />
      <Line stroke="black" strokeWidth="1.5" x1="100" x2="0" y1="10" y2="110" />
      <Line stroke="black" strokeWidth="1.5" x1="100" x2="0" y1="20" y2="120" />
      <Line stroke="black" strokeWidth="1.5" x1="100" x2="0" y1="30" y2="130" />
      <Line stroke="black" strokeWidth="1.5" x1="100" x2="0" y1="40" y2="140" />
      <Line stroke="black" strokeWidth="1.5" x1="100" x2="0" y1="50" y2="150" />
      <Line stroke="black" strokeWidth="1.5" x1="100" x2="10" y1="60" y2="150" />
      <Line stroke="black" strokeWidth="1.5" x1="100" x2="20" y1="70" y2="150" />
      <Line stroke="black" strokeWidth="1.5" x1="100" x2="30" y1="80" y2="150" />
      <Line stroke="black" strokeWidth="1.5" x1="100" x2="40" y1="90" y2="150" />
      <Line stroke="black" strokeWidth="1.5" x1="100" x2="50" y1="100" y2="150" />
      <Line stroke="black" strokeWidth="1.5" x1="100" x2="60" y1="110" y2="150" />
    </Svg>
  );
};

export default BackCard;