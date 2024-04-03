"use client";

import React, { useRef } from "react";
import {
  AriaTimeFieldProps,
  TimeValue,
  useLocale,
  useTimeField,
} from "react-aria";
import { useTimeFieldState } from "react-stately";
import { cn } from "@/lib/utils";
import { DateSegment } from "@/components/ui/date-time-picker/date-segment";

function TimeField(props: AriaTimeFieldProps<TimeValue>) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { locale } = useLocale();
  const state = useTimeFieldState({
    ...props,
    locale,
  });
  const { fieldProps } = useTimeField(props, state, ref);

  return (
    <div
      {...fieldProps}
      ref={ref}
      className={cn(
        "flex justify-between h-10 w-full flex-1 rounded-md border bg-purple-500/15 border-input px-10 py-2 text-sm",
        props.isDisabled
          ? "cursor-not-allowed opacity-50"
          : "border-purple-500 w-[240px]"
      )}
    >
      {state.segments.map((segment: any, idx: number) => (
        <DateSegment
          key={idx}
          segment={segment}
          state={state}
          aria-label={idx}
        />
      ))}
    </div>
  );
}

export { TimeField };
