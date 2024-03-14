import { useDroppable } from '@dnd-kit/core';
import { Col, Row, Typography } from 'antd';
import classNames from 'classnames';
import { ICrew, QueryType } from 'models';
import { crewScheduleStore } from 'stores';

import styles from './dispatch.module.scss';
import { SingleResource } from './SingleResource';

const CN = 'timesheet';

interface CrewLineProps {
  crew: ICrew;
}

export function CrewLine({ crew }: CrewLineProps) {
  const trucks = crew?.trucks?.data;
  const workers = crew?.workers?.data;
  const { isOver, setNodeRef } = useDroppable({
    id: crew.id,
    data: {
      trucks, workers, name: crew.name
    }
  });

  //const { updateCrews } = useCrewsMutation();

  return (
    <div
      ref={setNodeRef}
      className={styles[`${CN}__crew-line`]}
      key={crew.id}
    >
      <Row>
        <Col
          className={classNames(styles[`${CN}__crew-wrap`], {
            [styles[`${CN}__crew-wrap-active`]]: isOver
          })}
          span={5}
        >
          <Typography.Text
            className={styles[`${CN}__crew-name`]}
            editable={{
              onChange: (value) => {
                crewScheduleStore.updateOneCrew({ ...crew, name: value });
              }
            }}
          >
            {crew.name}
          </Typography.Text>
          <div className={styles[`${CN}__crew`]}>
            {trucks && renderResources(QueryType.TRUCKS, trucks)}
            {workers && renderResources(QueryType.WORKERS, workers)}
          </div>
        </Col>
        <Col className={styles[`${CN}__crew-timeline`]} span={19}></Col>
      </Row>
    </div>
  );

  function renderResources(resourceName: string, resources: any[]) {
    return resources && resources.map((el) => <SingleResource key={el.id} resource={el} resourceName={resourceName} isTagStyle crewId={crew.id} />);
  }
}
