import { PrismaClient } from '@prisma/client'
import path from 'path'
import fs from 'fs'
import os from 'os'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  (() => {
    if (process.env.NODE_ENV === 'production') {
      const dbPath = path.join(os.tmpdir(), 'dev.db')
      
      if (!fs.existsSync(dbPath)) {
        const originalDbPath = path.join(process.cwd(), 'prisma', 'dev.db')
        if (fs.existsSync(originalDbPath)) {
          fs.copyFileSync(originalDbPath, dbPath)
        }
      }

      return new PrismaClient({
        datasources: {
          db: {
            url: `file:${dbPath}`,
          },
        },
      })
    }
    return new PrismaClient()
  })()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma
