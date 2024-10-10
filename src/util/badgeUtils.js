export const getGroupBadges = (group) => {
  const badges = [];

  // 추억 수 20개 이상 등록
  if (group.postCount >= 20) {
    badges.push({ id: 2, icon: "🌟", name: "추억 20개 등록" });
  }

  // 그룹 생성 후 1년 달성
  const today = new Date();
  const groupCreationDate = new Date(group.createdAt);
  const oneYearInMs = 365 * 24 * 60 * 60 * 1000;
  if (today - groupCreationDate >= oneYearInMs) {
    badges.push({ id: 3, icon: "📆", name: "1년 달성" });
  }

  // 그룹 공감 1만 개 이상 받기
  if (group.likeCount >= 10000) {
    badges.push({ id: 4, icon: "🏆", name: "1만 공감 받기" });
  }

  return badges;
};
