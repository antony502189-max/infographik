import { motion, useReducedMotion } from 'framer-motion'
import type { HTMLMotionProps } from 'framer-motion'
import type { ReactNode } from 'react'

interface RevealProps extends HTMLMotionProps<'div'> {
  children: ReactNode
  delay?: number
}

export function Reveal({
  children,
  delay = 0,
  transition,
  ...props
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.24 }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : { duration: 0.55, ease: 'easeOut', delay, ...transition }
      }
      {...props}
    >
      {children}
    </motion.div>
  )
}
