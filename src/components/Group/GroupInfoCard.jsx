// 그룹 상세 페이지 - 그룹 상세 정보 카드

import React from "react";
import "./GroupInfoCard.css";
import Badge from "../Badge/Badge";
import Like from "../common/Like";
import GroupEditModal from "../modal/GroupEditModal";
import GroupDeleteModal from "../modal/GroupDeleteModal";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getGroupBadges } from "../../util/badgeUtils";

const GroupInfoCard = () => {
  const { groupId } = useParams();
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  // 그룹 데이터 가져오기
  const fetchGroupData = async () => {
    console.log("Fetching data for group ID:", groupId);
    try {
      const response = await fetch(
        `https://backend-repository-t82r.onrender.com/api/groups/${groupId}`
      );
      if (!response.ok) {
        throw new Error("그룹 정보를 불러오는 데 실패했습니다.");
      }
      const data = await response.json();
      const badges = getGroupBadges(data);
      console.log("그룹 정보를 불러왔습니다:", data);
      console.log("배지:", badges);
      setGroup({ ...data, badges });
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroupData(); // 컴포넌트가 마운트될 때 데이터 가져오기
  }, [groupId]);

  const handleSendEmpathy = () => {
    console.log("공감 보내기 클릭");
  };

  // 날짜를 D-day + 형식으로 변환하는 함수
  const getDDayFormat = (createdAt) => {
    const createdDate = new Date(createdAt);
    const today = new Date();
    const differenceInTime = today.getTime() - createdDate.getTime(); // 밀리초 단위 차이
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24)); // 일 단위로 변환
    return `D+${differenceInDays}`; // D-day 형식으로 반환
  };

  // 로딩 중일 때 표시할 메시지
  if (loading) {
    return <div>로딩 중...</div>;
  }

  // 그룹 정보가 없을 경우 표시할 메시지
  if (!group) {
    return <div>그룹 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="groupDetails">
      <div className="groupDetails__image">
        <img src={group.imageUrl} />
      </div>

      <div className="groupDetails__info">
        <div className="groupDetails__header">
          <div className="groupDetails__dDayVis">
            <span className="groupDetails__dDay">
              {getDDayFormat(group.createdAt)}
            </span>
            <span className="groupDetails__visibility">
              | {group.isPublic ? "공개" : "비공개"}
            </span>
          </div>

          <div className="groupDetails__buttons">
            <button
              className="groupDetails__buttons__edit"
              onClick={() => setEditModalOpen(true)}
            >
              그룹 정보 수정하기
            </button>
            <GroupEditModal
              isOpen={isEditModalOpen}
              onClose={() => setEditModalOpen(false)}
              groupId={groupId}
            />

            <button
              className="groupDetails__buttons__delete"
              onClick={() => setDeleteModalOpen(true)}
            >
              그룹 삭제하기
            </button>
            <GroupDeleteModal
              isOpen={isDeleteModalOpen}
              onClose={() => setDeleteModalOpen(false)}
              groupId={groupId}
            />
          </div>
        </div>

        <div className="groupDetails__bold">
          <h1 className="groupDetails__title">{group.name}</h1>

          <div className="groupDetails__stats">
            <span>추억 {group.postCount}</span> |{" "}
            <span>그룹 공감 {group.likeCount}</span>
          </div>
        </div>

        <p className="groupDetails__description">{group.introduction}</p>

        <p className="groupDetails__badgeTitle">획득 배지</p>
        <div className="groupDetails__badgeBtn">
          <div className="groupDetails__badges">
            {group.badges.map((badge) => (
              <Badge key={badge.id} icon={badge.icon} name={badge.name} />
            ))}
          </div>
          <div className="groupDetails__like">
            <Like
              onClick={handleSendEmpathy}
              className="groupDetails__empathyButton"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupInfoCard;
