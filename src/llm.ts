import OpenAI from 'openai'
import { openai } from './ai'

export const runllm = async ({ userMessage }: { userMessage: string }) => {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    temperature: 0.1,
    messages: [{ role: 'user', content: userMessage }],
  })

  return response.choices[0].message.content
}
