import React, { useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ActivityIndicator, FlatList, TouchableOpacity, View, ViewStyle } from "react-native"
import { RenderRow, RowView, Screen, Text } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color, spacing } from "../../theme"
import { toJS } from "mobx"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
}
const CONTAINER: ViewStyle = {
  flex: 1,
  marginVertical: spacing[4],
}
const SEPERATOR: ViewStyle = {
  padding: spacing[1],
  backgroundColor: color.palette.lighterGrey,
}
const LISTCONTAINER: ViewStyle = {
  paddingHorizontal: spacing[4],
}

export const PostListScreen = observer(function PostListScreen() {
  // Pull in one of our MST stores
  const { postStore } = useStores()

  // Pull in navigation via hook
  const navigation: any = useNavigation()

  useEffect(() => {
    postStore.fetchPosts()

    const interval = setInterval(async () => {
      await postStore.fetchMorePost()
    }, 10000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  const renderItem = (item, index) => {
    const { title, url, author, created_at } = item
    return (
      <TouchableOpacity
        style={LISTCONTAINER}
        onPress={() => {
          onPress(item)
        }}
      >
        <RowView title={"title"} value={title} />
        <RowView title={"author"} value={author} />
        <RowView title={"url"} value={url} />
        <RowView title={"created_at"} value={created_at} />
      </TouchableOpacity>
    )
  }

  const onEndReach = async () => {
    if (!postStore.isLoading) {
      await postStore.fetchMorePost()
    }
  }

  const itemSeparatorComponent = () => {
    return <View style={SEPERATOR} />
  }

  const listFooterComponent = () => {
    return <ActivityIndicator size={"small"} color={color.palette.orange} />
  }

  const onPress = async (item: any) => {
    postStore.updatePost(item)
    navigation.navigate("postListDetail")
  }
  return (
    <Screen style={ROOT} preset="fixed">
      <View style={CONTAINER}>
        <FlatList
          data={toJS(postStore.posts)}
          renderItem={({ item, index }) => renderItem(item, index)}
          keyExtractor={(item, index) => String(index)}
          onEndReachedThreshold={0.2}
          onEndReached={onEndReach}
          ListFooterComponent={listFooterComponent}
          ItemSeparatorComponent={itemSeparatorComponent}
        />
      </View>
    </Screen>
  )
})
