import React from 'react'
import { parseISO, formatDistanceToNow } from 'date-fns'

export function TimeAgo({ timestamp }) {
  const date = parseISO(timestamp)
  const timePeriod = formatDistanceToNow(date)

  return <span> {timePeriod} ago</span>
}
