import { Dimensions, PixelRatio } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

// base width for scaling (iPhone 11 = 375px)
const scale = SCREEN_WIDTH / 375;

export function RFValue(size: number) {
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}
