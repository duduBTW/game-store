import { useMemo } from "react";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import ThumbUpFillIcon from "remixicon-react/ThumbUpFillIcon";
import ThumbDownFillIcon from "remixicon-react/ThumbDownFillIcon";
import Heart3FillIcon from "remixicon-react/Heart3FillIcon";
import Chat3FillIcon from "remixicon-react/Chat3FillIcon";
import ShareForwardFillIcon from "remixicon-react/ShareForwardFillIcon";
import * as dompurify from "isomorphic-dompurify";

import Typography from "@/components/design-system/typography";
import TitleIndicator from "@/components/design-system/title-indicator";
import Button from "@/components/design-system/button/button";
import { getGameReviews } from "@/service/game-review";

import { Props, UserReviewCardProps } from "./user-reviews.props";
import {
  ReviewCreationInfo,
  Status,
  UserReviewCardContainer,
  UserReviewCardFeedback,
  UserReviewCardUpperPart,
} from "./user-reviews.styles";
import {
  UserAvatar,
  UserReviewObservation,
} from "../base/game-reviews-base.styles";

function UserReviewList({ gameId, ...rest }: Props) {
  const { data: gameReviews, isLoading } = useQuery(
    getGameReviews.getKey(gameId),
    () => getGameReviews(gameId)
  );

  if (isLoading || typeof gameReviews === "undefined") {
    return null;
  }

  return (
    <div {...rest}>
      <TitleIndicator>
        <Typography>Analises</Typography>
      </TitleIndicator>

      {gameReviews.map((userReview) => (
        <UserReviewCard key={userReview.id} review={userReview} />
      ))}
    </div>
  );
}

export function UserReviewCard({
  review: { liked, opinion, createdAt },
}: UserReviewCardProps) {
  const purifiedOpinion = useMemo(() => {
    if (!dompurify.isSupported) {
      return opinion;
    }

    return dompurify.sanitize(opinion);
  }, [opinion]);

  return (
    <UserReviewCardContainer>
      <UserReviewCardUpperPart>
        <Status styledLiked={liked}>
          {liked ? <ThumbUpFillIcon /> : <ThumbDownFillIcon />}
        </Status>
        <ReviewCreationInfo>
          <Typography weight="bold">pog</Typography>
          <Typography size="sm" color="gray.500">
            {format(new Date(createdAt), "dd/MM/yyyy")}
          </Typography>
        </ReviewCreationInfo>
        <UserAvatar src="https://pbs.twimg.com/profile_images/1667870874815574016/bGxbhb1D_400x400.jpg" />
      </UserReviewCardUpperPart>

      <UserReviewObservation
        dangerouslySetInnerHTML={{
          __html: purifiedOpinion,
        }}
      />

      <UserReviewCardFeedback>
        <Button size="small" variant="outlined" startIcon={Heart3FillIcon}>
          60 likes
        </Button>
        <Button size="small" variant="outlined" startIcon={Chat3FillIcon}>
          04 comments
        </Button>
        <div />
        <Button
          size="small"
          variant="outlined"
          startIcon={ShareForwardFillIcon}
        />
      </UserReviewCardFeedback>
    </UserReviewCardContainer>
  );
}

export default UserReviewList;
