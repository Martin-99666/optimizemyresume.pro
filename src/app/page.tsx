import { ResumeUpload } from '@/components/resume-upload'
import { ErrorBoundary } from '@/components/error-boundary'

export default function HomePage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">简历优化助手</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          上传你的简历，获得专业的优化建议和改进方案
        </p>
      </div>
      
      <ErrorBoundary>
        <ResumeUpload />
      </ErrorBoundary>
    </main>
  )
}