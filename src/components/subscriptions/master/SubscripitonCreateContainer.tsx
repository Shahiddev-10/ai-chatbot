import toaster from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import Button from '~/core/ui/Button';
import TextField from '~/core/ui/TextField';
import { useRouter } from 'next/router';
import Heading from '~/core/ui/Heading';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import useCreateMasterSubscription from '~/lib/subscription/hooks/use-create-master-subscription';

const SubscriprionForm = () => {
  const router = useRouter();

  const createMasterSubscription = useCreateMasterSubscription();

  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      nameController: '',
      descriptionController: '',
      badgeController: '',
      planTypeController: '',
      planPriceController: '',
      planPriceIdController: '',
      planDaysController: '',
    },
  });

  const onSubmit = async (value: any) => {
    const {
      nameController,
      descriptionController,
      badgeController,
      planTypeController,
      planPriceController,
      planPriceIdController,
      planDaysController,
    } = value;
    if (
      !nameController ||
      !descriptionController ||
      !badgeController ||
      !planTypeController ||
      !planPriceController ||
      !planPriceIdController ||
      !planDaysController
    ) {
      return toaster.error('Please enter all fields!');
    }

    createMasterSubscription({
      name: nameController,
      description: descriptionController,
      badge: badgeController,
      planType: planTypeController,
      planPrice: planPriceController,
      planPriceId: planPriceController,
      planDays: planDaysController,
    });

    setValue('nameController', '');
    setValue('descriptionController', '');
    setValue('badgeController', '');
    setValue('planTypeController', '');
    setValue('planPriceController', '');
    setValue('planPriceIdController', '');
    setValue('planDaysController', '');

    toaster.success('Plan added successfully.');

    router.push(`/master/subscription/`);
  };

  const nameController = register('nameController', { value: '' });
  const descriptionController = register('descriptionController', {
    value: '',
  });
  const badgeController = register('badgeController', { value: '' });
  const planTypeController = register('planTypeController', { value: '' });
  const planPriceController = register('planPriceController', { value: '' });
  const planPriceIdController = register('planPriceIdController', {
    value: '',
  });
  const planDaysController = register('planDaysController', { value: '' });

  return (
    <div className={'mb-10 w-full lg:max-w-5xl'}>
      <form
        className="mb-5 pl-10"
        onSubmit={handleSubmit((value) => {
          return onSubmit(value);
        })}
      >
        <div className={'flex flex-col space-y-4'}>
          <Heading type={2}>New Plan</Heading>
          <TextField>
            <TextField.Label>
              Name
              <TextField.Input
                {...nameController}
                minLength={5}
                placeholder={''}
                required
              />
            </TextField.Label>
          </TextField>
          <TextField>
            <TextField.Label>
              Description
              <TextField.Input
                {...descriptionController}
                minLength={5}
                placeholder={''}
                required
              />
            </TextField.Label>
          </TextField>
          <TextField>
            <TextField.Label>
              Badge
              <TextField.Input
                {...badgeController}
                minLength={5}
                placeholder={''}
                required
              />
            </TextField.Label>
          </TextField>
          <TextField>
            <TextField.Label>
              Plan Type
              <TextField.Input
                {...planTypeController}
                minLength={5}
                placeholder={''}
                required
              />
            </TextField.Label>
          </TextField>
          <TextField>
            <TextField.Label>
              Plan Price
              <TextField.Input
                {...planPriceController}
                minLength={2}
                placeholder={''}
                required
              />
            </TextField.Label>
          </TextField>
          <TextField>
            <TextField.Label>
              Plan Price ID
              <TextField.Input
                {...planPriceIdController}
                minLength={5}
                placeholder={''}
                required
              />
            </TextField.Label>
          </TextField>
          <TextField>
            <TextField.Label>
              Plan Days
              <TextField.Input
                {...planDaysController}
                minLength={1}
                placeholder={''}
                required
              />
            </TextField.Label>
          </TextField>
          <div>
            <Button className={'w-full md:w-auto'}>Add Plan</Button>
          </div>
        </div>
      </form>
      <Button
        size={'small'}
        color={'transparent'}
        href={`/master/subscription/`}
      >
        <span className={'flex items-center space-x-1'}>
          <ArrowLeftIcon className={'h-3'} />
          <span>Go Back</span>
        </span>
      </Button>
    </div>
  );
};
export default SubscriprionForm;
