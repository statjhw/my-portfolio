'use client'

import { useEffect } from 'react'
import { onCLS, onINP, onFCP, onLCP, onTTFB } from 'web-vitals'

function sendToAnalytics(metric: { name: string; value: number; id: string }) {
  // 개발 환경에서는 콘솔에 출력
  if (process.env.NODE_ENV === 'development') {
    console.log('Web Vitals:', metric)
  }
  
  // 프로덕션에서는 분석 도구로 전송 (예: Google Analytics)
  // 현재는 개발용으로만 콘솔 출력, 실제 분석 도구는 나중에 연동
}

export function WebVitals() {
  useEffect(() => {
    // Core Web Vitals 측정
    onCLS(sendToAnalytics)
    onINP(sendToAnalytics) // INP (Interaction to Next Paint) - FID 대체
    onLCP(sendToAnalytics)
    
    // 추가 메트릭
    onFCP(sendToAnalytics)
    onTTFB(sendToAnalytics)
  }, [])

  return null
}