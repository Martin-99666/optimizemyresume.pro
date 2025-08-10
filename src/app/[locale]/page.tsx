// import { getTranslations } from 'next-intl/server'
import { ResumeUpload } from '@/components/resume-upload'

export default async function HomePage() {
  // const t = await getTranslations()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">
            简历上传优化助手
          </h1>
          <p className="text-lg text-muted-foreground">
            上传您的简历，获得专业的AI优化建议
          </p>
        </div>
        
        <ResumeUpload />
      </div>
    </div>
  )
}