package com.example.klas_server.Comment;

import com.example.klas_server.Board.BoardDTO;
import com.example.klas_server.Board.BoardRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
public class CommentService {
    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private BoardRepository boardRepository;

    public Boolean writeComment(CommentDTO data){
        try{

            Optional<BoardDTO> boardDTO = boardRepository.findById(data.getBoardDTO().getId());
            String content = data.getContent();
            commentRepository.save(new CommentDTO(content, boardDTO.get().getDate(), boardDTO.get()));
            return true;
        }catch(Exception e){
            return  false;
        }
    }
}
