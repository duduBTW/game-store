import Typography from "@/components/design-system/typography";
import ThumbUpFillIcon from "remixicon-react/ThumbUpFillIcon";
import ThumbDownFillIcon from "remixicon-react/ThumbDownFillIcon";
import Heart3FillIcon from "remixicon-react/Heart3FillIcon";
import Chat3FillIcon from "remixicon-react/Chat3FillIcon";
import ShareForwardFillIcon from "remixicon-react/ShareForwardFillIcon";
import {
  Props,
  UserReview,
  UserReviewCardProps,
  UserReviewFeedbackButtonProps,
} from "./user-reviews.props";
import {
  Status,
  StyledUserReviewFeedbackButton,
  UserAvatar,
  UserName,
  UserReviewCardContainer,
  UserReviewCardFeedback,
  UserReviewCardUpperPart,
} from "./user-reviews.styles";
import { useTheme } from "styled-components";

const userReviews: UserReview[] = [
  {
    status: "liked",
    review:
      "Eu sou um pai de 45 anos, provavelmente uma das pessoas mais velhas a jogar este jogo. Sou pai solteiro criando meu filho, que agora tem 14 anos. Meu filho ganhou este jogo no Natal de 2021 de seu tio, então o instalamos em seu computador e ele começou a jogar. Até o final da semana ele tinha 24 horas neste",
    user: {
      name: "はえもり",
      profilePicture:
        "https://pbs.twimg.com/profile_images/810032123830669312/ANgvKjDs_400x400.jpg",
    },
  },
  {
    status: "desliked",
    review: "não roda :(",
    user: {
      name: "Hatsuno_xxx",
      profilePicture:
        "https://pbs.twimg.com/profile_images/1451666062638923780/6v-q2Ojo_400x400.jpg",
    },
  },
  {
    status: "liked",
    review: "Neurodivergent women are hot",
    user: {
      name: "侑(みるふぃ)",
      profilePicture:
        "https://pbs.twimg.com/profile_images/1507742816856080393/FQhF2LYs_400x400.jpg",
    },
  },
  {
    status: "liked",
    review: "I used to have a boner for the green m&m's when I was younger",
    user: {
      name: "haemori_ako",
      profilePicture:
        "https://pbs.twimg.com/profile_images/1526817993774157824/_lszEHjg_400x400.jpg",
    },
  },
  {
    status: "liked",
    review: "i can fix her",
    user: {
      name: "Maximilian",
      profilePicture:
        "https://avatars.cloudflare.steamstatic.com/e62bdf8610bab9a8dacc34c8577e28c1e0f122bd.jpg",
    },
  },
];

function UserReviewList(props: Props) {
  return (
    <div {...props}>
      <Typography>Analises</Typography>

      {userReviews.map((userReview) => (
        <UserReviewCard review={userReview} />
      ))}
    </div>
  );
}

export function UserReviewCard({ review }: UserReviewCardProps) {
  return (
    <UserReviewCardContainer>
      <UserReviewCardUpperPart>
        <Status styledStatus={review.status}>
          {review.status === "liked" ? (
            <ThumbUpFillIcon />
          ) : (
            <ThumbDownFillIcon />
          )}
        </Status>
        <UserName weight="bold">{review.user.name}</UserName>
        <UserAvatar src={review.user.profilePicture} />
      </UserReviewCardUpperPart>

      <Typography color="gray.300">{review.review}</Typography>

      <UserReviewCardFeedback>
        <UserReviewFeedbackButton startIcon={Heart3FillIcon}>
          60 likes
        </UserReviewFeedbackButton>
        <UserReviewFeedbackButton startIcon={Chat3FillIcon}>
          04 comments
        </UserReviewFeedbackButton>
        <UserReviewFeedbackButton startIcon={ShareForwardFillIcon}>
          Share
        </UserReviewFeedbackButton>
      </UserReviewCardFeedback>
    </UserReviewCardContainer>
  );
}

function UserReviewFeedbackButton({
  children,
  startIcon: StartIcon,
}: UserReviewFeedbackButtonProps) {
  const theme = useTheme();

  return (
    <StyledUserReviewFeedbackButton>
      {StartIcon && (
        <StartIcon
          size={theme.sizes.gaps["4"]}
          color={theme.colors.blueGray["500"]}
        />
      )}

      <Typography as="span" weight="medium" size="sm" color="gray.400">
        {children}
      </Typography>
    </StyledUserReviewFeedbackButton>
  );
}

export default UserReviewList;
