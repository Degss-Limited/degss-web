import "server-only";
import { getSupabase } from "@/lib/supabase";

export type TeamMember = {
  id: string;
  name: string;
  title: string;
  photo: string;
  bio: string;
  sortOrder: number;
};

export type TeamMemberInput = {
  name: string;
  title: string;
  photo: string;
  bio: string;
  sortOrder?: number;
};

export async function listTeamMembers(): Promise<TeamMember[]> {
  const supabase = getSupabase();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("team_members")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("[team] listTeamMembers failed:", error.message);
    return [];
  }

  return data.map((row) => ({
    id: row.id,
    name: row.name,
    title: row.title,
    photo: row.photo,
    bio: row.bio,
    sortOrder: row.sort_order,
  }));
}

export async function getTeamMemberById(id: string): Promise<TeamMember | null> {
  const supabase = getSupabase();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("team_members")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) return null;
  return {
    id: data.id,
    name: data.name,
    title: data.title,
    photo: data.photo,
    bio: data.bio,
    sortOrder: data.sort_order,
  };
}

export async function createTeamMember(input: TeamMemberInput) {
  const supabase = getSupabase();
  if (!supabase) throw new Error("Database is not configured.");

  const { error } = await supabase.from("team_members").insert({
    name: input.name,
    title: input.title,
    photo: input.photo,
    bio: input.bio,
    ...(input.sortOrder !== undefined ? { sort_order: input.sortOrder } : {}),
  });

  if (error) throw new Error(error.message);
}

export async function updateTeamMember(id: string, input: TeamMemberInput) {
  const supabase = getSupabase();
  if (!supabase) throw new Error("Database is not configured.");

  const { error } = await supabase
    .from("team_members")
    .update({
      name: input.name,
      title: input.title,
      photo: input.photo,
      bio: input.bio,
      ...(input.sortOrder !== undefined ? { sort_order: input.sortOrder } : {}),
    })
    .eq("id", id);

  if (error) throw new Error(error.message);
}

export async function deleteTeamMember(id: string) {
  const supabase = getSupabase();
  if (!supabase) throw new Error("Database is not configured.");

  const { error } = await supabase.from("team_members").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
