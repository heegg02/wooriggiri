package com.wooriggiri.app.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Pageable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.wooriggiri.app.domain.BoardItemDTO;
import com.wooriggiri.app.domain.BoardListDTO;
import com.wooriggiri.app.domain.BoardRequestDTO;
import com.wooriggiri.app.domain.CommentDTO;
import com.wooriggiri.app.domain.CommentRequestDTO;
import com.wooriggiri.app.domain.CommentResponseDTO;
import com.wooriggiri.app.domain.FavoriteRequestDTO;
import com.wooriggiri.app.domain.NotiesRequestDTO;
import com.wooriggiri.app.domain.PostRequestDTO;
import com.wooriggiri.app.domain.ResponsDTO;
import com.wooriggiri.app.domain.UserDetailResponsDTO;
import com.wooriggiri.app.domain.ChildCommentRequestDTO;
import com.wooriggiri.app.entity.Board;
import com.wooriggiri.app.entity.BoardFavorite;
import com.wooriggiri.app.entity.Comment;
import com.wooriggiri.app.entity.Post;
import com.wooriggiri.app.entity.User;
import com.wooriggiri.app.repository.BoardFavoriteRepository;
import com.wooriggiri.app.repository.BoardRepository;
import com.wooriggiri.app.repository.CommentRepository;
import com.wooriggiri.app.repository.PostRepository;
import com.wooriggiri.app.repository.UserRepository;

@Service
public class AppService {
    @Autowired
    private BoardRepository boardRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private BoardFavoriteRepository boardFavoriteRepository;
    
    public boolean isFavorite(Long userId, Long boardId) {
        boolean isFavorite = boardFavoriteRepository.findFavorite(userId, boardId) != null;
        return isFavorite;
    }

    public UserDetailResponsDTO searchUserDetail(String username) {
        User user = userRepository.findByUsername(username);
        List<?> posts = postRepository.findByUserId(user.getId());
        List<?> comments = commentRepository.findByUserId(user.getId());
        List<?> myBoards = boardRepository.findByUserId(user.getId());
        List<?> favoriteBoard = boardRepository.findByFavorite(user.getId());
        Map<String, List<?>> results = new HashMap<>();
        results.put("posts", posts);
        results.put("comments", comments);
        results.put("myBoards", myBoards);
        results.put("favoriteBoard", favoriteBoard);

        Map<String, Object> metadata = new HashMap<>();
        metadata.put("userId", user.getId());

        UserDetailResponsDTO responsDTO = new UserDetailResponsDTO(results, metadata);
        return responsDTO;
    }
    

    public ResponsDTO searchComment(int page, Long id, String content, String username, String boardname, Long postId) {
        Pageable pageable = PageRequest.of(page-1, 10);

        List<?> result = commentRepository.findComment(id, content, username, boardname, postId, pageable);
        Map<String, Object> metadata = new HashMap<>();

        int postsLength = commentRepository.countCommentALL(id, content, username, boardname, postId);
        int pageLength = (int) Math.ceil( postsLength / 10.0);
        if (pageLength==0) {pageLength = 1;};

        metadata.put("currentPage", page);
        metadata.put("boardsLength", postsLength);
        metadata.put("pageLength", pageLength);

        ResponsDTO responsDTO = new ResponsDTO(result, metadata);

        return responsDTO;
    }


    public ResponsDTO searchAdminNoties(int page, Long id, String title) {
        Pageable pageable = PageRequest.of(page-1, 10);

        List<?> result = postRepository.findAdminNoties(id, title, pageable);
        Map<String, Object> metadata = new HashMap<>();

        int postsLength = postRepository.countAdminNotiesALL(id, title);
        int pageLength = (int) Math.ceil( postsLength / 10.0);
        if (pageLength==0) {pageLength = 1;};

        metadata.put("currentPage", page);
        metadata.put("boardsLength", postsLength);
        metadata.put("pageLength", pageLength);

        ResponsDTO responsDTO = new ResponsDTO(result, metadata);

        return responsDTO;

    }

    public ResponsDTO searchPost(int page, Long id, String title, String username, String boardname) {
        Pageable pageable = PageRequest.of(page-1, 10);

        List<?> result = postRepository.findPost(id, title, username, boardname, pageable);
        Map<String, Object> metadata = new HashMap<>();

        int postsLength = postRepository.countPostALL(id, title, username, boardname);
        int pageLength = (int) Math.ceil( postsLength / 10.0);
        if (pageLength==0) {pageLength = 1;};

        metadata.put("currentPage", page);
        metadata.put("boardsLength", postsLength);
        metadata.put("pageLength", pageLength);

        ResponsDTO responsDTO = new ResponsDTO(result, metadata);

        return responsDTO;
    }

