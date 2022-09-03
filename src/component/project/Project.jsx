import React from "react";
import { useParams, Link, Routes, Route } from "react-router-dom";

// component
import Invite from "./Invite";
import Rightbar from "../main/Rightbar";
import Chat from "../chat/Chat";
import Board from "../board/Board";
import Settings from "../settings/Settings";
import "../../scss/project/project.scss";

//redux
import { connect } from "react-redux";
import { getProjectActions } from "../../store/actions/projectActions";

const Project = ({ getProjectData, projectsData, userDetails }) => {
  const token = localStorage.getItem("token");
  const { id } = useParams();
  React.useEffect(() => {
    const userName = userDetails?.userName;
    if (userName) {
      getProjectData(id, userName, token);
    }
  }, [id, token, getProjectData, userDetails?.userName]);
  return (
    <div className="project">
      {/* header */}
      <div className="project__header">
        <div className="project__header__left">
          <h1>{projectsData?.name}</h1>
        </div>
        <div className="project__header__right">
          <Link
            to={`/main/project/${id}/board`}
            id="project__header__right__link"
          >
            <div>Board</div>
          </Link>
          <Link
            to={`/main/project/${id}/backlog`}
            id="project__header__right__link"
          >
            <div>Backlog</div>
          </Link>

          <Link
            to={`/main/project/${id}/timeline`}
            id="project__header__right__link"
          >
            <div>Timeline</div>
          </Link>

          <Link
            to={`/main/project/${id}/chat`}
            id="project__header__right__link"
          >
            <div>Chat</div>
          </Link>

          <Link
            to={`/main/project/${id}/invite`}
            id="project__header__right__link"
          >
            <div>Invite</div>
          </Link>
          <Link
            to={`/main/project/${id}/setting`}
            id="project__header__right__link"
          >
            <div>Setting</div>
          </Link>
          <input
            type="text"
            placeholder="Search"
            className="project__header__right__search"
          />
        </div>
      </div>
      {/* body content */}
      <div className="project__body">
        <div className="project__body__content">
          <Routes>
            <Route path="/invite" element={<Invite projectId={id} />} />
            <Route path="/chat" element={<Chat projectId={id} />} />
            <Route path="/board/*" element={<Board projectId={id} />} />
            <Route path="/setting" element={<Settings projectId={id} />} />
          </Routes>
        </div>
        <Rightbar />
      </div>
    </div>
  );
};

const mapStoreStateToProps = ({ auth, project }) => {
  return {
    ...auth,
    ...project,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getProjectActions(dispatch),
  };
};

export default connect(mapStoreStateToProps, mapActionsToProps)(Project);
