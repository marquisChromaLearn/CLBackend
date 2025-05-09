// src/collections/Employees.ts
import { CollectionConfig } from 'payload'
import { deactivateAccount } from '../hooks/deactivateAccount' // ⬅️ পাথ‑কেস মিলিয়ে নিন

const Employees: CollectionConfig = {
  slug: 'employees',
  labels: { singular: 'Employee', plural: 'Employees' },
  auth: true,
  admin: { useAsTitle: 'email' },

  fields: [
    { name: 'firstName', type: 'text', required: true },
    { name: 'lastName', type: 'text', required: true },
    { name: 'email', type: 'email', required: true, unique: true },
    { name: 'phone', type: 'text' },
    { name: 'department', type: 'text', required: true },
    {
      name: 'gender',
      type: 'select',
      options: ['Male', 'Female', 'Other'],
      defaultValue: 'Other',
    },
    {
      name: 'isAdmin',
      type: 'checkbox',
      label: 'Administrator?',
      defaultValue: false,
    },
    {
      name: 'lastLogin',
      type: 'date',
      label: 'Last Login',
      admin: {
        readOnly: true,
        position: 'sidebar',
        description: 'Set automatically on login',
        condition: ({ operation }) => operation !== 'create',
        date: {
          pickerAppearance: 'dayAndTime',
          displayFormat: 'yyyy-MM-dd HH:mm:ss',
        },
      },
    },
    {
      name: 'isActiveAccount',
      type: 'checkbox',
      label: 'Active Account?',
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
  ],

  hooks: {
    beforeLogin: [deactivateAccount],

    afterLogin: [
      async ({ req, user }) => {
        await req.payload.update({
          req,
          collection: 'employees',
          id: user.id,
          data: { lastLogin: new Date().toISOString() },
          overrideAccess: true,
        })
      },
    ],

    afterChange: [
      async ({ req, doc, operation }) => {
        if (operation === 'create' && !doc.lastLogin) {
          await req.payload.update({
            req,
            collection: 'employees',
            id: doc.id,
            data: { lastLogin: new Date().toISOString() },
            overrideAccess: true,
          })
        }
      },
    ],
  },
}

export default Employees
