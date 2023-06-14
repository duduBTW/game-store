import { FieldValues, useController } from "react-hook-form";
import { Props } from "./input-text.props";
import { Container, StyledInput } from "./input-text.styles";
import InputUpperPart from "../upperPart";

function InputText<T extends FieldValues = FieldValues>({
  label,
  name,
  control,
  inputProps,
  ...rest
}: Props<T>) {
  const { field, fieldState } = useController({
    name,
    control,
    ...rest,
  });

  return (
    <Container {...rest}>
      <InputUpperPart label={label} name={name} fieldState={fieldState} />

      <StyledInput
        data-error={Boolean(fieldState.error)}
        type="text"
        {...inputProps}
        {...field}
      />
    </Container>
  );
}

export default InputText;
