import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import { Game, NewGame, insetGame } from "@/service/game";
import useFocustrap from "@/hooks/useFocustrap";
import Typography from "@/components/design-system/typography/typography";
import InputText from "@/components/design-system/input/text";
import TitleIndicator from "@/components/design-system/title-indicator";
import Button from "@/components/design-system/button/button";
import LoadingOverlay from "@/components/design-system/loading-overlay";

import {
  BottomPart,
  Container,
  SubmitButton,
  Wrapper,
} from "./create-game.styles";
import {
  CreateGameFormProps,
  CreateGameSuccessProps,
} from "./create-game.props";

function CreateGamePage() {
  const [createdGame, setCreatedGame] = useState<Game | null>(null);

  if (createdGame) {
    return <CreateGameSuccess game={createdGame} />;
  }

  return <CreateGameForm onSuccess={setCreatedGame} />;
}

// --------------------
// Create Game Form
// --------------------
function CreateGameForm({ onSuccess }: CreateGameFormProps) {
  const formMethods = useForm<NewGame>();

  const { mutate: handleFormSubmit, isLoading } = useMutation(insetGame, {
    onSuccess,
  });

  const {
    control,
    formState: { errors },
  } = formMethods;

  const hasErrors = Object.keys(errors).length > 0;

  useFocustrap(isLoading);

  return (
    <Wrapper
      {...formMethods}
      onSubmit={formMethods.handleSubmit((data) => handleFormSubmit(data))}
      forwardedAs="form"
      size="large"
      centered
    >
      <Container size="small">
        <LoadingOverlay isLoading={isLoading} />

        <TitleIndicator>
          <Typography
            as="h1"
            fontFamily="Rubik"
            weight="black"
            size="3xl"
            lineHeight="title"
          >
            Add game
          </Typography>
        </TitleIndicator>

        <InputText
          name="title"
          control={control}
          label="Whats the name of the game?"
          inputProps={{
            autoFocus: true,
          }}
          rules={{
            required: {
              value: true,
              message: "Field is required!",
            },
          }}
        />

        <BottomPart>
          <SubmitButton isLoading={isLoading} disabled={hasErrors}>
            Create
          </SubmitButton>
          <Button variant="outlined">Return to dashboard</Button>
        </BottomPart>
      </Container>
    </Wrapper>
  );
}

// --------------------
// Game created
// --------------------
function CreateGameSuccess({ game }: CreateGameSuccessProps) {
  return (
    <Wrapper forwardedAs="div" size="large" centered>
      <Container size="small">
        <TitleIndicator>
          <Typography
            as="h1"
            fontFamily="Rubik"
            weight="black"
            size="3xl"
            lineHeight="title"
          >
            Game "{game.title}" created with success!
          </Typography>
        </TitleIndicator>

        <BottomPart>
          <SubmitButton>Go to game page</SubmitButton>
          <Button variant="outlined">Return to dashboard</Button>
        </BottomPart>
      </Container>
    </Wrapper>
  );
}

export default CreateGamePage;
