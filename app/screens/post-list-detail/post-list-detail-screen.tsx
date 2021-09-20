import React from "react"
import { observer } from "mobx-react-lite"
import { SafeAreaView, TextStyle, View, ViewStyle, ScrollView } from "react-native"
import { Header, RowView, Screen, Text } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color, spacing } from "../../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}
const FULL: ViewStyle = {
  flex: 1,
}
const CONTAINER: ViewStyle = {
  marginHorizontal: spacing[4],
  marginVertical: spacing[2],
}
const TITLE: TextStyle = {
  color: color.palette.black,
  fontWeight: "bold",
  fontSize: 14,
  letterSpacing: 2,
}

export const PostListDetailScreen = observer(function PostListDetailScreen() {
  // Pull in one of our MST stores
  const { postStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()
  const { postDetail } = postStore
  return (
    <SafeAreaView style={FULL}>
      <ScrollView>
        <Screen style={ROOT} preset="fixed" unsafe>
          <Header
            leftIcon={"back"}
            onLeftPress={() => {
              navigation.goBack()
            }}
            headerText={"Post Detail"}
            titleStyle={TITLE}
          />
          <View style={CONTAINER}>
            <RowView title={"title"} value={postDetail.title} />
            <RowView title={"url"} value={postDetail.url} />
            <RowView title={"author"} value={postDetail.author} />
            <RowView title={"created_at"} value={postDetail.created_at} />
            <RowView title={"title"} value={postDetail.title} />
            <RowView title={"points"} value={postDetail.points} />
            <RowView title={"num_comments"} value={postDetail.num_comments} />
            <RowView title={"story_id"} value={postDetail.story_id} />
            <RowView title={"story_title"} value={postDetail.story_title} />
            <RowView title={"story_url"} value={postDetail.story_url} />
            <RowView title={"created_at_i"} value={postDetail.created_at_i} />
            <RowView title={"parent_id"} value={postDetail.parent_id} />
            <RowView title={"objectID"} value={postDetail.objectID} />
            <RowView title={"story_text"} value={postDetail.story_text} />
          </View>
        </Screen>
      </ScrollView>
    </SafeAreaView>
  )
})
