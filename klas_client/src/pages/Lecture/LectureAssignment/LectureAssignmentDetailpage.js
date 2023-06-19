import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AWS from "aws-sdk"; // s3 파일업로드에 필요
import { useState, useEffect } from "react";

function LectureAssignmentDetailpage() {
  const location = useLocation();
  const [output, setOutput] = useState([]);

  const [id, setId] = useState(location.state.id);
  const [assignmentid, setAssignmentid] = useState(location.state.assignmentid);
  const [lectureid, SetLectureid] = useState(location.state.lectureid);
  const [title, setTitle] = useState(location.state.title);
  const [content, setContent] = useState(location.state.content);
  const [attachmentname, setAttachmentname] = useState(
    location.state.attachmentname
  );
  const [attachmentaddress, setAttachmentaddress] = useState(
    location.state.attachmentaddress
  );

  const [userAttachmentaddress, setUserAttachmentaddress] = useState("");
  const [userAttachmentname, setUserAttachmentname] = useState("");
  const [userDate, setUserDate] = useState("");

  const [submitCheckid, setSubmitCheckid] = useState(0);
  const [submutCheckattachmentname, setSubmitCheckattachmentname] =
    useState("");
  const [submutCheckattachmentaddress, setSubmitCheckattachmentaddress] =
    useState("");

  const [deadline, setDeadline] = useState(location.state.deadline);
  const [userid, setUserid] = useState(location.state.userid);
  const [author, setAuthor] = useState(location.state.author);
  const [date, setDate] = useState(location.state.date);
  const [status, setStatus] = useState(location.state.status);

  const [hardcodingUserType, setHardcodingUserType] = useState(
    location.state.hardcodingUserType
  );
  const [hardcodingUserId, setHardcodingUserId] = useState(
    location.state.hardcodingUserId
  );
  const [hardcodingUserName, setHardcodingUserName] = useState(
    location.state.hardcodingUserName
  );

  const [userSubmit, setuserSubmit] = useState("");

  const navigate = useNavigate();

  const handOnclick_get_list = () => {
    axios
      .post("http://localhost:8080/lecture/assignment/list/student", {
        lectureid: lectureid,
        assignmentid: assignmentid,
        status: "제출",
      })
      .then((res) => {
        console.log(res);
        setOutput(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

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

  const [fileList, setFileList] = useState([]);
  const handleFileInput = (e) => {
    const file = e.target.files;
    let result = [];
    for (let i = 0; i < file.length; i++) {
      result = [...result, file[i]];
    }

    setFileList((prev) => (prev = result));
  };

  const handOnclick_delete = () => {
    axios
      .post("http://localhost:8080/lecture/assignment/delete", {
        lectureid: lectureid,
        assignmentid: assignmentid,
      })
      .then((res) => {
        console.log(res);
        navigate("/lecture/assignment/list");
        alert("삭제되었습니다.");
      })
      .catch((err) => {
        console.log(err.response);
      });
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

  const handleSubmit = () => {
    //조회 버튼을 눌른 경우 처리
    if (fileList.length === 0) {
      return { ...alert("첨부파일을 업로드하세요.") };
    } else if (submutCheckattachmentname !== "") {
      return { ...alert("이미 제출파일이 있습니다. 수정버튼을 클릭하세요.") };
    }
    uploadFile(fileList);

    setUserAttachmentname(fileList[0].name);
    setUserAttachmentaddress(
      `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${fileList[0].name}`
    );
    setUserDate(`${new Date().toLocaleString()}`);
  };

  const handleModify = () => {
    //조회 버튼을 눌른 경우 처리
    if (fileList.length === 0) {
      return { ...alert("첨부파일을 업로드하세요.") };
    } else if (submitCheckid === 0) {
      return { ...alert("제출파일이 없습니다. 제출버튼을 클릭하세요.") };
    }

    uploadFile(fileList);
    setUserAttachmentname(fileList[0].name);
    setUserAttachmentaddress(
      `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${fileList[0].name}`
    );
    setUserDate(`${new Date().toLocaleString()}`);
  };

  const get_one_student = () => {
    axios
      .post("http://localhost:8080/lecture/assignment/student", {
        lectureid: lectureid,
        assignmentid: assignmentid,
        status: "제출",
        userid: hardcodingUserId,
      })
      .then((res) => {
        console.log(res);
        setSubmitCheckid(res.data.id);
        setSubmitCheckattachmentname(res.data.attachmentname);
        setSubmitCheckattachmentaddress(res.data.attachmentaddress);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  useEffect(() => {
    if (userAttachmentaddress !== "") {
      if (submitCheckid === 0) {
        console.log(userAttachmentaddress);
        console.log(userAttachmentname);
        console.log(userDate);
        axios
          .post("http://localhost:8080/lecture/assignment/write", {
            assignmentid: assignmentid,
            lectureid: lectureid,
            title: title,
            content: content,
            attachmentname: userAttachmentname,
            attachmentaddress: userAttachmentaddress,
            deadline: deadline,
            status: "제출",
            date: userDate,
            author: hardcodingUserName,
            userid: hardcodingUserId,
          })
          .then((res) => {
            console.log(res);
            return {
              ...alert("과제가 제출되었습니다."),
              ...get_one_student(),
            };
          })
          .catch((err) => {
            console.log(err.response);
          });
      } else {
        console.log("else문");
        console.log(userAttachmentaddress);
        console.log(userAttachmentname);
        console.log(userDate);
        axios
          .post("http://localhost:8080/lecture/assignment/write", {
            id: submitCheckid,
            assignmentid: assignmentid,
            lectureid: lectureid,
            title: title,
            content: content,
            attachmentname: userAttachmentname,
            attachmentaddress: userAttachmentaddress,
            deadline: deadline,
            status: "제출",
            date: userDate,
            author: hardcodingUserName,
            userid: hardcodingUserId,
          })
          .then((res) => {
            console.log(res);
            return {
              ...alert("과제가 수정되었습니다."),
              ...get_one_student(),
            };
          })
          .catch((err) => {
            console.log(err.response);
          });
      }
    }
  }, [userAttachmentaddress]);

  const listitem = (lecturelist) => {
    // 백에서 가져온 리스트 데이터 출력함수
    const result = [];
    for (let i = 0; i < lecturelist.length; i++) {
      result.push(
        <a
          href={lecturelist[i].attachmentaddress}
          download
          class="flex flex-row justify-center w-full "
        >
          <div class="border border-black w-full">{i + 1}</div>
          <div class="border border-black w-full">{lecturelist[i].author}</div>
          <div class="border border-black w-full">{lecturelist[i].userid}</div>
          <div class="border border-black w-full">
            {lecturelist[i].attachmentname}
          </div>
          <div class="border border-black w-full">{lecturelist[i].date}</div>
        </a>
      );
    }
    return result;
  };

  return (
    <div class="flex flex-col justify-center items-center h-screen border bg-gradient-to-b from-white to-[#C8D6E8]">
      {hardcodingUserType === 1 ? (
        <div class="flex justify-center flex-col items-center h-[600px] w-[1400px] border border-black">
          <div class="flex justify-start w-[90%] h-[10%] mt-4 text-[35px]">
            과제 상세
          </div>
          <div class="flex justify-start w-[90%] h-[20%] border border-black ">
            <div class="flex flex-col ml-4 mt-4 text-[20px]">
              {title}
              <div class="flex flex-row mt-12 text-[13px]">
                작성자: {author}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;등록일:
                {date}
              </div>
            </div>
          </div>
          <div class="flex justify-start w-[90%] h-[10%]  border border-black ">
            <div class="flex flex-row ml-4 mt-4 text-[20px]">
              과제 제출 확인:&nbsp;&nbsp;&nbsp;
              <button
                onClick={handOnclick_get_list}
                class="flex border border-black h-[30px]"
              >
                제출 학생을 확인하려면 해당 버튼을 눌러주세요.
              </button>
            </div>
          </div>
          <div class="flex justify-start w-[90%] h-[40%] border border-black ">
            {/* 검색결과 리스트를 출력하는 부분 */}
            <div class="overflow-y-auto w-full">{listitem(output)}</div>
          </div>
          <div class="flex flex-row justify-center mt-2 w-full h-[5%] ">
            <button
              class="border border-black w-[50px] mr-2"
              onClick={() => {
                navigate("/lecture/assignment/modify", {
                  state: {
                    author: author,
                    assignmentid: assignmentid,
                    lectureid: lectureid,
                    id: id,
                    userid: userid,
                    status: status,
                  },
                });
              }}
            >
              수정
            </button>
            <button
              class="border border-black w-[50px]"
              onClick={() => {
                if (window.confirm("정말로 삭제하시겠습니까?")) {
                  handOnclick_delete();
                } else {
                }
              }}
            >
              삭제
            </button>
          </div>
        </div>
      ) : (
        <div class="flex justify-center flex-col items-center h-[600px] w-[1400px] border border-black">
          <div class="flex justify-start w-[90%] h-[10%] mt-4 text-[35px]">
            과제 상세{get_one_student()}
          </div>
          <div class="flex justify-start w-[90%] h-[20%] border border-black ">
            <div class="flex flex-col ml-4 mt-4 text-[20px]">
              {title}
              <div class="flex flex-row mt-12 text-[13px]">
                작성자: {author}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;등록일:
                {date}
              </div>
            </div>
          </div>
          <div class="flex justify-start w-[90%] h-[5%]  border border-dashed border-black ">
            <div class="flex flex-row ml-4 mt-2 text-[13px]">
              첨부파일:&nbsp;&nbsp;&nbsp;
              <a href={attachmentaddress} download>
                <div className="flex justify-center text-[13px]">
                  {attachmentname}
                </div>
              </a>
            </div>
          </div>
          <div class="flex justify-start w-[90%] h-[30%] border border-black overflow-y-auto ">
            <div class="flex flex-col ml-4  mt-2">
              <div>{content}</div>
            </div>
          </div>
          <div class="flex justify-start w-[90%] h-[5%]  border border-dashed border-black ">
            <div class="flex flex-row ml-4 mt-2 text-[13px]">
              제출파일:&nbsp;&nbsp;&nbsp;
              <a href={submutCheckattachmentaddress} download>
                <div className="flex justify-center text-[13px]">
                  {submutCheckattachmentname}
                </div>
              </a>
            </div>
          </div>
          <div class="flex justify-start w-[90%]  h-[10%]  border border-dashed border-black ">
            <div class="flex flex-row ml-4 mt-3 text-[15px]">
              과제제출:&nbsp;&nbsp;&nbsp;
            </div>
            <input
              type="file"
              id="file_upload"
              class="flex justify-center mt-2 "
              onChange={handleFileInput}
            />
          </div>
          <div class="flex flex-row justify-center mt-2 w-full h-[5%] ">
            <button
              class="border border-black w-[50px] mr-2"
              onClick={() => {
                handleSubmit();
              }}
            >
              제출
            </button>
            <button
              class="border border-black w-[50px]"
              onClick={() => {
                handleModify();
              }}
            >
              수정
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default LectureAssignmentDetailpage;
