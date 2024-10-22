"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useRegister } from "@/services/auth/auth"
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form"
import { RegisterSchema } from "@/schemas/auth-schema"


type RegisterType = z.infer<typeof RegisterSchema>

// Component description
export const description =
    "A sign-up form with first name, last name, email, and password inside a card. There's an option to sign up with GitHub and a link to login if you already have an account."

export function RegisterCard() {
    const form = useForm<RegisterType>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            fname: "",
            lname: "",
            email: "",
            password: "",
        },
    })

    const { mutate } = useRegister()

    const onSubmit = (values: RegisterType) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        mutate(values);
    }

    return (
        <Card className="mx-auto max-w-sm">
            <Form {...form}>
                <CardHeader>
                    <CardTitle className="text-xl">Sign Up</CardTitle>
                    <CardDescription>
                        Enter your information to create an account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="fname"
                                render={({ field }) => (
                                    <FormItem>
                                        <Label htmlFor="first-name">First Name</Label>
                                        <FormControl>
                                            <Input id="first-name" placeholder="Sandip" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lname"
                                render={({ field }) => (
                                    <FormItem>
                                        <Label htmlFor="last-name">Last Name</Label>
                                        <FormControl>
                                            <Input id="last-name" placeholder="Sapkota" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <Label htmlFor="email">Email</Label>
                                    <FormControl>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="m@example.com"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <Label htmlFor="password">Password</Label>
                                    <FormControl>
                                        <Input id="password" type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full" onClick={form.handleSubmit(onSubmit)}>
                            Create an account
                        </Button>
                        {/* <Button variant="outline" className="w-full" >
                            Sign up with GitHub
                        </Button> */}
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Already have an account?{" "}
                        <Link href="/login" className="underline">
                            Sign in
                        </Link>
                    </div>
                </CardContent>
            </Form>
        </Card>
    )
}
