import { CarOutlined, StopTwoTone, UserOutlined } from '@ant-design/icons';
import { useDraggable } from '@dnd-kit/core';
import { Tooltip } from 'antd';
import { ITruck, IUser, IUserAttributes, QueryType } from 'models';
import { CSS } from '@dnd-kit/utilities';
import classNames from 'classnames';

import styles from './dispatch.module.scss';

interface SingleTruckProps {
  resource: ITruck | IUserAttributes | IUser;
  resourceName: string;
  isTagStyle?: boolean;
  crewId?: number | string;
}

const CN = 'resources';

export function SingleResource({ resource, resourceName, isTagStyle = false, crewId }: SingleTruckProps) {
  const isActive = (resource as ITruck)?.attributes?.active || !(resource as IUserAttributes)?.blocked;
  const name = (resource as ITruck)?.attributes?.name || (resource as IUserAttributes)?.fullName || (resource as IUser)?.attributes?.fullName;

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: resource.id,
    data: { name: resourceName, el: resource, crewId },
    disabled: !isActive
  });
  const style = transform ? {
    transform: CSS.Translate.toString(transform),
    zIndex: 2,
    cursor: 'grabbing' 
  } : undefined;

  return (
    <div
      ref={setNodeRef}
      className={classNames(styles[`${CN}__list-el`], { 
        [styles[`${CN}__list-el-disable`]]: !isActive,
        [styles[`${CN}__list-el-tag`]]: isTagStyle
      })}
      key={resource.id}
      style={style}
      id={`${resourceName}-${resource.id}`}
      {...listeners}
      {...attributes}
    >
      <span>
        {isTagStyle && (resourceName === QueryType.WORKERS ? <UserOutlined className={styles[`${CN}__list-el__icon`]} /> : <CarOutlined className={styles[`${CN}__list-el__icon`]}/> )}
        {name}
      </span>
      {!isTagStyle && (<span><Tooltip title="Mark as unavailable"><StopTwoTone twoToneColor="red" /></Tooltip></span>)}
    </div>
    
  );
}