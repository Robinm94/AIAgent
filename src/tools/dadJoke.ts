import { z } from 'zod'
import type { ToolFn } from '../../types'
import fetch from 'node-fetch'

export const dadJokeToolDefinition = {
  name: 'dadJoke',
  description: 'Get a dad joke',
  parameters: z.object({}),
}

// This is the type of the arguments that the tool function will receive
// It is inferred from the `parameters` property of the tool definition
type Args = z.infer<(typeof dadJokeToolDefinition)['parameters']>

export const dadJokeTool: ToolFn<Args, string> = async ({ toolArgs }) => {
  const response = await fetch('https://icanhazdadjoke.com/', {
    headers: {
      Accept: 'application/json',
    },
  })
  const data = await response.json()
  return data.joke
}
