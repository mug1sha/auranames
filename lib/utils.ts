import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type PlanLevel = "none" | "starter" | "pro" | "business"

const PLAN_LEVELS: Record<PlanLevel, number> = {
  "none": 0,
  "starter": 1,
  "pro": 2,
  "business": 3
}

/**
 * Checks if a user plan has access to a feature requiring a specific level.
 * Implements hierarchical access (Business > Pro > Starter > None).
 */
export function hasAccess(userPlan: PlanLevel, requiredPlan: PlanLevel): boolean {
  return PLAN_LEVELS[userPlan] >= PLAN_LEVELS[requiredPlan]
}
