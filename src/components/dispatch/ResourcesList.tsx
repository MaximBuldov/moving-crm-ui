import { useDroppable } from '@dnd-kit/core';
import { Empty, Spin } from 'antd';
import classNames from 'classnames';
import { IResources, ITruck, IUserAttributes } from 'models';
import { crewScheduleStore } from 'stores';
import { observer } from 'mobx-react-lite';

import { SingleResource } from './SingleResource';
import styles from './dispatch.module.scss';

interface ResourcesListProps {
  arr: ITruck[] | IUserAttributes[];
  resourceName: IResources;
  isLoading: boolean;
}

const CN = 'resources-list';

export const ResourcesList = observer(({ arr, resourceName, isLoading }: ResourcesListProps) => {
  const filteredArr = (arr as any[]).filter((el: any) =>
    !crewScheduleStore.crews.some((crew: any) =>
      crew[resourceName]?.data.some((resInCrew: any) => resInCrew.id === el.id)
    )
  );

  //console.log(toJS());

  const { isOver, setNodeRef } = useDroppable({
    id: resourceName,
    data: {
      [resourceName]: filteredArr
    }
  });

  return (
    <div
      ref={setNodeRef}
      className={classNames({ [styles[`${CN}__active`]]: isOver })}
    >
      {(!filteredArr.length && !isLoading) && <Empty />}
      {!!filteredArr.length && filteredArr.map((el) => <SingleResource
        key={el.id}
        resource={el}
        resourceName={resourceName}
        crewId={resourceName}
      />)}
      {isLoading && <Spin />}
    </div>
  );
});