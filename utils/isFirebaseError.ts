export function isFirebaseError(error: any): error is Error {
  return typeof error.code === 'string';
}