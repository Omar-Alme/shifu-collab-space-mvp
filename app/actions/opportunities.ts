"use server";

import { revalidatePath } from "next/cache";
import { createIntroductionForOpportunity, updateOpportunityStatus } from "@/lib/data";
import type { OpportunityStatus } from "@/lib/types";

export async function changeOpportunityStatus(formData: FormData) {
  const id = String(formData.get("id"));
  const status = String(formData.get("status")) as OpportunityStatus;
  await updateOpportunityStatus(id, status);
  revalidatePath("/opportunities");
  revalidatePath("/dashboard");
}

export async function createIntroduction(formData: FormData) {
  const id = String(formData.get("id"));
  await createIntroductionForOpportunity(id);
  revalidatePath("/opportunities");
  revalidatePath("/dashboard");
  revalidatePath("/events/event-growth-hack-august");
}
