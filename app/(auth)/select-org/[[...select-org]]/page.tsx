import { OrganizationList } from "@clerk/nextjs";
import { useParams } from "next/navigation";

export default function CreateOrganizationPage() {
  
  return (
    <OrganizationList
      hidePersonal
      afterSelectOrganizationUrl="/:blogId/workplace/organization/:id"
      afterCreateOrganizationUrl="/:blogId/workplace/organization/:id"
    />
  );
};

