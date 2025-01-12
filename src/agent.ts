import { runllm } from './llm'
import { getMessages, addMessage, saveToolResponse } from './memory'
import type { AIMessage } from '../types'
import { showLoader, logMessage } from './ui'
import { runTool } from './toolRunner'

export const runAgent = async ({
  userMessage,
  tools,
}: {
  userMessage: string
  tools: any[]
}) => {
  await addMessage([{ role: 'user', content: userMessage }])

  const loader = showLoader('Thinking...')

  while (true) {
    const history = await getMessages()
    const response = await runllm({ messages: history, tools })

    await addMessage([response])

    if (response.role === 'assistant' && response.content) {
      loader.update(`Got Response`)
      loader.succeed()
      logMessage(response)
      return response
    }

    if (response.tool_calls) {
      // logMessage(response)
      const toolCall = response.tool_calls[0]
      loader.update(`Tool Executing: ${toolCall.function.name}`)
      const toolResponse = await runTool(toolCall, userMessage)
      await saveToolResponse(toolCall.id, toolResponse)
      loader.update(`Tool Executed: ${toolCall.function.name}`)
    }
  }
}
