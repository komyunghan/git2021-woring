interface FeedState {
  id: number;
  content?: string | undefined;
  username?: string | undefined;
  memo?: string | undefined;
  dataUrl?: string | undefined;
  fileType?: string | undefined;
  createTime: number;
  modifyTime?: number;
  isEdit?: boolean;
  image?: string | undefined;
}
export type { FeedState };