import React from 'react';
import Svg, { Rect, Text as SvgText } from 'react-native-svg';

interface FrontCardProps {
  text: string;
  width: number;
  height: number;
}

const FrontCard: React.FC<FrontCardProps> = ({ text, width, height }) => {
  return (
    <Svg height={height} width={width} viewBox={`0 0 ${width} ${height}`}>
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
      <SvgText
        fill="black"
        fontFamily="Arial, sans-serif"
        fontSize="40"
        fontWeight="bold"
        textAnchor="middle"
        x={width / 2}
        y={height / 2 + 15}
      >
        {text}
      </SvgText>
    </Svg>
  );
};

export default FrontCard;