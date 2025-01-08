import OpenAI from 'openai'
import { openai } from './ai'
import type { AIMessage } from '../types'

export const runllm = async ({ messages }: { messages: AIMessage[] }) => {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    temperature: 0.1,
    messages,
  })

  return response.choices[0].message.content
}
