import { useEffect, useState } from "react";
import SendPlane2LineIcon from "remixicon-react/SendPlane2LineIcon";

import { NewAsset, getIsValidImage } from "@/service/game";
import Typography from "@/components/design-system/typography";
import AssetDisplay from "@/components/design-system/assets/display";
import IconButton from "@/components/design-system/icon-button";

import { BottomPartProps, Props, UpperPartProps } from "./assets-editor.props";
import {
  BottomPartContainer,
  Container,
  SendIconContainer,
  StyledInputText,
  UpperPartActionContainer,
  UpperPartContainer,
} from "./assets-editor.styles";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import LoadingOverlay from "../../loading-overlay/loading-overlay";

function AssetsEditor({
  upperPart,
  defaultAsset,
  onValueChange,
  onSubmit,
  isLoading,
}: Props) {
  const [isSaving, setIsLoading] = useState(false);

  const formMethods = useForm<NewAsset>({
    reValidateMode: "onChange",
    defaultValues: defaultAsset,
  });
  const [asset, setAsset] = useState<NewAsset | undefined>(defaultAsset);

  const { handleSubmit, watch, setError } = formMethods;

  useEffect(() => {
    const subscription = watch(async (value) => {
      if (!value.contentUrl) {
        return;
      }

      const newAsset = {
        contentUrl: value.contentUrl,
        type: "image",
      } as const;

      onValueChange?.(newAsset);
      setAsset(newAsset);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [onValueChange, watch]);

  const showLoader = isLoading || isSaving;

  return (
    <FormProvider {...formMethods}>
      <LoadingOverlay isLoading={showLoader} />

      <Container
        onSubmit={handleSubmit(async (newAsset) => {
          if (!onSubmit) {
            return;
          }

          setIsLoading(true);

          try {
            const isValidImage = await getIsValidImage(
              newAsset.contentUrl
            ).catch(() => setIsLoading(false));

            if (!isValidImage) {
              throw new Error("");
            }
          } catch (error) {
            setError("contentUrl", {
              message: "Asset is invalid",
            });
            setIsLoading(false);
            return;
          }

          const submitStatus = await onSubmit(newAsset);

          setIsLoading(false);

          if (submitStatus === true) {
            return;
          }

          setError("contentUrl", {
            message: submitStatus,
          });
        })}
      >
        {upperPart && <UpperPart {...upperPart} />}
        <AssetDisplay asset={asset} />
        <BottomPart isLoading={showLoader} />
      </Container>
    </FormProvider>
  );
}

function UpperPart({ action, title }: UpperPartProps) {
  return (
    <UpperPartContainer>
      {title ? <Typography>{title}</Typography> : <div />}
      <UpperPartActionContainer>{action}</UpperPartActionContainer>
    </UpperPartContainer>
  );
}

function BottomPart({ isLoading }: BottomPartProps) {
  const { control } = useFormContext();

  return (
    <BottomPartContainer>
      <StyledInputText
        name="contentUrl"
        control={control}
        inputProps={{
          placeholder: "Asset url...",
          autoFocus: true,
        }}
        rules={{
          required: {
            value: true,
            message: "Url is required!",
          },
        }}
      />

      <SendIconContainer>
        <IconButton type="submit" isLoading={isLoading}>
          <SendPlane2LineIcon />
        </IconButton>
      </SendIconContainer>
    </BottomPartContainer>
  );
}

export default AssetsEditor;
