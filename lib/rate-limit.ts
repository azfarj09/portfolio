// Sliding window rate limiter using timestamp arrays
// This approach is more accurate as it tracks actual request timestamps
// and ensures exactly 'limit' requests are allowed per window

// Store timestamps of requests for each identifier
const rateLimitMap = new Map<string, number[]>()

// Mutex to prevent race conditions between concurrent requests
const processingRequests = new Set<string>()

export function rateLimit(identifier: string, limit: number = 3, windowMs: number = 15 * 60 * 1000) {
  const now = Date.now()
  const key = identifier

  // Simple lock check - if already processing this IP, treat as too fast
  if (processingRequests.has(key)) {
    const timestamps = rateLimitMap.get(key) || []
    const validTimestamps = timestamps.filter(ts => now - ts < windowMs)
    if (validTimestamps.length >= limit) {
      const oldestValidTimestamp = Math.min(...validTimestamps)
      const resetTime = oldestValidTimestamp + windowMs
      return {
        success: false,
        remaining: 0,
        resetTime,
        retryAfter: Math.ceil((resetTime - now) / 1000)
      }
    }
  }

  try {
    processingRequests.add(key)

    // Get existing timestamps for this identifier
    const timestamps = rateLimitMap.get(key) || []

    // Filter to only keep timestamps within the current window (sliding window)
    const validTimestamps = timestamps.filter(ts => now - ts < windowMs)

    // Check if limit has been reached
    if (validTimestamps.length >= limit) {
      // Find when the oldest valid timestamp will expire
      const oldestValidTimestamp = Math.min(...validTimestamps)
      const resetTime = oldestValidTimestamp + windowMs

      // Update the map with cleaned timestamps
      rateLimitMap.set(key, validTimestamps)

      return {
        success: false,
        remaining: 0,
        resetTime,
        retryAfter: Math.ceil((resetTime - now) / 1000)
      }
    }

    // Add current request timestamp
    validTimestamps.push(now)
    rateLimitMap.set(key, validTimestamps)

    // Calculate remaining requests
    const remaining = limit - validTimestamps.length

    // Calculate reset time (when the oldest request in window will expire)
    const oldestTimestamp = validTimestamps.length > 0 ? Math.min(...validTimestamps) : now
    const resetTime = oldestTimestamp + windowMs

    return {
      success: true,
      remaining,
      resetTime
    }
  } finally {
    processingRequests.delete(key)
  }
}

// Periodic cleanup to prevent memory leaks (run every 5 minutes)
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now()
    const windowMs = 15 * 60 * 1000 // 15 minutes

    for (const [key, timestamps] of rateLimitMap.entries()) {
      const validTimestamps = timestamps.filter(ts => now - ts < windowMs)
      if (validTimestamps.length === 0) {
        rateLimitMap.delete(key)
      } else {
        rateLimitMap.set(key, validTimestamps)
      }
    }
  }, 5 * 60 * 1000)
}