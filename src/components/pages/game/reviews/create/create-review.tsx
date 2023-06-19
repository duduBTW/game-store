import {
  FormProvider,
  useController,
  useForm,
  useFormContext,
} from "react-hook-form";
import ThumbUpFillIcon from "remixicon-react/ThumbUpFillIcon";
import ThumbDownFillIcon from "remixicon-react/ThumbDownFillIcon";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import Typography from "@/components/design-system/typography/typography";
import InputEditor from "@/components/design-system/input/editor/input-editor";
import Button from "@/components/design-system/button/button";

import { UserAvatar } from "../base/game-reviews-base.styles";
import {
  BottomPartActions,
  BottomPartContainer,
  Container,
  LikedRadioErrorMesageContainer,
  TitleContainer,
  UpperPartContainer,
} from "./create-review.styles";
import {
  NewGameReview,
  getGameReviews,
  getGameReviewsAllStatistics,
  getGameReviewsRecentStatistics,
  insertGameReview,
} from "@/service/game-review";
import LoadingOverlay from "@/components/design-system/loading-overlay/loading-overlay";
import { BottomPartProps, Props } from "./create-review.props";

function CreateReview({ gameId, ...rest }: Props) {
  return (
    <Container {...rest}>
      <UpperPart />
      <BottomPart gameId={gameId} />
    </Container>
  );
}

function UpperPart() {
  return (
    <UpperPartContainer>
      <TitleContainer>
        <Typography size="base" weight="bold" lineHeight="title">
          Add review
        </Typography>
        <Typography size="sm" color="gray.500" lineHeight="title">
          20.1 hours played
        </Typography>
      </TitleContainer>

      <UserAvatar src="https://pbs.twimg.com/profile_images/1530409707932098560/sn9MtPvm_400x400.jpg" />
    </UpperPartContainer>
  );
}

function BottomPart({ gameId, ...rest }: BottomPartProps) {
  const formMethods = useForm<NewGameReview>();
  const queryClient = useQueryClient();

  const { control, handleSubmit, reset } = formMethods;

  const { isLoading, mutate: insertGameReviewMutate } = useMutation(
    insertGameReview,
    {
      onSuccess: () => {
        reset();

        // Refetches list
        queryClient.refetchQueries({
          queryKey: getGameReviews.getKey(gameId),
        });

        // Refetches recent statistics
        queryClient.refetchQueries({
          queryKey: getGameReviewsRecentStatistics.getKey(gameId),
        });

        // Refetches all time statistics
        queryClient.refetchQueries({
          queryKey: getGameReviewsAllStatistics.getKey(gameId),
        });
      },
    }
  );

  return (
    <FormProvider {...formMethods}>
      <BottomPartContainer
        {...rest}
        onSubmit={handleSubmit((data) =>
          insertGameReviewMutate({
            data,
            gameId,
          })
        )}
      >
        <LoadingOverlay isLoading={isLoading} />

        <InputEditor
          rules={{
            required: {
              value: true,
              message:
                "Describe what you liked and disliked about this game and if you recommend it to  others",
            },
          }}
          control={control}
          name="opinion"
        />

        <BottomPartActions>
          <LikedRadioErrorMesage />

          <LikedRadio />
          <div />
          <Button isLoading={isLoading} size="small" buttonColor="brand">
            Publish review
          </Button>
        </BottomPartActions>
      </BottomPartContainer>
    </FormProvider>
  );
}

function LikedRadioErrorMesage() {
  const { formState } = useFormContext<NewGameReview>();

  if (!formState.errors["liked"]) {
    return null;
  }

  return (
    <LikedRadioErrorMesageContainer>
      <Typography size="sm" color="red.500">
        {formState.errors["liked"].message}
      </Typography>
    </LikedRadioErrorMesageContainer>
  );
}

function LikedRadio() {
  const { control } = useFormContext<NewGameReview>();
  const { field } = useController({
    control,
    name: "liked",
    rules: {
      validate: (value) => {
        if (typeof value !== "boolean") {
          return "Do you recommend this game to others?";
        }

        return true;
      },
    },
  });

  const liked = field.value;

  return (
    <>
      <Button
        type="button"
        size="small"
        startIcon={ThumbUpFillIcon}
        buttonColor="blue"
        onClick={() => field.onChange(true)}
        variant={liked === true ? "contained" : "outlined"}
      >
        Liked
      </Button>
      <Button
        type="button"
        size="small"
        startIcon={ThumbDownFillIcon}
        buttonColor="red"
        onClick={() => field.onChange(false)}
        variant={liked === false ? "contained" : "outlined"}
      >
        Desliked
      </Button>
    </>
  );
}

export default CreateReview;
