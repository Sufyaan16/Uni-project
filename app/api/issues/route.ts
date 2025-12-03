import { db } from '@/db'
import { issues } from '@/db/schema'
import { getCurrentUser } from '@/lib/dal'

import { NextRequest, NextResponse } from 'next/server'

export const GET = async (_req: NextRequest) => {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userIssues = await db.query.issues.findMany({
      where: (issue, { eq }) => eq(issue.userId, user.id),
    })

    return NextResponse.json({ data: { issues: userIssues } })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Error' }, { status: 500 })
  }
}

export const POST = async (req: NextRequest) => {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { userId: _ignoredUserId, ...body } = await req.json()

    const [newIssue] = await db
      .insert(issues)
      .values({
        ...body,
        userId: user.id,
      })
      .returning()

    return NextResponse.json({
      data: newIssue,
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json({ error: 'Error' }, { status: 500 })
  }
}
