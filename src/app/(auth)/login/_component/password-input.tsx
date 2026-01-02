"use client";

import { useState } from "react";
import { Control, FieldValues, Path } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type PasswordInputProps<T extends FieldValues> = {
    control: Control<T>;
    name: Path<T>;
    label?: string;
    placeholder?: string;
};

export function PasswordInput<T extends FieldValues>({
    control,
    name,
    label = "Password",
    placeholder = "********",
}: PasswordInputProps<T>) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="font-semibold">{label}</FormLabel>

                    <div className="relative">
                        <FormControl>
                            <Input
                                {...field}
                                autoComplete="current-password"
                                type={showPassword ? "text" : "password"}
                                placeholder={placeholder}
                                className="pe-10 aria-[invalid=true]:border-destructive aria-[invalid=true]:focus:ring-destructive"
                            />
                        </FormControl>

                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-input hover:text-gray-700"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
