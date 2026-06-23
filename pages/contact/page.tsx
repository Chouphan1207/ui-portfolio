import React from 'react';
import { ContactForm } from '@/components/blog/ContactForm';
import { Spotlight } from '@/components/home/Spotlight';

const ContactPage = () => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-primary text-title py-25">
      <div className="relative w-full h-full">
        <Spotlight className=" -top-40 -left-10 md:-left-32 md:-top-20 h-screen" fill="#3fc1c0" />
        <Spotlight className=" -top-10 left-[80%] h-[80vh] w-[40vw]" fill="#0899ba" />
        <Spotlight className=" top-28 left-80 h-[80vh] w-[50vw]" fill="#1c558e" />
      </div>
      {/* Header Section */}
      <div className="text-center mb-12 w-screen">
        <p className="text-2xl font-medium text-description mb-2">Contact Me</p>
        <h1 className="text-4xl sm:text-6xl font-bold mb-2">
          I&apos;d love to hear from you
        </h1>
        <p className="text-xl text-neutral-500">
          I&apos;ll be available in July 2025 in Ho Chi Minh City, Vietnam.
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center relative">
        {/* Map Section */}
        <div className="hidden lg:block relative w-190 h-[650px] overflow-hidden py-5 z-0 animate-slide-left">
          <img
            src="/maplg.png"
            alt="World map"
            className="absolute top-0 left-2 w-full h-full object-cover rounded-xl"
          />
          <div className="absolute top-[35%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="w-8 h-8 bg-[var(--ring)] rounded-full shadow-md animate-ping" />
            <div className="w-4 h-4 bg-[var(--accent)] border-b-4 border-blue-950 rounded-full absolute top-2 left-2" />
          </div>
        </div>
        <div className="w-100 p-8 md:p-0 z-20">
          <ContactForm />
        </div>
      </div>

      {/* Info Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mt-10">
        <div>
          <h3 className="text-xl font-semibold mb-2">Available for Work</h3>
          <p className="text-sm text-neutral-500 mb-1">
            I&apos;m currently open to freelance or full-time opportunities.
          </p>
          <a
            href="mailto:chouphan1207@gmail.com"
            className="text-description hover:underline text-md"
          >
            chouphan1207@gmail.com
          </a>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Skills & Expertise</h3>
          <p className="text-sm text-neutral-500 mb-1">
            React, Next.js, Tailwind CSS, UI/UX, Motion Design & more.
          </p>
          <a
            href="https://drive.google.com/file/d/16_KDCjM10A5jgRFTQKvMYIt_LVXsa6T2/view?usp=drive_link"
            className="text-description hover:underline text-md"
            target="_blank"
            rel="noopener noreferrer"
          >
            View My Resume
          </a>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Let&apos;s Connect</h3>
          <p className="text-sm text-neutral-500 mb-1">
            I&apos;m always excited to explore creative projects.
          </p>
          <a
            href="https://www.linkedin.com/in/tin-phan-hoang-trong-110a2422a/"
            className="text-description hover:underline text-md"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn Profile
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
