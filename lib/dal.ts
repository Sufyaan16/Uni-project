import { db } from '@/db'
import { getSession } from './auth'
import { and, eq } from 'drizzle-orm'
// import { cache } from 'react'
import { issues, users } from '@/db/schema'
import { mockDelay } from './utils'

// ❌ DO NOT CACHE — it relies on cookies()
export async function getCurrentUser() {
  const session = await getSession()
  if (!session) return null

  try {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.id, session.userId))

    return result[0] || null
  } catch (error) {
    console.error('Error getting user by ID:', error)
    return null
  }
}

// Get user by email (fine)
export async function getUserByEmail(email: string) {
  try {
    const result = await db.select().from(users).where(eq(users.email, email))
    return result[0] || null
  } catch (error) {
    console.error('Error getting user by email:', error)
    return null
  }
}

// ❌ DO NOT USE "use cache"
// ❌ DO NOT USE cacheTag()
// This must stay dynamic because it relies on cookies()
export async function getIssues() {
  try {
    const user = await getCurrentUser()
    if (!user) return []

    const result = await db.query.issues.findMany({
      where: (issue, { eq }) => eq(issue.userId, user.id),
      with: {
        user: true,
      },
      orderBy: (issue, { desc }) => [desc(issue.createdAt)],
    })

    return result
  } catch (error) {
    console.error('Error fetching issues:', error)
    throw new Error('Failed to fetch issues')
  }
}

// Also must be dynamic
export async function getIssue(id: number) {
  try {
    await mockDelay(1000)
    const user = await getCurrentUser()
    if (!user) return null

    const issue = await db.query.issues.findFirst({
      where: and(eq(issues.id, id), eq(issues.userId, user.id)),
      with: {
        user: true,
      },
    })

    return issue
  } catch (error) {
    console.error(error)
    return null
  }
}
