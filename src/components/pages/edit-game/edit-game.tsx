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
  GameSingleInputFormProps,
  Params,
} from "./edit-game.props";
import {
  AssetListContainer,
  Container,
  GameAssetsContainer,
  GameSingleInputFormContainer,
  MainPartContainer,
  MainPartContainerWrapper,
  NavContainer,
  SidePartContainer,
  SidePartTrigger,
  StyledNavUpperPart,
  StyledTabsContent,
} from "./edit-game.styles";
import InputEditor from "@/components/design-system/input/editor/input-editor";
import { User } from "@/components/design-system/nav";
import { Link } from "react-router-dom";

const TABS = {
  TITLE: "title",
  PRICE: "price",
  SIMPLE_DESCRIPTION: "simpleDescription",
  ASSETS: "assets",
} as const;

function useId() {
  const { id } = useParams<Params>();

  if (!id) {
    throw new Error("");
  }

  return id;
}

function EditGamePage() {
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
          <StyledNavUpperPart />

          <MainPartContainer size="small">
            <Nav />

            <StyledTabsContent value={TABS.TITLE}>
              <GameTitleForm />
            </StyledTabsContent>
            <StyledTabsContent value={TABS.PRICE}>
              <GamePriceForm />
            </StyledTabsContent>
            <StyledTabsContent value={TABS.SIMPLE_DESCRIPTION}>
              <GameSimpleDescription />
            </StyledTabsContent>
            <StyledTabsContent value={TABS.ASSETS}>
              <GameAssets />
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
function Nav() {
  const id = useId();

  const { data: game } = useQuery(getGame.getKey(id), () => getGame(id));

  return (
    <NavContainer>
      <Breadcrumbs>
        <User />
        <Link to="/admin/dashboard">
          <Typography>Dashboard</Typography>
        </Link>
        <Typography>{game?.title}</Typography>
      </Breadcrumbs>
    </NavContainer>
  );
}

// --------------------
// Game single input form
// --------------------
function GameSingleInputForm({ children, ...rest }: GameSingleInputFormProps) {
  const id = useId();
  const { control, handleSubmit } = useForm<UpdateGameData>();
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
      onSubmit={handleSubmit((d) => handleGameUpdate(d))}
    >
      <LoadingOverlay isLoading={isLoading} />

      {data ? children(data, control) : <div />}

      <Button isLoading={isLoading}>Save</Button>
    </GameSingleInputFormContainer>
  );
}

// --------------------
// Game title form
// --------------------
function GameTitleForm() {
  return (
    <GameSingleInputForm>
      {(data, control) => (
        <InputText
          label="Game title"
          name="title"
          control={control}
          defaultValue={data.title}
        />
      )}
    </GameSingleInputForm>
  );
}

// --------------------
// Game price form
// --------------------
function GamePriceForm() {
  return (
    <GameSingleInputForm>
      {(data, control) => (
        <InputCurrency
          label="Game price"
          name="price"
          control={control}
          defaultValue={data.price}
        />
      )}
    </GameSingleInputForm>
  );
}

// --------------------
// Game simple description
// --------------------
function GameSimpleDescription() {
  return (
    <GameSingleInputForm>
      {(data, control) => (
        <InputEditor
          label="Game description"
          name="description"
          control={control}
          defaultValue={data.description}
        />
      )}
    </GameSingleInputForm>
  );
}

// --------------------
// Game assets
// --------------------
function GameAssets() {
  const id = useId();

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

    return <AssetList assets={assets} />;
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

function AssetList({ assets }: AssetListProps) {
  return (
    <AssetListContainer>
      <TitleIndicator>
        <Typography>Assets</Typography>
      </TitleIndicator>

      {assets.map((asset) => (
        <AssetItem key={asset.id} asset={asset} />
      ))}
    </AssetListContainer>
  );
}

function AssetItem({ asset }: AssetItemProps) {
  const id = useId();
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
