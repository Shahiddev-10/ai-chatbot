// Accepts in the following format

// {
//   updateAnswerToFirebase: {
//     marketOpportunity: 'Here is the new description for market opportunity',
//     solution: 'here is the new solution',
//   },
//   organizationId: '4zpTueNfkxS8cwvZ3c6k',
//   chatbotId: 'A5ZZCDPsbq17HRIjPXOn',
// };

import { withAdmin } from '~/core/middleware/with-admin';
const {
  initializeApp,
  applicationDefault,
  cert,
} = require('firebase-admin/app');
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require('firebase-admin/firestore');
const admin = require('firebase-admin');
import configuration from '~/configuration';
import logger from '~/core/logger';
import {
  MESSAGES_COLLECTION,
  CONVERSATIONS_COLLECTION,
  CHATBOTS_COLLECTION,
} from '~/lib/firestore-collections';

const updateAnswerToFirebaseHandler = async (req, res) => {
  try {
    console.log('im inside updateAnswerToFirebase');
    await withAdmin(req, res);
    const db = admin.firestore();

    const { conversationId, chatbotId, message } = req.body;
    ///chatbots/kP7FejhcC8z9Rf6etshZ/conversations/Eu0WCfVXGi3zn7FgZa6p/messages/6aGEss8Pv7N8gM8Q97LR

    console.log(
      '🚀 ~ file: updateAnswerToFirebase.ts:39 ~ handler ~ conversatioNId, chatbotId, :',
      conversationId,
      chatbotId
    );

    //in firebase firestore i have a collection called messages . create a new doc with 2 fields, created at = current timestamp. intiatedBy= 'HUMAN'.   use firebase admin nodejs
    // const createdAt = admin.firestore.FieldValue.serverTimestamp();

    const createdAt = admin.firestore.Timestamp.now();
    const newMessage = {
      message,
      createdAt,
      initiatedBy: 'AI',
    };
    console.log(
      '🚀 ~ file: updateAnswerToFirebase.ts:52 ~ updateAnswerToFirebaseHandler ~ newMessage:',
      newMessage
    );

    const docRef = await db
      .collection(CHATBOTS_COLLECTION)
      .doc(chatbotId)
      .collection(CONVERSATIONS_COLLECTION)
      .doc(conversationId)
      .collection(MESSAGES_COLLECTION)
      .add(newMessage);

    console.log('doc added successfully with id', docRef.id);

    // to update number of messages count.
    db.collection(CHATBOTS_COLLECTION)
      .doc(chatbotId)
      .get()
      .then(async (doc: any) => {
        if (doc.exists) {
          // console.log('Document data:', doc.data());
          await db
            .collection(CHATBOTS_COLLECTION)
            .doc(chatbotId)
            .update({
              noOfMessages: doc.data()?.noOfMessages + 1,
            });
        }
      })
      .catch((error: any) => {
        // console.log('Error getting document:', error);
      });

    res.status(200).json({
      info: 'AI Answer Updated in firebase',
      newMessage,
      docId: docRef.id,
    });
  } catch (e) {
    console.log('error in updateAnswerToFirebase', e, e?.message);

    res.status(500).json({
      message: 'Error Occured',
    });
  }
};
export default updateAnswerToFirebaseHandler;
