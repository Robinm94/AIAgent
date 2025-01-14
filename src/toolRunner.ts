import type OpenAI from 'openai'

import {
  generateImageTool,
  generateImageToolDefinition,
} from './tools/generateImage'
import { redditTool, redditToolDefinition } from './tools/reddit'
import { dadJokeTool, dadJokeToolDefinition } from './tools/dadJoke'

export const runTool = async (
  toolCall: OpenAI.Chat.Completions.ChatCompletionMessageToolCall,
  userMessage: string
) => {
  const input = {
    userMessage,
    toolArgs: JSON.parse(toolCall.function.arguments || '{}'),
  }
  switch (toolCall.function.name) {
    case generateImageToolDefinition.name:
      return generateImageTool(input)
    case redditToolDefinition.name:
      return redditTool(input)
    case dadJokeToolDefinition.name:
      return dadJokeTool(input)
    default:
      return `Never run this tool: ${toolCall.function.name} again, or else!`
  }
}
