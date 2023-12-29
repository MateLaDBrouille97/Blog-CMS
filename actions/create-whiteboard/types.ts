import { z } from "zod";
import { Card } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { CreateWhiteboard } from "./schema";

export type InputType = z.infer<typeof CreateWhiteboard>;
export type ReturnType = ActionState<InputType, Card>;