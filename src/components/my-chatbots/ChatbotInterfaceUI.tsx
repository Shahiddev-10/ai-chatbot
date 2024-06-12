import { images } from 'src/constants';

const ChatbotInterfaceUI: React.FC<{
  displayName: string;
  mobile: boolean;
}> = ({ displayName, mobile }) => {
  return (
    <div
      className={`${mobile ? 'mx-auto mt-5' : 'ml-8'} w-[370px] max-w-[90vw]`}
    >
      <div className="h-[60px] rounded-t-lg bg-tulip p-4 text-2xl font-semibold text-white">
        {displayName != '' ? displayName : 'Chatbot'}
      </div>
      <div className="bg-black-700">
        <div className="h-[370px] overflow-y-scroll p-4 chatbot-scrollbar">
          <div className="clear-both mb-2.5 flex">
            <img
              src={images.aiAvatar}
              className="mr-2 h-[45px] w-[45px] rounded-full"
              alt="profile"
            />
            <div
              className={`max-w-[215px] rounded-lg border border-[#6a6c6e] bg-black-36 p-3.5 text-[15px]/[16px] font-light text-white`}
            >
              Hello
            </div>
          </div>
          <div className="clear-both mb-2.5 flex">
            <img
              src={images.aiAvatar}
              className="mr-2 h-[45px] w-[45px] rounded-full"
              alt="profile"
            />
            <div
              className={`max-w-[215px] rounded-lg border border-[#6a6c6e] bg-black-36 p-3.5 text-[15px]/[16px] font-light text-white`}
            >
              How can i help you?
            </div>
          </div>
          <div className="clear-both mb-2.5 flex">
            <div
              className={`ml-auto max-w-[215px] rounded-lg bg-tulip p-3.5 text-[15px]/[16px] font-light text-white`}
            >
              Hi
            </div>
          </div>
        </div>
      </div>
      <div className="flex rounded-b-lg bg-black-36">
        <input
          type="text"
          placeholder="Send a message..."
          className="h-[47px] w-full overflow-hidden rounded-bl-lg border-none bg-inherit pl-4 text-[15px] text-white focus-visible:outline-0"
          readOnly
        />
        <button
          type="button"
          className="my-auto ml-2.5 h-[35px] w-[35px] border-none bg-transparent text-tulip-1 shadow-none"
          onClick={() => {}}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
        </button>
      </div>
      <img
        src={images.chatbotImage}
        className="ml-auto h-[120px] w-[120px] cursor-pointer p-8"
        alt="chatbot-image"
      />
    </div>
  );
};

export default ChatbotInterfaceUI;
