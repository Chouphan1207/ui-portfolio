"use client";
import React, { useEffect, useState } from "react";
import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";

import { Input } from "../../shared/ui/Input";
import { Label } from "../../shared/ui/Label";
import { Textarea } from "../../shared/ui/TextArea";
import { cn } from "@/lib/utils";
import {
  IconBrandGithub,
  IconBrandGoogle,
} from "@tabler/icons-react";

export function ContactForm() {
  const [userEmail, setUserEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email) {
        setUserEmail(user.email);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("https://formspree.io/f/movdoydj", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _replyto: userEmail,
          email: userEmail,
          message,
          first_name: firstName,
          last_name: lastName,
          phone,
        }),
      });

      if (!response.ok) throw new Error("Failed to send");

      alert("Your message has been sent successfully!");
      // Clear form
      setFirstName("");
      setLastName("");
      setUserEmail("");
      setPhone("");
      setMessage("");
    } catch (error) {
      console.error("Error:", error);
      alert("Error sending email.");
    }
  };

  return (
    <div className="md:bg-[#90daee] p-2 md:rounded-2xl md:p-8 w-full lg:w-100 z-10">
      <form className="my-8" onSubmit={handleSubmit}>
        <div className="mb-4 flex flex-col gap-1 space-y-2 md:flex-row md:space-y-0 text-primary">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input
              id="firstname"
              name="first_name"
              placeholder="Tin"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastname">Last name</Label>
            <Input
              id="lastname"
              name="last_name"
              placeholder="Phan Hoang Trong"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4 text-primary">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder="project@email.com"
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4 text-primary">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            name="phone"
            placeholder=""
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-8 text-primary">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            name="message"
            placeholder="Send me a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </LabelInputContainer>

        <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-900 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] transition duration-300 hover:brightness-150 hover:shadow-lg"
          type="submit"
        >
          Send &rarr;
          <BottomGradient />
        </button>


        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

        <div className="flex flex-col space-y-4">
          <button
            className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gradient-to-br from-black to-neutral-900 px-4 font-medium text-black  dark:shadow-[0px_0px_1px_1px_#262626] transition duration-300 hover:brightness-150"
            type="button"
          >
            <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300"
            onClick={() => window.open("https://github.com/Chouphan1207", "_blank")}>
              GitHub
            </span>
            <BottomGradient />
          </button>
          <button
            className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gradient-to-br from-black to-neutral-900 px-4 font-medium text-black  dark:shadow-[0px_0px_1px_1px_#262626] transition duration-300 hover:brightness-150"
            type="button"
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300"
            onClick={() => window.open("mailto:chouphan1207@gmail.com", "_blank")}>
              Google
            </span>
            <BottomGradient />
          </button>
        </div>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute left-0 right-0 -bottom-px block h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute left-0 right-0 -bottom-px block h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
