'use client';
import type { ReactElement, ReactNode, ComponentType } from 'react';
import { forwardRef, Fragment, useImperativeHandle, useMemo, useRef } from 'react';
import { isValidElementType } from 'react-is';
import type { Product } from 'react-shop-types';
import type { ControlProps } from 'nuka-carousel';
import { useListContextWithProps, RecordContextProvider } from 'react-shop';
import type { SxProps } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import type { Theme } from '@mui/material/styles/createTheme';
import { CarouselMui, type CarouselMuiProps } from 'src/lib/widgets/CarouselMui';
import { ProductGridItem } from '../../product/ProductGridItem';
import { TitleBox } from '@views/TitleBox';
import {
  PrevArrowButton,
  NextArrowButton,
  type ButtonControlProps,
} from 'src/lib/widgets/Controls';
import { FlexBox, type FlexBoxProps } from '@views/FlexBox';
import { SliderLoader } from '../SliderLoader/SliderLoader';
import { StyledProductSlider } from './ProductSlider.styles';

export type ProductSliderProps = CarouselMuiProps & {
  title?: string | ReactElement | false;
  icon?: ReactElement;
  showArrows?: 'top' | 'center' | 'hover';
  sliderItem?: ComponentType<{ item?: Product }>;
  PrevArrowControl?: ControlComponentType;
  NextArrowControl?: ControlComponentType;
  TopControlsWrapper?: ComponentType<FlexBoxProps>;
  sx?: SxProps;
  titleSx?: SxProps;
};

export const ProductSlider = (props: ProductSliderProps) => {
  const isMediaMatch = useMediaQuery<Theme>(theme => theme.breakpoints.down('sm'));

  const {
    title,
    cellSpacing = 16,
    slidesToShow = isMediaMatch ? 2 : 4,
    icon,
    sx,
    titleSx,
    showArrows = isMediaMatch ? 'center' : 'top',
    sliderItem: SliderItem = ProductGridItem,
    PrevArrowControl = PrevArrowButton,
    NextArrowControl = NextArrowButton,
    TopControlsWrapper = FlexBox,
    ...rest
  } = props;

  const controlRef = useRef<ControlProps>(null);
  const { data = [], total, isPending } = useListContextWithProps(props);

  const sliderMode = data.length > slidesToShow;
  const renderEmpty = data == null || total === 0;

  const renderLoader = () => <SliderLoader slidesToShow={slidesToShow} cellSpacing={cellSpacing} />;

  const canRenderControlOnTop = useMemo(
    () => sliderMode && showArrows === 'top',
    [sliderMode, showArrows],
  );

  const canRenderControlOnCenter = useMemo(
    () => sliderMode && (showArrows === 'center' || showArrows === 'hover'),
    [sliderMode, showArrows],
  );

  const renderTopControls = () => (
    <TopControlsWrapper gap={2}>
      <TopControlButton
        Component={PrevArrowControl}
        previousSlide={() => controlRef.current?.previousSlide()}
        onUserNavigation={controlRef.current?.onUserNavigation}
      />
      <TopControlButton
        Component={NextArrowControl}
        nextSlide={() => controlRef.current?.nextSlide()}
        onUserNavigation={controlRef.current?.onUserNavigation}
      />
    </TopControlsWrapper>
  );

  return (
    <Fragment>
      {title !== false ? (
        <TitleBox title={title} icon={icon} sx={titleSx}>
          {canRenderControlOnTop ? renderTopControls() : null}
        </TitleBox>
      ) : null}
      {isPending ? (
        renderLoader()
      ) : renderEmpty ? null : (
        <StyledProductSlider sx={sx} hoverMode={showArrows === 'hover'}>
          <CarouselMui
            wrapAround={sliderMode}
            cellSpacing={cellSpacing}
            slidesToShow={slidesToShow}
            renderTopRightControls={props =>
              canRenderControlOnTop ? <ControlRefBtn {...props} ref={controlRef} /> : <Noop />
            }
            renderCenterLeftControls={props => (
              <CenterControlButton
                {...props}
                Component={canRenderControlOnCenter ? PrevArrowButton : Noop}
              />
            )}
            renderCenterRightControls={props => (
              <CenterControlButton
                {...props}
                Component={canRenderControlOnCenter ? NextArrowButton : Noop}
              />
            )}
            renderBottomCenterControls={Noop}
            {...rest}
          >
            {data.map((product: Product) => (
              <RecordContextProvider key={product.id} value={product}>
                <SliderItem item={product} />
              </RecordContextProvider>
            ))}
          </CarouselMui>
        </StyledProductSlider>
      )}
    </Fragment>
  );
};

type ControlComponentType = (props: ButtonControlProps) => ReactNode;

type ControlComponentProps = {
  Component: ControlComponentType;
} & Pick<ButtonControlProps, 'nextSlide' | 'previousSlide' | 'onUserNavigation'>;

const TopControlButton = ({ Component, ...props }: ControlComponentProps) =>
  isValidElementType(Component) ? (
    <Component {...props} size="small" sx={{ border: 1, borderColor: 'grey.300' }} />
  ) : (
    <Noop />
  );

const CenterControlButton = ({ Component, ...props }: ControlComponentProps) =>
  isValidElementType(Component) ? (
    <Component {...props} hideOnSmallDevice={false} sx={{ bgcolor: 'primary.main' }} />
  ) : (
    <Noop />
  );

// eslint-disable-next-line react/display-name
const ControlRefBtn = forwardRef<unknown, ControlProps>((props, ref) => {
  useImperativeHandle(
    ref,
    () => ({
      previousSlide: props.previousSlide,
      nextSlide: props.nextSlide,
      onUserNavigation: props.onUserNavigation,
    }),
    [props.nextSlide, props.previousSlide, props.onUserNavigation],
  );
  return <button style={{ display: 'none' }} />;
});

const Noop = () => null;
