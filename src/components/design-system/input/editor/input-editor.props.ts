import { EditorOptions } from "@tiptap/react";
import { FieldValues, UseControllerProps } from "react-hook-form";

export interface Props<T extends FieldValues = FieldValues>
  extends UseControllerProps<T> {
  label?: string;
  editorProps?: Partial<EditorOptions>;
}
