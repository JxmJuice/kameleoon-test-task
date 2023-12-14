import classNames from 'classnames';
import cls from './Link.module.scss';
import { PropsWithChildren, memo } from 'react';
import { Link as RouterLink } from "react-router-dom";

export enum LinkType {
  PRIMARY = "Primary",
  SECONDARY = "Secondary",
  CLEAR = "Clear"
}

interface LinkProps extends PropsWithChildren {
  className?: string;
  href: string;
  type?: LinkType;
}

export const Link = memo((props: LinkProps) => {
  const { className, href, children, type = LinkType.PRIMARY } = props;
  return (
    <RouterLink className={classNames(cls.Link, { [cls[type]]: true }, [className])} to={href}>
      {children}
      <span className={cls.ripple}/>
    </RouterLink>
  );
});