import { HTTP } from "../utils/http";

class LikeModel extends HTTP {
  like(behavior, art_id, type) {
    let url = behavior === 'like' ? '/like' : '/like/cancel'
    console.log(url, art_id, type);

    return this.request({
      url: url,
      method: 'POST',
      data: { art_id, type }
    })
  }
}

export { LikeModel }