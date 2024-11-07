// api/index.ts (or api/announcements.ts if this is just related to announcements)
const path = "dashboard/announce/list";

export default Object.freeze({
  // For other actions you may have
  GET_POSTS: {
    path: path,
    method: "GET",
  },
});
