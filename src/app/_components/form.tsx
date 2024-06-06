"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  useForm as useReactHookForm,
  type DefaultValues,
  type FieldValues,
} from "react-hook-form";
import type * as z from "zod";

export const useReactForm = <TSchema extends FieldValues>({
  schema,
  defaultValues,
}: {
  schema: z.Schema<TSchema>;
  defaultValues: DefaultValues<TSchema>;
}) => {
  const form = useReactHookForm<TSchema>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return form;
};
