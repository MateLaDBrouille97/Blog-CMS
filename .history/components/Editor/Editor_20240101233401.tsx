"use client";


import {
	// Tldraw,
  Canvas,
  ContextMenu,
  TldrawEditor,
  TldrawHandles,
  TldrawHoveredShapeIndicator,
  TldrawScribble,
  TldrawSelectionBackground,
  TldrawSelectionForeground,
  TldrawUi,
  defaultShapeTools,
  defaultShapeUtils,
  defaultTools,
  AssetRecordType,
  Editor,
  MediaHelpers,
  TLAsset,
  TLAssetId,
  
  getHashForString,
  isGifAnimated,
  uniqueId,
} from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";
import dynamic from 'next/dynamic';
import { Button } from "../ui/button";
import { ReturnButton } from "../ReturnButton";
import { useCallback } from "react";


const defaultComponents = {
  Scribble: TldrawScribble,
  CollaboratorScribble: TldrawScribble,
  SelectionForeground: TldrawSelectionForeground,
  SelectionBackground: TldrawSelectionBackground,
  Handles: TldrawHandles,
  HoveredShapeIndicator: TldrawHoveredShapeIndicator,
};

const Tldraw = dynamic(async () => (await import('@tldraw/tldraw')).Tldraw, {
	ssr: false,
})

export default function Editor2({
  store,
  boardId,
}: {
  store: any;
  boardId: string;
}) {

	


  return (
    <div className="tldraw__editor">
       <Tldraw
				// persistenceKey="make-real"
				// shareZone={<MakeRealButton />}
				// shapeUtils={defaultShapeUtils}
				// tools={[...defaultTools, ...defaultShapeTools]}
				// components={defaultComponents}
				shareZone={<ReturnButton />}
				store={store}
			>
				
				{/* <RiskyButCoolAPIKeyInput /> */}
			</Tldraw>
    </div>
  );
}
