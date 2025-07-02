import { Link } from "react-router";

export default function PlatformsLinkComponent({ linkPage, children }) {
  return (
    <>
      <Link to={linkPage}>
        <div className="div-platforms">{children}</div>
      </Link>
    </>
  );
}
