export const firestoreErrors: Record<string, string> = {
  // 🔐 Auth & Permission
  "permission-denied": "You do not have permission to access this resource.",
  unauthenticated: "You must be signed in to perform this operation.",

  // ⚠️ Quota & Limits
  "resource-exhausted": "Quota exceeded or too many concurrent operations.",
  "deadline-exceeded": "The operation timed out. Try again.",
  unavailable:
    "The Firestore service is currently unavailable. Please try again later.",
  aborted: "The operation was aborted due to a conflict or concurrency issue.",

  // ❌ Document or Collection Errors
  "not-found": "The requested document was not found.",
  "already-exists": "A document with the same ID already exists.",
  "failed-precondition":
    "The operation could not be completed due to a precondition failure (e.g., missing index).",

  // 🧪 Input Errors
  "invalid-argument": "An invalid argument was provided. Check your inputs.",
  "out-of-range": "A value provided is outside the allowed range.",

  // 🚨 Unexpected Internal Issues
  internal: "An internal Firestore error occurred.",
  cancelled: "The operation was cancelled.",
  "data-loss": "Unrecoverable data loss or corruption occurred.",
  unimplemented: "This operation is not supported or implemented.",
  unknown: "An unknown error occurred.",
};
