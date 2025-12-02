import { db } from '@/db'
import { issues } from '@/db/schema'

import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest) => {
  try {
    const issues = await db.query.issues.findMany({})
    return NextResponse.json({ data: { issues } })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Error' }, { status: 500 })
  }
}

export const POST = async (req: NextRequest) => {
  try {
    const [newIssue] = await db
      .insert(issues)
      .values(await req.json())
      .returning()
    return NextResponse.json({
      data: newIssue,
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json({ error: 'Error' }, { status: 500 })
  }
}
