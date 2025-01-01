'use client';
import Collapse from '@mui/material/Collapse';
import { useSpring, animated } from '@react-spring/web';
import type { TransitionProps } from '@mui/material/transitions';

export const TransitionMenuItem = (props: TransitionProps) => {
  const style = useSpring({
    from: {
      opacity: 0,
      transform: 'translate3d(0px,10px,0)',
    },
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(0px,${props.in ? 0 : 10}px,0)`,
    },
  });

  return (
    <animated.div style={style}>
      <Collapse {...props} />
    </animated.div>
  );
};
