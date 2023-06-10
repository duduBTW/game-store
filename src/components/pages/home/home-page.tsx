import InputCurrency from "@/components/design-system/input-currency/input-currency";
import SizeContainer from "@/components/design-system/size-container/size-container";

export default function HomePage() {
  return (
    <SizeContainer size="large" centered>
      <InputCurrency />
    </SizeContainer>
  );
}
