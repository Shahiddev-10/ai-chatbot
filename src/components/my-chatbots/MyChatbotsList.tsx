import {
  AdjustmentsHorizontalIcon,
  ChartBarIcon,
  CodeBracketIcon,
  EllipsisVerticalIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

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
import useFetchChatbots from '~/lib/chatbot/hooks/use-fetch-chatbots';
import { useRouter } from 'next/router';
import Heading from '~/core/ui/Heading';
import { Chatbot } from '~/lib/chatbot/types/chatbot';
import Modal from '~/core/ui/Modal';
import Label from '~/core/ui/Label';
import Textarea from '~/core/ui/Textarea';
import configuration from '~/configuration';
import Image from 'next/image';
import { IfHasPermissions } from '../IfHasPermissions';
import { MembershipRole } from '~/lib/organizations/types/membership-role';
import { useDeleteChatbot } from '~/lib/chatbot/hooks/use-delete-chatbot';
import { useFirestore } from 'reactfire';
import { doc, updateDoc } from 'firebase/firestore';
import { CHATBOTS_COLLECTION } from '~/lib/firestore-collections';

const MyChatbotsList: React.FCC<{}> = ({ children }) => {
  const { data: chatbots, status } = useFetchChatbots();

  /* data is loading */
  if (status === `loading`) {
    return <PageLoadingIndicator fullPage={false} displayLogo={false} />;
  }

  /* request errored */
  if (status === `error`) {
    return <div>Error!</div>;
  }

  return (
    <div className="mx-10 1xs:mx-0 sm:mx-0">
      {chatbots.length > 0 ? (
        <>
          <div className={'mb-10 mt-5 w-full'}>
            <div className="mb-4 flex justify-between">
              <Heading type={2}>Chatbots</Heading>
              <Link href={'/my-chatbots/new'}>
                <Button className={'w-full md:w-auto'} loading={false}>
                  Create New
                </Button>
              </Link>
            </div>
          </div>
          <MyChatbotsTable data={chatbots} />
        </>
      ) : (
        <div
          className={`min-h-579 flex h-screen  flex-col items-center justify-center`}
        >
          <Image
            src="/assets/images/chat/document.png"
            alt="chantbot-document"
            width={100}
            height={130}
            className="mb-5"
          />
          <h2
            className={'mb-5 text-center font-Outfit text-5xl/[45px] font-bold'}
          >
            Your Chatbot list
            <br />
            is empty.
          </h2>
          <Link href={'/my-chatbots/new'}>
            <Button className={'w-full md:w-auto'} loading={false}>
              Create New
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyChatbotsList;

const ChatbotDropdown: React.FCC<{ slug: string | undefined }> = ({ slug }) => {
  const router = useRouter();
  const [isEmbedOpen, setIsEmbedOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <IconButton label={'Open chatbot actions menu'}>
            <EllipsisVerticalIcon className={'h-6'} />
          </IconButton>
        </DropdownMenuTrigger>

        <DropdownMenuContent collisionPadding={{ right: 50 }}>
          <DropdownMenuItem
            onClick={() => {
              router.push(`/my-chatbots/${slug}/analytics`);
            }}
            className={'cursor-pointer'}
          >
            <span className={'flex items-center space-x-2'}>
              <ChartBarIcon className={'h-5'} />
              <span>Analytics</span>
            </span>
          </DropdownMenuItem>
          {/* <DropdownMenuItem onClick={() => { router.push(`/my-chatbots/${slug}/embed`) }} className={'cursor-pointer'}> */}
          <DropdownMenuItem
            onClick={() => setIsEmbedOpen(true)}
            className={'cursor-pointer'}
          >
            <span className={'flex items-center space-x-2'}>
              <CodeBracketIcon className={'h-5'} />
              <span>Embed on Website</span>
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              router.push(`/my-chatbots/${slug}/customize`);
            }}
            className={'cursor-pointer'}
          >
            <span className={'flex items-center space-x-2'}>
              <AdjustmentsHorizontalIcon className={'h-5'} />
              <span>Customize</span>
            </span>
          </DropdownMenuItem>
          {/* <DropdownMenuItem className={'cursor-pointer'} disabled={true}>
            <span className={'flex items-center space-x-2'}>
              <ShareIcon className={'h-5'} />
              <span>Share</span>
            </span>
          </DropdownMenuItem> */}

          <IfHasPermissions condition={(role) => role >= MembershipRole.Owner}>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className={
                'cursor-pointer focus:!bg-red-50 dark:focus:!bg-red-500/10'
              }
              onClick={() => setIsDeleteOpen(true)}
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
          </IfHasPermissions>
        </DropdownMenuContent>
      </DropdownMenu>
      <EmbedComponent
        slug={slug ?? ''}
        isOpen={isEmbedOpen}
        setIsOpen={setIsEmbedOpen}
      />
      <DeleteComponent
        slug={slug ?? ''}
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
      />
    </>
  );
};
const MyChatbotsTable: React.FCC<{ data: Chatbot[] }> = ({ data }) => {
  const firestore = useFirestore();

  const togglePublishChatbot = async (id: string, status: boolean) => {
    const docRef = doc(firestore, CHATBOTS_COLLECTION, id);
    await updateDoc(docRef, {
      isPublished: status,
    });
  };

  return (
    <div
      className={
        '//lg:max-w-5xl w-full 3xl:grid 3xl:max-w-full 3xl:grid-cols-2 3xl:gap-5 2xl:grid 2xl:grid-cols-2 2xl:gap-5'
      }
    >
      {data.map((row: Chatbot) => (
        <div className="mb-5" key={row.id}>
          <Tile key={row.id}>
            <div className="flex flex-col justify-between gap-5 1xs:flex-row 1xs:flex-wrap 1xs:place-items-start sm:flex-row sm:flex-wrap sm:place-items-start md:flex-row	 md:items-center	">
              <div className="1xs:flex-1	1xs:break-all 	sm:flex-1 sm:break-all">
                <SubHeading>{row.name}</SubHeading>
              </div>
              <div className="flex justify-between gap-5 1xs:gap-0 sm:gap-0">
                <Button
                  className={'w-full md:w-auto'}
                  loading={false}
                  onClick={() => togglePublishChatbot(row.id, !row.isPublished)}
                >
                  {row.isPublished ? 'Unpublish' : 'Publish Now'}
                </Button>
                <ChatbotDropdown slug={row.id} />
              </div>
            </div>
            <Divider />
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:flex lg:grid-cols-4 lg:justify-between lg:pr-5">
              <p className="text-sm">
                AMPC : {row.noOfMessages / row.noOfConversations}
              </p>
              <p className="text-sm">Conversations: {row.noOfConversations}</p>
              <p className="text-sm">Messages: {row.noOfMessages}</p>
              <p className="text-sm">
                Source Trained:{' '}
                {getSourceTrained([
                  row.sourceOfInformation?.documents,
                  row.sourceOfInformation?.text,
                  row.sourceOfInformation?.websites,
                ])}
              </p>
            </div>
          </Tile>
        </div>
      ))}
    </div>
  );
};

const getSourceTrained = (args: any[]): number => {
  let cal = 0;
  args.forEach((val: []) => {
    if (Array.isArray(val)) {
      cal = cal + val.length;
    }
  });
  return cal;
};

const EmbedComponent = ({
  slug,
  isOpen,
  setIsOpen,
}: {
  slug: string;
  isOpen: boolean;
  setIsOpen: any;
}) => {
  const [iframeText, setIframeText] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [varient, setVarient] = useState('iframe');

  const iframe = `<iframe src="${configuration.iframeDomain}/chatbot-iframe/?chatbotid=${slug}" style="position: fixed; bottom: 0; background: transparent; right: 0" frameborder="0" id="chatbot-twakwith" height="120" width="120"></iframe>
  <script>
      window.addEventListener(
        "message",
        function (e) {
          var iframe = document.getElementById("chatbot-twakwith");
          var dataWidth = e.data[0];
          var dataHeight = e.data[1];
          iframe.width = dataWidth;
          iframe.height = dataHeight;
        },
        false
      );
    </script>`;

  const bubble = `<script>
window.chatbotConfig = {
    chatbotid: "${slug}",
}
</script>
<script src="${configuration.iframeDomain}/embed.min.js" id="${slug}" defer></script>`;

  useEffect(() => {
    setIframeText(iframe);
  }, [slug, iframe]);

  useEffect(() => {
    if (varient === 'iframe') {
      setIframeText(iframe);
    }

    if (varient === 'bubble') {
      setIframeText(bubble);
    }
  }, [varient, iframe, bubble]);

  const copyHandler = async () => {
    try {
      await navigator.clipboard.writeText(iframeText);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 500);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <Modal
      heading={''}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      closeButton={true}
    >
      {/* Embed Modal */}
      <div className={'mt-6 flex flex-col space-y-4'}>
        <div className="flex items-center justify-between">
          <Heading type={3}>Embed On Website</Heading>
          <div className="flex justify-end gap-2">
            <Button
              variant={'flat'}
              onClick={() => setVarient('iframe')}
              size="small"
              round
              color={varient === 'iframe' ? 'custom' : 'secondary'}
            >
              iFrame
            </Button>
            <Button
              variant={'flat'}
              onClick={() => setVarient('bubble')}
              size="small"
              round
              color={varient === 'bubble' ? 'custom' : 'secondary'}
            >
              Bubble
            </Button>
          </div>
        </div>
        {varient === 'bubble' ? (
          <p>Coming Soon</p>
        ) : (
          <>
            <p className="">
              To add the chatbot any where on your website, and this iframe to
              your html code
            </p>
            <Label>
              <Textarea
                className={
                  'h-48 w-full  !border-0 border-gray_text-1 !bg-primary-300/10 !p-2'
                }
                readOnly
                value={iframeText}
              />
            </Label>
            <div className={'flex justify-end space-x-2'}>
              <Button variant={'flat'} onClick={() => copyHandler()}>
                {isCopied ? 'Copied' : 'Copy'}
              </Button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};
const DeleteComponent = ({
  slug,
  isOpen,
  setIsOpen,
}: {
  slug: string;
  isOpen: boolean;
  setIsOpen: any;
}) => {
  const deleteChatbot = useDeleteChatbot();

  return (
    <Modal heading={''} isOpen={isOpen} setIsOpen={setIsOpen} size={'sm'}>
      <div className={'flex flex-col space-y-4'}>
        <div className={'flex flex-col space-y-2 text-center'}>
          <p>Are you sure to delete this chatbot?</p>
        </div>

        <div className={'flex justify-center space-x-2'}>
          <Modal.CancelButton onClick={() => setIsOpen(false)}>
            Cancel
          </Modal.CancelButton>

          <Button
            variant={'flat'}
            color={'danger'}
            onClick={() => {
              deleteChatbot(String(slug));
              setIsOpen(false);
            }}
            className="hover:text-white"
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};
