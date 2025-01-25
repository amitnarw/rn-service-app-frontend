import React from "react";
import { Text } from "react-native";

const MyTextBold = ({ children, className = "", ...props }: any) => {
  return (
    <Text className={className} style={{fontFamily: 'Poppins-Bold'}} {...props}>
      {children}
    </Text>
  );
};

export default MyTextBold;
