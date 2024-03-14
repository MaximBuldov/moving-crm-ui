import { MinusSquareOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { Button, Collapse, Typography } from 'antd';
import { JobCard } from 'shared';

interface EL {
  id: number,
  name: string,
  used: boolean
}

const jobs = [
  {
    id: 1,
    name: 'Truck 1',
    used: true
  },
  {
    id: 2,
    name: 'Truck 2',
    used: false
  },
  {
    id: 3,
    name: 'Truck 3',
    used: false
  },
  {
    id: 4,
    name: 'Truck 4',
    used: true
  }
];

export function Jobs() {
  const filterButton = () => (
    <Button
      size="small"
      type="link"
      onClick={event => { event.stopPropagation(); }}
    >
      Filters
    </Button>
  );
  return (
    <>
      <Typography.Title level={5}>Jobs</Typography.Title>
      <Collapse
        accordion
        defaultActiveKey={['unscheduled']}
        expandIconPosition="end"
        expandIcon={({ isActive }) => isActive ? <MinusSquareOutlined /> : <PlusSquareOutlined />}
      >
        <Collapse.Panel header="Unscheduled" key="unscheduled" extra={filterButton()}>
          {renderList(jobs)}
        </Collapse.Panel>
        <Collapse.Panel header="Cancelled" key="cancelled" extra={filterButton()}>
        </Collapse.Panel>
      </Collapse>
    </>
  );

  function renderList(arr: EL[]) {
    return arr.map((el: EL) => (
      <JobCard key={el.id} />
    ));
  }
}

// const { attributes, listeners, setNodeRef, transform } = useDraggable({
//   id: props.id
// });
// const style = transform ? {
//   transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`
// } : undefined;
// {/* <div ref={setNodeRef} style={style} {...listeners} {...attributes}>{props.children}</div> */ }