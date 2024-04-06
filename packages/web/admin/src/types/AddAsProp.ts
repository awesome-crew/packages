import { HTMLElementName } from './HTMLElementName';

export type AddAsProp<Props, Element extends HTMLElementName = 'button'> = Props & {
  as?: Element;
} & Omit<JSX.IntrinsicElements[Element], keyof Props>;
