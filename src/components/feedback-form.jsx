"use client";
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { StarRating } from "./star-rating"
import { useToast } from "@/hooks/use-toast"
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { send } from "@/lib/email";

const feedbackSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  rating: z.number().min(1, "Rating is required").max(5, "Rating must be between 1 and 5"),
  message: z.string().min(1, "Message is required"),
})

export function FeedbackForm() {
  // const [formData, setFormData] = useState({
  //   name: "",
  //   email: "",
  //   rating: 0,
  //   message: "",
  // })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const form = useForm({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      name: "",
      email: "",
      rating: 0,
      message: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    send(values);
  }

  // const handleSubmit = async (e) => {
  //   e.preventDefault()

  //   if (!formData.name || !formData.email || !formData.rating || !formData.message) {
  //     toast({
  //       title: "Missing Information",
  //       description: "Please fill in all fields and provide a rating.",
  //       variant: "destructive",
  //     })
  //     return
  //   }

  //   setIsSubmitting(true)

  //   toast({
  //     title: "Feedback Submitted!",
  //     description: "Thank you for your feedback. We appreciate your input!",
  //   })

  //   // Reset form
  //   setFormData({
  //     name: "",
  //     email: "",
  //     rating: 0,
  //     message: "",
  //   })

  //   setIsSubmitting(false)
  // }

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Share Your Feedback</CardTitle>
        <CardDescription>We'd love to hear about your experience. Your feedback helps us improve.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="johndoe@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-2">
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rating</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-2">
                        <StarRating
                          rating={field.value}
                          onRatingChange={(rating) => field.onChange(rating)}
                        />
                        <span className="text-sm text-muted-foreground">
                          {field.value > 0
                            ? `${field.value} star${field.value > 1 ? "s" : ""}`
                            : "Select rating"}
                        </span>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            </div>

            <div className="space-y-2">
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        id="message"
                        placeholder="Type in your message here"
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting} onSubmit={form.handleSubmit(onSubmit)}>
              {isSubmitting ? "Submitting..." : "Share Feedback"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
