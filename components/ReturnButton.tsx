"use client";

import { useEditor, useToasts } from '@tldraw/tldraw';
import { useCallback } from 'react';
import { useParams,useRouter } from "next/navigation";
import { toast } from "sonner";



export function ReturnButton() {

    const params = useParams();
    const router = useRouter();

	const editor = useEditor()
	// const { addToast } = useToasts()

	// const handleClick = useCallback(async () => {
	// 	try {
	// 	// If the action is successful, navigate to the whiteboard route
    //     router.push(`/${params.blogId}/workplace/board/${boardId}`);
    //     // Close the card modal (if needed)
    //   } catch (error) {
    //     toast.error("Something went wrong");
    //   }
	// }, [router, params.blogId, boardId])

	const onReturn = () =>{
		router.back()
	  }

	return (
		<button className="makeRealButton" onClick={onReturn}>
			Back to Board
		</button>
	)
}