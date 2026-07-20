import React from 'react';
import { ContactForm } from '@/components/blog/ContactForm';

const ContactPage = () => {
  return (
    // Sử dụng class bg-image-overlay (đã định nghĩa sẵn trong global.css của bạn)

    <div className="relative min-h-screen w-full py-20 px-4 bg-image-overlay bg-fixed">
      {/* Lớp Overlay đã nằm trong global.css, không cần div absolute ở đây nữa */}
      <div className="relative z-10 max-w-6xl mx-auto">

        <div className="text-center mb-16 py-10">
          <p className="text-sm font-bold text-[#81e4da] uppercase tracking-widest mb-4">Contact Me</p>
          <h1 className="text-5xl md:text-6xl font-bold text-[#e2e8f0] mb-6">I'd love to hear from you</h1>
          <p className="text-xl text-[#81e4da] max-w-lg mx-auto">
            I'm currently available for new projects and collaborations. Let's build something great together.
          </p>
        </div>

        {/* Info Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
          {[
            // Truyền thêm thuộc tính 'isEmail' hoặc kiểm tra trực tiếp
            {
              title: "Available for Work",
              desc: "Open to freelance & full-time roles.",
              action: "chouphan1207@gmail.com",
              href: "mailto:chouphan1207@gmail.com"
            },
            { title: "Skills & Expertise", desc: "React, Next.js, UI/UX & Motion.", action: "View My Resume", href: "#" },
            { title: "Let's Connect", desc: "Always excited to explore projects.", action: "LinkedIn Profile", href: "#" }
          ].map((item, idx) => (
            <div key={idx} className="bg-card/90 backdrop-blur-md p-6 rounded-2xl border border-border hover:border-primary transition-all flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-title mb-2">{item.title}</h3>
                <p className="text-description mb-4 text-sm opacity-80">{item.desc}</p>
              </div>

              {/* Ép kiểu thẻ a nhận href từ object */}
              <a
                href={item.href}
                className="text-primary font-medium hover:underline text-sm block"
                target={item.href.startsWith("mailto") ? "_self" : "_blank"}
                rel={item.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              >
                {item.action} →
              </a>
            </div>
          ))}
        </div>

        {/*Ô Contact và nơi ở*/}
        <div className="flex justify-center items-center lg:justify-center lg:items-center w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start w-fit">
            <div className="hidden lg:block relative w-190 h-162.5 overflow-hidden py-5 top-3 z-0 animate-slide-left ml-30">
              <img
                src="/maplg.png"
                alt="World map"
                className="absolute top-0 w-full h-full object-cover rounded-xl"
              />
              <div className="absolute top-[35%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="w-8 h-8 bg-ring rounded-full shadow-md animate-ping" />
                <div className="w-4 h-4 bg-accent border-b-4 border-blue-950 rounded-full absolute top-2 left-2" />
              </div>
            </div>

            {/* Form Container */}
            <div className="bg-card/30 backdrop-blur-md rounded-2xl shadow-xl z-1 mx-auto">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