    public ResponsDTO searchUser(int page, Long id, String username) {
        Pageable pageable = PageRequest.of(page-1, 10);

        List<?> result = userRepository.findUser(id, username, pageable);
        Map<String, Object> metadata = new HashMap<>();

        int usersLength = userRepository.countUserALL(id, username);
        int pageLength = (int) Math.ceil( usersLength / 10.0);
        if (pageLength==0) {pageLength = 1;};

        metadata.put("currentPage", page);
        metadata.put("boardsLength", usersLength);
        metadata.put("pageLength", pageLength);

        ResponsDTO responsDTO = new ResponsDTO(result, metadata);

        return responsDTO;
    }

    public ResponsDTO searchBoard(int page, Long id, String username, String boardname) {
        Pageable pageable = PageRequest.of(page-1, 10);

        List<?> result = boardRepository.findBoard(id, username, boardname, pageable);
        Map<String, Object> metadata = new HashMap<>();

        int boardsLength = boardRepository.countBoardALL(id, username, boardname);
        int pageLength = (int) Math.ceil( boardsLength / 10.0);
        if (pageLength==0) {pageLength = 1;};

        metadata.put("currentPage", page);
        metadata.put("boardsLength", boardsLength);
        metadata.put("pageLength", pageLength);

        ResponsDTO responsDTO = new ResponsDTO(result, metadata);

        return responsDTO;
    }

    public ResponsDTO searchNoties(int page, String title, String username) {
        Pageable pageable = PageRequest.of(page-1, 10);
        List<?> result = postRepository.findNoties(pageable, title, username);
        
        Map<String, Object> metadata = new HashMap<>();

        int postsLength = postRepository.countNotiesALL(title, username);
        int pageLength = (int) Math.ceil( postsLength / 10.0);
        if (pageLength==0) {pageLength = 1;};
        
        metadata.put("currentPage", page);
        metadata.put("postsLength", postsLength);
        metadata.put("pageLength", pageLength);

        ResponsDTO responsDTO = new ResponsDTO(result, metadata);

        return responsDTO;
    }

    public ResponsDTO searchBoardByCommunityName(int page, String boardname, String title, String username) {
        Pageable pageable = PageRequest.of(page-1, 10);
        List<?> result = postRepository.findByBoardname(boardname, pageable, title, username);
        
        Map<String, Object> metadata = new HashMap<>();

        Board board = boardRepository.findByBoardname(boardname);

        int postsLength = postRepository.countByBoardnameALL(boardname, title, username);
        int pageLength = (int) Math.ceil( postsLength / 10.0);
        if (pageLength==0) {pageLength = 1;};
        
        metadata.put("boardId", board.getId());
        metadata.put("boardname", board.getBoardname());
        metadata.put("description", board.getDescription());
        metadata.put("userId", board.getUserId());
        metadata.put("createdDate", board.getCreatedDate());
        metadata.put("updatedDate", board.getUpdatedDate());
        metadata.put("currentPage", page);
        metadata.put("postsLength", postsLength);
        metadata.put("pageLength", pageLength);

        ResponsDTO responsDTO = new ResponsDTO(result, metadata);

        return responsDTO;
    }

    public ResponsDTO searchPostDetail(int postId) {
        postRepository.incrementViewCount(postId);
        List<?> result = postRepository.findByPostId(postId);
        Map<String, Object> metadata = new HashMap<>();

        metadata.put("dataInfo", "PostDetail");

        ResponsDTO responsDTO = new ResponsDTO(result, metadata);
        return responsDTO;
    }

    public List<CommentResponseDTO> searchChildComments(List<CommentDTO> comments) {
        List<CommentResponseDTO> parents = new ArrayList<>();
        if(comments.size() > 0) {
            for(CommentDTO comment :comments) {
                List<CommentDTO> childComments = commentRepository.findChildComment(comment.getCommentId());
                List<CommentResponseDTO> childResponses = searchChildComments(childComments);
                
                CommentResponseDTO commentResponse = new CommentResponseDTO(comment, childResponses);

                parents.add(commentResponse);
            }
        }
        return parents;
    }

    public ResponsDTO searchComment(int postId) {
        List<CommentDTO> firstComments = commentRepository.findFirstByPostId(postId);
        List<CommentResponseDTO> result = searchChildComments(firstComments);

        Map<String, Object> metadata = new HashMap<>();

        metadata.put("dataInfo", "Comment");

        ResponsDTO responsDTO = new ResponsDTO(result, metadata);
        return responsDTO;
    }

    public Map<String, List<BoardItemDTO>> searchNotiesPosts() {
        Map<String, List<BoardItemDTO>> contentData = new HashMap<>();
        Pageable pageable = PageRequest.of(0, 5);
        List<BoardItemDTO> noticePosts = postRepository.findNoticePosts(pageable);
        contentData.put("noticePosts", noticePosts);
        return contentData;
    }

    public Map<String, List<BoardItemDTO>> searchPopularPosts() {
        Map<String, List<BoardItemDTO>> contentData = new HashMap<>();
        Pageable pageable = PageRequest.of(0, 8);
        LocalDateTime oneWeekAgo = LocalDateTime.now().minusDays(7);
        List<BoardItemDTO> popularPosts = postRepository.findPopularPosts(oneWeekAgo, pageable);
        contentData.put("popularPosts", popularPosts);
        return contentData;
    }

