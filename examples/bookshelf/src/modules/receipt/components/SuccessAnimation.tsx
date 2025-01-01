'use client';

import { styled, keyframes } from '@mui/material/styles';

export const SuccessAnimation = () => (
  <CheckmarkSvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36">
    <CheckmarkCircle cx="18" cy="18" r="17" fill="none" />
    <CheckmarkCheck fill="none" d="M12.6 18.2l5.8 5.8 13.7-13.8" />
  </CheckmarkSvg>
);

const scale = keyframes`
  0%, 100% {
    transform: none;
  }

  50% {
    transform: scale3d(1.1, 1.1, 1);
  }
`;

const fill = keyframes`
  100% {
    box-shadow: inset 0px 0px 0px 30px var(--shop-palette-success-main);
  }
`;

const stroke = keyframes`
  100% {
    stroke-dashoffset: 0;
  }
`;

const CheckmarkSvg = styled('svg')`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: block;
  stroke-width: 2;
  stroke: var(--shop-palette-success-main);
  stroke-miterlimit: 10;
  box-shadow: inset 0px 0px 0px var(--shop-palette-success-main);
  animation:
    ${fill} 0.4s ease-in-out 0.4s forwards,
    ${scale} 0.3s ease-in-out 0.9s both;
  margin: 0 auto;
`;

const CheckmarkCircle = styled('circle')`
  stroke-dasharray: 106;
  stroke-dashoffset: 106;
  stroke-width: 2;
  stroke-miterlimit: 10;
  stroke: var(--shop-palette-success-main);
  fill: #fff;
  animation: ${stroke} 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
`;

const CheckmarkCheck = styled('path')`
  transform-origin: 50% 50%;
  stroke-dasharray: 24;
  stroke-dashoffset: 24;
  animation: ${stroke} 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
`;
