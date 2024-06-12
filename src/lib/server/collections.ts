import type {
  CollectionReference,
  CollectionGroup,
} from 'firebase-admin/firestore';

import { Organization } from '~/lib/organizations/types/organization';
import { UserData } from '~/core/session/types/user-data';
import { MembershipInvite } from '~/lib/organizations/types/membership-invite';

import {
  ORGANIZATIONS_COLLECTION,
  USERS_COLLECTION,
  INVITES_COLLECTION,
  CHATBOTS_COLLECTION,
} from '~/lib/firestore-collections';

import getRestFirestore from '~/core/firebase/admin/get-rest-firestore';
import { Chatbot } from '../chatbot/types/chatbot';

export function getUsersCollection() {
  return getCollectionByName(USERS_COLLECTION) as CollectionReference<UserData>;
}

export function getOrganizationsCollection() {
  return getCollectionByName(
    ORGANIZATIONS_COLLECTION
  ) as CollectionReference<Organization>;
}

export function getChatbotsCollection() {
  return getCollectionByName(
    CHATBOTS_COLLECTION
  ) as CollectionReference<Chatbot>;
}

export function getInvitesCollection() {
  return getCollectionGroupByName(
    INVITES_COLLECTION
  ) as CollectionGroup<MembershipInvite>;
}

function getCollectionByName(collection: string) {
  return getRestFirestore().collection(collection);
}

function getCollectionGroupByName(collection: string) {
  return getRestFirestore().collectionGroup(collection);
}
