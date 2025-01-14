import type { ToolFn } from '../../types'
import { z } from 'zod'
import { openai } from '../ai'

export const generateImageToolDefinition = {
  name: 'generateImage',
  description: 'Generate an image',
  parameters: z.object({
    prompt: z.string(),
  }),
}

type Args = z.infer<(typeof generateImageToolDefinition)['parameters']>

export const generateImageTool: ToolFn<Args, string> = async ({
  toolArgs,
  userMessage,
}) => {
  const response = await openai.images.generate({
    model: 'dall-e-2',
    prompt: toolArgs.prompt,
    n: 1,
    size: '512x512',
  })

  return response.data[0].url!
}
