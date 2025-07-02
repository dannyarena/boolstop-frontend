import { Link } from "react-router";

export default function PlatformsLinkComponent({ linkPage, children }) {
  return (
    <>
      <div className="div-platforms">
        <Link to={linkPage}>{children}</Link>
      </div>
    </>
  );
}
