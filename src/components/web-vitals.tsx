'use client'

import { useEffect } from 'react'
import { onCLS, onINP, onFCP, onLCP, onTTFB } from 'web-vitals'

function sendToAnalytics(metric: { name: string; value: number; id: string }) {
  // 개발 환경에서는 콘솔에 출력
  if (process.env.NODE_ENV === 'development') {
    console.log('Web Vitals:', metric)
  }
  
  // 프로덕션에서는 분석 도구로 전송 (예: Google Analytics)
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      custom_parameter_1: metric.value,
      custom_parameter_2: metric.id,
      custom_parameter_3: metric.name,
    })
  }
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