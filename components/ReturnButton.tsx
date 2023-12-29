"use client";

import { useEditor, useToasts } from '@tldraw/tldraw';
import { useCallback } from 'react';
import { useParams,useRouter } from "next/navigation";
import { toast } from "sonner";


export function ReturnButton({boardId}:{boardId:string}) {

    const params = useParams();
    const router = useRouter();

	const editor = useEditor()
	// const { addToast } = useToasts()

	const handleClick = useCallback(async () => {
		try {
		// If the action is successful, navigate to the whiteboard route
        router.push(`/${params.blogId}/workplace/board/${boardId}`);
        // Close the card modal (if needed)
      } catch (error) {
        toast.error("Something went wrong");
      }
	}, [router, params.blogId, boardId])

	return (
		<button className="makeRealButton" onClick={handleClick}>
			Back to Board
		</button>
	)
}