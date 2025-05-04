"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Team } from "@/lib/types";
import { useTeam } from "@/contexts/TeamContext";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Team name must be at least 3 characters" })
    .max(50, { message: "Team name must be less than 50 characters" }),
  playerCount: z.number().min(0).default(0),
  region: z
    .string()
    .min(2, { message: "Region must be at least 2 characters" })
    .max(50, { message: "Region must be less than 50 characters" }),
  country: z
    .string()
    .min(2, { message: "Country must be at least 2 characters" })
    .max(50, { message: "Country must be less than 50 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

interface TeamFormProps {
  team?: Team;
  onSuccess: () => void;
}

export default function TeamForm({ team, onSuccess }: TeamFormProps) {
  const { teams, addTeam, updateTeam } = useTeam();
  const { toast } = useToast();
  const isEditing = !!team;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: team
      ? {
          name: team.name,
          playerCount: team.playerCount,
          region: team.region,
          country: team.country,
        }
      : {
          name: "",
          playerCount: 0,
          region: "",
          country: "",
        },
  });

  const onSubmit = (values: FormValues) => {
    // Check if the team name is unique (but allow the same name if editing the same team)
    const teamNameExists = teams.some(
      (t) => t.name === values.name && (!isEditing || t.id !== team?.id)
    );

    if (teamNameExists) {
      form.setError("name", {
        type: "manual",
        message: "Team name must be unique",
      });
      return;
    }

    if (isEditing && team) {
      updateTeam({
        ...team,
        ...values,
      });
      toast({
        title: "Team updated",
        description: `${values.name} has been updated`,
      });
    } else {
      addTeam(values);
      toast({
        title: "Team created",
        description: `${values.name} has been created`,
      });
    }

    onSuccess();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter team name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="region"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Region</FormLabel>
              <FormControl>
                <Input placeholder="Enter region" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Input placeholder="Enter country" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2 pt-4">
          <Button type="submit">
            {isEditing ? "Update Team" : "Create Team"}
          </Button>
        </div>
      </form>
    </Form>
  );
}