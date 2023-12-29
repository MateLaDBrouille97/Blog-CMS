"use client";

import {
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
} from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";
import { Button } from "../ui/button";
import { ReturnButton } from "../ReturnButton";

const defaultComponents = {
  Scribble: TldrawScribble,
  CollaboratorScribble: TldrawScribble,
  SelectionForeground: TldrawSelectionForeground,
  SelectionBackground: TldrawSelectionBackground,
  Handles: TldrawHandles,
  HoveredShapeIndicator: TldrawHoveredShapeIndicator,
};

export default function Editor2({
  store,
  boardId,
}: {
  store: any;
  boardId: string;
}) {
  return (
    <div className="tldraw__editor">
      <TldrawEditor
        initialState="select"
        shapeUtils={defaultShapeUtils}
        tools={[...defaultTools, ...defaultShapeTools]}
        components={defaultComponents}
        persistenceKey="exploded-example"
        store={store}
      >
        <TldrawUi>
          <ContextMenu>
            <Canvas />
          </ContextMenu>
        </TldrawUi>
      </TldrawEditor>
    </div>
  );
}
