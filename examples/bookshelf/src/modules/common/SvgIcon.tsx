import type { SVGProps } from 'react';

type SvgIconProps = SVGProps<SVGSVGElement> & {
  name: string;
  id: string;
  path?: string;
  title?: string;
};

export const SvgIcon = ({ id, name, path = '/icons', ...props }: SvgIconProps) => {
  return (
    <svg {...props}>
      <use href={`${path}/${name}.svg#${id.toLowerCase()}`} />
    </svg>
  );
};
