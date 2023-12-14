import classNames from 'classnames';
import cls from './Button.module.scss';
import { PropsWithChildren, MouseEvent, memo } from 'react';

export enum ButtonType {
  PRIMARY = "Primary",
  SECONDARY = "Secondary",
  CLEAR = "Clear"
}

interface ButtonProps extends PropsWithChildren {
  className?: string;
  onClick: (e?: MouseEvent<HTMLButtonElement>) => void;
  type?: ButtonType;
}

export const Button = memo((props: ButtonProps) => {
  const { className, onClick, children, type = ButtonType.PRIMARY } = props;
  return (
    <button className={classNames(cls.Button, { [cls[type]]: true }, [className])} onClick={onClick}>
      {children}
      <span className={cls.ripple}/>
    </button>
  );
});