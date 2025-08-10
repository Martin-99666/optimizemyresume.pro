'use client'

import { type ReactNode } from 'react'
import { ErrorBoundary as ReactErrorBoundary, type FallbackProps } from 'react-error-boundary'
import { AlertCircle, RefreshCw } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface ErrorBoundaryProps {
  children: ReactNode
}

function ErrorFallback({ 
  error, 
  resetErrorBoundary 
}: FallbackProps) {
  const isDevelopment = process.env.NODE_ENV === 'development'
  
  return (
    <Card className="max-w-md mx-auto">
      <CardContent className="p-6 text-center">
        <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
        <h2 className="text-lg font-semibold mb-2">Error</h2>
        <p className="text-muted-foreground mb-4">
          Something went wrong. Please try again.
        </p>
        
        {isDevelopment && error && (
          <details className="text-left mb-4 p-3 bg-muted rounded-md">
            <summary className="cursor-pointer text-sm font-medium mb-2">
              Error Details (Development Only)
            </summary>
            <pre className="text-xs text-muted-foreground whitespace-pre-wrap break-words">
              {error.message}
              {error.stack && `\n\n${error.stack}`}
            </pre>
          </details>
        )}
        
        <Button 
          onClick={resetErrorBoundary}
          variant="outline"
          className="gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Try again
        </Button>
      </CardContent>
    </Card>
  )
}

export function ErrorBoundary({ children }: ErrorBoundaryProps) {
  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error: Error, errorInfo) => {
        console.error('Error caught by boundary:', error, errorInfo)
        // Here you can add error reporting logic, e.g., send to monitoring service
      }}
    >
      {children}
    </ReactErrorBoundary>
  )
}