// Simple in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

export function rateLimit(identifier: string, limit: number = 5, windowMs: number = 15 * 60 * 1000) {
  const now = Date.now()
  const key = identifier
  
  // Clean up expired entries
  for (const [k, v] of rateLimitMap.entries()) {
    if (now > v.resetTime) {
      rateLimitMap.delete(k)
    }
  }
  
  const record = rateLimitMap.get(key)
  
  if (!record) {
    // First request from this identifier
    rateLimitMap.set(key, {
      count: 1,
      resetTime: now + windowMs
    })
    return { success: true, remaining: limit - 1, resetTime: now + windowMs }
  }
  
  if (now > record.resetTime) {
    // Window has expired, reset
    rateLimitMap.set(key, {
      count: 1,
      resetTime: now + windowMs
    })
    return { success: true, remaining: limit - 1, resetTime: now + windowMs }
  }
  
  if (record.count >= limit) {
    // Rate limit exceeded
    return { 
      success: false, 
      remaining: 0, 
      resetTime: record.resetTime,
      retryAfter: Math.ceil((record.resetTime - now) / 1000)
    }
  }
  
  // Increment count
  record.count++
  rateLimitMap.set(key, record)
  
  return { 
    success: true, 
    remaining: limit - record.count, 
    resetTime: record.resetTime 
  }
}