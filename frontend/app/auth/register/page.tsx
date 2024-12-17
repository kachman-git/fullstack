"use client";

import { useState } from "react";

import CustomFormField, { FormFieldType } from "@/components/CustomFormField";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import SubmitButton from "@/components/SubmitButton";
import { login } from "@/lib/server";
import { useRouter } from "next/navigation";
import { formData, formSchema } from "@/components/ValidateForm";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleLogin = async (data: formData) => {
    console.log(data);
    try {
      setIsLoading(true);
      await login(data.email, data.password);
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleLogin)}>
        <h1>Register</h1>
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
