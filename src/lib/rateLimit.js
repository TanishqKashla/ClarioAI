import prisma from './prisma';

/**
 * Check if a user has exceeded their rate limit for a specific endpoint
 * @param {string} userId - The user's ID
 * @param {string} endpoint - The endpoint being accessed ('study-plan', 'ai-notes', 'regenerate-notes')
 * @param {number} maxRequests - Maximum number of requests allowed per day
 * @returns {Promise<{allowed: boolean, currentCount: number, limit: number, resetAt: Date}>}
 */
export async function checkRateLimit(userId, endpoint, maxRequests) {
  const now = new Date();
  
  // Calculate when the current day ends (next day at midnight)
  const resetAt = new Date();
  resetAt.setHours(24, 0, 0, 0); // Next day at midnight
  
  // Find existing rate limit record for today
  let rateLimit = await prisma.rateLimit.findFirst({
    where: {
      userId,
      endpoint,
      window: 'day',
      resetAt: { gt: now } // Not expired yet
    }
  });
  
  if (!rateLimit) {
    // First request of the day for this endpoint
    rateLimit = await prisma.rateLimit.create({
      data: {
        userId,
        endpoint,
        window: 'day',
        count: 1,
        resetAt
      }
    });
    
    return {
      allowed: true,
      currentCount: 1,
      limit: maxRequests,
      resetAt
    };
  }
  
  // Check if user has exceeded their limit
  if (rateLimit.count >= maxRequests) {
    return {
      allowed: false,
      currentCount: rateLimit.count,
      limit: maxRequests,
      resetAt: rateLimit.resetAt
    };
  }
  
  // Increment the count
  await prisma.rateLimit.update({
    where: { id: rateLimit.id },
    data: { count: rateLimit.count + 1 }
  });
  
  return {
    allowed: true,
    currentCount: rateLimit.count + 1,
    limit: maxRequests,
    resetAt: rateLimit.resetAt
  };
}

/**
 * Get current usage for a user across all endpoints
 * @param {string} userId - The user's ID
 * @returns {Promise<Object>}
 */
export async function getUserUsage(userId) {
  const now = new Date();
  
  const rateLimits = await prisma.rateLimit.findMany({
    where: {
      userId,
      window: 'day',
      resetAt: { gt: now }
    }
  });
  
  const usage = {
    'study-plan': { current: 0, limit: 3 },
    'ai-notes': { current: 0, limit: 10 },
    'regenerate-notes': { current: 0, limit: 1 }
  };
  
  rateLimits.forEach(limit => {
    if (usage[limit.endpoint]) {
      usage[limit.endpoint].current = limit.count;
    }
  });
  
  return usage;
}

/**
 * Clean up old rate limit records (run periodically)
 */
export async function cleanupOldRateLimits() {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  
  await prisma.rateLimit.deleteMany({
    where: {
      createdAt: { lt: thirtyDaysAgo }
    }
  });
} 