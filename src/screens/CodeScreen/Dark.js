import React from 'react';
import { Pressable, Text } from "react-native"
import { withExpoSnack } from 'nativewind';
import { styled, useColorScheme } from "nativewind";

const StyledPressable = styled(Pressable)
const StyledText = styled(Text)

function Dark() {
  const { colorScheme, toggleColorScheme, setColorScheme } = useColorScheme();

  return (
    <StyledPressable
      onPress={()=>{
        setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')
      }}
      className="flex-1 items-center justify-center dark:bg-slate-800"
    >
      <StyledText
        selectable={false}
        className="dark:text-white"
      >
        {`Try clicking me! ${colorScheme === "dark" ? "🌙" : "🌞"}`}
      </StyledText>
    </StyledPressable>
  );
}

// This demo is using a external compiler that will only work in Expo Snacks.
// You may see flashes of unstyled content, this will not occur under normal use!
// Please see the documentation to setup your Darklication
export default withExpoSnack(Dark);