    public Map<String, List<BoardListDTO>> searchPopularCommunities() {
        Map<String, List<BoardListDTO>> contentData = new HashMap<>();
        Pageable pageable = PageRequest.of(0, 8);
        LocalDateTime oneWeekAgo = LocalDateTime.now().minusDays(7);
        List<BoardListDTO> popularCommunities = boardRepository.findPopularCommunities(oneWeekAgo, pageable);
        contentData.put("popularCommunities", popularCommunities);
        return contentData;
    }

    public Map<String, List<BoardItemDTO>> searchMyCommunitiesPosts(int userId) {
        Map<String, List<BoardItemDTO>> contentData = new HashMap<>();
        Pageable pageable = PageRequest.of(0, 8);
        List<BoardItemDTO> myCommunitiesPosts = postRepository.findMyCommunitiesPosts(userId, pageable);
        contentData.put("myCommunitiesPosts", myCommunitiesPosts);
        return contentData;
    }

    public Map<String, List<BoardItemDTO>> searchFavoriteCommunityPosts(int userId) {
        Map<String, List<BoardItemDTO>> contentData = new HashMap<>();
        Pageable pageable = PageRequest.of(0, 8);
        List<BoardItemDTO> favoriteCommunityPosts = postRepository.findFavoriteCommunityPosts(userId, pageable);
        contentData.put("favoriteCommunityPosts", favoriteCommunityPosts);
        return contentData;
    }

    public Map<String, List<String>> searchCommunityList(int userId) {
        Map<String, List<String>> communityList = new HashMap<>();
        communityList.put("myCommunityList", boardRepository.findbyUserId(userId));
        communityList.put("favoriteCommunities", boardRepository.findFavoritesByUserID(userId));
        return communityList;
    }

    public Map<String, List<String>> searchBykeyWord(String keyword) {
        Map<String, List<String>> searchResults = new HashMap<>();
        List<String> communities = boardRepository.findCommunitiesByKeyword(keyword);
        List<String> users = userRepository.findUsersByKeyword(keyword);
        searchResults.put("communities", communities);
        searchResults.put("users", users);
        return searchResults;
    }

    public void insertComment(CommentRequestDTO commentRequest) {
        Comment comment = new Comment();
        comment.setCommentType(1);
        comment.setUserId(commentRequest.getUserId());
        comment.setPostId(commentRequest.getPostId());
        comment.setContent(commentRequest.getComment());
        comment.setParentCommentId(null);
        commentRepository.save(comment);
    }
    public void insertChildComment(ChildCommentRequestDTO commentRequest) {
        Comment comment = new Comment();
        comment.setCommentType(1);
        comment.setUserId(commentRequest.getUserId());
        comment.setPostId(commentRequest.getPostId());
        comment.setContent(commentRequest.getComment());
        comment.setParentCommentId(commentRequest.getParentCommentId());
        commentRepository.save(comment);
    }


    public void insertNoties(NotiesRequestDTO notiesRequestDTO) {
        Post post = new Post();
        post.setPostType(0);
        post.setBoardId(0L);
        post.setUserId(notiesRequestDTO.getUserId());
        post.setTitle(notiesRequestDTO.getTitle());
        post.setContent(notiesRequestDTO.getContent());
        postRepository.save(post);
    }
    public void insertPost(PostRequestDTO postRequest) {
        Post post = new Post();
        post.setPostType(1);
        post.setBoardId(postRequest.getBoardId());
        post.setUserId(postRequest.getUserId());
        post.setTitle(postRequest.getTitle());
        post.setContent(postRequest.getContent());
        postRepository.save(post);
    }

    public void insertBoard(BoardRequestDTO boardRequestDTO) {
        Board board = new Board();
        board.setBoardType(1);
        board.setUserId(boardRequestDTO.getUserId());
        board.setBoardname(boardRequestDTO.getBoardname());
        board.setDescription(boardRequestDTO.getDescription());
        boardRepository.save(board);
    }

    public void favoriteboard(FavoriteRequestDTO favoriteRequest) {
        if(favoriteRequest.isFavorite()) {
            boardFavoriteRepository.deleteBoardFavorite(favoriteRequest.getUserId(), favoriteRequest.getBoardId());
        } else {
            BoardFavorite boardFavorite = new BoardFavorite();
            boardFavorite.setFollower(favoriteRequest.getUserId());
            boardFavorite.setBoardId(favoriteRequest.getBoardId());
            boardFavoriteRepository.save(boardFavorite);
        }
    }
    
    public void deletePost(Long postId) {
        postRepository.updatePostTypeById(postId, 3);
    }

    public void deleteComment(Long CommentId) {
        commentRepository.updateCommentTypeById(CommentId, 3);
    }

    public void deleteBoard(Long BoardId) {
        boardRepository.updateBoardTypeById(BoardId, 3);
    }

    public void deleteUser(Long userId) {
        userRepository.updateUserTypeById(userId, 3);
    }

}