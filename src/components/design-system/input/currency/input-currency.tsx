import { useEffect, useRef, useState } from "react";
import { FieldValues, useController } from "react-hook-form";
import Typography from "@/components/design-system/typography";
import InputUpperPart from "../upperPart";
import {
  Props,
  CurrencyValues,
  UseInputCurrency,
} from "./input-currency.props";
import {
  StyledInput,
  Container,
  InputWrapper,
  Currency,
} from "./input-currency.styles";

function InputCurrency<T extends FieldValues = FieldValues>({
  label,
  name,
  control,
  inputProps,
  defaultValue,
  precision,
  ...rest
}: Props<T>) {
  const { handleChange, ...currencyProps } = useInputCurrency({
    defaultValue,
    precision,
  });
  const { field, fieldState } = useController({
    name,
    control,
    defaultValue,
    ...rest,
  });

  return (
    <Container>
      <InputUpperPart label={label} name={name} fieldState={fieldState} />

      <InputWrapper>
        <Currency>
          <Typography weight="bold">R$</Typography>
        </Currency>

        <StyledInput
          data-error={Boolean(fieldState.error)}
          type="text"
          {...inputProps}
          {...currencyProps}
          onChange={(e) => {
            // Update internal value
            const newValue = handleChange(e);

            // Upate form value with new internal value
            field.onChange(newValue.rawValue);

            // Emit event to parent
            rest.onValueChange?.(newValue);
            inputProps?.onChange?.(e);
          }}
          ref={(node) => {
            field.ref(node);
            currencyProps.ref.current = node;
          }}
        />
      </InputWrapper>
    </Container>
  );
}

function getPrecisionValue(precision: number) {
  return Math.pow(10, precision);
}

function getNumberValue(stringValue: string, precision: number) {
  const numberValue = Number(stringValue.replace(/[^0-9]/g, ""));

  return numberValue / getPrecisionValue(precision);
}

function formatValue(value: number, precision: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "decimal",
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  }).format(value);
}

function updateCaretPosition(
  inputElement: HTMLInputElement,
  caretPosition: number
) {
  if (!inputElement.selectionStart || inputElement.selectionStart === 0) {
    return;
  }

  inputElement.focus();
  inputElement.setSelectionRange(caretPosition, caretPosition);
}

function useInputCurrency({ defaultValue, precision = 2 }: UseInputCurrency) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const oldValue = useRef<null | string>(null);
  const caretPosition = useRef<null | number>(null);

  const [values, setValues] = useState<CurrencyValues>(() => {
    const numericDefaultValue =
      typeof defaultValue === "number" ? defaultValue : 0;

    return {
      maskedValue: formatValue(numericDefaultValue, precision),
      rawValue: numericDefaultValue,
    };
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const numberValue = getNumberValue(event.target.value, precision);
    const formattedValue = formatValue(numberValue, precision);

    const newValues = {
      maskedValue: formattedValue,
      rawValue: numberValue,
    };

    setValues(newValues);
    updateCursor(newValues.maskedValue);

    return newValues;
  };

  const updateCursor = (newMaskedValue: string) => {
    if (!oldValue.current || !caretPosition.current) {
      return;
    }

    if (oldValue.current.length + 1 === newMaskedValue.length) {
      return;
    }

    if (oldValue.current.length === newMaskedValue.length + 2) {
      caretPosition.current = caretPosition.current - 1;
    }

    if (oldValue.current.length < newMaskedValue.length) {
      caretPosition.current = caretPosition.current + 1;
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const inputElement = event.target as HTMLInputElement;
    const { key } = event;
    const { selectionStart, selectionEnd, value } = inputElement;

    if (!selectionStart || selectionStart !== selectionEnd) {
      return;
    }

    oldValue.current = value;

    if (key === "Backspace" && value.length === 2 + precision) {
      caretPosition.current = selectionStart;
      return;
    }

    if (key === "Backspace") {
      caretPosition.current = selectionStart - 1;
      return;
    }

    const isNumber = !isNaN(Number(event.key));

    if (!isNumber) {
      caretPosition.current = selectionStart;
      return;
    }

    caretPosition.current = selectionStart + 1;
  };

  useEffect(() => {
    if (inputRef.current && caretPosition.current) {
      updateCaretPosition(inputRef.current, caretPosition.current);
      caretPosition.current = null;
    }
  }, [values]);

  return {
    ref: inputRef,
    value: values.maskedValue,
    handleChange,
    onKeyDown: handleKeyDown,
  } as const;
}

export default InputCurrency;
