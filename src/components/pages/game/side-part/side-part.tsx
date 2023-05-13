import { useState } from "react";
import { useSpring } from "@react-spring/web";
import { createContext, useContextSelector } from "use-context-selector";
import SideBarLineIcon from "remixicon-react/SideBarLineIcon";
import { GameSidePartProviderProps } from "./side-part.props";
import {
  AbsoluteContainer,
  SideBarIcon,
  DesktopContainer,
  Tabs,
  MobileContainer,
} from "./side-part.styles";

export function GameSidePartContent() {
  const sidebarActive = useSidebarActive();
  const setSidebarActive = useSetSidebarActive();

  const [stylesDeskop] = useSpring(() => {
    return {
      width: sidebarActive ? "68rem" : "0",
    };
  }, [sidebarActive]);

  const [stylesAbsolute] = useSpring(() => {
    return {
      x: sidebarActive ? "0" : "100%",
    };
  }, [sidebarActive]);

  const closeSidebar = () => {
    setSidebarActive(false);
  };

  return (
    <>
      <AbsoluteContainer size="small" style={stylesAbsolute}>
        <Tabs />
        <div>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam odio
          aliquid deleniti nihil. Voluptates illum quia odit expedita officiis
          quam cum nemo ipsum similique aliquid id eos cumque, repellendus eum
          totam quas cupiditate quis accusantium optio numquam. Cum maiores
          similique ratione provident dolore minus incidunt ipsam, corrupti
          fugiat. Et nam accusantium eum est reiciendis repudiandae? Beatae
          sapiente accusantium eaque aliquam quibusdam esse velit quisquam
          temporibus quis sint sunt voluptas minus excepturi mollitia, labore
          est ipsa incidunt veniam necessitatibus deleniti. Magni autem odit qui
          ab quos molestiae quas dolorum iure repellendus praesentium eligendi
          perferendis dolore dicta voluptatum enim ad, deserunt vero dolores
          voluptatibus quasi. Consectetur magnam officia explicabo debitis omnis
          tempore culpa animi ex dolor, suscipit excepturi error ipsum aliquid
          cumque adipisci laudantium porro asperiores quas, aut quia sint unde,
          eaque provident libero! Vitae minus magni esse perferendis
          consequuntur, eligendi architecto laboriosam id, atque cumque placeat
          quos quo odit, cum magnam similique tenetur tempore debitis deserunt
          rerum pariatur. Tempore sunt quod cum adipisci facere nulla quis amet
          eveniet, quo nisi debitis ut ea voluptas alias, eaque animi veniam
          vitae. In aspernatur, fugiat sapiente odit iure ab facere fugit qui
          eius at possimus molestiae similique iste perspiciatis voluptas, quis
          sed error hic, dolor ullam? Repellendus soluta incidunt cum?
          Voluptatem id similique, itaque amet reprehenderit minima? Quia
          sapiente eaque labore aliquam nam quasi minima quaerat, recusandae
          natus repellat consequatur eius sed, qui exercitationem atque, cum
          excepturi neque magni explicabo alias suscipit temporibus illum. Quasi
          quae odio consequuntur magni doloribus, hic distinctio cumque illo
          fuga deleniti tenetur temporibus eveniet voluptatem quibusdam
          voluptatum quidem non, sint ipsum nesciunt labore. Quos consequuntur
          exercitationem expedita dolorum. Iure pariatur dolore repellat quis
          sit assumenda dignissimos incidunt quo, culpa temporibus
          necessitatibus eius obcaecati fugit praesentium reiciendis vel
          delectus laboriosam minima molestiae corporis eveniet? Temporibus
          maiores dolores eum asperiores repellendus harum itaque corporis
          voluptatem error voluptates ratione, sequi eligendi, nostrum tenetur
          numquam et deleniti deserunt doloremque nesciunt iste soluta
          voluptatibus non hic. Veniam animi sapiente reiciendis iusto rerum
          voluptate esse dolores dicta dolor nisi, laudantium id veritatis culpa
          officia soluta facere illum obcaecati minima ratione ad illo
          exercitationem. Natus, nisi consectetur quaerat nam quos ut commodi
          quae nobis magnam recusandae blanditiis autem cum doloremque, aliquam
          deleniti molestiae ad id iusto, reprehenderit quo beatae voluptatibus?
          Sequi blanditiis at cumque sunt expedita totam qui rerum aliquid est
          quidem! Ducimus voluptas obcaecati reiciendis enim autem aliquam ut.
          Quia explicabo distinctio molestias quas, mollitia amet eos commodi
          pariatur illum deleniti a iure magnam ipsam optio et, expedita enim
          corrupti porro veniam cumque suscipit? Non ducimus, provident ipsa
          facere ipsam explicabo dignissimos itaque enim magnam accusamus quidem
          quis et tenetur sunt voluptas at pariatur illum. Expedita temporibus
          laudantium in! Reiciendis vel non, nam, modi quod consectetur
          praesentium error ipsa iste ex minima a exercitationem earum tempore
          natus laudantium porro vero ratione distinctio debitis quos facere at
          blanditiis! Quos autem aut nemo voluptatem eligendi veritatis ipsam,
          quis incidunt! Obcaecati ducimus quibusdam molestias laudantium
          dolores beatae expedita animi dicta aut repellat asperiores delectus,
          provident, fuga, assumenda sit consequatur tempore! Molestiae vel
          necessitatibus sint in id, impedit ad illo beatae unde facilis aliquam
          veritatis delectus facere! Impedit, ex iste. Suscipit fugit magnam nam
          eaque nemo ex. Quibusdam et, perferendis similique dignissimos facilis
          quisquam minima illo quam, expedita eum impedit corporis odit nisi!
          Reiciendis officia iste odit, necessitatibus animi exercitationem nisi
          debitis accusantium earum nam soluta! Asperiores itaque blanditiis
          consequuntur doloremque ducimus quibusdam neque distinctio possimus
          culpa, quam debitis pariatur voluptate accusamus consequatur quas
          molestiae voluptas iste similique fugit et nobis quisquam optio
          nesciunt. Obcaecati voluptas odio natus iusto aspernatur facere amet,
          aut sint pariatur non illo dolores deleniti eligendi veniam numquam
          mollitia, ipsum, eaque sequi enim ab id maxime? Possimus cupiditate
          placeat odit magni officiis obcaecati veritatis illo maxime corporis,
          delectus, recusandae deleniti aut odio ipsam dicta ex doloremque
          dolorem velit. Minus alias error ut voluptate explicabo laborum
          delectus illum molestiae, amet unde expedita pariatur tempore numquam?
          Culpa sit cumque laborum provident! Reprehenderit hic reiciendis alias
          neque ipsam eum aliquid. Ratione sit libero distinctio quisquam veniam
          vitae voluptate sunt nesciunt doloribus blanditiis optio eaque, qui
          nobis facilis laborum animi possimus atque. Rerum aliquam architecto
          sequi excepturi ipsum voluptate placeat, impedit facere eligendi, id
          quisquam? Veritatis quaerat facilis tempora, iure natus quibusdam
          doloribus autem quos cupiditate! Dolores molestias asperiores earum
          quo nulla voluptatum perspiciatis aliquam obcaecati ex, modi ut
          repudiandae voluptates temporibus, id, illo hic possimus ducimus eos
          dignissimos sapiente? Sed hic saepe, laboriosam corrupti pariatur
          suscipit recusandae impedit vel consequuntur atque nisi. Minima
          reiciendis doloribus est error ducimus inventore, in ipsa suscipit
          animi vel obcaecati dicta eos tenetur voluptatem modi nobis vitae
          repellendus maxime. Mollitia ab magnam nihil, sunt dolores amet, earum
          veritatis fugiat eaque, id dolor commodi deleniti quibusdam. Beatae
          nisi quas, adipisci perspiciatis similique atque porro nemo pariatur
          est reiciendis deleniti dolores inventore, dicta minima maiores modi
          nihil aut explicabo quos aperiam! Enim quis officia, saepe doloribus
          eos ad ratione adipisci architecto dolore expedita quia aperiam rem?
          Sapiente ex qui architecto voluptates totam officia, hic aspernatur!
          Modi quidem, quasi, natus nesciunt, ab non adipisci ipsam impedit
          deleniti incidunt magni. Autem, similique quod itaque recusandae
          quidem quia magnam delectus non consequatur, doloremque aperiam
          distinctio inventore odio rerum nulla reiciendis quasi sapiente
          laborum quam magni illum iusto. Dignissimos enim doloremque tempore,
          voluptas, maxime modi eos reprehenderit beatae nesciunt voluptates,
          labore quod sed nobis nostrum quidem cumque esse veniam facere placeat
          soluta ex ullam ipsam fugit. Quas, maiores consequatur adipisci ad
          voluptatum, veniam quaerat commodi eaque necessitatibus iusto aperiam,
          itaque voluptates! Inventore maiores veritatis id beatae. Ipsa porro
          reiciendis illo eum aliquid, placeat magnam saepe adipisci quis
          ducimus, repudiandae praesentium voluptas accusamus laborum eaque
          dolores esse? Numquam eos expedita esse explicabo! Molestias, dicta
          veniam. Obcaecati veniam inventore ipsum dolores temporibus cupiditate
          impedit quisquam recusandae accusantium aperiam voluptatibus saepe
          delectus, et neque assumenda vitae consectetur expedita tempore!
          Dolorum quibusdam tempore ullam deleniti repellat. Praesentium,
          officia aut unde blanditiis reiciendis officiis, voluptatibus
          consectetur consequuntur fugit totam non enim tempora at, repudiandae
          doloribus illo suscipit illum hic minima reprehenderit maxime
          perferendis quod!
        </div>
      </AbsoluteContainer>

      <DesktopContainer size="small" style={stylesDeskop} />
      {sidebarActive && <MobileContainer onClick={closeSidebar} />}
    </>
  );
}

