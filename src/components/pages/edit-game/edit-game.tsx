import { useState } from "react";
import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import FocusTrap from "focus-trap-react";
import CloseLineIcon from "remixicon-react/CloseLineIcon";
import DeleteBin7LineIcon from "remixicon-react/DeleteBin7LineIcon";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import Tabs from "@/components/design-system/tabs";
import Button from "@/components/design-system/button";
import InputText from "@/components/design-system/input/text";
import InputCurrency from "@/components/design-system/input/currency";
import Breadcrumbs from "@/components/design-system/breadcrumbs";
import Typography from "@/components/design-system/typography";
import LoadingOverlay from "@/components/design-system/loading-overlay/loading-overlay";
import Modal, { useModal } from "@/components/design-system/modal";
import AssetsEditor from "@/components/design-system/assets/editor/assets-editor";
import IconButton from "@/components/design-system/icon-button";
import TitleIndicator from "@/components/design-system/title-indicator";
import AssetDisplay from "@/components/design-system/assets/display/asset-display";
import {
  NewAsset,
  UpdateGameData,
  deleteGameAsset,
  getGame,
  getGameAsset,
  insetGameAsset,
  updateGameAsset,
  updateGameFactory,
} from "@/service/game";

import {
  AssetItemProps,
  AssetListProps,
  GameTitleFormProps,
  Params,
} from "./edit-game.props";
import {
  AssetListContainer,
  Container,
  GameAssetsContainer,
  GameSingleInputFormContainer,
  Logo,
  MainPartContainer,
  MainPartContainerWrapper,
  NavContainer,
  SidePartContainer,
  SidePartTrigger,
  StyledTabsContent,
} from "./edit-game.styles";

const TABS = {
  TITLE: "title",
  PRICE: "price",
  SIMPLE_DESCRIPTION: "simpleDescription",
  ASSETS: "assets",
} as const;

function EditGamePage() {
  const { id } = useParams<Params>();

  if (!id) {
    return null;
  }

  return (
    <Tabs.Root direction="vertical">
      <Container>
        <SidePartContainer>
          <SidePartTrigger value={TABS.TITLE}>Game title</SidePartTrigger>
          <SidePartTrigger value={TABS.PRICE}>Price</SidePartTrigger>
          <SidePartTrigger value={TABS.SIMPLE_DESCRIPTION}>
            Simplified description
          </SidePartTrigger>
          <SidePartTrigger value={TABS.ASSETS}>Assets</SidePartTrigger>
        </SidePartContainer>

        <MainPartContainerWrapper>
          <MainPartContainer size="small">
            <Nav id={id} />

            <StyledTabsContent value={TABS.TITLE}>
              <GameTitleForm id={id} />
            </StyledTabsContent>
            <StyledTabsContent value={TABS.PRICE}>
              <GamePriceForm id={id} />
            </StyledTabsContent>
            <StyledTabsContent value={TABS.SIMPLE_DESCRIPTION}>
              Simples desc content {id}
            </StyledTabsContent>
            <StyledTabsContent value={TABS.ASSETS}>
              <GameAssets id={id} />
            </StyledTabsContent>
          </MainPartContainer>
        </MainPartContainerWrapper>
      </Container>
    </Tabs.Root>
  );
}

// ------------
// Nav
// ------------
function Nav({ id }: GameTitleFormProps) {
  const { data: game } = useQuery(getGame.getKey(id), () => getGame(id));

  return (
    <NavContainer>
      <Logo src="https://pbs.twimg.com/profile_images/1606519048145358848/W7iR8GBb_400x400.jpg" />
      <Breadcrumbs>
        <Typography>Dashboard</Typography>
        <Typography>{game?.title}</Typography>
      </Breadcrumbs>
    </NavContainer>
  );
}

// --------------------
// Game title form
// --------------------
function GameTitleForm({ id, ...rest }: GameTitleFormProps) {
  const formMethods = useForm<UpdateGameData>();
  const { control, handleSubmit } = formMethods;

  const { data, refetch } = useQuery(getGame.getKey(id), () => getGame(id));

  const { mutate: handleGameUpdate, isLoading } = useMutation(
    updateGameFactory(id),
    {
      onSuccess: () => refetch(),
    }
  );

  return (
    <GameSingleInputFormContainer
      {...rest}
      {...formMethods}
      onSubmit={handleSubmit((d) => handleGameUpdate(d))}
    >
      <LoadingOverlay isLoading={isLoading} />

      {data ? (
        <InputText
          label="Game title"
          name="title"
          control={control}
          defaultValue={data.title}
        />
      ) : (
        <div />
      )}

      <Button isLoading={isLoading}>Save</Button>
    </GameSingleInputFormContainer>
  );
}

