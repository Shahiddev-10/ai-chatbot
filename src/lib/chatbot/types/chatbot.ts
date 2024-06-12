import { Timestamp } from 'firebase/firestore';

export type Document = {
  id: string;
  url: string;
  fileName: string;
  dateAdded: string;
  contentType: string;
  storageLocation: string;
};
type Text = {
  id: string;
  title: string;
  content: string;
  dateAdded: string;
};

type Website = {
  id: string;
  website: string;
  dateAdded: string;
};

type Setting = {
  basePrompt: string;
  model: string;
  visibility: string;
  domain: string;
};
type Customizations = {
  initialMessage: string;
  suggestedMessage: string;
  displayName: string;
  userMessageColor: string;
  alignChatBubbleButton: string;
  sendColor: string;
  mode: string;
  chatbotIcon: string;
  autoShowMessageAfter: string;
};
type WhitelistDomains = {
  id: string;
  domain: string;
  addedOn: string;
};
type Conversations = {
  messageId: string;
  createdAt: string;
  updatedAt: string;
  initiatedBy: 'system' | 'user' | 'ai';
  message: string;
};

export interface Chatbot {
  id?: string;
  name: string;
  userId: string | undefined;
  orgId: string | undefined;
  noOfUsers?: number;
  noOfConversations?: number;
  noOfMessages?: number;
  noOfSourcesTrained?: number;
  isPublished: boolean;
  sourceOfInformation?: {
    documents?: Document[];
    text?: Text[];
    websites?: Website[];
  };
  setting?: Setting;
  customizations?: Customizations;
  whitelistDomains?: WhitelistDomains[];
  namespaceId?: string;
  conversations?: Conversations[];
  createdAt: Timestamp;
}
