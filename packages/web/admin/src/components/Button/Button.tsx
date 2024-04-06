import {
  ButtonHTMLAttributes,
  ComponentProps,
  ReactElement,
  createContext,
  useContext,
} from 'react';
import { AddAsProp } from '../../types/AddAsProp';
import { ButtonSize, ButtonType } from './types';
import { Stack, padding } from '@toss/emotion-utils';
import { match } from 'ts-pattern';
import { HTMLElementName } from '../../types/HTMLElementName';
import { colors } from '../../constants/colors';
import { Icon } from '../Icon';

type ButtonElementProps = ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonProps<Element extends HTMLElementName> = AddAsProp<
  {
    type?: ButtonType;
    size?: ButtonSize;
    htmlType?: ButtonElementProps['type'];
    leftAddon?: ReactElement;
    rightAddon?: ReactElement;
  },
  Element
>;

const ButtonContext = createContext<Required<Pick<ButtonProps<'button'>, 'type' | 'size'>>>({
  type: ButtonType.default,
  size: ButtonSize.default,
});

export function Button<Element extends HTMLElementName = 'button'>({
  type = ButtonType.default,
  size = ButtonSize.default,
  htmlType = 'button',
  leftAddon,
  rightAddon,
  children,
  ...props
}: ButtonProps<Element>) {
  const { backgroundColor, color } = getButtonTypeStyle(type);
  const { gutter, height, paddingX, fontSize, fontWeight } = getButtonSizeStyle(size);

  return (
    <ButtonContext.Provider value={{ type, size }}>
      <Stack.Horizontal
        align="center"
        css={[
          { backgroundColor, height },
          padding({ x: paddingX }),
          { borderRadius: 5, width: 'fit-content' },
        ]}
        gutter={gutter}
        type={htmlType}
        {...props}
      >
        {leftAddon}
        <p css={{ color, fontSize, fontWeight }}>{children}</p>
        {rightAddon}
      </Stack.Horizontal>
    </ButtonContext.Provider>
  );
}

function getButtonTypeStyle(type: ButtonType) {
  return match(type)
    .with(ButtonType.default, () => ({
      backgroundColor: colors.greyAlpha50,
      color: colors.grey500,
    }))
    .with(ButtonType.primary, () => ({ backgroundColor: colors.blue500, color: colors.white }))
    .with(ButtonType.secondary, () => ({ backgroundColor: colors.blue50, color: colors.blue500 }))
    .with(ButtonType.danger, () => ({ backgroundColor: colors.red50, color: colors.red500 }))
    .exhaustive();
}
function getButtonSizeStyle(size: ButtonSize) {
  return match(size)
    .with(ButtonSize.small, () => ({
      gutter: 4,
      height: 24,
      paddingX: 8,
      fontSize: 12,
      fontWeight: 500,
    }))
    .with(ButtonSize.default, () => ({
      gutter: 4,
      height: 28,
      paddingX: 10,
      fontSize: 12,
      fontWeight: 500,
    }))
    .with(ButtonSize.large, () => ({
      gutter: 4,
      height: 36,
      paddingX: 12,
      fontSize: 16,
      fontWeight: 500,
    }))
    .with(ButtonSize.xlarge, () => ({
      gutter: 8,
      height: 40,
      paddingX: 16,
      fontSize: 16,
      fontWeight: 700,
    }))
    .exhaustive();
}

Button.Icon = function ButtonIcon({ name }: Pick<ComponentProps<typeof Icon>, 'name'>) {
  const { type, size } = useContext(ButtonContext);

  return <Icon name={name} size={getButtonIconSize(size)} color={getButtonIconColor(type)} />;
};

function getButtonIconSize(size: ButtonSize) {
  return match(size)
    .with(ButtonSize.small, () => 12)
    .with(ButtonSize.default, () => 12)
    .with(ButtonSize.large, () => 16)
    .with(ButtonSize.xlarge, () => 16)
    .exhaustive();
}
function getButtonIconColor(type: ButtonType) {
  return match(type)
    .with(ButtonType.primary, () => colors.white)
    .with(ButtonType.secondary, () => colors.blue500)
    .with(ButtonType.default, () => colors.grey500)
    .with(ButtonType.danger, () => colors.red500)
    .exhaustive();
}