// --------------------
// Game title form
// --------------------
function GamePriceForm({ id, ...rest }: GameTitleFormProps) {
  const formMethods = useForm<UpdateGameData>();
  const { control, handleSubmit } = formMethods;

  const { data, refetch } = useQuery(getGame.getKey(id), () => getGame(id));

  const { mutate: handleGameUpdate, isLoading } = useMutation(
    updateGameFactory(id),
    {
      onSuccess: () => refetch(),
    }
  );

  return (
    <GameSingleInputFormContainer
      {...rest}
      {...formMethods}
      onSubmit={handleSubmit((d) => handleGameUpdate(d))}
    >
      <LoadingOverlay isLoading={isLoading} />

      {data ? (
        <InputCurrency
          label="Game price"
          name="price"
          control={control}
          defaultValue={data.price}
        />
      ) : (
        <div />
      )}

      <Button isLoading={isLoading}>Save</Button>
    </GameSingleInputFormContainer>
  );
}

// --------------------
// Game assets
// --------------------
function GameAssets({ id }: Params) {
  const { data: assets, isLoading } = useQuery(getGameAsset.getKey(id), () =>
    getGameAsset(id)
  );

  const getContent = () => {
    if (isLoading) {
      return <Typography size="2xl">Loading...</Typography>;
    }

    if (!assets || assets.length === 0) {
      return (
        <div>
          <Typography size="2xl">No assets found</Typography>
          <Typography color="gray.500">
            Use the button above to add assets
          </Typography>
        </div>
      );
    }

    return <AssetList id={id} assets={assets} />;
  };

  return (
    <Modal.Root>
      <GameAssetsContainer>
        <Modal.Trigger>
          {(handleOpen) => <Button onClick={handleOpen}>Add asset</Button>}
        </Modal.Trigger>

        {getContent()}
      </GameAssetsContainer>

      <CreateAssetModal id={id} />
    </Modal.Root>
  );
}

function AssetList({ assets, id }: AssetListProps) {
  return (
    <AssetListContainer>
      <TitleIndicator>
        <Typography>Assets</Typography>
      </TitleIndicator>

      {assets.map((asset) => (
        <AssetItem id={id} key={asset.id} asset={asset} />
      ))}
    </AssetListContainer>
  );
}

function AssetItem({ asset, id }: AssetItemProps) {
  const [editing, setEditing] = useState(false);
  const queryClient = useQueryClient();

  const handleRequestSuccess = () => {
    queryClient.refetchQueries({
      queryKey: getGameAsset.getKey(id),
    });
    stopEditing();
  };

  const { mutateAsync: updateGameAssetMutation } = useMutation(
    updateGameAsset,
    {
      onSuccess: handleRequestSuccess,
    }
  );

  const { mutate: deleteGameAssetMutation, isLoading: isDeletigGameAsset } =
    useMutation(() => deleteGameAsset(asset.id), {
      onSuccess: handleRequestSuccess,
    });

  const handleSubmit = async (newAsset: NewAsset) => {
    try {
      await updateGameAssetMutation({
        data: { ...newAsset, type: "image" },
        assetId: asset.id,
      });
    } catch (error) {
      return "Error saving asset";
    }

    return true;
  };

  const startEditing = () => {
    setEditing(true);
  };

  const stopEditing = () => {
    setEditing(false);
  };

  if (editing) {
    return (
      <AssetsEditor
        onSubmit={handleSubmit}
        defaultAsset={asset}
        isLoading={isDeletigGameAsset}
        upperPart={{
          title: "Edit asset",
          action: (
            <>
              <IconButton
                onClick={() => deleteGameAssetMutation()}
                type="button"
                isLoading={isDeletigGameAsset}
              >
                <DeleteBin7LineIcon />
              </IconButton>
              <IconButton onClick={stopEditing} type="button">
                <CloseLineIcon />
              </IconButton>
            </>
          ),
        }}
      />
    );
  }

  return (
    <button onClick={startEditing}>
      <AssetDisplay asset={asset} />
    </button>
  );
}

function CreateAssetModal({ id }: Params) {
  const queryClient = useQueryClient();
  const { handleClose } = useModal();

  const { mutateAsync } = useMutation(insetGameAsset, {
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: getGameAsset.getKey(id),
      });
      handleClose();
    },
  });

  const handleSubmit = async (newAsset: NewAsset) => {
    try {
      await mutateAsync({
        data: { ...newAsset, type: "image" },
        gameId: id,
      });
    } catch (error) {
      return "Error saving asset";
    }

    return true;
  };

  return (
    <Modal.Portal>
      <FocusTrap>
        <div>
          <Modal.Overlay />

          <Modal.Content>
            <AssetsEditor
              onSubmit={handleSubmit}
              upperPart={{
                title: "Add asset",
                action: (
                  <IconButton type="button" onClick={handleClose}>
                    <CloseLineIcon />
                  </IconButton>
                ),
              }}
            />
          </Modal.Content>
        </div>
      </FocusTrap>
    </Modal.Portal>
  );
}

export default EditGamePage;
