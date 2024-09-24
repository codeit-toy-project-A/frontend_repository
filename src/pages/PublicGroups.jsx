import Like from "../components/common/Like";
import Button from "../components/common/Button";
import Header from "../components/common/Header";
import Search from "../components/common/Search";
import InputText from "../components/common/Input/InputText";
import InputImage from "../components/common/Input/InputImage";
import InputBox from "../components/common/Input/InputBox";

const PublicGroups = () => {
  const handleClick = () => {
    alert("Button clicked!");
  };
  const handleSearch = (query) => {
    console.log("Searching for:", query);
  };

  return (
    <>
      <Header />
      <div>공개그룹목록</div>
      <Search handleSearch={handleSearch} />
      <Like />
      <Button text="Click Me" size="L" onClick={handleClick} />

      <InputText label="그룹명" />
      <InputImage />
      <InputBox label="그룹 소개" />
    </>
  );
};

export default PublicGroups;
