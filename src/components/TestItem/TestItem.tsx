import classNames from 'classnames';
import cls from './TestItem.module.scss';
import { Site, Status, Type } from '../../types/types';
import { Link, LinkType } from '../Link/Link';
import { getStatusColor, getTypeText } from '../../helpers';
import { memo } from 'react';

interface TestItemProps {
  className?: string;
  name: string;
  type: Type;
  status: Status;
  site: Site;
  id: number;
}

export const TestItem = memo((props: TestItemProps) => {
  const {
    className,
    name,
    type,
    status,
    site,
    id
  } = props;

  const NamedLink = status === Status.DRAFT
    ? <Link href={`finalize/${id}`} type={LinkType.SECONDARY}>Finalize</Link>
    : <Link href={`results/${id}`}>Results</Link>;

  return (
    <tr className={classNames(cls.TestItem, {}, [className])} style={{ borderLeftColor: site.color }}>
      <td className={cls.name}>{name}</td>
      <td className={cls.type}>{getTypeText(type)}</td>
      <td className={cls.status} style={{ color: getStatusColor(status) }}>{status.toLocaleLowerCase()}</td>
      <td className={cls.site}>{site.url}</td>
      {NamedLink}
    </tr>
  );
});