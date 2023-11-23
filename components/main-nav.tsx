"use client";

import Link from "next/link"
import { useParams, usePathname } from "next/navigation";

import { cn } from "@/lib/utils"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.blogId}`,
      label: 'Overview',
      active: pathname === `/${params.blogId}`,
    },
    {
      href: `/${params.blogId}/billboards`,
      label: 'Billboards',
      active: pathname === `/${params.blogId}/billboards`,
    },
    {
      href: `/${params.blogId}/categories`,
      label: 'Categories',
      active: pathname === `/${params.blogId}/categories`,
    },
    {
      href: `/${params.blogId}/authors`,
      label: 'Authors',
      active: pathname === `/${params.blogId}/subcategories`,
    },
    {
      href: `/${params.blogId}/subcategories`,
      label: 'Sub-Categories',
      active: pathname === `/${params.blogId}/subcategories`,
    },
    {
      href: `/${params.blogId}/author/blogarticles`,
      label: 'Articles',
      active: pathname === `/${params.blogId}/author`,
    },
    {
      href: `/${params.blogId}/settings`,
      label: 'Settings',
      active: pathname === `/${params.blogId}/settings`,
    },
  ]

  return (
    <nav
      className={cn("flex items-center space-x-6 lg:space-x-6", className)}
      {...props}
    >
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            route.active ? 'text-black dark:text-white' : 'text-muted-foreground'
          )}
        >
          {route.label}
      </Link>
      ))}
    </nav>
  )
};