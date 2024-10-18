import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
// import { LoginSchema } from "@shared/zod";
// import { zodResolver } from '@hookform/resolvers/zod'
// import { useForm } from "react-hook-form";
// import { useLogin } from "@/api/auth";
// import { z } from 'zod'
export const description =
    "A simple login form with email and password. The submit button says 'Sign in'."
// type LoginType = z.infer<typeof LoginSchema>
export function LoginCard() {
    // const form = useForm<LoginType>({
    //     resolver: zodResolver(LoginSchema),
    //     defaultValues: {
    //         email: "",
    //         password: ""
    //     },
    // })
    // const { mutate } = useLogin()

    // const onSubmit = (values: LoginType) => {
    //     mutate({
    //         body: values,
    //         param: undefined
    //     })
    // }
    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>
                    Enter your email below to login to your account.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="m@example.com" required />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" required />
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full">Sign in</Button>
            </CardFooter>
        </Card>
    )
}