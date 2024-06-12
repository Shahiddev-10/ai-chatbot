import configuration from '~/configuration';
const axios = require('axios');
const { siteUrl } = configuration.site;

export const saveMessage = async (body: object) => {
  let { query, chatbotId, conversationId } = body;
  try {
    await axios.post(`${siteUrl}/api/engine/getAnswerChain`, {
      query,
      chatbotId,
      conversationId,
    });
    return true;
  } catch (error) {
    console.error(error?.message || error);
  }
};

export const uploadPdfToSupabase = async (body: object) => {
  try {
    await axios.post(
      `${siteUrl}/api/engine/supabase/ingestSinglePdfToSupabase`,
      body,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
  } catch (error) {
    console.error(error?.message || error);
  }
};
