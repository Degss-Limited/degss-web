"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BriefcaseIcon,
  BuildingIcon,
  GridIcon,
  HelpCircleIcon,
  ImageIcon,
  LogoutIcon,
  MailIcon,
  NewspaperIcon,
  SlidesIcon,
  StarIcon,
  TargetIcon,
  UserIcon,
  UsersIcon,
  type IconProps,
} from "./icons";

const navItems: { label: string; href: string; icon: (props: IconProps) => React.JSX.Element }[] = [
  { label: "Dashboard", href: "/admin", icon: GridIcon },
  { label: "Hero slides", href: "/admin/hero-slides", icon: SlidesIcon },
  { label: "Properties", href: "/admin/properties", icon: BuildingIcon },
  { label: "Services", href: "/admin/services", icon: BriefcaseIcon },
  { label: "Blog", href: "/admin/blog", icon: NewspaperIcon },
  { label: "Team", href: "/admin/team", icon: UsersIcon },
  { label: "Testimonials", href: "/admin/testimonials", icon: StarIcon },
  { label: "FAQs", href: "/admin/faqs", icon: HelpCircleIcon },
  { label: "Media library", href: "/admin/media", icon: ImageIcon },
  { label: "Contact messages", href: "/admin/submissions/contact", icon: MailIcon },
  { label: "Get started leads", href: "/admin/submissions/get-started", icon: TargetIcon },
  { label: "Profile & security", href: "/admin/profile", icon: UserIcon },
];

function isActive(pathname: string, href: string) {
  return href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
}

export default function Sidebar({
  onLogout,
  unreadContactCount = 0,
  unreadGetStartedCount = 0,
}: {
  onLogout: (formData: FormData) => void;
  unreadContactCount?: number;
  unreadGetStartedCount?: number;
}) {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col bg-neutral-950 px-4 py-6 lg:flex">
      <Link href="/admin" className="flex px-2 py-2">
        <Image
          src="/logo-light.png"
          alt="DEGSS"
          width={362}
          height={124}
          unoptimized
          priority
          className="h-10 w-auto"
        />
      </Link>

      <nav className="mt-8 flex flex-1 flex-col gap-1">
        {navItems.map((item) => {
          const active = isActive(pathname, item.href);
          const Icon = item.icon;
          const badgeCount =
            item.href === "/admin/submissions/contact"
              ? unreadContactCount
              : item.href === "/admin/submissions/get-started"
                ? unreadGetStartedCount
                : 0;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-full px-4 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-white text-neutral-950"
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon className="h-4.5 w-4.5 shrink-0" />
              <span className="flex-1 truncate">{item.label}</span>
              {badgeCount > 0 && (
                <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-red-500 px-1.5 text-[11px] font-semibold text-white">
                  {badgeCount > 99 ? "99+" : badgeCount}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/10 pt-4">
        <form action={onLogout}>
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-red-700"
          >
            <LogoutIcon className="h-4.5 w-4.5 shrink-0 text-white" />
            <span>Log out</span>
          </button>
        </form>
      </div>
    </aside>
  );
}
