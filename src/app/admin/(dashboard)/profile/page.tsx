import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import PasswordField from "@/components/admin/PasswordField";
import { findAdminById } from "@/lib/data/admins";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { changePasswordAction, updateProfileAction } from "./actions";

export default async function AdminProfilePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  const session = token ? await verifySessionToken(token) : null;
  if (!session) redirect("/admin/login");

  const admin = await findAdminById(session.sub);
  const name = admin?.name ?? session.name;
  const email = admin?.email ?? session.email;

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Profile &amp; security
        </h1>
        <p className="mt-1 text-sm text-neutral-500">
          Manage your admin login details.
        </p>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section className="space-y-5 rounded-2xl border border-black/10 bg-white p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-400">
            Profile
          </h2>

          <form action={updateProfileAction} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-sm font-medium text-neutral-700"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                defaultValue={name}
                className="w-full rounded-xl border border-black/10 bg-white px-4 py-2.5 text-sm text-neutral-950 focus:outline-none focus:ring-2 focus:ring-neutral-950/10"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-neutral-700">
                Email
              </label>
              <input
                type="email"
                value={email}
                disabled
                className="w-full rounded-xl border border-black/10 bg-neutral-50 px-4 py-2.5 text-sm text-neutral-500"
              />
              <p className="mt-1.5 text-xs text-neutral-400">
                Contact another admin to change your login email.
              </p>
            </div>
            <button
              type="submit"
              className="rounded-full bg-neutral-950 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
            >
              Save profile
            </button>
          </form>
        </section>

        <section className="space-y-5 rounded-2xl border border-black/10 bg-white p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-neutral-400">
            Security
          </h2>

          <form action={changePasswordAction} className="space-y-4">
            <PasswordField
              label="Current password"
              name="currentPassword"
              autoComplete="current-password"
            />
            <PasswordField
              label="New password"
              name="newPassword"
              autoComplete="new-password"
            />
            <PasswordField
              label="Confirm new password"
              name="confirmPassword"
              autoComplete="new-password"
            />
            <button
              type="submit"
              className="rounded-full bg-neutral-950 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-800"
            >
              Change password
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
