import 'dotenv/config'
import { runllm } from './src/llm'
import { getMessages, addMessage } from './src/memory'
const userMessage = process.argv[2]

if (!userMessage) {
  console.error('Please provide a message')
  process.exit(1)
}

const messages = await getMessages()
const response = await runllm({
  messages: [...messages, { role: 'user', content: userMessage }],
})

console.log(response)

await addMessage([{ role: 'user', content: userMessage }])
await addMessage([{ role: 'assistant', content: response }])
