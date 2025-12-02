export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      {/* Static Back Link */}
      <div className="mb-8">
        <div className="inline-flex items-center text-sm text-gray-500 mb-4">
          ← Back to Issues
        </div>

        {/* Dynamic Title + Action Buttons */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="h-8 w-56 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
          <div className="flex items-center space-x-2">
            <div className="h-8 w-20 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
            <div className="h-8 w-20 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
          </div>
        </div>
      </div>

      {/* Top Details Card */}
      <div className="bg-white dark:bg-dark-elevated border border-gray-200 dark:border-dark-border-default rounded-lg shadow-sm p-6 mb-8">
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-4 w-28 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-4 w-28 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
        </div>

        {/* Description */}
        <div className="space-y-3">
          <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-4 w-5/6 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-4 w-4/6 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
        </div>
      </div>

      {/* Details Section */}
      <div className="bg-white dark:bg-dark-elevated border border-gray-200 dark:border-dark-border-default rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-medium mb-2">Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">Assigned to</p>
            <div className="h-4 w-36 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">Status</p>
            <div className="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">Priority</p>
            <div className="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">Created</p>
            <div className="h-4 w-28 bg-gray-300 dark:bg-gray-700 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  )
}
