"use client";

import React, { useState } from "react";

import CustomFormField, { FormFieldType } from "@/components/CustomFormField";
import { form } from "@/components/ValidateForm";
import { Form } from "@/components/ui/form";
import SubmitButton from "@/components/SubmitButton";
import { login } from "@/lib/server";
import { useRouter } from "next/router";
import { formData } from "@/components/ValidateForm";
const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (data: formData) => {
    try {
      setIsLoading(true);
      await login(data.email, data.password);
      router.push("/dashboard");
    } catch (error) {}

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleLogin)}>
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          name="email"
          label="Email address"
          placeholder="johndoe@email.com"
          control={form.control}
        />
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          name="password"
          label="Email address"
          placeholder="johndoe@email.com"
          control={form.control}
        />
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          name="confirmPassword"
          label="Email address"
          placeholder="johndoe@email.com"
          control={form.control}
        />
        <SubmitButton isLoading={isLoading}>Submit</SubmitButton>
      </form>
    </Form>
  );
};

export default Register;
