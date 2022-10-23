import { message } from 'antd';
import { ICustomer } from 'models/customer';
import { JobsStatus } from 'models/fields';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router';
import { ESTIMATES_EDIT_ROUTE } from 'routes/consts';
import customersService from 'services/collections/customers.service';
import jobsService from 'services/collections/jobs.service';
import { formattedPhones, formatPhoneAction } from 'utils/formattedPhone';

interface useJobCustomerApiReturn {
  onFinish: (data: any) => void,
  setUser: (data: ICustomer) => void,
  isLoading: boolean,
}

function useJobCustomerApi(
  jobStatus: JobsStatus,
  closeModal?: () => void,
  jobID?: number,
  customerID?: number
): useJobCustomerApiReturn {
  const [user, setUser] = useState<ICustomer | null>(null);
  const navigate = useNavigate();

  const customerPOST = useMutation(customersService.createOne, {
    onSuccess: (customer, data) => createNewJob(customer, data),
    onError: (error: Error) => {
      message.error(error.message);
    }
  });

  const customerUPDATE = useMutation(customersService.updateOne, {
    onSuccess: (customer, data) => {
      if (jobID) {
        data.data.jobStatus = jobStatus;
        jobUPDATE.mutate({ ...data, id: jobID }); //старый пользователь - старая работа
      }
      if (user) {
        createNewJob(customer, data.data); //старый пользователь - новая работа
      }
    },
    onError: (error: Error) => {
      message.error(error.message);
    }
  });

  const jobPOST = useMutation(jobsService.createOne, {
    onSuccess: (data) => {
      message.success('Created!');
      closeModal && closeModal();
      jobStatus === JobsStatus.OPPORTUNITY && navigate(`${ESTIMATES_EDIT_ROUTE}/${data.id}`);
    },
    onError: (error: Error) => {
      message.error(error.message);
    }
  });

  const jobUPDATE = useMutation(jobsService.updateOne, {
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

  const isLoading = customerPOST.isLoading || jobPOST.isLoading;

  return {
    onFinish, setUser, isLoading
  };
}

export default useJobCustomerApi;