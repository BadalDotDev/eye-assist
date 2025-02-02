import React from "react";
import LogoWithTextImage from "@/assets/LogoWithText.png";
import Image from "next/image";

interface Props {
  styles?: any;
}

const LogoWithText = ({ styles }: Props) => {
  return <Image src={LogoWithTextImage} alt={"Eye Assist"} style={styles} />;
};

export default LogoWithText;
