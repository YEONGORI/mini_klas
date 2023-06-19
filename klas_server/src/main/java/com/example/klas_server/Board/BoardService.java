package com.example.klas_server.Board;

import com.example.klas_server.Comment.CommentDTO;
import com.example.klas_server.User.User;
import com.example.klas_server.User.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class BoardService {
    @Autowired
    private BoardRepository boardRepository;

    @Autowired
    private UserRepository userRepository;

    public Boolean writeBoard(BoardDTO data){

        Optional<User> check = userRepository.findByUserId(data.getUser().getUserId());
        User user = check.get();

        LocalDateTime now = LocalDateTime.now();
        String formatNow = now.format(DateTimeFormatter.ofPattern("yyyy-mm-dd.hh-mm-ss"));
        try {
            boardRepository.save(new BoardDTO(data.getTitle(), data.getContent(), formatNow, user));
            return true;
        }catch(Exception e){
            return false;
        }
    }
    public List<BoardDTO> getBoard(){
        System.out.println("testtest");
        return boardRepository.findAll();
    }

    public BoardDTO viewBoard(BoardDTO boardDTO){
        try {
            System.out.println("testtest");
            BoardDTO res = boardRepository.findById(boardDTO.getId()).get();

            return res;
        }catch (Exception e){
            return null;
        }
    }

    public Boolean modifyBoard(BoardDTO boardDTO){
        try{
            Optional<BoardDTO> board = boardRepository.findById(boardDTO.getId());
            User user = board.get().getUser();
            LocalDateTime now = LocalDateTime.now();
            String formatNow = now.format(DateTimeFormatter.ofPattern("yyyy-mm-dd.hh-mm-ss"));
            boardRepository.save(new BoardDTO(boardDTO.getId(), boardDTO.getTitle(), boardDTO.getContent(), formatNow, user));
            return true;
        }catch(Exception e){
            return false;
        }
    }

    public Boolean deleteBoard(Integer boardid){
        try{
            System.out.println(boardid);
            boardRepository.deleteById(boardid);
            return true;
        }catch(Exception e){
            return false;
        }
    }
}
