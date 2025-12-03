import { redirect } from 'next/navigation'
import IssueForm from './IssueForm'
import { getCurrentUser } from '@/lib/dal'

const NewIssue = async () => {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/signin')
  }

  // The form no longer needs an explicit userId; it uses the current user on the server
  return <IssueForm />
}

export default NewIssue
