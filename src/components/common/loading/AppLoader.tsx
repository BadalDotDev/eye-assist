import { LoadingBoxContainer } from "./styles";

import Logo from "@/assets/Logo.png";
import Image from "next/image";

const AppLoader = () => {
  return (
    <LoadingBoxContainer>
      <Image src={Logo} alt="Logo" width={100} height={100} />
    </LoadingBoxContainer>
  );
};

export default AppLoader;
