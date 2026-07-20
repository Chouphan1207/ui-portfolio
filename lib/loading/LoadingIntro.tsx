'use client'

import React, { useState, useEffect } from 'react'
import { useLoading } from '@/lib/loading/loading-context'

const LoadingIntro = () => {
  // Trạng thái quản lý phần trăm loading, trạng thái hoàn tất chạy số, và trạng thái gỡ khỏi DOM
  const [progress, setProgress] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)
  const [fullyDone, setFullyDone] = useState(false)

  // Hook lấy hàm thông báo trạng thái đã tải xong từ Context
  const { markLoadingDone } = useLoading()

  // Cấu hình thời gian chạy animation (500ms)
  const loadingTime = 500
  const intervalTime = 15
  const increment = (100 / loadingTime) * intervalTime

  // 1. Vòng lặp mô phỏng tiến trình (Progress Simulation)
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment
        if (next >= 100) {
          clearInterval(timer) // Dừng bộ đếm khi đạt 100%
          setIsCompleted(true) // Kích hoạt trạng thái chuyển cảnh
          return 100
        }
        return next
      })
    }, intervalTime)

    return () => clearInterval(timer) // Dọn dẹp interval khi component unmount
  }, [increment])

  // 2. Điều phối vòng đời & dọn dẹp component khỏi DOM
  useEffect(() => {
    if (!isCompleted) return

    markLoadingDone() // Thông báo cho toàn bộ ứng dụng rằng loading đã kết thúc

    // Đợi 1 giây (1000ms) để các animation trượt hoàn tất trước khi gỡ hẳn khỏi DOM
    const unmountTimer = setTimeout(() => {
      setFullyDone(true)
    }, 1000)

    return () => clearTimeout(unmountTimer)
  }, [isCompleted, markLoadingDone])

  // 3. Giai đoạn kiểm tra: nếu đã hoàn tất hoàn toàn thì return null để gỡ bỏ khỏi cây DOM
  if (fullyDone) return null

  return (
    <div className="fixed top-0 left-0 w-full h-full z-50 pointer-events-none overflow-hidden">
      {/* Lớp nền xanh (Backdrop): Trượt lên theo trục Y khi isCompleted là true */}
      <div
        className={`absolute top-0 left-0 w-full h-full bg-[#566fc1] transition-transform duration-700 delay-200 ease-in-out ${
          isCompleted ? '-translate-y-full' : 'translate-y-0'
        }`}
      />

      {/* Lớp nội dung đen (Foreground): Chứa thông tin loading và % */}
      <div
        className={`absolute top-0 left-0 w-full h-full bg-black flex flex-col justify-between p-8 md:p-16 transition-transform duration-700 ease-in-out ${
          isCompleted ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <div className="text-white font-normal text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[70px] tracking-tight">
          Inspirux is loading...
        </div>

        <div className="absolute right-4 bottom-0 text-white font-light text-[120px] sm:text-[180px] md:text-[250px] leading-none select-none">
          {Math.round(progress)}%
        </div>
      </div>
    </div>
  )
}

export default LoadingIntro
