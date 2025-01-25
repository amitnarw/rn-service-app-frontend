import React from "react";
import { Text } from "react-native";

const MyText = ({ children, className = "", ...props }: any) => {
  return (
    <Text className={className} style={{fontFamily: 'Poppins-Regular'}} {...props}>
      {children}
    </Text>
  );
};

export default MyText;
