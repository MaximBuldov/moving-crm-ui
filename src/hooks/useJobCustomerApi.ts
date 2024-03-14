import { message } from 'antd';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { ICustomer, JobsStatus } from 'models';
import { ESTIMATES_EDIT_ROUTE } from 'routes';
import { customersService, jobsService } from 'services';
import { formattedPhones, formatPhoneAction } from 'utils';

interface useJobCustomerApiReturn {
  onFinish: (data: any) => void,
  setUser: (data: ICustomer) => void,
  isLoading: boolean,
}

export function useJobCustomerApi(
  jobStatus: JobsStatus,
  closeModal?: () => void,
  jobID?: number,
  customerID?: number
): useJobCustomerApiReturn {
  const [user, setUser] = useState<ICustomer | null>(null);
  const navigate = useNavigate();

  const customerPOST = useMutation({
    mutationFn: customersService.createOne,
    onSuccess: (customer, data) => createNewJob(customer, data)
  });

  const customerUPDATE = useMutation({
    mutationFn: customersService.updateOne,
    onSuccess: (customer, data) => {
      if (jobID) {
        data.data.jobStatus = jobStatus;
        jobUPDATE.mutate({ ...data, id: jobID }); //старый пользователь - старая работа
      }
      if (user) {
        createNewJob(customer, data.data); //старый пользователь - новая работа
      }
    }
  });

  const jobPOST = useMutation({
    mutationFn: jobsService.createOne,
    onSuccess: (data) => {
      message.success('Created!');
      closeModal && closeModal();
      jobStatus === JobsStatus.OPPORTUNITY && navigate(`${ESTIMATES_EDIT_ROUTE}/${data.id}`);
    },
    onError: (error: Error) => {
      message.error(error.message);
    }
  });

  const jobUPDATE = useMutation({
    mutationFn: jobsService.updateOne,
    onSuccess: (data) => {
      message.success('Created!');
      closeModal && closeModal();
      jobStatus === JobsStatus.OPPORTUNITY && navigate(`${ESTIMATES_EDIT_ROUTE}/${data.id}`);
    },
    onError: (error: Error) => {
      message.error(error.message);
    }
  });

  function createNewJob({ id }: ICustomer, data: any) {
    jobPOST.mutate({
      ...data,
      customer: id,
      jobStatus: jobStatus
    });
  }

  const onFinish = (values: any) => {
    const phones = values.phones && formattedPhones(values.phones, formatPhoneAction.UNFORMAT);
    const data = { ...values, phones };
    if (user || customerID) {
      const id = customerID ? customerID : user?.id;
      id && customerUPDATE.mutate({ id, data });
    } else {
      customerPOST.mutate(data); //новый пользователь - новая работа
    }
  };

  const isLoading = customerPOST.isPending || jobPOST.isPending;

  return {
    onFinish, setUser, isLoading
  };
}
