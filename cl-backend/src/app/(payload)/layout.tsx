// src/app/(payload)/layout.tsx
import React from 'react'
import '@payloadcms/next/css'

import config from '@payload-config'
import { RootLayout, handleServerFunctions } from '@payloadcms/next/layouts'
import type { ServerFunctionClient } from 'payload'

import { importMap } from './admin/importMap.js'
import './custom.scss'

const serverFunction: ServerFunctionClient = async (args) => {
  'use server'
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  })
}

export default function PayloadLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <RootLayout
      config={config}
      importMap={importMap}
      serverFunction={serverFunction}
      /* 👇 suppressHydrationWarning passed to <html> */
      htmlProps={{ suppressHydrationWarning: true }}
    >
      {children}
    </RootLayout>
  )
}
