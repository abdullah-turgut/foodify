'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

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
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

const formSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email: z.string(),
  authId: z.string(),
  phone: z.string(),
  title: z.string(),
  city: z.string(),
  district: z.string(),
  full_address: z.string(),
});

const EaterCreatePage = () => {
  const auth = useUser();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    title: '',
    city: '',
    district: '',
    full_address: '',
  });

  function handleStep(direction: string) {
    if (direction === 'next') {
      setStep((val) => val + 1);
    } else if (direction === 'previous') {
      setStep((val) => val - 1);
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: auth.user?.emailAddresses[0].emailAddress,
      authId: auth.user?.id,
    },
  });

  const { setValue } = form;
  const { isSubmitting, isValid } = form.formState;

  const renderStep = () => {
    if (step === 0) {
      return (
        <>
          <FormField
            control={form.control}
            name="first_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={data.first_name}
                    onChange={(e) =>
                      setData({ ...data, first_name: e.target.value })
                    }
                    disabled={isSubmitting}
                  />
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
                  <Input
                    {...field}
                    value={data.last_name}
                    onChange={(e) =>
                      setData({ ...data, last_name: e.target.value })
                    }
                    disabled={isSubmitting}
                  />
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
                  <Input
                    {...field}
                    value={data.phone}
                    onChange={(e) =>
                      setData({ ...data, phone: e.target.value })
                    }
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="button"
            onClick={() => handleStep('next')}
            className="w-full"
          >
            Next
          </Button>
        </>
      );
    }

    if (step === 1) {
      return (
        <>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address Title</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={data.title}
                    onChange={(e) =>
                      setData({ ...data, title: e.target.value })
                    }
                    disabled={isSubmitting}
                    placeholder="eg. Home, Work"
                  />
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
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={data.city}
                    onChange={(e) => setData({ ...data, city: e.target.value })}
                    disabled={isSubmitting}
                  />
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
                <FormLabel>District</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={data.district}
                    onChange={(e) =>
                      setData({ ...data, district: e.target.value })
                    }
                    disabled={isSubmitting}
                  />
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
                <FormLabel>Full Adress</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    value={data.full_address}
                    onChange={(e) =>
                      setData({ ...data, full_address: e.target.value })
                    }
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Diğer ikinci adım alanları */}
          <Button
            type="button"
            onClick={() => handleStep('previous')}
            className="w-full"
          >
            Previous
          </Button>
          <Button type="submit" variant="default" className="w-full">
            Create
          </Button>
        </>
      );
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    // try {
    //   const response = await axios.post('/api/eater/create', {
    //     ...data,
    //     ...formData,
    //   });
    //   toast.success('Profile created successfully!');
    //   router.push('/eater');
    // } catch (error) {
    //   toast.error('Something went wrong!');
    // }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 max-w-2xl mx-auto p-10 border rounded-3xl shadow-lg w-full"
      >
        <div className="">
          <h2 className="font-extrabold text-2xl">Create your profile</h2>
          <p className="text-sm mt-2 font-medium opacity-70">
            {auth.user?.emailAddresses[0].emailAddress}
          </p>
        </div>
        {renderStep()}
      </form>
    </Form>
  );
};

export default EaterCreatePage;