export function GameSidePartIcon() {
  const setSidebarActive = useSetSidebarActive();

  return (
    <SideBarIcon as="button" onClick={() => setSidebarActive((a) => !a)}>
      <SideBarLineIcon />
    </SideBarIcon>
  );
}

// Provider
function useGameSidePart() {
  const [sidepartActive, setSidepartActive] = useState(false);

  return [sidepartActive, setSidepartActive] as const;
}

const useSetSidebarActive = () =>
  useContextSelector(GameSidePartContext, (state) => {
    if (!state) {
      throw new Error("");
    }

    const [, set] = state;

    return set;
  });

const useSidebarActive = () =>
  useContextSelector(GameSidePartContext, (state) => {
    if (!state) {
      throw new Error("");
    }

    const [get] = state;

    return get;
  });

const GameSidePartContext = createContext<ReturnType<
  typeof useGameSidePart
> | null>(null);

export function GameSidePartProvider({ children }: GameSidePartProviderProps) {
  const value = useGameSidePart();

  return (
    <GameSidePartContext.Provider value={value}>
      {children}
    </GameSidePartContext.Provider>
  );
}

const GameSidePart = {
  Icon: GameSidePartIcon,
  Content: GameSidePartContent,
  Provider: GameSidePartProvider,
} as const;

export default GameSidePart;
