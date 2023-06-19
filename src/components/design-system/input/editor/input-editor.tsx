import { FieldValues, useController } from "react-hook-form";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { Props } from "./input-editor.props";
import { Container, StyledEditorContent } from "./input-editor.styles";
import InputUpperPart from "../upperPart";
import { useEffect } from "react";

function hasOnlyEmptyTags(htmlString: string) {
  const parser = new DOMParser();
  const body = parser.parseFromString(htmlString, "text/html").body;
  const emptyTags = body.querySelectorAll(":empty");

  return emptyTags.length === body.childElementCount;
}

function InputEditor<T extends FieldValues = FieldValues>({
  label,
  name,
  control,
  editorProps,
  ...rest
}: Props<T>) {
  const { field, fieldState } = useController({
    name,
    control,
    ...rest,
  });

  const editor = useEditor({
    extensions: [StarterKit],
    content: field.value,
    onUpdate: (props) => {
      const html = props.editor.getHTML();
      const isEmpty = hasOnlyEmptyTags(html);

      field.onChange(isEmpty ? "" : html);
      editorProps?.onUpdate?.(props);
    },
    editorProps: {},
    ...editorProps,
  });

  useEffect(() => {
    editor?.setOptions({
      editorProps: {
        attributes: {
          "data-error": fieldState.error ? "true" : "false",
        },
      },
    });
  }, [editor, fieldState.error]);

  return (
    <Container>
      <InputUpperPart label={label} name={name} fieldState={fieldState} />

      <StyledEditorContent editor={editor} />
    </Container>
  );
}

export default InputEditor;
