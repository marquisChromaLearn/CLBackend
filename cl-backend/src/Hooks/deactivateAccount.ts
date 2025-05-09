// src/hooks/rejectInactive.ts
import type { CollectionBeforeLoginHook } from 'payload'

export const deactivateAccount: CollectionBeforeLoginHook = async ({ user: emp }) => {
  if (emp && emp.isActiveAccount === false) {
    throw new Error('Account deactivated')
  }
  return emp
}
