import { EllipsisVerticalIcon, XMarkIcon } from '@heroicons/react/24/outline';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '~/core/ui/Dropdown';

import IconButton from '~/core/ui/IconButton';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Button from '~/core/ui/Button';
import Divider from '~/core/ui/Divider';
import PageLoadingIndicator from '~/core/ui/PageLoadingIndicator';
import SubHeading from '~/core/ui/SubHeading';
import Tile from '~/core/ui/Tile';
import Heading from '~/core/ui/Heading';
import useFetchMasterSubscription from '~/lib/subscription/hooks/use-fetch-master-subscription';
import { SubscriptionMaster } from '~/lib/organizations/types/subscription-master';

const SubscriptionList: React.FCC<{}> = ({ children }) => {
  const { data: subscriptionMasterList, status } = useFetchMasterSubscription();

  /* data is loading */
  if (status === `loading`) {
    return <PageLoadingIndicator fullPage={false} displayLogo={false} />;
  }

  /* request errored */
  if (status === `error`) {
    return <div>Error!</div>;
  }

  return (
    <div
      className={`mt-4  h-full flex-col space-y-4 lg:mt-6 lg:flex-row lg:space-x-8 lg:space-y-0`}
    >
      {subscriptionMasterList.length > 0 ? (
        <>
          <div className={'mb-10 w-full lg:max-w-5xl'}>
            <div className="mb-4 flex justify-between pl-10">
              <Heading type={2}>Subscription Master</Heading>
              <Link href={'/master/subscription/new'}>
                <Button className={'w-full md:w-auto'} loading={false}>
                  Create New
                </Button>
              </Link>
            </div>
          </div>
          <SubscriptionMasterTable data={subscriptionMasterList} />
        </>
      ) : (
        <div className={`flex h-579 flex-col items-center justify-center`}>
          <h2 className={'mb-5 text-2xl'}>Your do not have any Plan yet!</h2>
          <Link href={'/master/subscription/new'}>
            <Button className={'w-full md:w-auto'} loading={false}>
              Create New
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default SubscriptionList;

const ChatbotDropdown: React.FCC<{ slug: string | undefined }> = ({ slug }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <IconButton label={'Open chatbot actions menu'}>
            <EllipsisVerticalIcon className={'h-6'} />
          </IconButton>
        </DropdownMenuTrigger>

        <DropdownMenuContent collisionPadding={{ right: 50 }}>
          <DropdownMenuSeparator />

          <DropdownMenuItem
            disabled={true}
            className={
              'cursor-pointer focus:!bg-red-50 dark:focus:!bg-red-500/10'
            }
          >
            <span
              className={
                'flex items-center space-x-2 text-red-700 dark:text-red-500'
              }
            >
              <XMarkIcon className={'h-5'} />
              <span>Delete</span>
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
const SubscriptionMasterTable: React.FCC<{ data: SubscriptionMaster[] }> = ({
  data,
}) => {
  return (
    <div className={'w-full lg:max-w-5xl'}>
      {data.map((row: SubscriptionMaster) => (
        <div className="mb-5" key={row.id}>
          <Tile key={row.id}>
            <div className="flex justify-between">
              <div>
                <SubHeading>{row.name}</SubHeading>
              </div>
              <div className="flex gap-5">
                {/* <ChatbotDropdown slug={row.id} /> */}
              </div>
            </div>
            <Divider />
            <div>
              <p>Description: {row.description}</p>
              <p>Badge: {row.badge}</p>
              <p>Plan Type: {row.planType}</p>
              <p>Plan Price: {row.planPrice}</p>
              <p>Plan Days: {row.planDays}</p>
            </div>
          </Tile>
        </div>
      ))}
    </div>
  );
};
