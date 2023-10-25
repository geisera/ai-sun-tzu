import { NextRequest, NextResponse } from 'next/server'
import { PineconeClient } from '@pinecone-database/pinecone'
import {
  queryPineconeVectorStoreAndQueryLLM,
} from '../../../utils'
import { indexName } from '../../../config'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const client = new PineconeClient()
  await client.init({
    // apiKey: process.env.PINECONE_API_KEY || '',
    // environment: process.env.PINECONE_ENVIRONMENT || ''
    apiKey: "05f5006d-730b-43e0-af8c-d7f25b250101",
    environment: "gcp-starter"
  })

  const text = await queryPineconeVectorStoreAndQueryLLM(client, indexName, body)

  return NextResponse.json({
    data: text
  })
}