import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import fs from 'fs'
import path from 'path'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Read knowledge base at module initialization
const knowledgeBasePath = path.join(process.cwd(), 'chatbot-knowledge-base.md')
let knowledgeBaseContent = ''

try {
  knowledgeBaseContent = fs.readFileSync(knowledgeBasePath, 'utf-8')
} catch (error) {
  console.error('Failed to load knowledge base:', error)
  knowledgeBaseContent = 'Knowledge base not available.'
}

export async function POST(req: Request) {
  try {
    const { message } = await req.json()

    const systemPrompt = `You are Yongkang's AI assistant. You help visitors learn about Yongkang's projects and experience.

IMPORTANT: Keep your answers as brief and concise as possible. Use short sentences and bullet points when appropriate. Get straight to the point without unnecessary elaboration.

Be helpful and enthusiastic about Yongkang's work. If asked about topics outside his portfolio, politely redirect to his projects and skills.

Here is the complete knowledge base about Yongkang:

${knowledgeBaseContent}`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message },
      ],
      temperature: 0.7,
      max_tokens: 200,
    })

    const botResponse = completion.choices[0]?.message?.content || "I'm having trouble responding right now. Please try again!"

    return NextResponse.json({ message: botResponse })
  } catch (error) {
    console.error('Chat API Error:', error)
    return NextResponse.json(
      { error: 'Failed to get response from AI' },
      { status: 500 }
    )
  }
}