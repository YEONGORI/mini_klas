import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AWS from "aws-sdk"; // s3 파일업로드에 필요
import axios from "axios";

function LectureAssignmentWritePage() {
  const location = useLocation();

  const [assignmentid, setAssignmentid] = useState(0);
  const [lectureid, SetLectureid] = useState(location.state.lectureid);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [attachmentname, setAttachmentname] = useState("");
  const [attachmentaddress, setAttachmentaddress] = useState("");

  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState(location.state.status);
  const [userid, setUserid] = useState(location.state.userid);

  const [author, setAuthor] = useState(location.state.name);
  const [date, setDate] = useState("");

  const navigate = useNavigate();

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const onChangeContent = (e) => {
    setContent(e.target.value);
  };
  const onChangeDeadline = (e) => {
    setDeadline(e.target.value);
  };
  const onChangeAssignmentid = (e) => {
    setAssignmentid(e.target.value);
  };

  const [fileList, setFileList] = useState([]);

  /////////////////////////////////////////////////////////////////////
  /*S3 연동 */
  const ACCESS_KEY = process.env.REACT_APP_ACCESS_KEY;
  const SECRET_ACCESS_KEY = process.env.REACT_APP_SECRET_ACCESS_KEY;
  const REGION = "ap-northeast-2";
  const S3_BUCKET = "softwareengineering-project-attachment";
  AWS.config.update({
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
  });

  const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
  });
  ////////////////////////////////////////////////////////////////////
  const handleFileInput = (e) => {
    const file = e.target.files;
    let result = [];
    for (let i = 0; i < file.length; i++) {
      result = [...result, file[i]];
    }

    setFileList((prev) => (prev = result));
  };

  const uploadFile = (file) => {
    //S3에 업로드
    let i = 0;
    for (; i < file.length; i++) {
      const params = {
        ACL: "public-read",
        Body: file[i],
        Bucket: S3_BUCKET,
        Key: `${file[i].name}`,
      };
      if (i === file.length - 1) {
        console.log("if");
        myBucket
          .putObject(params)

          .send((err) => {
            if (err) {
              console.log(err);
            }
          });
      } else {
        myBucket
          .putObject(params)

          .send((err) => {
            if (err) {
              console.log(err);
            }
          });
      }
    }
  };

  const handleSubmit = (e) => {
    //조회 버튼을 눌른 경우 처리

    e.preventDefault(); // 리랜더링 방지
    if (title === "") {
      return { ...alert("제목을 입력하세요") };
    } else if (fileList.length === 0) {
      return { ...alert("첨부파일을 업로드하세요.") };
    } else if (content === "") {
      return { ...alert("글 내용을 입력하세요") };
    } else if (deadline === "") {
      return { ...alert("마감일을 입력하세요") };
    }
    uploadFile(fileList);

    setAttachmentname(fileList[0].name);
    setAttachmentaddress(
      `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${fileList[0].name}`
    );
    setDate(`${new Date().toLocaleString()}`);
  };
  useEffect(() => {
    if (attachmentaddress !== "") {
      console.log(attachmentaddress);
      console.log(attachmentname);
      console.log(date);
      axios
        .post("http://localhost:8080/lecture/assignment/write", {
          assignmentid: assignmentid,
          lectureid: lectureid,
          title: title,
          content: content,
          attachmentname: attachmentname,
          attachmentaddress: attachmentaddress,
          deadline: deadline,
          status: status,
          author: author,
          date: date,
          userid: userid,
        })
        .then((res) => {
          console.log(res);
          return {
            ...alert("과제가 업로드되었습니다."),
            ...navigate("/lecture/assignment/list"),
          };
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  }, [attachmentaddress]);

  return (
    <div class="flex flex-col justify-center items-center h-screen border bg-gradient-to-b from-white to-[#C8D6E8]">
      <div class="flex justify-center flex-col items-center h-[600px] w-[1400px] border border-black">
        <div class="flex justify-start w-[90%] h-[10%] mt-4 text-[35px]">
          과제 업로드
        </div>
        <form
          class="felx justify-center items-center w-[90%] h-[70%]"
          onSubmit={handleSubmit}
        >
          <div class="flex flex-low justify-start w-full h-[10%] border border-black ">
            <div class="flex ml-4 mt-2 text-[20px]">
              제목:&nbsp;&nbsp;&nbsp;{" "}
            </div>
            <input
              onChange={onChangeTitle}
              value={title}
              className="flex items-center border border-slate-300 justify-center w-[46%] placeholder:text-black"
              type="text"
              placeholder={title}
            />
            <div class="flex ml-4 mt-2 text-[20px]">
              마감일:&nbsp;&nbsp;&nbsp;{" "}
            </div>
            <input
              onChange={onChangeDeadline}
              className="flex items-center border border-slate-300 justify-center  placeholder:text-black"
              type="date"
            />
            <div class="flex ml-4 mt-2 text-[20px]">
              과제 순번:&nbsp;&nbsp;&nbsp;{" "}
            </div>
            <input
              onChange={onChangeAssignmentid}
              className="flex items-center border border-slate-300 justify-center  placeholder:text-black"
              type="number"
            />
          </div>
          <div class="flex justify-start w-full h-[10%]  border border-dashed border-black ">
            <div class="flex flex-row ml-4 mt-3 text-[15px]">
              첨부파일:&nbsp;&nbsp;&nbsp;
            </div>
            <input
              type="file"
              id="file_upload"
              class="flex justify-center mt-2 "
              onChange={handleFileInput}
            />
          </div>
          <div class="flex justify-start w-full h-[80%] border border-black overflow-y-auto ">
            <input
              onChange={onChangeContent}
              value={content}
              className="flex items-center border border-slate-300 justify-center w-full placeholder:text-black overflow-y-auto"
              type="text"
              placeholder={content}
            />
          </div>
          <div class="flex justify-center">
            <input
              value="저장"
              type="submit"
              class="flex justify-center border border-black w-[50px] h-[30px] cursor-pointer ml-[15px] mt-[15px]"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
export default LectureAssignmentWritePage;
