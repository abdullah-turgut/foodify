'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuth, useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const formSchema = z.object({
  first_name: z.string().min(1, {
    message: 'First name is required!',
  }),
  last_name: z.string().min(1, {
    message: 'Last name is required!',
  }),
  email: z.string(),
  authId: z.string(),
  phone: z
    .string()
    .min(10, {
      message: 'Must be a valid mobile number',
    })
    .max(14, { message: 'Must be a valid mobile number' }),
  title: z.string().min(1, {
    message: 'Title is required!',
  }),
  city: z.string().min(1, {
    message: 'City is required!',
  }),
  district: z.string().min(1, {
    message: 'District is required!',
  }),
  full_address: z.string().min(1, {
    message: 'Full address is required!',
  }),
});

const EaterCreatePage = () => {
  const [data, setData] = useState({});
  const [step, setStep] = useState(0);
  const auth = useUser();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: '',
      last_name: '',
      phone: '',
      title: '',
      city: '',
      district: '',
      email: auth.user?.emailAddresses[0].emailAddress,
      authId: auth.user?.id,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post('/api/eater/create', values);
      toast.success('Profile created successfully!');
      router.push('/eater/address');
    } catch (error) {
      toast.error('Something went wrong!');
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 max-w-2xl mx-auto p-10 border rounded-3xl shadow-lg w-full"
      >
        {step === 0 ? (
          <>
            <div className="">
              <h2 className="font-extrabold text-2xl">Create your profile</h2>
              <p className="text-sm mt-2 font-medium opacity-70">
                {auth.user?.emailAddresses[0].emailAddress}
              </p>
            </div>
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isSubmitting} />
                  </FormControl>
                  <FormDescription>
                    Number must be 10-14 characters
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        ) : (
          <>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="district"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="full_address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isSubmitting} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
        <Button
          type="submit"
          variant="default"
          disabled={!isValid || isSubmitting}
          className="w-full"
        >
          Create
        </Button>
      </form>
    </Form>
  );
};

export default EaterCreatePage;
