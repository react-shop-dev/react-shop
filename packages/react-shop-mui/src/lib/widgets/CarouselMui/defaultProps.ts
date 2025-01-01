import { ScrollMode } from 'nuka-carousel';

const easeOut = (t: number) => (t - 1) ** 3 + 1;

const defaultRenderAnnounceSlideMessage = ({
  currentSlide,
  count,
}: {
  currentSlide: number;
  count: number;
}): string => `Slide ${currentSlide + 1} of ${count}`;

export const defaultCarouselProps = {
  adaptiveHeight: false,
  adaptiveHeightAnimation: true,
  afterSlide: () => {},
  autoplay: false,
  autoplayInterval: 3000,
  autoplayReverse: false,
  beforeSlide: () => {},
  cellSpacing: 0,
  defaultControlsConfig: {},
  disableAnimation: false,
  disableEdgeSwiping: false,
  dragging: true,
  dragThreshold: 0.5,
  easing: easeOut,
  edgeEasing: easeOut,
  enableKeyboardControls: false,
  frameAriaLabel: 'Slider',
  keyCodeConfig: {
    nextSlide: [39, 68, 38, 87],
    previousSlide: [37, 65, 40, 83],
    firstSlide: [81],
    lastSlide: [69],
    pause: [32],
  },
  landmark: false,
  onDragStart: () => {},
  onDrag: () => {},
  onDragEnd: () => {},
  onUserNavigation: () => {},
  pauseOnHover: true,
  renderAnnounceSlideMessage: defaultRenderAnnounceSlideMessage,
  scrollMode: ScrollMode.page,
  style: {},
  swiping: true,
  tabbed: true,
  vertical: false,
  withoutControls: false,
};
