import { message } from 'antd';
import { ICustomer } from 'models/customer';
import { JobsStatus } from 'models/fields';
import { useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router';
import { ESTIMATES_EDIT_ROUTE } from 'routes/consts';
import customersService from 'services/api/customers.service';
import jobsService from 'services/api/jobs.service';
import { userStore } from 'stores';
import { formattedPhones, formatPhoneAction } from 'utils/formattedPhone';

interface useJobCustomerApiReturn {
  onFinish: (data: any) => void,
  setUser: (data: ICustomer) => void,
  isLoading: boolean
}

function useJobCustomerApi(jobStatus: JobsStatus, closeModal?: () => void): useJobCustomerApiReturn {
  const [user, setUser] = useState<ICustomer | null>(null);
  const navigate = useNavigate();
  const jobAction = useMutation(jobsService.createOne, {
    onSuccess: (data) => {
      message.success('Created!');
      closeModal && closeModal();
      jobStatus === JobsStatus.OPPORTUNITY && navigate(`${ESTIMATES_EDIT_ROUTE}/${data.id}`);
    },
    onError: (error: Error) => {
      message.error(error.message);
    }
  });
  const customerAction = useMutation(customersService.createOne, {
    onSuccess: (customer, data) => createNewJob(customer, data),
    onError: (error: Error) => {
      message.error(error.message);
    }
  });

  function createNewJob({ attributes, id }: ICustomer, data: any) {
    const jobNumber = attributes.jobs ? +attributes.jobs.data.length + 1 : 1;
    jobAction.mutate({
      ...data,
      customer: id,
      jobStatus: jobStatus,
      jobNumber: `${userStore.data?.company?.id}${id}-${jobNumber}`
    });
  }

  const onFinish = (values: any) => {
    const phones = formattedPhones(values.phones, formatPhoneAction.UNFORMAT);
    const updatedValues = { ...values, phones };
    if (user) {
      createNewJob(user, updatedValues);
    } else {
      customerAction.mutate(updatedValues);
    }
  };

  const isLoading = customerAction.isLoading || jobAction.isLoading;

  return {
    onFinish, setUser, isLoading
  };
}

export default useJobCustomerApi;