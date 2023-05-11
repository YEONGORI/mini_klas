package Lecture.Data;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
@Table(name = "Lecture")
public class lectureDTO {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int professor_id;
    @Column(name = "name")
    private String name;
    @Column(name = "day_of_week")
    private String day_of_week;

    @Column(name = "start_time")
    private Date start_time;
    @Column(name = "end_time")
    private Date end_time;
    @Column(name = "type")
    private String type;
}
