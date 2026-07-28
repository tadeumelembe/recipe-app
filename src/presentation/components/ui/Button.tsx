import React from "react";
import { ActivityIndicator, Pressable, PressableProps, Text } from "react-native";

export type ButtonVariant = "primary" | "secondary";

export type ButtonProps = Omit<PressableProps, "children"> & {
    title: string;
    variant?: ButtonVariant;
    loading?: boolean;
    className?: string;
};

const SPINNER_COLOR: Record<ButtonVariant, string> = {
    primary: "#ffffff",
    secondary: "#30be76",
};

/**
 * Scratch UI Kit button (figma.com/design/7In7SxOETUXY7Oq5jGL2Sv, node 0:33
 * primary / 0:1662 secondary / 0:1655 disabled). The disabled look (gray fill,
 * no shadow) only replaces the variant look when the button isn't also
 * loading — a submitting button keeps its normal color with a spinner instead
 * of the label.
 */
export function Button({
    title,
    variant = "primary",
    loading = false,
    disabled = false,
    className,
    ...pressableProps
}: ButtonProps) {
    const isSecondary = variant === "secondary";
    const isDisabled = disabled && !loading;

    return (
        <Pressable
            disabled={disabled || loading}
            className={[
                "h-[50px] items-center justify-center rounded-lg",
                isDisabled
                    ? "bg-gray-200"
                    : isSecondary
                        ? "border-2 border-primary bg-white shadow-card"
                        : "bg-primary shadow-card",
                className,
            ]
                .filter(Boolean)
                .join(" ")}
            {...pressableProps}
        >
            {loading ? (
                <ActivityIndicator size="small" color={SPINNER_COLOR[variant]} />
            ) : (
                <Text
                    className={`text-button font-nunito-bold ${
                        isDisabled || !isSecondary ? "text-white" : "text-primary"
                    }`}
                >
                    {title}
                </Text>
            )}
        </Pressable>
    );
}
