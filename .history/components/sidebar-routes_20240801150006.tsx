"use client";

import { BarChart, Compass, Layout, List,Users,MessageCircle,CalendarCheck2 } from "lucide-react";
import { useParams, usePathname } from "next/navigation";

import { SidebarItem } from "./sidebar-items";

const guestRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: Compass,
    label: "Browse",
    href: "/search",
  },
];

const teacherRoutes = [
  {
    icon: List,
    label: "Courses",
    href: "/teacher/courses",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/teacher/analytics",
  },
]

export const SidebarRoutes = () => {
  const pathname = usePathname();
  const params = useParams();

//   const isTeacherPage = pathname?.includes("/teacher");

  
  const routes = [
    {
      href: `/${params.blogId}/newsLetterUsers`,
      label: "Newsletter Users",
      icon: Users,
    //   active: pathname === `/${params.blogId}/newsLetterUsers`,
    },
    // {
    //   href: `/${params.blogId}/todo`,
    //   label: "Todo",
    // //   active: pathname === `/${params.blogId}/Todo`,
    //   icon: CalendarCheck2,
    // },
    
    // {
    //   href: `/${params.blogId}/comments`,
    //   label: "Comments",
    // //   active: pathname === `/${params.blogId}/comments`,
    //   icon: MessageCircle,
    // },
    {
      href: `/${params.blogId}/visibility`,
      label: "Visibily",
    //   active: pathname === `/${params.blogId}/comments`,
      icon: MessageCircle,
    },
  ];

  return (
    <div className="flex flex-col w-full ">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  )
}