package com.example.klas_server.Board;


import com.example.klas_server.Comment.CommentDTO;
import com.example.klas_server.Comment.CommentRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("/board")
public class BoardController {

    private final BoardService boardService;
    @PostMapping("/write")
    public ResponseEntity<HttpStatus> writeBoard(@RequestBody BoardDTO data )
    {
        System.out.println(data);
        try{
            Boolean res = boardService.writeBoard(data);
            if(res)
                return ResponseEntity.ok().build();
            else
                return ResponseEntity.noContent().build();
        }catch(Exception e){
            return ResponseEntity.internalServerError().build();
        }
    }
    @GetMapping("/list")
    public ResponseEntity<List<BoardDTO>> getBoard() {
        try{
            List<BoardDTO> list = boardService.getBoard();
            return ResponseEntity.ok(list);
        }catch(Exception e){
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/detail")
    public ResponseEntity<BoardDTO> viewBoard(@RequestBody BoardDTO boardDTO){
        try{
            System.out.println(boardDTO.getId());
            BoardDTO res = boardService.viewBoard(boardDTO);
            System.out.println(res);
            System.out.println(res.getCommentDTOList());
            System.out.println(res.getCommentDTOList().get(0).getContent());

            return ResponseEntity.ok(res);
        }catch(Exception e){
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/modify")
    public ResponseEntity<BoardDTO> modifyBoard(@RequestBody BoardDTO boardDTO){
        try{
            System.out.println(boardDTO);
            Boolean res = boardService.modifyBoard(boardDTO);
            if(res)
                return ResponseEntity.ok().build();
            else
                return ResponseEntity.noContent().build();
        }catch(Exception e){
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/delete")
    public ResponseEntity<HttpStatus> deleteBoard(@RequestBody BoardDTO boardDTO){
        try{
            System.out.println(boardDTO.getId());
            //System.out.println(boardId);/
            Boolean res = boardService.deleteBoard(boardDTO.getId());
            if(res)
                return ResponseEntity.ok().build();
            else
                return ResponseEntity.noContent().build();
        }catch(Exception e){
            return ResponseEntity.internalServerError().build();
        }
    }
}
