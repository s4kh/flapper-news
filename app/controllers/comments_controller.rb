class CommentsController < ApplicationController

  before_filter :authenticate_user!, only: [:create, :vote]

  def create
    @post = Post.find(params[:post_id])
    comment = @post.comments.create(comment_params.merge(user_ud: current_user.id))
    respond_with @post, comment
  end

  def vote
    @post = Post.find(params[:post_id])
    @comment = @post.comments.find(params[:id])
    @comment.increment!(:votes)

    respond_with @post, @comment
  end

  private
  def comment_params
    params.require(:comment).permit(:body)
  end
end
