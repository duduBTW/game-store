import { FieldValues, useController } from "react-hook-form";
import Typography from "@/components/design-system/typography";
import { Props } from "./input-text.props";
import { Container, UpperPart, Input } from "./input-text.styles";

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
      <UpperPart>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        <Typography as="label" htmlFor={name}>
          {label}
        </Typography>
        {fieldState.error && (
          <Typography size="sm" color="red.500">
            {fieldState.error.message}
          </Typography>
        )}
      </UpperPart>

      <Input
        data-error={Boolean(fieldState.error)}
        type="text"
        {...inputProps}
        {...field}
      />
    </Container>
  );
}

export default InputText;
