import { FC, useState } from 'react';
import { Badge, Button, Col, Modal, Row, Tooltip, Typography } from 'antd';
import { useNavigate } from 'react-router';
import { CloseCircleOutlined, ExclamationCircleFilled, EyeOutlined, LeftOutlined, PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { fieldsStore } from 'stores';
import { useMutation } from '@tanstack/react-query';
import { IJob, JobsStatus } from 'models';
import { ESTIMATES_EDIT_ROUTE } from 'routes';
import { FormCreateOpportunity } from 'shared';
import { jobsService } from 'services';

interface OpportunitiesHeadingProps {
	job: IJob
}

export const OpportunitiesHeading: FC<OpportunitiesHeadingProps> = (props) => {
  const { attributes: { customer, jobStatus }, id } = props.job;
  const jobsAction = useMutation(jobsService.updateOne);
  const [modal, setModal] = useState(false);
  const navigation = useNavigate();

  const closeModal = () => {
    setModal(false);
  };

  const changeStatus = (jobStatus: JobsStatus) => {
    jobsAction.mutateAsync({ id, data: { jobStatus } });
  };

  return (
    <>
      <Row align="middle" justify="space-between">
        <Col>
          <Row align="middle" gutter={24}>
            <Col>
              <Button type="primary" icon={<LeftOutlined />} onClick={() => navigation(-1)} />
            </Col>
            <Col>
              <Typography.Title style={{ marginBottom:'8px' }} level={2}>
                {customer?.data ? customer.data.attributes.name : 'Customer name Error'}
              </Typography.Title>
            </Col>
            <Col>
              <Badge color={fieldsStore.getStatusColor(jobStatus)} text={jobStatus} />
            </Col>
          </Row>
        </Col>
        <Col>
          <Row gutter={16} align="middle">
            {(jobStatus === JobsStatus.LEAD_IN_PROGRESS || jobStatus === JobsStatus.NEW_LEAD || jobStatus === JobsStatus.OPPORTUNITY) && (
              <Col>
                <Tooltip title="Bad">
                  <Button onClick={() => changeStatus(JobsStatus.BAD_LEAD)} size="large" icon={<ExclamationCircleFilled />} danger />
                </Tooltip>
              </Col>
            )}
            {jobStatus === JobsStatus.LEAD_IN_PROGRESS || jobStatus === JobsStatus.NEW_LEAD ? (
              <>
                <Col>
                  <Tooltip title="Lost">
                    <Button onClick={() => changeStatus(JobsStatus.LOST)} size="large" icon={<CloseCircleOutlined />} type="default" />
                  </Tooltip>
                </Col>
                <Col>
                  <Button onClick={() => setModal(true)} size="large" icon={<PlusOutlined />} type="primary">Create Estimate</Button>
                </Col>
              </>
            ) : (
              <Col>
                <Button type="primary" ghost size="large" icon={<EyeOutlined />}><Link to={`${ESTIMATES_EDIT_ROUTE}/${id}`}> View Quote</Link></Button>
              </Col>
            )}
          </Row>
        </Col>
      </Row>
      <Modal width={900} open={modal} onCancel={closeModal} footer={null}>
        <FormCreateOpportunity job={props.job} closeModal={closeModal} />
      </Modal>
    </>

  );
};

