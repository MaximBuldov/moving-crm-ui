import { useEffect } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { Col, Row } from 'antd';
import { Heading } from 'layouts';
import { private_routes, DISPATCH_ROUTE, DISPATCH_SCHEDULE_ROUTE, IRoute } from 'routes';
import { Resources, Timesheet, Jobs } from 'components';
import { useNavigate, useParams } from 'react-router';
import dayjs from 'dayjs';
import { useQuery } from '@tanstack/react-query';
import { QueryType } from 'models';
import { crewsSceduleService } from 'services';
import { useCrewsMutation } from 'stores';
import { observer } from 'mobx-react-lite';

export const DispatchSchedule = observer(() => {
  const params = useParams<{ day: string }>();
  const navigate = useNavigate();
  useEffect(() => {
    if (!params?.day) {
      navigate(`${DISPATCH_SCHEDULE_ROUTE}/${dayjs().format('YYYYMMDD')}`);
    }
  });
  const selectedDay = dayjs(params.day).format('YYYY-MM-DD');
  const crewsAction = useQuery({
    queryFn: () => crewsSceduleService.fetchMany({
      filters: {
        $and: [{ date: { $eq: selectedDay } }]
      }
    }),
    queryKey: [QueryType.CREWS_SCEDULE, { id: selectedDay }]
    // onSuccess: (data) => data?.data[0] && crewScheduleStore.setDayInfo(data.data[0])
  });

  const { moveResource } = useCrewsMutation();

  function handleDragEnd(event: DragEndEvent) {
    const { over, active } = event;

    if (over?.id && active.id) {
      const resName = active.data.current!.name;
      const prevData = over.data.current![resName] as any[];
      const resource = active.data.current!.el;
      const from = active.data.current?.crewId;
      const to = over.id;

      if (prevData.findIndex(el => el.id === active.id) === -1) {
        moveResource({ from, to, resource, resName });
      }
    }
  }

  return (
    <>
      <Heading
        routes={private_routes}
        parent={DISPATCH_ROUTE}
        route={{
          name: `Dispatch Schedule, ${dayjs(params.day).format('MMM D')}`,
          path: DISPATCH_SCHEDULE_ROUTE
        } as IRoute
        }
      />
      <div style={{ paddingTop: 24 }}>
        <DndContext onDragEnd={handleDragEnd}>
          <Row gutter={24}>
            <Col span={4}>
              <Resources />
            </Col>
            <Col span={16}>
              <Timesheet isLoading={crewsAction.isPending} />
            </Col>
            <Col span={4}>
              <Jobs />
            </Col>
          </Row>
        </DndContext>
      </div>
    </>
  );
});

