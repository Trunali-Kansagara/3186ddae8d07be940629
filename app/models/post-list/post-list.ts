import { flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { Api, GetPostResult } from "../../services/api"

/**
 * Model description here for TypeScript hints.
 */
const api = new Api()
api.setup()
export const PostListModel = types
  .model("PostList")
  .props({
    isLoading: types.optional(types.boolean, false),
    posts: types.optional(types.frozen(), null),
    pageNo: types.optional(types.number, 0),
    postDetail: types.optional(types.frozen(), null),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    fetchPosts: flow(function* fetchPosts() {
      try {
        self.isLoading = true
        self.pageNo = 0
        const response: GetPostResult = yield api.getPost(self.pageNo)
        if (response.kind === "ok") {
          const data = response.post.hits
          self.posts = data
          self.isLoading = false
        } else {
          self.isLoading = false
        }
      } catch (error) {
        self.isLoading = false
      }
    }),
    fetchMorePost: flow(function* fetchMorePost() {
      try {
        self.isLoading = true
        self.pageNo = self.pageNo + 1
        const response: GetPostResult = yield api.getPost(self.pageNo)

        if (response.kind === "ok") {
          const data = [...self.posts, ...response.post.hits]
          self.posts = data
          self.isLoading = false
        } else {
          self.isLoading = false
        }
      } catch (error) {
        self.isLoading = false
      }
    }),
    updatePost(postDetail: any) {
      self.postDetail = postDetail
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type PostListType = Instance<typeof PostListModel>
export interface PostList extends PostListType {}
type PostListSnapshotType = SnapshotOut<typeof PostListModel>
export interface PostListSnapshot extends PostListSnapshotType {}
export const createPostListDefaultModel = () => types.optional(PostListModel, {})
