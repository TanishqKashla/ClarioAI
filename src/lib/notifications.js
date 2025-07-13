import { toast } from "sonner";

/**
 * Show a rate limit exceeded notification
 * @param {string} message - The rate limit message to display
 * @param {number} duration - Duration in milliseconds (default: 5000ms)
 */
export function showRateLimitNotification(message, duration = 5000) {
  toast.error("Rate Limit Exceeded", {
    description: message,
    duration: duration,
    position: "top-right",
  });
}

/**
 * Show a success notification
 * @param {string} title - The notification title
 * @param {string} message - The notification message
 * @param {number} duration - Duration in milliseconds (default: 3000ms)
 */
export function showSuccessNotification(title, message, duration = 3000) {
  toast.success(title, {
    description: message,
    duration: duration,
    position: "top-right",
  });
}

/**
 * Show an error notification
 * @param {string} title - The notification title
 * @param {string} message - The notification message
 * @param {number} duration - Duration in milliseconds (default: 5000ms)
 */
export function showErrorNotification(title, message, duration = 5000) {
  toast.error(title, {
    description: message,
    duration: duration,
    position: "top-right",
  });
} 