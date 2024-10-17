export const baseURL = process.env.APPWRITE_ENDPOINT as string
export const eventsCollection = process.env.EVENTS_COLLECTION_ID as string
export const perceptradb = process.env.APPWRITE_DB_ID as string
export const projectid = process.env.APPWRITE_PROJECT_ID as string
export const appwrite_key = process.env.APPWRITE_KEY as string
export const formCollection=  process.env.FORMS_COLLECTION_ID as string
export const resposneCollection = process.env.RESPONSE_COLLECTION_ID as string
export const geminiapikey = process.env.GEMINI_API_KEY as string

export const headers = {
    "X-Appwrite-Project": projectid,
    "X-Appwrite-Key": appwrite_key,
    "Content-Type": "application/json"
  }