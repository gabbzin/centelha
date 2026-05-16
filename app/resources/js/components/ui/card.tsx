import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const cardVariants = cva("flex flex-col rounded-xl border py-5 shadow-sm", {
  variants: {
    variant: {
      default: "bg-card text-card-foreground border-border",
      green: cn(
        "bg-emerald-50 text-emerald-700 border-emerald-200",
        "dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20",
      ),
      blue: cn(
        "bg-blue-50 text-blue-700 border-blue-200",
        "dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20",
      ),
      yellow: cn(
        "bg-amber-50 text-amber-700 border-amber-200",
        "dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20",
      ),
      red: cn(
        "bg-red-50 text-red-700 border-red-200",
        "dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20",
      ),
      basic: cn("bg-background text-primary border-foreground/15 shadow-md"),
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface CardProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof cardVariants> {}

function Card({ className, variant, ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      className={cn(cardVariants({ variant }), className)}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className,
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("font-semibold leading-none", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className,
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
