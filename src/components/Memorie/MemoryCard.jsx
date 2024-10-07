// 추억 카드
import React from "react";
import "./MemoryCard.css"; // Ensure this path is correct
import favicon from "../../assets/favicon.png";

const MemoryCard = ({
  nickname,
  isPublic,
  title,
  imageUrl,
  tags,
  location,
  moment,
  likeCount,
  commentCount,
}) => {
  return (
    <div className="memory-card">
      {isPublic && ( // Conditional rendering for the image
        <div className="memory-card__imgdiv">
          <img src={imageUrl} className="memory-card__image" />
        </div>
      )}
      <div className="memory-card__details">
        <div className="memory-card__header">
          <span className="memory-card__nickname">{nickname}</span>
          <span className="memory-card__public-status">
            | {isPublic ? "공개" : "비공개"}
          </span>
        </div>
        <h3 className="memory-card__title">{title}</h3>
        {isPublic && ( // Conditional rendering for tags
          <div className="memory-card__tags">
            {tags.map((tag, index) => (
              <span key={index} className="memory-card__tag">
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="memory-card__etc">
          {isPublic && ( // Conditional rendering for location and moment
            <div className="memory-card__etc1">
              <span className="memory-card__location">{location}</span>
              <span className="memory-card__moment">{moment}</span>
            </div>
          )}

          <div className="memory-card__etc2">
            <span className="memory-card__likes">
              <img src={favicon} alt="Like Icon" />
              {likeCount}
            </span>
            <span className="memory-card__comments">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.46191 21.5385L4.02731 16.2231C3.71065 15.5526 3.46032 14.8653 3.27634 14.1613C3.09237 13.4572 3.00039 12.7368 3.00039 12C3.00039 10.755 3.23655 9.585 3.70886 8.49C4.1812 7.395 4.82221 6.4425 5.63191 5.6325C6.44161 4.8225 7.39376 4.18125 8.48834 3.70875C9.58294 3.23625 10.7525 3 11.997 3C13.2416 3 14.4117 3.23616 15.5073 3.70847C16.6029 4.18081 17.5559 4.82182 18.3664 5.63152C19.1769 6.44122 19.8185 7.39337 20.2912 8.48795C20.764 9.58255 21.0004 10.7521 21.0004 11.9966C21.0004 13.2412 20.7641 14.4113 20.2916 15.5069C19.8191 16.6025 19.1779 17.5556 18.3679 18.366C17.5579 19.1765 16.6054 19.8181 15.5104 20.2909C14.4154 20.7636 13.2454 21 12.0004 21C11.2636 21 10.5432 20.908 9.83914 20.7241C9.13511 20.5401 8.44783 20.2897 7.77731 19.9731L2.46191 21.5385ZM3.95039 20.05L7.15039 19.1C7.40936 19.0333 7.64686 19.0019 7.86289 19.0058C8.07892 19.0096 8.30809 19.0744 8.55039 19.2C9.08372 19.4667 9.64206 19.6667 10.2254 19.8C10.8087 19.9333 11.4004 20 12.0004 20C14.2337 20 16.1254 19.225 17.6754 17.675C19.2254 16.125 20.0004 14.2333 20.0004 12C20.0004 9.76667 19.2254 7.875 17.6754 6.325C16.1254 4.775 14.2337 4 12.0004 4C9.76706 4 7.87539 4.775 6.32539 6.325C4.77539 7.875 4.00039 9.76667 4.00039 12C4.00039 12.6 4.06706 13.1917 4.20039 13.775C4.33372 14.3583 4.53372 14.9167 4.80039 15.45C4.91706 15.6667 4.98276 15.8958 4.99751 16.1375C5.01225 16.3792 4.97987 16.6167 4.90039 16.85L3.95039 20.05Z"
                  fill="#8D8D8D"
                />
              </svg>
              {commentCount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoryCard;
