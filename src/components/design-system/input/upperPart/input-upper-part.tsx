import Typography from "@/components/design-system/typography";
import { UpperPartContainer } from "./input-upper-part.styles";
import { Props } from "./input-upper-part.props";

function InputUpperPart({ name, label, fieldState }: Props) {
  if (!label && !fieldState.error) {
    return null;
  }

  return (
    <UpperPartContainer>
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
    </UpperPartContainer>
  );
}

export default InputUpperPart;
