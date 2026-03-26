import Blocky from "./variants/Blocky";
import Bordered from "./variants/Bordered";
import Rounded from "./variants/Rounded";

type Props = {
  variant: "blocky" | "bordered" | "rounded";
};

const Monogram: React.FC<Props> = ({ variant = "blocky" }) => {
  if (variant === "blocky") return <Blocky />;
  if (variant === "bordered") return <Bordered />;
  if (variant === "rounded") return <Rounded />;

  return null;
};

export default Monogram;
