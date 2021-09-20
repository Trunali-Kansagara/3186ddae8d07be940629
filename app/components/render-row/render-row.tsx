import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color, spacing, typography } from "../../theme"
import { Text } from "../text/text"
import { flatten } from "ramda"
import { TxKeyPath } from "../../i18n"

const CONTAINER: ViewStyle = {
  flexDirection: "row",
}

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 14,
  color: color.palette.black,
}

export interface RenderRowProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  title: any
  value?: any
}

/**
 * Describe your component here
 */
export const RenderRow = observer(function RenderRow(props: RenderRowProps) {
  const { style, title, value } = props
  const styles = flatten([CONTAINER, style])

  return (
    <View style={styles}>
      <Text style={TEXT} text={title} preset={"bold"} />
      <Text style={TEXT} tx={value} />
    </View>
  )
})
