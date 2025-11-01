"use client";

import { useTranslations } from 'next-intl';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { submitContactForm } from "@/actions/contactForm";
import { useState } from "react";
import { BlocksContent } from "@strapi/blocks-react-renderer";
import BlockRendererClient from './BlockRendererClient';
import { useReCaptcha } from "next-recaptcha-v3";
import { Spinner } from './ui/Spinner';

interface ContactUsProps {
  thankYou: BlocksContent;
}

export function ContactUs({ thankYou }: ContactUsProps) {
  const t = useTranslations();
  const { executeRecaptcha } = useReCaptcha();

  // Define the schema inside the component to use the t function
  const contactSchema = z.object({
    firstName: z.string().min(1, t('contact.form.errors.firstNameRequired')),
    lastName: z.string().min(1, t('contact.form.errors.lastNameRequired')),
    email: z.string().min(1, t('contact.form.errors.emailRequired')).email(t('contact.form.errors.emailInvalid')),
    message: z.string().min(1, t('contact.form.errors.messageRequired')),
  });

  type ContactFormData = z.infer<typeof contactSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const onSubmit = async (data: ContactFormData) => {
    setSubmitError(null);
    try {
      const token = await executeRecaptcha('contact_form');
      if (!token) {
        throw new Error('Recaptcha token is required');
      }
      await submitContactForm({ ...data, token });
      setIsSubmitted(true);
      reset();
    } catch {
      setSubmitError(t('contact.form.submitError'));
    }
  };

  const inputClassName = "px-4 py-3 bg-brand-silver outline-none text-brand-dark-blue transition-colors duration-300 rounded-lg focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 focus:ring-offset-brand-silver";

  return (
    <div className="w-full">
      {isSubmitted ? (
        <div className="flex flex-col gap-2 items-center justify-center w-full rounded-md py-3 bg-white text-brand-blue-dark font-medium font-inter">
          <BlockRendererClient content={thankYou} />
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="firstName" className="text-brand-dark-blue font-medium">
                {t('contact.form.firstName.label')}
              </label>
              <input
                type="text"
                id="firstName"
                {...register("firstName")}
                placeholder={t('contact.form.firstName.placeholder')}
                className={inputClassName}
              />
              {errors.firstName && (
                <span className="text-red-500 text-xs">{errors.firstName.message}</span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="lastName" className="text-brand-dark-blue font-medium">
                {t('contact.form.lastName.label')}
              </label>
              <input
                type="text"
                id="lastName"
                {...register("lastName")}
                placeholder={t('contact.form.lastName.placeholder')}
                className={inputClassName}
              />
              {errors.lastName && (
                <span className="text-red-500 text-xs">{errors.lastName.message}</span>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-brand-dark-blue font-medium">
              {t('contact.form.email.label')}
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              placeholder={t('contact.form.email.placeholder')}
              className={inputClassName}
            />
            {errors.email && (
              <span className="text-red-500 text-xs">{errors.email.message}</span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-brand-dark-blue font-medium">
              {t('contact.form.message.label')}
            </label>
            <textarea
              id="message"
              {...register("message")}
              placeholder={t('contact.form.message.placeholder')}
              className={`${inputClassName} min-h-[150px] resize-y`}
            />
            {errors.message && (
              <span className="text-red-500 text-xs">{errors.message.message}</span>
            )}
          </div>
          {submitError && <div className="text-red-500 text-xs mb-2">{submitError}</div>}
          <button
            type="submit"
            className="w-full px-6 py-3 bg-brand-blue text-white font-medium rounded-lg cursor-pointer hover:bg-brand-blue-dark transition-colors duration-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? <Spinner className="w-5 h-5 mx-auto" /> : t('contact.form.submit')}
          </button>
        </form>
      )}
    </div>
  );
} 