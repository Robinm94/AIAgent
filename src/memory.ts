import { JSONFilePreset } from 'lowdb/node'
import type { AIMessage } from '../types'
import { v4 as uuidv4 } from 'uuid'

export type MessageWithMetaData = AIMessage & {
  id: string
  createdAt: string
}

type Data = {
  messages: MessageWithMetaData[]
}

export const addMetaData = (message: AIMessage): MessageWithMetaData => ({
  ...message,
  id: uuidv4(),
  createdAt: new Date().toISOString(),
})

export const removeMetaData = (message: MessageWithMetaData): AIMessage => {
  const { id, createdAt, ...rest } = message
  return rest
}

const defaultData: Data = {
  messages: [],
}

export const getDb = async () => {
  const db = JSONFilePreset<Data>('db.json', defaultData)
  return db
}

export const addMessage = async (message: AIMessage[]) => {
  const db = await getDb()
  db.data.messages.push(...message.map(addMetaData))
  await db.write()
}

export const getMessages = async () => {
  const db = await getDb()
  return db.data.messages.map(removeMetaData)
}

export const saveToolResponse = async (
  toolCallID: string,
  toolResponse: string
) => {
  await addMessage([
    { role: 'tool', content: toolResponse, tool_call_id: toolCallID },
  ])
}
