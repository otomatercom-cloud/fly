import { ProfileForm } from "@/components/domain/ProfileForm";
import { getProfile } from "@/lib/odoo-client";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Profile" };

export default async function ProfilePage() {
  const partner = await getProfile();

  return (
    <div className="space-y-5 max-w-xl">
      <h1 className="text-xl sm:text-2xl font-semibold text-text-primary">Profile</h1>
      <ProfileForm partner={partner} />
    </div>
  );
}
