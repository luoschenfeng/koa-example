import {
  Configuration, OpenAIApi,
} from 'openai';
import  {
  OPENAI_API_KEY, ORGANIZATION_ID,
} from '@/const'
const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
  organization: ORGANIZATION_ID,
});

const openai = new OpenAIApi(configuration);

export async function createCompletion(prompt) {
  const {
    data,
  } = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt,
    temperature: 0,
    max_tokens: 7,
  });

  return data.choices
}
