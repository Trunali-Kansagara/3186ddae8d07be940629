import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color, spacing, typography } from "../../theme"
import { Text } from "../"
import { flatten } from "ramda"

const CONTAINER: ViewStyle = {
  // justifyContent: "center",
  flexDirection: "row",
  alignItems: "center",
  paddingTop: spacing[2],
}

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 16,
  color: color.palette.black,
  flex: 1,
  textTransform: "capitalize",
  lineHeight: 22,
  letterSpacing: 2,
}
const VALUE: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 14,
  color: color.palette.black,
  flex: 2,
  letterSpacing: 2,
}

export interface RowViewProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  title?: string
  value?: any
}

/**
 * Describe your component here
 */
export const RowView = observer(function RowView(props: RowViewProps) {
  const { style, title, value } = props
  const styles = flatten([CONTAINER, style])

  return (
    <View style={styles}>
      <Text style={TEXT} preset={"bold"}>
        {title + " : "}
      </Text>
      <Text style={VALUE}>{value}</Text>
    </View>
  )
})
