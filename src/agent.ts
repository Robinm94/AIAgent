import { runllm } from './llm'
import { getMessages, addMessage } from './memory'
import type { AIMessage } from '../types'
import { showLoader, logMessage } from './ui'

export const runAgent = async ({
  userMessage,
  tools,
}: {
  userMessage: string
  tools: any[]
}) => {
  await addMessage([{ role: 'user', content: userMessage }])

  const loader = showLoader('Thinking...')

  const history = await getMessages()
  const response = await runllm({ messages: history, tools })

  //   if (response.tool_calls) {
  //     console.log(response.tool_calls)
  //   }

  await addMessage([response])

  if (response.role === 'assistant' && response.content) {
    loader.succeed()
  } else {
    loader.fail()
  }
  logMessage(response)

  return response
}
