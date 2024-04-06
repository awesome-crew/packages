import {
  ButtonHTMLAttributes,
  ComponentProps,
  ReactElement,
  ReactNode,
  createContext,
  useContext,
} from 'react';
import { ButtonSize, ButtonType } from './types';
import { Stack, padding } from '@toss/emotion-utils';
import { match } from 'ts-pattern';
import { colors } from '../../constants/colors';
import { Icon } from '../Icon';

type ButtonElementProps = ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonProps = {
  type?: ButtonType;
  size?: ButtonSize;
  htmlType?: ButtonElementProps['type'];
  leftAddon?: ReactElement;
  rightAddon?: ReactElement;
  children: ReactNode;
};

const ButtonContext = createContext<Required<Pick<ButtonProps, 'type' | 'size'>>>({
  type: ButtonType.default,
  size: ButtonSize.default,
});

export function Button({
  type = ButtonType.default,
  size = ButtonSize.default,
  htmlType = 'button',
  leftAddon,
  rightAddon,
  children,
  ...props
}: ButtonProps) {
  const { backgroundColor, hoverBackgroundColor, color } = getButtonTypeStyle(type);
  const { gutter, height, paddingX, fontSize, fontWeight } = getButtonSizeStyle(size);

  return (
    <ButtonContext.Provider value={{ type, size }}>
      <Stack.Horizontal
        align="center"
        css={[
          { backgroundColor, height, ['&: hover']: { backgroundColor: hoverBackgroundColor } },
          padding({ x: paddingX }),
          {
            borderRadius: 5,
            width: 'fit-content',
            outline: 'none',
            border: 'none',
            transition: 'background-color 0.2s',
          },
        ]}
        gutter={gutter}
        type={htmlType}
        as="button"
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
      hoverBackgroundColor: colors.greyAlpha100,
      color: colors.grey500,
    }))
    .with(ButtonType.primary, () => ({
      backgroundColor: colors.blue500,
      hoverBackgroundColor: colors.blue600,
      color: colors.white,
    }))
    .with(ButtonType.secondary, () => ({
      backgroundColor: colors.blue50,
      hoverBackgroundColor: colors.blue100,
      color: colors.blue500,
    }))
    .with(ButtonType.danger, () => ({
      backgroundColor: colors.red50,
      hoverBackgroundColor: colors.red100,
      color: colors.red500,
    }))
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
