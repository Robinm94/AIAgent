import 'dotenv/config'
import { runllm } from './src/llm'

const userMessage = process.argv[2]

if (!userMessage) {
  console.error('Please provide a message')
  process.exit(1)
}

const response = await runllm({ userMessage })

console.log(response)
