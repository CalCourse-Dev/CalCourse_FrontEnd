import { postAnalysis } from './post-requests/post-analysis';
import { postAoi } from './post-requests/post-aoi';
import { postUser } from './post-requests/post-user';
import { postProject } from './post-requests/post-project';
import { postCheckout } from './post-requests/post-checkout';

const PostRequest = {
  postAnalysis,
  postAoi,
  postUser,
  postProject,
  postCheckout
};

export default PostRequest;
