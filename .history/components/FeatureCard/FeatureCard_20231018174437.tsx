import { FC, useState } from "react";
import { BiSolidTimeFive } from "react-icons/bi";

import { Feature, } from "@/models/project";
import { ConfirmModal } from "../modals/confirm-modal";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { Priority } from "@prisma/client";

type Props = {
  feature: Feature;
};


const FeatureCard: FC<Props> = (props) => {
  const {
    feature: { priority, name, description, finishDate, id },
  } = props;

  const currentDate = new Date();
  const featureFinishDate = new Date(finishDate);
  const timeDifference = featureFinishDate.getTime() - currentDate.getTime();
  const daysLeft = Math.ceil(timeDifference / (1000 * 3600 * 24));

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const params = useParams();

  const onDelete = async (featureId: string) => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/${params.blogId}/todo/features/${featureId}`);
      toast.success("Feature deleted");
      router.push(`/${params.blogId}/todo/projects/${params.slug}`);
      router.refresh();
    } catch {
      toast.error("Something in Feature went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="my-5 bg-white p-5 rounded-2xl">
      <div className="flex justify-between items-center">
        <span className={priority===Priority.LOW?"bg-[#dda06856] text-[#D58D49] rounded-[4px] px-[6px] py-1 font-medium text-xs":
        priority===Priority.MEDIUM?"bg-[#8dd24d65] text-[#ffffff] rounded-[4px] px-[6px] py-1 font-medium text-xs":
        "bg-[#cd344069] text-[#ffffff] rounded-[4px] px-[6px] py-1 font-medium text-xs"}
        aria-label={`Priority: ${priority}`}>
          {priority}
        </span>
        <div className="mx-5">
          <ConfirmModal onConfirm={() => onDelete(id)}>
            <Button size="sm" disabled={isLoading}>
              <Trash className="h-4 w-4" />
            </Button>
          </ConfirmModal>
        </div>
      </div>
      <h2 className="my-1 text-[#0D062D]">{name}</h2>
      <p className="text-[#787486] text-xs">{description}</p>
      <div className="mt-7 flex items-center justify-between">
        <p className="text-xs flex items-center bg-purple-200 px-2 py-1 text-purple-800 font-medium">
          <BiSolidTimeFive />
          {daysLeft} Days Left
        </p>
      </div>
    </div>
  );
};

export default FeatureCard;
