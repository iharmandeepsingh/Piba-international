import * as React from 'react'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'link' | 'luxury' | 'gold'
  size?: 'default' | 'sm' | 'lg' | 'xl'
  loading?: boolean
  children: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', loading, disabled, children, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center rounded-full font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-piba-gold focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
    
    const variants = {
      default: 'bg-piba-gold text-white hover:bg-piba-gold-dark shadow-md hover:shadow-lg',
      outline: 'border-2 border-piba-gold text-piba-gold hover:bg-piba-gold hover:text-white',
      ghost: 'text-piba-gold hover:bg-piba-gold/10',
      link: 'text-piba-gold underline-offset-4 hover:underline',
      luxury: 'bg-gradient-to-r from-piba-gold to-piba-gold-dark text-white shadow-lg hover:shadow-xl hover:scale-105',
      gold: 'gold-gradient text-white shadow-gold hover:shadow-2xl'
    }
    
    const sizes = {
      default: 'px-6 py-3 text-sm',
      sm: 'px-4 py-2 text-xs',
      lg: 'px-8 py-4 text-base',
      xl: 'px-12 py-6 text-lg'
    }

    return (
      <button
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
