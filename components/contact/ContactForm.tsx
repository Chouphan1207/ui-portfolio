"use client";
import React, { useEffect, useState } from "react";
import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";

import { Input } from "../shared/Input";
import { Textarea } from "../shared/TextArea";
import { cn } from "@/lib/utils";
import {
  IconBrandGithub,
  IconBrandGoogle,
} from "@tabler/icons-react";
import { Label } from "@radix-ui/react-label";

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
    <div className="relative w-full max-w-2xl mx-z-10 rounded-2xl bg-card border border-border p-6 sm:p-10 shadow-2xl backdrop-blur-md">
      {/* Tiêu đề form nhận diện rõ ràng */}
      <div className="mb-8 text-center sm:text-left">
        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-title">
          Let&apos;s Build Together
        </h3>
        <p className="mt-2 text-sm text-description">
          Have a project in mind or want to collaborate? Drop me a message below.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <LabelInputContainer>
            <Label htmlFor="firstname" className="text-sm font-medium text-foreground">
              First name
            </Label>
            <Input
              id="firstname"
              name="first_name"
              placeholder="Tin"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="bg-background border-border text-foreground focus:ring-ring"
            />
          </LabelInputContainer>

          <LabelInputContainer>
            <Label htmlFor="lastname" className="text-sm font-medium text-foreground">
              Last name
            </Label>
            <Input
              id="lastname"
              name="last_name"
              placeholder="Phan Hoang Trong"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="bg-background border-border text-foreground focus:ring-ring"
            />
          </LabelInputContainer>
        </div>

        <LabelInputContainer>
          <Label htmlFor="email" className="text-sm font-medium text-foreground">
            Email Address
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder="project@email.com"
            className="bg-background border-border text-foreground focus:ring-ring"
          />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="phone" className="text-sm font-medium text-foreground">
            Phone Number
          </Label>
          <Input
            id="phone"
            name="phone"
            placeholder="+84 ..."
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="bg-background border-border text-foreground focus:ring-ring"
          />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="message" className="text-sm font-medium text-foreground">
            Message
          </Label>
          <Textarea
            id="message"
            name="message"
            placeholder="Send me a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="bg-background border-border text-foreground focus:ring-ring min-h-[120px]"
          />
        </LabelInputContainer>

        <button
          className="group/btn relative flex items-center justify-center h-11 w-full rounded-xl bg-secondary font-medium text-secondary-foreground shadow-md transition-all duration-300 hover:opacity-90 hover:shadow-lg cursor-pointer"
          type="submit"
        >
          <span>Send Message &rarr;</span>
          <BottomGradient />
        </button>

        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-border"></div>
          <span className="flex-shrink mx-4 text-xs uppercase tracking-wider text-muted-foreground">Or connect via</span>
          <div className="flex-grow border-t border-border"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            className="group/btn relative flex h-11 w-full items-center justify-center space-x-2 rounded-xl border border-border bg-background px-4 font-medium text-foreground transition-all duration-300 hover:bg-muted cursor-pointer"
            type="button"
            onClick={() => window.open("https://github.com/Chouphan1207", "_blank")}
          >
            <IconBrandGithub className="h-5 w-5" />
            <span className="text-sm">GitHub</span>
            <BottomGradient />
          </button>

          <button
            className="group/btn relative flex h-11 w-full items-center justify-center space-x-2 rounded-xl border border-border bg-background px-4 font-medium text-foreground transition-all duration-300 hover:bg-muted cursor-pointer"
            type="button"
            onClick={() => window.open("mailto:chouphan1207@gmail.com", "_blank")}
          >
            <IconBrandGoogle className="h-5 w-5" />
            <span className="text-sm">Email Direct</span>
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
      <span className="absolute left-0 right-0 -bottom-px block h-px bg-gradient-to-r from-transparent via-secondary to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute left-0 right-0 -bottom-px block h-0.5 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
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
    <div className={cn("flex w-full flex-col space-y-1.5", className)}>
      {children}
    </div>
  );
};
