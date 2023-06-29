import { Post, PostsService } from './posts.service';

describe('PostsService', () => {
  let postsService: PostsService;
  const post: Omit<Post, 'id' | 'date'> = {
    text: 'Mocked post',
  };

  beforeEach(() => {
    postsService = new PostsService();
    postsService.create({ text: 'Some pre-existing post' });
  });

  it('should add a new post', () => {
    const initialPostsLength = postsService.posts.length;
    const createdPost = postsService.create(post);
    expect(postsService.posts.length).toBe(initialPostsLength + 1);
    expect(createdPost).toEqual(expect.objectContaining({
      text: post.text,
    }));
    expect(createdPost.id).toBeDefined(); 
    expect(createdPost.date).toBeDefined();
  });

  it('should find a post', () => {
    const createdPost = postsService.create(post);
    const foundPost = postsService.find(createdPost.id);
    expect(foundPost).toEqual(expect.objectContaining({
      text: post.text,
    }));
    expect(foundPost.id).toBeUndefined();
    expect(foundPost.date).toBeUndefined();
  });
});
