import React, { useState } from "react";
import { Text, TextInput as RNTextInput, TextInputProps as RNTextInputProps, View } from "react-native";
import { Control, Controller, FieldValues, Path, RegisterOptions } from "react-hook-form";

export type InputProps<TFieldValues extends FieldValues = FieldValues> = Omit<
    RNTextInputProps,
    "style"
> & {
    label: string;
    name: Path<TFieldValues>;
    control: Control<TFieldValues>;
    rules?: RegisterOptions<TFieldValues, Path<TFieldValues>>;
    rightIcon?: React.ReactNode;
    className?: string;
};

/**
 * Scratch UI Kit labeled input (figma.com/design/7In7SxOETUXY7Oq5jGL2Sv,
 * node 0:1613 "Input Email"). Label stays fixed above the value; the primary
 * border on focus mirrors the tint the old inline ingredient editor used.
 */
export function Input<TFieldValues extends FieldValues = FieldValues>({
    label,
    name,
    control,
    rules,
    rightIcon,
    className,
    onFocus,
    onBlur: onBlurProp,
    ...textInputProps
}: InputProps<TFieldValues>) {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <Controller
            control={control}
            name={name}
            rules={rules}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <View className={className}>
                    <Text className="font-nunito-regular text-body text-gray-300">{label}</Text>

                    <View
                        className={[
                            "flex-row items-center border-b pb-[5px] mt-[15px]",
                            error ? "border-danger" : isFocused ? "border-primary" : "border-gray-200",
                        ].join(" ")}
                    >
                        <RNTextInput
                            value={value}
                            onChangeText={onChange}
                            onFocus={(e) => {
                                setIsFocused(true);
                                onFocus?.(e);
                            }}
                            onBlur={(e) => {
                                setIsFocused(false);
                                onBlur();
                                onBlurProp?.(e);
                            }}
                            placeholderTextColor="#a8a8a8"
                            className="flex-1 font-nunito-regular text-lead text-gray-900 p-0"
                            {...textInputProps}
                        />
                        {rightIcon}
                    </View>

                    {error && (
                        <Text className="font-nunito-medium text-caption text-danger pt-0.5">
                            {error.message || "Error"}
                        </Text>
                    )}
                </View>
            )}
        />
    );
}
